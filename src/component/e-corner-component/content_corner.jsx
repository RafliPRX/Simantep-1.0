import'../Mawasdiri-component/content.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import Profile from '../profile';
import { useNavigate, useParams } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
// import * as xlsx from 'xlsx';

const Content_Corner = () => {
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
    const confirmDeleteCorner = (id) => {
        if (window.confirm("Apakah Anda yakin Surat ini di Hapuskan ?")) {
            deletedSurat(id);
        }
    }    
    
    const [minggu, setMinggu] = useState('');
    const [bulan, setBulan] = useState('');
    const handleChangeMinggu = (event) => {
        setMinggu(event.target.value);
        console.log(event.target.value);
        
    }
    const handleChangeBulan = (event) => {
        setBulan(event.target.value);
        console.log(event.target.value);
        
    }
    const [klien_search, setKlien_Search] = useState([]);
    const [pagination_search, setPagination_Search] = useState({
        currentPage: 1,
    });
    const handleGetKlienSearch = async () => {
        setIsLoading(true)
        const baseUrl = `https://simantepbareta.cloud/API/E-corner/get_client_ecorner_for_admin_search.php?page=${pagination_search.currentPage}&id_bulan=${bulan}&id_minggu=${minggu}`;
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
        navigate(`/Dashboard/${level}/${role}/${role_sp}/Cuti-detail/${id}`);
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
        <div className='main-dashboard'>
        {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
            <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
        </div>} 
        <p>Mawasdiri/Dashboard</p>
            <h1>Main Dashboard</h1>
            <Profile nama={nama} feature="mawasdiri" />
            <div className='content-col'>
                <div className='box-m'>
                    <div className='content'>
                        {role_sp ==='S-06' && 
                            <>
                                <h1>Database Klien E-Corner</h1>                        
                                <div>
                                    <button onClick={handlePrev_Corner}>Previous</button>
                                    <button onClick={handleNext_Corner}>Next</button>
                                </div>
                                {e_corner.length > 0 ? (
                                    <table>
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
                                                <td style={{ textAlign: 'center' }}> <button onClick={() => handleOpenCorner(item.id_surat)} className='B-update'>Update</button> | <button onClick={() => confirmDeleteCorner(item.id_surat)} className='B-deleted'>Deleted</button> </td>  
                                                </tr>
                                            ))} 
                                        </table>
                                    ) : (
                                        <p style={{ display: 'flex', paddingTop: '10px', justifyContent: 'center', paddingLeft: '400px' }}>tidak ada data</p>
                                )}
                            </>
                        }                        
                    </div>
                    <div className='content'>
                        {role_sp ==='S-06' && 
                            <>
                                <h1>Pencarian Bulan dan Minggu</h1>
                                <form action="">                                    
                                    <label htmlFor="Bulan">Pilih Bulan :</label>
                                    <select onChange={handleChangeBulan} name="Bulan" id="Bulan">
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
                                    <label htmlFor="Minngu">Pilih Minggu ke- :</label>
                                    <select onChange={handleChangeMinggu} style={{marginRight: "50px"}} name="Minggu" id="Minggu">
                                        <option value="0">Pilih Minggu ke- </option>
                                        <option value="1">Minggu ke 1</option>
                                        <option value="2">Minggu ke 2</option>
                                        <option value="3">Minggu ke 3</option>
                                        <option value="4">Minggu ke 4</option>
                                    </select>
                                    <button className='cari' onClick={() => handleGetKlienSearch()} type="button">Cari</button>
                                    <button className='active' onClick={(event) => handleActiveWeek(event)} type="button">Aktifkan</button>
                                </form>
                                <h1>Aktif Saat ini</h1>
                                <form action="">
                                    <label htmlFor="">id: {id_week}</label>
                                    <label htmlFor="Bulan">Bulan saat ini : {month}</label>                                    
                                    <label style={{marginRight:"50px"}} htmlFor="Minngu">Minggu Saat ini : {week}</label>
                                    <button className='reset' onClick={(event) => handleResetWeek(event)} type="button">Reset</button>
                                </form>
                            </>
                        }
                    </div>
                    <div className='content'>
                        {role_sp ==='S-06' &&
                            <>
                                <h1>Hasil Pencarian Klien E-Corner</h1>                        
                                <div>
                                    <button onClick={handlePrev_Corner}>Previous</button>
                                    <button onClick={handleNext_Corner}>Next</button>
                                </div>
                                {klien_search.length > 0 ? (
                                    <table>
                                        <tr>
                                            <th style={{ textAlign: 'center' }}>Nomor</th>
                                            <th style={{ textAlign: 'center' }}>Nama Klien</th>
                                            <th style={{ textAlign: 'center' }}>Nama Klien (Inisial)</th>
                                            <th style={{ textAlign: 'center' }}>Room</th>
                                            <th style={{ textAlign: 'center' }}>Time</th>
                                            <th style={{ textAlign: 'center' }}>Hari</th>
                                            <th style={{ textAlign: 'center' }}>Status</th>
                                        </tr>
                                        {klien_search.map((item, index) => (
                                            <tr key={item.id_surat}>
                                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                <td style={{ textAlign: 'center' }}>{item.nama_klien}</td>
                                                <td style={{ textAlign: 'center' }}>{item.nama_init}</td>
                                                <td style={{ textAlign: 'center' }}>{item.rooms}</td>
                                                <td style={{ textAlign: 'center' }}>{item.time}</td>
                                                <td style={{ textAlign: 'center' }}>{item.days}</td>                                                
                                                <td style={{ textAlign: 'center' }}> <button onClick={() => handleOpenCorner(item.id_surat)} className='B-update'>Update</button> | <button onClick={() => confirmDeleteCorner(item.id_surat)} className='B-deleted'>Deleted</button> </td>  
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

export default Content_Corner;
