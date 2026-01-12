import { useState } from 'react';
import './fix-form.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Profile from '../profile';
const Fix_form = () => {
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
  const [nrk, setNrk] = useState(storeNrk);
  const [unit, setUnits] = useState("");
  const [fixing, setFixing] = useState("");
  const [image, setImage] = useState("")
  const navigate = useNavigate();
  const handleChangeNama = (event) => {
    console.log(event.target.value);
    setNama(event.target.value);
  }
  const handleChangeNRK = (event) => {
    console.log(event.target.value);
    setNrk(event.target.value);
  }
  const handleChangeUnits = (event) => {
    console.log(event.target.value);
    setUnits(event.target.value);
  }
  const handleChangeFixing = (event) => {
    console.log(event.target.value);
    setFixing(event.target.value);
  }
  const handleChangeImage = (event) => {
    setImage(event.target.files[0]);
    console.log(event.target.files[0]);
  }

  const handleRequest = async (event) => {
    event.preventDefault();
    const payload = {
      nama: nama,
      nrk: nrk,
      unit: unit,
      fix: fixing,
      foto: image,
      f_profile: storedFProfile
    };
    try {
      const respone = await axios.post(`https://simantepbareta.cloud/API/SILARAS/new_fix.php`, payload, {
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      });
      console.log(respone.data);
      setTimeout(() => {
        navigate("/dashboard-laras");
        alert(respone.data.message);
      }, 1000);
    } catch (error) {
      console.log(error.respone);
      alert("error code 105");
    }
  }
    return(
        <>
            <div className='main-dashboard'>
                <p>Silaras/Form Perbaikan</p>
                <h1>Form Perbaikan</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="silaras" />                 
                <div className='content-col'>
                    <div className='box3'>
                        <form action="">
                        <div className='content-f'>
                            <h1>Data Perbaikan</h1>
                            <label htmlFor="">Nama</label>
                            <input onChange={handleChangeNama} value={storedUsername} placeholder='Nama' type="text"/>
                            <label htmlFor="">NIP/NRK</label>
                            <input onChange={handleChangeNRK} value={storeNrk} placeholder='NRK' type="text"/>
                            <label htmlFor="">Units</label>
                            <input onChange={handleChangeUnits} value={unit} placeholder='Units' type="text"/>
                            <label htmlFor="">Permintaan Perbaikan (Deskripsikan Perbaikan)</label>
                            <textarea onChange={handleChangeFixing} value={fixing} placeholder='Permintaan Perbaikan' name="" id=""></textarea>
                            <label htmlFor="">Bukti Gambar</label>
                            <input onChange={handleChangeImage} type="file" name="" id="" />
                        </div>
                        <button onClick={handleRequest} className='submit' type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>        
        </>
    )
}
export default Fix_form