import default_pic from '../assets/profile.jpg';
import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
const Info_Simak = ({nama}) => {
        const [notif_surat, setNotif] = useState([]);
        const [notif2, setNotif2] = useState([]);
        const getNotif = async () => {
          try {
            const response = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/notif_lpj_byName.php?nama=${nama}` , {
              headers: {"Content-Type": "multipart/form-data"},
          });
            const response2 = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/notifikasi_dana.php?nama=${nama}` , {
              headers: {"Content-Type": "multipart/form-data"},
          });
          console.log(response.data);
          console.log(response2.data);
          setNotif(response.data);
          setNotif2(response2.data);
          } catch (error) {
            console.log(error);            
          }
        }
        const mark_rpd = async (idNotif, event) => {
          event.preventDefault();
          const payload = {
              stat: "Disable"
          }
          try {
              const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/mark_Dana.php?id=${idNotif}`, payload, {
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
        const mark_lpj = async (idNotif, event) => {
          event.preventDefault();
          const payload = {
              stat: "Disable"
          }
          try {
              const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/mark_lpj.php?id=${idNotif}`, payload, {
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
        const deleted_rpd = async (idNotif, event) => {
          event.preventDefault();
          const payload = {
              stat: "Disable"
          }
          try {
              const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/deleted_notif_dana.php?id=${idNotif}`, payload, {
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
        const deleted_lpj = async (idNotif, event) => {
          event.preventDefault();
          const payload = {
              stat: "Disable"
          }
          try {
              const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/deleted_notif_lpj.php?id=${idNotif}`, payload, {
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
        const buka_rpd = async (idNotif, idRpd, event) => {
          event.preventDefault();
          const payload = {
              stat: "Disable"
          }
          try {
              const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/mark_Dana.php?id=${idNotif}`, payload, {
                  headers: {"Content-Type": "multipart/form-data"},
              })
              console.log(response.data);
              setTimeout(() => {
                  window.location.href = `/form-dana-RPD/${idRpd}`
              }, 2000);
          } catch (error) {
              console.log(error.response);
          }
        }
        const buka_lpj = async (idNotif, idLpj, event) => {
          event.preventDefault();
          const payload = {
              stat: "Disable"
          }
          try {
              const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/mark_lpj.php?id=${idNotif}`, payload, {
                  headers: {"Content-Type": "multipart/form-data"},
              })
              console.log(response.data);
              setTimeout(() => {
                  window.location.href = `/form-dana-LPJ/${idLpj}`
              }, 2000);
          } catch (error) {
              console.log(error.response);
          }
        }
        useEffect(() => {
          getNotif();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        const [isSwitch, setIsSwitch] = useState(true);
        const getSwitch = () => {
          setIsSwitch(!isSwitch)
        }
    return(    
    <>
    <div className='switch-button'>
        <button onClick={getSwitch} className='switch-info'>
          {isSwitch ? "RPD" : "LPJ"}
        </button>
    </div>
      { isSwitch ? (
        <> 
            {notif_surat.length > 0 ? (
              <>
                <p style={{marginLeft: "0px", marginTop: "10px"}} >Proposal dan LPJ</p>
                {notif_surat.map((notif) => (
                    <>
                    <div className='info'>
                      <div style={{background: notif.f_profile === '' ? `url(${default_pic})` : `url(https://simantepbareta.cloud/API/${notif.f_profile})`, backgroundSize: notif.f_profile === '' ? "173%" : "89%", backgroundPosition: notif.f_profile === '' ? "48% 10%" : "34% 5%"}} className='pic'></div>
                      <p style={{ marginTop: '0px' }}>{notif.sender}</p>
                      <p style={{ marginTop: '0px' }}>{notif.subjek}</p>
                      <div className='mark-read-deleted'>
                        <button onClick={(event) => mark_lpj(notif.id_notif, event)}>Telah dibaca</button>
                        <button onClick={(event) => deleted_lpj(notif.id_notif, event)}>Hapus</button>
                        <button onClick={(event) => buka_lpj(notif.id_notif, notif.id_lpj, event)}>Buka</button>
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
      ): (
      <>
          {notif2.length > 0 ? (
            <>
              <p style={{marginLeft: "0px",  marginTop: "10px"}} >Rencana Penarikan Dana</p>
              {notif2.map((notif) => (
                  <>
                  <div className='info'>
                    <div style={{background: notif.f_profile === '' ? `url(${default_pic})` : `url(https://simantepbareta.cloud/API/${notif.f_profile})`, backgroundSize: notif.f_profile === '' ? "173%" : "89%", backgroundPosition: notif.f_profile === '' ? "48% 10%" : "34% 5%"}} className='pic'></div>
                    <p style={{ marginTop: '0px' }}>{notif.sender}</p>
                    <p style={{ marginTop: '0px' }}>{notif.subjek}</p>
                    <div className='mark-read-deleted'>
                      <button onClick={(event) => mark_rpd(notif.id_notif, event)}>Telah dibaca</button>
                      <button onClick={(event) => deleted_rpd(notif.id_notif, event)}>Hapus</button>
                      <button onClick={(event) => buka_rpd(notif.id_notif, notif.id_dana, event)}>Buka</button>
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
  </>
)
}
export default Info_Simak
Info_Simak.propTypes = {
    nama: PropTypes.string
};