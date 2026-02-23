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
    const [jenis, setJenis] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [jam, setJam] = useState("");
    const [durasi, setDurasi] = useState("");
    const [tujuan, setTujuan] = useState("");
    const [keperluan, setKeperluan] = useState("");
    const navigate = useNavigate();
    const handleChangeUnits = (event) => {
      console.log(event.target.value);
      setUnits(event.target.value);
    }
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
        unit:unit,
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
        navigate(`/dashboard-laras/${level}/${role}/${role_sp}`);
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
            <div className='main-dashboard'>
              {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
              </div>} 
                <p>Silaras/Formulir Peminjaman Kendaraan Dinas</p>
                <h1>Formulir Peminjaman <br className='break' /> Kendaraan Dinas</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="silaras" />                 
                <div className='content-col'>
                    <div className='box1' id='box_vehicle'>
                        <form action="">
                        <div className='content-f'>
                            <h1>Data Diri Peminjam</h1>
                            <label htmlFor="">Nama</label>
                            <input value={nama} placeholder='Nama' type="text"/>
                            <label htmlFor="">NRK/NIP</label>
                            <input value={nrk_nip} placeholder='Nama' type="text"/>
                            <label htmlFor="">Jabatan</label>
                            <input value={jabatan} placeholder='Nama' type="text"/>
                            <label htmlFor="">Unit Kerja</label>
                            <input onChange={handleChangeUnits} placeholder='Unit Kerja' type="text"/>
                            <label htmlFor="">Jenis Peminjaman Kendaraan (Pilih Satu)</label>
                            <div className='check'>
                                <input onChange={handleChangeJenis} value={"Roda 2"} type="checkbox" name="" id="" />
                                <label htmlFor="">Roda 2</label>
                            </div>
                            <div className='check'>
                                <input onChange={handleChangeJenis} value={"Roda 4"} type="checkbox" name="" id="" />
                                <label htmlFor="">Roda 4</label>
                            </div>
                            <div className='check'>
                                <input onChange={handleChangeJenis} value={"Roda 6"} type="checkbox" name="" id="" />
                                <label htmlFor="">Roda 6</label>
                            </div>
                            <label htmlFor="">Tujuan Peminjaman</label>
                            <input type="text" onChange={handleChangeTujuan} placeholder='Tujuan Peminjaman' />
                            <label htmlFor="">Keperluan Peminjaman</label>
                            <input type="text" onChange={handleChangeKeperluan} placeholder='Keperluan Peminjaman' />
                            <label htmlFor="">Tanggal Peminjaman</label>
                            <input onChange={handleChangeTanggal} placeholder='Tanggal Peminjaman' type="date"/>
                            <label htmlFor="">Jam Peminjaman</label>
                            <input onChange={handleChangeJam} placeholder='Jam Peminjaman' type="time"/>
                            <label htmlFor="">Durasi Peminjaman (Jam)</label>
                            <input onChange={handleChangeDurasi} placeholder='Durasi Peminjaman' type="text"/>
                        </div>
                        <button onClick={handleRequest} className='submit' type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>        
        </>
    )
}
export default Vehicle