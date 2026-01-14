import { useEffect, useState } from 'react';
import './form.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../profile';

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
        const { role } = useParams();
        const { level } = useParams();
        const { role_sp } = useParams();
        const [isLoading, setIsLoading] = useState(false);

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
                
        const storeidNumber = localStorage.getItem('id_number');
        console.log("id Number: " + storeidNumber);        
        const [identity, setIdentity] = useState([]);
        const [nrk_nip, setNrk_Nip] = useState(identity.nrk_nip);
        const [jabatan, setJabatan] = useState(identity.jabatan);
        const [nama, setNama] = useState(identity.nama);
        const getIdentity = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/Admin_API/detail_identity.php?id=${storeidNumber}` , {
            headers: {"Content-Type": "application/json"},
            });
            console.log(response.data);
            setIdentity(response.data);
            setNama(response.data.nama);
            setJabatan(response.data.jabatan);
            setNrk_Nip(response.data.nrk_nip);
            setJabatan(response.data.jabatan);
        } catch (error) {
            console.log(error);
            }
        }
        const [nama_apr, setNama_apr] = useState([]);
        const [nama_apr_lv1, setNama_apr_lv1] = useState(nama_apr.nama);
        console.log("nama apr lv1: " + nama_apr_lv1);        
        const getApr_lv1 = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/lpj_approve_lv1.php?kode_role_a=A-02` , {
            headers: {"Content-Type": "application/json"},
            });
            console.log(response.data.Data[0]);
            setNama_apr(response.data.Data[0]);
            setNama_apr_lv1(response.data.Data[0].nama);            
        } catch (error) {
            console.log(error);
            }
        }
        useEffect(() => {
            getIdentity();
            getApr_lv1();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);        
        const [units, setUnits] = useState("");
        const [kegiatan, setKegiatan] = useState("");
        const [rencana, setRencana] = useState("");
        const navigate = useNavigate();        
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
            setIsLoading(true);
            event.preventDefault();
            const payload = {
                id_number: storeidNumber,
                units: units,
                nama_kegiatan: kegiatan,
                rencana_pelaksana: rencana,
                nama_veri_1: nama_apr_lv1,
            };
            try {
                const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/new_Dana_LPJ.php`, payload, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                }
            });
            console.log(response.data);
            setTimeout(() => {
                setIsLoading(false);
                navigate(`/dashboard-simak/${level}/${role}/${role_sp}`);
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
            {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
            </div>} 
                <p>Simak/Form Pengajuan Proposal & LPJ</p>
                <h1>Form Pengajuan Proposal <br /> & LPJ</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="simak" />                
                <div className='content-col'>
                    <div className='box2'>
                        <form action="">
                            <div className='content-f'>
                                <h1>Data Diri</h1>
                                <label htmlFor="">Nama</label>
                                <input value={nama} placeholder='Nama' type="text"/>
                                <label htmlFor="">NIP/NRK</label>
                                <input value={nrk_nip} placeholder='NIP/NRK' type="text"/>
                                <label htmlFor="">Jabatan</label>
                                <input value={jabatan} placeholder='Jabatan' type="text"/>
                                {/* <label htmlFor="">Nama APR Lv1</label>
                                <input value={nama_apr_lv1} placeholder='Nama APR Lv1' type="text"/> */}
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