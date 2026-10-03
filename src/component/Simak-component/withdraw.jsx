import { useEffect, useState } from 'react';
import '../css/form.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../profile';

const Withdraw = () => {
    const { level } = useParams();
    const { role } = useParams();
    const { role_sp } = useParams();
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
    const navigate = useNavigate();
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
    
    const [nama_apr_ls_lv3, setNama_apr_ls_lv3] = useState([]);
    const [nama_apr_lv3, setNama_apr_lv3] = useState(nama_apr_ls_lv3.nama);
    console.log("nama apr lv3: " + nama_apr_lv3);        
    const getMoney_user = async () => {
    try {
        const response = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/lpj_approve_keuangan.php?kode_role_c=C-04` , {
        headers: {"Content-Type": "application/json"},
        });
        console.log(response.data.Data[0]);
        setNama_apr_ls_lv3(response.data.Data[0]);
        setNama_apr_lv3(response.data.Data[0].nama);            
    } catch (error) {
        console.log(error);
        }
    }
    useEffect(() => {
        getIdentity();
        getMoney_user();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [isLoading, setIsLoading] = useState(false);
    const [nama_Pengaju, setNama_pengaju] = useState("");
    const [kegiatan, setKegiatan] = useState("");
    const [rencana, setRencana] = useState("");
    const [units, setUnits] = useState("");
    const [akun211, setAkun211] = useState("");
    const [akun113, setAkun113] = useState("");
    const [akun151, setAkun151] = useState("");
    const [akun191, setAkun191] = useState("");
    const [akun114, setAkun114] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [totaldana, setTotalDana] = useState("");
    const [metode, setMetode] =useState("");
    const [tempat, setTempat] = useState("");
    const [kendaraan, setKendaraan] = useState("");

    const handleChangeNamaPengaju = (event) => {
        setNama_pengaju(event.target.value);
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
    const handleChangeUnits = (event) => {
        setUnits(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeAkun211 = (event) => {
        setAkun211(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeAkun113 = (event) => {
        setAkun113(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeAkun114 = (event) => {
        setAkun114(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeAkun151 = (event) => {
        setAkun151(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeAkun191 = (event) => {
        setAkun191(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeKeterangan = (event) => {
        setKeterangan(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeDana = (event) => {
        setTotalDana(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeMetode = (event) => {
        setMetode(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeTempat = (event) => {
        setTempat(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeKendaraan = (event) => {
        setKendaraan(event.target.value);
        console.log(event.target.value);
    }
    const handleRequest = async(event) => {
        setIsLoading(true);
        event.preventDefault();
        const payload = {
            id_number: storeidNumber,
            nama_pengaju: nama_Pengaju,
            nama_kegiatan: kegiatan,
            units: units,
            rencana_pelaksana: rencana,
            acc_521211: akun211,
            acc_522141_kendaraan: kendaraan,
            acc_522141_tempat: tempat,
            acc_522151: akun151,
            acc_524113: akun113,
            acc_524114: akun114,
            acc_522191: akun191,
            keterangan: keterangan,
            total_dana_manajemen: totaldana,
            keterangan_keuangan: '',
            metode: metode,
            sent_to: nama_apr_lv3,
        };
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/new_Dana.php`, payload, {
                headers: {
                    "Content-Type" : "multipart/form-data",
                }
            });
            console.log(response.data);
            setTimeout(() => {
                setIsLoading(false);
                navigate(`/dashboard-simak/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}`)
                alert(response.data.message);
            }, 1000);
        } catch (error) {
            console.log(error.response);
            alert("error code 104b");
        }
    }
    return (
        <>
            <div className='container-fluid d-flex flex-column p-5 m-2 overflow-auto'>
            {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
            </div>} 
                <p className='content-header-p'>Simak/Form Rencana Penarikan Dana</p>
                <div className='d-flex justify-content-between align-items-center'>
                    <h1 className='content-header-title mt-0'>Formulir Rencana Penarikan Dana</h1>
                    <Profile nama={storedUsername} f_profile={storedFProfile} feature="simak" />                                
                </div>
                <div className='form-position d-flex flex-column'>
                    <div className='form-display'>
                        <form action="">
                            <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                                <h1 className='form-h1 fw-bold ms-3'>Data Diri</h1>
                                <label className='form-label ms-3' htmlFor="">Nama</label>
                                <input className='form-input ms-3 mb-4 ps-2 rounded-3' value={nama} disabled placeholder='Nama' type="text"/>
                                <label className='form-label ms-3' htmlFor="">NIP/NRK</label>
                                <input className='form-input ms-3 mb-4 ps-2 rounded-3' value={nrk_nip} disabled placeholder='NIP/NRK' type="text"/>
                                <label className='form-label ms-3' htmlFor="">Jabatan</label>
                                <input className='form-input ms-3 mb-4 ps-2 rounded-3' value={jabatan} disabled placeholder='Jabatan' type="text"/>
                                {level === 'level-1' && (
                                <>
                                    <label className='form-label ms-3' htmlFor="">Unit Kerja</label>
                                    <input className='form-input ms-3 mb-4 ps-2 rounded-3' value={nama_role} placeholder='Sisa Cuti' disabled type="text" />
                                </>
                                )}
                                {level === 'level-2' && (
                                <>
                                    <label className='form-label ms-3' htmlFor="">Unit Kerja</label>
                                    <input className='form-input ms-3 mb-4 ps-2 rounded-3' value={nama_role_c} placeholder='Sisa Cuti' disabled type="text" />
                                </>
                                )}
                            </div>
                            <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                                <h1 className='form-h1 fw-bold ms-3'>Nama Kegiatan & Unit</h1>
                                <label className='form-label ms-3' htmlFor="">Nama Pengaju</label>
                                <input className='form-input ms-3 mb-4 ps-2 rounded-3'  onChange={handleChangeNamaPengaju} value={nama_Pengaju} placeholder='Nama Pengaju' type="text"/>
                                <label className='form-label ms-3' htmlFor="">Nama Rencana Kegiatan dan Program</label>
                                <input className='form-input ms-3 mb-4 ps-2 rounded-3'  onChange={handleChangeKegiatan} value={kegiatan} placeholder='Nama Rencana Kegiatan dan Program' type="text"/>
                                <label className='form-label ms-3' htmlFor="">Rencana Pelaksanaan</label>
                                <input className='form-input ms-3 mb-4 ps-2 rounded-3'  onChange={handleChangeRencana} value={rencana} placeholder='Rencana Pelaksanaan' type="date"/>
                                <div className='d-flex flex-row align-items-center gap-2 ps-3'>
                                    <input className='form-input-in-check ms-4 rounded-3 ps-3' value="Sosial" type="checkbox" id="sosialCheckbox" onChange={(event) => {
                                        handleShow(event);
                                        handleChangeUnits(event);
                                    }} />
                                    <label className='form-check-label' htmlFor="sosialCheckbox">Sosial</label>
                                </div>
                                {show && ( // Conditionally render based on show state
                                    <div className='d-flex flex-column'>
                                        <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                            <label className='label-check ps-4' htmlFor="">Kebutuhan Akun 521211 (Rp.)</label>
                                            <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeAkun211} value={akun211} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        </div>
                                        <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                            <label className='label-check ps-4' htmlFor="">Kebutuhan Akun 522141 (Rp.)</label>
                                        </div>
                                        <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                            <label style={{paddingLeft: '25px'}} htmlFor="">o</label>
                                            <label className='label-check ps-4' style={{width: '200px'}} htmlFor="">Sewa Tempat</label><br /><br />                  
                                            <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeTempat} value={tempat} placeholder='Sewa Tempat' type="text" name="" id="" />
                                        </div>
                                        <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                            <label style={{paddingLeft: '25px'}} htmlFor="">o</label>
                                            <label className='label-check ps-4' style={{width: '200px'}} htmlFor="">Sewa Kendaraan</label><br /><br />                  
                                            <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeKendaraan} value={kendaraan} placeholder='Sewa Kendaraan' type="text" name="" id="" />
                                        </div>
                                        <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                            <label className='label-check ps-4' htmlFor="">Kebutuhan Akun 522151 (Rp.)</label>
                                            <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeAkun151} value={akun151} style={{marginTop: '10px'}} type="text" name="" id="" />                                        
                                        </div>
                                        <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                            <label className='label-check ps-4' htmlFor="">Kebutuhan Akun 524113 (Rp.)</label>
                                            <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeAkun113} value={akun113} style={{marginTop: '10px'}} type="text" name="" id="" />                                            
                                        </div>
                                        <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                            <label className='label-check ps-4' htmlFor="">Kebutuhan Akun 524114 (Rp.)</label>
                                            <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeAkun114} value={akun114} style={{marginTop: '10px'}} type="text" name="" id="" />                                    
                                        </div>
                                    </div>
                                )}
                                <div className='d-flex flex-row align-items-center gap-2 ps-3'>
                                    <input className='form-input-in-check ms-4 rounded-3 ps-3' value="Medis" type="checkbox" id="sosialCheckbox" onChange={(event)=> {
                                        handleShow1(event);
                                        handleChangeUnits(event);
                                    }}/>
                                    <label className='form-check-label' htmlFor="sosialCheckbox">Medis</label>
                                </div>
                                {show1 && ( // Conditionally render based on show state
                                    <div className='d-flex flex-column'>
                                        <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                            <label className='label-check ps-4' htmlFor="">Kebutuhan Akun 521211 (Rp.)</label>
                                            <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeAkun211} value={akun211} style={{marginTop: '10px'}} type="text" name="" id="" />                                        
                                        </div>
                                        <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                            <label className='label-check ps-4' htmlFor="">Kebutuhan Akun 522191 (Rp.)</label>
                                            <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeAkun191} value={akun191} style={{marginTop: '10px'}} type="text" name="" id="" />                                        
                                        </div>
                                        <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                            <label className='label-check ps-4' htmlFor="">Keterangan</label>
                                            <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeKeterangan} value={keterangan} style={{marginTop: '10px'}} type="text" name="" id="" />                                    
                                        </div>
                                    </div>
                                )}
                                <div className='d-flex flex-row align-items-center gap-2 ps-3'>
                                    <input className='form-input-in-check ms-4 rounded-3 ps-3' type="checkbox" value="Manajemen" id="sosialCheckbox" onChange={(event) =>{
                                        handleShow2(event)
                                        handleChangeUnits(event);}} />
                                    <label className='form-check-label' htmlFor="sosialCheckbox">Manajemen</label>
                                </div>
                                {show2 && ( // Conditionally render based on show state
                                    <div className='d-flex flex-column'>
                                        <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                            <label className='label-check ps-4' htmlFor="">Total Permintaan Dana (Rp.)</label>
                                            <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeDana} value={totaldana} style={{marginTop: '10px'}} type="text" name="" id="" />                                        
                                        </div>
                                        <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                            <label className='label-check ps-4' htmlFor="">Metode Pembayaran</label>
                                            <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeMetode} value={metode} style={{marginTop: '10px'}} type="text" name="" id="" />                                    
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button onClick={handleRequest} className='submit' type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>        
        </>
    );
}

export default Withdraw;
