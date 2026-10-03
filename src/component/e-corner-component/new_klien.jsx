import axios from 'axios';
import '../css/form.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css"; // Importing the CSS for the date picker
import Profile from '../profile';

const New_Klien_form = () => {   
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
  const [nama_init, setNamaInit] = useState("");
  // const handleChangeNamaKlien = (event) => {
  //   setNamaKlien(event.target.value);
  //   console.log(event.target.value);    
  // }
  const handleChangeNamaKlien = (event) => {
        setNamaKlien(event.target.value);
        const selectedIdentityData = allKlien.find((identitas) => identitas.nama_klien === event.target.value);
        if (selectedIdentityData) {
          setNamaInit(selectedIdentityData.inisial_klien);
        }
    }
  const [allKlien, setAllIdentity_lv1] = useState([]);
    const getKlien = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/E-corner/get_allKlien.php`;
        let url = baseUrl;
        axios.get(url).then((res2) => {
            console.log(res2.data.Data);
            const response = res2.data.Data;
            setAllIdentity_lv1(response);
            console.log(response);
        })        
        .catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        getKlien();
    },[]);
  const [room, setRoom] = useState("");
  const handleChangeRoom = (event) => {
    setRoom(event.target.value);
    console.log(event.target.value);
  }
  const [jam, setJam] = useState("");
  const handleChangeJam = (event) => {
    setJam(event.target.value);
    console.log(event.target.value);    
  }
  const [day, setDay] = useState("");
  const handleChangeDay = (event) => {
    setDay(event.target.value);
    console.log(event.target.value);    
  }
  const [week, setWeek] = useState("");
  const handleChangeWeek = (event) => {
    setWeek(event.target.value);
    console.log(event.target.value);    
  }
  const [month, setMonth] = useState("");
  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
    console.log(event.target.value);
  }
  const [klien_rooms, setKlien_Rooms] = useState([]);

  const handleGetKlienRooms = async () => {
    setIsLoading(true)
    const baseUrl = `https://simantepbareta.cloud/API/E-corner/rooms_search.php?id_bulan=${month}&id_minggu=${week}&days=${day}&time=${jam}`;
    let url = baseUrl;
    axios.get(url).then((res1) => {
        console.log(res1.data.Data);
        const response = res1.data.Data;
        setIsLoading(false);
        setKlien_Rooms(response);
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
  }
  const navigate = useNavigate();
  const handlePostClient = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    setIsLoading(true);
    const payload = {
      nama_klien: nama_klien,
      nama_init: nama_init,
      rooms: room,
      time: jam,
      days: day,
      id_minggu: week,
      id_bulan: month      
    };
    try {
      const response = await axios.post(`https://simantepbareta.cloud/API/E-corner/new_Klien.php`, payload, {
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
        <p className='content-header-p'>E-Corner/Menambah Jadwal Klien E-Corner</p>
        <div className='d-flex justify-content-between align-items-center'>
          <h1 className='content-header-title mt-0'>Menambah Jadwal Klien E-Corner</h1>
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
                <select className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeNamaKlien} name="nama_klien" id="nama_klien">
                  <option value="">Nama Klien :</option>
                  {allKlien.map((identitas) => (
                    <option key={identitas.id_klien} value={identitas.nama_klien}>
                      {identitas.nama_klien}
                    </option>
                  ))}
                </select>          
                <label className='form-label ms-3' htmlFor="">Nama Klien (Inisial)</label>
                <input className='form-input ms-3 mb-4 ps-2 rounded-3' value={nama_init} placeholder='Nama Inisial' type="text" />
                <label className='form-label ms-3' htmlFor="bulan">Bulan :</label>
                <select className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeMonth} name="bulan" id="bulan">
                  <option value="">bulan :</option>
                  <option value="1">Januari</option>
                  <option value="2">Februari</option>
                  <option value="3">Maret</option>
                  <option value="4">April</option>
                  <option value="5">Mei</option>
                  <option value="6">Juni</option>
                  <option value="7">Juli</option>
                  <option value="8">Agustus</option>
                  <option value="9">September</option>
                  <option value="10">Oktober</option>
                  <option value="11">November</option>
                  <option value="12">Desember</option>
                </select>
                <label className='form-label ms-3' htmlFor="minggu">Minggu ke :</label>
                <select className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeWeek} name="minggu" id="minggu">
                  <option value="">Minggu ke :</option>
                  <option value="1">Minggu ke 1</option>
                  <option value="2">Minggu ke 2</option>
                  <option value="3">Minggu ke 3</option>
                  <option value="4">Minggu ke 4</option>
                  <option value="5">Minggu ke 5</option>
                </select>
                <label className='form-label ms-3' htmlFor="days">Hari :</label>
                <select className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeDay} name="days" id="days">
                  <option value="">Hari :</option>
                  <option value="Senin">Senin</option>
                  <option value="Selasa">Selasa</option>
                  <option value="Rabu">Rabu</option>
                  <option value="Kamis">Kamis</option>
                  <option value="Jumat">Jumat</option>
                </select>
                <label className='form-label ms-3' htmlFor="Jam">Sesi Jam :</label>
                <select className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeJam} name="Jam" id="Jam">
                  <option value="">Sesi Jam :</option>
                  <option value="08.00-08.30">08.00-08.30</option>
                  <option value="08.35-09.05">08.35-09.05</option>
                  <option value="09.10-09.40">09.10-09.40</option>
                  <option value="09.45-10.15">09.45-10.15</option>
                  <option value="10.20-10.50">10.20-10.50</option>
                  <option value="10.55-11.25">10.55-11.25</option>
                  <option value="11.30-12.05">11.30-12.05</option>
                  <option value="13.00-13.30">13.00-13.30</option>
                  <option value="13.35-14.05">13.35-14.05</option>
                  <option value="14.10-14.40">14.10-14.40</option>
                  <option value="14.45-15.15">14.45-15.15</option>
                  <option value="15.20-15.50">15.20-15.50</option>
                </select>
                <div className='d-flex flex-column align-items-center w-100'>
                  <button className='submit-room' type="button" onClick={() => handleGetKlienRooms()}>Cari Ruangan</button>                
                </div>
                  {klien_rooms.length > 0 ? (
                    <div>
                      <label className='form-label ms-3' htmlFor="">Room no :</label>
                      <select className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeRoom} name="Room" id="Room">
                        <option value="">Room no :</option>
                        {klien_rooms[0]?.rooms === "Room 1" ? (
                          <option value="Room 1" disabled>Room 1 tidak Tersedia</option>
                        ) : (
                          <option value="Room 1">Room 1</option>
                        )}
                        {klien_rooms[1]?.rooms === "Room 2" ? (
                          <option value="Room 2" disabled>Room 2 tidak Tersedia</option>
                        ) : (
                          <option value="Room 2">Room 2</option>
                        )}
                        {klien_rooms[2]?.rooms === "Room 3" ? (
                          <option value="Room 3" disabled>Room 3 tidak Tersedia</option>
                        ) : (
                          <option value="Room 3">Room 3</option>
                        )}
                        {klien_rooms[3]?.rooms === "Room 4" ? (
                          <option value="Room 4" disabled>Room 4 tidak Tersedia</option>
                        ) : (
                          <option value="Room 4">Room 4</option>
                        )}
                      </select>
                      <div className='d-flex flex-column align-items-center w-100'>
                        <button className='submit' type="submit">Submit Klien</button>                        
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className='form-label ms-3' htmlFor="">Room no :</label>
                      <select className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeRoom} name="Room" id="Room">
                        <option value="">Room no :</option>                      
                          <option value="Room 1">Room 1</option>                      
                          <option value="Room 2">Room 2</option>
                          <option value="Room 3">Room 3</option>
                          <option value="Room 4">Room 4</option>
                      </select>
                      <div className='d-flex flex-column align-items-center w-100'>
                        <button className='submit' type="submit">Submit Klien</button>                    
                      </div>
                    </div>
                  )}                  
              </div>              
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default New_Klien_form;