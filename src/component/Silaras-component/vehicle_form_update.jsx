import { useEffect, useState } from 'react'
import './fix-form.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Profile from '../profile';

const Vehicle_Update = () => {
    const storedUsername = localStorage.getItem('nama');
    const storedFProfile = localStorage.getItem('f_profile');
    const [nama, setNama] = useState("");
    const [unit, setUnits] = useState("");
    const [jenis, setJenis] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [jam, setJam] = useState("");
    const [durasi, setDurasi] = useState("");
    const navigate = useNavigate();

    const param = useParams();
    const handleChangeNama = (event) => {
      console.log(event.target.value);
      setNama(event.target.value);
    }
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

    const handleRequest = async (event) => {
      event.preventDefault();
      const payload = {
        id:param.id,
        nama:nama,
        unit:unit,
        jenis:jenis,
        tanggal_pinjam:tanggal,
        jam_pinjam:jam,
        durasi_pinjam:durasi,
      };
      if (!payload.nama || !payload.unit || !payload.jenis || !payload.tanggal_pinjam || !payload.jam_pinjam || !payload.durasi_pinjam) {
        alert("Mohon isi semua field yang wajib diisi");
        return;
      }
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/update_vehicle.php`, payload, {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          navigate("/dashboard-laras");
        }, 1000);
      } catch (error) {
        console.log(error.response);
      }
    }


    return(
        <>
            <div className='main-dashboard'>
                <p>Silaras/Form Peminjaman Kendaraan Dinas</p>
                <h1>Form Peminjaman <br /> Kendaraan Dinas</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="silaras" />                 
                <div className='content-col'>
                    <div className='box3' style={{marginTop: '-274px'}}>
                        <form action="">
                        <div className='content-f'>
                            <h1>Data Diri Peminjam</h1>
                            <label htmlFor="">Nama</label>
                            <input name='nama' required={true} onChange={handleChangeNama} onInput={(e) => setNama(e.target.value)} placeholder={detail.nama} type="text"/>
                            <label htmlFor="">Unit Kerja</label>
                            <input required onChange={handleChangeUnits} onInput={(e) => setUnits(e.target.value)} placeholder={detail.unit} type="text"/>
                            <label htmlFor="">Jenis Peminjaman Kendaraan (Pilih Satu)</label>
                            <div className='check'>
                                <input onChange={handleChangeJenis} defaultChecked={detail.jenis === "Roda 2"}  value={"Roda 2"} type="checkbox" name="" id="" />
                                <label htmlFor="">Roda 2</label>
                                <label htmlFor="" style={{display: detail.jenis === "Roda 2" ? "flex" : "none"}}>Anda Sebelumnya Memilih Roda 2</label> 
                            </div> 
                            <div className='check'> 
                                <input onChange={handleChangeJenis} defaultChecked={detail.jenis === "Roda 4"}  value={"Roda 4"} type="checkbox" name="" id="" />
                                <label htmlFor="" >Roda 4</label>
                                <label htmlFor="" style={{display: detail.jenis === "Roda 4" ? "flex" : "none"}}>Anda Sebelumnya Memilih Roda 4</label> 
                            </div> 
                            <div className='check'> 
                                <input onChange={handleChangeJenis} defaultChecked={detail.jenis === "Roda 6"}  value={"Roda 6"} type="checkbox" name="" id="" />
                                <label htmlFor="">Roda 6</label>
                                <label htmlFor="" style={{display: detail.jenis === "Roda 6" ? "flex" : "none"}}>Anda Sebelumnya Memilih Roda 6</label>
                            </div>
                            <label htmlFor="">Tanggal Peminjaman</label>
                            <input required onChange={handleChangeTanggal} onInput={(e) => setTanggal(e.target.value)} defaultValue={detail.tanggal_pinjam} type="date"/>
                            <label htmlFor="">Jam Peminjaman</label>
                            <input required onChange={handleChangeJam}  onInput={(e) => setJam(e.target.value)} placeholder={detail.jam_pinjam} type="time"/>
                            <label htmlFor="">Durasi Peminjaman</label>
                            <input required onChange={handleChangeDurasi} onInput={(e) => setDurasi(e.target.value)} placeholder={detail.durasi} type="time"/>
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

