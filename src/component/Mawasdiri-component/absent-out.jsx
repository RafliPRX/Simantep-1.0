import './cuti.css';
import 'ol/ol.css';
import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj'; // Importing fromLonLat
import { Circle as CircleGeom } from 'ol/geom'; // Importing Circle geometry
import Feature from 'ol/Feature'; // Importing Feature
import VectorLayer from 'ol/layer/Vector'; // Importing VectorLayer
import VectorSource from 'ol/source/Vector'; // Importing VectorSource
import { Icon, Style } from 'ol/style'; // Importing Icon and Style
import Point from 'ol/geom/Point'; // Importing Point geometry
import marker from '../../assets/marker.png'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Absent_Out = () => {
    const mapRef = useRef(null); // Reference for the map
    const videoRef = useRef(null); // Reference for the video element

    const canvasRef = useRef(null); // Reference for the canvas element
    const [videoDevices, setVideoDevices] = useState([]); // State to hold video devices
    const [selectedDevice, setSelectedDevice] = useState(null); // State to hold selected device
    const [capturedImage] = useState(null); // State to hold captured image




    // Access the camera
    const startCamera = async (deviceId) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    deviceId,
                    // Adding autofocus settings
                    advanced: [{ focusMode: 'continuous' }]
                }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Error accessing the camera: ", error);
            alert("Camera access denied. Please allow camera access in your browser settings.");
        }
    };

    useEffect(() => {
        const mapElement = document.getElementById('map');
        
        // Create a circle feature
        const radius = 70; // Radius in meters
        const circleFeature = new Feature(new CircleGeom(fromLonLat([117.21939071357754, -0.4419968750231381]), radius));

        // Create a vector source and layer for the circle
        const vectorSource = new VectorSource({
            features: [circleFeature]
        });
        const vectorLayer = new VectorLayer({
            source: vectorSource
        });

        // Function to add marker at user's location
        const addMarkerAtLocation = (position) => {
            console.log("Geolocation accuracy: ", position.coords.accuracy); // Log accuracy
            const liveMarkerFeature = new Feature({
                geometry: new Point(fromLonLat([position.coords.longitude, position.coords.latitude])) // Marker position
            });
            console.log("Live marker position: ", liveMarkerFeature.getGeometry().getCoordinates());
            // Set the live marker style
            liveMarkerFeature.setStyle(new Style({
                image: new Icon({
                    src: marker, // Path to your marker icon
                    scale: 0.1 // Adjust the scale as needed
                })
            }));

            // Add the live marker to the vector source
            vectorSource.addFeature(liveMarkerFeature);
        };

        // Get user's current position with high accuracy
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(addMarkerAtLocation, (error) => {
                console.error("Error getting location: ", error);
            }, {
                enableHighAccuracy: true // Request high accuracy
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }

        // Create the map only if it doesn't exist
        if (!mapRef.current) {
            const map = new Map({
                target: mapElement,
                layers: [
                    new TileLayer({
                        source: new OSM() // Using OpenStreetMap as the tile source
                    }),
                    vectorLayer // Adding the vector layer with the circle and both markers
                ],
                view: new View({
                    center: fromLonLat([117.21939071357754, -0.4419968750231381]), // Transforming coordinates to EPSG:3857
                    zoom: 15 // Updated zoom level for better visibility
                })
            });
            mapRef.current = map;
        }


        // List available video devices
        const getVideoDevices = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoInputs = devices.filter(device => device.kind === 'videoinput');
            setVideoDevices(videoInputs);
            if (videoInputs.length > 0) {
                setSelectedDevice(videoInputs[0].deviceId); // Set the first device as default
                startCamera(videoInputs[0].deviceId); // Start camera with the first device
            }
        };

        getVideoDevices(); // Get video devices when the component mounts

    }, []);

    // Cleanup map on unmount
    useEffect(() => {
        return () => {
            if (mapRef.current) {
                mapRef.current.setTarget(null);
                mapRef.current = null;
            }
        };
    }, []);




    // Handle device selection change
    const handleDeviceChange = (event) => {
        const deviceId = event.target.value;
        setSelectedDevice(deviceId);
        startCamera(deviceId); // Restart camera with the selected device
    };


    const navigate = useNavigate();
    const param = useParams();
    const handleAbsentIn = async (event) => {
        event.preventDefault();
        
        // Capture image from video stream
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;
        
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        // Convert canvas to Blob
        return new Promise((resolve) => {
            canvas.toBlob(async (blob) => {
                const now = new Date();
                const filename = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-Keluar.png`;
                const formData = new FormData();
                formData.append('snap_out', blob, filename);

                
                try {
                    const response = await axios.post(
                        `https://simantepbareta.cloud/API/MAWASDIRI/Absen/absent_out.php?id=${param.id}`, 
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    );
                    console.log(response.data.message);
                    if (response.data.message === 'Formulir berhasil') {
                        alert("Absen keluar berhasil dicatat!");
                        setTimeout(() => {
                            navigate("/Dashboard");
                        }, 1000);
                    } else {
                        const errorMessage = response.data.message || 'Gagal melakukan absen keluar';
                        alert(`Gagal melakukan absen keluar: ${errorMessage}`);
                        console.error('Absen keluar failed:', response.data);
                    }

                } catch (error) {
                    const errorMessage = error.response?.data?.message || 
                                      error.message || 
                                      'Terjadi kesalahan saat melakukan absen keluar';
                    alert(`Gagal melakukan absen keluar: ${errorMessage}`);
                    console.error('Absen keluar failed:', error);
                    resolve(null);

                }
            }, 'image/png');
        });
    }
    return (
        <div className='main-dashboard'>

            <p>Mawasdiri/Absensi</p>
            <h1>Absensi</h1>
            <div className='profile'>
                <input placeholder='Search' type="text" />
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <g clipPath="url(#clip0_5_1232)">
                        <path d="M19.29 17.29L18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.62999 5.36 5.99999 7.92 5.99999 11V16L4.70999 17.29C4.07999 17.92 4.51999 19 5.40999 19H18.58C19.48 19 19.92 17.92 19.29 17.29ZM16 17H7.99999V11C7.99999 8.52 9.50999 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17ZM12 22C13.1 22 14 21.1 14 20H9.99999C9.99999 21.1 10.89 22 12 22Z" fill="white"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_5_1232">
                          <rect width="24" height="24" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 18 18" fill="none">
                      <g clipPath="url(#clip0_5_1230)">
                        <path d="M9.95691 18C12.7329 18 15.2683 16.737 16.948 14.6675C17.1965 14.3613 16.9255 13.9141 16.5415 13.9872C12.175 14.8188 8.1651 11.4709 8.1651 7.06303C8.1651 4.52398 9.52431 2.18914 11.7334 0.931992C12.0739 0.738211 11.9883 0.221941 11.6013 0.150469C11.0589 0.0504468 10.5085 8.21369e-05 9.95691 0C4.98902 0 0.956909 4.02578 0.956909 9C0.956909 13.9679 4.98269 18 9.95691 18Z" fill="white"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_5_1230">
                          <rect width="18" height="18" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                <div className='pic'></div>
            </div>
            <div className='content-col'>
                <div className='box'>
                    <form>

                        <div className='content-f'>
                        <h1>Kamera</h1>
                            <select onChange={handleDeviceChange} value={selectedDevice}>
                                {videoDevices.map(device => (
                                    <option key={device.deviceId} value={device.deviceId}>
                                        {device.label || `Camera ${device.deviceId}`}
                                    </option>
                                ))}
                            </select>
                            <video ref={videoRef} autoPlay style={{ width: "100%", height: "auto" }}></video>
                            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

                            {capturedImage && (
                                <img src={capturedImage} alt="Captured" style={{ marginTop: '10px', maxWidth: '100%' }} />
                            )}
                        </div>
                        <div className='content-f'>
                            <h1>Peta</h1>
                            <div id="map" style={{ height: "400px", width: "100%" }}></div>
                        </div>
                        <button onClick={handleAbsentIn} className='submit' type="submit">Absen</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Absent_Out
