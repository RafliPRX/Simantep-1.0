import { useState } from 'react'
import './fix-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Profile from '../profile'
const Request = () => {
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

    const [nama, setNama] = useState(storedUsername)
    const [nrk, setNRK] = useState(storeNrk)
    const [unit, setUnit] = useState('')
    const [barang, setBarang] = useState('')
    const navigate = useNavigate();

    const handleChangeNama = (event) => {
      console.log(event.target.value);
      setNama(event.target.value);
    }
    const handleChangeNRK = (event) => {
      console.log(event.target.value);
      setNRK(event.target.value);
    }
    const handleChangeUnit = (event) => {
      console.log(event.target.value);
      setUnit(event.target.value);
    }
    const handleChangeBarang = (event) => {
      console.log(event.target.value);
      setBarang(event.target.value);
    }
    const hadleRequest = async (event) => {
      event.preventDefault();
      const payload = {
        nama: nama,
        nrk: nrk,
        unit: unit,
        barang: barang,
        f_profile: storedFProfile
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/new_request.php`, payload, {
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
        alert("error code 105c");
      }
    }
    return(
        <>
            <div className='main-dashboard'>
                <p>Silaras/Form Permohonan BHP & ATK</p>
                <h1>Form Permohonan Barang <br /> Habis Pakai & Alat Tulis <br /> Kantor</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="silaras" />                 
                <div className='content-col'>
                    <div className='box3' id='box_request'>
                        <form action="">
                        <div className='content-f'>
                            <h1>Data Diri Peminjam</h1>
                            <label htmlFor="">Nama</label>
                            <input onChange={handleChangeNama} value={storedUsername} placeholder='Nama' type="text"/>
                            <label htmlFor="">NIP/NRK</label>
                            <input onChange={handleChangeNRK} value={storeNrk} placeholder='NRK' type="text"/>
                            <label htmlFor="">Unit Kerja</label>
                            <input onChange={handleChangeUnit} placeholder='Unit Kerja' type="text"/>
                            <label htmlFor="">Permohonan Barang (Deskripsikan Permohonan)</label>
                            <textarea onChange={handleChangeBarang} placeholder='Isi Disini' name="" id=""></textarea>
                        </div>
                        <button onClick={hadleRequest} className='submit' type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>        

        </>
    )
}
export default Request