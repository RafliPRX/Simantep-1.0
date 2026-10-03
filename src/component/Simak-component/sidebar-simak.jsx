import { useNavigate, useParams } from 'react-router-dom';
import '../css/sidebar.css';
import axios from 'axios';
import menu from '../../assets/menu.svg'
import logo from '../../assets/simanteb-logo_web.webp';
import default_profile from '../../assets/profile.svg';

const Sidebar_simak = () => {
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
                            <div id='databasePegawai' className='list' onClick={() => handleDivClick(`/dashboard-simak/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}`)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" className="icon icon-tabler icons-tabler-filled icon-tabler-layout-dashboard">
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                  <path d="M9 3a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2zm10 -4a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 -8a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2z" />
                              </svg>
                              <p>Status Keuangan</p>
                            </div>
                            <div id='Pengajuan-Cuti' className='list' onClick={() => handleDivClick(`/dashboard-simak/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}/Withdrawl-form`)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-report-money">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                                    <path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2" />
                                    <path d="M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                                    <path d="M12 17v1m0 -8v1" />
                                </svg>
                                <p>Rencana Penarikan Dana</p>
                            </div>
                            <div className='list' onClick={() => handleDivClick(`/dashboard-simak/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}/Proposed-form`)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mail-up">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M12 19h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v5.5" />
                                    <path d="M19 22v-6" />
                                    <path d="M22 19l-3 -3l-3 3" />
                                    <path d="M3 7l9 6l9 -6" />
                                </svg>
                                <p>Pengajuan Proposal dan LPJ</p>
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
            <>
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
                    <div id='databasePegawai' className='list fs-5' onClick={() => handleDivClick(`/dashboard-simak/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" className="icon icon-tabler icons-tabler-filled icon-tabler-layout-dashboard">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M9 3a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2zm10 -4a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 -8a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2z" />
                        </svg>
                        <p>Status Keuangan</p>
                    </div>
                    <div id='Pengajuan-Cuti' className='list fs-5' onClick={() => handleDivClick(`/dashboard-simak/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}/Withdrawl-form`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-report-money">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                        <path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2" />
                        <path d="M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5" />
                        <path d="M12 17v1m0 -8v1" />
                        </svg>
                            <p>Rencana Penarikan Dana</p>
                    </div>
                    <div className='list fs-5' onClick={() => handleDivClick(`/dashboard-simak/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}/Proposed-form`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-mail-up">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 19h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v5.5" />
                            <path d="M19 22v-6" />
                            <path d="M22 19l-3 -3l-3 3" />
                            <path d="M3 7l9 6l9 -6" />
                        </svg>
                        <p>Pengajuan Proposal dan LPJ</p>
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
        </>
    );
};

export default Sidebar_simak;
