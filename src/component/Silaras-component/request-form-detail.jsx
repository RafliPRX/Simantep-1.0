import { useEffect, useState } from 'react'
import './fix-form'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Profile from '../profile'
const Request_Form_Detail = () => {
    const {level} = useParams();
    const {role} = useParams();
    const {role_sp} = useParams();
    const storedUsername = localStorage.getItem('nama');
    const storeNrk = localStorage.getItem('nrk');
    const storedSisaCuti = localStorage.getItem('sisa_cuti');
    const storedFProfile = localStorage.getItem('f_profile');
    const pj = localStorage.getItem('pj');
    const status = localStorage.getItem('Status');
    const storeidNumber = localStorage.getItem('id_number');
    console.log(storedUsername);
    console.log(storedSisaCuti );
    console.log(storedFProfile);
    console.log(storeNrk);
    console.log(pj);
    console.log(status);
    const [isLoading, setIsLoading] = useState(false);

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
    const [approval, setApproval] = useState('');
    const handleChangeApproval = (event) => {
      setApproval(event.target.value);
      console.log(event.target.value);
    }
    const navigate = useNavigate();
    const handleJawab = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      const payload = {
        jawab: jawab,
        Approval: approval,
        last_sent_to: request.nama,
        last_sent_to_id: storeidNumber,
      }
      try {
        const response = axios.post(`https://simantepbareta.cloud/API/SILARAS/answer_request.php?id=${param.id}`,payload, {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        })
        console.log(response.data);
        setTimeout(() => {
          navigate(`/dashboard-laras/${level}/${role}/${role_sp}`);
          alert(response.data.message);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error.response);
        alert(error.response);
        setIsLoading(false);
      }
    }
    return(
        <>
            <div className='main-dashboard'>
              {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
              </div>} 
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
                                  <td className='input'>{request.nrk_nip}</td>
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
                  {role === "C-03" && (
                  <div className='box3'>
                    <form action="">
                      <div className='content-f'>
                        <h1>Jawab</h1>
                        <label htmlFor="">Approval</label>
                        <select name="approval" id="approval" onChange={handleChangeApproval}>
                          <option value="">Approval: </option>
                          <option value="3">Setuju</option>
                          <option value="2">Tolak</option>
                        </select>
                        <label htmlFor="">Jawaban</label>
                        <textarea onChange={handleChangeJawaban} name="jawaban" id="jawaban"></textarea>
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
export default Request_Form_Detail