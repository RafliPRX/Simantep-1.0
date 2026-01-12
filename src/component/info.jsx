import default_pic from '../assets/profile.jpg';
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
const Info = ({nama}) => {
        const [notif_surat, setNotif] = useState([]);
        const getNotif = async () => {
            try {
              const response = await axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/notifikasi_surat_all.php?nama=${nama}` , {
                  headers: {"Content-Type": "multipart/form-data"},
              });
              console.log(response.data);
              setNotif(response.data);
            } catch (error) {
                console.log(error.response);
            }
        }
        const mark = async (idNotif, event) => {
          event.preventDefault();
          const payload = {
              stat: "Disable"
          }
          try {
              const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/mark_as_read.php?id=${idNotif}`, payload, {
                  headers: {"Content-Type": "multipart/form-data"},
              })
              console.log(response.data);
              setTimeout(() => {
                  window.location.reload();
              }, 2000);
          } catch (error) {
              console.log(error.response);
          }
        }
        const deleted = async (idNotif, event) => {
          event.preventDefault();
          const payload = {
              stat: "Disable"
          }
          try {
              const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/delete_notif_surat.php?id=${idNotif}`, payload, {
                  headers: {"Content-Type": "multipart/form-data"},
              })
              console.log(response.data);
              setTimeout(() => {
                  window.location.reload();
              }, 2000);
          } catch (error) {
              console.log(error.response);
          }
        }
        const buka_surat = async (idNotif, idSurat, event) => {
          event.preventDefault();
          const payload = {
              stat: "Disable"
          }
          try {
              const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/mark_as_read.php?id=${idNotif}`, payload, {
                  headers: {"Content-Type": "multipart/form-data"},
              })
              console.log(response.data);
              setTimeout(() => {
                  window.location.href = `/Cuti-detail/${idSurat}`
              }, 2000);
          } catch (error) {
              console.log(error.response);
          }
        }
        useEffect(() => {
          getNotif();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

    return(
    <>
            {notif_surat.length > 0 ? (
             <>
                {notif_surat.map((notif) => (
                    <>
                    <div className='info'>
                      <div style={{background: notif.f_profile === '' ? `url(${default_pic})` : `url(https://simantepbareta.cloud/API/${notif.f_profile})`, backgroundSize: notif.f_profile === '' ? "173%" : "89%", backgroundPosition: notif.f_profile === '' ? "48% 10%" : "34% 5%"}} className='pic'></div>
                      <p style={{ marginTop: '0px' }}>{notif.sender}</p>
                      <p style={{ marginTop: '0px' }}>{notif.subjek}</p>
                      <div className='mark-read-deleted'>
                        <button onClick={(event) => mark(notif.id_notif, event)}>Telah dibaca</button>
                        <button onClick={(event) => deleted(notif.id_notif, event)}>Hapus</button>
                        <button onClick={(event) => buka_surat(notif.id_notif, notif.id_surat, event)}>Buka</button>
                      </div>
                  </div>
                  </>                  
                ))}
              </>         
            ) : (
                <div className='info'>
                  <p style={{ marginTop: '0px' }}>Tidak ada notifikasi</p>
                </div>      
            )
          } 
    </>        
    )
}
export default Info

Info.propTypes = {
  nama: PropTypes.string
};