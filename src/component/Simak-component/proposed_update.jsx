import { useEffect, useState } from 'react';
import '../css/form.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Profile from '../profile';

const Proposed_Update = () => {
    const [isLoading, setIsLoading] = useState(false);
    const storedUsername = localStorage.getItem('nama');
    const { level } = useParams();
    const { role } = useParams();
    const { role_sp } = useParams();
    const { nrk_nip } = useParams();
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
            setNama(response.data.nama);
            setNRK(response.data.nrk_nip);
            setJabatan(response.data.jabatan);
            setUnits(response.data.units);
            setKegiatan(response.data.nama_kegiatan);
            setRencana(response.data.rencana_pelaksana);
            setDokumen(response.data.dokumen);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    const [nama, setNama] = useState(detail.nama || "");
    const [nrk, setNRK] = useState(detail.nrk_nip || "");
    const [jabatan, setJabatan] = useState(detail.jabatan || "");
    const [units, setUnits] = useState(detail.units || "");
    const [kegiatan, setKegiatan] = useState(detail.nama_kegiatan || "");
    const [rencana, setRencana] = useState(detail.rencana_pelaksana || "");
    const [dokumen, setDokumen] = useState(detail.dokumen || "");
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
    const handleChangeDokumen = (event) => {
        setDokumen(event.target.value);
        console.log(event.target.value);
    }
    const handleRequest = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const payload = {
            nama: nama,
            nrk: nrk,
            jabatan: jabatan,
            dokumen: dokumen,
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
            navigate(`/dashboard-simak/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}`)
            alert(response.data.message);
        }, 1000);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <>
            <div className='container-fluid d-flex flex-column p-5 m-2 overflow-auto'>
            {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
            </div>} 
                <p className='content-header-p'>Simak/Formulir Pengajuan Proposal & LPJ</p>
                <div className='d-flex justify-content-between align-content-center'>
                    <h1 className='content-header-title mt-0'>Mengubah Formulir Pengajuan Proposal <br /> & LPJ</h1>
                    <Profile nama={storedUsername} f_profile={"simak"} feature="simak" />                
                </div>
                <div className='form-position d-flex flex-column'>
                    <div className='form-display'>
                        <form action="">
                            <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                                <h1 className='form-h1 fw-bold ms-3'>Data Diri</h1>
                                <label className='form-label ms-3' htmlFor="">Nama</label>
                                <input className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeNama} disabled value={nama} type="text"/>
                                <label className='form-label ms-3' htmlFor="">NIP/NRK</label>
                                <input className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeNRK} disabled value={nrk} type="text"/>
                                <label className='form-label ms-3' htmlFor="">Jabatan</label>
                                <input className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeJabatan} disabled value={jabatan} type="text"/>                                
                                <label className='form-label ms-3' htmlFor="">Jenis Dokumen</label>
                                <div className='d-flex flex-row align-items-center gap-2 ps-3'>
                                    <input className='form-input-in-check ms-4 rounded-3 ps-3' type="checkbox" checked={dokumen === "LPJ"} name="jenis_dokumen" id="jenis_dokumen" value="LPJ" onChange={ (event) => {handleChangeDokumen(event)}} />
                                    <label className='form-label ms-3' htmlFor="">LPJ</label>
                                </div>
                                <div className='d-flex flex-row align-items-center gap-2 ps-3'>
                                    <input className='form-input-in-check ms-4 rounded-3 ps-3' type="checkbox" checked={dokumen === "Proposal"} name="jenis_dokumen" id="jenis_dokumen" value="Proposal" onChange={ (event) => {handleChangeDokumen(event)}} />
                                    <label className='form-label ms-3' htmlFor="">Proposal</label>
                                </div>
                            </div>
                            <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                                <h1 className='form-h1 fw-bold ms-3'>Nama Kegiatan & Unit</h1>
                                <div className='d-flex flex-row align-items-center gap-2 ps-3'>
                                    <input className='form-input-in-check ms-4 rounded-3 ps-3' value="Sosial" checked={units === "Sosial"} type="checkbox" id="sosialCheckbox" onChange={(event)=>{
                                        handleShow(event);
                                        handleChangeUnits(event);
                                        }} />
                                    <label className='form-check-label' htmlFor="sosialCheckbox">Sosial</label>
                                </div>
                                {(show || units === "Sosial") && ( // Conditionally render based on show state
                                    <div className='d-flex flex-column'>
                                        <div className='d-flex form-in-check-position gap-2 mb-4'>
                                            <label className='label-check ps-4' htmlFor="">Nama Rencana Kegiatan dan Program</label>
                                            <input className='form-input-in-check ms-4 rounded-3' onChange={handleChangeKegiatan} value={kegiatan} style={{marginTop: '10px'}} type="text" name="" id="" />                                        
                                        </div>
                                        <div className='d-flex form-in-check-position gap-2 mb-4'>
                                            <label className='label-check ps-4' htmlFor="">Rencana Pelaksanaan</label>
                                            <input className='form-input-in-check ms-4 rounded-3' onChange={handleChangeRencana} value={rencana} style={{marginTop: '10px'}} type="date" name="" id="" />                                    
                                        </div>
                                    </div>
                                )}
                                <div className='d-flex flex-row align-items-center gap-2'>
                                    <input className='form-input-in-check ms-4 rounded-3' value="Medis" checked={units === "Medis"} type="checkbox" id="sosialCheckbox" onChange={ (event) =>{
                                        handleShow1(event);
                                        handleChangeUnits(event);
                                        }} />
                                    <label className='form-check-label' htmlFor="sosialCheckbox">Medis</label>                                    
                                </div>
                                {(show1 || units === "Medis") && ( // Conditionally render based on show state
                                <div className='d-flex flex-column'>
                                    <div className='d-flex form-in-check-position gap-2 mb-4'>
                                        <label className='label-check ps-4' onChange={handleChangeKegiatan} htmlFor="">Nama Rencana Kegiatan dan Program</label>
                                        <input className='form-input-in-check ms-4 rounded-3' onChange={handleChangeKegiatan} value={kegiatan} style={{marginTop: '10px'}} type="text" name="" id="" />                                    
                                    </div>
                                    <div className='d-flex form-in-check-position gap-2 mb-4'>
                                        <label className='label-check ps-4' htmlFor="">Rencana Pelaksanaan</label>
                                        <input className='form-input-in-check ms-4 rounded-3' onChange={handleChangeRencana} style={{marginTop: '10px'}} type="date" name="" id="" />                                
                                    </div>
                                </div>
                                )}
                                <div className='d-flex flex-row align-items-center gap-2'>
                                    <input className='form-input-in-check ms-4 rounded-3' value="Manajemen" checked={units === "Manajemen"}  type="checkbox" id="sosialCheckbox" onChange={(event)=>{
                                    handleShow2(event);
                                    handleChangeUnits(event);
                                    }} />
                                    <label className='form-check-label' htmlFor="sosialCheckbox">Manajemen</label>
                                </div>
                                {(show2 || units === "Manajemen") && ( // Conditionally render based on show state
                                <div className='d-flex flex-column'>
                                    <label className='label-check ps-4' htmlFor="">Nama Rencana Kegiatan dan Program</label>
                                    <input className='form-input-in-check ms-4 rounded-3' onChange={handleChangeKegiatan} style={{marginTop: '10px'}} placeholder={detail.nama_kegiatan} type="text" name="" id="" />
                                    <label className='label-check ps-4' htmlFor="">Rencana Pelaksanaan</label>
                                    <input className='form-input-in-check ms-4 rounded-3' onChange={handleChangeRencana} style={{marginTop: '10px'}} type="date" name="" id="" />
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
export default Proposed_Update