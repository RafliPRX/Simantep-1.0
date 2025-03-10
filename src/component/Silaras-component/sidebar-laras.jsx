import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar-laras.css';
import axios from 'axios';
import menu from '../../assets/menu.svg'
const Sidebar_laras = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const handleDivClick = (href) => {
        window.location.href = href;
    };

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

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {windowWidth > 480 ? (
                <div className='sidebar-2'>
                    <div className='sidebar-col'>
                        <div className='logo-col' onClick={() => window.location.href = "/Home"}>
                            <div className='logo'></div>
                            <h2>SIMANTEP</h2>
                        </div>
                        <div className='separator'></div>
                        <div className='selected'>
                        <div id='databasePegawai'
                             className='list'
                             onClick={() => handleDivClick('/dashboard-laras')}>
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
                            <p>Database Sarpras</p>
                        </div>
                        <div id='Pengajuan-Cuti' 
                             className='list'
                             onClick={() => handleDivClick('/form-perbaikan')}>
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
                            <p>Pengajuan Form Layanan Perbaikan</p>
                        </div>

                        <div className='list' onClick={() => handleDivClick('/form-kendaraan-dinas')}>
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
                            <p>Pengajuan Form Peminjaman Kendaraan Dinas</p>
                        </div>
                        <div className='list' onClick={() => handleDivClick('/form-permohonan-BHP-ATK')}>
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
                            <p>Pengajuan Form Permohonan BHP & ATK</p>
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
                        <div className='sidebar-2'>
                            <div className='sidebar-col'>
                                <div className='logo-col' onClick={() => window.location.href = "/Home"}>
                                    <div className='logo'></div>
                                    <h2>SIMANTEP</h2>
                                </div>
                                <div className='separator'></div>
                                <div className='selected'>
                                    <div id='databasePegawai' className='list' onClick={() => handleDivClick('/dashboard-laras')}>
                                        <p>Database Sarpras</p>
                                    </div>
                                    <div id='Pengajuan-Cuti' className='list' onClick={() => handleDivClick('/form-perbaikan')}>
                                        <p>Pengajuan Form Layanan Perbaikan</p>
                                    </div>
                                    <div className='list' onClick={() => handleDivClick('/form-kendaraan-dinas')}>
                                        <p>Pengajuan Form Peminjaman Kendaraan Dinas</p>
                                    </div>
                                    <div className='list' onClick={() => handleDivClick('/form-permohonan-BHP-ATK')}>
                                        <p>Pengajuan Form Permohonan BHP & ATK</p>
                                    </div>
                                    <div className='list' onClick={handleLogout}>
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

export default Sidebar_laras;
