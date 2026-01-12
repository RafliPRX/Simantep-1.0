import { useState } from 'react'
import './fix-form.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Profile from '../profile';
const Vehicle = () => {
    const storedUsername = localStorage.getItem('nama');
    const storeNrk = localStorage.getItem('nrk');
    const storedSisaCuti = localStorage.getItem('sisa_cuti');
    const storedFProfile = localStorage.getItem('f_profile');
    const storedID = localStorage.getItem('id_jabatan_sup');
    console.log(storedUsername);
    console.log(storedSisaCuti );
    console.log(storedFProfile);
    console.log(storeNrk);
    console.log(storedID);

    const [nama, setNama] = useState(storedUsername);
    const [unit, setUnits] = useState("");
    const [jenis, setJenis] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [jam, setJam] = useState("");
    const [durasi, setDurasi] = useState("");
    const [tujuan, setTujuan] = useState("");
    const [keperluan, setKeperluan] = useState("");
    const navigate = useNavigate();
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
    const handleChangeTujuan = (event) => {
      console.log(event.target.value);
      setTujuan(event.target.value);
    }
    const handleChangeKeperluan = (event) => {
      console.log(event.target.value);
      setKeperluan(event.target.value);
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
      const payload = {
        nama:nama,
        unit:unit,
        jenis:jenis,
        tujuan:tujuan,
        keperluan:keperluan,
        tanggal_pinjam:tanggal,
        jam_pinjam:jam,
        durasi_pinjam:durasi,
        f_profile: storedFProfile
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/new_vehicle.php`, payload, {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          navigate("/dashboard-laras");
          alert(response.data.message);
        }, 1000);
      } catch (error) {
        console.log(error.response);
        alert("error code 105b");
      }
    }
    return(
        <>
            <div className='main-dashboard'>
                <p>Silaras/Form Peminjaman Kendaraan Dinas</p>
                <h1>Form Peminjaman <br className='break' /> Kendaraan Dinas</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="silaras" />                 
                <div className='content-col'>
                    <div className='box3' id='box_vehicle'>
                        <form action="">
                        <div className='content-f'>
                            <h1>Data Diri Peminjam</h1>
                            <label htmlFor="">Nama</label>
                            <input onChange={handleChangeNama} value={storedUsername} placeholder='Nama' type="text"/>
                            <label htmlFor="">Unit Kerja</label>
                            <input onChange={handleChangeUnits} placeholder='Unit Kerja' type="text"/>
                            <label htmlFor="">Jenis Peminjaman Kendaraan (Pilih Satu)</label>
                            <div className='check'>
                                <input onChange={handleChangeJenis} value={"Roda 2"} type="checkbox" name="" id="" />
                                <label htmlFor="">Roda 2</label>
                            </div>
                            <div className='check'>
                                <input onChange={handleChangeJenis} value={"Roda 4"} type="checkbox" name="" id="" />
                                <label htmlFor="">Roda 4</label>
                            </div>
                            <div className='check'>
                                <input onChange={handleChangeJenis} value={"Roda 6"} type="checkbox" name="" id="" />
                                <label htmlFor="">Roda 6</label>
                            </div>
                            <label htmlFor="">Tujuan Peminjaman</label>
                            <input type="text" onChange={handleChangeTujuan} placeholder='Tujuan Peminjaman' />
                            <label htmlFor="">Keperluan Peminjaman</label>
                            <input type="text" onChange={handleChangeKeperluan} placeholder='Keperluan Peminjaman' />
                            <label htmlFor="">Tanggal Peminjaman</label>
                            <input onChange={handleChangeTanggal} placeholder='Tanggal Peminjaman' type="date"/>
                            <label htmlFor="">Jam Peminjaman</label>
                            <input onChange={handleChangeJam} placeholder='Jam Peminjaman' type="time"/>
                            <label htmlFor="">Durasi Peminjaman</label>
                            <input onChange={handleChangeDurasi} placeholder='Durasi Peminjaman' type="text"/>
                        </div>
                        <button onClick={handleRequest} className='submit' type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>        
        </>
    )
}
export default Vehicle