import { useEffect, useState } from 'react';
import '../css/form.css';
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
        const [nama_role_c, setNamaRole_C] = useState(identity.nama_role_c);
        const [nama_role, setNamaRole] = useState(identity.nama_role);
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
            setNamaRole_C(response.data.nama_role_c);
            setNamaRole(response.data.nama_role);
        } catch (error) {
            console.log(error);
            }
        }
        const [nama_apr, setNama_apr] = useState([]);
        const [nama_apr_adm, setNama_apr_adm] = useState(nama_apr.nama);
        console.log("nama apr adm: " + nama_apr_adm);
        const getApr_lv1 = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/lpj_approve_adm.php?kode_role_sp=S-07` , {
            headers: {"Content-Type": "application/json"},
            });
            console.log(response.data.Data[0]);
            setNama_apr(response.data.Data[0]);
            setNama_apr_adm(response.data.Data[0].nama);            
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
        const [jenisDokumen, setJenisDokumen] = useState("");
        const navigate = useNavigate();  
        const handleChangeDokumen = (event) => {
            setJenisDokumen(event.target.value);
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
            setIsLoading(true);
            event.preventDefault();
            const payload = {
                id_number: storeidNumber,
                dokumen: jenisDokumen,
                units: units,
                nama_kegiatan: kegiatan,
                rencana_pelaksana: rencana,
                nama_veri_adm: nama_apr_adm,
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
                navigate(`/dashboard-simak/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}`);
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
            <div className='container-fluid d-flex flex-column p-5 m-2 overflow-auto'>
            {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
            </div>} 
                <p className='content-header-p'>Simak/Form Pengajuan Proposal & LPJ</p>
                <div className='d-flex justify-content-between align-items-center'>
                    <h1 className='content-header-title mt-0'>Formulir Pengajuan Proposal & LPJ</h1>
                    <Profile nama={storedUsername} f_profile={storedFProfile} feature="simak" />
                </div>                                
                <div className='form-position d-flex flex-column'>
                    <div className='form-display'>
                        <form action="">
                            <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                                <h1 className='form-h1 fw-bold ms-3'>Data Diri</h1>
                                <label className='form-label ms-3' htmlFor="">Nama</label>
                                <input disabled className='form-input ms-3 mb-4 ps-2 rounded-3' value={nama} placeholder='Nama' type="text"/>
                                <label className='form-label ms-3' htmlFor="">NIP/NRK</label>
                                <input disabled className='form-input ms-3 mb-4 ps-2 rounded-3' value={nrk_nip} placeholder='NIP/NRK' type="text"/>
                                <label className='form-label ms-3' htmlFor="">Jabatan</label>
                                <input disabled className='form-input ms-3 mb-4 ps-2 rounded-3' value={jabatan} placeholder='Jabatan' type="text"/>
                                {level === 'level-1' && (
                                <>
                                    <label className='form-label ms-3' htmlFor="">Unit Kerja</label>
                                    <input className='form-input ms-3 mb-4 ps-2 rounded-3' value={nama_role} placeholder='Sisa Cuti' disabled type="text" />
                                </>
                                )}
                                {level === 'level-2' && (
                                <>
                                    <label className='form-label ms-3' htmlFor="">Unit Kerja</label>
                                    <input value={nama_role_c} placeholder='Sisa Cuti' disabled type="text" />
                                </>
                                )}
                                {/* <label htmlFor="">Nama APR Lv1</label>
                                <input value={nama_apr_lv1} placeholder='Nama APR Lv1' type="text"/> */}
                                <label className='form-label ms-3' htmlFor="">Jenis Dokumen</label>
                                <div className='d-flex flex-row align-items-center gap-2 ps-3'>
                                    <input className='form-input-in-check ms-4 rounded-3 ps-3'  type="checkbox" name="jenis_dokumen" id="jenis_dokumen" value="LPJ" onChange={ (event) => {handleChangeDokumen(event)}} />
                                    <label className='form-label ms-3' htmlFor="">LPJ</label>
                                </div>
                                <div className='d-flex flex-row align-items-center gap-2 ps-3'>
                                    <input className='form-input-in-check ms-4 rounded-3 ps-3'  type="checkbox" name="jenis_dokumen" id="jenis_dokumen" value="Proposal" onChange={ (event) => {handleChangeDokumen(event)}} />
                                    <label className='form-label ms-3' htmlFor="">Proposal</label>
                                </div>
                            </div>
                            <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                                <h1 className='form-h1 fw-bold ms-3'>Nama Kegiatan & Unit</h1>
                                <div className='d-flex flex-row align-items-center gap-2 ps-3'>
                                    <input className='form-input-in-check ms-4 rounded-3 ps-3' type="checkbox" value="Sosial" id="sosialCheckbox" onChange={ (event) =>{
                                        handleShow(event);
                                        handleChangeUnits(event);
                                        }} />
                                    <label className='form-check-label' htmlFor="sosialCheckbox">Sosial</label>
                                </div>
                                {show && ( // Conditionally render based on show state
                                    <div className='d-flex flex-column'>
                                        <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                            <label className='label-check ps-4' htmlFor="">Nama Kegiatan</label>
                                            <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeKegiatan} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        </div>
                                        <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                            <label className='label-check ps-4' htmlFor="">Tanggal Pelaksanaan Kegiatan</label>
                                            <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeRencana} style={{marginTop: '10px'}} type="date" name="" id="" />    
                                        </div>         
                                    </div>
                                )}
                                <div className='d-flex flex-row align-items-center gap-2 ps-3'>
                                    <input className='form-input-in-check ms-4 rounded-3 ps-3' type="checkbox" value="Medis" id="sosialCheckbox" onChange={(event) => {
                                        handleShow1(event);
                                        handleChangeUnits(event);
                                        }} />
                                    <label className='form-check-label' htmlFor="sosialCheckbox">Medis</label>
                                </div>
                                {show1 && ( // Conditionally render based on show state
                                <div className='d-flex flex-column'>
                                    <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                        <label className='label-check ps-4' htmlFor="">Nama Kegiatan</label>
                                        <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeKegiatan} style={{marginTop: '10px'}} type="text" name="" id="" />
                                    </div>
                                    <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                        <label className='label-check ps-4' htmlFor="">Tanggal Pelaksanaan Kegiatan</label>
                                        <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeRencana} style={{marginTop: '10px'}} type="date" name="" id="" />
                                    </div>                                    
                                </div>
                            )}
                                <div className='d-flex flex-row align-items-center gap-2 ps-3'>
                                    <input className='form-input-in-check ms-4 rounded-3 ps-3' value="Manajemen" type="checkbox" id="sosialCheckbox" onChange={ (event) => {
                                        handleShow2(event);
                                        handleChangeUnits(event);
                                        }} />
                                    <label className='form-check-label' htmlFor="sosialCheckbox">Manajemen</label>
                                </div>
                                {show2 && ( // Conditionally render based on show state
                                <div className='d-flex flex-column'>
                                    <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                        <label className='label-check ps-4' htmlFor="">Nama Kegiatan</label>
                                        <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeKegiatan} style={{marginTop: '10px'}} type="text" name="" id="" />
                                    </div>
                                    <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                        <label className='label-check ps-4' htmlFor="">Tanggal Pelaksanaan Kegiatan</label>
                                        <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeRencana} style={{marginTop: '10px'}} type="date" name="" id="" />
                                    </div>                                    
                                </div>
                            )}
                            </div>                            
                            <div className='d-flex flex-column align-items-center w-100'>
                                <button onClick={handleRequest} className='submit' type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>        
        </>
    )
}
export default Proposed