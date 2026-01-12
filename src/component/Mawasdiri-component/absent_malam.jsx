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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Profile from '../profile';

const Absent_Malam = ({title}) => {
    const storedUsername = localStorage.getItem('nama');
    const storedFProfile = localStorage.getItem('f_profile');
    console.log(storedFProfile);
    const mapRef = useRef(null); // Reference for the map
    const videoRef = useRef(null); // Reference for the video element
    const canvasRef = useRef(null); // Reference for the canvas element
    const [videoDevices, setVideoDevices] = useState([]); // State to hold video devices
    const [selectedDevice, setSelectedDevice] = useState(null); // State to hold selected device
    const [capturedImage] = useState(null); // State to hold captured image
    const [isLoading, setIsLoading] = useState(false); // Loading state

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
    const [isTesting, setIsTesting] = useState(false); // Testing mode state
    const testLocation = {
        longitude: 117.21939071357754,
        latitude: -0.4419968750231381
    };
    const calculateDistance = (pos1, pos2) => {
        const R = 6371e3; // Earth radius in meters
        const φ1 = pos1.latitude * Math.PI/180;
        const φ2 = pos2.latitude * Math.PI/180;
        const Δφ = (pos2.latitude - pos1.latitude) * Math.PI/180;
        const Δλ = (pos2.longitude - pos1.longitude) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c;
    };

    const handleAbsentIn = async (event) => {
        event.preventDefault();
        setIsLoading(true); // Start loading

        // Get user's position or use test location
        const position = isTesting ? testLocation : await new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
                (pos) => resolve({
                    longitude: pos.coords.longitude,
                    latitude: pos.coords.latitude
                }),
                (err) => {
                    console.error("Error getting position:", err);
                    resolve(null);
                }
            );
        });

        if (!position) {
            alert("Failed to get your location");
            setIsLoading(false); // Stop loading
            return;
        }

        // Center point
        const center = {
            longitude: 117.21939071357754,
            latitude: -0.4419968750231381
        };

        // Check distance
        const distance = calculateDistance(position, center);
        console.log(`Distance from center: ${distance.toFixed(2)} meters`);
        if (distance > 70) {
            alert(`Absent failed: You are ${distance.toFixed(2)} meters outside the allowed radius (70m)`);
            setIsLoading(false); // Stop loading
            return;
        }

        // Capture image from video stream
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (!canvas || !video) return;

        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        const storedUsername = localStorage.getItem('nama');
        const storeNrk = localStorage.getItem('nrk');
        const storedSisaCuti = localStorage.getItem('sisa_cuti');
        const storedFProfile = localStorage.getItem('f_profile');
        console.log(storedUsername);
        console.log(storedSisaCuti );
        console.log(storedFProfile);
        console.log(storeNrk);
    
        // Convert canvas to Blob
        return new Promise((resolve) => {
            canvas.toBlob(async (blob) => {
                const now = new Date();
                const filename = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-Masuk-Malam.png`;
                const formData = new FormData();
                formData.append('snap_in', blob, filename);
                formData.append('nama', storedUsername);
                try {
                    const response = await axios.post(
                        `https://simantepbareta.cloud/API/MAWASDIRI/Absen/absent_in_malam.php`, 
                        formData, // Combine formData and payload
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    );
                    console.log(response.data.message);
                    if (response.data.message === 'Formulir berhasil') {
                        alert("Absent berhasil dicatat!");
                        setTimeout(() => {
                            setIsLoading(false); // Stop loading before navigating
                            navigate("/Dashboard");
                        }, 500);
                    } else {
                        const errorMessage = response.data.message || 'Unknown error occurred';
                        alert(`Gagal melakukan absent: ${errorMessage}`);
                        console.error('Absent failed:', response.data);
                        setIsLoading(false); // Stop loading
                    }

                } catch (error) {
                    const errorMessage = error.response?.data?.message || 
                                        error.message || 'Unknown error occurred';
                    alert(`Gagal melakukan absent: ${errorMessage}`);
                    console.error('Absent failed:', error);
                    setIsLoading(false); // Stop loading
                    resolve(null);
                }

            }, 'image/png');
        });
    }
    return (
        <div className='main-dashboard'>

            <p>Mawasdiri/Absensi</p>
            <h1>{title}</h1>
            <Profile nama={storedUsername} f_profile={storedFProfile} feature="mawasdiri" />
            <div className='content-col'>
                <div className='box1'>
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
                        <button onClick={handleAbsentIn} className='submit' type="submit">Absen Masuk</button>
                        {isLoading && <div style={{position: 'absolute', marginTop: '-1598px', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}><span style={{position: 'absolute'}} className="load-cuti"></span></div>} {/* Loading indicator */}
                        <div style={{ marginTop: '10px' }}>
                            <label >
                                <input 
                                    type="checkbox"
                                    checked={isTesting}
                                    onChange={(e) => setIsTesting(e.target.checked)}
                                />
                                Testing Mode
                            </label>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
export default Absent_Malam

Absent_Malam.propTypes = {
    title: PropTypes.string
}