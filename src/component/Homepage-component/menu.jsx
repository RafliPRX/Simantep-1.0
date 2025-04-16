import './menu.css'
import absen from '../../assets/absen.png'
import simak from '../../assets/simak.png'
import silaras from '../../assets/silaras.png'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Menu = () => {
    const storedUsername = localStorage.getItem('nama');
    const f_profile = localStorage.getItem('f_profile');
    const [notif, setNotif] = useState([]);
    const getNotif = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/notifikasi_surat_by_Name.php?nama=${storedUsername}` , {
                headers: {"Content-Type": "multipart/form-data"},
            });
            console.log(response.data);
            setNotif(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }
    useEffect(() => {
        getNotif();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
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
    return(
        <>
            <div className='menu'>
                <div className='menu-disp'>
                    <div className='card'>
                        <div className='pic' style={{backgroundImage: `url(${absen})`, backgroundColor: "lightgray", backgroundSize: "cover" }}></div>
                        <div className='text'>
                            <h3>MAWASDIRI</h3>
                            <h5>Manajemen Pegawai Berbasis Kinerja Mandiri</h5>
                            <button onClick={() => window.location.href = "/Dashboard"}>Masuk</button>
                        </div>
                    </div>
                    <div className='notification'>
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
                            <button onClick={() => window.location.href = "/dashboard-simak"}>Masuk</button>
                        </div>
                    </div>
                    <div className='notification'>
                        <div style={{background: `url(https://simantepbareta.cloud/API/${f_profile})`, backgroundColor: "lightgray", backgroundSize: "cover" }} className='pic'></div>
                        <h3>{storedUsername}</h3>
                        <div className='notification-list'>
                            <div className='notification-sub'>
                                {notif.length > 0 ? (
                                <>
                                  {notif.map((notif) => {
                                    <>
                                      <div className='pic'></div>
                                      <div className='info'>
                                      <h3>Nama: {notif.sender}</h3>
                                      <h3>Subjek: {notif.subjek}</h3>
                                    </div>
                                    </>   
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
                        <div className='pic' style={{backgroundImage: `url(${silaras})`, backgroundColor: "lightgray", backgroundSize: "cover" }}></div>
                        <div className='text'>
                            <h3>SI LARAS</h3>
                            <h5>Sistem Layanan sarana dan Prasarana</h5>
                            <button onClick={() => window.location.href = "/Dashboard-laras"}>Masuk</button>
                        </div>
                    </div>
                    <div className='notification'>
                        <div style={{background: `url(https://simantepbareta.cloud/API/${f_profile})`, backgroundColor: "lightgray", backgroundSize: "cover" }} className='pic'></div>
                        <h3>{storedUsername}</h3>
                        <div className='notification-list'>
                            <div className='notification-sub'>
                                {notif.length > 0 ? (
                                <>
                                  {notif.map((notif) => {
                                    <>
                                      <div className='pic'></div>
                                      <div className='info'>
                                      <h3>Nama: {notif.sender}</h3>
                                      <h3>Subjek: {notif.subjek}</h3>
                                  </div>
                                  </>   
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
            </div>
        </>
    )
}

export default Menu