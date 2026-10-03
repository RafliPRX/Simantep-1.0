import { useEffect, useState } from 'react'
import '../css/form.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Profile from '../profile';

const Vehicle_Detail = () => {
    const storedUsername = localStorage.getItem('nama');
    const storeNrk = localStorage.getItem('nrk');
    const storedSisaCuti = localStorage.getItem('sisa_cuti');
    const storedFProfile = localStorage.getItem('f_profile');
    const pj = localStorage.getItem('pj');
    const [isLoading, setIsLoading] = useState(false);
    const {role} = useParams();
    const {role_sp} = useParams();
    const {level} = useParams();
    console.log(storedUsername);
    console.log(storedSisaCuti );
    console.log(storedFProfile);
    console.log(storeNrk);
    console.log(pj);

    const param = useParams();

    const [detail, setDetail] = useState({});
    const getDetail = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/detail_vehicle.php?id=${param.id}`, {
            headers: {}
        })
        setDetail(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    const [notif_detail, setNotifDetail] = useState({});
    console.log("id notif yang diambil: "+notif_detail?.id_notif);
    
    const getNotifDetail = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/notif_vehicle_byReceive.php?id=${param.id}`, {
                headers: {}
            });
            if (response.data && response.data.length > 0) {
                setNotifDetail(response.data[0]);
                console.log(response.data[0]);
            } else {
                console.warn("No notification details found for the given ID.");
                setNotifDetail({}); // Set to empty object to prevent errors
            }
        } catch (error) {
          console.error(error);
          setNotifDetail({}); // Set to empty object on error
        }
    }
    useEffect(() => {
      getDetail();
      getNotifDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const [jawab, setJawaban] = useState('');
    const handleChangeJawaban = (event) => {
      setJawaban(event.target.value);
      console.log(event.target.value);
    }
    const [status, setStatus] = useState('');
    const handleChangeStatus = (event) => {
      setStatus(event.target.value);
      console.log(event.target.value);
    }
    const navigate = useNavigate();
    const mark_Vehicle = async (idNotif) => {
        const payload = {
            stat: "Disable"
        }
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/mark_vehicle.php?id=${idNotif}`, payload, {
                headers: {"Content-Type": "multipart/form-data"},
            })
            console.log(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }
    const handleJawabVehicle = async () => {
      const payload = {
        jawab: jawab,
        Approval: status,
        last_sent_to: detail.nama,
        last_sent_to_id: detail.id_number
      }
      try {
        const response = axios.post(`https://simantepbareta.cloud/API/SILARAS/answer_vehicle.php?id=${param.id}`,payload, {
          headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      console.log(response.data);
      setTimeout(() => {
        navigate(`/dashboard-laras/${level}/${role}/${role_sp}`);
        alert(response.data.message);
      }, 1000);
      } catch (error) {
        console.log(error.response);
        alert(error.response);  
      }
    }
    const handleJawab = async (notifId ,event) => {
      event.preventDefault();
      try {
        setIsLoading(true);
        await mark_Vehicle(notifId);
        await handleJawabVehicle();
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
                <p className='content-header-p'>Silaras/Formulir Peminjaman Kendaraan Dinas</p>
                <div className='d-flex justify-content-between align-items-center'>
                  <h1 className='content-header-title'>Formulir Peminjaman <br /> Kendaraan Dinas</h1>
                  <Profile nama={storedUsername} f_profile={storedFProfile} feature="silaras" />                
                </div>
                <div className='form-position d-flex flex-column'>
                  <div className='form-display'>
                        <form action="">
                        <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                            <h1 className='form-h1 fw-bold ms-3'>Data Diri Peminjam</h1>
                            <label className='form-label ms-3' htmlFor="">Nama</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' name='nama' value={detail.nama} disabled type="text"/>
                            <input value={notif_detail.id_notif} type="hidden"/>
                            <label className='form-label ms-3' htmlFor="">NRK/NIP</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' name='nrk' value={detail.nrk_nip} disabled type="text"/>
                            <label className='form-label ms-3' htmlFor="">Jabatan</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' name='jabatan' value={detail.jabatan} disabled type="text"/>
                            <label className='form-label ms-3' htmlFor="">Unit Kerja</label>
                            {level === "level-1" && (
                              <input className='form-input ms-3 mb-4 ps-2 rounded-3' name='unit' value={detail.nama_role} disabled type="text"/>
                            )}
                            {level === "level-2" && (
                              <input className='form-input ms-3 mb-4 ps-2 rounded-3' name='unit' value={detail.nama_role_c} disabled type="text"/>
                            )}
                            {level === "level-3" && (
                              <input className='form-input ms-3 mb-4 ps-2 rounded-3' name='unit' value={detail.nama_role_b} disabled type="text"/>
                            )}
                            {level === "level-4" && (
                              <input className='form-input ms-3 mb-4 ps-2 rounded-3' name='unit' value={detail.nama_role_a} disabled type="text"/>
                            )}
                            <label className='form-label ms-3' htmlFor="">Jenis Peminjaman Kendaraan (Pilih Satu)</label>
                            <div className='d-flex flex-row align-items-center gap-2 ps-3'>
                                <input className='form-check-input' checked={detail.jenis === "Roda 2"}  value={"Roda 2"} type="checkbox" name="" id="" />
                                <label className='form-check-label' htmlFor="">Roda 2</label>
                            </div> 
                            <div className='d-flex flex-row align-items-center gap-2 ps-3'> 
                                <input className='form-check-input' checked={detail.jenis === "Roda 4"}  value={"Roda 4"} type="checkbox" name="" id="" />
                                <label className='form-check-label' htmlFor="" >Roda 4</label>
                            </div> 
                            <div className='d-flex flex-row align-items-center gap-2 ps-3'> 
                                <input className='form-check-input' checked={detail.jenis === "Roda 6"}  value={"Roda 6"} type="checkbox" name="" id="" />
                                <label className='form-check-label' htmlFor="">Roda 6</label>
                            </div>
                            <label className='form-label ms-3' htmlFor="">Tujuan Peminjaman</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' type="text" value={detail.tujuan} disabled placeholder='Tujuan Peminjaman' />
                            <label className='form-label ms-3' htmlFor="">Keperluan Peminjaman</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' type="text" value={detail.keperluan} disabled placeholder='Keperluan Peminjaman' />
                            <label className='form-label ms-3' htmlFor="">Tanggal Peminjaman</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' required value={detail.tanggal_pinjam} disabled type="date"/>
                            <label className='form-label ms-3' htmlFor="">Jam Peminjaman</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' required value={detail.jam_pinjam} disabled type="time"/>
                            <label className='form-label ms-3' htmlFor="">Durasi Peminjaman</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' required value={detail.durasi_pinjam} disabled type="text"/>
                        </div>                        
                        </form>
                    </div>
                    {detail.Approval !== "1" && (
                      <div className='form-display'>
                        <form action="">
                          <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                            <h1>Jawab</h1>
                            <label className='form-label ms-3' htmlFor="">Jawaban</label>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                              <input style={{width: '20px', height: '20px'}} checked={detail.Approval === "3"} type="checkbox" value='3' name="" id="" />
                              <label htmlFor="">Menerima</label>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                              <input style={{width: '20px', height: '20px'}} checked={detail.Approval === "2"} type="checkbox" value='2' name="" id="" />
                              <label htmlFor="">Menolak</label>
                            </div>
                            <textarea className='form-textarea ms-3 mb-4 ps-2 rounded-3' value={detail.jawab} disabled name="" id=""></textarea>
                          </div>
                        </form>
                      </div>
                    )}                      
                    {role === "C-03" && (
                      <div className='form-display'>
                        <form action="">
                          <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                            <h1>Jawab</h1>
                            <label className='form-label ms-3' htmlFor="">Jawaban</label>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                              <input onChange={handleChangeStatus} style={{width: '20px', height: '20px'}} type="checkbox" value='3' name="" id="" />
                              <label htmlFor="">Menerima</label>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                              <input onChange={handleChangeStatus} style={{width: '20px', height: '20px'}} type="checkbox" value='2' name="" id="" />
                              <label htmlFor="">Menolak</label>
                            </div>
                            <textarea className='form-textarea ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeJawaban} name="" id=""></textarea>
                          </div>
                          <button onClick={(e)=>handleJawab(notif_detail.id_notif,e)} className='submit'>Kirim</button>
                        </form>
                      </div>
                    )}                  
                </div>
            </div>        
        </>
    )
}
export default Vehicle_Detail

