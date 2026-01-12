import { useEffect, useState } from 'react';
import './fix-form.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../profile';

const Fix_form_Update = () => {
  const storedUsername = localStorage.getItem('nama');
  const storedFProfile = localStorage.getItem('f_profile');
  const [nama, setNama] = useState("");
  const [nrk, setNrk] = useState("");
  const [unit, setUnits] = useState("");
  const [fixing, setFixing] = useState("");
  const navigate = useNavigate();
  
  const param = useParams();
  const [detail, setDetail] = useState({});
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

  const getDetail = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/detail_fix.php?id=${param.id}`, {
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
  },[]);

  const handleRequest = async (event) => {
    event.preventDefault();
    const payload = {
      id: param.id,  
      nama: nama,
      nrk: nrk,
      unit: unit,
      fix: fixing,
    };
    if (!payload.nama || !payload.unit || !payload.nrk || !payload.fixing) {
      alert("Mohon isi semua field yang wajib diisi");
      return;
    }
    try {
      const respone = await axios.post(`https://simantepbareta.cloud/API/SILARAS/update_fix.php`, payload, {
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      });
      console.log(respone.data);
      setTimeout(() => {
        navigate("/dashboard-laras");
      }, 1000);
    } catch (error) {
      console.log(error.respone);
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
                          <input contentEditable onChange={handleChangeNama} onInput={(e) => setNama(e.target.textContent)} placeholder={detail.nama} type="text"/>
                          <label htmlFor="">NIP/NRK</label>
                          <input contentEditable onChange={handleChangeNRK} onInput={(e) => setNrk(e.target.textContent)} placeholder={detail.nrk} type="text"/>
                          <label htmlFor="">Units</label>
                          <input contentEditable onChange={handleChangeUnits} onInput={(e) => setUnits(e.target.textContent)} placeholder={detail.unit} type="text"/>
                          <label htmlFor="">Permintaan Perbaikan (Deskripsikan Perbaikan)</label>
                          <textarea onChange={handleChangeFixing} onInput={(e) => setFixing(e.target.value)} placeholder={detail.fix} name="" id=""></textarea>
                          <label htmlFor="">Permintaan Perbaikan (Deskripsikan Perbaikan)</label>
                          <input type="file" name="" id="" />
                      </div>
                      <button onClick={handleRequest} className='submit' type="submit">Submit</button>
                      </form>
                  </div>
              </div>
          </div>        
      </>
  )
}

export default Fix_form_Update
