import { useEffect, useState } from 'react';
import '../css/form.css';
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
          <div className='container-fluid d-flex flex-column p-5 m-2 overflow-auto'>
          {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
              <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
          </div>} 
            <p className='content-header-p'>Simak/Formulir Rencana Penarikan Dana</p>
            <div className='d-flex justify-content-between align-items-center'>
              <h1 className='content-header-title mt-0'>Formulir Rencana Penarikan <br /> Dana</h1>
              <Profile nama={storedUsername} f_profile={storedFProfile} feature="simak" />
            </div>                
            <div className='form-position d-flex flex-column'>
                <div className='form-display'>
                    <form action="">
                        <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 pt-3 pb-3 mb-3'>
                            <h1 className='form-h1 fw-bold ms-3'>Data Diri</h1>
                            <table style={{marginLeft: 20}}>
                                <tr>
                                  <td className='form-label ms-3'>Nama</td>
                                </tr>
                                <tr>
                                  <td className='form-input ms-3 mb-4 ps-2 rounded-3'>{detail.nama}</td>
                                </tr>
                                <tr>
                                  <td className='form-label ms-3'>NIP/NRK</td>
                                </tr>
                                <tr>
                                  <td className='form-input ms-3 mb-4 ps-2 rounded-3'>{detail.nrk_nip}</td>
                                </tr>
                                <tr>
                                  <td className='form-label ms-3'>Jabatan</td>
                                </tr>
                                <tr>
                                  <td className='form-input ms-3 mb-4 ps-2 rounded-3'>{detail.jabatan}</td>
                                </tr>
                                <tr>
                                  <td className='form-label ms-3'>Nama Kegiatan</td>
                                </tr>
                                <tr>
                                  <td className='form-input ms-3 mb-4 ps-2 rounded-3'>{detail.nama_kegiatan}</td>
                                </tr>
                                <tr>
                                  <td className='form-label ms-3'>Rencana Pelaksana</td>
                                </tr>
                                <tr>
                                  <td className='form-input ms-3 mb-4 ps-2 rounded-3'>{detail.rencana_pelaksana}</td>
                                </tr>
                                <tr>
                                  <td className='form-label ms-3'>Units</td>
                                </tr>
                                <tr>
                                  <td className='form-input ms-3 mb-4 ps-2 rounded-3'>{detail.units}</td>
                                </tr>
                                <div style={{display: detail.units === 'Sosial' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
                                    <tr>
                                      <td className='form-label ms-3'>Kebutuhan Akun 521211</td>
                                    </tr>
                                    <tr>
                                      <td className='form-input ms-3 mb-4 ps-2 rounded-3' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto' , paddingRight: '20px'}}>{detail.acc_521211}</td>
                                    </tr>
                                    <tr>
                                      <td className='form-label ms-3'>Kebutuhan 522141</td>
                                    </tr>
                                    <tr>
                                      <td className='ms-3 fs-6'>- Sewa Tempat</td>  
                                      <td className='form-input ms-3 mb-4 ps-2 rounded-3' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', marginLeft: '50px', paddingRight: '20px'}}>{detail.acc_522141_tempat}</td>
                                    </tr>
                                    <tr>
                                      <td className='ms-3 fs-6'>- Sewa Kendaraan</td>  
                                      <td className='form-input ms-3 mb-4 ps-2 rounded-3' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', marginLeft: '50px', paddingRight: '20px'}}>{detail.acc_522141_kendaraan}</td>
                                    </tr>
                                    <tr>
                                      <td className='form-label ms-3'>Kebutuhan Akun 522151</td>
                                    </tr>
                                    <tr>
                                      <td className='form-input ms-3 mb-4 ps-2 rounded-3' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '20px'}}>{detail.acc_522151}</td>
                                    </tr>
                                    <tr>
                                      <td className='form-label ms-3'>Kebutuhan Akun 524113</td>
                                    </tr>
                                    <tr>
                                      <td className='form-input ms-3 mb-4 ps-2 rounded-3' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '20px'}}>{detail.acc_524113}</td>
                                    </tr>
                                    <tr>
                                      <td className='form-label ms-3'>Kebutuhan Akun 524114</td>
                                    </tr>
                                    <tr>
                                      <td className='form-input ms-3 mb-4 ps-2 rounded-3' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '20px'}}>{detail.acc_524114}</td>
                                    </tr>
                                </div>
                                <div style={{display: detail.units === 'Medis' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
                                    <tr>
                                      <td className='form-label ms-3'>Kebutuhan Akun 521211</td>
                                    </tr>
                                    <tr>
                                      <td className='form-input ms-3 mb-4 ps-2 rounded-3' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '20px'}}>{detail.acc_521211}</td>
                                    </tr>
                                    <tr>
                                      <td className='form-label ms-3'>Kebutuhan Akun 522191</td>
                                    </tr>
                                    <tr>
                                      <td className='form-input ms-3 mb-4 ps-2 rounded-3' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '20px'}}>{detail.acc_522191}</td>
                                    </tr>
                                    <tr>
                                      <td className='form-label ms-3'>Keterangan</td>
                                    </tr>
                                    <tr>
                                      <td className='form-input ms-3 mb-4 ps-2 rounded-3' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '20px'}}>{detail.keterangan}</td>
                                    </tr>
                                </div>
                                <div style={{display: detail.units === 'Manajemen' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
                                    <tr>
                                      <td className='form-label ms-3'>Total Permintaan Dana</td>
                                    </tr>
                                    <tr>
                                      <td className='form-input ms-3 mb-4 ps-2 rounded-3' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '20px'}}>{detail.total_dana_manajemen}</td>
                                    </tr>
                                    <tr>
                                      <td className='form-label ms-3'>Metode Pembayaran</td>
                                    </tr>
                                    <tr>
                                      <td className='form-input ms-3 mb-4 ps-2 rounded-3' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '20px'}}>{detail.metode}</td>
                                    </tr>
                                </div>
                                <tr>
                                  <td className='form-label ms-3'>Keterangan Keuangan</td>
                                </tr>
                                <tr>
                                  <td className='form-input ms-3 mb-4 ps-2 rounded-3'>{detail.keterangan_keuangan}</td>
                                </tr>
                            </table>
                        </div>
                    </form>
                </div>
                {role === "C-04" && (
                <div className='form-display'>
                  <form action="">
                    <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                      <h1>Jawab</h1>
                      <label htmlFor="">Jawaban</label>
                      <textarea onChange={handleChangeKeterangan} name="" id=""></textarea>
                    </div>
                    <button onClick={(e) => handleJawab(notif_detail?.id_notif, e)} className='submit'>Kirim</button>
                  </form>
                </div>
                )}
                {role_sp === "S-04" && (
                <div className='form-display'>
                  <form action="">
                    <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
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