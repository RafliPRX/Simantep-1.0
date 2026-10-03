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
  const [nama_role, setNama_role] = useState(identity.nama_role);
  const [nama_role_c, setNama_role_c] = useState(identity.nama_role_c);
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
      setNama_role(response.data.nama_role);
      setNama_role_c(response.data.nama_role_c);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getIdentity();
    getIdentity_pjSarpras();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [fixing, setFixing] = useState("");
  const [image, setImage] = useState("")
  const navigate = useNavigate();
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
        navigate(`/dashboard-laras/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}`);
        alert(respone.data.message);
      }, 1000);
    } catch (error) {
      console.log(error.respone);
      alert("error code 105");
    }
  }
    return(
        <>
            <div className='container-fluid d-flex flex-column p-5 m-2 overflow-auto'>
              {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
            </div>} 
                <p className='content-header-p'>Silaras/Formulir Perbaikan</p>
                <div className='d-flex justify-content-between align-items-center'>
                  <h1 className='content-header-title mt-0'>Formulir Perbaikan</h1>
                  <Profile nama={nama} f_profile={storedFProfile} feature="silaras" />
                </div>                                 
                <div className='form-position d-flex flex-column'>
                    <div className='form-display'>
                        <form action="">
                        <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                            <h1 className='form-h1 fw-bold ms-3'>Data Perbaikan</h1>
                            <label className='form-label ms-3' htmlFor="">Nama</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' value={nama} disabled placeholder='Nama' type="text"/>
                            <label className='form-label ms-3' htmlFor="">NIP/NRK</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' value={nrk_nip} disabled placeholder='NRK' type="text"/>
                            <label className='form-label ms-3' htmlFor="">Jabatan</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' value={jabatan} disabled placeholder='Jabatan' type="text"/>
                            {level === 'level-1' && (
                              <>
                                <label className='form-label ms-3' htmlFor="">Unit Kerja</label>
                                <input className='form-input ms-3 mb-4 ps-2 rounded-3' value={nama_role} disabled placeholder='Units' type="text"/>
                              </>
                            )}
                            {level === 'level-2' && (
                              <>
                                <label className='form-label ms-3' htmlFor="">Unit Kerja</label>
                                <input className='form-input ms-3 mb-4 ps-2 rounded-3' value={nama_role_c} disabled placeholder='Units' type="text"/>
                              </>
                            )}
                            <label className='form-label ms-3' htmlFor="">Permintaan Perbaikan (Deskripsikan Perbaikan)</label>
                            <textarea className='form-textarea ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeFixing} value={fixing} placeholder='Permintaan Perbaikan' name="" id=""></textarea>
                            <div className="d-flex flex-column">
                            <label className="form-label ms-3" htmlFor="sakit-file">
                              Upload Bukti Gambar (Maks. 2Mb)
                            </label>
                            <div className="custom-file-row ms-3 mb-3">
                              <label className="custom-file-btn" htmlFor="sakit-file">
                                Choose file
                              </label>
                              <input
                                id="sakit-file"
                                className="custom-file-input"
                                type="file"
                                onChange={handleChangeImage}
                              />
                              <span className="custom-file-name">
                                {image ? image.name : 'No file chosen'}
                              </span>
                            </div>                      
                          </div>
                        </div>
                        <div className='d-flex flex-column align-items-center w-100'>
                            <button onClick={handleRequest} className='submit'>Kirim</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>        
        </>
    )
}
export default Fix_form