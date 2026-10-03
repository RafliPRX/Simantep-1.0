import'../css/sidebar.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import menu from '../../assets/menu.svg';
import logo from '../../assets/simanteb-logo_web.webp';
import default_profile from '../../assets/profile.svg';

const Sidebar_Corner = () => {
    const { level } = useParams();
    const { role } = useParams();
    const { role_sp } = useParams();
    const { nama } = useParams();
    const { nrk_nip } = useParams();
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

    return (
        <>
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
                             onClick={() => handleDivClick(`/Dashboard-E-Corner/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}`)}>
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
                             onClick={() => handleDivClick(`/Dashboard-E-Corner/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}/New_Klien`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clock-edit">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M21 12a9 9 0 1 0 -9.972 8.948c.32 .034 .644 .052 .972 .052" />
                                <path d="M12 7v5l2 2" />
                                <path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39" />
                                </svg>
                            <p href="Cuti-form">Penambahan Jadwal Klien</p>
                        </div>
                        <div id='Pengajuan-Cuti' 
                             className='list'
                             onClick={() => handleDivClick(`/Dashboard-E-Corner/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}/Add_new_klien`)}>
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
                             onClick={() => window.location.href = `/Home/${level}`}>
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

                <a className='Sidebar-res' data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                    <img src={menu} style={{width: "50px", height: "50px"}} alt="" />
                </a>
                <div className="offcanvas offcanvas-start bg-green-old" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                  <div className="offcanvas-header d-flex flex-row">
                    <img src={logo} style={{width: "100px", height: "100px"}} alt="" />
                    <h5 className="offcanvas-title title" id="offcanvasExampleLabel">SIMANTEB</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                  </div>
                  <div className="offcanvas-header d-flex flex-column gap-2">
                    <div className='profile-bg'>
                      <img src={default_profile} style={{width: "40px", height: "40px"}} alt="" />
                    </div>
                    <h5 className="offcanvas-title profile-name" id="offcanvasExampleLabel">{nama}</h5>
                    <h5 className="offcanvas-title profile-nrk-nip" id="offcanvasExampleLabel">{nrk_nip}</h5>
                  </div>
                  <div className="separator"></div>
                  <div className="offcanvas-body ">
                    <div id='databasePegawai' className='list fs-5' onClick={() => handleDivClick(`/Dashboard-E-Corner/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="white" className="icon icon-tabler icons-tabler-filled icon-tabler-layout-dashboard">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M9 3a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2zm10 -4a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 -8a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2z" />
                        </svg>
                        <p>Database Klien E-Corner</p>
                    </div>
                    <div id='Pengajuan-Cuti' className='list fs-5' onClick={() => handleDivClick(`/Dashboard-E-Corner/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}/New_Klien`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="white" className="icon icon-tabler icons-tabler-filled icon-tabler-file-description">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 2l.117 .007a1 1 0 0 1 .876 .876l.007 .117v4l.005 .15a2 2 0 0 0 1.838 1.844l.157 .006h4l.117 .007a1 1 0 0 1 .876 .876l.007 .117v9a3 3 0 0 1 -2.824 2.995l-.176 .005h-10a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-14a3 3 0 0 1 2.824 -2.995l.176 -.005zm3 14h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2m0 -4h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0 -2" />
                            <path d="M19 7h-4l-.001 -4.001z" />
                        </svg>
                        <p href="Cuti-form">Penambahan Data Klien</p>
                    </div>
                    <div id='Pengajuan-Cuti' className='list fs-5' onClick={() => window.location.href = `/Home/${level}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back-up">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 14l-4 -4l4 -4" />
                            <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
                        </svg>
                        <p href="Cuti-form">Kembali Ke Halaman Utama</p>
                    </div>
                    <div className='list fs-5' onClick={handleLogout}>
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
        </>
    );
};

export default Sidebar_Corner;