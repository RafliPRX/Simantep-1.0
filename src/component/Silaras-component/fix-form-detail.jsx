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
  
  const param = useParams();
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
  
  useEffect(() => {
    getDetail();
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
  const handleJawab = async (event) => {
    event.preventDefault();
    const payload = {
      jawab: jawab,
      bukti: image
    }
    try {
      const response = axios.post(`https://simantepbareta.cloud/API/SILARAS/answer_fix.php?id=${param.id}`,payload, {
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      })
      console.log(response.data);
      setTimeout(() => {
        navigate("/dashboard-laras");
        alert(response.data.message);
      }, 1000);
    } catch (error) {
      console.log(error.response);
      alert(error.response);
    }
  }
  return(
      <>
          <div className='main-dashboard'>
              <p>Silaras/Form Perbaikan</p>
              <h1>Form Perbaikan</h1>
              <Profile nama={storedUsername} f_profile={storedFProfile} feature="silaras" />              
              <div className='content-col'>
                  <div className='box3'>
                      <form action="">
                      <div className='content-f'>
                          <h1>Data Perbaikan</h1>
                          <table>
                            <tr>
                              <td>Nama</td>
                            </tr>
                            <tr>
                              <td className='input'>{detail.nama}</td>
                            </tr>
                            <tr>
                              <td>NIP/NRK</td>
                            </tr>
                            <tr>
                              <td className='input'>{detail.nrk}</td>
                            </tr>
                            <tr>
                              <td>Units</td>
                            </tr>
                            <tr>
                              <td className='input'>{detail.unit}</td>
                            </tr>
                            <tr>
                              <td>Permintaan Perbaikan (Deskripsikan Perbaikan)</td>
                            </tr>
                            <tr>
                              <td className='input'>{detail.fix}</td>
                            </tr>
                            <tr>
                              <td>Bukti Gambar</td>
                            </tr>
                            <tr>
                              <td> <img style={{width: '600px', height: 'auto', borderRadius: '10px'}} src={`https://simantepbareta.cloud/API/SILARAS/${detail.foto}`} alt="" /> </td>
                            </tr>
                          </table>
                      </div>
                      </form>
                  </div>
                  <div className='box3'>
                      <form action="">
                      <div className='content-f'>
                          <h1>Jawaban Perbaikan</h1>
                          <table>
                            <tr>
                              <td>Jawaban</td>
                            </tr>
                            <tr>
                              <td className='input'>{detail.jawab}</td>
                            </tr>
                            <tr>
                              <td>Bukti Gambar</td>
                            </tr>
                            <tr>
                              <td className='input'><img style={{width: '600px', height: 'auto', borderRadius: '10px'}} src={`https://simantepbareta.cloud/API/SILARAS/${detail.bukti}`} alt="" /></td>
                            </tr>
                          </table>
                      </div>
                      </form>
                  </div>
                  <div style={{display: status === "Pj. Rumah Tanggal dan Aset" ? 'flex' : 'none'}} className='box3'>
                    <form action="">
                      <div className='content-f'>
                        <h1>Jawab</h1>
                        <label htmlFor="">Jawaban</label>
                        <textarea onChange={handleChangeJawaban} name="" id=""></textarea>
                        <label htmlFor="">Bukti Gambar</label>
                        <input onChange={handleChangeImage} type="file" name="" id="" />
                      </div>
                      <button onClick={handleJawab} className='submit'>Kirim</button>
                    </form>
                  </div>
              </div>
          </div>        
      </>
  )
}

export default Fix_form_Detail;
