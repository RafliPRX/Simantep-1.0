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
  const [cuti_besar, setCutiBesar] = useState(false);
  const [cuti_minus_negara, setCutiMinusNegara] = useState(false);
  const [hamil, setHamil] = useState(false);
  const [sakit, setSakit] = useState(false);
  const [selectedStartDates, setSelectedStartDates] = useState(null); // State for start date
  const [selectedEndDates, setSelectedEndDates] = useState(null); // State for end date
  const [isLoading, setIsLoading] = useState(false);
  const storeidNumber = localStorage.getItem('id_number');
  const [identity, setIdentity] = useState([]);
  const [nama, setNama] = useState(identity.nama);
  const [sisa_cuti, setSisa_cuti] = useState(identity.sisa_cuti);
  const [sisa_cuti_n1, setSisa_cuti_n1] = useState(identity.sisa_cuti_n1);
  const [sisa_cuti_n2, setSisa_cuti_n2] = useState(identity.sisa_cuti_n2);
  console.log("sisa cuti = " + sisa_cuti);
  console.log("sisa cuti = " + sisa_cuti_n1);
  console.log("sisa cuti = " + sisa_cuti_n2);
  const [jabatan, setJabatan] = useState(identity.nama);
  const [nrk_nip, setNrk_Nip] = useState(identity.nrk_nip);
  const [nama_role_c, setNamaRole_C] = useState(identity.nama_role_c);
  const [nama_role, setNamaRole] = useState(identity.nama_role);
  const [kode_role_c, setKode_role_c] = useState(identity.kode_role_c);
  const [bagian, setBagian] = useState(identity.bagian);
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
        setSisa_cuti(response.data.sisa_cuti);
        setSisa_cuti_n1(response.data.sisa_cuti_n1);
        setSisa_cuti_n2(response.data.sisa_cuti_n2);
        setNamaRole_C(response.data.nama_role_c);
        setNamaRole(response.data.nama_role);
        setBagian(response.data.bagian);
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
  function Cuti_Besar(event) {
    setCutiBesar(event.target.checked); // Set show based on checkbox state
  }
  function Cuti_Minus_Negara(event) {
    setCutiMinusNegara(event.target.checked); // Set show based on checkbox state
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
  
  const handlePostSurat = async () => {
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
      if (jenis === "Sakit") {
        setTimeout(() => {
          navigate(`/Dashboard/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}/${bagian}`);
          alert(response.data.message);
        }, 2000);
      }
    } catch (error) {
      console.log(error.response);
      alert("error code 103");
    }
  }
  const handleUpdateSisaCuti = async (jumlah_cuti_now) => {
    const payload = {
      sisa_cuti: jumlah_cuti_now
    };
    try {
      const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/update_sisa_cuti.php?id=${storeidNumber}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(response.data);
      setTimeout(() => {
        navigate(`/Dashboard/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}`);
        alert(response.data.message);
      }, 2000);
    } catch (error) {
      console.log(error.response);
    }
  }
  const handlePostNewSurat = async (event, jumlah_cuti, jenis) => {
    event.preventDefault();
    setIsLoading(true);
    if (jenis === "Cuti") {      
      if (cuti_b > jumlah_cuti) {
        alert("Jumlah cuti melebihi sisa cuti yang tersedia.");
        setIsLoading(false);
        return;
      }
      const jumlah_cuti_now = jumlah_cuti - cuti_b;    
      console.log("Detail - jumlah_cuti:", jumlah_cuti, "cuti_b:", cuti_b, "hasil:", jumlah_cuti_now);
      try {            
        await handlePostSurat();
        await handleUpdateSisaCuti(jumlah_cuti_now);
      } catch (error) {
        console.log(error);        
      } finally {
        setIsLoading(false);
      }       
    } else {
      try {            
        await handlePostSurat();
      } catch (error) {
        console.log(error);        
      } finally {
        setIsLoading(false);        
      }
    }      
  }
  useEffect(() => {
    getIdentity();
    getIdentityKasubbag();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kode_role_c]);
  return (
    <>
      <div className='container-fluid d-flex flex-column p-5 m-2 overflow-auto'>
        {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
            <span style={{position: 'absolute', top : '1500px'}} className="load-cuti"></span>
        </div>} 
        <p className='content-header-p'>Mawasdiri/Pengajuan Cuti</p>
        <div className='d-flex justify-content-between align-items-center'>
          <h1 className='content-header-title mt-0'>Pengajuan Cuti</h1>
          <Profile nama={nama} feature="mawasdiri" />
        </div>
        <div className='form-position d-flex flex-column'>
          <div className='form-display'>
            <form className='' onSubmit={(e) => handlePostNewSurat(e, sisa_cuti, jenis)}>
              <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                <h1 className='form-h1 fw-bold ms-3'>Data Diri</h1>
                <label className='form-label ms-3' htmlFor="">Nama : </label>
                <input className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeNama} value={nama} disabled placeholder='Nama' type="text" />
                <label className='form-label ms-3' htmlFor="">NIP / NRK</label>
                <input className='form-input ms-3 mb-4 ps-2 rounded-3' value={nrk_nip} placeholder='No. HP' disabled type="text" />                
                <label className='form-label ms-3' htmlFor="">No.Handphone</label>
                <input className='form-input ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeHp} required placeholder='No. HP' type="text" />
                <label className='form-label ms-3' htmlFor="">Jabatan</label>
                <input className='form-input ms-3 mb-4 ps-2 rounded-3' value={jabatan} placeholder='No. HP' disabled type="text" />
                {/* <label className='form-label ms-3' htmlFor="">ID Number</label>
                <input className='form-input ms-3 mb-4 rounded-3' value={storeidNumber} placeholder='No. HP' type="text" /> */}
                {/* <label className='form-label ms-3' htmlFor="">Nama Atasan</label> */}
                <input value={nama_atasan} placeholder='Nama Atasan' type="hidden" />
                {level === 'level-1' && (
                  <>
                    <label className='form-label ms-3' htmlFor="">Unit Kerja</label>
                    <input className='form-input ms-3 mb-4 ps-2 rounded-3' value={nama_role} placeholder='Sisa Cuti' disabled type="text" />
                  </>
                )}
                {level === 'level-2' && (
                  <>
                    <label className='form-label ms-3' htmlFor="">Unit Kerja</label>
                    <input className='form-input ms-3 mb-4 ps-2 rounded-3' value={nama_role_c} placeholder='Sisa Cuti' disabled type="text" />
                  </>
                )}
                {bagian === '4' ? (
                  <>
                    <label className='form-label ms-3' htmlFor="">Sisa Cuti</label>
                    <input className='form-input ms-3 mb-4 ps-2 rounded-3' value={sisa_cuti} placeholder='Sisa Cuti' disabled type="text" />
                  </>
                ) : (
                  <>
                  <label className='form-label ms-3' htmlFor="">Catatan Cuti</label>
                  <div className='d-flex flex-row'>                    
                    <table className='table-spaced ms-3'>                      
                      <tr>
                        <th colSpan={3}>1. Cuti Tahunan</th>
                      </tr>
                      <tr>
                        <th>Tahun</th>
                        <th>Sisa</th>
                        <th>Keterangan</th>
                      </tr>
                      <tr>
                        <th>N-2</th>
                        <th className='text-center'>{sisa_cuti_n2}</th>
                        <th className='text-center'>-</th>                        
                      </tr>
                      <tr>
                        <th>N-1</th>
                        <th className='text-center'>{sisa_cuti_n1}</th>
                        <th className='text-center'>-</th>
                      </tr>
                      <tr>
                        <th>N</th>
                        <th className='text-center'>{sisa_cuti}</th>
                        <th className='text-center'>-</th>
                      </tr>                      
                    </table>                    
                  </div>
                </>
                )}
                <div style={bagian == "4" ? {display: 'none'} : {}}>
                                  
                </div>
                <div style={bagian !== "1" ? {display: 'none'} : {}} className='cuti-alasan-penting gap-2 ps-3'>
                  
                </div>
              </div>
              <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                <h1 className='form-h1 fw-bold ms-3'>Alasan Cuti/Sakit/Izin</h1>
                <textarea className='form-textarea ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeKeterangan} placeholder='Alasan Cuti/Sakit/Izin' />
              </div>
              <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                <h1 className='form-h1 fw-bold ms-3'>Alamat Selama Cuti/Sakit/Izin</h1>
                <textarea className='form-textarea ms-3 mb-4 ps-2 rounded-3' onChange={handleChangeAlamat} placeholder='Alamat Selama Cuti/Sakit/Izin' />
              </div>
              <div className='bg-green-old text-white d-flex flex-column align-items-start justify-content-start rounded-5 p-3 mb-3'>
                <h1 className='form-h1 fw-bold ms-3'>Jenis Surat</h1>
                <div className='d-flex flex-row align-items-center gap-2 ps-3'>
                  <input className='form-check-input' type="checkbox" value='Cuti' onChange={(event) => { Cuti(event); handleChangeJenis(event); }} />
                  <label className='form-check-label' htmlFor="">Cuti Tahunan</label>
                </div>                
                {cuti && (
                  <div className='d-flex flex-column'>
                    <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                      <label className='label-check ps-4' htmlFor="">Cuti Tahunan (Hari)</label>
                      <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeCuti} style={{ marginTop: '10px' }} type="number" />
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
                <div style={bagian !== "1" ? {display: 'none'} : {}} className='cuti-alasan-penting gap-2 ps-3'>
                  <input className='form-check-input' type="checkbox" value='Cuti Alasan Penting' onChange={(event) => { Cuti_Imp(event); handleChangeJenis(event); }} />
                  <label className='form-check-label' htmlFor="">Cuti Alasan Penting</label>
                </div>
                {cuti_imp && (
                  <div className='d-flex flex-column'>
                    <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                      <label className='label-check ps-4' htmlFor="">Cuti Alasan Penting (Hari)</label>
                      <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeCuti} style={{ marginTop: '10px' }} type="text" />
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
                
                <div style={bagian !== "1" ? {display: 'none'} : {}} className='cuti-alasan-penting gap-2 ps-3'>
                  <input className='form-check-input' type="checkbox" value='Cuti Besar' onChange={(event) => { Cuti_Besar(event); handleChangeJenis(event); }} />
                  <label className='form-check-label' htmlFor="">Cuti Besar</label>
                </div>
                {cuti_besar && (
                  <div className='d-flex flex-column'>
                    <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                      <label className='label-check ps-4' htmlFor="">Cuti Besar (Hari)</label>
                      <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeCuti} style={{ marginTop: '10px' }} type="text" />
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
                <div style={bagian !== "1" ? {display: 'none'} : {}} className='cuti-alasan-penting gap-2 ps-3'>
                  <input className='form-check-input' type="checkbox" value='Cuti Diluar Tanggungan Negara' onChange={(event) => { Cuti_Minus_Negara(event); handleChangeJenis(event); }} />
                  <label className='form-check-label' htmlFor="">Cuti Diluar Tanggungan Negara</label>
                </div>
                {cuti_minus_negara && (
                  <div className='d-flex flex-column'>
                    <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                      <label className='label-check ps-4' htmlFor="">Cuti Diluar Tanggungan Negara (Hari)</label>
                      <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeCuti} style={{ marginTop: '10px' }} type="text" />
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
                  <input className='form-check-input' type="checkbox" value='Cuti Melahirkan' onChange={(event) => { Hamil(event); handleChangeJenis(event); }} />
                  <label className='form-check-label' htmlFor="">Cuti Melahirkan </label>
                </div>
                {hamil && (
                  <div className='d-flex flex-column'>
                    <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                      <label className='label-check ps-4' htmlFor="">Cuti Melahirkan (Hari):</label>
                      <input className='form-input-in-check ms-4 rounded-3 ps-3' onChange={handleChangeCuti} style={{ marginTop: '10px' }} type="text" />                    
                    </div>
                    <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                      <label className='label-check ps-4' htmlFor="">Dimulai Dari Tanggal:</label>
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
                  <input className='form-check-input' type="checkbox" value='Sakit' onChange={(event) => { Sakit(event); handleChangeJenis(event); }} />
                  <label className='form-check-label' htmlFor="">Sakit</label>
                </div>
                {sakit && (
                  <div className='d-flex flex-column'>
                    <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                      <label className='label-check ps-4' htmlFor="">Sakit(Hari):</label>
                      <input onChange={handleChangeCuti} className='form-input-in-check ms-3 rounded-3 ps-3' type="text" />
                    </div>
                    <div className='d-flex form-in-check-position gap-2 ps-3 mb-4'>
                      <label className='label-check ps-4' htmlFor="">Dimulai Dari Tanggal:</label>
                      <DatePicker
                      className='form-input-in-check w-100 ms-3 rounded-3 ps-3'
                        selectsRange={true}
                        startDate={selectedStartDates}
                        endDate={selectedEndDates}
                        onChange={handleChangeCutiDate}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Select date range"
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <label className="label-check ps-4" htmlFor="sakit-file">
                        Upload Surat Sakit Dokter (Maks. 2Mb)
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
                )}
              </div>
              <div className='d-flex flex-column align-items-center w-100'>
                <button className='submit' type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cuti_form;