import axios from 'axios';
import '../css/form.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker'; // Importing the date picker
import { format } from 'date-fns'; // Importing format function
import "react-datepicker/dist/react-datepicker.css"; // Importing the CSS for the date picker
import Profile from '../profile';

const Cuti_form = () => {
  const [cuti, setShow] = useState(false);
  const [cuti_imp, setCutiImp] = useState(false);
  const [hamil, setHamil] = useState(false);
  const [sakit, setSakit] = useState(false);
  const [selectedStartDates, setSelectedStartDates] = useState(null); // State for start date
  const [selectedEndDates, setSelectedEndDates] = useState(null); // State for end date
  const [isLoading, setIsLoading] = useState(false);
  const storeidNumber = localStorage.getItem('id_number');
  const [identity, setIdentity] = useState([]);
  const [nama, setNama] = useState(identity.nama);
  const [jabatan, setJabatan] = useState(identity.nama);
  const [nrk_nip, setNrk_Nip] = useState(identity.nrk_nip);  
  const [kode_role_c, setKode_role_c] = useState(identity.kode_role_c);
  const { level } = useParams();
  const { role } = useParams();
  const { role_sp } = useParams();
  const getIdentity = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/Admin_API/detail_identity.php?id=${storeidNumber}` , {
          headers: {"Content-Type": "application/json"},
        });
        console.log(response.data);
        setIdentity(response.data);
        setNama(response.data.nama);
        setJabatan(response.data.jabatan);
        setNrk_Nip(response.data.nrk_nip);
        setKode_role_c(response.data.kode_role_c);
      } catch (error) {
        console.log(error);
      }
    }
  const [identityAtasan, setIdentityAtasan] = useState([]);
  const [nama_atasan, setNama_pj] = useState(identityAtasan.nama);
  const [kode_atasan, setKode_atasan] = useState(identityAtasan.kode_role_a);
  console.log("nama Atasan: " + nama_atasan);
  const getIdentityKasubbag = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/getIdentity_Atasan.php?kode_role_a=A-02` , {
          headers: {"Content-Type": "application/json"},
        });
        console.log(response.data);
        setIdentityAtasan(response.data);
        setNama_pj(response.data.nama);
        setKode_atasan(response.data.kode_role_a);
      } catch (error) {
        console.log(error);
      }
  }  
  function Cuti(event) {
    setShow(event.target.checked); // Set show based on checkbox state
  }
  function Cuti_Imp(event) {
    setCutiImp(event.target.checked); // Set show based on checkbox state
  }
  function Hamil(event) {
    setHamil(event.target.checked); // Set show based on checkbox state
  }
  function Sakit(event) {
    setSakit(event.target.checked); // Set show based on checkbox state
  }
  
  const [hp, setHP] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [jenis, setJenis] = useState("");
  const [cuti_b, setCuti_b] = useState("");
  const [alamat, setAlamat] = useState("");  
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleChangeNama = (event) => {
    setNama(event.target.value);
    console.log(event.target.value);
  }
  const handleChangeAlamat = (event) => {
    setAlamat(event.target.value);
    console.log(event.target.value);
  }
  const handleChangeHp = (event) => {
    setHP(event.target.value);
    console.log(event.target.value);
  }
  const handleChangeKeterangan = (event) => {
    setKeterangan(event.target.value);
    console.log(event.target.value);
  }
  const handleChangeJenis = (event) => {
    setJenis(event.target.value);
    console.log(event.target.value);
  }
  const handleChangeCuti = (event) => {
    setCuti_b(event.target.value);
    console.log(event.target.value);
  }
  const handleChangeImage = (event) => {
    setImage(event.target.files[0]);
    console.log(event.target.files[0]);
  }
  const handleChangeCutiDate = (date) => {
    setSelectedStartDates(date[0]); // Update state with selected start date
    setSelectedEndDates(date[1]); // Update state with selected end date
    console.log(date[0]);
    console.log(date[1]);
  };
  
  const handlePostSurat = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    setIsLoading(true);
    const payload = {
      id_number: storeidNumber,
      kode_role_a1: kode_atasan,
      nama_a1: nama_atasan,
      alamat: alamat,
      no_hp: hp,
      keterangan: keterangan,
      jenis_surat: jenis,
      cuti: cuti_b,
      cuti_date: format(selectedStartDates, 'yyyy/MM/dd'), // Send formatted start date
      cuti_date_fin: format(selectedEndDates, 'yyyy/MM/dd'), // Send formatted end date
      gambar: image,
    };
    try {
      const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/new_surat.php`, payload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });      
      console.log(response.data);
      setTimeout(() => {
        setIsLoading(false);
        navigate(`/Dashboard/${level}/${role}/${role_sp}`);
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
    getIdentityKasubbag();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kode_role_c]);
  return (
    <>
      <div className='main-dashboard'>
        {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
            <span style={{position: 'absolute', top : '1500px'}} className="load-cuti"></span>
        </div>} 
        <p>Mawasdiri/Pengajuan Cuti</p>
        <h1>Pengajuan Cuti</h1>
        <Profile nama={nama} feature="mawasdiri" />
        <div className='content-col'>
          <div className='box1'>
            <form onSubmit={handlePostSurat}>
              <div className='content-f'>
                <h1>Data Diri</h1>
                <label htmlFor="">Nama</label>
                <input onChange={handleChangeNama} value={nama} placeholder='Nama' type="text" />
                <label htmlFor="">NRK</label>
                <input value={nrk_nip} placeholder='No. HP' type="text" />                
                <label htmlFor="">No.Handphone</label>
                <input onChange={handleChangeHp} placeholder='No. HP' type="text" />
                <label htmlFor="">Jabatan</label>
                <input value={jabatan} placeholder='No. HP' type="text" />
                {/* <label htmlFor="">ID Number</label>
                <input value={storeidNumber} placeholder='No. HP' type="text" /> */}
                {/* <label htmlFor="">Nama Atasan</label> */}
                <input value={nama_atasan} placeholder='Nama Atasan' type="hidden" />
              </div>
              <div className='content-tx'>
                <h1>Alasan Cuti/Sakit/Izin</h1>
                <textarea onChange={handleChangeKeterangan} placeholder='Alasan Cuti/Sakit/Izin' />
              </div>
              <div className='content-tx'>
                <h1>Alamat Selama Cuti/Sakit/Izin</h1>
                <textarea onChange={handleChangeAlamat} placeholder='Alamat Selama Cuti/Sakit/Izin' />
              </div>
              <div className='content-f'>
                <h1>Jenis Surat</h1>
                <div className='check'>
                  <input type="checkbox" value='Cuti' onChange={(event) => { Cuti(event); handleChangeJenis(event); }} />
                  <label htmlFor="">Cuti Kontrak</label>
                </div>
                {cuti && (
                  <div className='check-form'>
                    <label htmlFor="">Cuti Kontrak (Hari)</label>
                    <input onChange={handleChangeCuti} style={{ marginTop: '10px' }} type="text" />
                    <div className='inp-date'>
                      <label htmlFor="">Dimulai Dari Tanggal</label>
                      <DatePicker
                        selectsRange={true}
                        startDate={selectedStartDates}
                        endDate={selectedEndDates}
                        onChange={handleChangeCutiDate}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Select date range"
                      />
                    </div>
                  </div>
                )}
                <div className='check'>
                  <input type="checkbox" value='Cuti Alasan Penting' onChange={(event) => { Cuti_Imp(event); handleChangeJenis(event); }} />
                  <label htmlFor="">Cuti Alasan Penting</label>
                </div>
                {cuti_imp && (
                  <div className='check-form'>
                    <label htmlFor="">Cuti Alasan Penting (Hari)</label>
                    <input onChange={handleChangeCuti} style={{ marginTop: '10px' }} type="text" />
                    <div className='inp-date'>
                      <label htmlFor="">Dimulai Dari Tanggal</label>
                      <DatePicker
                        selectsRange={true}
                        startDate={selectedStartDates}
                        endDate={selectedEndDates}
                        onChange={handleChangeCutiDate}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Select date range"
                      />
                    </div>
                  </div>
                )}
                <div className='check'>
                  <input type="checkbox" value='Cuti Hamil' onChange={(event) => { Hamil(event); handleChangeJenis(event); }} />
                  <label htmlFor="">Cuti Hamil </label>
                </div>
                {hamil && (
                  <div className='check-form'>
                    <label htmlFor="">Cuti Hamil (Hari)</label>
                    <input onChange={handleChangeCuti} style={{ marginTop: '10px' }} type="text" />
                    <div className='inp-date'>
                      <label htmlFor="">Dimulai Dari Tanggal</label>
                      <DatePicker
                        selectsRange={true}
                        startDate={selectedStartDates}
                        endDate={selectedEndDates}
                        onChange={handleChangeCutiDate}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Select date range"
                      />
                    </div>
                  </div>
                )}
                <div className='check'>
                  <input type="checkbox" value='Sakit' onChange={(event) => { Sakit(event); handleChangeJenis(event); }} />
                  <label htmlFor="">Sakit</label>
                </div>
                {sakit && (
                  <div className='check-form'>
                    <label htmlFor="">Sakit(Hari)</label>
                    <input onChange={handleChangeCuti} style={{ marginTop: '10px' }} type="text" />
                    <div className='inp-date'>
                      <label htmlFor="">Dimulai Dari Tanggal</label>
                      <DatePicker
                        selectsRange={true}
                        startDate={selectedStartDates}
                        endDate={selectedEndDates}
                        onChange={handleChangeCutiDate}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Select date range"
                      />
                    </div>
                    <label htmlFor="">Upload Bukti Gambar</label>
                    <input type="file" onChange={handleChangeImage} name="" id="" />
                  </div>
                )}
              </div>
              <button className='submit' type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cuti_form;