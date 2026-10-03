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
    const { nrk_nip } = useParams();
    const { nama } = useParams();
    const { bagian } = useParams();
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
    const [detail_cuti, setDetail_cuti] = useState(detail.sisa_k);
    const param = useParams();
    const getDetail = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/detail_surat.php?id=${param.id}`, {
                headers: {}
            });
            console.log(response.data);
            setDetail(response.data);
            setDetail_cuti(response.data.sisa_k);
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleChangeSisaCuti = (event) => {
      setDetail_cuti(event.target.value);
      console.log(event.target.value);
    }
    const [identityAtasan, setIdentityAtasan] = useState([]);
    const [nama_atasan, setNama_atasan] = useState(identityAtasan.nama);
    const [kode_role_atasan, setKode_role_atasan] = useState(identityAtasan.kode_role);
    console.log("nama Atasan: " + nama_atasan);
    console.log("kode Atasan: " + kode_role_atasan);
    const getIdentityKasubbag = async () => {
        try {
          const response = await axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/getIdentity_Atasan.php?kode_role_a=A-01` , {
            headers: {"Content-Type": "application/json"},
          });
          console.log(response.data);
          setIdentityAtasan(response.data);
          setNama_atasan(response.data.nama);
          setKode_role_atasan(response.data.kode_role_a);         
        } catch (error) {
          console.log(error);
        }
    }
    const [adminIdentity, setAdminIdentity] = useState([]);
    const [nama_admin, setNama_Admin] = useState(adminIdentity.nama);
    console.log("nama Admin: " + nama_admin);
    const getIdentityAdmin = async () => {
        try {
          const response = await axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/getAdminIdentity.php?kode_role_sp=S-02` , {
            headers: {"Content-Type": "application/json"},
          });
          console.log(response.data);
          setAdminIdentity(response.data);
          setNama_Admin(response.data.nama);     
        } catch (error) {
          console.log(error);
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
        getIdentityKasubbag();
        getIdentityAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log("id_notif yg diambil: "+ id_Notif);
    const [alasan, setAlasan] = useState("");
    const [kasubagJawab, setKasubagJawab] = useState("");
    const [kabalaiJawab, setKabalaiJawab] = useState("");
    const handleKasubagJawabChange = (event) => {
      setKasubagJawab(event.target.value);
      console.log(event.target.value);
    }
    const handleKabalaiJawabChange = (event) => {
      setKabalaiJawab(event.target.value);
      console.log(event.target.value);
    }
    const handleAlasanChange = (event) => {
      setAlasan(event.target.value);
      console.log(event.target.value);
    }
    const navigate = useNavigate();
    const handleKasubagJawab = async () =>{
      const nama_a2_value = Number(kasubagJawab) === 3 ? nama_atasan : detail.nama;
      const payload = {
        veri_1: kasubagJawab,
        alasan: alasan,
        nama_a2: nama_a2_value,
        kode_role_a2: kode_role_atasan,
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
          navigate(`/Dashboard/${level}/${role}/${role_sp}/${nrk_nip}/${nama}`);
          alert(response.data.message);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    }
    const handleKabalaiJawab = async () =>{      
      const nama_sp_value = Number(kabalaiJawab) === 3 ? nama_admin : detail.nama;
      const payload = {
        veri_2: kabalaiJawab,
        alasan: alasan,
        nama_sp: nama_sp_value,
      }
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/kabalai_answer.php?id=${param.id}`, payload, {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          setIsLoading(false);
          navigate(`/Dashboard/${level}/${role}/${role_sp}/${nrk_nip}/${nama}`);
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
          navigate(`/Dashboard/${level}/${role}/${role_sp}/${nrk_nip}/${nama}`);
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
    const handleKasubag = async (idNotif, event) => {
      event.preventDefault();
      if (Number(kasubagJawab) === 2) {
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
      else if (Number(kasubagJawab) === 3) {
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
    }
    const handleKabalai = async (idNotif, event) => {
      event.preventDefault();
      try {
        setIsLoading(true);
        await mark(idNotif, event);
        await handleKabalaiJawab(event);
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
            <div className='container-fluid d-flex flex-column p-5 m-2 overflow-auto'>
            {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                    <span style={{position: 'absolute', top : '1500px'}} className="load-cuti"></span>
            </div>}   
                <p className='content-header-p'>Mawasdiri/Pengajuan Cuti</p>
                <div className='d-flex justify-content-between align-items-center'>
                  <h1 className='content-header-title mt-0'>Pengajuan Cuti</h1>
                  <Profile nama={storedUsername} f_profile={storedFProfile} feature="mawasdiri" />
                </div>
                <div className='form-position d-flex flex-column' id='pdf-content'>
                    <div className='form-display'>
                        <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
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
                                  <td className='form-label ms-3'>No.Handphone</td>
                                </tr>
                                <tr>
                                  <td className='form-input ms-3 mb-4 ps-2 rounded-3'>{detail.no_hp}</td>
                                </tr>
                                <tr>
                                  <td className='form-label ms-3'>Alasan Selama Cuti/Izin/Sakit</td>
                                </tr>
                                <tr>
                                  <td className='form-input ms-3 mb-4 ps-2 rounded-3'>{detail.Keterangan}</td>
                                </tr>
                                <tr>
                                  <td className='form-label ms-3'>Alamat Selama Cuti/Izin/Sakit</td>
                                </tr>
                                <tr>
                                  <td className='form-input ms-3 mb-4 ps-2 rounded-3'>{detail.alamat}</td>
                                </tr>
                                <tr>
                                  <td className='form-label ms-3'>Jenis Surat</td>
                                </tr>
                                <tr>
                                  <td className='form-input ms-3 mb-4 ps-2 rounded-3'>{detail.jenis_surat}</td>
                                </tr>
                                {bagian === '4' ? (
                                  <>
                                    <div style={{display: detail.jenis_surat === 'Cuti' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
                                      <tr>
                                        <td className='form-label ms-3'>Cuti Tahunan</td>
                                      </tr>
                                      <tr>
                                        <td className='form-input ms-3 mb-4 ps-2 rounded-3'>{detail.cuti} Hari</td>
                                      </tr>
                                      <tr>
                                        <td className='form-label ms-3'>Di mulai dari Tanggal</td>
                                      </tr>
                                      <tr className='d-flex flex-column'>
                                        <td className='form-input ms-3 rounded-3'>{detail.cuti_date}</td>
                                        <td className='form-input ms-3 rounded-3 text-center'>s.d</td>
                                        <td className='form-input ms-3 rounded-3'>{detail.cuti_date_fin}</td>
                                      </tr>
                                    </div>
                                    <div style={{display: detail.jenis_surat === 'Cuti Alasan Penting' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Cuti Kontrak</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti} Hari</td>
                                        </tr>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Di mulai dari Tanggal</td>
                                        </tr>
                                        <tr className='d-flex flex-column'>
                                          <td className='form-input ms-3 rounded-3'>{detail.cuti_date}</td>
                                          <td className='form-input ms-3 rounded-3 text-center'>s.d</td>
                                          <td className='form-input ms-3 rounded-3'>{detail.cuti_date_fin}</td>
                                        </tr>
                                    </div>
                                    <div style={{display: detail.jenis_surat === 'Cuti Besar' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Cuti Besar</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti}</td>
                                        </tr>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Di mulai dari Tanggal</td>
                                        </tr>
                                        <tr className='d-flex flex-column'>
                                          <td className='form-input ms-3 rounded-3'>{detail.cuti_date}</td>
                                          <td className='form-input ms-3 rounded-3 text-center'>s.d</td>
                                          <td className='form-input ms-3 rounded-3'>{detail.cuti_date_fin}</td>
                                        </tr>
                                    </div>
                                    <div style={{display: detail.jenis_surat === 'Cuti Diluar Tanggungan Negara' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Cuti Diluar Tanggungan Negara</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti} Hari</td>
                                        </tr>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Di mulai dari Tanggal</td>
                                        </tr>
                                        <tr className='d-flex flex-column'>
                                          <td className='form-input ms-3 rounded-3'>{detail.cuti_date}</td>
                                          <td className='form-input ms-3 rounded-3 text-center'>s.d</td>
                                          <td className='form-input ms-3 rounded-3'>{detail.cuti_date_fin}</td>
                                        </tr>
                                    </div>
                                    <div style={{display: detail.jenis_surat === 'Cuti Melahirkan' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Cuti Kontrak</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto' , paddingRight: '35px'}}>{detail.cuti} Hari</td>
                                        </tr>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Di mulai dari Tanggal</td>
                                        </tr>
                                        <tr className='d-flex flex-column'>
                                          <td className='form-input ms-3 rounded-3'>{detail.cuti_date}</td>
                                          <td className='form-input ms-3 rounded-3 text-center'>s.d</td>
                                          <td className='form-input ms-3 rounded-3'>{detail.cuti_date_fin}</td>
                                        </tr>
                                    </div>
                                    <div style={{display: detail.jenis_surat === 'Sakit' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
                                        <tr>
                                          <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}>Cuti Kontrak</td>
                                        </tr>
                                        <tr>
                                          <td className='input' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto', paddingRight: '35px'}}>{detail.cuti} Hari</td>
                                        </tr>
                                        <tr>
                                          <td>Di mulai dari Tanggal</td>
                                        </tr>
                                        <tr className='d-flex flex-column'>
                                          <td className='form-input ms-3 rounded-3'>{detail.cuti_date}</td>
                                          <td className='form-input ms-3 rounded-3 text-center'>s.d</td>
                                          <td className='form-input ms-3 rounded-3'>{detail.cuti_date_fin}</td>
                                        </tr>
                                        <tr>
                                            <td style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'auto'}}> <img style={{width: '500px', height: 'auto', borderRadius: '10px'}} src={`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/${detail.gambar}`} alt="" /> </td>
                                        </tr>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                  <label className='form-label' htmlFor="">Catatan Cuti</label>
                                  <div className='d-flex flex-row'>                    
                                    <table className='table-spaced'>                      
                                      <tr>
                                        <th colSpan={3}>1. Cuti Tahunan</th>
                                      </tr>
                                      <tr>
                                        <th>Tahun</th>
                                        <th>Sisa</th>
                                        <th>Keterangan</th>
                                      </tr>
                                      <tr>
                                        <th>N-2</th>
                                        <th className='text-center'>0</th>
                                        <th className='text-center'>-</th>                        
                                      </tr>
                                      <tr>
                                        <th>N-1</th>
                                        <th className='text-center'>0</th>
                                        <th className='text-center'>-</th>
                                      </tr>
                                      <tr>
                                        <th>N</th>
                                        <th className='text-center'>{detail.cuti}</th>
                                        <th className='text-center'>-</th>
                                      </tr>
                                    </table>
                                    <table className='table-spaced'>
                                      <tr>
                                        <th>2. Cuti Besar</th>
                                        {detail.jenis_surat === "Cuti Besar" ? (
                                          <th className='text-center'>{detail.cuti}</th>
                                        ) : (
                                          <th className='text-center'>0</th>
                                        )}
                                      </tr>
                                      <tr>
                                        <th>3. Cuti Sakit</th>
                                        {detail.jenis_surat === "Sakit" ? (
                                          <th className='text-center'>{detail.cuti}</th>
                                        ) : (
                                          <th className='text-center'>0</th>
                                        )}
                                      </tr>
                                      <tr>
                                        <th>4. Cuti Melahirkan</th>
                                        {detail.jenis_surat === "Cuti Melahirkan" ? (
                                          <th className='text-center'>{detail.cuti}</th>
                                        ) : (
                                          <th className='text-center'>0</th>
                                        )}
                                      </tr>
                                      <tr>
                                        <th>5. Cuti Alasan Penting</th>
                                        {detail.jenis_surat === "Cuti Alasan Penting" ? (
                                          <th className='text-center'>{detail.cuti}</th>
                                        ) : (
                                          <th className='text-center'>0</th>
                                        )}
                                      </tr>
                                      <tr>
                                        <th>6. Cuti diluar Tanggungan Negara</th>
                                        {detail.jenis_surat === "Cuti Diluar Tanggungan Negara" ? (
                                          <th className='text-center'>{detail.cuti}</th>
                                        ) : (
                                          <th className='text-center'>0</th>
                                        )}
                                      </tr>
                                    </table>                    
                                  </div>
                                </>
                                )}                                
                            </table>
                        </div>
                        {level === "level-3" && (
                          <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                            <h1 className='form-h1 fw-bold ms-3'>Sisa Jumlah Cuti</h1>
                            <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeSisaCuti} type="text" value={detail_cuti} />
                          </div>
                        )}                        
                        <div style={{display: detail.pdf ? 'flex' : 'none'}} className='bg-green-old text-white align-items-start justify-content-start rounded-5 p-3 mb-3'>
                          <h1>Download Surat</h1>
                          <button className='submit' onClick={DownloadFile}>Download</button>
                        </div>
                        {(level === "level-4" && role === 'A-02') &&
                        <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                          <h1 className='form-h1 fw-bold ms-3'>Jawab Kasubag</h1>
                            <form action="">
                              <div className='d-flex flex-row align-items-center gap-3 ps-3'>
                                <input className='form-check-input' onChange={handleKasubagJawabChange} type="checkbox" value='3' name="" id="" />
                                <label className='form-check-label' htmlFor="">Menerima</label>
                              </div>
                              <div className='d-flex flex-row align-items-center gap-2 ps-3'>
                                <input className='form-check-input' onChange={handleKasubagJawabChange} type="checkbox" value='2' name="" id="" />
                                <label className='form-check-label' htmlFor="">Menunda</label>
                              </div>
                              <label className='form-check-label ps-3' htmlFor="">Alasan (Jika Menunda)</label>
                              <textarea className='form-textarea ms-3 mb-4 ps-2 rounded-3' onChange={handleAlasanChange} name="" id=""></textarea>                              
                              <button onClick={(e) => handleKasubag(id_Notif, e)} className='submit'>Kirim</button>
                              <input type="hidden" value={id_Notif || ''} name="" id="" />
                          </form>
                        </div>
                        }
                        {(level === "level-4" && role === 'A-01') &&
                        <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                          <h1 className='form-h1 fw-bold ms-3'>Jawab Kepala Balai</h1>
                            <form action="">
                              <div className='d-flex flex-row align-items-center gap-3 ps-3'>
                                <input className='form-check-input' onChange={handleKabalaiJawabChange} style={{width: '20px', height: '20px'}} type="checkbox" value='3' name="" id="" />
                                <label className='form-check-label' htmlFor="">Menerima</label>
                              </div>
                              <div className='d-flex flex-row align-items-center gap-3 ps-3'>
                                <input className='form-check-input' onChange={handleKabalaiJawabChange} style={{width: '20px', height: '20px'}} type="checkbox" value='2' name="" id="" />
                                <label className='form-check-label' htmlFor="">Menunda</label>
                              </div>
                              <label className='form-check-label ps-3' htmlFor="">Alasan (Jika Menunda)</label>
                              <textarea className='form-textarea ms-3 mb-4 ps-2 rounded-3' onChange={handleAlasanChange} style={{marginTop: '10px'}} name="" id=""></textarea>
                              <button onClick={(e) => handleKabalai(id_Notif, e)} className='submit'>Kirim</button>
                              <input type="hidden" value={id_Notif || ''} name="" id="" />
                          </form>
                        </div>
                        }
                        {role_sp === "S-02" &&
                          <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3 gap-3'>
                            <h1 className='form-h1 fw-bold ms-3'>Upload File</h1>
                              <form action="">
                                <label className='form-check-label' htmlFor="">Upload File</label>
                                <input type="file" onChange={handleChangePDF} name="" id="" />                                
                            </form>
                            <button onClick={(e) => handleSp(id_Notif, e)} className='submit'>Kirim</button>
                          </div>
                        }
                    </div>
                </div>
            </div>        
        </>
    )
}
export default Cuti_Detail_Form
