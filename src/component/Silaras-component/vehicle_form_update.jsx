import { useEffect, useState } from 'react'
import '../css/form.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Profile from '../profile';

const Vehicle_Update = () => {    
    const navigate = useNavigate();
    const [detail, setDetail] = useState({});
    const {level} = useParams();
    const {role} = useParams();
    const {role_sp} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const storedUsername = localStorage.getItem('nama');
    const storedFProfile = localStorage.getItem('f_profile');
    const [nama, setNama] = useState(detail.nama || "");
    const [nrk, setNRK] = useState(detail.nrk_nip || "");
    const [jabatan, setJabatan] = useState(detail.jabatan || "");
    const [jenis, setJenis] = useState(detail.jenis || "");
    const [tujuan, setTujuan] = useState(detail.tujuan || "");
    const [keperluan, setKeperluan] = useState(detail.keperluan || "");
    const [tanggal, setTanggal] = useState(detail.tanggal_pinjam || "");
    const [jam, setJam] = useState(detail.jam_pinjam || "");
    const [durasi, setDurasi] = useState(detail.durasi_pinjam || "");
    const getDetail = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/detail_vehicle.php?id=${param.id}`, {
            headers: {}
        })
        setDetail(response.data);
        console.log(response.data);
        setNama(response.data.nama);
        setNRK(response.data.nrk_nip);
        setJabatan(response.data.jabatan);
        setJenis(response.data.jenis);
        setTujuan(response.data.tujuan);
        setKeperluan(response.data.keperluan);
        setTanggal(response.data.tanggal_pinjam);
        setJam(response.data.jam_pinjam);
        setDurasi(response.data.durasi_pinjam);
      } catch (error) {
        console.log(error.response);
      }
    };

    useEffect(() => {
      getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const param = useParams();
    const handleChangeJenis = (event) => {
      console.log(event.target.value);
      setJenis(event.target.value);
    }
    const handleChangeKeperluan = (event) => {
      console.log(event.target.value);
      setKeperluan(event.target.value);
    }
    const handleChangeTujuan = (event) => {
      console.log(event.target.value);
      setTujuan(event.target.value);
    }
    const handleChangeTanggal = (event) => {
      console.log(event.target.value);
      setTanggal(event.target.value);
    }
    const handleChangeJam = (event) => {
      console.log(event.target.value);
      setJam(event.target.value);
    }
    const handleChangeDurasi = (event) => {
      console.log(event.target.value);
      setDurasi(event.target.value);
    }    

    const handleRequest = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      const payload = {
        jenis:jenis,
        tujuan:tujuan,
        keperluan:keperluan,
        tanggal_pinjam:tanggal,
        jam_pinjam:jam,
        durasi_pinjam:durasi,
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/update_vehicle.php?id=${param.id}`, payload, {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          navigate(`/dashboard-laras/${level}/${role}/${role_sp}`);
          alert(response.data.message);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error.response);
        alert(error.response.data.message);
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
                  <h1 className='content-header-title'>Mengubah Formulir Peminjaman <br /> Kendaraan Dinas</h1>
                  <Profile nama={storedUsername} f_profile={storedFProfile} feature="silaras" />                
                </div>
                <div className='form-position d-flex flex-column'>
                    <div className='form-display'>
                        <form action="">
                        <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                            <h1 className='form-h1 fw-bold ms-3'>Data Diri Peminjam</h1>
                            <label className='form-label ms-3' htmlFor="">Nama</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' name='nama' value={nama} disabled type="text"/>
                            <label className='form-label ms-3' htmlFor="">NRK/NIP</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' name='nrk' value={nrk} disabled type="text"/>
                            <label className='form-label ms-3' htmlFor="">Jabatan</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' name='jabatan' value={jabatan} disabled type="text"/>
                            <label className='form-label ms-3' htmlFor="">Unit Kerja</label>
                            {level === "level-1" && (
                              <input className='form-input ms-3 mb-4 ps-2 rounded-3' required value={detail.nama_role_c} disabled type="text"/>
                            )}
                            {level === "level-2" && (
                              <input className='form-input ms-3 mb-4 ps-2 rounded-3' required value={detail.nama_role_c} disabled type="text"/>
                            )}
                            {level === "level-3" && (
                              <input className='form-input ms-3 mb-4 ps-2 rounded-3' required value={detail.nama_role_b} disabled type="text"/>
                            )}
                            {level === "level-4" && (
                              <input className='form-input ms-3 mb-4 ps-2 rounded-3' required value={detail.nama_role_a} disabled type="text"/>
                            )}
                            <label className='form-label ms-3' htmlFor="">Jenis Peminjaman Kendaraan (Pilih Satu)</label>
                            <div className='d-flex flex-row align-items-center gap-2 ps-3'>
                                <input className='form-check-input' onChange={handleChangeJenis} checked={jenis === "Roda 2"}  value={"Roda 2"} type="checkbox" name="" id="" />
                                <label className='form-check-label' htmlFor="">Roda 2</label>
                            </div> 
                            <div className='d-flex flex-row align-items-center gap-2 ps-3'> 
                                <input className='form-check-input' onChange={handleChangeJenis} checked={jenis === "Roda 4"}  value={"Roda 4"} type="checkbox" name="" id="" />
                                <label className='form-check-label' htmlFor="" >Roda 4</label>
                            </div> 
                            <div className='d-flex flex-row align-items-center gap-2 ps-3'> 
                                <input className='form-check-input' onChange={handleChangeJenis} checked={jenis === "Roda 6"}  value={"Roda 6"} type="checkbox" name="" id="" />
                                <label className='form-check-label' htmlFor="">Roda 6</label>
                            </div>
                            <label className='form-label ms-3' htmlFor="">Tujuan Peminjaman</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' type="text" onChange={handleChangeTujuan} value={tujuan} placeholder='Tujuan Peminjaman' />
                            <label className='form-label ms-3' htmlFor="">Keperluan Peminjaman</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' type="text" onChange={handleChangeKeperluan} value={keperluan} placeholder='Keperluan Peminjaman' />
                            <label className='form-label ms-3' htmlFor="">Tanggal Peminjaman</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' required onChange={handleChangeTanggal} value={tanggal} type="date"/>
                            <label className='form-label ms-3' htmlFor="">Jam Peminjaman</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' required onChange={handleChangeJam} value={jam} type="time"/>
                            <label className='form-label ms-3' htmlFor="">Durasi Peminjaman</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' required onChange={handleChangeDurasi} value={durasi} type="text"/>
                        </div>
                        <div className='d-flex flex-column align-items-center w-100'>
                          <button onClick={handleRequest} className='submit' type="submit">Submit</button>                    
                        </div>
                        </form>
                    </div>
                </div>
            </div>        
        </>
    )
}
export default Vehicle_Update

