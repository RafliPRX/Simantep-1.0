import { useEffect, useState } from 'react'
import '../css/form.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Profile from '../profile';
const Vehicle = () => {
    const storedUsername = localStorage.getItem('nama');
    const storeidNumber = localStorage.getItem('id_number');
    const storeNrk = localStorage.getItem('nrk');
    const storedSisaCuti = localStorage.getItem('sisa_cuti');
    const storedFProfile = localStorage.getItem('f_profile');
    const storedID = localStorage.getItem('id_jabatan_sup');
    const [isLoading, setIsLoading] = useState(false);
    const {level} = useParams();
    const {role} = useParams();
    const {role_sp} = useParams();
    console.log('id_number: ' + storeidNumber);
    console.log(storedUsername);
    console.log(storedSisaCuti );
    console.log(storedFProfile);
    console.log(storeNrk);
    console.log(storedID);
    const [identity_pjSarpras, setIdentity_PJSarpras] = useState([]);
    const [nama_pjSarpras, setNama_PJSarpras] = useState(identity_pjSarpras.nama);
    const [identity, setIdentity] = useState([]);
    const [nama, setNama] = useState("");
    const [jabatan, setJabatan] = useState(identity.jabatan);    
    const [nrk_nip, setNrk_nip] = useState(identity.nrk_nip);
    const [nama_role, setNama_role] = useState(identity.nama_role);
    const [nama_role_c, setNama_role_c] = useState(identity.nama_role_c);
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
    const [jenis, setJenis] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [jam, setJam] = useState("");
    const [durasi, setDurasi] = useState("");
    const [tujuan, setTujuan] = useState("");
    const [keperluan, setKeperluan] = useState("");
    const navigate = useNavigate();
    const handleChangeJenis = (event) => {
      console.log(event.target.value);
      setJenis(event.target.value);
    }
    const handleChangeTujuan = (event) => {
      console.log(event.target.value);
      setTujuan(event.target.value);
    }
    const handleChangeKeperluan = (event) => {
      console.log(event.target.value);
      setKeperluan(event.target.value);
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
    const handleRequest = async (event) => {
      setIsLoading(true);
      event.preventDefault();
      const payload = {
        id_number:storeidNumber,
        jenis:jenis,
        tujuan:tujuan,
        keperluan:keperluan,
        tanggal_pinjam:tanggal,
        jam_pinjam:jam,
        durasi_pinjam:durasi,
        sent_to: nama_pjSarpras
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/new_vehicle.php`, payload, {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          setIsLoading(false);
        navigate(`/dashboard-laras/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}`);
        alert(response.data.message);
        }, 1000);
      } catch (error) {
        console.log(error.response);
        alert("error code 105b");
        setIsLoading(false);
      }
    }
    return(
        <>
            <div className='container-fluid d-flex flex-column p-5 m-2 overflow-auto'>
              {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
              </div>} 
                <p className='content-header-p'>Silaras/Formulir Peminjaman Kendaraan Dinas</p>
                <div className='d-flex justify-content-between align-items-center'>
                  <h1 className='content-header-title mt-0'>Formulir Peminjaman <br className='break' /> Kendaraan Dinas</h1>
                  <Profile nama={storedUsername} f_profile={storedFProfile} feature="silaras" />                
                </div>
                <div className='form-position d-flex flex-column'>
                    <div className='form-display' id='box_vehicle'>
                        <form action="">
                        <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                            <h1 className='form-h1 fw-bold ms-3'>Data Diri Peminjam</h1>
                            <label className='form-label ms-3' htmlFor="">Nama</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' value={nama} disabled placeholder='Nama' type="text"/>
                            <label className='form-label ms-3' htmlFor="">NRK/NIP</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' value={nrk_nip} disabled placeholder='NRK/NIP' type="text"/>
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
                            <label className='form-label ms-3' htmlFor="">Jenis Peminjaman Kendaraan (Pilih Satu)</label>
                            <div className='d-flex flex-row gap-2 ps-3'>
                                <input className='form-check-input' onChange={handleChangeJenis} value={"Roda 2"} type="checkbox" name="" id="" />
                                <label className='form-check-label' htmlFor="">Roda 2</label>
                            </div>
                            <div className='d-flex flex-row gap-2 ps-3'>
                                <input className='form-check-input' onChange={handleChangeJenis} value={"Roda 4"} type="checkbox" name="" id="" />
                                <label className='form-check-label' htmlFor="">Roda 4</label>
                            </div>
                            <div className='d-flex flex-row gap-2 ps-3'>
                                <input className='form-check-input' onChange={handleChangeJenis} value={"Roda 6"} type="checkbox" name="" id="" />
                                <label className='form-check-label' htmlFor="">Roda 6</label>
                            </div>
                            <label className='form-label ms-3' htmlFor="">Tujuan Peminjaman</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' type="text" onChange={handleChangeTujuan} placeholder='Tujuan Peminjaman' />
                            <label className='form-label ms-3' htmlFor="">Keperluan Peminjaman</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' type="text" onChange={handleChangeKeperluan} placeholder='Keperluan Peminjaman' />
                            <label className='form-label ms-3' htmlFor="">Tanggal Peminjaman</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeTanggal} placeholder='Tanggal Peminjaman' type="date"/>
                            <label className='form-label ms-3' htmlFor="">Jam Peminjaman</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeJam} placeholder='Jam Peminjaman' type="time"/>
                            <label className='form-label ms-3' htmlFor="">Durasi Peminjaman (Jam)</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeDurasi} placeholder='Durasi Peminjaman' type="text"/>
                        </div>
                        <button onClick={handleRequest} className='submit' type="submit">Kirim</button>
                        </form>
                    </div>
                </div>
            </div>        
        </>
    )
}
export default Vehicle