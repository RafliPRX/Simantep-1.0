import axios from 'axios';
import './cuti.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'; // Importing the date picker
import { format } from 'date-fns'; // Importing format function
import "react-datepicker/dist/react-datepicker.css"; // Importing the CSS for the date picker

const Cuti_form = () => {
  const [cuti, setShow] = useState(false);
  const [cuti_imp, setCutiImp] = useState(false);
  const [izin, setIzin] = useState(false);
  const [hamil, setHamil] = useState(false);
  const [sakit, setSakit] = useState(false);
  const [selectedStartDates, setSelectedStartDates] = useState(null); // State for start date
  const [selectedEndDates, setSelectedEndDates] = useState(null); // State for end date

  function Cuti(event) {
    setShow(event.target.checked); // Set show based on checkbox state
  }
  function Cuti_Imp(event) {
    setCutiImp(event.target.checked); // Set show based on checkbox state
  }
  function Izin(event) {
    setIzin(event.target.checked); // Set show based on checkbox state
  }
  function Hamil(event) {
    setHamil(event.target.checked); // Set show based on checkbox state
  }
  function Sakit(event) {
    setSakit(event.target.checked); // Set show based on checkbox state
  }

  const storedUsername = localStorage.getItem('nama');
  const storeNrk = localStorage.getItem('nrk');
  const [nama, setNama] = useState(storedUsername);
  const [nrk, setNrk] = useState(storeNrk);
  const [hp, setHP] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [jenis, setJenis] = useState("");
  const [cuti_b, setCuti_b] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleChangeNama = (event) => {
    setNama(event.target.value);
    console.log(event.target.value);
  }
  const handleChangeJabatan = (event) => {
    setJabatan(event.target.value);
    console.log(event.target.value);
  }
  const handleChangeNRK = (event) => {
    setNrk(event.target.value);
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
    event.preventDefault();
    const payload = {
      nama: nama,
      nrk: nrk,
      alamat: alamat,
      no_hp: hp,
      jabatan: jabatan,
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
        navigate("/Dashboard");
        alert(response.data.message);
      }, 1000);
    } catch (error) {
      console.log(error.response);
      alert("error code 103");
    }
  }

  return (
    <>
      <div className='main-dashboard'>
        <p>Mawasdiri/Pengajuan Cuti</p>
        <h1>Pengajuan Cuti</h1>
        <div className='profile'>
          <input placeholder='Search' type="text" />
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g clipPath="url(#clip0_5_1232)">
              <path d="M19.29 17.29L18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.62999 5.36 5.99999 7.92 5.99999 11V16L4.70999 17.29C4.07999 17.92 4.51999 19 5.40999 19H18.58C19.48 19 19.92 17.92 19.29 17.29ZM16 17H7.99999V11C7.99999 8.52 9.50999 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17ZM12 22C13.1 22 14 21.1 14 20H9.99999C9.99999 21.1 10.89 22 12 22Z" fill="white"/>
            </g>
            <defs>
              <clipPath id="clip0_5_1232">
                <rect width="24" height="24" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 18 18" fill="none">
            <g clipPath="url(#clip0_5_1230)">
              <path d="M9.95691 18C12.7329 18 15.2683 16.737 16.948 14.6675C17.1965 14.3613 16.9255 13.9141 16.5415 13.9872C12.175 14.8188 8.1651 11.4709 8.1651 7.06303C8.1651 4.52398 9.52431 2.18914 11.7334 0.931992C12.0739 0.738211 11.9883 0.221941 11.6013 0.150469C11.0589 0.0504468 10.5085 8.21369e-05 9.95691 0C4.98902 0 0.956909 4.02578 0.956909 9C0.956909 13.9679 4.98269 18 9.95691 18Z" fill="white"/>
            </g>
            <defs>
              <clipPath id="clip0_5_1230">
                <rect width="18" height="18" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <div className='pic'></div>
        </div>
        <div className='content-col'>
          <div className='box1'>
            <form onSubmit={handlePostSurat}>
              <div className='content-f'>
                <h1>Data Diri</h1>
                <label htmlFor="">Nama</label>
                <input onChange={handleChangeNama} value={storedUsername} placeholder='Nama' type="text" />
                <label htmlFor="">NIP/NRK</label>
                <input onChange={handleChangeNRK} value={storeNrk} placeholder='NRK' type="text" />
                <label htmlFor="">No.Handphone</label>
                <input onChange={handleChangeHp} placeholder='No. HP' type="text" />
                <label htmlFor="">Jabatan</label>
                <input onChange={handleChangeJabatan} placeholder='Jabatan' type="text" />
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
                    <label htmlFor="">Cuti Kontrak</label>
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
                    <label htmlFor="">Cuti Alasan Penting</label>
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
                  <input type="checkbox" value='Izin' onChange={(event) => { Izin(event); handleChangeJenis(event); }} />
                  <label htmlFor="">Izin</label>
                </div>
                {izin && (
                  <div className='check-form'>
                    <label htmlFor="">Izin</label>
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
                  <label htmlFor="">Cuti Hamil</label>
                </div>
                {hamil && (
                  <div className='check-form'>
                    <label htmlFor="">Cuti Hamil</label>
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
                    <label htmlFor="">Sakit</label>
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
