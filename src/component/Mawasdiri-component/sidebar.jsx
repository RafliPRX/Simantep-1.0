import { useEffect, useState } from 'react';
import './sidebar.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import menu from '../../assets/menu.svg'

const Sidebar = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const storedUsername = localStorage.getItem('nama');
    const storeNrk = localStorage.getItem('nrk');
    const storedSisaCuti = localStorage.getItem('sisa_cuti');
    const storedFProfile = localStorage.getItem('f_profile');
    const storedID = localStorage.getItem('id_jabatan_sup');
    const kelompok = parseInt(localStorage.getItem('no_kelompok')) + 1;
    console.log(storedUsername);
    console.log(storedSisaCuti );
    console.log(storedFProfile);
    console.log(storeNrk);
    console.log(storedID);
    console.log(kelompok);


    const handleDivClick = (href) => {
        window.location.href = href;
    };

    const [detected, setDetected] = useState("");
    const getDetected = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Absen/detect_absent.php?nama=${storedUsername}`, {
          headers: {}
        });
        setDetected(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.log(error.response);
      }
    };

    useEffect(() => {
      getDetected();
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tanggal = new Date();
    const tahun = tanggal.getFullYear();
    const bulan = tanggal.getMonth() + 1;
    const hari = tanggal.getDate();
    const tanggalString = `${tahun}-${bulan.toString().padStart(2, '0')}-${hari.toString().padStart(2, '0')}`;
    console.log(tanggalString);


    const navigate = useNavigate();
    const handleLogout = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/logout_adm.php`, {
          headers: {}
        });
        setTimeout(() => {
          alert(response.data.message);
          navigate('/');
        }, 500);
      } catch (error) {
        console.log(error.response);
      }
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <>
            {windowWidth > 480 ? (
                <div className='sidebar'>
                    <div className='sidebar-col'>
                        <div className='logo-col' onClick={() => window.location.href = "/Home"}>
                            <div className='logo'></div>
                            <h2 >SIMANTEP</h2>
                        </div>
                        <div className='separator'></div>
                        <div className='selected'>
                        <div id='databasePegawai'
                             className='list'
                             onClick={() => handleDivClick('/Dashboard')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <g clipPath="url(#clip0_5_1280)">
                                <path d="M10.0001 19V14H14.0001V19C14.0001 19.55 14.4501 20 15.0001 20H18.0001C18.5501 20 19.0001 19.55 19.0001 19V12H20.7001C21.1601 12 21.3801 11.43 21.0301 11.13L12.6701 3.59997C12.2901 3.25997 11.7101 3.25997 11.3301 3.59997L2.9701 11.13C2.6301 11.43 2.8401 12 3.3001 12H5.0001V19C5.0001 19.55 5.4501 20 6.0001 20H9.0001C9.5501 20 10.0001 19.55 10.0001 19Z" fill="white"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_5_1280">
                                  <rect width="24" height="24" fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                            <p>Database Pegawai</p>
                        </div>
                        <div id='Pengajuan-Cuti' 
                             className='list'
                             onClick={() => handleDivClick('/Cuti-form')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <g clipPath="url(#clip0_5_1280)">
                                <path d="M10.0001 19V14H14.0001V19C14.0001 19.55 14.4501 20 15.0001 20H18.0001C18.5501 20 19.0001 19.55 19.0001 19V12H20.7001C21.1601 12 21.3801 11.43 21.0301 11.13L12.6701 3.59997C12.2901 3.25997 11.7101 3.25997 11.3301 3.59997L2.9701 11.13C2.6301 11.43 2.8401 12 3.3001 12H5.0001V19C5.0001 19.55 5.4501 20 6.0001 20H9.0001C9.5501 20 10.0001 19.55 10.0001 19Z" fill="white"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_5_1280">
                                  <rect width="24" height="24" fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                            <p href="Cuti-form">Pengajuan Cuti</p>
                        </div>
                        <div style={{display: detected.today === tanggalString ? "flex" : "none"}} className='list' onClick={() => handleDivClick(`/Absensi-Page-Keluar/${detected.id_snap}`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <g clipPath="url(#clip0_5_1280)">
                                <path d="M10.0001 19V14H14.0001V19C14.0001 19.55 14.4501 20 15.0001 20H18.0001C18.5501 20 19.0001 19.55 19.0001 19V12H20.7001C21.1601 12 21.3801 11.43 21.0301 11.13L12.6701 3.59997C12.2901 3.25997 11.7101 3.25997 11.3301 3.59997L2.9701 11.13C2.6301 11.43 2.8401 12 3.3001 12H5.0001V19C5.0001 19.55 5.4501 20 6.0001 20H9.0001C9.5501 20 10.0001 19.55 10.0001 19Z" fill="white"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_5_1280">
                                  <rect width="24" height="24" fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                            <p>Absen Keluar</p>
                        </div>
                        <div style={{display: !detected.today ? "flex" : "none"}} className='list' onClick={() => handleDivClick('/Absensi-Page')}>

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <g clipPath="url(#clip0_5_1280)">
                                <path d="M10.0001 19V14H14.0001V19C14.0001 19.55 14.4501 20 15.0001 20H18.0001C18.5501 20 19.0001 19.55 19.0001 19V12H20.7001C21.1601 12 21.3801 11.43 21.0301 11.13L12.6701 3.59997C12.2901 3.25997 11.7101 3.25997 11.3301 3.59997L2.9701 11.13C2.6301 11.43 2.8401 12 3.3001 12H5.0001V19C5.0001 19.55 5.4501 20 6.0001 20H9.0001C9.5501 20 10.0001 19.55 10.0001 19Z" fill="white"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_5_1280">
                                  <rect width="24" height="24" fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                            <p>Absen Masuk</p>
                        </div>                        
                        <div className='list' onClick={handleLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <g clipPath="url(#clip0_5_1280)">
                                <path d="M10.0001 19V14H14.0001V19C14.0001 19.55 14.4501 20 15.0001 20H18.0001C18.5501 20 19.0001 19.55 19.0001 19V12H20.7001C21.1601 12 21.3801 11.43 21.0301 11.13L12.6701 3.59997C12.2901 3.25997 11.7101 3.25997 11.3301 3.59997L2.9701 11.13C2.6301 11.43 2.8401 12 3.3001 12H5.0001V19C5.0001 19.55 5.4501 20 6.0001 20H9.0001C9.5501 20 10.0001 19.55 10.0001 19Z" fill="white"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_5_1280">
                                  <rect width="24" height="24" fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                            <p>Sign Out</p>
                        </div>

                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <img style={{width: "40px", height: "40px", position: "absolute", top: "10px", right: "10px"}} src={menu} alt="Toggle Sidebar" onClick={toggleSidebar} />
                    {isSidebarVisible && (
                        <div className='sidebar'>
                            <div className='sidebar-col'>
                                <div className='logo-col' onClick={() => window.location.href = "/Home"}>
                                    <div className='logo'></div>
                                    <h2 >SIMANTEP</h2>
                                </div>
                                <div className='separator'></div>
                                <div className='selected'>
                            <div id='databasePegawai'
                             className='list'
                             onClick={() => handleDivClick('/Dashboard')}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <g clipPath="url(#clip0_5_1280)">
                                      <path d="M10.0001 19V14H14.0001V19C14.0001 19.55 14.4501 20 15.0001 20H18.0001C18.5501 20 19.0001 19.55 19.0001 19V12H20.7001C21.1601 12 21.3801 11.43 21.0301 11.13L12.6701 3.59997C12.2901 3.25997 11.7101 3.25997 11.3301 3.59997L2.9701 11.13C2.6301 11.43 2.8401 12 3.3001 12H5.0001V19C5.0001 19.55 5.4501 20 6.0001 20H9.0001C9.5501 20 10.0001 19.55 10.0001 19Z" fill="white"/>
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_5_1280">
                                        <rect width="24" height="24" fill="white"/>
                                      </clipPath>
                                    </defs>
                                  </svg>
                                  <p>Database Pegawai</p>
                              </div>
                              <div id='Pengajuan-Cuti' 
                                   className='list'
                                   onClick={() => handleDivClick('/Cuti-form')}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <g clipPath="url(#clip0_5_1280)">
                                      <path d="M10.0001 19V14H14.0001V19C14.0001 19.55 14.4501 20 15.0001 20H18.0001C18.5501 20 19.0001 19.55 19.0001 19V12H20.7001C21.1601 12 21.3801 11.43 21.0301 11.13L12.6701 3.59997C12.2901 3.25997 11.7101 3.25997 11.3301 3.59997L2.9701 11.13C2.6301 11.43 2.8401 12 3.3001 12H5.0001V19C5.0001 19.55 5.4501 20 6.0001 20H9.0001C9.5501 20 10.0001 19.55 10.0001 19Z" fill="white"/>
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_5_1280">
                                        <rect width="24" height="24" fill="white"/>
                                      </clipPath>
                                    </defs>
                                  </svg>
                                  <p href="Cuti-form">Pengajuan Cuti</p>
                              </div>
                              <div style={{display: detected.today === tanggalString ? "flex" : "none"}} className='list' onClick={() => handleDivClick(`/Absensi-Page-Keluar/${detected.id_snap}`)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <g clipPath="url(#clip0_5_1280)">
                                      <path d="M10.0001 19V14H14.0001V19C14.0001 19.55 14.4501 20 15.0001 20H18.0001C18.5501 20 19.0001 19.55 19.0001 19V12H20.7001C21.1601 12 21.3801 11.43 21.0301 11.13L12.6701 3.59997C12.2901 3.25997 11.7101 3.25997 11.3301 3.59997L2.9701 11.13C2.6301 11.43 2.8401 12 3.3001 12H5.0001V19C5.0001 19.55 5.4501 20 6.0001 20H9.0001C9.5501 20 10.0001 19.55 10.0001 19Z" fill="white"/>
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_5_1280">
                                        <rect width="24" height="24" fill="white"/>
                                      </clipPath>
                                    </defs>
                                  </svg>
                                  <p>Absen Keluar</p>
                              </div>
                              <div style={{display: !detected.today ? "flex" : "none"}} className='list' onClick={() => handleDivClick('/Absensi-Page')}>

                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <g clipPath="url(#clip0_5_1280)">
                                      <path d="M10.0001 19V14H14.0001V19C14.0001 19.55 14.4501 20 15.0001 20H18.0001C18.5501 20 19.0001 19.55 19.0001 19V12H20.7001C21.1601 12 21.3801 11.43 21.0301 11.13L12.6701 3.59997C12.2901 3.25997 11.7101 3.25997 11.3301 3.59997L2.9701 11.13C2.6301 11.43 2.8401 12 3.3001 12H5.0001V19C5.0001 19.55 5.4501 20 6.0001 20H9.0001C9.5501 20 10.0001 19.55 10.0001 19Z" fill="white"/>
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_5_1280">
                                        <rect width="24" height="24" fill="white"/>
                                      </clipPath>
                                    </defs>
                                  </svg>
                                  <p>Absen Masuk</p>
                              </div>                        
                              <div className='list' onClick={handleLogout}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <g clipPath="url(#clip0_5_1280)">
                                      <path d="M10.0001 19V14H14.0001V19C14.0001 19.55 14.4501 20 15.0001 20H18.0001C18.5501 20 19.0001 19.55 19.0001 19V12H20.7001C21.1601 12 21.3801 11.43 21.0301 11.13L12.6701 3.59997C12.2901 3.25997 11.7101 3.25997 11.3301 3.59997L2.9701 11.13C2.6301 11.43 2.8401 12 3.3001 12H5.0001V19C5.0001 19.55 5.4501 20 6.0001 20H9.0001C9.5501 20 10.0001 19.55 10.0001 19Z" fill="white"/>
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_5_1280">
                                        <rect width="24" height="24" fill="white"/>
                                      </clipPath>
                                    </defs>
                                  </svg>
                                  <p>Sign Out</p>
                              </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default Sidebar;
