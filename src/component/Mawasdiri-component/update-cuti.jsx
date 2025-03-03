import { useNavigate, useParams } from 'react-router-dom';
import './cuti.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Cuti_form_Update = () => {
    const [cuti, setShow] = useState(false); // Changed to boolean for clarity
      
    function Cuti(event) {
        setShow(event.target.checked); // Set show based on checkbox state
    }
    const [show_imp, setShow1] = useState(false); // Changed to boolean for clarity

    function Cuti_alasan_penting(event) {
        setShow1(event.target.checked); // Set show based on checkbox state
    }

    const [izin, setShow2] = useState(false); // Changed to boolean for clarity

    function Izin(event) {
        setShow2(event.target.checked); // Set show based on checkbox state
    }

    const [hamil, setHamil] = useState(false); // Changed to boolean for clarity

    function Hamil(event) {
      setHamil(event.target.checked); // Set show based on checkbox state
    }

    const [sakit, setSakit] = useState(false); // Changed to boolean for clarity

    function Sakit(event) {
      setSakit(event.target.checked); // Set show based on checkbox state
    }
    const [detail, setDetail] = useState({});
    const param = useParams();
    const [nama, setNama] = useState("");
    const [nrk, setNrk]  =useState("");
    const [hp,setHP] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [jenis, setJenis] = useState("");
    const [cuti_b, setCuti_b] = useState("");
    const [cuti_d, setCuti_d] = useState("");
    const [cuti_df, setCuti_df] = useState("");
    const [alamat, setAlamat] = useState("");
    const [jabatan, setJabatan] = useState("");
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
    const handleChnageHp = (event) => {
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
    const handleChangeCutiDate = (event) => {
      setCuti_d(event.target.value);
      console.log(event.target.value);
    }
    const handleChangeCutiDateFin = (event) => {
      setCuti_df(event.target.value);
      console.log(event.target.value);
    }
    const getDetail = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/detail_surat.php?id=${param.id}`, {
                headers: {}
            });
            console.log(response.data);
            setDetail(response.data);            
        } catch (error) {
            console.log(error.response);
        }
    }
    useEffect(() => {
        getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleUpdateSurat = async (event) => {
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
          cuti_date: cuti_d,
          cuti_date_fin: cuti_df,
        };
        try {
          const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/update_surat.php?id=${param.id}`, payload, {
            headers: {
              "Content-Type" : "multipart/form-data"
            }
          })
          console.log(response.data);
          setTimeout(() => {
            navigate("/Dashboard");
          }, 1000);
        } catch (error) {
          console.log(error.response);
        }
      }  
    return(
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
                    <div className='box'>
                        <form action="">
                        <div className='content-f'>
                            <h1>Data Diri</h1>
                                <label htmlFor="">Nama</label>
                                <input onChange={handleChangeNama} placeholder={detail.nama} type="text"/>
                                <label htmlFor="">NIP/NRK</label>
                                <input onChange={handleChangeNRK} placeholder={detail.nrk} type="text"/>
                                <label htmlFor="">No.Handphone</label>
                                <input onChange={handleChnageHp} placeholder={detail.no_hp} type="text"/>
                                <label htmlFor="">Jabatan</label>
                                <input onChange={handleChangeJabatan} placeholder={detail.jabatan} type="text"/>
                        </div>
                        <div className='content-tx'>
                            <h1>Alasan Cuti/Sakit/Izin</h1>
                            <textarea onChange={handleChangeKeterangan} placeholder={detail.keterangan} name="" id=""></textarea>
                        </div>
                        <div className='content-tx'>
                            <h1>Alamat Selama Cuti/Sakit/Izin</h1>
                            <textarea onChange={handleChangeAlamat} placeholder={detail.alamat} name="" id=""></textarea>
                        </div>
                        <div className='content-f'>
                            <h1>Jenis Surat</h1>
                            <div className='check'>
                                <input type="checkbox" name="" id="" value="Cuti" onChange={(event) => {
                                    Cuti(event);
                                    handleChangeJenis(event)
                                }}/>
                                <label htmlFor="">Cuti Kontrak</label>
                                <label style={{display: detail.jenis_surat === "Cuti" ? "flex" : "none", width: 'auto'}} htmlFor="">anda sebelumnya memilih cuti kontrak</label>
                            </div>
                            {cuti && ( // Conditionally render based on show state
                                    <div className='check-form'>
                                        <label htmlFor="">Cuti Kontrak</label>
                                        <input onChange={handleChangeCuti} placeholder={detail.cuti} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Dimulai Dari Tanggal</label>
                                        <div className='inp-date'>
                                          <input onChange={handleChangeCutiDate} placeholder={detail.cuti_date} style={{marginTop: '10px'}} type="date" name="" id="" />
                                          <label className='text' htmlFor="">s.d</label>
                                          <input onChange={handleChangeCutiDateFin} placeholder={detail.cuti_date_fin} style={{marginTop: '10px'}} type="date" name="" id="" />
                                        </div>
                                    </div>
                                )}
                            <div className='check'>
                                <input type="checkbox" value="Cuti Alasan Penting" name="" id="" onClick={(event) => {
                                    Cuti_alasan_penting(event);
                                    handleChangeJenis(event);
                                    }}/>
                                <label htmlFor="">Cuti Alasan Penting</label>
                                <label style={{display: detail.jenis_surat === "Cuti Alasan Penting" ? "flex" : "none", width: 'auto', marginLeft: '85px'}} htmlFor="">Anda Sebelumnya Memilih Cuti Alasan Penting</label>
                            </div>
                            {show_imp && ( // Conditionally render based on show state
                                    <div className='check-form'>
                                        <label htmlFor="">Cuti Alasan Penting</label>
                                        <input onChange={handleChangeCuti} placeholder={detail.cuti} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Dimulai Dari Tanggal</label>
                                        <div className='inp-date'>
                                          <input onChange={handleChangeCutiDate} placeholder={detail.cuti_date} style={{marginTop: '10px'}} type="date" name="" id="" />
                                          <label className='text' htmlFor="">s.d</label>
                                          <input onChange={handleChangeCutiDateFin} placeholder={detail.cuti_date_fin} style={{marginTop: '10px'}} type="date" name="" id="" />
                                        </div>
                                    </div>
                                )}
                            <div className='check'>
                                <input type="checkbox" value="Izin" name="" id="" onClick={(event) => {
                                    Izin(event);
                                    handleChangeJenis(event);
                                    }}/>
                                <label htmlFor="">Izin</label>
                                <label style={{display: detail.jenis_surat === "Izin" ? "flex" : "none", width: 'auto'}} htmlFor="">Anda Sebelumnya Memilih Izin</label>
                            </div>
                            {izin && ( // Conditionally render based on show state
                                    <div className='check-form'>
                                        <label htmlFor="">Izin</label>
                                        <input onChange={handleChangeCuti} placeholder={detail.cuti} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Dimulai Dari Tanggal</label>
                                        <div className='inp-date'>
                                          <input onChange={handleChangeCutiDate} placeholder={detail.cuti_date} style={{marginTop: '10px'}} type="date" name="" id="" />
                                          <label className='text' htmlFor="">s.d</label>
                                          <input onChange={handleChangeCutiDateFin} placeholder={detail.cuti_date_fin} style={{marginTop: '10px'}} type="date" name="" id="" />
                                        </div>
                                    </div>
                                )}
                            <div className='check'>
                                <input type="checkbox" value="Cuti Hamil" name="" id="" onClick={(event)=> {
                                    Hamil(event);
                                    handleChangeJenis(event);
                                    }}/>
                                <label htmlFor="">Cuti Hamil</label>
                                <label style={{display: detail.jenis_surat === "Cuti Hamil" ? "flex" : "none", width: 'auto'}} htmlFor="">Anda Sebelumnya Memilih Cuti Hamil</label>
                            </div>
                            {hamil && ( // Conditionally render based on show state
                                    <div className='check-form'>
                                        <label htmlFor="">Hamil</label>
                                        <input onChange={handleChangeCuti} placeholder={detail.cuti} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Dimulai Dari Tanggal</label>
                                        <div className='inp-date'>
                                          <input onChange={handleChangeCutiDate} placeholder={detail.cuti_date} style={{marginTop: '10px'}} type="date" name="" id="" />
                                          <label className='text' htmlFor="">s.d</label>
                                          <input onChange={handleChangeCutiDateFin} placeholder={detail.cuti_date_fin} style={{marginTop: '10px'}} type="date" name="" id="" />
                                        </div>
                                    </div>
                                )}
                            <div className='check'>
                                <input type="checkbox" value="Sakit" name="" id="" onClick={(event) => {
                                    Sakit(event);
                                    handleChangeJenis(event);
                                }}/>
                                <label htmlFor="">Cuti Sakit</label>
                                <label style={{display: detail.jenis_surat === "Sakit" ? "flex" : "none", width: 'auto'}} htmlFor="">Anda Sebelumnya Memilih Sakit</label>
                            </div>
                            {sakit && ( // Conditionally render based on show state
                                  <div className='check-form'>
                                      <label htmlFor="">Sakit</label>
                                      <input onChange={handleChangeCuti} placeholder={detail.cuti} style={{marginTop: '10px'}} type="text" name="" id="" />
                                      <label htmlFor="">Dimulai Dari Tanggal</label>
                                      <div className='inp-date'>
                                        <input onChange={handleChangeCutiDate} placeholder={detail.cuti_date} style={{marginTop: '10px'}} type="date" name="" id="" />
                                        <label className='text' htmlFor="">s.d</label>
                                        <input onChange={handleChangeCutiDateFin} placeholder={detail.cuti_date_fin} style={{marginTop: '10px'}} type="date" name="" id="" />
                                      </div>
                                      <label htmlFor="">Bukti Surat Sakit</label>
                                      <input placeholder={detail.gambar} style={{marginTop: '10px', paddingTop: '10px'}} type="File" name="" id="" />
                                  </div>
                                )}
                        </div>
                        <button className='submit' onClick={handleUpdateSurat} type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>        
        </>
    )
}
export default Cuti_form_Update