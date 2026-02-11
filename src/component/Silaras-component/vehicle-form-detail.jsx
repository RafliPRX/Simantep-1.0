import { useEffect, useState } from 'react'
import './fix-form.css'
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

    useEffect(() => {
      getDetail();
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
    const handleJawab = async (event) => {
      event.preventDefault();
      setIsLoading(true);
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
        setIsLoading(false);
        navigate(`/dashboard-laras/${level}/${role}/${role_sp}`);
        alert(response.data.message);
      }, 1000);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response);
        alert(error.response);  
      }
    }
    return(
        <>
            <div className='main-dashboard'>
              {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
              </div>} 
                <p>Silaras/Formulir Peminjaman Kendaraan Dinas</p>
                <h1>Formulir Peminjaman <br /> Kendaraan Dinas</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="silaras" />                 
                <div className='content-col'>
                  <div className='box3'>
                        <form action="">
                        <div className='content-f'>
                            <h1>Data Diri Peminjam</h1>
                            <label htmlFor="">Nama</label>
                            <input name='nama' value={detail.nama} disabled type="text"/>
                            <label htmlFor="">NRK/NIP</label>
                            <input name='nrk' value={detail.nrk_nip} disabled type="text"/>
                            <label htmlFor="">Jabatan</label>
                            <input name='jabatan' value={detail.jabatan} disabled type="text"/>
                            <label htmlFor="">Unit Kerja</label>
                            <input required value={detail.unit} disabled type="text"/>
                            <label htmlFor="">Jenis Peminjaman Kendaraan (Pilih Satu)</label>
                            <div className='check'>
                                <input checked={detail.jenis === "Roda 2"}  value={"Roda 2"} type="checkbox" name="" id="" />
                                <label htmlFor="">Roda 2</label>
                            </div> 
                            <div className='check'> 
                                <input checked={detail.jenis === "Roda 4"}  value={"Roda 4"} type="checkbox" name="" id="" />
                                <label htmlFor="" >Roda 4</label>
                            </div> 
                            <div className='check'> 
                                <input checked={detail.jenis === "Roda 6"}  value={"Roda 6"} type="checkbox" name="" id="" />
                                <label htmlFor="">Roda 6</label>
                            </div>
                            <label htmlFor="">Tanggal Peminjaman</label>
                            <input required value={detail.tanggal_pinjam} disabled type="date"/>
                            <label htmlFor="">Jam Peminjaman</label>
                            <input required value={detail.jam_pinjam} disabled type="time"/>
                            <label htmlFor="">Durasi Peminjaman</label>
                            <input required value={detail.durasi_pinjam} disabled type="text"/>
                        </div>                        
                        </form>
                    </div>
                    {detail.Approval !== "1" && (
                      <div className='box3'>
                        <form action="">
                          <div className='content-f'>
                            <h1>Jawab</h1>
                            <label htmlFor="">Jawaban</label>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                              <input  style={{width: '20px', height: '20px'}} checked={detail.Approval === "3"} type="checkbox" value='3' name="" id="" />
                              <label htmlFor="">Menerima</label>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                              <input style={{width: '20px', height: '20px'}} checked={detail.Approval === "2"} type="checkbox" value='2' name="" id="" />
                              <label htmlFor="">Menolak</label>
                            </div>
                            <textarea value={detail.jawab} disabled name="" id=""></textarea>
                          </div>
                        </form>
                      </div>
                    )}                      
                    {role === "C-03" && (
                      <div className='box3'>
                        <form action="">
                          <div className='content-f'>
                            <h1>Jawab</h1>
                            <label htmlFor="">Jawaban</label>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                              <input onChange={handleChangeStatus} style={{width: '20px', height: '20px'}} type="checkbox" value='3' name="" id="" />
                              <label htmlFor="">Menerima</label>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                              <input onChange={handleChangeStatus} style={{width: '20px', height: '20px'}} type="checkbox" value='2' name="" id="" />
                              <label htmlFor="">Menolak</label>
                            </div>
                            <textarea onChange={handleChangeJawaban} name="" id=""></textarea>
                          </div>
                          <button onClick={handleJawab} className='submit'>Kirim</button>
                        </form>
                      </div>
                    )}                  
                </div>
            </div>        
        </>
    )
}
export default Vehicle_Detail

