import { useEffect, useState } from 'react';
import '../css/form.css';
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
  const [nama_role, setNama_role] = useState(detail.nama_role || "");
  const [nama_role_c, setNama_role_c] = useState(detail.nama_role_c || "");
  const [nama_role_b, setNama_role_b] = useState(detail.nama_role_b || "");
  const [nama_role_a, setNama_role_a] = useState(detail.nama_role_a || "");
  const [fixing, setFixing] = useState(detail.fix || "");
  const [file, setFile] = useState(detail.foto || "");
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
        setNama_role(response.data.nama_role);
        setNama_role_c(response.data.nama_role_c);
        setNama_role_b(response.data.nama_role_b);
        setNama_role_a(response.data.nama_role_a);
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
      fix: fixing,
      foto: file
    };
    if (!payload.foto) {
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
                  <div className='box1'>
                      <form action="">
                      <div className='content-f'>
                          <h1>Data Perbaikan</h1>
                          <label htmlFor="">Nama</label>
                          {/* <input type="text" value={param.id} /> */}
                          <input contentEditable disabled value={nama} type="text"/>
                          <label htmlFor="">NIP/NRK</label>
                          <input contentEditable disabled value={nrk} type="text"/>
                          <label htmlFor="">Units</label>
                          {level === "level-1" && (
                            <input contentEditable disabled value={nama_role} type="text"/>
                          )}
                          {level === "level-2" && (
                            <input contentEditable disabled value={nama_role_c} type="text"/>
                          )}
                          {level === "level-3" && (
                            <input contentEditable disabled value={nama_role_b} type="text"/>
                          )}
                          {level === "level-4" && (
                            <input contentEditable disabled value={nama_role_a} type="text"/>
                          )}
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
