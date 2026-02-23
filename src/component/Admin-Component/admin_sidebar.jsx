import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/sidebar.css';
import axios from 'axios';
import menu from '../../assets/menu.svg'
const Admin_Sidebar = () => {
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
                <div className='sidebar'>
                    <div className='sidebar-col'>
                        <div className='logo-col' onClick={() => window.location.href = "/Home-Admin"}>
                            <div className='logo'></div>
                            <h2>SIMANTEP</h2>
                        </div>
                        <div className='separator'></div>
                        <div className='selected'>
                        <div id='databasePegawai'
                             className='list'
                             onClick={() => handleDivClick('/Home-Admin/Akun-Dashboard')}>
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
                            <p>Dashboard Admin</p>
                        </div>
                        <div id='Pengajuan-Cuti' 
                             className='list'
                             onClick={() => handleDivClick('/Home-Admin/Tambah-Identitas')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-id-badge-2">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M7 12h3v4h-3z" />
                              <path d="M10 6h-6a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1 -1v-12a1 1 0 0 0 -1 -1h-6" />
                              <path d="M10 3m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
                              <path d="M14 16h2" />
                              <path d="M14 12h4" />
                            </svg>
                            <p>Penambahan Identitas</p>
                        </div>
                        <div className='list' onClick={() => handleDivClick('/Home-Admin/Tambah-Role')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" 
                              strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clipboard-plus">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                              <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                              <path d="M10 14h4" /><path d="M12 12v4" />
                            </svg>                            
                            <p>Penambahan Role</p>
                        </div>
                        <div className='list' onClick={() => handleDivClick('/Home-Admin/Tambah-Akun')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users-plus">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M5 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                              <path d="M3 21v-2a4 4 0 0 1 4 -4h4c.96 0 1.84 .338 2.53 .901" />
                              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                              <path d="M16 19h6" />
                              <path d="M19 16v6" />
                            </svg>                     
                            <p>Membuat Akun SIMANTEB</p>
                        </div>
                        <div className='list' onClick={handleLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="white" 
                              strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-logout-2">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                              <path d="M15 12h-12l3 -3" />
                              <path d="M6 15l-3 -3" />
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
                                <div className='logo-col' onClick={() => window.location.href = "/Home-Admin"}>
                                    <div className='logo'></div>
                                    <h2>SIMANTEP</h2>
                                </div>
                                <div className='separator'></div>
                                <div className='selected'>
                                    <div id='databasePegawai' className='list' onClick={() => handleDivClick('/Home-Admin/Akun-Dashboard')}>
                                        <p>Dashboard Admin</p>
                                    </div>
                                    <div id='Pengajuan-Cuti' className='list' onClick={() => handleDivClick('/Home-Admin/Tambah-Identitas')}>
                                        <p>Penambahan Identitas</p>
                                    </div>
                                    <div className='list' onClick={() => handleDivClick('/Home-Admin/Tambah-Role')}>
                                        <p>Penambahan Role</p>
                                    </div>   
                                    <div className='list' onClick={() => handleDivClick('/Home-Admin/Tambah-Role')}>                                                 
                                        <p>Membuat Akun SIMANTEB</p>
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

export default Admin_Sidebar;
