import axios from 'axios';
import Banner from '../component/Homepage-component/banner';
import Footer from '../component/Homepage-component/footer';
import Menu from '../component/Homepage-component/menu';
import './homepage.css';
import { useState, useEffect } from 'react';
import icon from '../assets/icon.png';

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
    const notification = new Notification(title, options, id_surat);
    notification.onclick = (event) => {
      event.preventDefault(); // Prevent the default action
      window.location.href = `/Cuti-detail/${id_surat}`; // Redirect to '/home'
    };
  } else {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        const notification = new Notification(title, options, id_surat);
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
const Homepage = () => {
    const [notif_surat, setNotif_surat] = useState([]);
    const getNotif_surat = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/notifikasi_surat_by_Kelompok.php?pj=${status}` , {
          headers: {"Content-Type": "multipart/form-data"},
        });
        console.log(response.data);
        setNotif_surat(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        getNotif_surat();
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
      }, 3000); // tampilkan notifikasi setelah 5 detik
    
      return () => {
        clearTimeout(timeoutId);
      };
    }, [notif_surat]);
    const scrollClick = () => {
        console.log('discover');
        window.scrollTo({top: 1100, behavior: 'smooth'});
    };
    const [profile, setProfile] = useState("");
    const handleChangeProfile = (event) => {
        setProfile(event.target.files[0]);
        console.log(event.target.files[0]);
    } 
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
                window.location.reload();
            }, 400);
        } catch (error) {
            console.log(error.response);
        }
    }
    return (
        <>
            <div className='home'>
                <Banner onDiscoveryClick={scrollClick} />
                <div className='asset'></div>
                <div className='profile'>
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
                <Menu />
                <Footer />
            </div>
        </>
    );
};

export default Homepage;
