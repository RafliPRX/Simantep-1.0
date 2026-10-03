import { useEffect, useState } from 'react'
import '../css/form.css';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Profile from '../profile'
const Request = () => {
    const {level} = useParams();
    const {role} = useParams();
    const {role_sp} = useParams();
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
    const [isLoading, setIsLoading] = useState(false);
    const storeidNumber = localStorage.getItem('id_number');
    const [barang, setBarang] = useState('');
    const [barang2, setBarang2] = useState('');
    const [barang3, setBarang3] = useState('');
    const [barang4, setBarang4] = useState('');
    const [barang5, setBarang5] = useState('');
    const [jumlah_barang, setJumlahBarang] = useState('');
    const [jumlah_barang2, setJumlahBarang2] = useState('');
    const [jumlah_barang3, setJumlahBarang3] = useState('');
    const [jumlah_barang4, setJumlahBarang4] = useState('');
    const [jumlah_barang5, setJumlahBarang5] = useState('');
    const [satuan_barang, setSatuanBarang] = useState('');
    const [satuan_barang2, setSatuanBarang2] = useState('');
    const [satuan_barang3, setSatuanBarang3] = useState('');
    const [satuan_barang4, setSatuanBarang4] = useState('');
    const [satuan_barang5, setSatuanBarang5] = useState('');
    const navigate = useNavigate();
    const [identity_pjSarpras, setIdentity_PJSarpras] = useState([]);
    const [nama_pjSarpras, setNama_PJSarpras] = useState(identity_pjSarpras.nama);
    const [identity, setIdentity] = useState([]);
    const [nama, setNama] = useState("");
    const [jabatan, setJabatan] = useState(identity.jabatan);    
    const [nrk_nip, setNrk_nip] = useState(identity.nrk_nip);
    const [nama_role, setNama_role] = useState(identity.nama_role);
    const [nama_role_c, setNama_role_c] = useState(identity.nama_role_c);
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
    const handleChangeBarang = (event) => {
      console.log(event.target.value);
      setBarang(event.target.value);
    }
    const handleChangeJumlahBarang = (event) => {
      console.log(event.target.value);
      setJumlahBarang(event.target.value);
    }
    const handleChangeSatuanBarang = (event) => {
      console.log(event.target.value);
      setSatuanBarang(event.target.value);
    }
    const handleChangeBarang2 = (event) => {
      console.log(event.target.value);
      setBarang2(event.target.value);
    }
    const handleChangeJumlahBarang2 = (event) => {
      console.log(event.target.value);
      setJumlahBarang2(event.target.value);
    }
    const handleChangeSatuanBarang2 = (event) => {
      console.log(event.target.value);
      setSatuanBarang2(event.target.value);
    }
    const handleChangeBarang3 = (event) => {
      console.log(event.target.value);
      setBarang3(event.target.value);
    }
    const handleChangeJumlahBarang3 = (event) => {
      console.log(event.target.value);
      setJumlahBarang3(event.target.value);
    }
    const handleChangeSatuanBarang3 = (event) => {
      console.log(event.target.value);
      setSatuanBarang3(event.target.value);
    }
    const handleChangeBarang4 = (event) => {
      console.log(event.target.value);
      setBarang4(event.target.value);
    }
    const handleChangeJumlahBarang4 = (event) => {
      console.log(event.target.value);
      setJumlahBarang4(event.target.value);
    }
    const handleChangeSatuanBarang4 = (event) => {
      console.log(event.target.value);
      setSatuanBarang4(event.target.value);
    }
    const handleChangeBarang5 = (event) => {
      console.log(event.target.value);
      setBarang5(event.target.value);
    }
    const handleChangeJumlahBarang5 = (event) => {
      console.log(event.target.value);
      setJumlahBarang5(event.target.value);
    }
    const handleChangeSatuanBarang5 = (event) => {
      console.log(event.target.value);
      setSatuanBarang5(event.target.value);
    }
    const hadleRequest = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      const payload = {
        id_number: storeidNumber,
        barang: barang,
        jumlah_barang: jumlah_barang,
        satuan: satuan_barang,
        barang2: barang2,
        jumlah_barang2: jumlah_barang2,
        satuan2: satuan_barang2,
        barang3: barang3,
        jumlah_barang3: jumlah_barang3,
        satuan3: satuan_barang3,
        barang4: barang4,
        jumlah_barang4: jumlah_barang4,
        satuan4: satuan_barang4,
        barang5: barang5,
        jumlah_barang5: jumlah_barang5,
        satuan5: satuan_barang5,
        sent_to: nama_pjSarpras,
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/new_request.php`, payload, {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          navigate(`/dashboard-laras/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}`);
          alert(response.data.message);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error.response);
        alert("error code 105c");
        setIsLoading(false);
      }
    }
    return(
        <>
            <div className='container-fluid d-flex flex-column p-5 m-2 overflow-auto'>
              {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
              </div>} 
                <p className='content-header-p'>Silaras/Formulir Permohonan BHP & ATK</p>
                <div className='d-flex justify-content-between align-items-center'>
                  <h1 className='content-header-title mt-0'>Formulir Permohonan Barang Habis Pakai & Alat Tulis Kantor</h1>
                  <Profile nama={storedUsername} f_profile={storedFProfile} feature="silaras" />                                 
                </div>
                <div className='form-position d-flex flex-column'>
                    <div className='form-display' id='box_request'>
                        <form action="">
                        <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                            <h1 className='form-h1 fw-bold ms-3'>Data Diri Peminjam</h1>
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
                            <label className='form-label ms-3' htmlFor="">Permohonan Barang</label>
                            <table className='table-spaced' border="1">
                              <tbody className='text-center'>
                                <tr className=''>
                                  <th>No</th>
                                  <th>Nama Barang</th>
                                  <th>Jumlah</th>
                                  <th>Satuan</th>
                                </tr>
                                <tr>
                                  <th>1</th>
                                  <th><input className='text-center' onChange={handleChangeBarang} type="text" /></th>
                                  <th><input className='text-center' onChange={handleChangeJumlahBarang} type="number" /></th>
                                  <th><input className='text-center' onChange={handleChangeSatuanBarang} type="text" /></th>
                                </tr>
                                <tr >
                                  <th>2</th>
                                  <th><input className='text-center' onChange={handleChangeBarang2} type="text" /></th>
                                  <th><input className='text-center' onChange={handleChangeJumlahBarang2} type="number" /></th>
                                  <th><input className='text-center' onChange={handleChangeSatuanBarang2} type="text" /></th>

                                </tr>
                                <tr>
                                  <th>3</th>
                                  <th><input className='text-center' onChange={handleChangeBarang3} type="text" /></th>
                                  <th><input className='text-center' onChange={handleChangeJumlahBarang3} type="number" /></th>
                                  <th><input className='text-center' onChange={handleChangeSatuanBarang3} type="text" /></th>
                                </tr>
                                <tr>
                                  <th>4</th>
                                  <th><input className='text-center' onChange={handleChangeBarang4} type="text" /></th>
                                  <th><input className='text-center' onChange={handleChangeJumlahBarang4} type="number" /></th>
                                  <th><input className='text-center' onChange={handleChangeSatuanBarang4} type="text" /></th>
                                </tr>
                                <tr>
                                  <th>5</th>
                                  <th><input className='text-center' onChange={handleChangeBarang5} type="text" /></th>
                                  <th><input className='text-center' onChange={handleChangeJumlahBarang5} type="number" /></th>
                                  <th><input className='text-center' onChange={handleChangeSatuanBarang5} type="text" /></th>
                                </tr>
                              </tbody>
                            </table>
                            <label className='form-label ms-3' htmlFor="">Note: Jika Permohonan Barang lebih dari 5 Item Maka Tambah Formulir</label>
                        </div>
                        <div className='d-flex flex-column align-items-center w-100'>
                          <button onClick={hadleRequest} className='submit' type="submit">Submit</button>                        
                        </div>
                        </form>
                    </div>
                </div>
            </div>        

        </>
    )
}
export default Request