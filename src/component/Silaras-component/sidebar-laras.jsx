import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './sidebar-laras.css';
import axios from 'axios';
import menu from '../../assets/menu.svg'
const Sidebar_laras = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const { level } = useParams();
    const { role } = useParams();
    const { role_sp } = useParams();

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
                        <div className='logo-col' onClick={() => window.location.href = `/Home/${ level }`}>
                            <div className='logo'></div>
                            <h2>SIMANTEP</h2>
                        </div>
                        <div className='separator'></div>
                        <div className='selected'>
                        <div id='databasePegawai'
                             className='list'
                             onClick={() => handleDivClick(`/dashboard-laras/${level}/${role}/${role_sp}`)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" className="icon icon-tabler icons-tabler-filled icon-tabler-layout-dashboard">
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                  <path d="M9 3a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2zm10 -4a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 -8a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2z" />
                              </svg>
                            <p>Database Sarpras</p>
                        </div>
                        <div id='Pengajuan-Cuti' 
                             className='list'
                             onClick={() => handleDivClick(`/dashboard-laras/${level}/${role}/${role_sp}/form-perbaikan`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="White" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-tool">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5" />
                            </svg>
                            <p>Pengajuan Form Layanan Perbaikan</p>
                        </div>
                        <div className='list' onClick={() => handleDivClick(`/dashboard-laras/${level}/${role}/${role_sp}/form-kendaraan-dinas`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="White" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-car">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                <path d="M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
                            </svg>
                            <p>Pengajuan Form Peminjaman Kendaraan Dinas</p>
                        </div>
                        <div className='list' onClick={() => handleDivClick(`/dashboard-laras/${level}/${role}/${role_sp}/form-permohonan-BHP-ATK`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="White" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-tools">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4" />
                                <path d="M14.5 5.5l4 4" />
                                <path d="M12 8l-5 -5l-4 4l5 5" />
                                <path d="M7 8l-1.5 1.5" />
                                <path d="M16 12l5 5l-4 4l-5 -5" />
                                <path d="M16 17l-1.5 1.5" />
                            </svg>
                            <p>Pengajuan Form Permohonan BHP & ATK</p>
                        </div>
                        <div className='list' onClick={() => window.location.href = `/Home/${level}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back-up">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M9 14l-4 -4l4 -4" />
                                <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
                            </svg>
                            <p>Kembali ke Halaman Utama</p>
                        </div>
                        <div className='list' onClick={handleLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-logout-2">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                                <path d="M15 12h-12l3 -3" />
                                <path d="M6 15l-3 -3" />
                            </svg>
                                <p>Keluar</p>
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
                                <div className='logo-col' onClick={() => window.location.href = `/Home/${level}`}>
                                    <div className='logo'></div>
                                    <h2>SIMANTEP</h2>
                                </div>
                                <div className='separator'></div>
                                <div className='selected'>
                                    <div id='databasePegawai' className='list' onClick={() => handleDivClick(`/dashboard-laras/${level}/${role}/${role_sp}`)}>
                                        <p>Database Sarpras</p>
                                    </div>
                                    <div id='Pengajuan-Cuti' className='list' onClick={() => handleDivClick(`/dashboard-laras/${level}/${role}/${role_sp}/form-perbaikan`)}>
                                        <p>Pengajuan Form Layanan Perbaikan</p>
                                    </div>
                                    <div className='list' onClick={() => handleDivClick(`/dashboard-laras/${level}/${role}/${role_sp}/form-kendaraan-dinas`)}>
                                        <p>Pengajuan Form Peminjaman Kendaraan Dinas</p>
                                    </div>
                                    <div className='list' onClick={() => handleDivClick(`/dashboard-laras/${level}/${role}/${role_sp}/form-permohonan-BHP-ATK`)}>
                                        <p>Pengajuan Form Permohonan BHP & ATK</p>
                                    </div>
                                    <div className='list' onClick={handleLogout}>
                                        <p>Keluar</p>
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
