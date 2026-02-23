import { useEffect, useState } from 'react';
import '../css/form.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../profile';
const Fix_form = () => {
  const storeidNumber = localStorage.getItem('id_number');
  console.log('id_number: ' + storeidNumber);
  const storedFProfile = localStorage.getItem('f_profile');
  const [identity, setIdentity] = useState([]);
  const [nama, setNama] = useState(identity.nama);
  const [jabatan, setJabatan] = useState(identity.jabatan);    
  const [nrk_nip, setNrk_nip] = useState(identity.nrk_nip);
  const [isLoading, setIsLoading] = useState(false);
  const { level } = useParams();
  const { role } = useParams();
  const { role_sp } = useParams();
  const [identity_pjSarpras, setIdentity_PJSarpras] = useState([]);
  const [nama_pjSarpras, setNama_PJSarpras] = useState(identity_pjSarpras.nama);
  console.log("nama pj Sarpras: " + nama_pjSarpras);
  
  const getIdentity_pjSarpras = async () => {
    try {
      const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/get_pjSarpras_Identity.php?kode_role_c=C-03` , {
        headers: {"Content-Type": "application/json"},
      });
      console.log(response.data);
      setIdentity_PJSarpras(response.data.Data[0]);
      setNama_PJSarpras(response.data.Data[0].nama);
         
    } catch (error) {
      console.log(error);
    }
  }

  const getIdentity = async () => {
    try {
      const response = await axios.get(`https://simantepbareta.cloud/API/Admin_API/detail_identity.php?id=${storeidNumber}` , {
        headers: {"Content-Type": "application/json"},
      });
      console.log(response.data);
      setIdentity(response.data);
      setNama(response.data.nama);
      setJabatan(response.data.jabatan);
      setNrk_nip(response.data.nrk_nip);
         
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getIdentity();
    getIdentity_pjSarpras();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [unit, setUnits] = useState("");
  const [fixing, setFixing] = useState("");
  const [image, setImage] = useState("")
  const navigate = useNavigate();
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
    setIsLoading(true);
    const payload = {
      id_number: storeidNumber,
      unit: unit,
      fix: fixing,
      foto: image,
      sent_to: nama_pjSarpras
    };
    try {
      const respone = await axios.post(`https://simantepbareta.cloud/API/SILARAS/new_fix.php`, payload, {
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      });
      console.log(respone.data);
      setTimeout(() => {
        setIsLoading(false);
        navigate(`/dashboard-laras/${level}/${role}/${role_sp}`);
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
              {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
            </div>} 
                <p>Silaras/Formulir Perbaikan</p>
                <h1>Formulir Perbaikan</h1>
                <Profile nama={nama} f_profile={storedFProfile} feature="silaras" />                 
                <div className='content-col'>
                    <div className='box1'>
                        <form action="">
                        <div className='content-f'>
                            <h1>Data Perbaikan</h1>
                            <label htmlFor="">Nama</label>
                            <input value={nama} placeholder='Nama' type="text"/>
                            <label htmlFor="">NIP/NRK</label>
                            <input  value={nrk_nip} placeholder='NRK' type="text"/>
                            <label htmlFor="">Jabatan</label>
                            <input  value={jabatan} placeholder='Jabatan' type="text"/>
                            <label htmlFor="">Unit Kerja</label>
                            <input onChange={handleChangeUnits} value={unit} placeholder='Units' type="text"/>
                            <label htmlFor="">Permintaan Perbaikan (Deskripsikan Perbaikan)</label>
                            <textarea onChange={handleChangeFixing} value={fixing} placeholder='Permintaan Perbaikan' name="" id=""></textarea>
                            <label htmlFor="">Bukti Gambar (Maksimal 2 Mb)</label>
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