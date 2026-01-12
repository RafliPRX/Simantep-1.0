import axios from 'axios';
import Banner from '../../component/Homepage-component/banner';
import Footer from '../../component/Homepage-component/footer';
import './home_admin.css';
import { useState, useEffect } from 'react';
import icon from '../../assets/icon.png';
import { useNavigate } from 'react-router-dom';
import Menu_Admin from '../../component/Homepage-component/menu_admin';

const storedUsername = localStorage.getItem('nama');
const storeNrk = localStorage.getItem('nrk');
const storedSisaCuti = localStorage.getItem('sisa_cuti');
const storedFProfile = localStorage.getItem('f_profile');
const jabatan = localStorage.getItem('jabatan');
const kelompok = localStorage.getItem('pj');
const status = localStorage.getItem('Status');
const id_user = localStorage.getItem('Id_user');
const email = localStorage.getItem('email');
const pj = localStorage.getItem('pj');
console.log('nama: ' +storedUsername);
console.log(storedSisaCuti );
console.log(storedFProfile);
console.log('nrk: '+storeNrk);
console.log('jabatan: ' +jabatan);
console.log('kelompok: ' +kelompok);
console.log('status: ' +status);
console.log("Id = " +id_user);
console.log("Username= " +email);
console.log('pj: ' +pj);


// Notification helper functions
const showBrowserNotification = (title, options) => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return;
  }
  
  if (Notification.permission === "granted") {
    const notification = new Notification(title, options);
    notification.onclick = (event) => {
      event.preventDefault(); // Prevent the default action
      // window.location.href = '/Home'; // Redirect to '/home'
    };
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission()
  }
};
// eslint-disable-next-line react-refresh/only-export-components
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
const Notification_Surat = (title, options, id_surat, idNotif) => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return;
  }
  
  if (Notification.permission === "granted") {
    const notification = new Notification(title, options, id_surat, idNotif);
    notification.onclick = (event) => {
      event.preventDefault(); // Prevent the default action
      updateNotif_surat(idNotif);
      window.location.href = `/Cuti-detail/${id_surat}`; // Redirect to '/home'
    };
  } else {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        const notification = new Notification(title, options, id_surat, idNotif);
        notification.onclick = () => {
          updateNotif_surat(idNotif);
          window.location.href = `/Cuti-detail/${id_surat}`;
        };
      } else {
        console.log("Notification permission denied");
      }
    });
  }
};

