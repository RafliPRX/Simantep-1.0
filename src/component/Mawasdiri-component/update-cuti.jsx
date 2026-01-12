import { useNavigate, useParams } from 'react-router-dom';
import './cuti.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Profile from '../profile';
const Cuti_form_Update = () => {
    const storedUsername = localStorage.getItem('nama');
    const storedFProfile = localStorage.getItem('f_profile');
    const [isLoading, setIsLoading] = useState(false);
    console.log(storedFProfile);
    const [cuti, setShow] = useState(false); // Changed to boolean for clarity
      
    function Cuti(event) {
        setShow(event.target.checked); // Set show based on checkbox state
    }
    const [show_imp, setShow1] = useState(false); // Changed to boolean for clarity

    function Cuti_alasan_penting(event) {
        setShow1(event.target.checked); // Set show based on checkbox state
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
      setIsLoading(true);
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
          setIsLoading(false);
          navigate("/Dashboard");
        }, 1000);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response);
      }
    }  
    return(
        <>
            <div className='main-dashboard'>
                {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                    <span style={{position: 'absolute', top : '1500px'}} className="load-cuti"></span>
                </div>}   
                <p>Mawasdiri/Pengajuan Cuti</p>
                <h1>Pengajuan Cuti</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="mawasdiri" />
                <div className='content-col'>
                    <div className='box1'>
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