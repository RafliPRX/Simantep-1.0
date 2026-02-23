/* eslint-disable no-unused-vars */
import axios from 'axios';
import '../css/form.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../profile';
const Cuti_Detail_Form = () => {
    const { role } = useParams();
    const { level } =useParams();
    const { role_sp } = useParams();
    const storedUsername = localStorage.getItem('nama');
    const storeNrk = localStorage.getItem('nrk');
    const storedSisaCuti = localStorage.getItem('sisa_cuti');
    const storedFProfile = localStorage.getItem('f_profile');
    const pj = localStorage.getItem('pj');
    const kelompok = localStorage.getItem('no_kelompok');
    const status = localStorage.getItem('Status');
    const [isLoading, setIsLoading] = useState(false);
    console.log("nama di storage: "+storedUsername);
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
    const [notif_new, setNotif_new] = useState([]);
    const [id_Notif, setId_notif] = useState(null);
    const getNotif_new = async () => {
      try {
            const response = await axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/notifikasi_surat_by_Receive.php?id=${param.id}`, {
                headers: {}
            });
            console.log(response.data);
            // If there is at least one notification, use it; otherwise mark as no data
            if (response.data && Array.isArray(response.data) && response.data.length > 0 && response.data[0].id_notif) {
                setNotif_new(response.data[0]);
                setId_notif(response.data[0].id_notif);
            } else {
                // No notification found
                setNotif_new(null);
                setId_notif(null);
            }
        } catch (error) {
            console.log(error.response);
        }
    }
    useEffect(() => {
        getDetail();
        getNotif_new();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log("id_notif yg diambil: "+ id_Notif);
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
    const handlePjJawab = async () =>{
      const nama_b_value = Number(pjJawab) === 3 ? "Chandra Hutama Yahrinanda" : detail.nama;
      const kode_role_b_value = Number(pjJawab) === 3 ? "B-01" : "";
      const payload = {
        veri_1: pjJawab,
        alasan: alasan,
        kode_role_b: kode_role_b_value,
        nama_b: nama_b_value,
      }
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/pj_answer.php?id=${param.id}`, payload, {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        });
        console.log(response.data.message);
        setTimeout(() => {
          setIsLoading(false);
          navigate(`/Dashboard/${level}/${role}/${role_sp}`);
          alert(response.data.message);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    }
    const handleKepegJawab = async () =>{
      const nama_a_value = Number(kepegJawab) === 3 ? "Kanif Anshori" : detail.nama;
      const kode_role_a_value = Number(kepegJawab) === 3 ? "A-02" : "";
      const payload = {
        veri_2: kepegJawab,
        alasan: alasan,
        kode_role_a: kode_role_a_value,
        nama_a: nama_a_value,
      }
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/kepeg_answer.php?id=${param.id}`, payload, {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          setIsLoading(false);
          navigate(`/Dashboard/${level}/${role}/${role_sp}`);
          alert(response.data.message);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    }
    const handleKasubagJawab = async () =>{
      const nama_sp_value = Number(kasubagJawab) === 3 ? "Raeza Noorinda Oktaviani" : detail.nama;
      const payload = {
        veri_3: kasubagJawab,
        alasan: alasan,
        nama_sp: nama_sp_value,
      }
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/kasubag_answer.php?id=${param.id}`, payload, {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          setIsLoading(false);
          navigate(`/Dashboard/${level}/${role}/${role_sp}`);
          alert(response.data.message);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    }
    const mark = async (idNotif) => {
        const payload = {
            stat: "Disable"
        }
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/mark_as_read.php?id=${idNotif}`, payload, {
                headers: {"Content-Type": "multipart/form-data"},
            })
            console.log(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }
    const [pdf, setPdf] = useState("");
    const handleChangePDF = (event) => {+
      setPdf(event.target.files[0]);
      console.log(event.target.files[0]);
    }
    const handleUploadPDF = async () => {
      const payload = {
        pdf: pdf,
        nama_last: detail.nama,
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/upload_pdf.php?id=${param.id}`,payload,{
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          setIsLoading(false);
          navigate(`/Dashboard/${level}/${role}/${role_sp}`);
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
    const handlePj = async (idNotif, event) => {
      event.preventDefault();
      try {
        setIsLoading(true);        
        await mark(idNotif, event); 
        await handlePjJawab(event);
      } catch (error) {
        console.log(error);        
      } finally {
        setIsLoading(false);
      }      
    }
    const handleKepeg = async (idNotif, event) => {
      event.preventDefault();
      try {
        setIsLoading(true);
        await mark(idNotif, event); 
        await handleKepegJawab(event);
      } catch (error) {
        console.log(error);        
      } finally {
        setIsLoading(false);
      }      
    }
    const handleKasubag = async (idNotif, event) => {
      event.preventDefault();
      try {
        setIsLoading(true);
        await mark(idNotif, event);
        await handleKasubagJawab(event);
      } catch (error) {
        console.log(error);        
      } finally {
        setIsLoading(false);
      }      
    }
    const handleSp = async (idNotif, event) => {
      event.preventDefault();
      try {
        setIsLoading(true);
        await mark(idNotif, event);
        await handleUploadPDF();
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
                    <span style={{position: 'absolute', top : '1500px'}} className="load-cuti"></span>
            </div>}   
                <p>Mawasdiri/Pengajuan Cuti</p>
                <h1>Pengajuan Cuti</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="mawasdiri" />           
                <div className='content-col' id='pdf-content'>
                    <div className='box1'>
                        <div className='content-f'>
                            <h1>Data Diri</h1>
                            <table style={{marginLeft: 20}}>
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
                        {level === "level-2" &&
                        <div className='content-f'>
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
                              <button onClick={(e) => handlePj(id_Notif, e)} className='submit'>Kirim</button>
                          </form>
                        </div>
                        }
                        {level === "level-3" &&
                        <div className='content-f'>
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
                              <button onClick={(e) => handleKepeg(id_Notif, e)} className='submit'>Kirim</button>
                          </form>
                        </div>
                        }
                        {level === "level-4" &&
                        <div className='content-f'>
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
                              <button onClick={(e) => handleKasubag(id_Notif, e)} className='submit'>Kirim</button>
                              <input type="hidden" value={id_Notif || ''} name="" id="" />
                          </form>
                        </div>
                        }
                        {role_sp === "S-02" &&
                          <div className='content-f'>
                            <h1>Upload File</h1>
                              <form action="">
                                <label htmlFor="">Upload File</label>
                                <input type="file" onChange={handleChangePDF} name="" id="" />
                                <button onClick={(e) => handleSp(id_Notif, e)} className='submit'>Kirim</button>
                            </form>
                          </div>
                        }                        
                    </div>
                </div>
            </div>        
        </>
    )
}
export default Cuti_Detail_Form
