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
    const date = new Date();
    const currentMonth = String(date.getMonth() + 1).padStart(2, '0');
    const currentYear = date.getFullYear();
    const [searchMonth, setSearchMonth] = useState(currentMonth);    
    const navigate = useNavigate();
    const [searchName, setSearchName] = useState('');
    const storeidNumber = localStorage.getItem('id_number');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
    // const [isLoading, setIsLoading] = useState('false')
    const [identity, setIdentity] = useState([]);
    const [nama, setNama] = useState(identity.nama);
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
        const baseUrl = `https://simantepbareta.cloud/API/MAWASDIRI/Cuti/surat_by_name.php?id=${storeidNumber}&page=${pagination_surat.currentPage}&bulan=${searchMonth}&tahun=${currentYear}`;
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
        const baseUrl = `https://simantepbareta.cloud/API/MAWASDIRI/Cuti/surat_by_role_b.php?page=${pagination_surat_role_b.currentPage}`;
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
    const [surat_role_a, setSurat_role_a] = useState([]);
    const [pagination_surat_role_a, setPagination_surat_role_a] = useState({
        currentPage: 1,
    });        
    const getSurat_role_a_kasubbag = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/MAWASDIRI/Cuti/surat_by_role_a_kasubbag.php?kode_role=${role}&page=${pagination_surat_role_a.currentPage}&bulan=${searchMonth}&tahun=${currentYear}`;
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
        const baseUrl = `https://simantepbareta.cloud/API/MAWASDIRI/Cuti/surat_by_role_a_kabalai.php?kode_role=${role}&page=${pagination_surat_role_a_kabalai.currentPage}&bulan=${searchMonth}&tahun=${currentYear}`;
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
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 480);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const getSurat_role_sp = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/MAWASDIRI/Cuti/surat_by_role_sp.php?page=${pagination_surat_role_sp.currentPage}`;
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
    const handleOpenSurat = (id) => {
        navigate(`/Dashboard/${level}/${role}/${role_sp}/Cuti-detail/${id}`);
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
    }, [pagination_surat?.currentPage, pagination_surat_role_a?.currentPage, pagination_surat_role_a_kabalai?.currentPage, pagination_surat_role_sp?.currentPage, pagination_account?.currentPage, searchMonth, searchName]);

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
    return (
        <>
        <div className='main-dashboard'>
        {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
            <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
        </div>}
        <p>Mawasdiri/Database Pegawai</p>
            <h1>Manajemen Pegawai Berbasis {isMobile && <br />} Kinerja Mandiri</h1>
            <Profile nama={nama} feature="mawasdiri" />
            <div className='content-col'>
                <div className='box-m'>
                    <div className='content'>
                    {(level === 'level-1' || level === 'level-2') && (
                        <>
                        {role_sp === '0' ? (
                                <>
                                    <h1>Progress Pengajuan Surat</h1>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <div className='pagination'>
                                            <button className='left' onClick={handlePrev_Surat}><img src={left} alt="" /></button>
                                            <input className='page-number' type="text" value={pagination_surat.currentPage} />
                                            <button className='right' onClick={handleNext_Surat}><img src={right} alt="" /></button>
                                        </div>
                                        <div className='search'>
                                            <label className='pagination-label' htmlFor="">Bulan:</label>
                                            <select className='pagination-search' onChange={handleChangeSearchMonth} value={searchMonth} name="" id="">
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
                                            <label className='pagination-label' htmlFor="">Tahun:</label>
                                            <select className='pagination-search' value={currentYear} name="" id="">
                                                <option value="2025">2025</option>
                                                <option value="2026">2026</option>
                                            </select>
                                        </div>
                                    </div>
                                    {surat.length > 0 ? (
                                        <table>
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
                                                    <td style={{ textAlign: 'center' }}> <button onClick={() => handleOpenSurat(item.id_surat)} className='B-update'>Ubah</button> <br /> <button onClick={() => confirmDeleteSurat(item.id_surat)} className='B-deleted'>Hapus</button></td>  
                                                </tr>
                                            ))} 
                                        </table>
                                    ) : (
                                        <p className='table-p'>tidak ada data</p>
                                    )}
                                </>
                            ) : role_sp === 'S-02' ? (
                                <>
                                    <h1>Progress Pengajuan Surat</h1>
                                    <div style={{display: "flex", flexDirection: "row"}}>
                                        <div className='pagination'>
                                            <button className='left' onClick={handlePrev_Surat_sp}><img src={left} alt="" /></button>
                                            <input className='page-number' type="text" value={pagination_surat_role_sp.currentPage} />
                                            <button className='right' onClick={handleNext_Surat_sp}><img src={right} alt="" /></button>
                                        </div>
                                        <div className='search'>
                                            <label className='pagination-label' htmlFor="">Bulan:</label>
                                            <select className='pagination-search' onChange={handleChangeSearchMonth} value={searchMonth} name="" id="">
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
                                            <label className='pagination-label' htmlFor="">Tahun:</label>
                                            <select className='pagination-search' value={currentYear} name="" id="">
                                                <option value="2025">2025</option>
                                                <option value="2026">2026</option>
                                            </select>
                                        </div>
                                    </div>
                                    {surat_role_sp.length > 0 ? (
                                        <table>
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
                                                    <td style={{ textAlign: 'center' }}> <button onClick={() => handleOpenSurat(item.id_surat)} className='B-update'>Detail</button> <br /> <button onClick={() => confirmDeleteSurat(item.id_surat)} className='B-deleted'>Hapus</button> </td>  
                                                </tr>
                                            ))} 
                                        </table>
                                    ) : (
                                        <p style={{ display: 'flex', paddingTop: '10px', justifyContent: 'center', paddingLeft: '400px' }}>tidak ada data</p>
                                    )}
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
                            <h1>Progress Pengajuan Surat</h1>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <div className='pagination'>
                                    <button className='left' onClick={handlePrev_Surat_a_kasubbag}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_surat_role_a.currentPage} />
                                    <button className='right' onClick={handleNext_Surat_a_kasubbag}><img src={right} alt="" /></button>
                                </div>
                                <div className='search'>
                                    <label className='pagination-label' htmlFor="">Bulan:</label>
                                    <select className='pagination-search' onChange={handleChangeSearchMonth} value={searchMonth} name="" id="">
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
                                    <label className='pagination-label' htmlFor="">Tahun:</label>
                                    <select className='pagination-search' value={currentYear} name="" id="">
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                    </select>
                                </div>
                            </div>
                            {surat_role_a.length > 0 ? (
                                <table>
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
                                            <td style={{ textAlign: 'center' }}> <button onClick={() => handleOpenSurat(item.id_surat)} className='B-update'>Jawab</button> <br /> <button className='B-deleted'>Hapus</button> </td>  
                                            </tr>
                                        ))} 
                                    </table>
                                ) : (
                                    <p style={{ display: 'flex', paddingTop: '10px', justifyContent: 'center', paddingLeft: '400px' }}>tidak ada data</p>
                            )}
                        </>
                    }
                    {(role ==='A-01' && level === 'level-4') && 
                        <>
                            <h1>Progress Pengajuan Surat</h1>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <div className='pagination'>
                                    <button className='left' onClick={handlePrev_Surat_a_kabalai}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_surat_role_a.currentPage} />
                                    <button className='right' onClick={handleNext_Surat_a_kabalai}><img src={right} alt="" /></button>
                                </div>
                                <div className='search'>
                                    <label className='pagination-label' htmlFor="">Bulan:</label>
                                    <select className='pagination-search' onChange={handleChangeSearchMonth} value={searchMonth} name="" id="">
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
                                    <label className='pagination-label' htmlFor="">Tahun:</label>
                                    <select className='pagination-search' value={currentYear} name="" id="">
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                    </select>
                                </div>
                            </div>                            
                            {surat_role_a_kabalai.length > 0 ? (
                                <table>
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
                                            <td style={{ textAlign: 'center' }}> <button onClick={() => handleOpenSurat(item.id_surat)} className='B-update'>Jawab</button> <br /> <button className='B-deleted'>Hapus</button> </td>  
                                            </tr>
                                        ))} 
                                    </table>
                                ) : (
                                    <p style={{ display: 'flex', paddingTop: '10px', justifyContent: 'center', paddingLeft: '400px' }}>tidak ada data</p>
                            )}
                        </>
                    }
                    {level === 'level-3' && 
                        <>
                            <h1>Progress Pengajuan Surat</h1>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <div className='pagination'>
                                    <button className='left' onClick={handlePrev_Surat_a_kabalai}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_surat_role_a.currentPage} />
                                    <button className='right' onClick={handleNext_Surat_a_kabalai}><img src={right} alt="" /></button>
                                </div>
                                <div className='search'>
                                    <label className='pagination-label' htmlFor="">Bulan:</label>
                                    <select className='pagination-search' onChange={handleChangeSearchMonth} value={searchMonth} name="" id="">
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
                                    <label className='pagination-label' htmlFor="">Tahun:</label>
                                    <select className='pagination-search' value={currentYear} name="" id="">
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                    </select>
                                </div>
                            </div>
                            {surat_role_b.length > 0 ? (
                                <table>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>Nomor</th>
                                        <th style={{ textAlign: 'center' }}>id Surat</th>
                                        <th style={{ textAlign: 'center' }}>Nama</th>
                                        <th style={{ textAlign: 'center' }}>Keterangan</th>
                                        <th style={{ textAlign: 'center' }}>Jabatan</th>
                                        <th style={{ textAlign: 'center' }}>Jenis Surat</th>
                                        <th style={{ textAlign: 'center' }}>Kasubbag Tata Usaha</th>
                                        <th style={{ textAlign: 'center' }}>Kepala Balai</th>
                                        <th style={{ textAlign: 'center' }}>Jumlah Cuti</th>
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
                                            <td style={{ textAlign: 'center'}}>{item.sisa_k}</td>
                                            <td style={{ textAlign: 'center' }}> <button onClick={() => handleOpenSurat(item.id_surat)} className='B-update'>Jawab</button> <br /> <button className='B-deleted'>Hapus</button> </td>  
                                            </tr>
                                        ))} 
                                    </table>
                                ) : (
                                    <p style={{ display: 'flex', paddingTop: '10px', justifyContent: 'center', paddingLeft: '400px' }}>tidak ada data</p>
                            )}
                        </>
                    }
                    </div>
                    {level === 'level-3' &&
                    <div className='content'>                     
                        <>
                            <h1>Daftar Pegawai</h1>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                <div className='pagination'>
                                    <button className='left' onClick={handlePrev_Account}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_account.currentPage} />
                                    <button className='right' onClick={handleNext_Account}><img src={right} alt="" /></button>
                                </div>
                                <div className='search'>
                                    <label className='pagination-label' htmlFor="">Nama: </label>
                                    <input className='pagination-search' onChange={handleChangeSearchName} type="text" />
                                </div>
                            </div>
                            {account.length > 0 ? (
                                <table>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>Nomor ID</th>
                                        <th style={{ textAlign: 'center' }}>Nama</th>
                                        <th style={{ textAlign: 'center' }}>Jumlah Cuti</th>
                                        <th style={{ textAlign: 'center' }}>Ubah</th>
                                    </tr>
                                    {account.map((item) => (
                                        <tr key={item.id_number}>
                                            <td style={{ textAlign: 'center' }}>{item.id_number}</td>
                                            <td style={{ textAlign: 'center' }}>{item.nama}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <input
                                                    type="number"
                                                    value={item.sisa_cuti}
                                                    onChange={e => handleChangeSisaCuti(e, item.id_number)}
                                                    style={{ textAlign: 'center' }}
                                                />
                                            </td>
                                            <td style={{ textAlign: 'center' }}><button onClick={(e) => handleUpdateSisaCuti(e, item.sisa_cuti, item.id_number)} className='B-update'>Ubah</button> </td>  
                                            </tr>
                                        ))} 
                                    </table>
                                ) : (
                                    <p style={{ display: 'flex', paddingTop: '10px', justifyContent: 'center', paddingLeft: '400px' }}>tidak ada data</p>
                            )}
                        </>                    
                    </div>  
                    }
                    {role === 'D-19' && 
                        <div className='content'>
                            <>
                                <h1>Absensi</h1>
                                <div className='pagination'>
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
