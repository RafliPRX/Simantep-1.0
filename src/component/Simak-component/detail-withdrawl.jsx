import { useEffect, useState } from 'react';
import './form.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../profile';

const Detail_Withdraw = () => {
    const { role } = useParams();
    const { level } = useParams();
    const { role_sp } = useParams();
    const storedUsername = localStorage.getItem('nama');
    const storeNrk = localStorage.getItem('nrk');
    const storedSisaCuti = localStorage.getItem('sisa_cuti');
    const storedFProfile = localStorage.getItem('f_profile');
    const storeidNumber = localStorage.getItem('id_number');
    const pj = localStorage.getItem('pj');
    const [isLoading, setIsLoading] = useState(false);
    console.log(storedUsername);
    console.log(storedSisaCuti );
    console.log(storedFProfile);
    console.log(storeNrk);
    console.log(pj);

    const param = useParams();
    const [detail, setDetail] = useState([]);
    const getDetail = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/detail_dana.php?id=${param.id}`, {
                headers: {}
            });
            setDetail(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    const [notif_detail, setNotifDetail] = useState({});
    console.log("id notif yang diambil: "+notif_detail?.id_notif);
    
    const getNotifDetail = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/notifikasi_dana_Actv_byDetail.php?id=${param.id}`, {
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
    const [keterangan, setKeterangan] = useState('');
    const navigate = useNavigate();
    const handleChangeKeterangan = (event) => {
      setKeterangan(event.target.value);
      console.log(event.target.value);
    }
    const handleJawabRequest = async () => {
      const payload = {
        last_sent_to: detail.nama,
        keterangan_keuangan: keterangan,
        last_sent_to_id: storeidNumber,
      }
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/answer_dana_keuangan.php?id=${param.id}`, payload, {
          headers: {
          'Content-Type': 'multipart/form-data',
          }
        })
        console.log(response.data);
        setTimeout(() => {
          navigate(`/dashboard-simak/${level}/${role}/${role_sp}`);
          alert(response.data.message);
        })
      } catch (error) {
        console.error(error);
      }
    }
    const mark = async (notifId) => {
        const payload = {
            stat: "Disable"
        }
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/mark_Dana.php?id=${notifId}`, payload, {
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
          await mark(notifId);
          await handleJawabRequest();
        } catch (error) {
          console.log(error);        
        } finally {
          setIsLoading(false);
        }      
      }
    return (
        <>
            <div className='main-dashboard'>
            {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
            </div>} 
                <p>Simak/Form Rencana Penarikan Dana</p>
                <h1>Form Rencana Penarikan <br /> Dana</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="simak" />                
                <div className='content-col'>
                    <div className='box2'>
                        <form action="">
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
                                      <td className='input'>{detail.nrk_nip}</td>
                                    </tr>
                                    <tr>
                                      <td>Jabatan</td>
                                    </tr>
                                    <tr>
                                      <td className='input'>{detail.jabatan}</td>
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
                                    <tr>
                                      <td>Units</td>
                                    </tr>
                                    <tr>
                                      <td className='input'>{detail.units}</td>
                                    </tr>
                                    <div style={{display: detail.units === 'Sosial' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '20px'}}>Kebutuhan Akun 521211</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto' , paddingRight: '20px'}}>{detail.acc_521211}</td>
                                        </tr>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Kebutuhan 522141</td>
                                        </tr>
                                        <tr style={{}}>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingLeft: '20px'}}>- Sewa Tempat</td>  
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', marginLeft: '50px', paddingRight: '20px'}}>{detail.acc_522141_tempat}</td>
                                        </tr>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingLeft: '20px'}}>- Sewa Kendaraan</td>  
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', marginLeft: '50px', paddingRight: '20px'}}>{detail.acc_522141_kendaraan}</td>
                                        </tr>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Kebutuhan Akun 522151</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '20px'}}>{detail.acc_522151}</td>
                                        </tr>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Kebutuhan Akun 524113</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '20px'}}>{detail.acc_524113}</td>
                                        </tr>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Kebutuhan Akun 524114</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '20px'}}>{detail.acc_524114}</td>
                                        </tr>
                                    </div>
                                    <div style={{display: detail.units === 'Medis' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Kebutuhan Akun 521211</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '20px'}}>{detail.acc_521211}</td>
                                        </tr>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Kebutuhan Akun 522191</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '20px'}}>{detail.acc_522191}</td>
                                        </tr>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Keterangan</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '20px'}}>{detail.keterangan}</td>
                                        </tr>
                                    </div>
                                    <div style={{display: detail.units === 'Manajemen' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Total Permintaan Dana</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '20px'}}>{detail.total_dana_manajemen}</td>
                                        </tr>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Metode Pembayaran</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '20px'}}>{detail.metode}</td>
                                        </tr>
                                    </div>
                                    <tr>
                                      <td>Keterangan Keuangan</td>
                                    </tr>
                                    <tr>
                                      <td className='input'>{detail.keterangan_keuangan}</td>
                                    </tr>
                                </table>
                            </div>
                        </form>
                    </div>
                    {role === "C-04" && (
                    <div className='box2'>
                      <form action="">
                        <div className='content-f'>
                          <h1>Jawab</h1>
                          <label htmlFor="">Jawaban</label>
                          <textarea onChange={handleChangeKeterangan} name="" id=""></textarea>
                        </div>
                        <button onClick={(e) => handleJawab(notif_detail?.id_notif, e)} className='submit'>Kirim</button>
                      </form>
                    </div>
                    )}
                    {role_sp === "S-04" && (
                    <div className='box2'>
                      <form action="">
                        <div className='content-f'>
                          <h1>Jawab</h1>
                          <label htmlFor="">Jawaban</label>
                          <textarea onChange={handleChangeKeterangan} name="" id=""></textarea>
                        </div>
                        <button onClick={(e) => handleJawab(notif_detail?.id_notif, e)} className='submit'>Kirim</button>
                      </form>
                    </div>
                    )}
                </div>
            </div>        
        </>
    );
}

export default Detail_Withdraw
