import { useEffect, useState } from 'react'
import '../css/form.css';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Profile from '../profile'
const Request_Form_Detail = () => {
    const {level} = useParams();
    const {role} = useParams();
    const {role_sp} = useParams();
    const storedUsername = localStorage.getItem('nama');
    const storeNrk = localStorage.getItem('nrk');
    const storedSisaCuti = localStorage.getItem('sisa_cuti');
    const storedFProfile = localStorage.getItem('f_profile');
    const pj = localStorage.getItem('pj');
    const status = localStorage.getItem('Status');
    const storeidNumber = localStorage.getItem('id_number');
    console.log(storedUsername);
    console.log(storedSisaCuti );
    console.log(storedFProfile);
    console.log(storeNrk);
    console.log(pj);
    console.log(status);
    const [isLoading, setIsLoading] = useState(false);

    const param = useParams();
    const [request, setRequest] = useState([]);
    const getRequest = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/detail_request.php?id=${param.id}`, {
                headers: {}
            })
            console.log(response.data);
            setRequest(response.data);
        } catch (error) {
            console.log(error.response);
        }
    };
    const [notif_detail, setNotifDetail] = useState({});    
    console.log("id notif yang diambil: "+notif_detail?.id_notif);
    
    const getNotifDetail = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/notif_bhp_byReceive.php?id=${param.id}`, {
                headers: {}
            });
            setNotifDetail(response.data[0]);
            console.log(response.data[0]);
        } catch (error) {
          console.error(error);
        }
    }
    useEffect(() => {
        getRequest();
        getNotifDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [jawab, setJawab] = useState('');
    const handleChangeJawaban = (event) => {
      setJawab(event.target.value);
      console.log(event.target.value);
    }
    const [approval, setApproval] = useState('');
    const handleChangeApproval = (event) => {
      setApproval(event.target.value);
      console.log(event.target.value);
    }
    const navigate = useNavigate();
    const mark_Bhp = async (idNotif) => {
        const payload = {
            stat: "Disable"
        }
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/mark_bhp.php?id=${idNotif}`, payload, {
                headers: {"Content-Type": "multipart/form-data"},
            })
            console.log(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }
    const handleJawab_sarpras = async () => {
      setIsLoading(true);
      const payload = {
        jawab: jawab,
        Approval: approval,
        last_sent_to: request.nama,
        last_sent_to_id: storeidNumber,
      }
      try {
        const response = axios.post(`https://simantepbareta.cloud/API/SILARAS/answer_request.php?id=${param.id}`,payload, {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        })
        console.log(response.data);
        setTimeout(() => {
          navigate(`/dashboard-laras/${level}/${role}/${role_sp}`);
          alert(response.data.message);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error.response);
        alert(error.response);
        setIsLoading(false);
      }
    }
    const handleJawab = async (notifId ,event) => {      
      event.preventDefault();
      setIsLoading(true);
      try {
        await mark_Bhp(notifId);
        await handleJawab_sarpras();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }      
    }
    return(
        <>
            <div className='main-dashboard'>
              {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
              </div>} 
                <p>Silaras/Formulir Permohonan BHP & ATK</p>
                <h1>Formulir Permohonan Barang <br /> Habis Pakai & Alat Tulis <br /> Kantor</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="silaras" /> 
                <div className='content-col'>
                    <div className='box1' id='box_request'>
                        <form action="">
                        <div className='content-f'>
                            <h1>Data Diri Peminjam</h1>
                            <label htmlFor="">Nama</label>
                            <input value={request.nama} disabled placeholder='Nama' type="text"/>
                            <input type="hidden" value={notif_detail.id_notif} name="" id="" />
                            <label htmlFor="">NIP/NRK</label>
                            <input value={request.nrk_nip} disabled placeholder='NRK' type="text"/>
                            <label htmlFor="">Jabatan</label>
                            <input value={request.jabatan} disabled placeholder='NRK' type="text"/>
                            <label htmlFor="">Unit Kerja</label>
                            <input value={request.unit} disabled placeholder='Unit Kerja' type="text"/>
                            <label htmlFor="">Permohonan Barang (Deskripsikan Permohonan)</label>
                            <table>
                              <tbody>
                                <tr className='barang-bar'>
                                  <th className='barang-no'>No</th>
                                  <th className='barang-jenis'>Nama Barang</th>
                                  <th className='barang-jumlah'>Jumlah</th>
                                  <th className='barang-satuan'>Satuan</th>
                                </tr>
                                <tr className='barang-bar'>
                                  <th className='barang-no'>1</th>
                                  <th className='barang-jenis'><input value={request.barang} disabled type="text" /></th>
                                  <th className='barang-jumlah'><input value={request.jumlah_barang} disabled type="text" /></th>
                                  <th className='barang-satuan'><input value={request.satuan} disabled type="text" /></th>
                                </tr>
                                <tr className='barang-bar'>
                                  <th className='barang-no'>2</th>
                                  <th className='barang-jenis'><input value={request.barang2} disabled type="text" /></th>
                                  <th className='barang-jumlah'><input value={request.jumlah_barang2} disabled type="text" /></th>
                                  <th className='barang-satuan'><input value={request.satuan2} disabled type="text" /></th>

                                </tr>
                                <tr className='barang-bar'>
                                  <th className='barang-no'>3</th>
                                  <th className='barang-jenis'><input value={request.barang3} disabled type="text" /></th>
                                  <th className='barang-jumlah'><input value={request.jumlah_barang3} disabled type="text" /></th>
                                  <th className='barang-satuan'><input value={request.satuan3} disabled type="text" /></th>
                                </tr>
                                <tr className='barang-bar'>
                                  <th className='barang-no'>4</th>
                                  <th className='barang-jenis'><input value={request.barang4} disabled type="text" /></th>
                                  <th className='barang-jumlah'><input value={request.jumlah_barang4} disabled type="text" /></th>
                                  <th className='barang-satuan'><input value={request.satuan4} disabled type="text" /></th>
                                </tr>
                                <tr className='barang-bar'>
                                  <th className='barang-no'>5</th>
                                  <th className='barang-jenis'><input value={request.barang5} disabled type="text" /></th>
                                  <th className='barang-jumlah'><input value={request.jumlah_barang5} disabled type="text" /></th>
                                  <th className='barang-satuan'><input value={request.satuan5} disabled type="text" /></th>
                                </tr>
                              </tbody>
                            </table>
                        </div>                       
                        </form>
                    </div>
                    {request.Approval !== "1" && (
                      <div className='box3'>
                        <form action="">
                          <div className='content-f'>
                            <h1>Jawab</h1>
                            <label htmlFor="">Approval</label>
                            <select name="approval" id="approval" disabled value={request.Approval}>
                              <option value="3">Setuju</option>
                              <option value="2">Tolak</option>
                            </select>
                            <label htmlFor="">Jawaban</label>
                            <textarea value={request.jawab} disabled name="jawaban" id="jawaban"></textarea>
                          </div>
                        </form>
                      </div>
                    )}                    
                    {role === "C-03" && (
                      <div className='box3'>
                        <form action="">
                          <div className='content-f'>
                            <h1>Jawab</h1>
                            <label htmlFor="">Approval</label>
                            <select name="approval" id="approval" onChange={handleChangeApproval}>
                              <option value="">Pilih</option>
                              <option value="3">Setuju</option>
                              <option value="2">Tolak</option>
                            </select>
                            <label htmlFor="">Jawaban</label>
                            <textarea onChange={handleChangeJawaban} name="jawaban" id="jawaban"></textarea>
                          </div>
                          <button onClick={(e)=>handleJawab(notif_detail?.id_notif, e)} className='submit'>Kirim</button>
                        </form>
                      </div>
                    )}                                 
                </div>                                
            </div>        
        </>
    )
}
export default Request_Form_Detail