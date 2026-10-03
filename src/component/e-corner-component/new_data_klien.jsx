import axios from 'axios';
import '../css/form.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css"; // Importing the CSS for the date picker
import Profile from '../profile';

const New_Data_Klien_form = () => {   
  const [isLoading, setIsLoading] = useState(false);
  const storeidNumber = localStorage.getItem('id_number');
  const [identity, setIdentity] = useState([]);
  const [nama, setNama] = useState(identity.nama);
  const [kode_role_c, setKode_role_c] = useState(identity.kode_role_c);
  const { level } = useParams();
  const { role } = useParams();
  const { role_sp } = useParams();
  const { nrk_nip } = useParams();
  const getIdentity = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/Admin_API/detail_identity.php?id=${storeidNumber}` , {
          headers: {"Content-Type": "application/json"},
        });
        console.log(response.data);
        setIdentity(response.data);
        setNama(response.data.nama);
        setKode_role_c(response.data.kode_role_c);
      } catch (error) {
        console.log(error);
      }
    }
  const [identityPJ, setIdentityPJ] = useState([]);
  const [nama_pj, setNama_pj] = useState(identityPJ.nama);
  console.log("nama PJ: " + nama_pj);
  const role_c = kode_role_c;
  const getIdentityPJ = async (role_c) => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/getIdentity_PJ.php?kode_role_c=${role_c}` , {
          headers: {"Content-Type": "application/json"},
        });
        console.log(response.data);
        setIdentityPJ(response.data);
        setNama_pj(response.data.nama);
      } catch (error) {
        console.log(error);
      }
  }
  const [nama_klien, setNamaKlien] = useState("");
  const handleChangeNamaKlien = (event) => {
    setNamaKlien(event.target.value);
    console.log(event.target.value);    
  }
  const [nama_init, setNamaInit] = useState("");
  const handleChangeNamaInit = (event) => {
    setNamaInit(event.target.value);
    console.log(event.target.value);    
  }
  
  const navigate = useNavigate();
  const handlePostClient = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    setIsLoading(true);
    const payload = {
      nama_klien: nama_klien,
      nama_init: nama_init      
    };
    try {
      const response = await axios.post(`https://simantepbareta.cloud/API/E-corner/add_new_klien.php`, payload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });      
      console.log(response.data);
      setTimeout(() => {
        setIsLoading(false);
        navigate(`/Dashboard-E-Corner/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}`);
        alert(response.data.message);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.log(error.response);
      alert("error code 103");
    }
  }
  useEffect(() => {
    getIdentity();
    if (kode_role_c) {
      getIdentityPJ(role_c);
    }   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kode_role_c]);
  return (
    <>
      <div className='container-fluid d-flex flex-column p-5 m-2 overflow-auto'>
        {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
            <span style={{position: 'absolute', top : '1500px'}} className="load-cuti"></span>
        </div>} 
        <p className='content-header-p'>E-Corner/Menambah Klien E-Corner</p>
        <div className='d-flex justify-content-between align-items-center'>
          <h1 className='content-header-title mt-0'>Menambah Klien E-Corner</h1>
          <Profile nama={nama} feature="mawasdiri" />        
        </div>
        <div className='form-position d-flex flex-column'>
          <div className='form-display'>
            <form onSubmit={handlePostClient}>
              <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                <h1 className='form-h1 fw-bold ms-3'>Data Diri</h1>
                {/* <label htmlFor="">id pengguna</label>
                <input onChange={handleChangeId} placeholder='Nomor' type="number" /> */}
                <label className='form-label ms-3' htmlFor="">Nama Klien</label>
                <input className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeNamaKlien} placeholder='Nama Klien' type="text" />                
                <label className='form-label ms-3' htmlFor="">Nama Klien (Inisial)</label>
                <input className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeNamaInit} placeholder='Nama Inisial' type="text" />
                <div className='d-flex flex-column align-items-center w-100'>
                    <button className='submit' type="submit">Tambah Klien</button>                    
                </div>                  
              </div>                          
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default New_Data_Klien_form;