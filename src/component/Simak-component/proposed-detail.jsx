import { useEffect, useState } from 'react';
import './form.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Profile from '../profile';

const Proposed_Detail = () => {
        const storedUsername = localStorage.getItem('nama');
        const storeNrk = localStorage.getItem('nrk');
        const storedSisaCuti = localStorage.getItem('sisa_cuti');
        const storedFProfile = localStorage.getItem('f_profile');
        const pj = localStorage.getItem('pj');
        const status = localStorage.getItem('Status');
        const [isLoading, setIsLoading] = useState(false);
        console.log(storedUsername);
        console.log(storedSisaCuti );
        console.log(storedFProfile);
        console.log(storeNrk);
        console.log(pj);
      
        const param = useParams();
        const [detail, setDetail] = useState({});
        const getDetail = async () => {
            try {
                const response = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/detail_dana_LPJ.php?id=${param.id}`, {
                    headers: {}
                })
                setDetail(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        useEffect(() => {
            getDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]);

        const [kasubag, setKasubag] = useState("");
        const navigate = useNavigate();
        const handleChangeKasubag = (event) => {
          setKasubag(event.target.value);
          console.log(event.target.value);
        }
        const [head, setHead] = useState("");
        const handleChangeHead = (event) => {
          setHead(event.target.value);
          console.log(event.target.value);
        }
        const [keterangan, setKeterangan] = useState('');
        const handleChangeKeterangan = (event) => {
          setKeterangan(event.target.value);
          console.log(event.target.value);
        }
        const handleKeuangan = async (event) => {
          setIsLoading(true);
          event.preventDefault();
          const payload = {
            keterangan: keterangan
          }
          try {
            const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/answer_keuangan_lpj.php?id=${param.id}`, payload, {
              headers: {
              'Content-Type': 'multipart/form-data',
              }
            })
            console.log(response.data);
            setTimeout(() => {
              setIsLoading(false);
              navigate("/dashboard-simak");
              alert(response.data.message);
            })
          } catch (error) {
            console.log(error.response);
          }
        }
        const handleKasubagRequest = async (event) =>{
            setIsLoading(true);
            event.preventDefault();
            const payload = {
              veri_1: kasubag
            };
            try {
              const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/answer_kasubag_lpj.php?id=${param.id}`, payload, {
                headers: {
                'Content-Type': 'multipart/form-data',
                }
              });
              console.log(response.data);
              setTimeout(() => {
                  setIsLoading(false);
                  navigate("/dashboard-simak");
              }, 1000);  
            } catch (error) {
              console.log(error.response);
              
            }
        }
        const handleHeadRequest = async (event) =>{
          setIsLoading(true);
          event.preventDefault();
          const payload = {
            veri_2: head,
          };
          try {
            const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/answer_head_lpj.php?id=${param.id}`, payload, {
              headers: {
              'Content-Type': 'multipart/form-data',
              }
            });
            console.log(response.data);
            setTimeout(() => {
                setIsLoading(false);
                navigate("/dashboard-simak");
            }, 1000);  
          } catch (error) {
            console.log(error.response);
            
          }
      }
    return(
        <>
            <div className='main-dashboard'>
            {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
            </div>} 
                <p>Simak/Form Pengajuan Proposal & LPJ</p>
                <h1>Form Pengajuan Proposal <br /> & LPJ</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="simak" />
                <div className='content-col'>
                    <div className='box2'>
                        <div className='content-f'>
                            <h1>Data Diri</h1>
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
                              <td>NIP/NRK</td>
                            </tr>
                            <tr>
                              <td className='input'>{detail.jabatan}</td>
                            </tr>
                            <tr>
                              <td>Units</td>
                            </tr>
                            <tr>
                              <td className='input'>{detail.units}</td>
                            </tr>
                            <tr>
                              <td>Nama Kegiatan</td>
                            </tr>
                            <tr>
                              <td className='input'>{detail.nama_kegiatan}</td>
                            </tr>
                            <tr>
                              <td>Rencana Pelaksana</td>
                            </tr>
                            <tr>
                              <td className='input'>{detail.rencana_pelaksana}</td>
                            </tr>
                            </table>
                        </div>
                        <div style={{display: storedUsername == "Kanif Anshori S.Pd.I" ? 'flex' : 'none'}} className='content-f'>
                          <h1>Jawab KASUBAG</h1>
                          <form action="">
                          <table>
                            <tr style={{marginBottom: '15px'}}>
                              <td>Jawaban</td>
                            </tr>
                            <tr style={{display: 'flex', paddingLeft:'10px', marginBottom:'15px'}}>
                              <td style={{width: '20px', height: '20px', marginLeft: '-32px'}} ><input onChange={handleChangeKasubag} style={{width: '20px', height: '20px'}} type="checkbox" name="" value="2" id="" /></td>
                              <td style={{width: '20px', height: '20px', paddingRight: '1px'}}><label style={{width: '100px'}} htmlFor="">Menolak</label></td>                                                          
                            </tr>
                            <tr style={{display: 'flex', paddingLeft:'10px', marginBottom:'15px'}}>
                              <td style={{width: '20px', height: '20px', marginLeft: '-32px'}} ><input onChange={handleChangeKasubag} style={{width: '20px', height: '20px'}} type="checkbox" name="" value="3" id="" /></td>
                              <td style={{width: '20px', height: '20px', paddingRight: '1px'}}><label style={{width: '100px'}} htmlFor="">Menerima</label></td>                                                          
                            </tr>
                          </table>
                          <button onClick={handleKasubagRequest} className='submit' type="submit">Submit</button>
                          </form>
                        </div>
                        <div style={{display: status == "Bambang Styawan, S.Pd., M.M., M.Si," ? 'flex' : 'none'}} className='content-f'>
                          <h1>Jawab KEPALA BALAI</h1>
                          <form action="">
                            <table>
                              <tr style={{marginBottom: '15px'}}>
                                <td>Jawaban</td>
                              </tr>
                              <tr style={{display: 'flex', paddingLeft:'10px', marginBottom:'15px'}}>
                                <td style={{width: '20px', height: '20px', marginLeft: '-32px'}} ><input onChange={handleChangeHead}  style={{width: '20px', height: '20px'}} type="checkbox" name="" value={2} id="" /></td>
                                <td style={{width: '20px', height: '20px', paddingRight: '1px'}}><label style={{width: '100px'}} htmlFor="">Menolak</label></td>                                                          
                              </tr>
                              <tr style={{display: 'flex', paddingLeft:'10px', marginBottom:'15px'}}>
                                <td style={{width: '20px', height: '20px', marginLeft: '-32px'}} ><input  onChange={handleChangeHead}  style={{width: '20px', height: '20px'}} type="checkbox" name="" value={3} id="" /></td>
                                <td style={{width: '20px', height: '20px', paddingRight: '1px'}}><label style={{width: '100px'}} htmlFor="">Menerima</label></td>                                                          
                              </tr>
                            </table>
                          </form>
                          <button onClick={handleHeadRequest} className='submit' type="submit">Submit</button>
                        </div>
                        <div style={{display: storedUsername == "Pj. Pembendaharaan" ? 'flex' : 'none'}} className='content-f'>
                          <h1>Keterangan Keuangan</h1>
                          <form action="">
                            <table>
                              <tr style={{marginBottom: '15px'}}>
                                <td>Jawaban</td>
                              </tr>
                              <tr>
                                <td>
                                  <label htmlFor="">Keterangan</label>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <textarea onChange={handleChangeKeterangan} name="" id=""></textarea>
                                </td>
                              </tr>
                            </table>
                          </form>
                          <button onClick={handleKeuangan} className='submit' type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </div>        
        </>
    )
}
export default Proposed_Detail