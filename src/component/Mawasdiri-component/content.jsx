import './content.css';
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
    const navigate = useNavigate();
    const storeidNumber = localStorage.getItem('id_number');
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
        const baseUrl = `https://simantepbareta.cloud/API/MAWASDIRI/Cuti/surat_by_name.php?id=${storeidNumber}&page=${pagination_surat.currentPage}`;
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
    const [surat_role_c, setSurat_role_c] = useState([]);
    const [pagination_surat_role_c, setPagination_surat_role_c] = useState({
        currentPage: 1,
    });        
    const getSurat_role_c = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/MAWASDIRI/Cuti/surat_by_role_c.php?kode_role=${role}&page=${pagination_surat_role_c.currentPage}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_surat_c = {
                total: res1.data.total_records,
                currentPage: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setSurat_role_c(response);
            setPagination_surat_role_c(pagination_surat_c);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const handleNext_Surat_c = () => {
        setPagination_surat_role_c({
            ...pagination_surat_role_c,
            currentPage: pagination_surat_role_c.currentPage + 1,
        })
    }
    const handlePrev_Surat_c = () => {
        setPagination_surat_role_c({
            ...pagination_surat_role_c,
            currentPage: pagination_surat_role_c.currentPage - 1,
        })
    }  
    const [surat_role_b, setSurat_role_b] = useState([]);
    const [pagination_surat_role_b, setPagination_surat_role_b] = useState({
        currentPage: 1,
    });        
    const getSurat_role_b = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/MAWASDIRI/Cuti/surat_by_role_b.php?kode_role=${role}&page=${pagination_surat_role_b.currentPage}`;
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
    const getSurat_role_a = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/MAWASDIRI/Cuti/surat_by_role_a.php?kode_role=${role}&page=${pagination_surat_role_a.currentPage}`;
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
    const handleNext_Surat_a = () => {
        setPagination_surat_role_a({
            ...pagination_surat_role_a,
            currentPage: pagination_surat_role_a.currentPage + 1,
        })
    }
    const handlePrev_Surat_a = () => {
        setPagination_surat_role_a({
            ...pagination_surat_role_a,
            currentPage: pagination_surat_role_a.currentPage - 1,
        })
    }  
    const [surat_role_sp, setSurat_role_sp] = useState([]);
    const [pagination_surat_role_sp, setPagination_surat_role_sp] = useState({
        currentPage: 1,
    });        
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
    useEffect(() => {
    getIdentity();
    getSurat();
    getSurat_role_c();
    getSurat_role_b();
    getSurat_role_a();
    getSurat_role_sp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination_surat?.currentPage, pagination_surat_role_c?.currentPage, pagination_surat_role_b?.currentPage, pagination_surat_role_a?.currentPage, pagination_surat_role_sp?.currentPage]);

    

    return (
        <>
        <div className='main-dashboard'>
        {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
            <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
        </div>} 
        <p>Mawasdiri/Database Pegawai</p>
            <h1>Manajemen Pegawai Berbasis Kinerja Mandiri</h1>
            <Profile nama={nama} feature="mawasdiri" />
            <div className='content-col'>
                <div className='box-m'>
                    <div className='content'>
                        {level === 'level-1' && (
                            <>
                                {role_sp === '0' ? (
                                    <>
                                        <h1>Progress Pengajuan Surat</h1>
                                        <div className='pagination'>
                                            <button className='left' onClick={handlePrev_Surat}><img src={left} alt="" /></button>
                                            <input className='page-number' type="text" value={pagination_surat.currentPage} />
                                            <button className='right' onClick={handleNext_Surat}><img src={right} alt="" /></button>
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
                                                    <th style={{ textAlign: 'center' }}>PJ/PM/Koordinator</th>
                                                    <th style={{ textAlign: 'center' }}>Kepegawaian</th>
                                                    <th style={{ textAlign: 'center' }}>Kasubag Tata Usaha</th>
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
                                                        <td style={{ textAlign: 'center', display: item.veri_1 === '1' ? '' : 'none' }}><img src={white} alt="" />Unread</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_1 === '2' ? '' : 'none' }}><img src={red} alt="" />Delay</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_1 === '3' ? '' : 'none' }}><img src={green} alt="" />Approved</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_2 === '1' ? '' : 'none' }}><img src={white} alt="" />Unread</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_2 === '2' ? '' : 'none' }}><img src={red} alt="" />Delay</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_2 === '3' ? '' : 'none' }}><img src={green} alt="" />Approved</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_3 === '1' ? '' : 'none' }}><img src={white} alt="" />Unread</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_3 === '2' ? '' : 'none' }}><img src={red} alt="" />Delay</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_3 === '3' ? '' : 'none' }}><img src={green} alt="" />Approved</td>
                                                        <td style={{ textAlign: 'center' }}> <button onClick={() => handleOpenSurat(item.id_surat)} className='B-update'>Update</button> | <button onClick={() => confirmDeleteSurat(item.id_surat)} className='B-deleted'>Deleted</button> </td>  
                                                    </tr>
                                                ))} 
                                            </table>
                                        ) : (
                                            <p style={{ display: 'flex', paddingTop: '10px', justifyContent: 'center', paddingLeft: '400px' }}>tidak ada data</p>
                                        )}
                                    </>
                                ) : role_sp === 'S-02' ? (
                                    <>
                                        <h1>Progress Pengajuan Surat</h1>
                                        <div className='pagination'>
                                            <button className='left' onClick={handlePrev_Surat_sp}><img src={left} alt="" /></button>
                                            <input className='page-number' type="text" value={pagination_surat_role_sp.currentPage} />
                                            <button className='right' onClick={handleNext_Surat_sp}><img src={right} alt="" /></button>
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
                                                    <th style={{ textAlign: 'center' }}>PJ/PM/Koordinator</th>
                                                    <th style={{ textAlign: 'center' }}>Kepegawaian</th>
                                                    <th style={{ textAlign: 'center' }}>Kasubag Tata Usaha</th>
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
                                                        <td style={{ textAlign: 'center', display: item.veri_1 === '1' ? '' : 'none' }}><img src={white} alt="" />Unread</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_1 === '2' ? '' : 'none' }}><img src={red} alt="" />Delay</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_1 === '3' ? '' : 'none' }}><img src={green} alt="" />Approved</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_2 === '1' ? '' : 'none' }}><img src={white} alt="" />Unread</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_2 === '2' ? '' : 'none' }}><img src={red} alt="" />Delay</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_2 === '3' ? '' : 'none' }}><img src={green} alt="" />Approved</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_3 === '1' ? '' : 'none' }}><img src={white} alt="" />Unread</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_3 === '2' ? '' : 'none' }}><img src={red} alt="" />Delay</td>
                                                        <td style={{ textAlign: 'center', display: item.veri_3 === '3' ? '' : 'none' }}><img src={green} alt="" />Approved</td>
                                                        <td style={{ textAlign: 'center' }}> <button onClick={() => handleOpenSurat(item.id_surat)} className='B-update'>Update</button> | <button onClick={() => confirmDeleteSurat(item.id_surat)} className='B-deleted'>Deleted</button> </td>  
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
                        {level ==='level-2' && 
                            <>
                                <h1>Progress Pengajuan Surat</h1>
                                <div className='pagination'>
                                    <button className='left' onClick={handlePrev_Surat_c}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_surat_role_c.currentPage} />
                                    <button className='right' onClick={handleNext_Surat_c}><img src={right} alt="" /></button>
                                </div>
                                {surat_role_c.length > 0 ? (
                                    <table>
                                        <tr>
                                            <th style={{ textAlign: 'center' }}>Nomor</th>
                                            <th style={{ textAlign: 'center' }}>id Surat</th>
                                            <th style={{ textAlign: 'center' }}>Nama</th>
                                            <th style={{ textAlign: 'center' }}>Keterangan</th>
                                            <th style={{ textAlign: 'center' }}>Jabatan</th>
                                            <th style={{ textAlign: 'center' }}>Jenis Surat</th>
                                            <th style={{ textAlign: 'center' }}>PJ/PM/Koordinator</th>
                                            <th style={{ textAlign: 'center' }}>Kepegawaian</th>
                                            <th style={{ textAlign: 'center' }}>Kasubag Tata Usaha</th>
                                            <th style={{ textAlign: 'center' }}>Opsi Lain</th>
                                        </tr>
                                        {surat_role_c.map((item, index) => (
                                            <tr key={item.id_surat}>
                                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                <td style={{ textAlign: 'center' }}>{item.id_surat}</td>
                                                <td style={{ textAlign: 'center' }}>{item.nama}</td>
                                                <td style={{ textAlign: 'center' }}>{item.Keterangan}</td>
                                                <td style={{ textAlign: 'center' }}>{item.jabatan}</td>
                                                <td style={{ textAlign: 'center' }}>{item.jenis_surat}</td>
                                                <td style={{ textAlign: 'center', display: item.veri_1 === '1' ? '' : 'none' }}><img src={white} alt="" />Unread</td>
                                                <td style={{ textAlign: 'center', display: item.veri_1 === '2' ? '' : 'none' }}><img src={red} alt="" />Delay</td>
                                                <td style={{ textAlign: 'center', display: item.veri_1 === '3' ? '' : 'none' }}><img src={green} alt="" />Approved</td>
                                                <td style={{ textAlign: 'center', display: item.veri_2 === '1' ? '' : 'none' }}><img src={white} alt="" />Unread</td>
                                                <td style={{ textAlign: 'center', display: item.veri_2 === '2' ? '' : 'none' }}><img src={red} alt="" />Delay</td>
                                                <td style={{ textAlign: 'center', display: item.veri_2 === '3' ? '' : 'none' }}><img src={green} alt="" />Approved</td>
                                                <td style={{ textAlign: 'center', display: item.veri_3 === '1' ? '' : 'none' }}><img src={white} alt="" />Unread</td>
                                                <td style={{ textAlign: 'center', display: item.veri_3 === '2' ? '' : 'none' }}><img src={red} alt="" />Delay</td>
                                                <td style={{ textAlign: 'center', display: item.veri_3 === '3' ? '' : 'none' }}><img src={green} alt="" />Approved</td>
                                                <td style={{ textAlign: 'center' }}> <button onClick={() => handleOpenSurat(item.id_surat)} className='B-update'>Update</button> | <button className='B-deleted'>Deleted</button> </td>  
                                                </tr>
                                            ))} 
                                        </table>
                                    ) : (
                                        <p style={{ display: 'flex', paddingTop: '10px', justifyContent: 'center', paddingLeft: '400px' }}>tidak ada data</p>
                                )}
                            </>
                        }
                        {level ==='level-3' && 
                            <>
                                <h1>Progress Pengajuan Surat</h1>
                                <div className='pagination'>
                                    <button className='left' onClick={handlePrev_Surat_b}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_surat_role_b.currentPage} />
                                    <button className='right' onClick={handleNext_Surat_b}><img src={right} alt="" /></button>
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
                                            <th style={{ textAlign: 'center' }}>PJ/PM/Koordinator</th>
                                            <th style={{ textAlign: 'center' }}>Kepegawaian</th>
                                            <th style={{ textAlign: 'center' }}>Kasubag Tata Usaha</th>
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
                                                <td style={{ textAlign: 'center', display: item.veri_1 === '1' ? '' : 'none' }}><img src={white} alt="" />Unread</td>
                                                <td style={{ textAlign: 'center', display: item.veri_1 === '2' ? '' : 'none' }}><img src={red} alt="" />Delay</td>
                                                <td style={{ textAlign: 'center', display: item.veri_1 === '3' ? '' : 'none' }}><img src={green} alt="" />Approved</td>
                                                <td style={{ textAlign: 'center', display: item.veri_2 === '1' ? '' : 'none' }}><img src={white} alt="" />Unread</td>
                                                <td style={{ textAlign: 'center', display: item.veri_2 === '2' ? '' : 'none' }}><img src={red} alt="" />Delay</td>
                                                <td style={{ textAlign: 'center', display: item.veri_2 === '3' ? '' : 'none' }}><img src={green} alt="" />Approved</td>
                                                <td style={{ textAlign: 'center', display: item.veri_3 === '1' ? '' : 'none' }}><img src={white} alt="" />Unread</td>
                                                <td style={{ textAlign: 'center', display: item.veri_3 === '2' ? '' : 'none' }}><img src={red} alt="" />Delay</td>
                                                <td style={{ textAlign: 'center', display: item.veri_3 === '3' ? '' : 'none' }}><img src={green} alt="" />Approved</td>
                                                <td style={{ textAlign: 'center' }}> <button onClick={() => handleOpenSurat(item.id_surat)} className='B-update'>Update</button> | <button className='B-deleted'>Deleted</button> </td>  
                                                </tr>
                                            ))} 
                                        </table>
                                    ) : (
                                        <p style={{ display: 'flex', paddingTop: '10px', justifyContent: 'center', paddingLeft: '400px' }}>tidak ada data</p>
                                )}
                            </>
                        }
                        {level ==='level-4' && 
                            <>
                                <h1>Progress Pengajuan Surat</h1>
                                <div className='pagination'>
                                    <button className='left' onClick={handlePrev_Surat_a}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_surat_role_a.currentPage} />
                                    <button className='right' onClick={handleNext_Surat_a}><img src={right} alt="" /></button>
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
                                            <th style={{ textAlign: 'center' }}>PJ/PM/Koordinator</th>
                                            <th style={{ textAlign: 'center' }}>Kepegawaian</th>
                                            <th style={{ textAlign: 'center' }}>Kasubag Tata Usaha</th>
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
                                                <td style={{ textAlign: 'center', display: item.veri_1 === '1' ? '' : 'none' }}><img src={white} alt="" />Unread</td>
                                                <td style={{ textAlign: 'center', display: item.veri_1 === '2' ? '' : 'none' }}><img src={red} alt="" />Delay</td>
                                                <td style={{ textAlign: 'center', display: item.veri_1 === '3' ? '' : 'none' }}><img src={green} alt="" />Approved</td>
                                                <td style={{ textAlign: 'center', display: item.veri_2 === '1' ? '' : 'none' }}><img src={white} alt="" />Unread</td>
                                                <td style={{ textAlign: 'center', display: item.veri_2 === '2' ? '' : 'none' }}><img src={red} alt="" />Delay</td>
                                                <td style={{ textAlign: 'center', display: item.veri_2 === '3' ? '' : 'none' }}><img src={green} alt="" />Approved</td>
                                                <td style={{ textAlign: 'center', display: item.veri_3 === '1' ? '' : 'none' }}><img src={white} alt="" />Unread</td>
                                                <td style={{ textAlign: 'center', display: item.veri_3 === '2' ? '' : 'none' }}><img src={red} alt="" />Delay</td>
                                                <td style={{ textAlign: 'center', display: item.veri_3 === '3' ? '' : 'none' }}><img src={green} alt="" />Approved</td>
                                                <td style={{ textAlign: 'center' }}> <button onClick={() => handleOpenSurat(item.id_surat)} className='B-update'>Update</button> | <button className='B-deleted'>Deleted</button> </td>  
                                                </tr>
                                            ))} 
                                        </table>
                                    ) : (
                                        <p style={{ display: 'flex', paddingTop: '10px', justifyContent: 'center', paddingLeft: '400px' }}>tidak ada data</p>
                                )}
                            </>
                        }                        
                    </div>     
                </div>
            </div>
        </div>
        </>
    )
}

export default Content;
