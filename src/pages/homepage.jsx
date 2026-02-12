import axios from 'axios';
import Banner from '../component/Homepage-component/banner';
import Footer from '../component/Homepage-component/footer';
import Menu from '../component/Homepage-component/menu';
import './homepage.css';
import { useState, useEffect } from 'react';
import icon from '../assets/icon.png';
import { useNavigate, useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const storedidAkun = localStorage.getItem('id_akun');
const storeidNumber = localStorage.getItem('id_number');
console.log('id_akun: ' +storedidAkun);
console.log('id_number: ' +storeidNumber);
// Notification helper functions
// const showBrowserNotification = (title, options) => {
//   if (!("Notification" in window)) {
//     console.log("This browser does not support notifications");
//     return;
//   }
  
//   if (Notification.permission === "granted") {
//     const notification = new Notification(title, options);
//     notification.onclick = (event) => {
//       event.preventDefault(); // Prevent the default action
//       // window.location.href = '/Home'; // Redirect to '/home'
//     };
//   } else if (Notification.permission !== "denied") {
//     Notification.requestPermission()
//   }
// };
function Today() {
    const tanggal = new Date();
    const tahun = tanggal.getFullYear();
    const bulan = String(tanggal.getMonth() + 1).padStart(2, '0');
    const hari = String(tanggal.getDate()).padStart(2, '0');
    return `${tahun}-${bulan}-${hari}`;   
}
console.log("Tanggal Hari ini: ", Today());
const updateNotif_surat = async (event, idNotif) => {
  event.preventDefault();
  const payload = {
    stat: "Disable"
  }
  try {
    const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/update_notif_kelompok.php?id=${idNotif}`, payload, {
      headers: {"Content-Type": "multipart/form-data"},
    })
    console.log(response.data );
    setTimeout(() => {          
    }, 1000);
  } catch (error) {
    console.log(error.response);
  }
}
const Notification_Surat = (title, options, id_surat, idNotif, level, role, role_sp) => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return;
  }
  
  if (Notification.permission === "granted") {
    const notification = new Notification(title, options, id_surat, idNotif);
    notification.onclick = (event) => {
      event.preventDefault(); // Prevent the default action
      updateNotif_surat(idNotif);
      window.location.href = `/Dashboard/${level}/${role}/${role_sp}/Cuti-detail/${id_surat}`; // Redirect to '/home'
    };
  } else {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        const notification = new Notification(title, options, id_surat, idNotif);
        notification.onclick = () => {
          updateNotif_surat(idNotif);
          window.location.href = `/Dashboard/${level}/${role}/${role_sp}/Cuti-detail/${id_surat}`;
        };
      } else {
        console.log("Notification permission denied");
      }
    });
  }
};

const Notification_Lpj = (title, options, id_LPJ, id_Notif, level, role, role_sp) => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return;
  }
  if (Notification.permission === "granted") {
    const notification = new Notification(title, options, id_LPJ, id_Notif, level, role, role_sp);
    notification.onclick = (event) => {
      event.preventDefault(); // Prevent the default action
      window.location.href = `/dashboard-simak/${level}/${role}/${role_sp}/form-dana-LPJ/${id_LPJ}`; // Redirect to '/home'
    };
  } else {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        const notification = new Notification(title, options, id_LPJ, id_Notif, level, role, role_sp);
        notification.onclick = () => {
          updateNotif_surat(id_Notif);
          window.location.href = `/dashboard-simak/${level}/${role}/${role_sp}/form-dana-LPJ/${id_LPJ}`;
        };
      } else {
        console.log("Notification permission denied");
      }
    });
  }
} 
const Notification_Dana = (title, options, idDana, id_Notif,  level, role, role_sp) => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return;
  }
  if (Notification.permission === "granted") {
    const notification = new Notification(title, options, idDana, id_Notif,  level, role, role_sp);
    notification.onclick = (event) => {
      event.preventDefault(); // Prevent the default action
      window.location.href = `/dashboard-simak/${level}/${role}/${role_sp}/form-dana-RPD/${idDana}`; // Redirect to '/home'
    };
  } else {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        const notification = new Notification(title, options, idDana, id_Notif, level, role, role_sp);
        notification.onclick = () => {
          updateNotif_surat(id_Notif);
          window.location.href = `/dashboard-simak/${level}/${role}/${role_sp}/form-dana-RPD/${idDana}`;
        };
      } else {
        console.log("Notification permission denied");
      }
    });
  }
}
const Notification_Fix = (title, options, idFix, id_Notif) => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return;
  }
  if (Notification.permission === "granted") {
    const notification = new Notification(title, options, idFix, id_Notif);
    notification.onclick = (event) => {
      event.preventDefault(); // Prevent the default action
      window.location.href = `/form-perbaikan/${idFix}`; // Redirect to '/home'
    };
  } else {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        const notification = new Notification(title, options, idFix, id_Notif);
        notification.onclick = () => {
          updateNotif_surat(id_Notif);
          window.location.href = `/form-perbaikan/${idFix}`;
        };
      } else {
        console.log("Notification permission denied");
      }
    });
  }
}
const Notification_Vehicle = (title, options, idFix, id_Notif) => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return;
  }
  if (Notification.permission === "granted") {
    const notification = new Notification(title, options, idFix, id_Notif);
    notification.onclick = (event) => {
      event.preventDefault(); // Prevent the default action
      window.location.href = `/form-kendaraan-dinas/${idFix}`; // Redirect to '/home'
    };
  } else {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        const notification = new Notification(title, options, idFix, id_Notif);
        notification.onclick = () => {
          updateNotif_surat(id_Notif);
          window.location.href = `/form-kendaraan-dinas/${idFix}`;
        };
      } else {
        console.log("Notification permission denied");
      }
    });
  }
}
const Notification_Bhp = (title, options, idFix, id_Notif) => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return;
  }
  if (Notification.permission === "granted") {
    const notification = new Notification(title, options, idFix, id_Notif);
    notification.onclick = (event) => {
      event.preventDefault(); // Prevent the default action
      window.location.href = `/form-permintaan-barang-baru/${idFix}`; // Redirect to '/home'
    };
  } else {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        const notification = new Notification(title, options, idFix, id_Notif);
        notification.onclick = () => {
          updateNotif_surat(id_Notif);
          window.location.href = `/form-permintaan-barang-baru/${idFix}`;
        };
      } else {
        console.log("Notification permission denied");
      }
    });
  }
} 

const Homepage = () => {
    const { level } = useParams();                
    const [identity, setIdentity] = useState([]);
    const [nama, setNama] = useState(identity.nama);
    const [username, setUsername] = useState(identity.username);
    const [nama_role, setNama_role] = useState(identity.nama_role);
    const [kode_role, setKode_role] = useState(identity.kode_role);
    const [nama_role_c, setNama_role_c] = useState(identity.nama_role_c);
    const [kode_role_c, setKode_role_c] = useState(identity.kode_role_c);
    const [nama_role_b, setNama_role_b] = useState(identity.nama_role_b);
    const [kode_role_b, setKode_role_b] = useState(identity.kode_role_b);
    const [nama_role_a, setNama_role_a] = useState(identity.nama_role_a);
    const [kode_role_a, setKode_role_a] = useState(identity.kode_role_a);
    const [kode_role_sp, setKode_role_sp] = useState(identity.kode_role_sp);
    const [nama_role_sp, setNama_role_sp] = useState(identity.nama_role_sp);
    const [jabatan, setJabatan] = useState(identity.jabatan);    
    const [nrk_nip, setNrk_nip] = useState(identity.nrk_nip);
    const [akses_level, setAkses_level] = useState(identity.akses_level);
    const [role_sp, setRole_sp] = useState(identity.role_sp);
    const [isLoading, setIsLoading] = useState(false);
    const getIdentity = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/Admin_API/detail_identity.php?id=${storeidNumber}` , {
          headers: {"Content-Type": "application/json"},
        });
        console.log(response.data);
        setIdentity(response.data);
        setNama(response.data.nama);
        setUsername(response.data.username);
        setNama_role(response.data.nama_role);
        setKode_role(response.data.kode_role);
        setNama_role_c(response.data.nama_role_c);
        setKode_role_c(response.data.kode_role_c);
        setKode_role_b(response.data.kode_role_b || '');
        setKode_role_a(response.data.kode_role_a || '');
        setNama_role_b(response.data.nama_role_b);
        setNama_role_a(response.data.nama_role_a);
        setRole_sp(response.data.role_sp);
        setJabatan(response.data.jabatan);
        setNrk_nip(response.data.nrk_nip);
        setAkses_level(response.data.akses_level);
        setKode_role_sp(response.data.kode_role_sp);
        setNama_role_sp(response.data.nama_role_sp);
      } catch (error) {
        console.log(error);
      }
    }
    
    const dynamic_kode_role = () => {
      const lvl = String(akses_level);
      if (lvl === '1' || lvl === 1) return kode_role;
      if (lvl === '2' || lvl === 2) return kode_role_c;
      if (lvl === '3' || lvl === 3) return kode_role_b;
      if (lvl === '4' || lvl === 4) return kode_role_a;
      return kode_role;
    };
    
    const [notif_surat, setNotif_surat] = useState([]);
    const getNotif_surat = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/notifikasi_surat_byName_Actv.php?nama=${nama}` , {
          headers: {"Content-Type": "application/json"},
        });
        console.log(response.data);
        setNotif_surat(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    const [notif_lpj, setNotif_lpj] = useState([]);
    const getNotif_lpj = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/notif_lpj_byName_Actv.php?nama=${nama}` , {
          headers: {"Content-Type": "application/json"},
        });
        console.log(response.data);
        setNotif_lpj(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    const [notif_dana, setNotif_dana] = useState([]);
    const getNotif_Dana = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/notifikasi_dana_Actv.php?nama=${nama}` , {
          headers: {"Content-Type": "application/json"},
        });
        console.log(response.data);
        setNotif_dana(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    const [notif_bhp, setNotif_bhp] = useState([]);
    const getNotif_Bhp = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/notif_bhp_byName_Actv.php?nama=${nama}` , {
          headers: {"Content-Type": "application/json"},
        });
        console.log(response.data);
        setNotif_bhp(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    const [notif_fix, setNotif_fix] = useState([]);
    const getNotif_Fix = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/notif_fix_byName_Actv.php?nama=${nama}` , {
          headers: {"Content-Type": "application/json"},
        });
        console.log(response.data);
        setNotif_fix(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    const [notif_vehicle, setNotif_Vehicle] = useState([]);
    const getNotif_Vehicle = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/notif_vehicle_byName_Actv.php?nama=${nama}` , {
          headers: {"Content-Type": "application/json"},
        });
        console.log(response.data);
        setNotif_Vehicle(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      getIdentity();      
      const timeoutId = setTimeout(() => {
        getNotif_surat();
        getNotif_lpj();
        getNotif_Dana();
        getNotif_Fix();
        getNotif_Vehicle();
        getNotif_Bhp();
        // Request notification permission on component mount
        if ("Notification" in window) {
          Notification.requestPermission();
        }
        // Example: Show welcome notification
        if (notif_surat.length > 0) {
          notif_surat.map((notif) => {
            if (Notification.permission === "granted") {
              Notification_Surat(notif.nama, {
                body: notif.subjek,
                icon: `${icon}`
              }, notif.id_surat, notif.id_notif, level, dynamic_kode_role(), role_sp);
            }
          });
        }
        if (notif_lpj.length > 0) {
          notif_lpj.map((Notif) => {
            if (Notification.permission === "granted") {
              Notification_Lpj(Notif.nama, {
                body: Notif.subjek,
                icon: `${icon}`
              }, Notif.id_lpj, Notif.id_notif, level, dynamic_kode_role(), role_sp);
            }
          });
        }
        if (notif_dana.length > 0) {
          notif_dana.map((Notif) => {
            if (Notification.permission === "granted") {
              Notification_Dana(Notif.nama, {
                body: Notif.subjek,
                icon: `${icon}`
              }, Notif.id_dana, Notif.id_notif, level, dynamic_kode_role(), role_sp);
            }
          });
        }
        if (notif_fix.length > 0) {
          notif_fix.map((Notif) => {
            if (Notification.permission === "granted") {
              Notification_Fix(Notif.nama, {
                body: Notif.subjek,
                icon: `${icon}`
              }, Notif.id_fix, Notif.id_notif);
            }
          });
        }
        if (notif_vehicle.length > 0) {
          notif_vehicle.map((Notif) => {
            if (Notification.permission === "granted") {
              Notification_Vehicle(Notif.nama, {
                body: Notif.subjek,
                icon: `${icon}`
              }, Notif.id_vehicle, Notif.id_notif);
            }
          });
        }
        if (notif_bhp.length > 0) {
          notif_bhp.map((Notif) => {
            if (Notification.permission === "granted") {
              Notification_Bhp(Notif.nama, {
                body: Notif.subjek,
                icon: `${icon}`
              }, Notif.id_bhp, Notif.id_notif);
            }
          });
        }
      }, 5000); // tampilkan notifikasi setelah 5 detik
      return () => {
        clearTimeout(timeoutId);
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notif_lpj, notif_surat, notif_dana, notif_fix, notif_vehicle, notif_bhp]);
    const navigate = useNavigate();
    const handleLogout = async () => {
      setIsLoading(true);
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
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error.response);
      }
    };
    // const [profile, setProfile] = useState("");
    // const handleChangeProfile = (event) => {
    //     setProfile(event.target.files[0]);
    //     console.log(event.target.files[0]);
    // } 
    // const navigate = useNavigate();
    // const handleLogout = async () => {
    //   try {
    //     const response = await axios.get(`https://simantepbareta.cloud/API/logout_adm.php`, {
    //       headers: {}
    //     });
    //     setTimeout(() => {
    //       localStorage.removeItem('nama');
    //       localStorage.removeItem('nrk');
    //       localStorage.removeItem('sisa_cuti');
    //       localStorage.removeItem('f_profile');
    //       localStorage.removeItem('jabatan');
    //       localStorage.removeItem('email');
    //       localStorage.removeItem('Status');
    //       localStorage.removeItem('pj');
    //       localStorage.removeItem('Id_user');
    //       alert(response.data.message);
    //       navigate('/');
    //     }, 1000);
    //   } catch (error) {
    //     console.log(error.response);
    //   }
    // }
    // const uploadProfile = async (event) => {
    //     event.preventDefault();
    //     const payload ={
    //         profile_image: profile
    //     }
    //     try {
    //         const response = await axios.post(`https://simantepbareta.cloud/API/upload_gambar_profile.php?id=${id_user}`, payload, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data"
    //             }
    //         })
    //         console.log(response.data.message);
    //         showBrowserNotification('Profile Updated', {
    //           body: response.data.message,
    //           icon: 'https://simantepbareta.cloud/API/LOGO%20BNN%20AI%20HD%20TERBARU%202023.png'
    //         });
    //         setTimeout(() => {
    //             handleLogout();
    //         }, 2000);
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // }
    return (
        <>
            <div className='home'>
              {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
              </div>}
                <Banner Logout={handleLogout} />
                <div className='asset'></div>
                {level === 'level-1' && 
                  <>
                    <div className='profile-info'>
                    <h1>Data Identitas</h1>                    
                    <form>
                        <div className='field'>
                          <label htmlFor="nama">Nama</label>
                          <input disabled value={nama} type="text" />
                        </div>
                        <div className='field'>
                          <label htmlFor="nrk_nip">NRK/NIP</label>
                          <input disabled value={nrk_nip} type="text" />
                        </div>
                        <div className='field'>
                          <label htmlFor="username">Username</label>
                          <input disabled value={username} type="text" name="" id="" />
                        </div>
                        <div className='field'>
                          <label htmlFor="jabatan">Jabatan</label>
                          <input disabled value={jabatan} type="text" />
                        </div>
                        <div className='field'>
                          <label htmlFor="nama_role">Unit Kerja</label>
                          <input disabled value={nama_role} type="text" />
                        </div>
                        <div className='field'>
                          <label htmlFor="kode_role">Kode Unit Kerja</label>
                          <input disabled value={kode_role} type="text" />
                        </div>
                        <div className='field' style={{display:"none"}}>
                          <label htmlFor="kode_role">Akses Level</label>
                          <input disabled value={akses_level} type="text" />
                        </div>
                        <div style={{display:"none"}} className='field'>
                          <label htmlFor="kode_role">Spesial Akses</label>
                          <input disabled value={nama_role_sp} type="text" />
                        </div>  
                        {/* <label htmlFor="">Upload foto Profile</label>
                        <div className='u-profile'>
                            <input onChange={handleChangeProfile} className='file' type="file" name="" id="" />
                            <button onClick={uploadProfile}>Upload Gambar</button>
                        </div> */}
                      </form>
                    </div>
                  </>
                }
                {level === 'level-2' && 
                  <>
                    <div className='profile-info'>
                    <h1>Data Identitas</h1>                    
                    <form>
                        <div className='field'>
                          <label htmlFor="nama">Nama</label>
                          <input disabled value={nama} type="text" />
                        </div>
                        <div className='field'>
                          <label htmlFor="nrk_nip">NRK/NIP</label>
                          <input disabled value={nrk_nip} type="text" />
                        </div>
                        <div className='field'>
                          <label htmlFor="username">Username</label>
                          <input disabled value={username} type="text" name="" id="" />
                        </div>
                        <div className='field'>
                          <label htmlFor="jabatan">Jabatan</label>
                          <input disabled value={jabatan} type="text" />
                        </div>
                        <div className='field'>
                          <label htmlFor="nama_role">Unit Kerja</label>
                          <input disabled value={nama_role_c} type="text" />
                        </div>
                        <div className='field'>
                          <label htmlFor="kode_role">Kode Unit Kerja</label>
                          <input disabled value={kode_role_c} type="text" />
                        </div>
                        <div className='field' style={{display:"none"}}>
                          <label htmlFor="kode_role">Akses Level</label>
                          <input disabled value={akses_level} type="text" />
                        </div>      
                        {/* <label htmlFor="">Upload foto Profile</label>
                        <div className='u-profile'>
                            <input onChange={handleChangeProfile} className='file' type="file" name="" id="" />
                            <button onClick={uploadProfile}>Upload Gambar</button>
                        </div> */}
                      </form>
                    </div>
                  </>
                }
                {level === 'level-3' && 
                  <>
                    <div className='profile-info'>
                    <h1>Data Identitas</h1>                    
                    <form>
                        <div className='field'>
                          <label htmlFor="nama">Nama</label>
                          <input disabled value={nama} type="text" />
                        </div>
                        <div className='field'>
                          <label htmlFor="nrk_nip">NRK/NIP</label>
                          <input disabled value={nrk_nip} type="text" />
                        </div>
                        <div className='field'>
                          <label htmlFor="username">Username</label>
                          <input disabled value={username} type="text" name="" id="" />
                        </div>
                        <div className='field'>
                          <label htmlFor="jabatan">Jabatan</label>
                          <input disabled value={jabatan} type="text" />
                        </div>
                        <div className='field'>
                          <label htmlFor="nama_role">Unit Kerja</label>
                          <input disabled value={nama_role_b} type="text" />
                        </div>
                        <div className='field'>
                          <label htmlFor="kode_role">Kode Unit Kerja</label>
                          <input disabled value={kode_role_b} type="text" />
                        </div>
                        <div className='field' style={{display:"none"}}>
                          <label htmlFor="kode_role">Akses Level</label>
                          <input disabled value={akses_level} type="text" />
                        </div>      
                        {/* <label htmlFor="">Upload foto Profile</label>
                        <div className='u-profile'>
                            <input onChange={handleChangeProfile} className='file' type="file" name="" id="" />
                            <button onClick={uploadProfile}>Upload Gambar</button>
                        </div> */}
                      </form>
                    </div>
                  </>
                }
                {level === 'level-4' && 
                  <>
                    <div className='profile-info'>
                    <h1>Data Identitas</h1>                    
                    <form>
                        <div className='field'>
                          <label htmlFor="nama">Nama</label>
                          <input disabled value={nama} type="text" />
                        </div>
                        <div className='field'>
                          <label htmlFor="nrk_nip">NRK/NIP</label>
                          <input disabled value={nrk_nip} type="text" />
                        </div>
                        <div className='field'>
                          <label htmlFor="username">Username</label>
                          <input disabled value={username} type="text" name="" id="" />
                        </div>
                        <div className='field'>
                          <label htmlFor="jabatan">Jabatan</label>
                          <input disabled value={jabatan} type="text" />
                        </div>
                        <div className='field'>
                          <label htmlFor="nama_role">Unit Kerja</label>
                          <input disabled value={nama_role_a} type="text" />
                        </div>
                        <div className='field'>
                          <label htmlFor="kode_role">Kode Unit Kerja</label>
                          <input disabled value={kode_role_a} type="text" />
                        </div>
                        <div className='field' style={{display:"none"}}>
                          <label htmlFor="kode_role">Akses Level</label>
                          <input disabled value={akses_level} type="text" />
                        </div>      
                        {/* <label htmlFor="">Upload foto Profile</label>
                        <div className='u-profile'>
                            <input onChange={handleChangeProfile} className='file' type="file" name="" id="" />
                            <button onClick={uploadProfile}>Upload Gambar</button>
                        </div> */}
                      </form>
                    </div>
                  </>
                }
                {/* <div style={{background: `url(https://simantepbareta.cloud/API/${storedFProfile})`, backgroundSize: "cover", backgroundPosition: "50% 10%"}} className='profile-pic'></div> */}
                {level === 'level-1' && <Menu akses_level={akses_level} kode_role={kode_role} nama={nama} kode_role_sp={kode_role_sp} />}
                {level === 'level-2' && <Menu akses_level={akses_level} kode_role={kode_role_c} nama={nama} kode_role_sp={kode_role_sp} />}
                {level === 'level-3' && <Menu akses_level={akses_level} kode_role={kode_role_b} nama={nama} kode_role_sp={kode_role_sp} />}
                {level === 'level-4' && <Menu akses_level={akses_level} kode_role={kode_role_a} nama={nama} kode_role_sp={kode_role_sp} />}
                <Footer />
            </div>
        </>
    );
};

export default Homepage;
