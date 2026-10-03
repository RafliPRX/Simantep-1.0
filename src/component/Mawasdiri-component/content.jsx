import '../css/content.css';
import green from '../../assets/green.svg';
import red from '../../assets/decline.svg';
import white from '../../assets/unread.svg';
import left from '../../assets/left.svg';
import right from '../../assets/right.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import Profile from '../profile';
import { useNavigate, useParams } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import * as xlsx from 'xlsx';

const Content = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { level } = useParams();
    const { role } = useParams();
    const { role_sp } = useParams();
    const { nrk_nip } = useParams();
    const { bagian } = useParams();
    const date = new Date();
    const currentMonth = String(date.getMonth() + 1).padStart(2, '0');
    const currentYear = date.getFullYear();
    const [searchMonth, setSearchMonth] = useState(currentMonth);    
    const navigate = useNavigate();
    const [searchName, setSearchName] = useState('');
    const storeidNumber = localStorage.getItem('id_number');
    // const [isLoading, setIsLoading] = useState('false')
    const [identity, setIdentity] = useState([]);
    const [nama, setNama] = useState(identity?.nama);
    const [Role_sp_Mode, setRole_sp_Mode] = useState('Pegawai');
    const getIdentity = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/Admin_API/detail_identity.php?id=${storeidNumber}` , {
          headers: {"Content-Type": "application/json"},
        });
        console.log(response.data);
        setIdentity(response.data);
        setNama(response.data.nama);
      } catch (error) {
        console.log(error);
      }
    }
    const [surat, setSurat] = useState([]);
    const [pagination_surat, setPagination_surat] = useState({
        currentPage: 1,
    });    
    const getSurat = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/MAWASDIRI/Cuti/surat_by_name.php?id=${storeidNumber}&nama=Kanif Anshori&page=${pagination_surat.currentPage}&bulan=${searchMonth}&tahun=${currentYear}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_surat = {
                total: res1.data.total_records,
                currentPage: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setSurat(response);
            setPagination_surat(pagination_surat);            
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }    
    const [account, setAccount] = useState([]);
    const [pagination_account, setPagination_Account] = useState({
        currentPage: 1,
    });
    // account list already contains a `sisa_cuti` field on each item, so we don't
    // need a separate state variable for it.  Instead we update the correct element
    // inside the `account` array when the user types.
    const getAccount = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getAllIdentity.php?page=${pagination_account.currentPage}&nama=${searchName}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_account = {
                total: res1.data.total_records,
                currentPage: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setAccount(response);
            setPagination_Account(pagination_account);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // update the sisa_cuti value for the specific account row
    const handleChangeSisaCuti = (event, id_number) => {
        const value = event.target.value;
        setAccount(prev =>
            prev.map(acc =>
                acc.id_number === id_number ? { ...acc, sisa_cuti: value } : acc
            )
        );
        console.log('sisa cuti changed for', id_number, value);
    }
    const handleChangeSisaCutiN1 = (event, id_number) => {
        const value_n1 = event.target.value;
        setAccount(prev =>
            prev.map(acc =>
                acc.id_number === id_number ? { ...acc, sisa_cuti_n1: value_n1 } : acc
            )
        );
        console.log('sisa cuti N-1 changed for', id_number, value_n1);
    }
    const handleChangeSisaCutiN2 = (event, id_number) => {
        const value_n2 = event.target.value;
        setAccount(prev =>
            prev.map(acc =>
                acc.id_number === id_number ? { ...acc, sisa_cuti_n2: value_n2 } : acc
            )
        );
        console.log('sisa cuti N-1 changed for', id_number, value_n2);
    }
    const handleNext_Surat = () => {
        setPagination_surat({
            ...pagination_surat,
            currentPage: pagination_surat.currentPage + 1,
        })
    }
    const handlePrev_Surat = () => {
        setPagination_surat({
            ...pagination_surat,
            currentPage: pagination_surat.currentPage - 1,
        })
    }
    const deletedSurat = async (id) => {
        try {
          const response = await axios.delete(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/delete_surat.php?id=${id}`, {
            headers: { "Content-Type": "application/json" },
          });
          console.log(response.data);
          alert(response.data.message);
          setTimeout(() => {
                setIsLoading(false);
                window.location.reload();
            }, 500);
        } catch (error) {
          console.log(error.response);
          alert("error code 104");
        }
    }
    const confirmDeleteSurat = (id) => {
        if (window.confirm("Apakah Anda yakin Surat ini di Hapuskan ?")) {
            deletedSurat(id);
        }
    }
    const [surat_role_b, setSurat_role_b] = useState([]);
    const [pagination_surat_role_b, setPagination_surat_role_b] = useState({
        currentPage: 1,
    });        
    const getSurat_role_b = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/MAWASDIRI/Cuti/surat_by_role_b.php?page=${pagination_surat_role_b.currentPage}&bulan=${searchMonth}&tahun=${currentYear}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_surat = {
                total: res1.data.total_records,
                currentPage: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setSurat_role_b(response);
            setPagination_surat_role_b(pagination_surat);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const handleNext_Surat_b = () => {
        setPagination_surat_role_b({
            ...pagination_surat_role_b,
            currentPage: pagination_surat_role_b.currentPage + 1,
        })
    }
    const handlePrev_Surat_b = () => {
        setPagination_surat_role_b({
            ...pagination_surat_role_b,
            currentPage: pagination_surat_role_b.currentPage - 1,
        })
    }
    const [surat_role_a, setSurat_role_a] = useState([]);
    const [pagination_surat_role_a, setPagination_surat_role_a] = useState({
        currentPage: 1,
    });
    const getSurat_role_a_kasubbag = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/MAWASDIRI/Cuti/surat_by_role_a_kasubbag.php?kode_role=${role}&nama=${nama}&page=${pagination_surat_role_a.currentPage}&bulan=${searchMonth}&tahun=${currentYear}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_surat = {
                total: res1.data.total_records,
                currentPage: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setSurat_role_a(response);
            setPagination_surat_role_a(pagination_surat);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }    
    const [surat_role_a_kabalai, setSurat_role_a_kabalai] = useState([]);
    const [pagination_surat_role_a_kabalai, setPagination_surat_role_a_kabalai] = useState({
        currentPage: 1,
    });        
    const getSurat_role_a_kabalai = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/MAWASDIRI/Cuti/surat_by_role_a_kabalai.php?kode_role=${role}&nama=${nama}&page=${pagination_surat_role_a_kabalai.currentPage}&bulan=${searchMonth}&tahun=${currentYear}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_surat = {
                total: res1.data.total_records,
                currentPage: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setSurat_role_a_kabalai(response);
            setPagination_surat_role_a_kabalai(pagination_surat);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const handleNext_Surat_a_kabalai = () => {
        setPagination_surat_role_a_kabalai({
            ...pagination_surat_role_a_kabalai,
            currentPage: pagination_surat_role_a_kabalai.currentPage + 1,
        })
    }
    const handlePrev_Surat_a_kabalai = () => {
        setPagination_surat_role_a_kabalai({
            ...pagination_surat_role_a_kabalai,
            currentPage: pagination_surat_role_a_kabalai.currentPage - 1,
        })
    }
    const handleNext_Surat_a_kasubbag = () => {
        setPagination_surat_role_a({
            ...pagination_surat_role_a,
            currentPage: pagination_surat_role_a.currentPage + 1,
        })
    }
    const handlePrev_Surat_a_kasubbag = () => {
        setPagination_surat_role_a({
            ...pagination_surat_role_a,
            currentPage: pagination_surat_role_a.currentPage - 1,
        })
    }
    const handleNext_Account = () => {
        setPagination_Account({
            ...pagination_account,
            currentPage: pagination_account.currentPage + 1,
        })
    }
    const handlePrev_Account = () => {
        setPagination_Account({
            ...pagination_account,
            currentPage: pagination_account.currentPage - 1,
        })
    }
    const [surat_role_sp, setSurat_role_sp] = useState([]);
    const [pagination_surat_role_sp, setPagination_surat_role_sp] = useState({
        currentPage: 1,
    });
    const getSurat_role_sp = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/MAWASDIRI/Cuti/surat_by_role_sp.php?page=${pagination_surat_role_sp.currentPage}&nama=${nama}&bulan=${searchMonth}&tahun=${currentYear}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_surat = {
                total: res1.data.total_records,
                currentPage: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setSurat_role_sp(response);
            setPagination_surat_role_sp(pagination_surat);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const handleNext_Surat_sp = () => {
        setPagination_surat_role_sp({
            ...pagination_surat_role_sp,
            currentPage: pagination_surat_role_sp.currentPage + 1,
        })
    }
    const handlePrev_Surat_sp = () => {
        setPagination_surat_role_sp({
            ...pagination_surat_role_sp,
            currentPage: pagination_surat_role_sp.currentPage - 1,
        })
    }
    const mark = async (idNotif, id) => {
        const payload = {
            stat: "Disable"
        }
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/mark_as_read.php?id=${idNotif}`, payload, {
                headers: {"Content-Type": "multipart/form-data"},
            })
            console.log(response.data);
            setTimeout(() => {
                navigate(`/Dashboard/${level}/${role}/${role_sp}/Cuti-detail/${id}`);
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.log(error.response);
        }
    }
    const handleOpenSurat = (id, stat, id_notif, e) => {
        e.preventDefault();
        if (stat === 'Active') {
            mark(id_notif, id);
        } else {
            navigate(`/Dashboard/${level}/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}/${bagian}/Cuti-detail/${id}`);
        }        
    }
    const [absensi, setAbsensi] = useState([]);
    const [pagination_absensi, setPagination_Absensi] = useState({
        currentPage: 1,
    });        
    const getAbsensi = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/MAWASDIRI/Absen/absent.php?id_number=${storeidNumber}&page=${pagination_absensi.currentPage}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_surat = {
                total: res1.data.total_records,
                currentPage: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setAbsensi(response);
            setPagination_Absensi(pagination_surat);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const handleNext_Absensi = () => {
        setPagination_Absensi({
            ...pagination_absensi,
            currentPage: pagination_absensi.currentPage + 1,
        })
    }
    const handlePrev_Absensi = () => {
        setPagination_Absensi({
            ...pagination_absensi,
            currentPage: pagination_absensi.currentPage - 1,
        })
    }
    const handleChangeSearchMonth = (event) => {
        setSearchMonth(event.target.value);
        console.log(event.target.value);        
    }
    const handleChangeSearchName = (event) => {
        setSearchName(event.target.value);
        console.log(event.target.value);
    }
    useEffect(() => {
    getIdentity();    
    getSurat();
    getSurat_role_a_kasubbag();
    getSurat_role_a_kabalai();
    getSurat_role_sp();
    getSurat_role_b();
    getAccount();
    getAbsensi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination_surat?.currentPage, pagination_surat_role_a?.currentPage, pagination_surat_role_a_kabalai?.currentPage, pagination_surat_role_sp?.currentPage, pagination_account?.currentPage, searchMonth, searchName, nama, pagination_surat_role_b?.currentPage]);

    const handleUpdateSisaCuti = async (event, sisa_cuti, id_number) => {
      event.preventDefault();
      setIsLoading(true);
      const payload = {
        sisa_cuti: sisa_cuti
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/update_sisa_cuti.php?id=${id_number}`, payload, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          setIsLoading(false);          
          alert(response.data.message);
        }, 1000);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response);
        alert("error code 103");
      }
    }
    const handleUpdateSisaCutiN1 = async (event, sisa_cuti, id_number) => {
      event.preventDefault();
      setIsLoading(true);
      const payload = {
        sisa_cuti: sisa_cuti
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/update_sisa_cuti_N1.php?id=${id_number}`, payload, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          setIsLoading(false);          
          alert(response.data.message);
        }, 1000);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response);
        alert("error code 103");
      }
    }
    const handleUpdateSisaCutiN2 = async (event, sisa_cuti, id_number) => {
      event.preventDefault();
      setIsLoading(true);
      const payload = {
        sisa_cuti: sisa_cuti
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/update_sisa_cuti_N2.php?id=${id_number}`, payload, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          setIsLoading(false);          
          alert(response.data.message);
        }, 1000);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response);
        alert("error code 103");
      }
    }
    const handleDownloadExcelSurat = () => {
        const bulan = searchMonth;
        const tahun = currentYear;

        window.location.href = `https://simantepbareta.cloud/API/MAWASDIRI/Cuti/surat_excel_download.php?bulan=${bulan}&tahun=${tahun}`;
      };
    return (
        <>
        {isLoading && 
        <div style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            width: '100%',
            height: '100%',
            zIndex: '9999'
        }}>
            <div style={{width: '4rem', height: '4rem'}} className="spinner-grow text-success" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        }
        <div className='container-fluid d-flex flex-column p-5 m-2 overflow-auto'>        
        <p className='content-header-p'>Mawasdiri/Database Pegawai</p>
            <div className='d-flex flex-row align-items-center justify-content-between gap-5'>
                <h1 className='content-header-title mt-0'>Manajemen Pegawai Berbasis Kinerja Mandiri</h1>
                <Profile nama={nama} feature="mawasdiri" />
            </div>
            <div className='container-xxl content-display bg-green-old align-items-start ' style={{borderRadius: '20px'}}>
                <div className='container-xxl d-flex flex-column gap-4'>
                    <div className=''>
                    {(level === 'level-1' || level === 'level-2') && (
                        <>
                        {role_sp === '0' ? (
                                <>
                                    <h1 className='content-title fw-bold mt-0'>Progress Pengajuan Surat</h1>
                                    <div className='header-content'>
                                        <div className='d-flex flex-row gap-2'>
                                            <button className='left' onClick={handlePrev_Surat}><img src={left} alt="" /></button>
                                            <input className='page-number' type="text" value={pagination_surat.currentPage} />
                                            <button className='right' onClick={handleNext_Surat}><img src={right} alt="" /></button>
                                        </div>                                        
                                        <div className='gap-2 header-search-content'>
                                            <div className='header-month'>
                                                <label className='text-month-search' htmlFor="">Bulan:</label>
                                                <select className='w-100 h-100 rounded-3 fs-6 lh-lg' onChange={handleChangeSearchMonth} value={searchMonth} name="" id="">
                                                    <option value="01">Januari</option>
                                                    <option value="02">Februari</option>
                                                    <option value="03">Maret</option>
                                                    <option value="04">April</option>
                                                    <option value="05">Mei</option>
                                                    <option value="06">Juni</option>
                                                    <option value="07">Juli</option>
                                                    <option value="08">Agustus</option>
                                                    <option value="09">September</option>
                                                    <option value="10">Oktober</option>
                                                    <option value="11">November</option>
                                                    <option value="12">Desember</option>
                                                </select>
                                            </div>
                                            <div className='header-year'>
                                                <label className='text-year-search' htmlFor="">Tahun:</label>
                                                <select className='w-100 h-100 rounded-3 fs-6' value={currentYear} name="" id="">
                                                    <option value="2025">2025</option>
                                                    <option value="2026">2026</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {surat.length > 0 ? (
                                        <div className='mt-3 container-xxl d-flex flex-column gap-4'>
                                            <table className='table-spaced' border="1">
                                                <tr>
                                                    <th style={{ textAlign: 'center' }}>Nomor</th>
                                                    <th style={{ textAlign: 'center' }}>id Surat</th>
                                                    <th style={{ textAlign: 'center' }}>Nama</th>
                                                    <th style={{ textAlign: 'center' }}>Keterangan</th>
                                                    <th style={{ textAlign: 'center' }}>Jabatan</th>
                                                    <th style={{ textAlign: 'center' }}>Jenis Surat</th>
                                                    <th style={{ textAlign: 'center' }}>Kasubbag Tata Usaha</th>
                                                    <th style={{ textAlign: 'center' }}>Kepala Balai</th>
                                                    <th style={{ textAlign: 'center' }}>Opsi Lain</th>
                                                </tr>
                                                {surat.map((item, index) => (
                                                    <tr key={item.id_surat}>
                                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.id_surat}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.nama}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.Keterangan}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.jabatan}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.jenis_surat}</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_1 === '1' ? '' : 'none' }}><img src={white} alt="" />Belum di Baca</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_1 === '2' ? '' : 'none' }}><img src={red} alt="" />Tunda</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_1 === '3' ? '' : 'none' }}><img src={green} alt="" />Setuju</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_2 === '1' ? '' : 'none' }}><img src={white} alt="" />Belum di Baca</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_2 === '2' ? '' : 'none' }}><img src={red} alt="" />Tunda</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_2 === '3' ? '' : 'none' }}><img src={green} alt="" />Setuju</td>
                                                        <td className='d-flex flex-column gap-2' style={{ textAlign: 'center' }}> <button onClick={(e) => handleOpenSurat(item.id_surat, item.stat, item.id_notif, e )} className='B-update'>Ubah</button><button onClick={() => confirmDeleteSurat(item.id_surat)} className='B-deleted'>Hapus</button></td>  
                                                    </tr>
                                                ))} 
                                            </table>
                                        </div>    
                                    ) : (
                                            <p className='no-data-p mt-5 text-center'>tidak ada data</p>
                                    )}
                                </>
                            ) : role_sp === 'S-02' ? (
                                <>  
                                    <h1 className='content-title fw-bold mt-0'>Progress Pengajuan Surat</h1>
                                    <div className='header-content'>
                                        <div className='d-flex flex-row gap-2'>
                                            <button className='left' onClick={handlePrev_Surat_sp}><img src={left} alt="" /></button>
                                            <input className='page-number' type="text" value={pagination_surat.currentPage} />
                                            <button className='right' onClick={handleNext_Surat_sp}><img src={right} alt="" /></button>
                                        </div>
                                        <div className='d-flex flex-row gap-3'>
                                            <button className='Special-text border-0 p-1 rounded-1' onClick={() => setRole_sp_Mode('Sendiri')} >Surat cuti Sendiri</button>
                                            <button className='Special-text border-0 p-1 rounded-1' onClick={() => setRole_sp_Mode('Pegawai')} >Surat Cuti Pegawai</button>
                                        </div>
                                        <div className='gap-2 header-search-content'>
                                            <div className='header-month'>
                                                <label className='text-month-search' htmlFor="">Bulan:</label>
                                                <select className='w-100 h-100 rounded-3 fs-6 lh-lg' onChange={handleChangeSearchMonth} value={searchMonth} name="" id="">
                                                    <option value="01">Januari</option>
                                                    <option value="02">Februari</option>
                                                    <option value="03">Maret</option>
                                                    <option value="04">April</option>
                                                    <option value="05">Mei</option>
                                                    <option value="06">Juni</option>
                                                    <option value="07">Juli</option>
                                                    <option value="08">Agustus</option>
                                                    <option value="09">September</option>
                                                    <option value="10">Oktober</option>
                                                    <option value="11">November</option>
                                                    <option value="12">Desember</option>
                                                </select>
                                            </div>                                            
                                            <div className='header-year'>
                                                <label className='text-year-search' htmlFor="">Tahun:</label>
                                                <select className='w-100 h-100 rounded-3 fs-6' value={currentYear} name="" id="">
                                                    <option value="2025">2025</option>
                                                    <option value="2026">2026</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {Role_sp_Mode === 'Pegawai' && (surat_role_sp.length > 0 ? (
                                            <div className='mt-3 container-xxl d-flex flex-column gap-4'>
                                                <table className='table-spaced' border="1">
                                                    <tr>
                                                        <th style={{ textAlign: 'center' }}>Nomor</th>
                                                        <th style={{ textAlign: 'center' }}>id Surat</th>
                                                        <th style={{ textAlign: 'center' }}>Nama</th>
                                                        <th style={{ textAlign: 'center' }}>Keterangan</th>
                                                        <th style={{ textAlign: 'center' }}>Jabatan</th>
                                                        <th style={{ textAlign: 'center' }}>Jenis Surat</th>
                                                        <th style={{ textAlign: 'center' }}>Kasubbag Tata Usaha</th>
                                                        <th style={{ textAlign: 'center' }}>Kepala Balai</th>
                                                        <th style={{ textAlign: 'center' }}>Opsi Lain</th>
                                                    </tr>
                                                    {surat_role_sp.map((item, index) => (
                                                        <tr key={item.id_surat}>
                                                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                            <td style={{ textAlign: 'center' }}>{item.id_surat}</td>
                                                            <td style={{ textAlign: 'center' }}>{item.nama}</td>
                                                            <td style={{ textAlign: 'center' }}>{item.Keterangan}</td>
                                                            <td style={{ textAlign: 'center' }}>{item.jabatan}</td>
                                                            <td style={{ textAlign: 'center' }}>{item.jenis_surat}</td>
                                                            <td style={{ textAlign: 'center', display: item.veri_1 === '1' ? '' : 'none' }}><img src={white} alt="" />Belum di Baca</td>
                                                            <td style={{ textAlign: 'center', display: item.veri_1 === '2' ? '' : 'none' }}><img src={red} alt="" />Tunda</td>
                                                            <td style={{ textAlign: 'center', display: item.veri_1 === '3' ? '' : 'none' }}><img src={green} alt="" />Setuju</td>
                                                            <td style={{ textAlign: 'center', display: item.veri_2 === '1' ? '' : 'none' }}><img src={white} alt="" />Belum di Baca</td>
                                                            <td style={{ textAlign: 'center', display: item.veri_2 === '2' ? '' : 'none' }}><img src={red} alt="" />Tunda</td>
                                                            <td style={{ textAlign: 'center', display: item.veri_2 === '3' ? '' : 'none' }}><img src={green} alt="" />Setuju</td>
                                                            <td className='d-flex flex-column gap-2' style={{ textAlign: 'center' }}> <button onClick={(e) => handleOpenSurat(item.id_surat, item.stat, item.id_notif, e )} className='B-update'>Ubah</button><button onClick={() => confirmDeleteSurat(item.id_surat)} className='B-deleted'>Hapus</button></td>  
                                                        </tr>
                                                    ))} 
                                                </table>
                                            </div>    
                                        ) : (
                                            <div className='no-data-p mt-5 text-center'>
                                                <p className=''>tidak ada data Surat Pegawai</p>
                                            </div>
                                    ))}
                                    {Role_sp_Mode === 'Sendiri' && 
                                        (surat.length > 0 ? (
                                            <div className='mt-3 container-xxl d-flex flex-column gap-4'>
                                                <table className='table-spaced' border="1">
                                                    <tr>
                                                        <th style={{ textAlign: 'center' }}>Nomor</th>
                                                        <th style={{ textAlign: 'center' }}>id Surat</th>
                                                        <th style={{ textAlign: 'center' }}>Nama</th>
                                                        <th style={{ textAlign: 'center' }}>Keterangan</th>
                                                        <th style={{ textAlign: 'center' }}>Jabatan</th>
                                                        <th style={{ textAlign: 'center' }}>Jenis Surat</th>
                                                        <th style={{ textAlign: 'center' }}>Kasubbag Tata Usaha</th>
                                                        <th style={{ textAlign: 'center' }}>Kepala Balai</th>
                                                        <th style={{ textAlign: 'center' }}>Opsi Lain</th>
                                                    </tr>
                                                    {surat.map((item, index) => (
                                                        <tr key={item.id_surat}>
                                                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                            <td style={{ textAlign: 'center' }}>{item.id_surat}</td>
                                                            <td style={{ textAlign: 'center' }}>{item.nama}</td>
                                                            <td style={{ textAlign: 'center' }}>{item.Keterangan}</td>
                                                            <td style={{ textAlign: 'center' }}>{item.jabatan}</td>
                                                            <td style={{ textAlign: 'center' }}>{item.jenis_surat}</td>
                                                            <td style={{ textAlign: 'center', display: item.veri_1 === '1' ? '' : 'none' }}><img src={white} alt="" />Belum di Baca</td>
                                                            <td style={{ textAlign: 'center', display: item.veri_1 === '2' ? '' : 'none' }}><img src={red} alt="" />Tunda</td>
                                                            <td style={{ textAlign: 'center', display: item.veri_1 === '3' ? '' : 'none' }}><img src={green} alt="" />Setuju</td>
                                                            <td style={{ textAlign: 'center', display: item.veri_2 === '1' ? '' : 'none' }}><img src={white} alt="" />Belum di Baca</td>
                                                            <td style={{ textAlign: 'center', display: item.veri_2 === '2' ? '' : 'none' }}><img src={red} alt="" />Tunda</td>
                                                            <td style={{ textAlign: 'center', display: item.veri_2 === '3' ? '' : 'none' }}><img src={green} alt="" />Setuju</td>
                                                            <td className='d-flex flex-column gap-2' style={{ textAlign: 'center' }}> <button onClick={(e) => handleOpenSurat(item.id_surat, item.stat, item.id_notif, e )} className='B-update'>Ubah</button><button onClick={() => confirmDeleteSurat(item.id_surat)} className='B-deleted'>Hapus</button></td>  
                                                        </tr>
                                                    ))} 
                                                </table>
                                            </div>    
                                        ) : (
                                            <div className='no-data-p mt-5 text-center'>
                                                <p className=''>tidak ada data</p>
                                            </div>
                                        ))}                                    
                                </>
                            ) : (
                                <>
                                    <h1>Progress Pengajuan Surat</h1>
                                    <p style={{ display: 'flex', paddingTop: '10px', justifyContent: 'center', paddingLeft: '400px' }}>Peran tidak dikenali</p>
                                </>
                            )}                   
                        </>
                    )}                           
                    {(role ==='A-02' && level === 'level-4') && 
                        <>  
                            <h1 className='content-title mt-0'>Progress Pengajuan Surat</h1>
                            <div className='header-content'>
                                <div className='d-flex flex-row gap-2'>
                                    <button className='left' onClick={handlePrev_Surat_a_kasubbag}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_surat.currentPage} />
                                    <button className='right' onClick={handleNext_Surat_a_kasubbag}><img src={right} alt="" /></button>
                                </div>
                                <div className='header-search-content gap-2'>
                                    <div className='header-month'>
                                        <label className='text-month-search' htmlFor="">Bulan:</label>
                                        <select className='w-100 h-100 rounded-3 fs-6 lh-lg' onChange={handleChangeSearchMonth} value={searchMonth} name="" id="">
                                            <option value="01">Januari</option>
                                            <option value="02">Februari</option>
                                            <option value="03">Maret</option>
                                            <option value="04">April</option>
                                            <option value="05">Mei</option>
                                            <option value="06">Juni</option>
                                            <option value="07">Juli</option>
                                            <option value="08">Agustus</option>
                                            <option value="09">September</option>
                                            <option value="10">Oktober</option>
                                            <option value="11">November</option>
                                            <option value="12">Desember</option>
                                        </select>
                                    </div>
                                    <div className='header-year'>
                                        <label className='text-year-search' htmlFor="">Tahun:</label>
                                        <select className='w-100 h-100 rounded-3' value={currentYear} name="" id="">
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                        </select>
                                    </div>                                        
                                </div>
                            </div>
                            {surat_role_a.length > 0 ? (
                                <div className='mt-3 container-xxl d-flex flex-column gap-4'>
                                    <table className='table-spaced' border="1">
                                        <tr>
                                            <th style={{ textAlign: 'center' }}>Nomor</th>
                                            <th style={{ textAlign: 'center' }}>id Surat</th>
                                            <th style={{ textAlign: 'center' }}>Nama</th>
                                            <th style={{ textAlign: 'center' }}>Keterangan</th>
                                            <th style={{ textAlign: 'center' }}>Jabatan</th>
                                            <th style={{ textAlign: 'center' }}>Jenis Surat</th>
                                            <th style={{ textAlign: 'center' }}>Kasubbag Tata Usaha</th>
                                            <th style={{ textAlign: 'center' }}>Kepala Balai</th>
                                            <th style={{ textAlign: 'center' }}>Opsi Lain</th>
                                        </tr>
                                        {surat_role_a.map((item, index) => (
                                            <tr key={item.id_surat}>
                                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                <td style={{ textAlign: 'center' }}>{item.id_surat}</td>
                                                <td style={{ textAlign: 'center' }}>{item.nama}</td>
                                                <td style={{ textAlign: 'center' }}>{item.Keterangan}</td>
                                                <td style={{ textAlign: 'center' }}>{item.jabatan}</td>
                                                <td style={{ textAlign: 'center' }}>{item.jenis_surat}</td>
                                                <td style={{ textAlign: 'center', display: item.veri_1 === '1' ? '' : 'none' }}><img src={white} alt="" />Belum di Baca</td>
                                                <td style={{ textAlign: 'center', display: item.veri_1 === '2' ? '' : 'none' }}><img src={red} alt="" />Tunda</td>
                                                <td style={{ textAlign: 'center', display: item.veri_1 === '3' ? '' : 'none' }}><img src={green} alt="" />Setuju</td>
                                                <td style={{ textAlign: 'center', display: item.veri_2 === '1' ? '' : 'none' }}><img src={white} alt="" />Belum di Baca</td>
                                                <td style={{ textAlign: 'center', display: item.veri_2 === '2' ? '' : 'none' }}><img src={red} alt="" />Tunda</td>
                                                <td style={{ textAlign: 'center', display: item.veri_2 === '3' ? '' : 'none' }}><img src={green} alt="" />Setuju</td>
                                                <td className='d-flex flex-column gap-2' style={{ textAlign: 'center' }}> <button onClick={(e) => handleOpenSurat(item.id_surat, item.stat, item.id_notif, e )} className='B-update'>Ubah</button><button onClick={() => confirmDeleteSurat(item.id_surat)} className='B-deleted'>Hapus</button></td>  
                                            </tr>
                                        ))} 
                                    </table>
                                </div>    
                            ) : (
                                <div className='no-data-p mt-5 text-center'>
                                    <p className=''>tidak ada data</p>
                                </div>
                            )}
                        </>
                    }
                    {(role ==='A-01' && level === 'level-4') && 
                        <>   
                            <h1 className='content-title mt-0'>Progress Pengajuan Surat</h1>
                            <div className='header-content'>
                                <div className='d-flex flex-row gap-2'>
                                    <button className='left' onClick={handlePrev_Surat_a_kabalai}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_surat.currentPage} />
                                    <button className='right' onClick={handleNext_Surat_a_kabalai}><img src={right} alt="" /></button>
                                </div>
                                <div className='header-search-content gap-2'>
                                    <div className='header-month'>
                                        <label className='text-month-search fs-6' htmlFor="">Bulan:</label>
                                        <select className='w-100 h-100 rounded-3 fs-6 lh-lg' onChange={handleChangeSearchMonth} value={searchMonth} name="" id="">
                                            <option value="01">Januari</option>
                                            <option value="02">Februari</option>
                                            <option value="03">Maret</option>
                                            <option value="04">April</option>
                                            <option value="05">Mei</option>
                                            <option value="06">Juni</option>
                                            <option value="07">Juli</option>
                                            <option value="08">Agustus</option>
                                            <option value="09">September</option>
                                            <option value="10">Oktober</option>
                                            <option value="11">November</option>
                                            <option value="12">Desember</option>
                                        </select>
                                    </div>
                                    <div className='header-year'>
                                        <label className='text-year-search fs-6' htmlFor="">Tahun:</label>
                                        <select className='w-100 h-100 rounded-3' value={currentYear} name="" id="">
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {surat_role_a_kabalai.length > 0 ? (
                                <div className='mt-3 container-xxl d-flex flex-column gap-4'>
                                    <table className='table-spaced' border="1">
                                        <tr>
                                            <th style={{ textAlign: 'center' }}>Nomor</th>
                                            <th style={{ textAlign: 'center' }}>id Surat</th>
                                            <th style={{ textAlign: 'center' }}>Nama</th>
                                            <th style={{ textAlign: 'center' }}>Keterangan</th>
                                            <th style={{ textAlign: 'center' }}>Jabatan</th>
                                            <th style={{ textAlign: 'center' }}>Jenis Surat</th>
                                            <th style={{ textAlign: 'center' }}>Kasubbag Tata Usaha</th>
                                            <th style={{ textAlign: 'center' }}>Kepala Balai</th>
                                            <th style={{ textAlign: 'center' }}>Opsi Lain</th>
                                        </tr>
                                        {surat_role_a_kabalai.map((item, index) => (
                                            <tr key={item.id_surat}>
                                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                <td style={{ textAlign: 'center' }}>{item.id_surat}</td>
                                                <td style={{ textAlign: 'center' }}>{item.nama}</td>
                                                <td style={{ textAlign: 'center' }}>{item.Keterangan}</td>
                                                <td style={{ textAlign: 'center' }}>{item.jabatan}</td>
                                                <td style={{ textAlign: 'center' }}>{item.jenis_surat}</td>
                                                <td style={{ textAlign: 'center', display: item.veri_1 === '1' ? '' : 'none' }}><img src={white} alt="" />Belum di Baca</td>
                                                <td style={{ textAlign: 'center', display: item.veri_1 === '2' ? '' : 'none' }}><img src={red} alt="" />Tunda</td>
                                                <td style={{ textAlign: 'center', display: item.veri_1 === '3' ? '' : 'none' }}><img src={green} alt="" />Setuju</td>
                                                <td style={{ textAlign: 'center', display: item.veri_2 === '1' ? '' : 'none' }}><img src={white} alt="" />Belum di Baca</td>
                                                <td style={{ textAlign: 'center', display: item.veri_2 === '2' ? '' : 'none' }}><img src={red} alt="" />Tunda</td>
                                                <td style={{ textAlign: 'center', display: item.veri_2 === '3' ? '' : 'none' }}><img src={green} alt="" />Setuju</td>
                                                <td className='d-flex flex-column gap-2' style={{ textAlign: 'center' }}> <button onClick={(e) => handleOpenSurat(item.id_surat, item.stat, item.id_notif, e )} className='B-update'>Ubah</button><button onClick={() => confirmDeleteSurat(item.id_surat)} className='B-deleted'>Hapus</button></td>  
                                            </tr>
                                        ))} 
                                    </table>
                                </div>    
                            ) : (
                                <div className='no-data-p mt-5 text-center'>
                                    <p className=''>tidak ada data</p>
                                </div>
                            )}
                        </>
                    }
                    {level === 'level-3' && 
                        <>  
                            <h1 className='content-title mt-0'>Progress Pengajuan Surat</h1>
                            <div className='header-content'>
                                <div className='d-flex flex-row gap-2'>
                                    <button className='left' onClick={handlePrev_Surat_b}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_surat.currentPage} />
                                    <button className='right' onClick={handleNext_Surat_b}><img src={right} alt="" /></button>
                                </div>
                                <button className='btn-download rounded-3 border-0 bg-teal text-white p-1' onClick={handleDownloadExcelSurat}>Download Excel</button>
                                <div className='header-search-content gap-2'>
                                    <div className='header-month'>
                                        <label className='text-month-search fs-6' htmlFor="">Bulan:</label>
                                        <select className='w-100 h-100 rounded-3 fs-6 lh-lg' onChange={handleChangeSearchMonth} value={searchMonth} name="" id="">
                                            <option value="01">Januari</option>
                                            <option value="02">Februari</option>
                                            <option value="03">Maret</option>
                                            <option value="04">April</option>
                                            <option value="05">Mei</option>
                                            <option value="06">Juni</option>
                                            <option value="07">Juli</option>
                                            <option value="08">Agustus</option>
                                            <option value="09">September</option>
                                            <option value="10">Oktober</option>
                                            <option value="11">November</option>
                                            <option value="12">Desember</option>
                                        </select>
                                    </div>
                                    <div className='header-year'>
                                        <label className='text-year-search fs-6' htmlFor="">Tahun:</label>
                                        <select className='w-100 h-100 rounded-3' value={currentYear} name="" id="">
                                            <option value="2025">2025</option>
                                            <option value="2026">2026</option>
                                        </select>
                                    </div>                                    
                                </div>
                            </div>
                            {surat_role_b.length > 0 ? (
                                <div className='mt-3 container-xxl d-flex flex-column gap-4'>
                                    <table className='table-spaced' border="1">
                                        <tr>
                                            <th style={{ textAlign: 'center' }}>Nomor</th>
                                            <th style={{ textAlign: 'center' }}>id Surat</th>
                                            <th style={{ textAlign: 'center' }}>Nama</th>
                                            <th style={{ textAlign: 'center' }}>Keterangan</th>
                                            <th style={{ textAlign: 'center' }}>Jabatan</th>
                                            <th style={{ textAlign: 'center' }}>Jenis Surat</th>
                                            <th style={{ textAlign: 'center' }}>Kasubbag Tata Usaha</th>
                                            <th style={{ textAlign: 'center' }}>Kepala Balai</th>
                                            <th style={{ textAlign: 'center' }}>Opsi Lain</th>
                                        </tr>
                                        {surat_role_b.map((item, index) => (
                                            <tr key={item.id_surat}>
                                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                <td style={{ textAlign: 'center' }}>{item.id_surat}</td>
                                                <td style={{ textAlign: 'center' }}>{item.nama}</td>
                                                <td style={{ textAlign: 'center' }}>{item.Keterangan}</td>
                                                <td style={{ textAlign: 'center' }}>{item.jabatan}</td>
                                                <td style={{ textAlign: 'center' }}>{item.jenis_surat}</td>
                                                <td style={{ textAlign: 'center', display: item.veri_1 === '1' ? '' : 'none' }}><img src={white} alt="" />Belum di Baca</td>
                                                <td style={{ textAlign: 'center', display: item.veri_1 === '2' ? '' : 'none' }}><img src={red} alt="" />Tunda</td>
                                                <td style={{ textAlign: 'center', display: item.veri_1 === '3' ? '' : 'none' }}><img src={green} alt="" />Setuju</td>
                                                <td style={{ textAlign: 'center', display: item.veri_2 === '1' ? '' : 'none' }}><img src={white} alt="" />Belum di Baca</td>
                                                <td style={{ textAlign: 'center', display: item.veri_2 === '2' ? '' : 'none' }}><img src={red} alt="" />Tunda</td>
                                                <td style={{ textAlign: 'center', display: item.veri_2 === '3' ? '' : 'none' }}><img src={green} alt="" />Setuju</td>
                                                <td className='d-flex flex-column gap-2' style={{ textAlign: 'center' }}> <button onClick={(e) => handleOpenSurat(item.id_surat, item.stat, item.id_notif, e )} className='B-update'>Ubah</button><button onClick={() => confirmDeleteSurat(item.id_surat)} className='B-deleted'>Hapus</button></td>  
                                            </tr>
                                        ))} 
                                    </table>
                                </div>    
                            ) : (
                                <div className='no-data-p mt-5 text-center'>
                                    <p className=''>tidak ada data</p>
                                </div>
                            )}                            
                        </>
                    }
                    </div>
                    {level === 'level-3' &&
                    <div className='container-xxl d-flex flex-column gap-4'>                     
                        <>
                            <h1 className='content-title mt-0'>Daftar Pegawai</h1>
                            <div className='header-content'>
                                <div className='d-flex flex-row gap-2'>
                                    <button className='left' onClick={handlePrev_Account}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_account.currentPage} disabled />
                                    <button className='right' onClick={handleNext_Account}><img src={right} alt="" /></button>
                                </div>
                                <div className='d-flex flex-row gap-2 align-items-center'>
                                    <label className='text-year-search fs-6' htmlFor="">Nama: </label>
                                    <input className='border-0 rounded-3 input-lv3 p-1' onChange={handleChangeSearchName} type="text" />
                                </div>
                            </div>
                            {account.length > 0 ? (
                                <table className='table-spaced' border={1}>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>Nomor ID</th>
                                        <th style={{ textAlign: 'center' }}>Nama</th>
                                        <th style={{ textAlign: 'center' }}>Jumlah Cuti N</th>
                                        <th style={{ textAlign: 'center' }}>Jumlah Cuti N-1</th>
                                        <th style={{ textAlign: 'center' }}>Jumlah Cuti N-2</th>
                                    </tr>
                                    {account.map((item) => (
                                        <tr key={item.id_number}>
                                            <td style={{ textAlign: 'center' }}>{item.id_number}</td>
                                            <td style={{ textAlign: 'center' }}>{item.nama}</td>
                                            <td style={{ textAlign: 'center'}}>
                                                <div className='d-flex flex-column ps-5 pe-5'>
                                                    <input
                                                        type="number"
                                                        value={item.sisa_cuti}
                                                        onChange={e => handleChangeSisaCuti(e, item.id_number)}
                                                        style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}
                                                    />
                                                    <button onClick={(e) => handleUpdateSisaCuti(e, item.sisa_cuti, item.id_number)} className='B-update'>Ubah</button>
                                                </div> 
                                            </td>
                                            <td>
                                                <div className='d-flex flex-column ps-5 pe-5'>
                                                    <input
                                                        type="number"
                                                        value={item.sisa_cuti_n1}
                                                        onChange={e => handleChangeSisaCutiN1(e, item.id_number)}
                                                        style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}
                                                    />
                                                    <button onClick={(e) => handleUpdateSisaCutiN1(e, item.sisa_cuti_n1, item.id_number)} className='B-update'>Ubah</button>
                                                </div> 
                                            </td>
                                            <td>
                                                <div className='d-flex flex-column ps-5 pe-5'>
                                                    <input
                                                        type="number"
                                                        value={item.sisa_cuti_n2}
                                                        onChange={e => handleChangeSisaCutiN2(e, item.id_number)}
                                                        style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}
                                                    />
                                                    <button onClick={(e) => handleUpdateSisaCutiN2(e, item.sisa_cuti_n2, item.id_number)} className='B-update'>Ubah</button>
                                                </div> 
                                            </td>
                                        </tr>
                                        ))} 
                                    </table>
                                ) : (
                                    <p className='no-data-p mt-5 text-center'>tidak ada data</p>
                            )}
                        </>                    
                    </div>  
                    }
                    {role === 'D-19' && 
                        <div className='content'>
                            <>
                                <h1>Absensi</h1>
                                <div className='d-flex flex-row gap-2'>
                                    <button className='left' onClick={handlePrev_Absensi}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_account.currentPage} />
                                    <button className='right' onClick={handleNext_Absensi}><img src={right} alt="" /></button>
                                </div>
                                <table>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>Nomor</th>
                                        <th style={{ textAlign: 'center' }}>Nama</th>
                                        <th style={{ textAlign: 'center' }}>Hari ini</th>
                                        <th style={{ textAlign: 'center' }}>Jam Masuk</th>
                                        <th style={{ textAlign: 'center' }}>Telat</th>
                                        <th style={{ textAlign: 'center' }}>Jam Keluar</th>
                                        <th style={{ textAlign: 'center' }}>Cepat</th>
                                        <th style={{ textAlign: 'center' }}>Total Kerja</th>
                                    </tr>
                                    {absensi.map((item, index) => (
                                        <tr key={item.id_number}>
                                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                            <td style={{ textAlign: 'center' }}>{item.nama}</td>
                                            <td style={{ textAlign: 'center' }}>{item.today}</td>
                                            <td style={{ textAlign: 'center' }}>{item.jam_in}</td>
                                            <td style={{ textAlign: 'center' }}>{item.telat}</td>
                                            <td style={{ textAlign: 'center' }}>{item.jam_out}</td>
                                            <td style={{ textAlign: 'center' }}>{item.cepat}</td>
                                            <td style={{ textAlign: 'center' }}>{item.total}</td>
                                        </tr>
                                    ))}
                                </table>
                            </>
                        </div>
                    }
                </div>
            </div>
        </div>
        </>
    )
}

export default Content;