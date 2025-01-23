import './cuti.css';
import 'ol/ol.css';
import { useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const Absent = () => {
    useEffect(() => {
        const mapElement = document.getElementById('map');
        new Map({
            target: mapElement,
            layers: [
                new TileLayer({
                    source: new OSM() // Using OpenStreetMap as the tile source
                })
            ],
            view: new View({
                center: [113.9213, -0.7893], // Updated center to Indonesia
                zoom: 5 // Set the initial zoom level
            })
        });
    }, []);

    return (
        <div className='main-dashboard'>
            <p>Mawasdiri/Pengajuan Cuti</p>
            <h1>Pengajuan Cuti</h1>
            <div className='profile'>
                <input placeholder='Search' type="text" />
                <div className='pic'></div>
            </div>
            <div className='content-col'>
                <div className='box'>
                    <form action="">
                        <div className='content-f'>
                            <h1>Data Diri</h1>
                            <label htmlFor="">Nama</label>
                            <input placeholder='Nama' type="text"/>
                            <label htmlFor="">NIP/NRK</label>
                            <input placeholder='NRK' type="text"/>
                            <label htmlFor="">No.Handphone</label>
                            <input placeholder='No. HP' type="text"/>
                        </div>
                        <div className='content-f'>
                            <h1>Peta</h1>
                            <div id="map" style={{ height: "400px", width: "100%" }}></div>
                        </div>
                        <button className='submit' type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Absent;
