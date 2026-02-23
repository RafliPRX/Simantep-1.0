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
    const [unit, setUnits] = useState(detail.unit || "");
    const [jenis, setJenis] = useState(detail.jenis || "");
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
        setUnits(response.data.unit);
        setJenis(response.data.jenis);
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
    const handleChangeUnits = (event) => {
      console.log(event.target.value);
      setUnits(event.target.value);
    }
    const handleChangeJenis = (event) => {
      console.log(event.target.value);
      setJenis(event.target.value);
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
        nama:nama,
        unit:unit,
        jenis:jenis,
        tanggal_pinjam:tanggal,
        jam_pinjam:jam,
        durasi_pinjam:durasi,
      };
      if (!payload.unit || !payload.jenis || !payload.tanggal_pinjam || !payload.jam_pinjam || !payload.durasi_pinjam) {
        alert("Mohon isi semua field yang wajib diisi");
        return;
      }
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
            <div className='main-dashboard'>
              {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
              </div>} 
                <p>Silaras/Formulir Peminjaman Kendaraan Dinas</p>
                <h1>Mengubah Formulir Peminjaman <br /> Kendaraan Dinas</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="silaras" />                 
                <div className='content-col'>
                    <div className='box1'>
                        <form action="">
                        <div className='content-f'>
                            <h1>Data Diri Peminjam</h1>
                            <label htmlFor="">Nama</label>
                            <input name='nama' value={nama} disabled type="text"/>
                            <label htmlFor="">NRK/NIP</label>
                            <input name='nrk' value={nrk} disabled type="text"/>
                            <label htmlFor="">Jabatan</label>
                            <input name='jabatan' value={jabatan} disabled type="text"/>
                            <label htmlFor="">Unit Kerja</label>
                            <input required onChange={handleChangeUnits} value={unit} type="text"/>
                            <label htmlFor="">Jenis Peminjaman Kendaraan (Pilih Satu)</label>
                            <div className='check'>
                                <input onChange={handleChangeJenis} checked={jenis === "Roda 2"}  value={"Roda 2"} type="checkbox" name="" id="" />
                                <label htmlFor="">Roda 2</label>
                            </div> 
                            <div className='check'> 
                                <input onChange={handleChangeJenis} checked={jenis === "Roda 4"}  value={"Roda 4"} type="checkbox" name="" id="" />
                                <label htmlFor="" >Roda 4</label>
                            </div> 
                            <div className='check'> 
                                <input onChange={handleChangeJenis} checked={jenis === "Roda 6"}  value={"Roda 6"} type="checkbox" name="" id="" />
                                <label htmlFor="">Roda 6</label>
                            </div>
                            <label htmlFor="">Tanggal Peminjaman</label>
                            <input required onChange={handleChangeTanggal} value={tanggal} type="date"/>
                            <label htmlFor="">Jam Peminjaman</label>
                            <input required onChange={handleChangeJam} value={jam} type="time"/>
                            <label htmlFor="">Durasi Peminjaman</label>
                            <input required onChange={handleChangeDurasi} value={durasi} type="text"/>
                        </div>
                        <button onClick={handleRequest} className='submit' type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>        
        </>
    )
}
export default Vehicle_Update

