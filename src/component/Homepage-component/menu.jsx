import '../css/menu.css'
import absen from '../../assets/absen_web.webp'
import simak from '../../assets/keuangan_WEB.webp'
import silaras from '../../assets/sarpras_WEB.webp'
import e_corner from '../../assets/ECORNER_WEB.webp'
// import d_profile from '../../assets/profile.svg'
import { useEffect, useState } from 'react'
// import axios from 'axios'
import PropTypes from 'prop-types'

const Menu = ({
    // nama,   
    akses_level,
    kode_role,
    kode_role_sp,    
}) => {
    // const storedUsername = localStorage.getItem('nama');
    // const f_profile = localStorage.getItem('f_profile');
    // const [notif, setNotif] = useState([]);
    // const [notif_lpj , setNotif_lpj] = useState([]);
    // const [notif_dana, setNotif_dana] = useState([]);
    // const [notif_fix, setNotif_fix] = useState([]);
    // const [notif_vehicle, setNotif_vehicle] = useState([]);
    // const [notif_bhp, setNotif_bhp] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
    // const getNotif = async () => {
    //     try {
    //         const response = await axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/notifikasi_surat_byName_Actv.php?nama=${nama}` , {
    //             headers: {"Content-Type": "multipart/form-data"},
    //         });
    //         console.log(response.data);
    //         setNotif(response.data);
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // }
    // const getNotif_simak = async () => {
    //     try {
    //         const response = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/notif_lpj_byName_Actv.php?nama=${storedUsername}` , {
    //             headers: {"Content-Type": "multipart/form-data"},
    //         });
    //         const response2 = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/notifikasi_dana_Actv.php?nama=${storedUsername}` , {
    //             headers: {"Content-Type": "multipart/form-data"},
    //         });
    //         console.log(response.data);
    //         console.log(response2.data);            
    //         setNotif_lpj(response.data);
    //         setNotif_dana(response2.data);
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // }
    // const getNotif_silaras = async() => {
    //     const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/notif_fix_byName.php?nama=${storedUsername}` , {
    //         headers: {"Content-Type": "multipart/form-data"},
    //     });
    //     const response2 = await axios.get(`https://simantepbareta.cloud/API/SILARAS/notif_vehicle_byName.php?nama=${storedUsername}` , {
    //         headers: {"Content-Type": "multipart/form-data"},
    //     });
    //     const response3 = await axios.get(`https://simantepbareta.cloud/API/SILARAS/notif_bhp_byName.php?nama=${storedUsername}` , {
    //         headers: {"Content-Type": "multipart/form-data"},
    //     })
    //     console.log(response.data);
    //     console.log(response2.data);
    //     console.log(response3.data);
    //     setNotif_fix(response.data);
    //     setNotif_vehicle(response2.data);
    //     setNotif_bhp(response3.data);
    // }
    // useEffect(() => {
    //     getNotif();
    //     getNotif_simak();
    //     getNotif_silaras();
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[nama]);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 480);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    // const mark = async (idNotif, event) => {
    //     event.preventDefault();
    //     const payload = {
    //         stat: "Disable"
    //     }
    //     try {
    //         const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/mark_as_read.php?id=${idNotif}`, payload, {
    //             headers: {"Content-Type": "multipart/form-data"},
    //         })
    //         console.log(response.data);
    //         setTimeout(() => {
    //             window.location.reload();
    //         }, 2000);
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // }
    // const mark_lpj = async (idNotif, event) => {
    //     event.preventDefault();
    //     const payload = {
    //         stat: "Disable"
    //     }
    //     try {
    //         const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/mark_lpj.php?id=${idNotif}`, payload, {
    //             headers: {"Content-Type": "multipart/form-data"},
    //         })
    //         console.log(response.data);
    //         setTimeout(() => {
    //             window.location.reload();
    //         }, 2000);
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // }
    // const mark_Dana = async (idNotif, event) => {
    //     event.preventDefault();
    //     const payload = {
    //         stat: "Disable"
    //     }
    //     try {
    //         const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/mark_Dana.php?id=${idNotif}`, payload, {
    //             headers: {"Content-Type": "multipart/form-data"},
    //         })
    //         console.log(response.data);
    //         setTimeout(() => {
    //             window.location.reload();
    //         }, 2000);
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // }
    // const mark_Fix = async (idNotif, event) => {
    //     event.preventDefault();
    //     const payload = {
    //         stat: "Disable"
    //     }
    //     try {
    //         const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/mark_fix.php?id=${idNotif}`, payload, {
    //             headers: {"Content-Type": "multipart/form-data"},
    //         })
    //         console.log(response.data);
    //         setTimeout(() => {
    //             window.location.reload();
    //         }, 2000);
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // }
    // const mark_Vehicle = async (idNotif, event) => {
    //     event.preventDefault();
    //     const payload = {
    //         stat: "Disable"
    //     }
    //     try {
    //         const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/mark_vehicle.php?id=${idNotif}`, payload, {
    //             headers: {"Content-Type": "multipart/form-data"},
    //         })
    //         console.log(response.data);
    //         setTimeout(() => {
    //             window.location.reload();
    //         }, 2000);
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // }
    // const mark_Bhp = async (idNotif, event) => {
    //     event.preventDefault();
    //     const payload = {
    //         stat: "Disable"
    //     }
    //     try {
    //         const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/mark_bhp.php?id=${idNotif}`, payload, {
    //             headers: {"Content-Type": "multipart/form-data"},
    //         })
    //         console.log(response.data);
    //         setTimeout(() => {
    //             window.location.reload();
    //         }, 2000);
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // }
    // const buka_lpj = async (idNotif, idLpj, event) => {
    //     event.preventDefault();
    //     const payload = {
    //         stat: "Disable"
    //     }
    //     try {
    //         const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/mark_lpj.php?id=${idNotif}`, payload, {
    //             headers: {"Content-Type": "multipart/form-data"},
    //         })
    //         console.log(response.data);
    //         setTimeout(() => {
    //             window.location.href = `/dashboard-simak/level-${akses_level}/${kode_role}/${kode_role_sp}/form-dana-LPJ/${idLpj}`
    //         }, 2000);
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // }
    // const buka_Dana = async (idNotif, idDana, event) => {
    //     event.preventDefault();
    //     const payload = {
    //         stat: "Disable"
    //     }
    //     try {
    //         const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/mark_Dana.php?id=${idNotif}`, payload, {
    //             headers: {"Content-Type": "multipart/form-data"},
    //         })
    //         console.log(response.data);
    //         setTimeout(() => {
    //             window.location.href = `/dashboard-simak/level-${akses_level}/${kode_role}/${kode_role_sp}/form-dana-RPD/${idDana}`
    //         }, 2000);
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // }
    // const buka_surat = async (idNotif, idSurat, event) => {
    //     event.preventDefault();
    //     const payload = {
    //         stat: "Disable"
    //     }
    //     try {
    //         const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/mark_as_read.php?id=${idNotif}`, payload, {
    //             headers: {"Content-Type": "multipart/form-data"},
    //         })
    //         console.log(response.data);
    //         setTimeout(() => {
    //             window.location.href = `/Dashboard/level-${akses_level}/${kode_role}/${kode_role_sp}/Cuti-detail/${idSurat}`
    //         }, 2000);
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // }
    // const buka_fix = async (idNotif, idSurat, event) => {
    //     event.preventDefault();
    //     const payload = {
    //         stat: "Disable"
    //     }
    //     try {
    //         const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/mark_fix.php?id=${idNotif}`, payload, {
    //             headers: {"Content-Type": "multipart/form-data"},
    //         })
    //         console.log(response.data);
    //         setTimeout(() => {
    //             window.location.href = `/dashboard-laras/level-${akses_level}/${kode_role}/${kode_role_sp}/form-perbaikan/${idSurat}`
    //         }, 2000);
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // }
    // const buka_vehicle = async (idNotif, idSurat, event) => {
    //     event.preventDefault();
    //     const payload = {
    //         stat: "Disable"
    //     }
    //     try {
    //         const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/mark_vehicle.php?id=${idNotif}`, payload, {
    //             headers: {"Content-Type": "multipart/form-data"},
    //         })
    //         console.log(response.data);
    //         setTimeout(() => {
    //             window.location.href = `/dashboard-laras/level-${akses_level}/${kode_role}/${kode_role_sp}/form-kendaraan-dinas/${idSurat}`
    //         }, 2000);
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // }
    // const buka_bhp = async (idNotif, idSurat, event) => {
    //     event.preventDefault();
    //     const payload = {
    //         stat: "Disable"
    //     }
    //     try {
    //         const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/mark_bhp.php?id=${idNotif}`, payload, {
    //             headers: {"Content-Type": "multipart/form-data"},
    //         })
    //         console.log(response.data);
    //         setTimeout(() => {
    //             window.location.href = `/dashboard-laras/level-${akses_level}/${kode_role}/${kode_role_sp}/form-permintaan-barang-baru/${idSurat}`
    //         }, 2000);
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // }
    // const [switch_s, setSwitchS] = useState(true);
    // const simakSwitch = () => {
    //     setSwitchS(!switch_s);
    // }
    // const [button_fix, setButton_fix] = useState(true);
    // const [button_vehicle, setButton_Vehicle] = useState(false);
    // const [button_bhp, setButton_bhp] = useState(false);
    
    // const fixSwitch = () => {
    //     setButton_fix(!button_fix);
    //     setButton_Vehicle(false);
    //     setButton_bhp(false);
    // }
    // const vehicleSwitch = () => {
    //     setButton_Vehicle(!button_vehicle);
    //     setButton_fix(false);
    //     setButton_bhp(false);
    // }
    // const bhpSwitch = () => {
    //     setButton_bhp(!button_bhp);
    //     setButton_fix(false);
    //     setButton_Vehicle(false);
    // }
    return(
        <>
            <div className='container-fluid'>
                <div className='d-flex flex-row justify-content-center flex-wrap gap-5'>                
                    <div className='menu flex-column gap-5' onClick={() => window.location.href = `/Dashboard/level-${akses_level}/${kode_role}/${kode_role_sp}`}>
                        <div className='menu-card p-4 gap-3'>
                            <div className='menu-pic' style={{backgroundImage: `url(${absen})`, backgroundColor: "lightgray", backgroundSize: "cover", backgroundPosition: "center"}}></div>
                            <div className='text'>
                                <h3 className='menu-h3'>MAWASDIRI</h3>
                                <h5 className='text-white'>Manajemen Pegawai Berbasis{isMobile && <br />} Kinerja Mandiri</h5>
                                <button className='menu-button p-3 mt-3' onClick={() => window.location.href = `/Dashboard/level-${akses_level}/${kode_role}/${kode_role_sp}`}>Masuk</button>
                            </div>
                        </div>
                    </div>
                    <div className='menu flex-column gap-5' onClick={() => window.location.href = `/dashboard-simak/level-${akses_level}/${kode_role}/${kode_role_sp}`}>
                        <div className='menu-card p-4 gap-3'>
                            <div className='menu-pic' style={{backgroundImage: `url(${simak})`, backgroundColor: "lightgray", backgroundSize: "cover", backgroundPosition: "center"}}></div>
                            <div className='text'>
                                <h3 className='menu-h3'>SIMAK</h3>
                                <h5 className='text-white'>Sistem Manajemen Keuangan</h5>
                                <button className='menu-button p-3 mt-3' onClick={() => window.location.href = `/dashboard-simak/level-${akses_level}/${kode_role}/${kode_role_sp}`}>Masuk</button>
                            </div>
                        </div>
                    </div>                    
                    <div className='menu flex-column gap-5' onClick={() => window.location.href = `/dashboard-laras/level-${akses_level}/${kode_role}/${kode_role_sp}`}>
                        <div className='menu-card p-4 gap-3'>
                            <div className='menu-pic' style={{backgroundImage: `url(${silaras})`, backgroundColor: "lightgray", backgroundSize: "cover", backgroundPosition: "center"}}></div>
                            <div className='text'>
                                <h3 className='menu-h3'>SILARAS</h3>
                                <h5 className='text-white'>Sistem Layanan sarana dan {isMobile && <br />} Prasarana</h5>
                                <button className='menu-button p-3 mt-3' onClick={() => window.location.href = `/dashboard-laras/level-${akses_level}/${kode_role}/${kode_role_sp}`}>Masuk</button>
                            </div>
                        </div>
                    </div>
                    {kode_role_sp === 'S-06' &&(
                    <div className='menu flex-column gap-5' onClick={() => window.location.href = `/Dashboard-E-Corner/level-${akses_level}/${kode_role}/${kode_role_sp}`}>
                        <div className='menu-card p-4 gap-3'>
                            <div className='menu-pic' style={{backgroundImage: `url(${e_corner})`, backgroundColor: "lightgray", backgroundSize: "cover", backgroundPosition: "center"}}></div>
                            <div className='text'>
                                <h3 className='menu-h3'>E-Corner</h3>
                                <h5 className='text-white'>Khusus Admin E-Corner</h5>
                                <button className='menu-button p-3 mt-3' onClick={() => window.location.href = `/Dashboard-E-Corner/level-${akses_level}/${kode_role}/${kode_role_sp}`}>Masuk</button>
                            </div>
                        </div>
                    </div>
                    )}
                    {kode_role === 'A-02' &&(
                    <div className='menu flex-column gap-5' onClick={() => window.location.href = `/Dashboard-E-Corner/level-${akses_level}/${kode_role}/${kode_role_sp}`}>
                        <div className='menu-card p-4 gap-3'>
                            <div className='menu-pic' style={{backgroundImage: `url(${e_corner})`, backgroundColor: "lightgray", backgroundSize: "cover", backgroundPosition: "center"}}></div>
                            <div className='text'>
                                <h3 className='menu-h3'>E-Corner</h3>
                                <h5 className='text-white'>Khusus Admin E-Corner</h5>
                                <button className='menu-button p-3 mt-3' onClick={() => window.location.href = `/Dashboard-E-Corner/level-${akses_level}/${kode_role}/${kode_role_sp}`}>Masuk</button>
                            </div>
                        </div>
                    </div>
                    )}
                    {kode_role === 'A-01' &&(
                    <div className='menu flex-column gap-5' onClick={() => window.location.href = `/Dashboard-E-Corner/level-${akses_level}/${kode_role}/${kode_role_sp}`}>
                        <div className='menu-card p-4 gap-3'>
                            <div className='menu-pic' style={{backgroundImage: `url(${e_corner})`, backgroundColor: "lightgray", backgroundSize: "cover", backgroundPosition: "center"}}></div>
                            <div className='text'>
                                <h3 className='menu-h3'>E-Corner</h3>
                                <h5 className='text-white'>Khusus Admin E-Corner</h5>
                                <button className='menu-button p-3 mt-3' onClick={() => window.location.href = `/Dashboard-E-Corner/level-${akses_level}/${kode_role}/${kode_role_sp}`}>Masuk</button>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </>
    )
}

Menu.propTypes = {
    nama: PropTypes.string,
    akses_level: PropTypes.string,
    kode_role: PropTypes.string,
    kode_role_sp: PropTypes.string,
}

export default Menu