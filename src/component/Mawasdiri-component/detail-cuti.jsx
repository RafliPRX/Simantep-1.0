import axios from 'axios';
import './cuti.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../profile';
const Cuti_Detail_Form = () => {
    const storedUsername = localStorage.getItem('nama');
    const storeNrk = localStorage.getItem('nrk');
    const storedSisaCuti = localStorage.getItem('sisa_cuti');
    const storedFProfile = localStorage.getItem('f_profile');
    const pj = localStorage.getItem('pj');
    const kelompok = localStorage.getItem('no_kelompok');
    const status = localStorage.getItem('Status');
    console.log(storedUsername);
    console.log(storedSisaCuti );
    console.log(storedFProfile);
    console.log(storeNrk);
    console.log(pj);
    console.log(kelompok);
    console.log(status);
    
    
    const [detail, setDetail] = useState({});
    const param = useParams();
    const getDetail = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/detail_surat.php?id=${param.id}`, {
                headers: {}
            });
            console.log(response.data);
            setDetail(response.data);            
        } catch (error) {
            console.log(error.response);
        }
    }
    useEffect(() => {
        getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [pjJawab, setPjJawab] = useState("");
    const [alasan, setAlasan] = useState("");
    const [kepegJawab, setKepegJawab] = useState("");
    const [kasubagJawab, setKasubagJawab] = useState("");
    const handlePjJawabChange = (event) => {
      setPjJawab(event.target.value);
      console.log(event.target.value);
    }
    const handleKepegJawabChange = (event) => {
      setKepegJawab(event.target.value);
      console.log(event.target.value);
    }
    const handleKasubagJawabChange = (event) => {
      setKasubagJawab(event.target.value);
      console.log(event.target.value);
    }
    const handleAlasanChange = (event) => {
      setAlasan(event.target.value);
      console.log(event.target.value);
    }
    const navigate = useNavigate();
    const handlePjJawab = async (event) =>{
      event.preventDefault();
      const payload = {
        veri_1: pjJawab,
        alasan: alasan
      }
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/pj_answer.php?id=${param.id}`, payload, {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        });
        console.log(response.data.message);
        setTimeout(() => {
          navigate("/Dashboard");
          alert(response.data.message);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    }
    
    const handleKepegJawab = async (event) =>{
      event.preventDefault();
      const payload = {
        veri_2: kepegJawab,
        alasan: alasan
      }
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/kepeg_answer.php?id=${param.id}`, payload, {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          navigate("/Dashboard");
          alert(response.data.message);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    }
    const handleKasubagJawab = async (event) =>{
      event.preventDefault();
      const payload = {
        veri_3: kasubagJawab,
        alasan: alasan
      }
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/kasubag_answer.php?id=${param.id}`, payload, {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          navigate("/Dashboard");
          alert(response.data.message);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    }
    const [pdf, setPdf] = useState("");
    const handleChangePDF = (event) => {
      setPdf(event.target.files[0]);
      console.log(event.target.files[0]);
    }
    const handleUploadPDF = async (event) => {
      event.preventDefault();
      const payload = {
        pdf: pdf
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/upload_pdf.php?id=${param.id}`,payload,{
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          navigate("/Dashboard");
          alert(response.data.message);
        },500)
      } catch (error) {
        console.error(error);
      }
    }
    const DownloadFile = () => {
      const fileUrl = `https://simantepbareta.cloud/API/MAWASDIRI/Cuti/${detail.pdf}`;
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = detail.pdf;
      link.click();
    }
    const allowedValues = [
      "Koordinator Layanan Rehabilitasi",
      "Pj. Supervisi Klinis",
      "Program Manager Layanan Rehabilitasi",
      "Pj. Tata Kelola Klinik",
      "Pj. Penunjang Medis",
      "Pj. Vokasional",
      "Pj. Pembina Jasmani dan Mental",
      "Pj. Informasi dan Data",
      "Pj. Layanan E-Corner",
      "Pj. Pembendaharaan",
      "Pj. Kepegawaian",
      "Pj. Barang Milik Negara serta Operator Aset & Operator Persediaan",
      "Pj. Rumah Tanggal dan Aset",
      "Pj. Humas dan Kerjasama",
      "Pj. Perencanaan Anggaran dan Pelaporan",
    ];
    return (

        <>
            <div className='main-dashboard'>
                <p>Mawasdiri/Pengajuan Cuti</p>
                <h1>Pengajuan Cuti</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile}/>             
                <div className='content-col' id='pdf-content'>
                    <div className='box1'>
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
                                  <td>Jabatan</td>
                                </tr>
                                <tr>
                                  <td className='input'>{detail.jabatan}</td>
                                </tr>
                                <tr>
                                  <td>No.Handphone</td>
                                </tr>
                                <tr>
                                  <td className='input'>{detail.no_hp}</td>
                                </tr>
                                <tr>
                                  <td>Alasan Selama Cuti/Izin/Sakit</td>
                                </tr>
                                <tr>
                                  <td className='input'>{detail.Keterangan}</td>
                                </tr>
                                <tr>
                                  <td>Alamat Selama Cuti/Izin/Sakit</td>
                                </tr>
                                <tr>
                                  <td className='input'>{detail.alamat}</td>
                                </tr>
                                <tr>
                                  <td>Jenis Surat</td>
                                </tr>
                                <tr>
                                  <td className='input'>{detail.jenis_surat}</td>
                                </tr>
                                <div style={{display: detail.jenis_surat === 'Cuti' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
                                    <tr>
                                      <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Cuti Kontrak</td>
                                    </tr>
                                    <tr>
                                      <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti}</td>
                                    </tr>
                                    <tr>
                                      <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Di mulai dari Tanggal</td>
                                    </tr>
                                    <tr style={{display: 'flex', flexDirection: 'row'}}>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti_date}</td>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>s.d</td>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti_date_fin}</td>
                                    </tr>
                                </div>
                                <div style={{display: detail.jenis_surat === 'Cuti Alasan Penting' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
                                    <tr>
                                      <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Cuti Kontrak</td>
                                    </tr>
                                    <tr>
                                      <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti}</td>
                                    </tr>
                                    <tr>
                                      <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Di mulai dari Tanggal</td>
                                    </tr>
                                    <tr style={{display: 'flex', flexDirection: 'row'}}>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti_date}</td>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>s.d</td>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti_date_fin}</td>
                                    </tr>
                                </div>
                                <div style={{display: detail.jenis_surat === 'Cuti Hamil' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
                                    <tr>
                                      <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Cuti Kontrak</td>
                                    </tr>
                                    <tr>
                                      <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto' , paddingRight: '35px'}}>{detail.cuti}</td>
                                    </tr>
                                    <tr>
                                      <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Di mulai dari Tanggal</td>
                                    </tr>
                                    <tr style={{display: 'flex', flexDirection: 'row'}}>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti_date}</td>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>s.d</td>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti_date_fin}</td>
                                    </tr>
                                </div>
                                <div style={{display: detail.jenis_surat === 'Sakit' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
                                    <tr>
                                      <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Cuti Kontrak</td>
                                    </tr>
                                    <tr>
                                      <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti}</td>
                                    </tr>
                                    <tr>
                                      <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Di mulai dari Tanggal</td>
                                    </tr>
                                    <tr style={{display: 'flex', flexDirection: 'row'}}>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti_date}</td>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>s.d</td>
                                      <td className='input' style={{display: 'flex' ,alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti_date_fin}</td>
                                    </tr>
                                    <tr>
                                        <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}> <img style={{width: '900px', height: 'auto', borderRadius: '10px'}} src={`http://localhost/Simantep_API/MAWASDIRI/Cuti/${detail.gambar}`} alt="" /> </td>
                                    </tr>
                                </div>
                            </table>
                        </div>
                        <div style={{display: detail.pdf ? 'flex' : 'none'}} className='content-f'>
                          <h1>Download Surat</h1>
                          <button className='submit' onClick={DownloadFile}>Download</button>
                        </div>
                        <div style={{display: allowedValues.includes(status) ? 'flex' : 'none' }} className='content-f'>
                          <h1>Jawab PJ</h1>
                            <form action="">
                              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <input onChange={handlePjJawabChange} style={{width: '20px', height: '20px'}} type="checkbox" value='3' name="" id="" />
                                <label htmlFor="">Menerima</label>
                              </div>
                              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <input onChange={handlePjJawabChange} style={{width: '20px', height: '20px'}} type="checkbox" value='2' name="" id="" />
                                <label htmlFor="">Menunda</label>
                              </div>
                              <label htmlFor="">Alasan (Jika Menunda)</label>
                              <textarea onChange={handleAlasanChange} style={{marginTop: '10px'}} name="" id=""></textarea>
                              <button onClick={handlePjJawab} className='submit'>Kirim</button>
                          </form>
                        </div>
                        <div style={{display: status == "Kepegawaian" ? 'flex' : 'none' }} className='content-f'>
                          <h1>Jawab Kepegawaian</h1>
                            <form action="">
                              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <input onChange={handleKepegJawabChange} style={{width: '20px', height: '20px'}} type="checkbox" value='3' name="" id="" />
                                <label htmlFor="">Menerima</label>
                              </div>
                              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <input onChange={handleKepegJawabChange} style={{width: '20px', height: '20px'}} type="checkbox" value='2' name="" id="" />
                                <label htmlFor="">Menunda</label>
                              </div>
                              <label htmlFor="">Alasan (Jika Menunda)</label>
                              <textarea onChange={handleAlasanChange} style={{marginTop: '10px'}} name="" id=""></textarea>
                              <button onClick={handleKepegJawab} className='submit'>Kirim</button>
                          </form>
                        </div>
                        <div style={{display: status == "Kasubbag" ? 'flex' : 'none' }} className='content-f'>
                          <h1>Jawab Kasubag</h1>
                            <form action="">
                              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <input onChange={handleKasubagJawabChange} style={{width: '20px', height: '20px'}} type="checkbox" value='3' name="" id="" />
                                <label htmlFor="">Menerima</label>
                              </div>
                              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <input onChange={handleKasubagJawabChange} style={{width: '20px', height: '20px'}} type="checkbox" value='2' name="" id="" />
                                <label htmlFor="">Menunda</label>
                              </div>
                              <label htmlFor="">Alasan (Jika Menunda)</label>
                              <textarea onChange={handleAlasanChange} style={{marginTop: '10px'}} name="" id=""></textarea>
                              <button onClick={handleKasubagJawab} className='submit'>Kirim</button>
                          </form>
                        </div>
                        <div style={{display: storedUsername === 'admin' ? 'flex' : 'none' }} className='content-f'>
                          <h1>Upload File</h1>
                            <form action="">
                              <label htmlFor="">Upload File</label>
                              <input type="file" onChange={handleChangePDF} name="" id="" />
                              <button onClick={handleUploadPDF} className='submit'>Kirim</button>
                          </form>
                        </div>
                    </div>
                </div>
            </div>        
        </>
    )
}
export default Cuti_Detail_Form
