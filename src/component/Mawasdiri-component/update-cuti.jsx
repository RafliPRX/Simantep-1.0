import { useNavigate, useParams } from 'react-router-dom';
import '../css/form.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Profile from '../profile';
import DatePicker from 'react-datepicker';
import { format } from 'ol/coordinate';
const Cuti_form_Update = () => {
    const storedUsername = localStorage.getItem('nama');
    const storedFProfile = localStorage.getItem('f_profile');
    const [isLoading, setIsLoading] = useState(false);
    const { role } = useParams();
    const { level } =useParams();
    const { role_sp } = useParams();
    const { nrk_nip } = useParams();  
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
    const [nama, setNama] = useState(detail.nama);
    const [nrk, setNrk]  =useState(detail.nrk_nip);
    const [hp,setHP] = useState(detail.no_hp);
    const [keterangan, setKeterangan] = useState(detail.Keterangan);
    const [jenis, setJenis] = useState(detail.jenis_surat);
    const [cuti_b, setCuti_b] = useState(detail.cuti);
    const [alamat, setAlamat] = useState(detail.alamat);
    const [jabatan, setJabatan] = useState(detail.jabatan);
    const [selectedStartDates, setSelectedStartDates] = useState(detail.cuti_date); // State for start date
    const [selectedEndDates, setSelectedEndDates] = useState(detail.cuti_date_fin); // State for end date
    
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
    const handleChangeCutiDate = (date) => {
      setSelectedStartDates(date[0]); // Update state with selected start date
      setSelectedEndDates(date[1]); // Update state with selected end date
      console.log(date[0]);
      console.log(date[1]);
    }
    const getDetail = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/detail_surat.php?id=${param.id}`, {
                headers: {}
            });
            console.log(response.data);
            setDetail(response.data);
            setNama(response.data.nama);
            setNrk(response.data.nrk_nip);
            setAlamat(response.data.alamat);
            setHP(response.data.no_hp);
            setJabatan(response.data.jabatan);
            setKeterangan(response.data.Keterangan);
            setJenis(response.data.jenis_surat);
            setCuti_b(response.data.cuti);
            setSelectedStartDates(response.data.cuti_date);
            setSelectedEndDates(response.data.cuti_date_fin);
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
        cuti_date: format(selectedStartDates, 'yyyy/MM/dd'),
        cuti_date_fin: format(selectedEndDates, 'yyyy/MM/dd'),
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
          navigate(`/Dashboard/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}`);
          alert(response.data.message);
        }, 1000);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response);
      }
    }  
    return(
        <>
            <div className='container-fluid d-flex flex-column p-5 m-2 overflow-auto'>
                {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                    <span style={{position: 'absolute', top : '1500px'}} className="load-cuti"></span>
                </div>}   
                <p className='content-header-p'>Mawasdiri/Pengajuan Cuti</p>
                <div className='d-flex justify-content-between align-items-center'>
                  <h1 className='content-header-title mt-0'>Mengubah Pengajuan Cuti</h1>
                  <Profile nama={storedUsername} f_profile={storedFProfile} feature="mawasdiri" />                
                </div>
                <div className='form-position d-flex flex-column'>
                    <div className='form-display'>
                        <form action="">
                        <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                            <h1 className='form-h1 fw-bold ms-3'>Data Diri</h1>
                            <label className='form-label ms-3' htmlFor="">Nama</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeNama} disabled value={nama} type="text"/>
                            <label className='form-label ms-3' htmlFor="">NIP/NRK</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeNRK} disabled value={nrk} type="text"/>                                
                            <label className='form-label ms-3' htmlFor="">Jabatan</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeJabatan} disabled value={jabatan} type="text"/>
                            <label className='form-label ms-3' htmlFor="">No.Handphone</label>
                            <input className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChnageHp} value={hp} type="text"/>
                        </div>
                        <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                            <h1 className='form-h1 fw-bold ms-3'>Alasan Cuti/Sakit/Izin</h1>
                            <textarea className='form-textarea ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeKeterangan} value={keterangan} name="" id=""></textarea>
                        </div>
                        <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                            <h1 className='form-h1 fw-bold ms-3'>Alamat Selama Cuti/Sakit/Izin</h1>
                            <textarea className='form-textarea ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeAlamat} value={alamat} name="" id=""></textarea>
                        </div>
                        <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                            <h1 className='form-h1 fw-bold ms-3'>Jenis Surat</h1>
                            <div className='d-flex flex-row align-items-center gap-2 ps-3'>
                                <input className='form-check-input' type="checkbox" name="" id="" value="Cuti" checked={jenis==="Cuti"} onChange={(event) => {
                                    Cuti(event);
                                    handleChangeJenis(event)
                                }}/>                               
                                <label className='form-check-label' htmlFor="">Cuti Tahunan</label>                                
                            </div>
                            {cuti && ( // Conditionally render based on show state
                                    <div className='d-flex flex-column'>
                                      <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                        <label className='label-check ps-4' htmlFor="">Cuti Tahunan (Hari)</label>
                                        <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeCuti} value={cuti_b} style={{marginTop: '10px'}} type="text" name="" id="" />                                        
                                      </div>
                                      <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                        <label className='label-check ps-4' htmlFor="">Dimulai Dari Tanggal</label>
                                        <DatePicker
                                          className='form-input-in-check ms-4 rounded-3 ps-3'
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
                            <div className='cuti-alasan-penting gap-2 ps-3'>
                                <input className='form-check-input' type="checkbox" value="Cuti Alasan Penting" checked={jenis==="Cuti Alasan Penting"} name="" id="" onClick={(event) => {
                                    Cuti_alasan_penting(event);
                                    handleChangeJenis(event);
                                    }}/>
                                <label className='form-check-label' htmlFor="">Cuti Alasan Penting</label>                                
                            </div>
                            {(show_imp || jenis=== "Cuti Alasan Penting") && ( // Conditionally render based on show state
                                    <div className='d-flex flex-column'>
                                      <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                        <label className='label-check ps-4' htmlFor="">Cuti Alasan Penting</label>
                                        <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeCuti} value={cuti_b} style={{marginTop: '10px'}} type="text" name="" id="" />
                                      </div>
                                      <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                        <label className='label-check ps-4' htmlFor="">Dimulai Dari Tanggal</label>
                                        <DatePicker
                                          className='form-input-in-check ms-4 rounded-3 ps-3'
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
                            <div className='d-flex flex-row align-items-center gap-2 ps-3'>
                                <input className='form-check-input' type="checkbox" value="Cuti Hamil" name="" id="" onClick={(event)=> {
                                    Hamil(event);
                                    handleChangeJenis(event);
                                    }}/>
                                <label className='form-check-label' htmlFor="">Cuti Hamil</label>                                
                            </div>
                            {hamil && ( // Conditionally render based on show state
                                  <div className='d-flex flex-column'>
                                      <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                        <label className='label-check ps-4' htmlFor="">Cuti Hamil (Hari):</label>
                                        <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeCuti} value={cuti_b} style={{marginTop: '10px'}} type="text" name="" id="" />
                                      </div>
                                      <div>
                                        <label className='label-check ps-4' htmlFor="">Dimulai Dari Tanggal</label>
                                        <DatePicker
                                          className='form-input-in-check ms-4 rounded-3 ps-3'
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
                            <div className='d-flex flex-row align-items-center gap-2 ps-3'>
                                <input className='form-check-input' type="checkbox" value="Sakit" name="" id="" onClick={(event) => {
                                    Sakit(event);
                                    handleChangeJenis(event);
                                }}/>
                                <label className='form-check-label' htmlFor="">Cuti Sakit</label>                               
                            </div>
                            {sakit && ( // Conditionally render based on show state
                                  <div className='d-flex flex-column'>
                                      <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                        <label className='form-check-label' htmlFor="">Sakit</label>
                                        <input onChange={handleChangeCuti} value={cuti_b} style={{marginTop: '10px'}} type="text" name="" id="" />
                                      </div>
                                      <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                        <label className='form-check-label' htmlFor="">Dimulai Dari Tanggal</label>
                                        <DatePicker
                                            className='form-input-in-check ms-4 rounded-3 ps-3'
                                            selectsRange={true}
                                            startDate={selectedStartDates}
                                            endDate={selectedEndDates}
                                            onChange={handleChangeCutiDate}
                                            dateFormat="yyyy/MM/dd"
                                            placeholderText="Select date range"
                                        />
                                      </div>
                                      <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                                        <label className='form-check-label' htmlFor="">Bukti Surat Sakit</label>
                                        <input placeholder={detail.gambar} style={{marginTop: '10px', paddingTop: '10px'}} type="File" name="" id="" />                                  
                                      </div>
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