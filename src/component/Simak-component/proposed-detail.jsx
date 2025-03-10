import { useEffect, useState } from 'react';
import './form.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Proposed_Detail = () => {
        const storedUsername = localStorage.getItem('nama');
        const storeNrk = localStorage.getItem('nrk');
        const storedSisaCuti = localStorage.getItem('sisa_cuti');
        const storedFProfile = localStorage.getItem('f_profile');
        const storedID = localStorage.getItem('id_jabatan_sup');
        console.log(storedUsername);
        console.log(storedSisaCuti );
        console.log(storedFProfile);
        console.log(storeNrk);
        console.log(storedID);
      
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
              navigate("/dashboard-simak");
              alert(response.data.message);
            })
          } catch (error) {
            console.log(error.response);
          }
        }
        const handleKasubagRequest = async (event) =>{
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
                  navigate("/dashboard-simak");
              }, 1000);  
            } catch (error) {
              console.log(error.response);
              
            }
        }
        const handleHeadRequest = async (event) =>{
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
                navigate("/dashboard-simak");
            }, 1000);  
          } catch (error) {
            console.log(error.response);
            
          }
      }
    return(
        <>
            <div className='main-dashboard'>
                <p>Simak/Form Pengajuan Proposal & LPJ</p>
                <h1>Form Pengajuan Proposal & LPJ</h1>
                <div className='profile'>
                    <input placeholder='Search' type="text" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <g clipPath="url(#clip0_5_1232)">
                        <path d="M19.29 17.29L18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.62999 5.36 5.99999 7.92 5.99999 11V16L4.70999 17.29C4.07999 17.92 4.51999 19 5.40999 19H18.58C19.48 19 19.92 17.92 19.29 17.29ZM16 17H7.99999V11C7.99999 8.52 9.50999 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17ZM12 22C13.1 22 14 21.1 14 20H9.99999C9.99999 21.1 10.89 22 12 22Z" fill="white"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_5_1232">
                          <rect width="24" height="24" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 18 18" fill="none">
                      <g clipPath="url(#clip0_5_1230)">
                        <path d="M9.95691 18C12.7329 18 15.2683 16.737 16.948 14.6675C17.1965 14.3613 16.9255 13.9141 16.5415 13.9872C12.175 14.8188 8.1651 11.4709 8.1651 7.06303C8.1651 4.52398 9.52431 2.18914 11.7334 0.931992C12.0739 0.738211 11.9883 0.221941 11.6013 0.150469C11.0589 0.0504468 10.5085 8.21369e-05 9.95691 0C4.98902 0 0.956909 4.02578 0.956909 9C0.956909 13.9679 4.98269 18 9.95691 18Z" fill="white"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_5_1230">
                          <rect width="18" height="18" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <div className='pic'></div>
                </div>
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
                        <div style={{display: storedID == 10 ? 'flex' : 'none'}} className='content-f'>
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
                        <div style={{display: storedID == 12 ? 'flex' : 'none'}} className='content-f'>
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
                        <div style={{display: storedID == 5 ? 'flex' : 'none'}} className='content-f'>
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