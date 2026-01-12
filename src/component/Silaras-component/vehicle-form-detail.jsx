import { useEffect, useState } from 'react'
import './fix-form.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Profile from '../profile';

const Vehicle_Detail = () => {
    const storedUsername = localStorage.getItem('nama');
    const storeNrk = localStorage.getItem('nrk');
    const storedSisaCuti = localStorage.getItem('sisa_cuti');
    const storedFProfile = localStorage.getItem('f_profile');
    const pj = localStorage.getItem('pj');
    const Status = localStorage.getItem('Status');
    console.log(storedUsername);
    console.log(storedSisaCuti );
    console.log(storedFProfile);
    console.log(storeNrk);
    console.log(pj);

    const param = useParams();

    const [detail, setDetail] = useState({});
    const getDetail = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/detail_vehicle.php?id=${param.id}`, {
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
    },[])
    const [jawab, setJawaban] = useState('');
    const handleChangeJawaban = (event) => {
      setJawaban(event.target.value);
      console.log(event.target.value);
    }
    const [status, setStatus] = useState('');
    const handleChangeStatus = (event) => {
      setStatus(event.target.value);
      console.log(event.target.value);
    }
    const navigate = useNavigate();
    const handleJawab = async (event) => {
      event.preventDefault();
      const payload = {
        jawab: jawab,
        Approval: status
      }
      try {
        const response = axios.post(`https://simantepbareta.cloud/API/SILARAS/answer_vehicle.php?id=${param.id}`,payload, {
          headers: {
          'Content-Type': 'multipart/form-data',
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
                <p>Silaras/Form Peminjaman Kendaraan Dinas</p>
                <h1>Form Peminjaman <br /> Kendaraan Dinas</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="silaras" />                 
                <div className='content-col'>
                    <div className='box3'>                      
                        <div className='content-f'>
                            <h1>Data Diri Peminjam</h1>
                            <table>
                              <tr>
                                <td>Nama</td>
                              </tr>
                              <tr>
                                <td className='input'>{detail.nama}</td>
                              </tr>
                              <tr>
                                <td>Unit Kerja</td>
                              </tr>
                              <tr>
                                <td className='input'>{detail.unit}</td>
                              </tr>
                              <tr>
                                <td>Jenis Kendaraan Peminjaman</td>
                              </tr>
                              <tr>
                                <td className='input'>{detail.jenis}</td>
                              </tr>
                              <tr>
                                <td>Tanggal Peminjaman</td>
                              </tr>
                              <tr>
                                <td className='input'>{detail.tanggal_pinjam}</td>
                              </tr>
                              <tr>
                                <td>Jam Peminjaman</td>
                              </tr>
                              <tr>
                                <td className='input'>{detail.jam_pinjam}</td>
                              </tr>
                              <tr>
                                <td>Durasi Pinjam</td>
                              </tr>
                              <tr>
                                <td className='input'>{detail.durasi_pinjam}</td>
                              </tr>
                            </table>
                        </div>
                      <form action="">
                      <div className='content-f'>
                          <h1>Jawaban Peminjaman</h1>
                          <table>
                            <tr>
                              <td>Jawaban</td>
                            </tr>
                            <tr>
                              <td className='input'>{detail.jawab}</td>
                            </tr>
                          </table>
                      </div>
                      </form>
                  </div>
                  <div style={{display: Status == 4 ? 'flex' : 'none'}}  className='box3'>
                    <form action="">
                      <div className='content-f'>
                        <h1>Jawab</h1>
                        <label htmlFor="">Jawaban</label>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                          <input onChange={handleChangeStatus} style={{width: '20px', height: '20px'}} type="checkbox" value='3' name="" id="" />
                          <label htmlFor="">Menerima</label>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                          <input onChange={handleChangeStatus} style={{width: '20px', height: '20px'}} type="checkbox" value='2' name="" id="" />
                          <label htmlFor="">Menolak</label>
                        </div>
                        <textarea onChange={handleChangeJawaban} name="" id=""></textarea>
                      </div>
                      <button onClick={handleJawab} className='submit'>Kirim</button>
                    </form>
                  </div>
                </div>
            </div>        
        </>
    )
}
export default Vehicle_Detail

