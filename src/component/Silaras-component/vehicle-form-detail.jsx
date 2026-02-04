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
    const [isLoading, setIsLoading] = useState(false);
    const {role} = useParams();
    const {role_sp} = useParams();
    const {level} = useParams();
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
      setIsLoading(true);
      const payload = {
        jawab: jawab,
        Approval: status,
        last_sent_to: detail.nama,
        last_sent_to_id: detail.id_number
      }
      try {
        const response = axios.post(`https://simantepbareta.cloud/API/SILARAS/answer_vehicle.php?id=${param.id}`,payload, {
          headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      console.log(response.data);
      setTimeout(() => {
        setIsLoading(false);
        navigate(`/dashboard-laras/${level}/${role}/${role_sp}`);
        alert(response.data.message);
      }, 1000);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response);
        alert(error.response);  
      }
    }
    return(
        <>
            <div className='main-dashboard'>
              {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
              </div>} 
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
                                <td>NRK/NIP</td>
                              </tr>
                              <tr>
                                <td className='input'>{detail.nrk_nip}</td>
                              </tr>
                              <tr>
                                <td>Jabatan</td>
                              </tr>
                              <tr>
                                <td className='input'>{detail.jabatan}</td>
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
                  {role === "C-03" && (
                    <div className='box3'>
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
                  )}
                  
                </div>
            </div>        
        </>
    )
}
export default Vehicle_Detail

