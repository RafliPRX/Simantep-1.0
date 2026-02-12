import { useEffect, useState } from 'react';
import './fix-form.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../profile';

const Fix_form_Detail = () => { 
  const storedUsername = localStorage.getItem('nama');
  const storeNrk = localStorage.getItem('nrk');
  const storedSisaCuti = localStorage.getItem('sisa_cuti');
  const storedFProfile = localStorage.getItem('f_profile');
  const pj = localStorage.getItem('pj');
  const status = localStorage.getItem('Status');
  console.log(storedUsername);
  console.log(storedSisaCuti );
  console.log(storedFProfile);
  console.log(storeNrk);
  console.log(pj);
  console.log(status);
  const [isLoading, setIsLoading] = useState(false);
  const { role } = useParams();
  const { role_sp } = useParams();
  const { level } = useParams();
  const param = useParams();
  const storeidNumber = localStorage.getItem('id_number');
  const [detail, setDetail] = useState({});
  const getDetail = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/detail_fix.php?id=${param.id}`, {
            headers: {}
        })
        setDetail(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
  };
  const [notif_detail, setNotifDetail] = useState({});
  console.log("id notif yang diambil: "+notif_detail?.id_notif);
    
  const getNotifDetail = async () => {
      try {
          const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/notif_fix_byReceive.php?id=${param.id}`, {
              headers: {}
          });
          setNotifDetail(response.data[0]);
          console.log(response.data[0]);
      } catch (error) {
          console.error(error);
      }
  }
  useEffect(() => {
    getDetail();
    getNotifDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const [image, setImage] = useState(null);
  const handleChangeImage = (event) => {
    setImage(event.target.files[0]);
    console.log(event.target.files[0]);
  }
  const [jawab, setJawaban] = useState('');
  const handleChangeJawaban = (event) => {
    setJawaban(event.target.value);
    console.log(event.target.value);
  }
  const navigate = useNavigate();
  const handleJawab_sarpras = async () => {
    const payload = {
      jawab: jawab,
      Approval: '3',
      bukti: image,
      last_sent_to: detail.nama,
      last_sent_to_id: storeidNumber,
    }
    try {
      const response = axios.post(`https://simantepbareta.cloud/API/SILARAS/answer_fix.php?id=${param.id}`,payload, {
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      })
      console.log(response.data);
      setTimeout(() => {
        navigate(`/dashboard-laras/${level}/${role}/${role_sp}`);
        alert(response.data.message);
      }, 1000);
    } catch (error) {
      console.log(error.response);
      alert(error.response);
    }
  }
  const mark_Fix = async (idNotif) => {
        const payload = {
            stat: "Disable"
        }
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/mark_fix.php?id=${idNotif}`, payload, {
                headers: {"Content-Type": "multipart/form-data"},
            })
            console.log(response.data);
        } catch (error) {
            console.log(error.response);
        }
  }
  const handleJawab = async (notifId ,event) => {
      event.preventDefault();
      try {
        setIsLoading(true);
        await mark_Fix(notifId);
        await handleJawab_sarpras();
      } catch (error) {
        console.log(error);        
      } finally {
        setIsLoading(false);
      }      
  }
  return(
      <>
          <div className='main-dashboard'>
          {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
            </div>}  
              <p>Silaras/Formulir Perbaikan</p>
              <h1>Formulir Perbaikan</h1>
              <Profile nama={storedUsername} f_profile={storedFProfile} feature="silaras" />              
              <div className='content-col'>
                  <div className='box3'>
                      <form action="">
                      <div className='content-f'>
                          <h1>Data Perbaikan</h1>
                          <label htmlFor="">Nama</label>
                          {/* <input type="text" value={param.id} /> */}
                          <input value={detail.nama} disabled type="text"/>
                          <label htmlFor="">NIP/NRK</label>
                          <input value={detail.nrk_nip} disabled type="text"/>
                          <label htmlFor="">Units</label>
                          <input value={detail.unit} disabled type="text"/>
                          <label htmlFor="">Permintaan Perbaikan (Deskripsikan Perbaikan)</label>
                          <textarea value={detail.fix} disabled name="" id=""></textarea>
                          <label htmlFor="">Gambar Bukti</label>
                          <img style={{width: '600px', height: 'auto', borderRadius: '10px', marginLeft: "35px", marginBottom: "10px"}} src={`https://simantepbareta.cloud/API/SILARAS/${detail.foto}`} alt="" />
                      </div>
                    </form>
                  </div>
                  {detail.Approval === "3" && (
                    <div className='box3'>
                      <form action="">
                      <div className='content-f'>
                          <h1>Jawaban Perbaikan</h1>
                            <label htmlFor="">Permintaan Perbaikan (Deskripsikan Perbaikan)</label>
                            <textarea value={detail.jawab} name="" id=""></textarea>
                            <label htmlFor="">Bukti Gambar</label>
                            <img style={{width: '600px', height: 'auto', borderRadius: '10px'}} src={`https://simantepbareta.cloud/API/SILARAS/${detail.bukti}`} alt="" />
                      </div>
                      </form>
                    </div>
                  )}                  
                  {role === 'C-03' && (
                  <div className='box3'>
                    <form action="">
                      <div className='content-f'>
                        <h1>Jawab</h1>
                        <label htmlFor="">Jawaban</label>
                        <textarea onChange={handleChangeJawaban} name="" id=""></textarea>
                        <label htmlFor="">Bukti Gambar</label>
                        <input onChange={handleChangeImage} type="file" name="" id="" />
                      </div>
                      <button onClick={(e) => handleJawab(notif_detail.id_notif, e)} className='submit'>Kirim</button>
                    </form>
                  </div>
                  )}
                  {role_sp === 'S-03' && (
                  <div className='box3'>
                    <form action="">
                      <div className='content-f'>
                        <h1>Jawab</h1>
                        <label htmlFor="">Jawaban</label>
                        <textarea onChange={handleChangeJawaban} name="" id=""></textarea>
                        <label htmlFor="">Bukti Gambar</label>
                        <input onChange={handleChangeImage} type="file" name="" id="" />
                      </div>
                      <button onClick={(e) => handleJawab(notif_detail.id_notif, e)} className='submit'>Kirim</button>
                    </form>
                  </div>
                  )}
              </div>
          </div>        
      </>
  )
}

export default Fix_form_Detail;
