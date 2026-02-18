import { useEffect, useState } from 'react';
import'../Mawasdiri-component/sidebar.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import menu from '../../assets/menu.svg'

const Sidebar_Corner = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const { level } = useParams();
    const { role } = useParams();
    const { role_sp } = useParams();
    const handleDivClick = (href) => {
        window.location.href = href;
    };
    useEffect(() => {            
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
                        <div className='logo-col' onClick={() => window.location.href = `/Home/${level}`}>
                            <div className='logo'></div>
                            <h2>SIMANTEP</h2>
                        </div>
                        <div className='separator'></div>
                        <div className='selected'>
                        <div id='databasePegawai'
                             className='list'
                             onClick={() => handleDivClick(`/Dashboard-E-Corner/${level}/${role}/${role_sp}`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                            </svg>
                            <p>Database Klien E-Corner</p>
                        </div>
                        <div id='Pengajuan-Cuti' 
                             className='list'
                             onClick={() => handleDivClick(`/Dashboard-E-Corner/${level}/${role}/${role_sp}/New_Klien`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="White" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-plus">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                <path d="M16 19h6" />
                                <path d="M19 16v6" />
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
                            </svg>
                            <p href="Cuti-form">Penambahan Data Klien</p>
                        </div>
                        <div id='Pengajuan-Cuti' 
                             className='list'
                             onClick={() => handleDivClick(`/Dashboard/${level}/${role}/${role_sp}/Cuti-form`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back-up">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M9 14l-4 -4l4 -4" />
                                <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
                            </svg>
                            <p href="Cuti-form">Kembali ke Halaman Utama</p>
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
                        <div className='sidebar'>
                            <div className='sidebar-col'>
                                <div className='logo-col' onClick={() => window.location.href = `/Home/${level}`}>
                                    <div className='logo'></div>
                                    <h2 >SIMANTEP</h2>
                                </div>
                                <div className='separator'></div>
                                <div className='selected'>
                            <div id='databasePegawai'
                             className='list'
                             onClick={() => handleDivClick(`/Dashboard-E-Corner/${level}/${role}/${role_sp}`)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-users">
                                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                      <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                                      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                                  </svg>
                                  <p>Database Klien E-Corner</p>
                              </div>
                              <div id='Pengajuan-Cuti' 
                                   className='list'
                                   onClick={() => handleDivClick(`/Dashboard-E-Corner/${level}/${role}/${role_sp}/New_Klien`)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="White" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user-plus">
                                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                      <path d="M16 19h6" />
                                      <path d="M19 16v6" />
                                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
                                  </svg>
                                  <p href="Cuti-form">Penambahan Data Klien</p>
                              </div>
                              <div id='Pengajuan-Cuti' 
                                  className='list'
                                  onClick={() => handleDivClick(`/Dashboard/${level}/${role}/${role_sp}/Cuti-form`)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back-up">
                                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                      <path d="M9 14l-4 -4l4 -4" />
                                      <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
                                  </svg>
                                  <p href="Cuti-form">Kembali ke Halaman Utama</p>
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
                    )}
                </>
            )}
        </>
    );
};

export default Sidebar_Corner;