import { useEffect, useState } from 'react';
import '../css/form.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Profile from '../profile';

const Proposed_Detail = () => {
        const storedUsername = localStorage.getItem('nama');
        const storeNrk = localStorage.getItem('nrk');
        const storedSisaCuti = localStorage.getItem('sisa_cuti');
        const storedFProfile = localStorage.getItem('f_profile');
        const pj = localStorage.getItem('pj');
        const [isLoading, setIsLoading] = useState(false);
        console.log(storedUsername);
        console.log(storedSisaCuti );
        console.log(storedFProfile);
        console.log(storeNrk);
        console.log(pj);
        const { role } = useParams();
        const { level } = useParams();
        const { role_sp } = useParams();
        const storeidNumber = localStorage.getItem('id_number');     
        const param = useParams();
        const [detail, setDetail] = useState({});
        console.log("id_number: " + storeidNumber);
        
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
        const [nama_apr_ls_lv1, setNama_apr_ls_lv1] = useState([]);
        const [nama_apr_lv1, setNama_apr_lv1] = useState(nama_apr_ls_lv1.nama);
        console.log("nama apr lv1: " + nama_apr_lv1);
        const getApr_lv1 = async () => {
          try {
              const response = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/lpj_approve_lv1.php?kode_role_a=A-02` , {
              headers: {"Content-Type": "application/json"},
              });
              console.log(response.data.Data[0]);
              setNama_apr_ls_lv1(response.data.Data[0]);
              setNama_apr_lv1(response.data.Data[0].nama);            
          } catch (error) {
              console.log(error);
          }
        }
        const [nama_apr_ls_lv2, setNama_apr_ls_lv2] = useState([]);
        const [nama_apr_lv2, setNama_apr_lv2] = useState(nama_apr_ls_lv2.nama);
        console.log("nama apr lv2: " + nama_apr_lv2);        
        const getApr_lv2 = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/lpj_approve_lv1.php?kode_role_a=A-01` , {
            headers: {"Content-Type": "application/json"},
            });
            console.log(response.data.Data[0]);
            setNama_apr_ls_lv2(response.data.Data[0]);
            setNama_apr_lv2(response.data.Data[0].nama);            
        } catch (error) {
            console.log(error);
            }
        }
        const [nama_apr_ls_lv3, setNama_apr_ls_lv3] = useState([]);
        const [nama_apr_lv3, setNama_apr_lv3] = useState(nama_apr_ls_lv3.nama);
        console.log("nama apr lv3: " + nama_apr_lv3);        
        const getApr_lv3 = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/lpj_approve_keuangan.php?kode_role_c=C-04` , {
            headers: {"Content-Type": "application/json"},
            });
            console.log(response.data.Data[0]);
            setNama_apr_ls_lv3(response.data.Data[0]);
            setNama_apr_lv3(response.data.Data[0].nama);            
        } catch (error) {
            console.log(error);
            }
        }        
        const [notif_detail, setNotifDetail] = useState({});
        console.log("id notif yang diambil: "+notif_detail?.id_notif);
    
        const getNotifDetail = async () => {
            try {
                const response = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/notif_lpj_byDetail.php?id=${param.id}`, {
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
            getApr_lv1();
            getApr_lv2();
            getApr_lv3();
            getNotifDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]);

        const [adm, setAdm] = useState("");
        const handleChangeAdm = (event) => {
          setAdm(event.target.value);
          console.log(event.target.value);
        }
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
        const handleKeuanganRequest = async () => {
          const payload = {
            keterangan: keterangan,
            last_nama: detail.nama,
            veri_3_id: storeidNumber,
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
              navigate(`/dashboard-simak/${level}/${role}/${role_sp}`);
              alert(response.data.message);
            })
          } catch (error) {
            console.log(error.response);
          }
        }
        const handleAdminRequest = async () =>{
            const veri_1_value = Number(adm) === 3 ? nama_apr_lv1 : detail.nama;
            const payload = {
              veri_adm: adm,
              nama_veri_1: veri_1_value,
              veri_adm_id: storeidNumber,
            };
            try {
              const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/answer_adm.php?id=${param.id}`, payload, {
                headers: {
                'Content-Type': 'multipart/form-data',
                }
              });
              console.log(response.data);
              setTimeout(() => {
                  setIsLoading(false);
                  navigate(`/dashboard-simak/${level}/${role}/${role_sp}`);
                  alert(response.data.message);
              }, 1000);  
            } catch (error) {
              console.log(error.response);
              
            }
        }
        const handleKasubagRequest = async () =>{
            const veri_2_value = Number(kasubag) === 3 ? nama_apr_lv2 : detail.nama;
            const payload = {
              veri_1: kasubag,
              nama_veri_2: veri_2_value,
              veri_1_id: storeidNumber,
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
                  navigate(`/dashboard-simak/${level}/${role}/${role_sp}`);
                  alert(response.data.message);
              }, 1000);  
            } catch (error) {
              console.log(error.response);
              
            }
        }
        const handleHeadRequest = async () =>{
          const veri_3_value = Number(head) === 3 ? nama_apr_lv3 : detail.nama;
          const payload = {
            veri_2: head,
            last_veri_3: veri_3_value,
            veri_2_id: storeidNumber,
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
                navigate(`/dashboard-simak/${level}/${role}/${role_sp}`);
                alert(response.data.message);
            }, 1000);  
          } catch (error) {
            console.log(error.response);
            
          }
      }
      const mark = async (idNotif) => {
        const payload = {
            stat: "Disable"
        }
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/mark_lpj.php?id=${idNotif}`, payload, {
                headers: {"Content-Type": "multipart/form-data"},
            })
            console.log(response.data);
        } catch (error) {
            console.log(error.response);
        }
      }
      const handleAdmin = async (idNotif, event) => {
        event.preventDefault();
        try {
          setIsLoading(true);
          await mark(idNotif);
          await handleAdminRequest(event);
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
          await mark(idNotif);
          await handleKasubagRequest(event);
        } catch (error) {
          console.log(error);        
        } finally {
          setIsLoading(false);
        }      
      }
      const handleHead = async (idNotif, event) => {
        event.preventDefault();
        try {
          setIsLoading(true);
          await mark(idNotif);
          await handleHeadRequest(event);
        } catch (error) {
          console.log(error);        
        } finally {
          setIsLoading(false);
        }      
      }
      const handleKeuangan = async (idNotif, event) => {
        event.preventDefault();
        try {
          setIsLoading(true);
          await mark(idNotif);
          await handleKeuanganRequest();
        } catch (error) {
          console.log(error);        
        } finally {
          setIsLoading(false);
        }
      }
    return(
        <>
            <div className='container-fluid d-flex flex-column p-5 m-2 overflow-auto'>
            {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
            </div>} 
                <p className='content-header-p'>Simak/Formulir Pengajuan Proposal & LPJ</p>
                <div className='d-flex justify-content-between align-items-center'>
                  <h1 className='content-header-title mt-0'>Formulir Pengajuan Proposal <br /> & LPJ</h1>
                  <Profile nama={storedUsername} f_profile={storedFProfile} feature="simak" />                
                </div>
                <div className='form-position d-flex flex-column'>
                    <div className='form-display'>
                        <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 pt-3 pb-3 mb-3'>
                          <h1 className='form-h1 fw-bold ms-3'>Data Diri</h1>
                          <table>
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
                              <td className='form-label ms-3'>NIP/NRK</td>
                            </tr>
                            <tr>
                              <td className='form-input ms-3 mb-4 ps-2 rounded-3'>{detail.jabatan}</td>
                            </tr>
                            <tr>
                              <td className='form-label ms-3'>Units</td>
                            </tr>
                            <tr>
                              <td className='form-input ms-3 mb-4 ps-2 rounded-3'>{detail.units}</td>
                            </tr>
                            <tr>
                              <td className='form-label ms-3'>Jenis Dokumen</td>
                            </tr>
                            <tr>
                              <td className='form-input ms-3 mb-4 ps-2 rounded-3'>{detail.dokumen}</td>
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
                          </table>
                        </div>
                        { role_sp === "S-07" && (
                        <div className='bg-green-old text-white d-flex flex-column align-items-center rounded-5 pt-3 pb-3 mb-3'>
                          <h1 className='form-h1 fw-bold ms-3'>Jawab Admin Pelayanan</h1>
                          <form action="">
                            <div className='d-flex flex-row align-items-center gap-3 ps-3'>
                              <input className='form-check-input' onChange={handleChangeAdm} type="checkbox" name="" value="3" id="" />
                              <label className='form-check-label' htmlFor="">Menerima</label>                            
                            </div>
                            <div className='d-flex flex-row align-items-center gap-3 ps-3 mb-2'>
                              <input className='form-check-input' onChange={handleChangeAdm} style={{width: '20px', height: '20px'}} type="checkbox" name="" value="2" id="" />
                              <label className='form-check-label' style={{width: '100px'}} htmlFor="">Menolak</label>                              
                            </div>
                            <button onClick={(e) => handleAdmin(notif_detail?.id_notif, e)} className='submit' type="submit">Submit</button>                          
                          </form>
                        </div>
                        )}
                        { role_sp === "S-02" && (
                        <div className='bg-green-old text-white d-flex flex-column align-items-center rounded-5 pt-3 pb-3 mb-3'>
                          <h1 className='form-h1 fw-bold ms-3'>Jawab KASUBAG</h1>
                          <form action="">
                            <div className='d-flex flex-row align-items-center gap-3 ps-3'>
                              <input className='form-check-input' onChange={handleChangeKasubag} style={{width: '20px', height: '20px'}} type="checkbox" name="" value="3" id="" />
                              <label className='form-check-label' style={{width: '100px'}} htmlFor="">Menerima</label>  
                            </div>
                            <div className='d-flex flex-row align-items-center gap-3 ps-3'>
                              <input className='form-check-input' onChange={handleChangeKasubag} style={{width: '20px', height: '20px'}} type="checkbox" name="" value="2" id="" />
                              <label className='form-check-label' style={{width: '100px'}} htmlFor="">Menolak</label>                           
                            </div>                                                                                                                                              
                          <button onClick={(e) => handleKasubag(notif_detail?.id_notif, e)} className='submit' type="submit">Submit</button>
                          </form>
                        </div>
                        )}
                        { role === "A-02" && (
                        <div className='bg-green-old text-white d-flex flex-column align-items-center rounded-5 pt-3 pb-3 mb-3'>
                          <h1 className='form-h1 fw-bold ms-3'>Jawab KASUBAG</h1>
                          <form action="">                            
                            <div className='d-flex flex-row align-items-center gap-3 ps-3'>
                              <input className='form-check-input' onChange={handleChangeKasubag} type="checkbox" name="" value="3" id="" />
                              <label className='form-check-label' htmlFor="">Menerima</label>                                
                            </div>
                            <div className='d-flex flex-row align-items-center gap-3 ps-3'>
                              <input className='form-check-input' onChange={handleChangeKasubag} style={{width: '20px', height: '20px'}} type="checkbox" name="" value="2" id="" />
                              <label className='form-check-label' style={{width: '100px'}} htmlFor="">Menolak</label>
                            </div>                            
                          <button onClick={(e) => handleKasubag(notif_detail?.id_notif, e)} className='submit' type="submit">Submit</button>
                          </form>
                        </div>
                        )}
                        { role === "S-01" && (
                        <div className='bg-green-old text-white d-flex flex-column align-items-center rounded-5 pt-3 pb-3 mb-3'>
                          <h1 className='form-h1 fw-bold ms-3'>Jawab KEPALA BALAI</h1>
                          <form action="">
                            <div className='d-flex flex-row align-items-center gap-3 ps-3'>
                              <input className='form-check-input' onChange={handleChangeHead} type="checkbox" name="" value={3} id="" />
                              <label className='form-check-label' htmlFor="">Menerima</label>                                                              
                            </div>
                            <div className='d-flex flex-row align-items-center gap-3 ps-3'>
                              <input className='form-check-input' onChange={handleChangeHead} type="checkbox" name="" value={2} id="" />
                              <label className='form-check-label' htmlFor="">Menolak</label>                          
                            </div>
                          </form>
                          <button onClick={(e) => handleHead(notif_detail?.id_notif, e)} className='submit' type="submit">Submit</button>
                        </div>
                        )}
                        { role === "A-01" && (
                        <div className='bg-green-old text-white d-flex flex-column align-items-center rounded-5 pt-3 pb-3 mb-3'>
                          <h1 className='form-h1 fw-bold ms-3'>Jawab KEPALA BALAI</h1>
                          <form action="">
                            <div className='d-flex flex-row align-items-center gap-3 ps-3'>
                              <input className='form-check-input' onChange={handleChangeHead}  style={{width: '20px', height: '20px'}} type="checkbox" name="" value={3} id="" />
                              <label className='form-check-label' style={{width: '100px'}} htmlFor="">Menerima</label>                                
                            </div>
                            <div className='d-flex flex-row align-items-center gap-3 ps-3'>
                              <input className='form-check-input' onChange={handleChangeHead}  style={{width: '20px', height: '20px'}} type="checkbox" name="" value={2} id="" />
                              <label className='form-check-label' style={{width: '100px'}} htmlFor="">Menolak</label>                          
                            </div>
                          </form>
                          <button onClick={(e) => handleHead(notif_detail?.id_notif, e)} className='submit' type="submit">Submit</button>
                        </div>
                        )}
                        { role === "C-04" && (
                        <div className='bg-green-old text-white d-flex flex-column align-items-center rounded-5 pt-3 pb-3 mb-3'>
                          <h1 className='form-h1 fw-bold ms-3'>Keterangan Keuangan</h1>
                          <form action="">
                            <label className='form-label ms-3' htmlFor="">Keterangan</label>
                            <textarea className='form-textarea ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeKeterangan} name="" id=""></textarea>
                           </form>
                          <button onClick={(e) =>handleKeuangan(notif_detail?.id_notif, e)} className='submit' type="submit">Submit</button>
                        </div>
                        )}                        
                    </div>
                </div>
            </div>        
        </>
    )
}
export default Proposed_Detail