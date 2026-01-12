import { useEffect, useState } from 'react'
import './fix-form'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Profile from '../profile'
const Request_Form_Detail = () => {
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
    const [request, setRequest] = useState([]);
    const getRequest = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/detail_request.php?id=${param.id}`, {
                headers: {}
            })
            console.log(response.data);
            setRequest(response.data);
        } catch (error) {
            console.log(error.response);
        }
    };
    useEffect(() => {
        getRequest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [jawab, setJawab] = useState('');
    const handleChangeJawaban = (event) => {
      setJawab(event.target.value);
      console.log(event.target.value);
    }
    const navigate = useNavigate();
    const handleJawab = async (event) => {
      event.preventDefault();
      const payload = {
        jawab: jawab,
      }
      try {
        const response = axios.post(`https://simantepbareta.cloud/API/SILARAS/answer_request.php?id=${param.id}`,payload, {
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
                <p>Silaras/Form Permohonan BHP & ATK</p>
                <h1>Form Permohonan Barang <br /> Habis Pakai & Alat Tulis <br /> Kantor</h1>
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
                                  <td className='input'>{request.nama}</td>
                                </tr>
                                <tr>
                                  <td>NIP/NRK</td>
                                </tr>
                                <tr>
                                  <td className='input'>{request.nrk}</td>
                                </tr>
                                <tr>
                                  <td>Unit Kerja</td>
                                </tr>
                                <tr>
                                  <td className='input'>{request.unit}</td>
                                </tr>
                                <tr>
                                  <td>Permohonan Barang</td>
                                </tr>
                                <tr>
                                  <td className='input'>{request.barang}</td>
                                </tr>
                            </table>
                        </div>
                      <form action="">
                      <div className='content-f'>
                          <h1>Jawaban Permintaan</h1>
                          <table>
                            <tr>
                              <td>Jawaban</td>
                            </tr>
                            <tr>
                              <td className='input'>{request.jawab}</td>
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
                      </div>
                      <button onClick={handleJawab} className='submit'>Kirim</button>
                    </form>
                  </div>
                </div>
            </div>        
        </>
    )
}
export default Request_Form_Detail