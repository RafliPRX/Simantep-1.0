import default_pic from '../assets/profile.jpg';
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
const Info_Silaras = ({nama}) => {
        const [notif_fix, setNotif] = useState([]);
        const [notif_vehicle, setNotif2] = useState([]);
        const [notif_bhp, setNotif3] = useState([]);
        const getNotif = async () => {
          try {
            const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/notif_fix_byName.php?nama=${nama}` , {
              headers: {"Content-Type": "multipart/form-data"},
          });
            const response2 = await axios.get(`https://simantepbareta.cloud/API/SILARAS/notif_vehicle_byName.php?nama=${nama}` , {
              headers: {"Content-Type": "multipart/form-data"},
          });
            const response3 = await axios.get(`https://simantepbareta.cloud/API/SILARAS/notif_bhp_byName.php?nama=${nama}` , {
              headers: {"Content-Type": "multipart/form-data"},
          });
          console.log(response.data);
          console.log(response2.data);
          console.log(response3.data);
          setNotif(response.data);
          setNotif2(response2.data);
          setNotif3(response3.data);
          } catch (error) {
            console.log(error);            
          }
        }
        const mark_fix = async (idNotif, event) => {
          event.preventDefault();
          const payload = {
              stat: "Disable"
          }
          try {
              const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/mark_fix.php?id=${idNotif}`, payload, {
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
        const mark_bhp = async (idNotif, event) => {
          event.preventDefault();
          const payload = {
              stat: "Disable"
          }
          try {
              const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/mark_bhp.php?id=${idNotif}`, payload, {
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
        const mark_vehicle = async (idNotif, event) => {
          event.preventDefault();
          const payload = {
              stat: "Disable"
          }
          try {
              const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/mark_vehicle.php?id=${idNotif}`, payload, {
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
        const deleted_fix = async (idNotif, event) => {
          event.preventDefault();
          const payload = {
              stat: "Disable"
          }
          try {
              const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/deleted_notif_fix.php?id=${idNotif}`, payload, {
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
        const deleted_bhp = async (idNotif, event) => {
          event.preventDefault();
          const payload = {
              stat: "Disable"
          }
          try {
              const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/deleted_notif_bhp.php?id=${idNotif}`, payload, {
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
        const deleted_vehicle = async (idNotif, event) => {
          event.preventDefault();
          const payload = {
              stat: "Disable"
          }
          try {
              const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/deleted_notif_vehicle.php?id=${idNotif}`, payload, {
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
        const buka_fix = async (idNotif, idFix, event) => {
          event.preventDefault();
          const payload = {
              stat: "Disable"
          }
          try {
              const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/mark_fix.php?id=${idNotif}`, payload, {
                  headers: {"Content-Type": "multipart/form-data"},
              })
              console.log(response.data);
              setTimeout(() => {
                  window.location.href = `/form-perbaikan/${idFix}`
              }, 2000);
          } catch (error) {
              console.log(error.response);
          }
        }
        const buka_bhp = async (idNotif, idBhp, event) => {
          event.preventDefault();
          const payload = {
              stat: "Disable"
          }
          try {
              const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/mark_bhp.php?id=${idNotif}`, payload, {
                  headers: {"Content-Type": "multipart/form-data"},
              })
              console.log(response.data);
              setTimeout(() => {
                  window.location.href = `/form-permintaan-barang-baru/${idBhp}`
              }, 2000);
          } catch (error) {
              console.log(error.response);
          }
        }
        const buka_vehicle = async (idNotif, idPinjam, event) => {
          event.preventDefault();
          const payload = {
              stat: "Disable"
          }
          try {
              const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/mark_vehicle.php?id=${idNotif}`, payload, {
                  headers: {"Content-Type": "multipart/form-data"},
              })
              console.log(response.data);
              setTimeout(() => {
                  window.location.href = `/form-kendaraan-dinas/${idPinjam}`
              }, 2000);
          } catch (error) {
              console.log(error.response);
          }
        }
        useEffect(() => {
          getNotif();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        const [switchFix, setSwitchFix] = useState(true);
        const [switchVehicle, setSwitchVehicle] = useState(false);
        const [switchBhp, setSwitchBhp] = useState(false);
        const SwitchFix = () => {
          setSwitchFix(!switchFix);
          setSwitchVehicle(false);
          setSwitchBhp(false);
      }
      const SwitchVehicle = () => {
          setSwitchVehicle(!switchVehicle);
          setSwitchFix(false);
          setSwitchBhp(false);
      }
      const SwitchBhp = () => {
          setSwitchBhp(!switchBhp);
          setSwitchFix(false);
          setSwitchVehicle(false);
      }
    return(    
    <>
    <div className='switch-button'>
        <button onClick={SwitchFix} className='switch-info'>
          Perbaikan
        </button>
        <button onClick={SwitchVehicle} className='switch-info'>
          Peminjaman Kendaraan
        </button>
        <button onClick={SwitchBhp} className='switch-info'>
          Barang Habis Pakai
        </button>
    </div>
    {switchFix && (
          <> 
            {notif_fix.length > 0 ? (
                <>
                  <p style={{marginLeft: "0px", marginTop: "10px"}} >Perbaikan</p>
                  {notif_fix.map((notif) => (
                      <>
                      <div className='info'>
                        <div style={{background: notif.f_profile === '' ? `url(${default_pic})` : `url(https://simantepbareta.cloud/API/${notif.f_profile})`, backgroundSize: notif.f_profile === '' ? "173%" : "89%", backgroundPosition: notif.f_profile === '' ? "48% 10%" : "34% 5%"}} className='pic'></div>
                        <p style={{ marginTop: '0px' }}>{notif.sender}</p>
                        <p style={{ marginTop: '0px' }}>{notif.subjek}</p>
                        <div className='mark-read-deleted'>
                          <button onClick={(event) => mark_fix(notif.id_notif, event)}>Telah dibaca</button>
                          <button onClick={(event) => deleted_fix(notif.id_notif, event)}>Hapus</button>
                          <button onClick={(event) => buka_fix(notif.id_notif, notif.id_fix, event)}>Buka</button>
                        </div>
                    </div>
                    </>                  
                  ))} 
                </>       
              ) : (
                  <div className='info'>
                    <p style={{ marginTop: '0px'}}>Tidak ada notifikasi</p>
                  </div>
              )
            }
          </>  
    )}
    {switchVehicle && (
          <> 
            {notif_vehicle.length > 0 ? (
                <>
                  <p style={{marginLeft: "0px", marginTop: "10px"}} >Peminjaman Kendaraan</p>
                  {notif_vehicle.map((notif) => (
                      <>
                      <div className='info'>
                        <div style={{background: notif.f_profile === '' ? `url(${default_pic})` : `url(https://simantepbareta.cloud/API/${notif.f_profile})`, backgroundSize: notif.f_profile === '' ? "173%" : "89%", backgroundPosition: notif.f_profile === '' ? "48% 10%" : "34% 5%"}} className='pic'></div>
                        <p style={{ marginTop: '0px' }}>{notif.sender}</p>
                        <p style={{ marginTop: '0px' }}>{notif.subjek}</p>
                        <div className='mark-read-deleted'>
                          <button onClick={(event) => mark_vehicle(notif.id_notif, event)}>Telah dibaca</button>
                          <button onClick={(event) => deleted_vehicle(notif.id_notif, event)}>Hapus</button>
                          <button onClick={(event) => buka_vehicle(notif.id_notif, notif.id_pinjam, event)}>Buka</button>
                        </div>
                    </div>
                    </>                  
                  ))} 
                </>       
              ) : (
                  <div className='info'>
                    <p style={{ marginTop: '0px'}}>Tidak ada notifikasi</p>
                  </div>
              )
            }
          </>  
    )}
    {switchBhp && (
          <> 
            {notif_bhp.length > 0 ? (
                <>
                  <p style={{marginLeft: "0px", marginTop: "10px"}} >Barang Habis Pakai</p>
                  {notif_bhp.map((notif) => (
                      <>
                      <div className='info'>
                        <div style={{background: notif.f_profile === '' ? `url(${default_pic})` : `url(https://simantepbareta.cloud/API/${notif.f_profile})`, backgroundSize: notif.f_profile === '' ? "173%" : "89%", backgroundPosition: notif.f_profile === '' ? "48% 10%" : "34% 5%"}} className='pic'></div>
                        <p style={{ marginTop: '0px' }}>{notif.sender}</p>
                        <p style={{ marginTop: '0px' }}>{notif.subjek}</p>
                        <div className='mark-read-deleted'>
                          <button onClick={(event) => mark_bhp(notif.id_notif, event)}>Telah dibaca</button>
                          <button onClick={(event) => deleted_bhp(notif.id_notif, event)}>Hapus</button>
                          <button onClick={(event) => buka_bhp(notif.id_notif, notif.id_bhp, event)}>Buka</button>
                        </div>
                    </div>
                    </>                  
                  ))} 
                </>       
              ) : (
                  <div className='info'>
                    <p style={{ marginTop: '0px'}}>Tidak ada notifikasi</p>
                  </div>
              )
            }
          </>  
    )}
  </>
)
}
export default Info_Silaras
Info_Silaras.propTypes = {
    nama: PropTypes.string
};