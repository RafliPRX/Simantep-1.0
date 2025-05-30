import { useEffect, useState } from 'react'
import './fix-form.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Vehicle_Update = () => {
    const storedUsername = localStorage.getItem('nama');

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
                <div className='profile'>
                <p style={{fontFamily: 'Poppins', fontSize: '15px', marginTop: '22px'}}>{storedUsername}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <g clipPath="url(#clip0_5_1232)">
                        <path d="M19.29 17.29L18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.62999 5.36 5.99999 7.92 5.99999 11V16L4.70999 17.29C4.07999 17.92 4.51999 19 5.40999 19H18.58C19.48 19 19.92 17.92 19.29 17.29ZM16 17H7.99999V11C7.99999 8.52 9.50999 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17ZM12 22C13.1 22 14 21.1 14 20H9.99999C9.99999 21.1 10.89 22 12 22Z" fill="white"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_5_1232">
                          <rect width="24" height="24" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 18 18" fill="none">
                      <g clipPath="url(#clip0_5_1230)">
                        <path d="M9.95691 18C12.7329 18 15.2683 16.737 16.948 14.6675C17.1965 14.3613 16.9255 13.9141 16.5415 13.9872C12.175 14.8188 8.1651 11.4709 8.1651 7.06303C8.1651 4.52398 9.52431 2.18914 11.7334 0.931992C12.0739 0.738211 11.9883 0.221941 11.6013 0.150469C11.0589 0.0504468 10.5085 8.21369e-05 9.95691 0C4.98902 0 0.956909 4.02578 0.956909 9C0.956909 13.9679 4.98269 18 9.95691 18Z" fill="white"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_5_1230">
                          <rect width="18" height="18" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <div className='pic'></div>
                </div>
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

