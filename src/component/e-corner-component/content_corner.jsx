import'../css/content.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import Profile from '../profile';
import { useNavigate, useParams } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import * as xlsx from 'xlsx';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import left from '../../assets/left.svg';
import right from '../../assets/right.svg';

const Content_Corner = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { level } = useParams();
    const { role } = useParams();
    const { role_sp } = useParams();
    const navigate = useNavigate();
    const storeidNumber = localStorage.getItem('id_number');
    const [identity, setIdentity] = useState([]);
    const [nama, setNama] = useState(identity.nama);
    const { nrk_nip } = useParams();
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
    const [e_corner, setEcorner] = useState([]);
    const [pagination_e_corner, setPagination_E_corner] = useState({
        currentPage: 1,
    });
    const getKlien_Corner = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/E-corner/get_client_ecorner_for_admin.php?page=${pagination_e_corner.currentPage}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_surat = {
                total: res1.data.total_records,
                currentPage: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setEcorner(response);
            setPagination_E_corner(pagination_surat);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const handleNext_Corner = () => {
        setPagination_E_corner({
            ...pagination_e_corner,
            currentPage: pagination_e_corner.currentPage + 1,
        })
    }
    const handlePrev_Corner = () => {
        setPagination_E_corner({
            ...pagination_e_corner,
            currentPage: pagination_e_corner.currentPage - 1,
        })
    }
    const [week_list, setWeek_lst] = useState([]);
    const [id_week, setId_week] = useState(week_list?.id_minggu || "-");
    const [week, setWeek] = useState(week_list?.minngu || "-");
    const [month, setMonth] = useState(week_list?.bulan || "-");
    const getWeek = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/E-corner/get_week_byActive.php`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data[0]);
            const response = res1.data.Data[0];
            setWeek_lst(response);
            setWeek(response.minngu);
            setMonth(response.bulan);
            setId_week(response.id_minggu);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const deletedClient = async (id) => {
        setIsLoading(true)
        try {
          const response = await axios.delete(`https://simantepbareta.cloud/API/E-corner/deleted_client.php?id=${id}`, {
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
          setIsLoading(false);
          alert("error code 104");
        }
    }
    const confirmDeleteCorner = (id) => {
        if (window.confirm("Apakah Anda yakin Surat ini di Hapuskan ?")) {
            deletedClient(id);
        }
    }    
    const [minggu, setMinggu] = useState('');
    const [bulan, setBulan] = useState('');
    const [nama_klien, setNama_Klien] = useState('');
    const handleChangeMinggu = (event) => {
        setMinggu(event.target.value);
        console.log(event.target.value);        
    }
    const handleChangeBulan = (event) => {
        setBulan(event.target.value);
        console.log(event.target.value);        
    }
    const handleChangeNamaKlien = (event) => {
        setNama_Klien(event.target.value);
        console.log(event.target.value);        
    }
    const [klien_search, setKlien_Search] = useState([]);
    const [pagination_search, setPagination_Search] = useState({
        currentPage: 1,
    });
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const handleChangeDate = (date) => {
        setStartDate(date[0]);
        setEndDate(date[1])
        console.log(date[0]);
        console.log(date[1]);        
    }
    const handleGetKlienSearch = async () => {
        setIsLoading(true)
        const baseUrl = `https://simantepbareta.cloud/API/E-corner/get_client_ecorner_for_admin_search.php?page=${pagination_search.currentPage}&id_bulan=${bulan}&id_minggu=${minggu}&nama_klien=${nama_klien}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_surat = {
                total: res1.data.total_records,
                currentPage: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setIsLoading(false);
            setKlien_Search(response);
            setPagination_Search(pagination_surat);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }    
    const handleOpenCorner = (id) => {
        navigate(`/Dashboard-E-Corner/${ level }/${role}/${role_sp}/${nama}/${encodeURIComponent(nrk_nip)}/Update_Klien/${id}`);
    }
    useEffect(() => {
    getIdentity();
    getKlien_Corner();
    getWeek();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination_e_corner?.currentPage]);
    const handleResetWeek = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        const payload = {        
        stat: "Disable",
        };
        try {
        const response = await axios.post(`https://simantepbareta.cloud/API/E-corner/reset_week.php?id_minggu=${id_week}`, payload, {
            headers: {
            "Content-Type": "multipart/form-data"
            }
        });      
        console.log(response.data);
        setTimeout(() => {
            setIsLoading(false);            
            alert(response.data.message);
            window.location.reload();
        }, 1000);
        } catch (error) {
        setIsLoading(false);
        console.log(error.response);
        alert("error code 103");
        }
    }
    const handleActiveWeek = async (event) => {
        setIsLoading(true);
        event.preventDefault();
        const payload = {
        id_bulan: bulan,
        startDate: format(startDate, 'yyyy/MM/dd'),
        endDate: format(endDate, 'yyyy/MM/dd'),
        stat: "Active",
        };
        try {
        const response = await axios.post(`https://simantepbareta.cloud/API/E-corner/active_week.php?id_minggu=${minggu}`, payload, {
            headers: {
            "Content-Type": "multipart/form-data"
            }
        });
        console.log(response.data);
        setTimeout(() => {
            setIsLoading(false);            
            alert(response.data.message);
            window.location.reload();
        }, 1000);
        } catch (error) {
        setIsLoading(false);
        console.log(error.response);
        alert("error code 103");
        }
    }
    return (
        <>
        <div className='container-fluid d-flex flex-column p-5 m-2 overflow-auto'>
        {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
            <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
        </div>} 
        <p className='content-header-p'>E-Corner/Database Klien E-Corner</p>
            <div className='d-flex flex-row align-items-center justify-content-between gap-5'>
                <h1 className=' content-header-title fw-bold mt-0'>E-Corner</h1>
                <Profile nama={nama} feature="mawasdiri" />
            </div>
            <div className='container-xxl content-display bg-green-old align-items-start' style={{borderRadius: '20px'}}>
                <div className='container-xxl d-flex flex-column gap-4'>
                    <div className=''>
                        {role_sp ==='S-06' && 
                            <>
                                <h1 className='content-title fw-bold mt-0'>Database Klien E-Corner</h1>                        
                                <div className='header-content'>
                                    <div className='d-flex flex-row gap-2'>
                                        <button className='left' onClick={handlePrev_Corner}><img src={left} alt="" /></button>
                                        <input className='page-number' type="text" value={pagination_e_corner.currentPage} />
                                        <button className='right' onClick={handleNext_Corner}><img src={right} alt="" /></button>                                
                                    </div>
                                </div>
                                {e_corner.length > 0 ? (
                                        <table className='table-spaced mt-3' border="1">
                                            <tr>
                                                <th style={{ textAlign: 'center' }}>Nomor</th>
                                                <th style={{ textAlign: 'center' }}>Nama Klien</th>
                                                <th style={{ textAlign: 'center' }}>Nama Klien (Inisial)</th>
                                                <th style={{ textAlign: 'center' }}>Room</th>
                                                <th style={{ textAlign: 'center' }}>Time</th>
                                                <th style={{ textAlign: 'center' }}>Hari</th>
                                                <th style={{ textAlign: 'center' }}>Status</th>
                                            </tr>
                                            {e_corner.map((item, index) => (
                                                <tr key={item.id_surat}>
                                                    <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.nama_klien}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.nama_init}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.rooms}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.time}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.days}</td>                                                
                                                    <td style={{ textAlign: 'center' }}> <button onClick={() => handleOpenCorner(item.id_corner)} className='B-update'>Update</button> | <button onClick={() => confirmDeleteCorner(item.id_corner)} className='B-deleted'>Deleted</button> </td>  
                                                    </tr>
                                                ))} 
                                        </table>
                                    ) : (
                                        <p className='no-data-p mt-5 text-center'>tidak ada data</p>
                                )}
                            </>
                        }                        
                    </div>
                    <div className=''>
                        {role_sp ==='S-06' && 
                            <div className='container-xxl d-flex flex-column gap-4'>
                                <h1 className='content-title fw-bold mt-0'>Pencarian Bulan dan Minggu</h1>
                                <div style={{display: "flex", flexDirection: "row", gap: "15px"}}>
                                    <form action="">
                                        <div className='ecorner-filter-content'>
                                            <div className='ecorner-filter'>
                                                <label className='text-month-search fw-bold' htmlFor="Bulan">Pilih Bulan :</label>
                                                <select className='ecorner-filter-input rounded-3 pe-3 ps-3' onChange={handleChangeBulan} name="Bulan" id="Bulan">
                                                    <option value="0">Pilih Bulan :</option>
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
                                            </div>
                                            <div className='ecorner-filter'>
                                                <label className='text-month-search fw-bold' htmlFor="Minngu">Pilih Minggu ke- :</label>
                                                <select className='ecorner-filter-input rounded-3 pe-3 ps-3' onChange={handleChangeMinggu} style={{marginRight: "50px"}} name="Minggu" id="Minggu">
                                                    <option value="0">Pilih Minggu ke- </option>
                                                    <option value="1">Minggu ke 1</option>
                                                    <option value="2">Minggu ke 2</option>
                                                    <option value="3">Minggu ke 3</option>
                                                    <option value="4">Minggu ke 4</option>
                                                    <option value="5">Minggu ke 5</option>
                                                </select>                                            
                                            </div>
                                        </div>
                                        <br />
                                        <div className='ecorner-filter-content'>
                                            <div className='ecorner-filter'>
                                                <label className='text-month-search fw-bold' htmlFor="date">Tanggal: </label>
                                                <DatePicker
                                                    className='ecorner-filter-input rounded-3 pe-3 ps-3'
                                                    selectsRange={true}
                                                    startDate={startDate}
                                                    endDate={endDate}
                                                    onChange={handleChangeDate}
                                                    dateFormat="yyyy/MM/dd"
                                                    placeholderText="Pilih Tanggal"
                                                />                                                
                                            </div>
                                            <div className='header-month'>
                                                <div className='ecorner-filter'>
                                                    <label className='text-month-search fw-bold' htmlFor="">Nama Klien: </label>
                                                    <input className='ecorner-filter-input rounded-3 pe-3 ps-3' placeholder='Nama Klien' type="text" onChange={handleChangeNamaKlien} />                                            
                                                </div>
                                            </div>
                                            <div className='header-month'>
                                                <button className='btn btn-secondary' onClick={() => handleGetKlienSearch()} type="button">Cari</button>
                                                <button className='btn btn-success' onClick={(event) => handleActiveWeek(event)} type="button">Aktifkan</button>                                        
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <h1 className='text-white fs-2 fw-bold mt-0'>Aktif Saat ini</h1>
                                <form className='d-flex flex-row gap-4 text-white' action="">
                                    <label htmlFor="">id: {id_week}</label>
                                    <label htmlFor="Bulan">Bulan saat ini : {month}</label>                                    
                                    <label style={{marginRight:"50px"}} htmlFor="Minngu">Minggu Saat ini : {week}</label>                                    
                                    <button className='btn btn-danger' onClick={(event) => handleResetWeek(event)} type="button">Reset</button>
                                </form>
                            </div>
                        }
                    </div>
                    <div className=''>
                        {role_sp ==='S-06' &&
                            <>
                                <h1 className='content-title fw-bold mt-0'>Hasil Pencarian Klien E-Corner</h1>                        
                                <div className='d-flex flex-row gap-2'>
                                    <button className='left' onClick={handlePrev_Corner}><img src={left} alt="" /></button>
                                    <button className='right' onClick={handleNext_Corner}><img src={right} alt="" /></button>
                                </div>
                                {klien_search.length > 0 ? (
                                    <div className='mt-3 container-xxl d-flex flex-column gap-4'>
                                        <table className='table-spaced' border="1">
                                            <tr>
                                                <th style={{ textAlign: 'center' }}>Nomor</th>
                                                <th style={{ textAlign: 'center' }}>Nama Klien</th>
                                                <th style={{ textAlign: 'center' }}>Nama Klien (Inisial)</th>
                                                <th style={{ textAlign: 'center' }}>Room</th>
                                                <th style={{ textAlign: 'center' }}>Time</th>
                                                <th style={{ textAlign: 'center' }}>Hari</th>
                                                <th style={{ textAlign: 'center' }}>Status</th>
                                            </tr>
                                            {klien_search.map((item_s, index) => (
                                                <tr key={item_s.id_corner}>
                                                    <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                    <td style={{ textAlign: 'center' }}>{item_s.nama_klien}</td>
                                                    <td style={{ textAlign: 'center' }}>{item_s.nama_init}</td>
                                                    <td style={{ textAlign: 'center' }}>{item_s.rooms}</td>
                                                    <td style={{ textAlign: 'center' }}>{item_s.time}</td>
                                                    <td style={{ textAlign: 'center' }}>{item_s.days}</td>                                                
                                                    <td style={{ textAlign: 'center' }}> <button onClick={() => handleOpenCorner(item_s.id_corner)} className='B-update'>Update</button> | <button onClick={() => confirmDeleteCorner(item_s.id_corner)} className='B-deleted'>Deleted</button> </td>  
                                                </tr>
                                            ))} 
                                        </table>
                                    </div>
                                    ) : (
                                    <p className='no-data-p mt-5 text-center'>tidak ada data</p>
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

export default Content_Corner;
