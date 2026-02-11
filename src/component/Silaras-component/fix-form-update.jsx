import { useEffect, useState } from 'react';
import './fix-form.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../profile';

const Fix_form_Update = () => {
  const storedUsername = localStorage.getItem('nama');
  const storedFProfile = localStorage.getItem('f_profile');
  const navigate = useNavigate();
  const { level } = useParams();
  const { role } = useParams();
  const { role_sp } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const param = useParams();
  const [detail, setDetail] = useState({});
  const [nama, setNama] = useState(detail.nama || "");
  const [nrk, setNrk] = useState(detail.nrk_nip || "");
  const [unit, setUnits] = useState(detail.unit || "");
  const [fixing, setFixing] = useState(detail.fix || "");
  const [file, setFile] = useState(detail.foto || "");
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
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  }
  const getDetail = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/detail_fix.php?id=${param.id}`, {
            headers: {}
        })
        setDetail(response.data);
        console.log(response.data);
        setNama(response.data.nama);
        setNrk(response.data.nrk_nip);
        setUnits(response.data.unit);
        setFixing(response.data.fix);
        setFile(response.data.foto);
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
    setIsLoading(true);
    const payload = { 
      unit: unit,
      fix: fixing,
      foto: file
    };
    if (!payload.file) {
      alert("Mohon untuk Upload Gambar Bukti");
      setIsLoading(false);
      return;
    }
    try {
      const respone = await axios.post(`https://simantepbareta.cloud/API/SILARAS/update_fix.php?id=${param.id}`, payload, {
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      });
      console.log(respone.data);
      setTimeout(() => {
        navigate(`/dashboard-laras/${level}/${role}/${role_sp}`);        
        alert(respone.data.message);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error.response);
      alert(error.respone.data.message);
      setIsLoading(false);
    }
  }
  return(
      <>
          <div className='main-dashboard'>
            {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
            </div>}
              <p>Silaras/Formulir Perbaikan</p>
              <h1>Mengubah Formulir Perbaikan</h1>
              <Profile nama={storedUsername} f_profile={storedFProfile} feature="silaras" />              
              <div className='content-col'>
                  <div className='box3'>
                      <form action="">
                      <div className='content-f'>
                          <h1>Data Perbaikan</h1>
                          <label htmlFor="">Nama</label>
                          {/* <input type="text" value={param.id} /> */}
                          <input contentEditable onChange={handleChangeNama} onInput={(e) => setNama(e.target.textContent)} value={nama} type="text"/>
                          <label htmlFor="">NIP/NRK</label>
                          <input contentEditable onChange={handleChangeNRK} onInput={(e) => setNrk(e.target.textContent)} value={nrk} type="text"/>
                          <label htmlFor="">Units</label>
                          <input contentEditable onChange={handleChangeUnits} onInput={(e) => setUnits(e.target.textContent)} value={unit} type="text"/>
                          <label htmlFor="">Permintaan Perbaikan (Deskripsikan Perbaikan)</label>
                          <textarea onChange={handleChangeFixing} onInput={(e) => setFixing(e.target.value)} value={fixing} name="" id=""></textarea>
                          <label htmlFor="">Gambar Bukti</label>
                          <img style={{width: '600px', height: 'auto', borderRadius: '10px', marginLeft: "35px", marginBottom: "10px"}} src={`https://simantepbareta.cloud/API/SILARAS/${detail.foto}`} alt="" />
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

export default Fix_form_Update
