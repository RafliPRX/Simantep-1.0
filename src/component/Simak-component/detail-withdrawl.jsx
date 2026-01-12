import { useEffect, useState } from 'react';
import './form.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../profile';

const Detail_Withdraw = () => {
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

    useEffect(() => {
        getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    const [keterangan, setKeterangan] = useState('');
    const navigate = useNavigate();
    const handleChangeKeterangan = (event) => {
      setKeterangan(event.target.value);
      console.log(event.target.value);
    }
    const handleJawab = async (event) => {
      setIsLoading(true);
      event.preventDefault();
      const payload = {
        keterangan_keuangan: keterangan,
      }
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/answer_dana_keuangan.php?id=${param.id}`, payload, {
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
        console.error(error);
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
                                      <td className='input'>{detail.NRK}</td>
                                    </tr>
                                    <tr>
                                      <td>Jabatan</td>
                                    </tr>
                                    <tr>
                                      <td className='input'>{detail.jabatan_pj}</td>
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
                                      <td>Jabatan</td>
                                    </tr>
                                    <tr>
                                      <td className='input'>{detail.jabatan_pj}</td>
                                    </tr>
                                    <tr>
                                      <td>Jabatan</td>
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
                    <div style={{display: status == "Pj. Pembendaharaan" ? 'flex' : 'none'}} className='box2'>
                    <form action="">
                      <div className='content-f'>
                        <h1>Jawab</h1>
                        <label htmlFor="">Jawaban</label>
                        <textarea onChange={handleChangeKeterangan} name="" id=""></textarea>
                      </div>
                      <button onClick={handleJawab} className='submit'>Kirim</button>
                    </form>
                  </div>
                </div>
            </div>        
        </>
    );
}

export default Detail_Withdraw
