import { useState } from 'react';
import './form.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Proposed = () => {
        const storedUsername = localStorage.getItem('nama');
        const storeNrk = localStorage.getItem('nrk');
        const storedSisaCuti = localStorage.getItem('sisa_cuti');
        const storedFProfile = localStorage.getItem('f_profile');
        const storedID = localStorage.getItem('id_jabatan_sup');
        console.log(storedUsername);
        console.log(storedSisaCuti );
        console.log(storedFProfile);
        console.log(storeNrk);
        console.log(storedID);

        const [show, setShow] = useState(false); // Changed to boolean for clarity
    
        function handleShow(event) {
            setShow(event.target.checked); // Set show based on checkbox state
        }
        const [show1, setShow1] = useState(false); // Changed to boolean for clarity
    
        function handleShow1(event) {
            setShow1(event.target.checked); // Set show based on checkbox state
        }
    
        const [show2, setShow2] = useState(false); // Changed to boolean for clarity
    
        function handleShow2(event) {
            setShow2(event.target.checked); // Set show based on checkbox state
        }
    
        const [nama, setNama] = useState(storedUsername);
        const [nrk, setNRK] = useState(storeNrk);
        const [jabatan, setJabatan] = useState("");
        const [units, setUnits] = useState("");
        const [kegiatan, setKegiatan] = useState("");
        const [rencana, setRencana] = useState("");
        const navigate = useNavigate();
        const handleChangeNama = (event) => {
            setNama(event.target.value);
            console.log(event.target.value);
        }
        const handleChangeNRK = (event) => {
            setNRK(event.target.value);
            console.log(event.target.value);
        }
        const handleChangeJabatan = (event) => {
            setJabatan(event.target.value);
            console.log(event.target.value);
        }
        const handleChangeUnits = (event) => {
            setUnits(event.target.value);
            console.log(event.target.value);
        }
        const handleChangeKegiatan = (event) => {
            setKegiatan(event.target.value);
            console.log(event.target.value);
        }
        const handleChangeRencana = (event) => {
            setRencana(event.target.value);
            console.log(event.target.value);
        }
        const handleRequest = async (event) => {
            event.preventDefault();
            const payload = {
                nama: nama,
                nrk: nrk,
                jabatan: jabatan,
                units: units,
                nama_kegiatan: kegiatan,
                rencana_pelaksana: rencana,
            };
            try {
                const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/new_Dana_LPJ.php`, payload, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                }
            });
            console.log(response.data);
            setTimeout(() => {
                navigate("/dashboard-simak");
                alert(response.data.message);
            }, 1000);
                console.log(response.data);
            } catch (error) {
                console.error(error);
                alert("error code 104");
            }
        }
    return(
        <>
            <div className='main-dashboard'>
                <p>Simak/Form Pengajuan Proposal & LPJ</p>
                <h1>Form Rencana Penarikan Dana</h1>
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
                        <form action="">
                            <div className='content-f'>
                                <h1>Data Diri</h1>
                                <label htmlFor="">Nama</label>
                                <input onChange={handleChangeNama} value={storedUsername} placeholder='Nama' type="text"/>
                                <label htmlFor="">NIP/NRK</label>
                                <input onChange={handleChangeNRK} value={storeNrk} placeholder='NIP/NRK' type="text"/>
                                <label htmlFor="">Jabatan</label>
                                <input onChange={handleChangeJabatan} placeholder='Jabatan' type="text"/>
                            </div>

                            <div className='content-f'>
                                <h1>Nama Kegiatan & Unit</h1>
                                <div className='check'>
                                    <input type="checkbox" value="Sosial" id="sosialCheckbox" onChange={ (event) =>{
                                        handleShow(event);
                                        handleChangeUnits(event);
                                        }} />
                                    <label htmlFor="sosialCheckbox">Sosial</label>
                                </div>
                                {show && ( // Conditionally render based on show state
                                    <div className='check-form'>
                                        <label htmlFor="">Nama Rencana Kegiatan dan Program</label>
                                        <input onChange={handleChangeKegiatan} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Rencana Pelaksanaan</label>
                                        <input onChange={handleChangeRencana} style={{marginTop: '10px'}} type="date" name="" id="" />
                                    </div>
                                )}
                                <div className='check'>
                                    <input type="checkbox" value="Medis" id="sosialCheckbox" onChange={(event) => {
                                        handleShow1(event);
                                        handleChangeUnits(event);
                                        }} />
                                    <label htmlFor="sosialCheckbox">Medis</label>
                                </div>
                                {show1 && ( // Conditionally render based on show state
                                <div className='check-form'>
                                    <label htmlFor="">Nama Rencana Kegiatan dan Program</label>
                                    <input onChange={handleChangeKegiatan} style={{marginTop: '10px'}} type="text" name="" id="" />
                                    <label htmlFor="">Rencana Pelaksanaan</label>
                                    <input onChange={handleChangeRencana} style={{marginTop: '10px'}} type="date" name="" id="" />
                                </div>
                            )}
                                <div className='check'>
                                    <input value="Manajemen" type="checkbox" id="sosialCheckbox" onChange={ (event) => {
                                        handleShow2(event);
                                        handleChangeUnits(event);
                                        }} />
                                    <label htmlFor="sosialCheckbox">Manajemen</label>
                                </div>
                                {show2 && ( // Conditionally render based on show state
                                <div className='check-form'>
                                    <label htmlFor="">Nama Rencana Kegiatan dan Program</label>
                                    <input onChange={handleChangeKegiatan} style={{marginTop: '10px'}} type="text" name="" id="" />
                                    <label htmlFor="">Rencana Pelaksanaan</label>
                                    <input onChange={handleChangeRencana} style={{marginTop: '10px'}} type="date" name="" id="" />
                                </div>
                            )}
                            </div>
                            <button onClick={handleRequest} className='submit' type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>        
        </>
    )
}
export default Proposed