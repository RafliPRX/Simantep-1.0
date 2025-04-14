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
    const [isSubMenuPagi, setIsSupMenuPagi] = useState(false);
    function SubMenuPagi() {
      setIsSupMenuPagi(!isSubMenuPagi);
    }

    const [isSubMenuMalam, setIsSupMenuMalam] = useState(false);
    function SubMenuMalam() {
      setIsSupMenuMalam(!isSubMenuMalam);
    }
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
    const [detected_malam, setDetected_malam] = useState("");
    const getDetected_malam = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Absen/detect_absent_malam.php?nama=${storedUsername}`, {
          headers: {}
        })
        console.log(response.data);
        setDetected_malam(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      getDetected();
      getDetected_malam();
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
          localStorage.removeItem('nama');
          localStorage.removeItem('nrk');
          localStorage.removeItem('sisa_cuti');
          localStorage.removeItem('f_profile');
          localStorage.removeItem('jabatan');
          localStorage.removeItem('email');
          localStorage.removeItem('Status');
          localStorage.removeItem('pj');
          localStorage.removeItem('Id_user');
          alert(response.data.message);
          navigate('/');
        }, 1000);
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
                        <div>
                          <div className='list' onClick={SubMenuPagi}>
                          <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="white"  className="icon icon-tabler icons-tabler-filled icon-tabler-sun">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 19a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" />
                            <path d="M18.313 16.91l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.218 -1.567l.102 .07z" />
                            <path d="M7.007 16.993a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" />
                            <path d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
                            <path d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
                            <path d="M6.213 4.81l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.217 -1.567l.102 .07z" />
                            <path d="M19.107 4.893a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" />
                            <path d="M12 2a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" />
                            <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                          </svg>                          
                          <p>Absensi Pagi</p>
                          </div>                        
                        </div>
                        {isSubMenuPagi && (
                          <div style={{marginLeft: '30px'}}>
                            <div className='list' onClick={() => handleDivClick('/Absensi-Page')}>
                            <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="white"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-login-2">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                              <path d="M3 12h13l-3 -3" />
                              <path d="M13 15l3 -3" />
                            </svg>
                            <p>Absensi Masuk Pagi</p>
                            </div>
                            <div className='list' onClick={() => handleDivClick(`/Absensi-Page-Keluar/${detected.id_snap}`)}>
                            <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="white"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-logout-2">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                              <path d="M15 12h-12l3 -3" />\
                              <path d="M6 15l-3 -3" />
                            </svg>                                
                            <p>Absen Keluar Pagi</p>
                            </div>
                          </div>
                        )}
                        <div>
                          <div className='list' onClick={SubMenuMalam}>
                          <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="white"  className="icon icon-tabler icons-tabler-filled icon-tabler-moon">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" />
                          </svg>                            
                          <p>Absensi Malam</p>
                          </div>                        
                        </div>
                        {isSubMenuMalam && (
                          <div style={{marginLeft: '30px'}}>
                            <div className='list' onClick={() => handleDivClick('/Absensi-Page-Malam')}>
                            <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="white"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-login-2">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                              <path d="M3 12h13l-3 -3" />
                              <path d="M13 15l3 -3" />
                            </svg>
                                <p>Absensi Masuk Malam</p>
                            </div>
                            <div className='list' onClick={() => handleDivClick(`/Absensi-Page-Keluar-Malam/${detected_malam.id_snap}`)}>
                            <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="white"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-logout-2">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                              <path d="M15 12h-12l3 -3" />\
                              <path d="M6 15l-3 -3" />
                            </svg>                                
                                <p>Absen Keluar Malam</p>
                            </div>
                          </div>
                        )}
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
                              <div>
                          <div className='list' onClick={SubMenuPagi}>
                          <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="white"  className="icon icon-tabler icons-tabler-filled icon-tabler-sun">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 19a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" />
                            <path d="M18.313 16.91l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.218 -1.567l.102 .07z" />
                            <path d="M7.007 16.993a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" />
                            <path d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
                            <path d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
                            <path d="M6.213 4.81l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.217 -1.567l.102 .07z" />
                            <path d="M19.107 4.893a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" />
                            <path d="M12 2a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" />
                            <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                          </svg>                          
                          <p>Absensi Pagi</p>
                          </div>                        
                        </div>
                        {isSubMenuPagi && (
                          <div style={{marginLeft: '30px'}}>
                            <div className='list' onClick={() => handleDivClick('/Absensi-Page')}>
                            <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="white"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-login-2">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                              <path d="M3 12h13l-3 -3" />
                              <path d="M13 15l3 -3" />
                            </svg>
                            <p>Absensi Masuk Pagi</p>
                            </div>
                            <div className='list' onClick={() => handleDivClick(`/Absensi-Page-Keluar/${detected.id_snap}`)}>
                            <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="white"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-logout-2">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                              <path d="M15 12h-12l3 -3" />\
                              <path d="M6 15l-3 -3" />
                            </svg>                                
                            <p>Absen Keluar Pagi</p>
                            </div>
                          </div>
                          )}
                          <div>
                            <div className='list' onClick={SubMenuMalam}>
                            <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="white"  className="icon icon-tabler icons-tabler-filled icon-tabler-moon">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" />
                            </svg>                            
                            <p>Absensi Malam</p>
                            </div>                        
                          </div>
                          {isSubMenuMalam && (
                            <div style={{marginLeft: '30px'}}>
                              <div className='list' onClick={() => handleDivClick('/Absensi-Page-Malam')}>
                              <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="white"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-login-2">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                                <path d="M3 12h13l-3 -3" />
                                <path d="M13 15l3 -3" />
                              </svg>
                                  <p>Absensi Masuk Malam</p>
                              </div>
                              <div className='list' onClick={() => handleDivClick(`/Absensi-Page-Keluar-Malam/${detected_malam.id_snap}`)}>
                              <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="white"  strokeWidth={2}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-logout-2">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                                <path d="M15 12h-12l3 -3" />\
                                <path d="M6 15l-3 -3" />
                              </svg>                                
                                  <p>Absen Keluar Malam</p>
                              </div>
                            </div>
                          )}
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
