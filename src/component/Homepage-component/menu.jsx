import './menu.css'
import absen from '../../assets/absen.png'
import simak from '../../assets/simak.png'
import silaras from '../../assets/silaras.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

const Menu = ({
    nama,   
    akses_level,
    kode_role,
    kode_role_sp,    
}) => {
    const storedUsername = localStorage.getItem('nama');
    const f_profile = localStorage.getItem('f_profile');
    const [notif, setNotif] = useState([]);
    const [notif_lpj , setNotif_lpj] = useState([]);
    const [notif_dana, setNotif_dana] = useState([]);
    const [notif_fix, setNotif_fix] = useState([]);
    const [notif_vehicle, setNotif_vehicle] = useState([]);
    const [notif_bhp, setNotif_bhp] = useState([]);
    const getNotif = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/notifikasi_surat_by_Receive.php?nama=${nama}` , {
                headers: {"Content-Type": "multipart/form-data"},
            });
            console.log(response.data);
            setNotif(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }
    const getNotif_simak = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/notif_lpj_byName_Actv.php?nama=${storedUsername}` , {
                headers: {"Content-Type": "multipart/form-data"},
            });
            const response2 = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/notifikasi_dana_Actv.php?nama=${storedUsername}` , {
                headers: {"Content-Type": "multipart/form-data"},
            });
            console.log(response.data);
            console.log(response2.data);            
            setNotif_lpj(response.data);
            setNotif_dana(response2.data);
        } catch (error) {
            console.log(error.response);
        }
    }
    const getNotif_silaras = async() => {
        const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/notif_fix_byName.php?nama=${storedUsername}` , {
            headers: {"Content-Type": "multipart/form-data"},
        });
        const response2 = await axios.get(`https://simantepbareta.cloud/API/SILARAS/notif_vehicle_byName.php?nama=${storedUsername}` , {
            headers: {"Content-Type": "multipart/form-data"},
        });
        const response3 = await axios.get(`https://simantepbareta.cloud/API/SILARAS/notif_bhp_byName.php?nama=${storedUsername}` , {
            headers: {"Content-Type": "multipart/form-data"},
        })
        console.log(response.data);
        console.log(response2.data);
        console.log(response3.data);
        setNotif_fix(response.data);
        setNotif_vehicle(response2.data);
        setNotif_bhp(response3.data);
    }
    useEffect(() => {
        getNotif();
        getNotif_simak();
        getNotif_silaras();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[nama]);
    const mark = async (idNotif, event) => {
        event.preventDefault();
        const payload = {
            stat: "Disable"
        }
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/mark_as_read.php?id=${idNotif}`, payload, {
                headers: {"Content-Type": "multipart/form-data"},
            })
            console.log(response.data);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.log(error.response);
        }
    }
    const mark_lpj = async (idNotif, event) => {
        event.preventDefault();
        const payload = {
            stat: "Disable"
        }
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/mark_lpj.php?id=${idNotif}`, payload, {
                headers: {"Content-Type": "multipart/form-data"},
            })
            console.log(response.data);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.log(error.response);
        }
    }
    const mark_Dana = async (idNotif, event) => {
        event.preventDefault();
        const payload = {
            stat: "Disable"
        }
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/mark_Dana.php?id=${idNotif}`, payload, {
                headers: {"Content-Type": "multipart/form-data"},
            })
            console.log(response.data);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.log(error.response);
        }
    }
    const buka_lpj = async (idNotif, idLpj, event) => {
        event.preventDefault();
        const payload = {
            stat: "Disable"
        }
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/mark_lpj.php?id=${idNotif}`, payload, {
                headers: {"Content-Type": "multipart/form-data"},
            })
            console.log(response.data);
            setTimeout(() => {
                window.location.href = `/form-dana-LPJ/${idLpj}`
            }, 2000);
        } catch (error) {
            console.log(error.response);
        }
    }
    const buka_Dana = async (idNotif, idDana, event) => {
        event.preventDefault();
        const payload = {
            stat: "Disable"
        }
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/mark_Dana.php?id=${idNotif}`, payload, {
                headers: {"Content-Type": "multipart/form-data"},
            })
            console.log(response.data);
            setTimeout(() => {
                window.location.href = `/form-dana-RPD/${idDana}`
            }, 2000);
        } catch (error) {
            console.log(error.response);
        }
    }
    const buka_surat = async (idNotif, idSurat, event) => {
        event.preventDefault();
        const payload = {
            stat: "Disable"
        }
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/mark_as_read.php?id=${idNotif}`, payload, {
                headers: {"Content-Type": "multipart/form-data"},
            })
            console.log(response.data);
            setTimeout(() => {
                window.location.href = `/Cuti-detail/${idSurat}`
            }, 2000);
        } catch (error) {
            console.log(error.response);
        }
    }
    const [switch_s, setSwitchS] = useState(true);
    const simakSwitch = () => {
        setSwitchS(!switch_s);
    }
    const [button_fix, setButton_fix] = useState(true);
    const [button_vehicle, setButton_Vehicle] = useState(false);
    const [button_bhp, setButton_bhp] = useState(false);
    
    const fixSwitch = () => {
        setButton_fix(!button_fix);
        setButton_Vehicle(false);
        setButton_bhp(false);
    }
    const vehicleSwitch = () => {
        setButton_Vehicle(!button_vehicle);
        setButton_fix(false);
        setButton_bhp(false);
    }
    const bhpSwitch = () => {
        setButton_bhp(!button_bhp);
        setButton_fix(false);
        setButton_Vehicle(false);
    }
    return(
        <>
            <div className='menu'>
                <div className='menu-disp'>
                    <div className='card'>
                        <div className='pic' style={{backgroundImage: `url(${absen})`, backgroundColor: "lightgray", backgroundSize: "cover" }}></div>
                        <div className='text'>
                            <h3>MAWASDIRI</h3>
                            <h5>Manajemen Pegawai Berbasis Kinerja Mandiri</h5>
                            <button onClick={() => window.location.href = `/Dashboard/level-${akses_level}/${kode_role}/${kode_role_sp}`}>Masuk</button>
                        </div>
                    </div>
                    <div className='notif-col'>
                        <div style={{background: `url(https://simantepbareta.cloud/API/${f_profile})`, backgroundColor: "lightgray", backgroundSize: "cover" }} className='pic'></div>
                        <h3>{storedUsername}</h3>
                        <div className='notification-list'>
                        <div className='notification-sub'>                            
                        {notif.length > 0 ? (
                            <>                            
                            {notif.map((notifItem) => {
                                return (
                                <>
                                  <div style={{background: `url(https://simantepbareta.cloud/API/${notifItem.f_profile})`, backgroundColor: "lightgray", backgroundSize: "cover" }} className='pic'></div>
                                  <div className='info'>
                                    <div style={{display: notifItem.stat === 'Active' ? 'block' : 'none'}} className='bullet'></div>
                                    <h3>Nama: {notifItem.nama}</h3>
                                    <h3>Subjek: {notifItem.subjek}</h3>
                                    <div className='button'>
                                        <button onClick={(event) => mark(notifItem.id_notif, event)} className='mark-read'>Mark as Read</button>
                                        <button onClick={(event) => buka_surat(notifItem.id_notif, notifItem.id_surat, event)} className='buka'>Buka</button>
                                    </div>
                                  </div>
                                </> 
                                );  
                              })}  
                            </>                     
                            ) : (
                            <>
                                <div className='info'>
                                    <h3>No Notification</h3>
                                </div>
                            </>
                            )}                                    
                        </div>
                      </div>
                    </div>
                </div>
                <div className='menu-disp'>       
                    <div className='card'>
                        <div className='pic' style={{backgroundImage: `url(${simak})`, backgroundColor: "lightgray", backgroundSize: "cover" }}></div>
                        <div className='text'>
                            <h3>SIMAK</h3>
                            <h5>Sistem Manajemen Keuangan</h5>
                            <button onClick={() => window.location.href = `/dashboard-simak/level-${akses_level}/${kode_role}/${kode_role_sp}`}>Masuk</button>
                        </div>
                    </div>
                    <div className='notif-col'>
                        <div style={{background: `url(https://simantepbareta.cloud/API/${f_profile})`, backgroundColor: "lightgray", backgroundSize: "cover" }} className='pic'></div>
                        <h3>{storedUsername}</h3>
                        <div className='notification-list'>
                            <div className='notification-sub'>
                             <div className='switch-button'>
                                <button className='switch-simak' onClick={simakSwitch}>{switch_s ? 'Rencana Penarikan Dana' : 'Proposal dan LPJ'}</button>
                             </div>                                 
                            {switch_s ? (
                            <>    
                            <p>Proposal dan LPJ</p>
                                {notif_lpj.length > 0 ? (
                                <>                            
                                    {notif_lpj.map((notifItem) => {
                                    return (
                                      <>
                                      <div style={{ display: notifItem.stat === 'Active' ? 'block' : 'none' , background: `url(https://simantepbareta.cloud/API/${notifItem.f_profile})`, backgroundColor: "lightgray", backgroundSize: "cover" }} className='pic'></div>
                                      <div style={{display: notifItem.stat === 'Active' ? 'block' : 'none'}} className='info'>
                                        <div style={{display: notifItem.stat === 'Active' ? 'block' : 'none'}} className='bullet'></div>
                                        <h3>Nama: {notifItem.sender}</h3>
                                        <h3>Subjek: {notifItem.subjek}</h3>
                                        <div className='button'>
                                            <button onClick={(event) => mark_lpj(notifItem.id_notif, event)} className='mark-read'>Mark as Read</button>
                                            <button onClick={(event) => buka_lpj(notifItem.id_notif, notifItem.id_lpj, event)} className='buka'>Buka</button>
                                        </div>
                                      </div>
                                      </> 
                                      );  
                                    })}  
                                </>                     
                                ) : (
                                <>
                                    <div className='info'>
                                        <h3>No Notification</h3>
                                    </div>
                                </>
                                )}                                
                            </>
                            ) : (
                                <>
                                <p>Rencanan Penarikan Dana</p>
                                {notif_dana.length > 0 ? (
                                <>                            
                                    {notif_dana.map((notifItem) => {
                                    return (
                                      <>
                                      <div style={{background: `url(https://simantepbareta.cloud/API/${notifItem.f_profile})`, backgroundColor: "lightgray", backgroundSize: "cover" }} className='pic'></div>
                                      <div className='info'>
                                        <div style={{display: notifItem.stat === 'Active' ? 'block' : 'none'}} className='bullet'></div>
                                        <h3>Nama: {notifItem.sender}</h3>
                                        <h3>Subjek: {notifItem.subjek}</h3>
                                        <div className='button'>
                                            <button onClick={(event) => mark_Dana(notifItem.id_notif, event)} className='mark-read'>Mark as Read</button>
                                            <button onClick={(event) => buka_Dana(notifItem.id_notif, notifItem.id_dana, event)} className='buka'>Buka</button>
                                        </div>
                                      </div>
                                      </> 
                                      );  
                                    })}  
                                </>                     
                                ) : (
                                <>
                                    <div className='info'>
                                        <h3>No Notification</h3>
                                    </div>
                                </>
                                )}                                
                                </>
                            )}   
                            </div>
                        </div>
                    </div>
                </div>
                <div className='menu-disp'>
                    <div className='card'>
                        <div className='pic' style={{backgroundImage: `url(${silaras})`, backgroundColor: "lightgray", backgroundSize: "cover" }}></div>
                        <div className='text'>
                            <h3>SI LARAS</h3>
                            <h5>Sistem Layanan sarana dan Prasarana</h5>
                            <button onClick={() => window.location.href = "/Dashboard-laras"}>Masuk</button>
                        </div>
                    </div>
                    <div className='notif-col'>
                        <div style={{background: `url(https://simantepbareta.cloud/API/${f_profile})`, backgroundColor: "lightgray", backgroundSize: "cover" }} className='pic'></div>
                        <h3>{storedUsername}</h3>
                        <div className='notification-list'>
                            <div className='notification-sub'>
                                <div className='switch-button'>
                                    <button onClick={fixSwitch} className='switch-simak'>Perbaikan</button>
                                    <button onClick={vehicleSwitch} className='switch-simak'>Peminjaman Kendaraan</button>
                                    <button onClick={bhpSwitch} className='switch-simak'>Barang Habis Pakai</button>
                                </div>
                                { button_fix && (
                                    <>
                                        {notif_fix.length > 0 ? (
                                        <>
                                            {notif_fix.map((notifItem) => {
                                                return (
                                                <>
                                                  <div style={{background: `url(https://simantepbareta.cloud/API/${notifItem.f_profile})`, backgroundColor: "lightgray", backgroundSize: "cover" }} className='pic'></div>
                                                  <div className='info'>
                                                    <div style={{display: notifItem.stat === 'Active' ? 'block' : 'none'}} className='bullet'></div>
                                                    <h3>Nama: {notifItem.sender}</h3>
                                                    <h3>Subjek: {notifItem.subjek}</h3>
                                                    <div className='button'>
                                                        <button onClick={(event) => mark(notifItem.id_notif, event)} className='mark-read'>Mark as Read</button>
                                                        <button onClick={(event) => buka_surat(notifItem.id_notif, notifItem.id_surat, event)} className='buka'>Buka</button>
                                                    </div>
                                                  </div>
                                                </> 
                                                );  
                                            })}  
                                        </>                     
                                        ) : (
                                        <>
                                            <div className='info'>
                                                <h3>No Notification</h3>
                                            </div>
                                        </>
                                        )}                                    
                                    </>
                                )}
                                {button_vehicle && (
                                    <>
                                        {notif_vehicle.length > 0 ? (
                                        <>
                                            {notif_vehicle.map((notifItem) => {
                                                return (
                                                <>
                                                  <div style={{background: `url(https://simantepbareta.cloud/API/${notifItem.f_profile})`, backgroundColor: "lightgray", backgroundSize: "cover" }} className='pic'></div>
                                                  <div className='info'>
                                                    <div style={{display: notifItem.stat === 'Active' ? 'block' : 'none'}} className='bullet'></div>
                                                    <h3>Nama: {notifItem.sender}</h3>
                                                    <h3>Subjek: {notifItem.subjek}</h3>
                                                    <div className='button'>
                                                        <button onClick={(event) => mark(notifItem.id_notif, event)} className='mark-read'>Mark as Read</button>
                                                        <button onClick={(event) => buka_surat(notifItem.id_notif, notifItem.id_surat, event)} className='buka'>Buka</button>
                                                    </div>
                                                  </div>
                                                </> 
                                                );  
                                            })}  
                                        </>                     
                                        ) : (
                                        <>
                                            <div className='info'>
                                                <h3>No Notification</h3>
                                            </div>
                                        </>
                                        )}                                    
                                    </>
                                )}
                                {button_bhp && (
                                    <>
                                        {notif_bhp.length > 0 ? (
                                        <>
                                            {notif_bhp.map((notifItem) => {
                                                return (
                                                <>
                                                  <div style={{background: `url(https://simantepbareta.cloud/API/${notifItem.f_profile})`, backgroundColor: "lightgray", backgroundSize: "cover" }} className='pic'></div>
                                                  <div className='info'>
                                                    <div style={{display: notifItem.stat === 'Active' ? 'block' : 'none'}} className='bullet'></div>
                                                    <h3>Nama: {notifItem.sender}</h3>
                                                    <h3>Subjek: {notifItem.subjek}</h3>
                                                    <div className='button'>
                                                        <button onClick={(event) => mark(notifItem.id_notif, event)} className='mark-read'>Mark as Read</button>
                                                        <button onClick={(event) => buka_surat(notifItem.id_notif, notifItem.id_surat, event)} className='buka'>Buka</button>
                                                    </div>
                                                  </div>
                                                </> 
                                                );  
                                            })}  
                                        </>                     
                                        ) : (
                                        <>
                                            <div className='info'>
                                                <h3>No Notification</h3>
                                            </div>
                                        </>
                                        )}                                    
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
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