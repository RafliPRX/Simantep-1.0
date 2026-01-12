import { useEffect, useState } from 'react';
import './form.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Profile from '../profile';

const Proposed_Update = () => {
        const [isLoading, setIsLoading] = useState(false);
        const storedUsername = localStorage.getItem('nama');

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
        
        const param = useParams();
        const [detail, setDetail] = useState({});
        const getDetail = async () => {
            try {
                const response = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/detail_dana_LPJ.php?id=${param.id}`, {
                    headers: {}
                })
                setDetail(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        useEffect(() => {
            getDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]);
        const [nama, setNama] = useState("");
        const [nrk, setNRK] = useState("");
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
            setIsLoading(true);
            const payload = {
                nama: nama,
                nrk: nrk,
                jabatan: jabatan,
                units: units,
                nama_kegiatan: kegiatan,
                rencana_pelaksana: rencana,
            };
            try {
                const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/update_dana_LPJ.php?id=${param.id}`, payload, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                }
            });
            console.log(response.data);
            setTimeout(() => {
                setIsLoading(false);
                navigate("/dashboard-simak");
            }, 1000);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    return(
        <>
            <div className='main-dashboard'>
            {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
            </div>} 
                <p>Simak/Form Pengajuan Proposal & LPJ</p>
                <h1>Form Pengajuan Proposal <br /> & LPJ</h1>
                <Profile nama={storedUsername} f_profile={"simak"} feature="simak" />
                <div className='content-col'>
                    <div className='box2' style={{marginTop: '-224px'}}>
                        <form action="">
                            <div className='content-f'>
                                <h1>Data Diri</h1>
                                <label htmlFor="">Nama</label>
                                <input onChange={handleChangeNama} placeholder={detail.nama} type="text"/>
                                <label htmlFor="">NIP/NRK</label>
                                <input onChange={handleChangeNRK} placeholder={detail.nrk} type="text"/>
                                <label htmlFor="">Jabatan</label>
                                <input onChange={handleChangeJabatan} placeholder={detail.jabatan} type="text"/>
                            </div>
                            <div className='content-f'>
                                <h1>Nama Kegiatan & Unit</h1>
                                <div className='check'>
                                    <input value="Sosial" type="checkbox" id="sosialCheckbox" onChange={(event)=>{
                                        handleShow(event);
                                        handleChangeUnits(event);
                                        }} />
                                    <label htmlFor="sosialCheckbox">Sosial</label>
                                    <label htmlFor="" style={{display: detail.units === 'Sosial' ? 'flex' : 'none'}}>Anda Sebelumnya Memilih Sosial</label>
                                </div>
                                {show && ( // Conditionally render based on show state
                                    <div className='check-form'>
                                        <label htmlFor="">Nama Rencana Kegiatan dan Program</label>
                                        <input onChange={handleChangeKegiatan} placeholder={detail.nama_kegiatan} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Rencana Pelaksanaan</label>
                                        <input onChange={handleChangeRencana} style={{marginTop: '10px'}} type="date" name="" id="" />
                                    </div>
                                )}
                                <div className='check'>
                                    <input value="Medis" type="checkbox" id="sosialCheckbox" onChange={ (event) =>{
                                        handleShow1(event);
                                        handleChangeUnits(event);
                                        }} />
                                    <label htmlFor="sosialCheckbox">Medis</label>
                                    <label htmlFor="" style={{display: detail.units === 'Medis' ? 'flex' : 'none'}}>Anda Sebelumnya Memilih Medis</label>
                                </div>
                                {show1 && ( // Conditionally render based on show state
                                <div className='check-form'>
                                    <label onChange={handleChangeKegiatan} htmlFor="">Nama Rencana Kegiatan dan Program</label>
                                    <input style={{marginTop: '10px'}} type="text" placeholder={detail.nama_kegiatan} name="" id="" />
                                    <label htmlFor="">Rencana Pelaksanaan</label>
                                    <input onChange={handleChangeRencana} style={{marginTop: '10px'}} type="date" name="" id="" />
                                </div>
                            )}
                                <div className='check'>
                                    <input value="Manajemen" type="checkbox" id="sosialCheckbox" onChange={(event)=>{
                                    handleShow2(event);
                                    handleChangeUnits(event);
                                    }} />
                                    <label htmlFor="sosialCheckbox">Manajemen</label>
                                    <label htmlFor="" style={{display: detail.units === 'Manajemen' ? 'flex' : 'none'}}>Anda Sebelumnya Memilih Manajemen</label>
                                </div>
                                {show2 && ( // Conditionally render based on show state
                                <div className='check-form'>
                                    <label htmlFor="">Nama Rencana Kegiatan dan Program</label>
                                    <input onChange={handleChangeKegiatan} style={{marginTop: '10px'}} placeholder={detail.nama_kegiatan} type="text" name="" id="" />
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
export default Proposed_Update