const Notification_Lpj = (title, options, id_LPJ, id_Notif) => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return;
  }
  if (Notification.permission === "granted") {
    const notification = new Notification(title, options, id_LPJ, id_Notif);
    notification.onclick = (event) => {
      event.preventDefault(); // Prevent the default action
      window.location.href = `/form-dana-LPJ/${id_LPJ}`; // Redirect to '/home'
    };
  } else {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        const notification = new Notification(title, options, id_LPJ, id_Notif);
        notification.onclick = () => {
          updateNotif_surat(id_Notif);
          window.location.href = `/form-dana-LPJ/${id_LPJ}`;
        };
      } else {
        console.log("Notification permission denied");
      }
    });
  }
} 
const Notification_Dana = (title, options, idDana, id_Notif) => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return;
  }
  if (Notification.permission === "granted") {
    const notification = new Notification(title, options, idDana, id_Notif);
    notification.onclick = (event) => {
      event.preventDefault(); // Prevent the default action
      window.location.href = `/form-dana-RPD/${idDana}`; // Redirect to '/home'
    };
  } else {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        const notification = new Notification(title, options, idDana, id_Notif);
        notification.onclick = () => {
          updateNotif_surat(id_Notif);
          window.location.href = `/form-dana-RPD/${idDana}`;
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

const Home_Admin = () => {
    const [notif_surat, setNotif_surat] = useState([]);
    const getNotif_surat = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/notifikasi_surat_byName_Actv.php?nama=${storedUsername}` , {
          headers: {"Content-Type": "multipart/form-data"},
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
        const response = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/notif_lpj_byName_Actv.php?nama=${storedUsername}` , {
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
        const response = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/notifikasi_dana_Actv.php?nama=${storedUsername}` , {
          headers: {"Content-Type": "application/json"},
        });
        console.log(response.data);
        setNotif_dana(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    const [notif_fix, setNotif_fix] = useState([]);
    const getNotif_Fix = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/notif_fix_byName_Actv.php?nama=${storedUsername}` , {
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
        const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/notif_vehicle_byName_Actv.php?nama=${storedUsername}` , {
          headers: {"Content-Type": "application/json"},
        });
        console.log(response.data);
        setNotif_Vehicle(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    const [notif_bhp, setNotif_bhp] = useState([]);
    const getNotif_Bhp = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/notif_bhp_byName_Actv.php?nama=${storedUsername}` , {
          headers: {"Content-Type": "application/json"},
        });
        console.log(response.data);
        setNotif_bhp(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
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
              Notification_Surat(notif.sender, {
                body: notif.subjek,
                icon: `${icon}`
              }, notif.id_surat, notif.id_notif);
            }
          });
        }
        if (notif_lpj.length > 0) {
          notif_lpj.map((Notif) => {
            if (Notification.permission === "granted") {
              Notification_Lpj(Notif.sender, {
                body: Notif.subjek,
                icon: `${icon}`
              }, Notif.id_lpj, Notif.id_notif);
            }
          });
        }
        if (notif_dana.length > 0) {
          notif_dana.map((Notif) => {
            if (Notification.permission === "granted") {
              Notification_Dana(Notif.sender, {
                body: Notif.subjek,
                icon: `${icon}`
              }, Notif.id_dana, Notif.id_notif);
            }
          });
        }
        if (notif_fix.length > 0) {
          notif_fix.map((Notif) => {
            if (Notification.permission === "granted") {
              Notification_Fix(Notif.sender, {
                body: Notif.subjek,
                icon: `${icon}`
              }, Notif.id_fix, Notif.id_notif);
            }
          });
        }
        if (notif_vehicle.length > 0) {
          notif_vehicle.map((Notif) => {
            if (Notification.permission === "granted") {
              Notification_Vehicle(Notif.sender, {
                body: Notif.subjek,
                icon: `${icon}`
              }, Notif.id_pinjam, Notif.id_notif);
            }
          });
        }
        if (notif_bhp.length > 0) {
          notif_bhp.map((Notif) => {
            if (Notification.permission === "granted") {
              Notification_Bhp(Notif.sender, {
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
    }, [notif_lpj, notif_surat, notif_dana, notif_fix, notif_vehicle, notif_bhp]);
    const scrollClick = () => {
        console.log('discover');
        window.scrollTo({top: 1100, behavior: 'smooth'});
    };
    const [profile, setProfile] = useState("");
    const handleChangeProfile = (event) => {
        setProfile(event.target.files[0]);
        console.log(event.target.files[0]);
    } 
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
    const uploadProfile = async (event) => {
        event.preventDefault();
        const payload ={
            profile_image: profile
        }
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/upload_gambar_profile.php?id=${id_user}`, payload, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log(response.data.message);
            showBrowserNotification('Profile Updated', {
              body: response.data.message,
              icon: 'https://simantepbareta.cloud/API/LOGO%20BNN%20AI%20HD%20TERBARU%202023.png'
            });
            setTimeout(() => {
                handleLogout();
            }, 2000);
        } catch (error) {
            console.log(error.response);
        }
    }
    return (
        <>
            <div className='home'>
                <Banner onDiscoveryClick={scrollClick} />
                <div className='asset'></div>
                <div className='profile-info'>
                    <h1>Data Diri</h1>
                    <form>
                        <label htmlFor="">Nama</label>
                        <input disabled value={storedUsername} type="text" />
                        <label htmlFor="">NRK/NIP</label>
                        <input disabled value={storeNrk} type="text" />
                        <label htmlFor="">Username atau Email</label>
                        <input disabled value={email} type="text" name="" id="" />
                        <label htmlFor="">Jabatan</label>
                        <input disabled value={jabatan} type="text" />
                        <label style={{display: status === "ppnpn" ? "flex" : "none"}} htmlFor="">Penanggung Jawab</label>
                        <input disabled value={pj} style={{display: status === "ppnpn" ? "flex" : "none"}} type="text" />
                        <label htmlFor="">Upload foto Profile</label>
                        <div className='u-profile'>
                            <input onChange={handleChangeProfile} className='file' type="file" name="" id="" />
                            <button onClick={uploadProfile}>Upload Gambar</button>
                        </div>
                    </form>
                </div>
                <div style={{background: `url(https://simantepbareta.cloud/API/${storedFProfile})`, backgroundSize: "cover", backgroundPosition: "50% 10%"}} className='profile-pic'></div>
                <Menu_Admin />
                <Footer />
            </div>
        </>
    );
};

export default Home_Admin;
