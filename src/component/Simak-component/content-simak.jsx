/* eslint-disable react-hooks/exhaustive-deps */
import '../css/content.css'
import green from '../../assets/green.svg'
import white from '../../assets/unread.svg'
import red from '../../assets/decline.svg'
import left from '../../assets/left.svg'
import right from '../../assets/right.svg'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../profile'
const Content_simak = () => {
    const storedUsername = localStorage.getItem('nama');
    const storeNrk = localStorage.getItem('nrk');
    const storedSisaCuti = localStorage.getItem('sisa_cuti');
    const storedFProfile = localStorage.getItem('f_profile');
    const pj = localStorage.getItem('pj');
    const [isLoading, setIsLoading] = useState(false);  
    console.log(storedUsername);
    console.log(storedSisaCuti );
    console.log(storedFProfile);
    console.log(storeNrk);
    console.log(pj);
    const { role } = useParams();
    const { level } = useParams();
    const { role_sp } = useParams();
        const date = new Date();
        const currentMonth = String(date.getMonth() + 1).padStart(2, '0');
        const currentYear = date.getFullYear();
    const [searchMonth, setSearchMonth] = useState(currentMonth);
    const [lpj_searchmonth, setLpj_SearchMonth] = useState(currentMonth);
    const [searchYear, setSearchYear] = useState(currentYear);
    const [lpj_searchyear, setLpj_SearchYear] = useState(currentYear);
    const [total_rpd_searchmonth, setTotal_Rpd_SearchMonth] = useState(currentMonth);
    const [total_rpd_searchyear, setTotal_Rpd_SearchYear] = useState(currentYear);
    const [jenis_dokumen, setJenis_Dokumen] = useState("");
    // console.log("Tahun ini:" +currentYear);
    const storeidNumber = localStorage.getItem('id_number');
    const [dana, setDana] = useState([]);
    const [pagination_dana, setPagination_Dana] = useState({
        current_page: 1,
    });
    const navigate = useNavigate();
    const getDana = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/SIMAK/Dana_RPD/dana_by_name.php?id_number=${storeidNumber}&page=${pagination_dana.current_page}&nama=${storedUsername}&bulan=${searchMonth}&tahun=${searchYear}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_dana = {
                total: res1.data.total_records,
                current_page: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setDana(response);
            setPagination_Dana(pagination_dana);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [dana_moneymaker, setDana_moneymaker] = useState([]);
    const [pagination_dana_moneymaker, setPagination_Dana_moneymaker] = useState({
        current_page: 1,
    });
    const getDana_moneymaker = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/SIMAK/Dana_RPD/dana.php?page=${pagination_dana_moneymaker.current_page}&nama=${storedUsername}&bulan=${searchMonth}&tahun=${searchYear}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_dana = {
                total: res1.data.total_records,
                current_page: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setDana_moneymaker(response);
            setPagination_Dana_moneymaker(pagination_dana);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [dana_lv4, setDana_lv4] = useState([]);
    const [pagination_dana_lv4, setPagination_Dana_lv4] = useState({
        current_page: 1,
    });
    const getDana_lv4 = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/SIMAK/Dana_RPD/dana_lv4.php?page=${pagination_dana_lv4.current_page}&bulan=${searchMonth}&tahun=${searchYear}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_dana = {
                total: res1.data.total_records,
                current_page: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setDana_lv4(response);
            setPagination_Dana_lv4(pagination_dana);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [lpj, setLpj] = useState([]);
    const [pagination_lpj, setPagination_lpj] = useState({
        current_page: 1,
    })
    const getLpj = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/dana_lpj_by_name.php?id_number=${storeidNumber}&page=${pagination_lpj.current_page}&bulan=${lpj_searchmonth}&tahun=${lpj_searchyear}&nama=Riah%20Yuningsih&dokumen=${jenis_dokumen}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_lpj = {
                total: res1.data.total_records,
                current_page: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setLpj(response);
            setPagination_lpj(pagination_lpj);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [lpj_admin, setLpj_admin] = useState([]);
    const [pagination_lpj_admin, setPagination_lpj_admin] = useState({
        current_page: 1,
    })
    const getLpj_admin = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/dana_lpj_adm.php?nama=${storedUsername}&page=${pagination_lpj_admin.current_page}&bulan=${lpj_searchmonth}&tahun=${lpj_searchyear}&dokumen=${jenis_dokumen}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_lpj = {
                total: res1.data.total_records,
                current_page: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setLpj_admin(response);
            setPagination_lpj_admin(pagination_lpj);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [lpj_lv1, setLpj_lv1] = useState([]);
    const [pagination_lpj_lv1, setPagination_lpj_lv1] = useState({
        current_page: 1,
    })
    const getLpj_lv1 = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/dana_lpj_lv1.php?page=${pagination_lpj_lv1.current_page}&bulan=${lpj_searchmonth}&tahun=${lpj_searchyear}&nama=${storedUsername}&dokumen=${jenis_dokumen}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_lpj = {
                total: res1.data.total_records,
                current_page: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setLpj_lv1(response);
            setPagination_lpj_lv1(pagination_lpj);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [lpj_lv2, setLpj_lv2] = useState([]);
    const [pagination_lpj_lv2, setPagination_lpj_lv2] = useState({
        current_page: 1,
    })
    const getLpj_lv2 = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/dana_lpj_lv2.php?page=${pagination_lpj_lv2.current_page}&bulan=${lpj_searchmonth}&tahun=${lpj_searchyear}&nama=${storedUsername}&dokumen=${jenis_dokumen}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_lpj = {
                total: res1.data.total_records,
                current_page: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setLpj_lv2(response);
            setPagination_lpj_lv2(pagination_lpj);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [lpj_keuangan, setLpj_keuangan] = useState([]);
    const [pagination_lpj_keuangan, setPagination_lpj_keuangan] = useState({
        current_page: 1,
    })
    const getLpj_keuangan = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/dana_lpj_keuangan.php?page=${pagination_lpj_keuangan.current_page}&bulan=${lpj_searchmonth}&tahun=${lpj_searchyear}&nama=${storedUsername}&dokumen=${jenis_dokumen}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_lpj = {
                total: res1.data.total_records,
                current_page: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setLpj_keuangan(response);
            setPagination_lpj_keuangan(pagination_lpj);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [total_rpd, setTotal_rpd] = useState([]);
    const getTotal_RPD = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/SIMAK/Dana_RPD/total_dana_rpd.php?bulan=${total_rpd_searchmonth}&tahun=${total_rpd_searchyear}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            setTotal_rpd(response);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        getDana();
        getDana_moneymaker();
        getLpj();
        getLpj_admin();
        getLpj_lv1();
        getLpj_lv2();
        getLpj_keuangan();
        getTotal_RPD();
        getDana_lv4();
    },[
        pagination_lpj?.current_page, pagination_lpj_lv1?.current_page, pagination_lpj_lv2?.current_page, pagination_lpj_keuangan?.current_page,
        pagination_dana?.current_page, pagination_dana_moneymaker?.current_page, searchMonth, lpj_searchmonth, total_rpd_searchmonth, total_rpd_searchyear, lpj_searchyear, searchYear, jenis_dokumen,
        pagination_lpj_admin?.current_page
    ]);
    
    const handleNext_Lpj = () => {
        setPagination_lpj({
            ...pagination_lpj,
            current_page: pagination_lpj?.current_page + 1
        })
        
    }
    const handlePrev_Lpj = () => {
        setPagination_lpj({
            ...pagination_lpj,
            current_page: pagination_lpj?.current_page - 1
        })
    }
    const handleNext_Lpj_admin = () => {
        setPagination_lpj_admin({
            ...pagination_lpj_admin,
            current_page: pagination_lpj_admin?.current_page + 1
        })
        
    }
    const handlePrev_Lpj_admin = () => {
        setPagination_lpj_admin({
            ...pagination_lpj_admin,
            current_page: pagination_lpj_admin?.current_page - 1
        })
    }
    const handleNext_Lpj_lv1 = () => {
        setPagination_lpj_lv1({
            ...pagination_lpj_lv1,
            current_page: pagination_lpj_lv1?.current_page + 1
        })
        
    }
    const handlePrev_Lpj_lv1 = () => {
        setPagination_lpj_lv1({
            ...pagination_lpj_lv1,
            current_page: pagination_lpj_lv1?.current_page - 1
        })
    }
    const handleNext_Lpj_lv2 = () => {
        setPagination_lpj_lv2({
            ...pagination_lpj_lv2,
            current_page: pagination_lpj_lv2?.current_page + 1
        })
        
    }
    const handlePrev_Lpj_lv2 = () => {
        setPagination_lpj_lv2({
            ...pagination_lpj_lv2,
            current_page: pagination_lpj_lv2?.current_page - 1
        })
    }
    const handleNext_Lpj_keuangan = () => {
        setPagination_lpj_keuangan({
            ...pagination_lpj_keuangan,
            current_page: pagination_lpj_keuangan?.current_page + 1
        })
        
    }
    const handlePrev_Lpj_keuangan = () => {
        setPagination_lpj_keuangan({
            ...pagination_lpj_keuangan,
            current_page: pagination_lpj_keuangan?.current_page - 1
        })
    }
    const handleNext_Dana = () => {
        setPagination_Dana({
            ...pagination_dana,
            current_page: pagination_dana?.current_page + 1
        })
        console.log(pagination_dana?.current_page);
    }
    const handleNext_Dana_MoneyMaker = () => {
        setPagination_Dana_moneymaker({
            ...pagination_dana_moneymaker,
            current_page: pagination_dana_moneymaker?.current_page + 1
        })
        console.log(pagination_dana_moneymaker?.current_page);
    }
    const handleNext_Dana_Lv4 = () => {
        setPagination_Dana_lv4({
            ...pagination_dana_lv4,
            current_page: pagination_dana_lv4?.current_page + 1
        })
        console.log(pagination_dana_lv4?.current_page);
    }
    const handlePrev_Dana = () => {
        setPagination_Dana({
            ...pagination_dana,
            current_page: pagination_dana?.current_page - 1
        })
        console.log(pagination_dana?.current_page);
    }
    const handlePrev_Dana_MoneyMaker = () => {
        setPagination_Dana_moneymaker({
            ...pagination_dana_moneymaker,
            current_page: pagination_dana_moneymaker?.current_page - 1
        })
        console.log(pagination_dana_moneymaker?.current_page);
    }
    const handlePrev_Dana_Lv4 = () => {
        setPagination_Dana_lv4({
            ...pagination_dana_lv4,
            current_page: pagination_dana_lv4?.current_page - 1
        })
        console.log(pagination_dana_lv4?.current_page);
    }
    const mark_lpj = async (idNotif, id) => {        
        const payload = {
            stat: "Disable"
        }
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/mark_lpj.php?id=${idNotif}`, payload, {
                headers: {"Content-Type": "multipart/form-data"},
            })
            console.log(response.data);
            setTimeout(() => {
                navigate(`/dashboard-simak/${ level }/${role}/${role_sp}/form-dana-LPJ/${id}`);
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.log(error.response);
        }
    }
    const mark_Dana = async (idNotif, id) => {
        const payload = {
            stat: "Disable"
        }
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/mark_Dana.php?id=${idNotif}`, payload, {
                headers: {"Content-Type": "multipart/form-data"},
            })
            console.log(response.data);
            setTimeout(() => {
                navigate(`/dashboard-simak/${level}/${role}/${role_sp}/form-dana-RPD/${id}`);
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.log(error.response);
        }
    }
    const handleOpenRPD = (id, stat, id_notif, e) => {
        e.preventDefault();
        if (stat === 'Active') {
            mark_Dana(id_notif, id);
        } else {
            navigate(`/dashboard-simak/${level}/${role}/${role_sp}/form-dana-RPD/${id}`);
        }        
    }
    const handleOpenRPDlv4 = (id) => {
            navigate(`/dashboard-simak/${level}/${role}/${role_sp}/form-dana-RPD/${id}`);
    }
    // const handleOpenLPJ = (id) => {
    //     navigate(`/dashboard-simak/${ level }/${role}/${role_sp}/form-dana-LPJ/${id}`);
    // }
    const handleOpenLPJ = (id, stat, id_notif, e) => {
        e.preventDefault();
        if (stat === 'Active') {
            mark_lpj(id_notif, id);
        } else {
            navigate(`/dashboard-simak/${ level }/${role}/${role_sp}/form-dana-LPJ/${id}`);
        }        
    }
    const handleDeleteRPD = async (id) => {
        setIsLoading(true);
        try {
            const response = await axios.delete(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/delete_dana.php?id=${id}`, {
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            });
            console.log(response.data);
            setTimeout(() => {
                setIsLoading(false);
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.log(error.response);
            
        }
    }
    const handleDeleteLPJ = async (id) => {
        setIsLoading(true);
        try {
            const response = await axios.delete(`https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/delete_dana_LPJ.php?id=${id}`, {
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            });
            console.log(response.data);
            setTimeout(() => {
                setIsLoading(false);
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.log(error.response);            
        }
    }
    const handleChangeSearchMonth = (event) => {
        setSearchMonth(event.target.value);
        console.log(event.target.value);        
    }
    const handleChangeTotalRPDSearchMonth = (event) => {
        setTotal_Rpd_SearchMonth(event.target.value);
        console.log(event.target.value);        
    }
    const handleChangeLPJSearchMonth = (event) => {
        setLpj_SearchMonth(event.target.value);
        console.log(event.target.value);        
    }
    const handleChangeSearchYear = (event) => {
        setSearchYear(event.target.value);
        console.log(event.target.value);        
    }
    const handleChangeTotalRPDSearchYear = (event) => {
        setTotal_Rpd_SearchYear(event.target.value);
        console.log(event.target.value);        
    }
    const handleChangeLPJSearchYear = (event) => {
        setLpj_SearchYear(event.target.value);
        console.log(event.target.value);        
    }
    const handleChangeJenisDokumen = (event) => {
        setJenis_Dokumen(event.target.value);
        console.log(event.target.value);
    }
    const handleDownloadExcelRpd = () => {
        const bulan = searchMonth;
        const tahun = currentYear;

        window.location.href = `https://simantepbareta.cloud/API/SIMAK/Dana_RPD/dana_moneymaker_excel_download.php?bulan=${bulan}&tahun=${tahun}`;
    };
    const handleDownloadExcelLpj = () => {
        const bulan = lpj_searchmonth;
        const tahun = currentYear;
        const dokumen = jenis_dokumen;

        window.location.href = `https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/dana_lpj_keuangan_excel_download.php?bulan=${bulan}&tahun=${tahun}&dokumen=${dokumen}`;
    };
    const handleDownloadExcelTotalRpd = () => {
        const bulan = total_rpd_searchmonth;
        const tahun = total_rpd_searchyear;

        window.location.href = `https://simantepbareta.cloud/API/SIMAK/Dana_RPD/total_dana_rpd_excel_download.php?bulan=${bulan}&tahun=${tahun}`;
    };
    return(
        <>
            <div className='container-fluid d-flex flex-column p-5 m-2 justify-content-left'>
            {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
            </div>}
                <p className='text-white fs-5'>Simak/Database Keuangan</p>
                <h1 className='text-white fs-1 mt-0'>Sistem Manajemen Keuangan</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="simak" />
                <div className='container-xxl d-flex flex-column bg-green-old align-items-start p-5 m-2 gap-5' style={{borderRadius: '20px'}}>
                    <div className='container-xxl d-flex flex-column'>
                        {(role !== "C-04" || role_sp === "S-02") && (
                        <div style={{display: level === "level-4" ? 'none' : ''}} className='d-flex flex-column' >
                            <h1 className='text-white fw-bold fs-3'>Progress Pengajuan RPD</h1>
                            <div style={{display: 'flex', flexDirection: "row", gap: "20px"}}>
                                <div className='d-flex flex-row gap-2'>
                                    <button className='left' onClick={handlePrev_Dana}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_dana?.current_page} />
                                    <button className='right' onClick={handleNext_Dana}><img src={right} alt="" /></button>                                
                                </div>
                                <div className='d-flex flex-row align-items-center gap-2'>
                                    <label className='text-white fw-bold fs-6' htmlFor="">Bulan:</label>
                                    <select className='w-100 h-100 rounded-2 fs-6 lh-lg' onChange={handleChangeSearchMonth} value={searchMonth} name="" id="">
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
                                    <label className='text-white fw-bold fs-6' htmlFor="">Tahun:</label>
                                    <select className='w-100 h-100 rounded-3' onChange={handleChangeSearchYear} value={searchYear} name="" id="">
                                        <option selected={currentYear === 2025} value="2025">2025</option>
                                        <option selected={currentYear === 2026} value="2026">2026</option>
                                    </select>
                                </div>
                            </div>                  
                            {dana.length > 0 ? (
                            <table className='table-spaced text-white table-bordered mt-4' border="1">
                            <tr>
                                <th style={{textAlign:'center'}}>Nomor</th>
                                <th style={{textAlign:'center'}}>Unit</th>
                                <th style={{textAlign:'center'}}>Nama Kegiatan</th>
                                <th style={{textAlign:'center'}}>Tanggal Pelaksanaan</th>
                                <th style={{textAlign:'center'}}>Jumlah Dana</th>
                                <th style={{textAlign:'center'}}>Feedback Bagian Keuangan</th>
                                <th style={{textAlign:'center'}}>Detail</th>
                            </tr>
                            {dana.map((item, index) => (
                                <tr key={item.id_dana}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.units}</td>
                                    <td style={{textAlign:'center'}}>{item.nama_kegiatan}</td>
                                    <td style={{textAlign:'center'}}>{item.rencana_pelaksana}</td>
                                    <td style={{textAlign:'center'}}>{Number(item.grand_total).toLocaleString('id-ID')}</td>
                                    <td style={{textAlign:'center'}}>{item.keterangan_keuangan}</td>
                                    <td style={{textAlign:'center'}}>
                                        <button onClick={(e) => handleOpenRPD(item.id_dana, item.stat, item.id_notif, e)} className='B-update'>Ubah</button> <br />
                                        <div><button className='B-deleted' onClick={() => handleDeleteRPD(item.id_dana)}>Hapus</button></div>
                                    </td>
                                </tr>
                                ))}
                            </table>
                            ) : (
                                <p className='fs-5 fw-bold text-white text-center mt-4'>tidak ada data</p>
                            )}                        
                        </div>
                        )}
                        {(role === "C-04" || role_sp === "S-02") && (
                            <div className='d-flex flex-column'>
                            <h1 className='text-white fw-bold fs-3'>Progress Pengajuan RPD</h1>
                            <div style={{display: 'flex', flexDirection: "row", gap: "20px"}}>
                                <div className='d-flex flex-row gap-2'>
                                    <button className='left' onClick={handlePrev_Dana_MoneyMaker}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_dana_moneymaker?.current_page} />
                                    <button className='right' onClick={handleNext_Dana_MoneyMaker}><img src={right} alt="" /></button>                                
                                </div>
                               <div className='d-flex flex-row align-items-center gap-2'>
                                    <label className='text-white fw-bold fs-6' htmlFor="">Bulan:</label>
                                    <select className='w-100 h-100 rounded-2 fs-6 lh-lg' onChange={handleChangeSearchMonth} value={searchMonth} name="" id="">
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
                                    <label className='text-white fw-bold fs-6' htmlFor="">Tahun:</label>
                                    <select className='w-100 h-100 rounded-3' onChange={handleChangeSearchYear} value={searchYear} name="" id="">
                                        <option selected={currentYear === 2025} value="2025">2025</option>
                                        <option selected={currentYear === 2026} value="2026">2026</option>
                                    </select>
                                    <button className='btn-download w-100 h-100 rounded-3 border-0 bg-teal text-white' onClick={handleDownloadExcelRpd}>Download Excel</button>
                                </div>
                            </div>
                            {dana_moneymaker.length > 0 ? (
                            <table className='table-spaced text-white table-bordered mt-4'>
                            <tr>
                                <th style={{textAlign:'center'}}>Nomor</th>
                                <th style={{textAlign:'center'}}>Unit</th>
                                <th style={{textAlign:'center'}}>Nama Kegiatan</th>
                                <th style={{textAlign:'center'}}>Tanggal Pelaksanaan</th>
                                <th style={{textAlign:'center'}}>Jumlah Dana</th>
                                <th style={{textAlign:'center'}}>Feedback Bagian Keuangan</th>
                                <th style={{textAlign:'center'}}>Detail</th>
                            </tr>
                            {dana_moneymaker.map((item, index) => (
                                <tr key={item.id_dana}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.units}</td>
                                    <td style={{textAlign:'center'}}>{item.nama_kegiatan}</td>
                                    <td style={{textAlign:'center'}}>{item.rencana_pelaksana}</td>
                                    <td style={{textAlign:'center'}}>{Number(item.grand_total).toLocaleString('id-ID')}</td>
                                    <td style={{textAlign:'center'}}>{item.keterangan_keuangan}</td>
                                    <td style={{textAlign:'center'}}>
                                        <button onClick={(e) => handleOpenRPD(item.id_dana, item.stat, item.id_notif, e)} className='B-update'>Ubah</button> <br />
                                        <div><button className='B-deleted' onClick={() => handleDeleteRPD(item.id_dana)}>Hapus</button></div>
                                    </td>
                                </tr>
                                ))}
                            </table>
                            ) : (
                                <p className='fs-5 fw-bold text-white text-center mt-4'>tidak ada data</p>
                            )}                        
                        </div>
                        )}                        
                        {level === "level-4" && (
                            <div className='d-flex flex-column'>
                            <h1 className='text-white fw-bold fs-3'>Progress Pengajuan RPD</h1>
                            <div style={{display: 'flex', flexDirection: "row", gap: "20px"}}>
                                <div className='d-flex flex-row gap-2'>
                                    <button className='left' onClick={handlePrev_Dana_Lv4}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_dana_moneymaker?.current_page} />
                                    <button className='right' onClick={handleNext_Dana_Lv4}><img src={right} alt="" /></button>                                
                                </div>
                                <div className='d-flex flex-row align-items-center gap-2'>
                                    <label className='text-white fw-bold fs-6' htmlFor="">Bulan:</label>
                                    <select className='w-100 h-100 rounded-2 fs-6 lh-lg' onChange={handleChangeSearchMonth} value={searchMonth} name="" id="">
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
                                    <label className='text-white fw-bold fs-6' htmlFor="">Tahun:</label>
                                    <select className='w-100 h-100 rounded-3' onChange={handleChangeSearchYear} value={searchYear} name="" id="">
                                        <option selected={currentYear === 2025} value="2025">2025</option>
                                        <option selected={currentYear === 2026} value="2026">2026</option>
                                    </select>
                                    <button className='btn-download w-100 h-100 rounded-3 border-0 bg-teal text-white' onClick={handleDownloadExcelRpd}>Download Excel</button>
                                </div>
                            </div>
                            {dana_lv4.length > 0 ? (
                            <table className='table-spaced text-white table-bordered mt-4'>
                            <tr>
                                <th style={{textAlign:'center'}}>Nomor</th>
                                <th style={{textAlign:'center'}}>Unit</th>
                                <th style={{textAlign:'center'}}>Nama Kegiatan</th>
                                <th style={{textAlign:'center'}}>Tanggal Pelaksanaan</th>
                                <th style={{textAlign:'center'}}>Jumlah Dana</th>
                                <th style={{textAlign:'center'}}>Feedback Bagian Keuangan</th>
                                <th style={{textAlign:'center'}}>Detail</th>
                            </tr>
                            {dana_lv4.map((item, index) => (
                                <tr key={item.id_dana}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.units}</td>
                                    <td style={{textAlign:'center'}}>{item.nama_kegiatan}</td>
                                    <td style={{textAlign:'center'}}>{item.rencana_pelaksana}</td>
                                    <td style={{textAlign:'center'}}>{Number(item.grand_total).toLocaleString('id-ID')}</td>
                                    <td style={{textAlign:'center'}}>{item.keterangan_keuangan}</td>
                                    <td style={{textAlign:'center'}}>
                                        <button onClick={() => handleOpenRPDlv4(item.id_dana)} className='B-update'>Lihat</button> <br />
                                        <div><button className='B-deleted' onClick={() => handleDeleteRPD(item.id_dana)}>Hapus</button></div>
                                    </td>
                                </tr>
                                ))}
                            </table>
                            ) : (
                                <p className='fs-5 fw-bold text-white text-center mt-4'>tidak ada data</p>
                            )}                        
                        </div>
                        )}
                        {(role_sp !== "S-04" && role !== "C-04") && (
                          <div style={{display: role === 'A-02' || role === "A-01" || role_sp === "S-07" ? "none" : ""}} className='d-flex flex-column'>
                            <h1 className='text-white fs-3 fw-bold mt-3'>Progress Pengajuan Proposal dan LPJ</h1>
                            <div style={{display: 'flex', flexDirection: "row", gap: "20px"}}>
                                <div className='d-flex flex-row gap-2'>
                                    <button className='left' onClick={handlePrev_Lpj}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_lpj?.current_page} />
                                    <button className='right' onClick={handleNext_Lpj}><img src={right} alt="" /></button>
                                </div>
                                <div className='d-flex align-items-center gap-2'>
                                    <label className='text-white fw-bold fs-6' htmlFor="">Bulan:</label>
                                    <select className='w-100 rounded-3 fs-6' onChange={handleChangeLPJSearchMonth} value={lpj_searchmonth} name="" id="">
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
                                    <label className='text-white fw-bold fs-6' htmlFor="">Tahun:</label>
                                    <select className='w-100 rounded-3 fs-6' onChange={handleChangeLPJSearchYear} value={lpj_searchyear} name="" id="">
                                        <option selected={currentYear === 2025} value="2025">2025</option>
                                        <option selected={currentYear === 2026} value="2026">2026</option>
                                    </select>
                                    <label className='text-white fw-bold fs-6' htmlFor="">Jenis Dokumen:</label>
                                    <select className='w-100 rounded-3 fs-6' onChange={handleChangeJenisDokumen} name="" id="">
                                        <option selected value="">-</option>
                                        <option value="LPJ">LPJ</option>
                                        <option value="Proposal">Proposal</option>
                                    </select>
                                </div>
                            </div>
                            {lpj.length > 0 ? (
                            <table className='table-spaced text-white mt-3 table-bordered' border="1">
                                <tr>
                                    <th style={{textAlign:'center'}}rowSpan={2}  border="1">Nomor</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}  border="1">Unit</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}  border="1">Jenis Dokumen</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}  border="1">Nama Kegiatan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}  border="1">Tanggal Pelaksanaan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}  border="1">Tanggal & Jam Pengajuan Proposal</th>
                                    <th style={{textAlign:'center'}}colSpan={2}  border="1">Admin Pelayanan</th>
                                    <th style={{textAlign:'center'}}colSpan={2}  border="1">KASUBAG TATA USAHA</th>
                                    <th style={{textAlign:'center'}}colSpan={2}  border="1">KEPALA BALAI</th>
                                    <th style={{textAlign:'center'}}colSpan={2}  border="1">KEUANGAN</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}  border="1">Detail</th>
                                </tr>
                                <tr>
                                    <th  border="1">Status</th>
                                    <th  border="1">Tanggal & Jam Selesai diperiksa</th>
                                    <th  border="1">Status</th>
                                    <th  border="1">Tanggal & Jam Selesai diperiksa</th>
                                    <th  border="1">Status</th>
                                    <th  border="1">Tanggal & Jam Selesai diperiksa</th>
                                    <th  border="1">Keterangan</th>
                                    <th  border="1">Tanggal & Jam di Terima</th>
                                </tr>
                            {lpj.map((item, index) => (
                                <tr key={item.id_lpj}>
                                    <td  border="1" style={{textAlign:'center'}}>{index + 1}</td>
                                    <td  border="1" style={{textAlign:'center'}}>{item.units}</td>
                                    <td  border="1" style={{textAlign:'center'}}>{item.dokumen}</td>
                                    <td  border="1" style={{textAlign:'center'}}>{item.nama_kegiatan}</td>
                                    <td  border="1" style={{textAlign:'center'}}>{item.rencana_pelaksana}</td>
                                    <td  border="1" style={{textAlign:'center'}}>{item.today} <br /> {item.today_jam}</td>
                                    <td  border="1" style={{textAlign:'center', display: item.veri_adm === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td  border="1" style={{textAlign:'center', display: item.veri_adm === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td  border="1" style={{textAlign:'center', display: item.veri_adm === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td  border="1" style={{textAlign:'center'}}>{item.veri_adm_date}<br /> {item.veri_1_jam}</td>
                                    <td  border="1" style={{textAlign:'center', display: item.veri_1 === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td  border="1" style={{textAlign:'center', display: item.veri_1 === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td  border="1" style={{textAlign:'center', display: item.veri_1 === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td  border="1" style={{textAlign:'center'}}>{item.veri_1_date}<br /> {item.veri_1_jam}</td>
                                    <td  border="1" style={{textAlign:'center', display: item.veri_2 === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td  border="1" style={{textAlign:'center', display: item.veri_2 === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td  border="1" style={{textAlign:'center', display: item.veri_2 === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td  border="1" style={{textAlign:'center'}}>{item.veri_2_date}<br /> {item.veri_2_jam}</td>
                                    <td  border="1" style={{textAlign:'center'}}>{item.keterangan}</td>
                                    <td  border="1" style={{textAlign:'center'}}>{item.keterangan_date} <br /> {item.keterangan_jam}</td>
                                    <td  border="1" style={{textAlign:'center'}}> <button onClick={(e) => handleOpenLPJ(item.id_lpj, item.stat, item.id_notif, e)} className='B-update'>Ubah</button>
                                    <br /><div><button className='B-deleted' onClick={() => handleDeleteLPJ(item.id_lpj)} >Hapus</button></div></td>
                                </tr>                                
                            ))}
                            </table>
                            ) : (
                                <p className='fs-5 fw-bold text-white text-center mt-4'>tidak ada data</p>
                            )}
                          </div>
                        )}
                        {role_sp === "S-07" && (
                          <div className='d-flex flex-column'>
                            <h1 className='text-white fs-3 fw-bold mt-3'>Progress Pengajuan Proposal dan LPJ</h1>                            
                            <div style={{display: 'flex', flexDirection: "row", gap: "20px"}}>
                                <div className='d-flex flex-row gap-2'>
                                    <button className='left' onClick={handlePrev_Lpj_admin}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_lpj?.current_page} />
                                    <button className='right' onClick={handleNext_Lpj_admin}><img src={right} alt="" /></button>
                                </div>
                                <div className='d-flex align-items-center gap-2'>
                                    <label className='text-white fw-bold fs-6' htmlFor="">Bulan:</label>
                                    <select className='w-100 rounded-3 fs-6' onChange={handleChangeLPJSearchMonth} value={lpj_searchmonth} name="" id="">
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
                                    <label className='text-white fw-bold fs-6' htmlFor="">Tahun:</label>
                                    <select className='w-100 rounded-3 fs-6' onChange={handleChangeLPJSearchYear} value={lpj_searchyear} name="" id="">
                                        <option selected={currentYear === 2025} value="2025">2025</option>
                                        <option selected={currentYear === 2026} value="2026">2026</option>
                                    </select>
                                    <label className='text-white fw-bold fs-6' htmlFor="">Jenis Dokumen:</label>
                                    <select className='w-100 rounded-3 fs-6' onChange={handleChangeJenisDokumen} name="" id="">
                                        <option selected value="">-</option>
                                        <option value="LPJ">LPJ</option>
                                        <option value="Proposal">Proposal</option>
                                    </select>
                                </div>
                            </div>
                            {lpj_admin.length > 0 ? (
                            <table className='table-spaced text-white mt-3 table-bordered' border="1">
                                <tr>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Nomor</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Unit</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Jenis Dokumen</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Nama Kegiatan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Tanggal Pelaksanaan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Tanggal & Jam Pengajuan Proposal</th>
                                    <th style={{textAlign:'center'}}colSpan={2}>Admin Pelayanan</th>
                                    <th style={{textAlign:'center'}}colSpan={2}>KASUBAG TATA USAHA</th>
                                    <th style={{textAlign:'center'}}colSpan={2}>KEPALA BALAI</th>
                                    <th style={{textAlign:'center'}}colSpan={2}>KEUANGAN</th>
                                    <th style={{textAlign:'center'}} rowSpan={2}>Detail</th>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <th>Tanggal & Jam Selesai diperiksa</th>
                                    <th>Status</th>
                                    <th>Tanggal & Jam Selesai diperiksa</th>
                                    <th>Status</th>
                                    <th>Tanggal & Jam Selesai diperiksa</th>
                                    <th>Keterangan</th>
                                    <th>Tanggal & Jam di Terima</th>
                                </tr>
                            {lpj_admin.map((item, index) => (
                                <tr key={item.id_lpj}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.units}</td>
                                    <td style={{textAlign:'center'}}>{item.dokumen}</td>
                                    <td style={{textAlign:'center'}}>{item.nama_kegiatan}</td>
                                    <td style={{textAlign:'center'}}>{item.rencana_pelaksana}</td>                                    
                                    <td style={{textAlign:'center'}}>{item.today} <br /> {item.today_jam}</td>
                                    <td style={{textAlign:'center', display: item.veri_adm === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td style={{textAlign:'center', display: item.veri_adm === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td style={{textAlign:'center', display: item.veri_adm === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td style={{textAlign:'center'}}>{item.veri_adm_date}<br /> {item.veri_adm_jam}</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td style={{textAlign:'center'}}>{item.veri_1_date}<br /> {item.veri_1_jam}</td>
                                    <td style={{textAlign:'center', display: item.veri_2 === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td style={{textAlign:'center', display: item.veri_2 === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td style={{textAlign:'center', display: item.veri_2 === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td style={{textAlign:'center'}}>{item.veri_2_date}<br /> {item.veri_2_jam}</td>
                                    <td style={{textAlign:'center'}}>{item.keterangan}</td>
                                    <td style={{textAlign:'center'}}>{item.keterangan_date} <br /> {item.keterangan_jam}</td>
                                    <td style={{textAlign:'center'}}> <button onClick={(e) => handleOpenLPJ(item.id_lpj, item.stat, item.id_notif, e)} className='B-update'>Ubah</button> | 
                                    <br /><div><button className='B-deleted' onClick={() => handleDeleteLPJ(item.id_lpj)} >Hapus</button></div></td>
                                </tr>                                
                            ))}
                            </table>
                            ) : (
                                <p style={{display:'flex', paddingTop:'10px', justifyContent:'center', paddingLeft:'400px'}}>tidak ada data</p>
                            )}
                          </div>
                        )}
                        {role_sp === "S-02" && (
                          <div className='d-flex flex-column'>
                            <h1 className='text-white fs-3 fw-bold mt-3'>Progress Pengajuan Proposal dan LPJ</h1>                            
                            <div style={{display: 'flex', flexDirection: "row", gap: "20px"}}>
                                <div className='d-flex flex-row gap-2'>
                                    <button className='left' onClick={handlePrev_Lpj_keuangan}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_lpj?.current_page} />
                                    <button className='right' onClick={handleNext_Lpj_keuangan}><img src={right} alt="" /></button>
                                </div>
                                <div className='d-flex align-items-center gap-2'>
                                    <label className='text-white fw-bold fs-6' htmlFor="">Bulan:</label>
                                    <select className='w-100 rounded-3 fs-6' onChange={handleChangeLPJSearchMonth} value={lpj_searchmonth} name="" id="">
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
                                    <label className='text-white fw-bold fs-6' htmlFor="">Tahun:</label>
                                    <select className='w-100 rounded-3 fs-6' onChange={handleChangeLPJSearchYear} value={lpj_searchyear} name="" id="">
                                        <option selected={currentYear === 2025} value="2025">2025</option>
                                        <option selected={currentYear === 2026} value="2026">2026</option>
                                    </select>
                                    <label className='text-white fw-bold fs-6' htmlFor="">Jenis Dokumen:</label>
                                    <select className='w-100 rounded-3 fs-6' onChange={handleChangeJenisDokumen} name="" id="">
                                        <option selected value="">-</option>
                                        <option value="LPJ">LPJ</option>
                                        <option value="Proposal">Proposal</option>
                                    </select>
                                </div>
                            </div>
                            {lpj_keuangan.length > 0 ? (
                            <table className='table-spaced text-white mt-3 table-bordered' border="1">
                                <tr>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Nomor</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Unit</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Jenis Dokumen</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Nama Kegiatan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Tanggal Pelaksanaan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Tanggal & Jam Pengajuan Proposal</th>
                                    <th style={{textAlign:'center'}}colSpan={2}>Admin Pelayanan</th>
                                    <th style={{textAlign:'center'}}colSpan={2}>KASUBAG TATA USAHA</th>
                                    <th style={{textAlign:'center'}}colSpan={2}>KEPALA BALAI</th>
                                    <th style={{textAlign:'center'}}colSpan={2}>KEUANGAN</th>
                                    <th style={{textAlign:'center'}} rowSpan={2}>Detail</th>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <th>Tanggal & Jam Selesai diperiksa</th>
                                    <th>Status</th>
                                    <th>Tanggal & Jam Selesai diperiksa</th>
                                    <th>Status</th>
                                    <th>Tanggal & Jam Selesai diperiksa</th>
                                    <th>Keterangan</th>
                                    <th>Tanggal & Jam di Terima</th>
                                </tr>
                            {lpj_keuangan.map((item, index) => (
                                <tr key={item.id_lpj}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.units}</td>
                                    <td style={{textAlign:'center'}}>{item.dokumen}</td>
                                    <td style={{textAlign:'center'}}>{item.nama_kegiatan}</td>
                                    <td style={{textAlign:'center'}}>{item.rencana_pelaksana}</td>                                    
                                    <td style={{textAlign:'center'}}>{item.today} <br /> {item.today_jam}</td>
                                    <td style={{textAlign:'center', display: item.veri_adm === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td style={{textAlign:'center', display: item.veri_adm === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td style={{textAlign:'center', display: item.veri_adm === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td style={{textAlign:'center'}}>{item.veri_adm_date}<br /> {item.veri_adm_jam}</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td style={{textAlign:'center'}}>{item.veri_1_date}<br /> {item.veri_1_jam}</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td style={{textAlign:'center'}}>{item.veri_1_date}<br /> {item.veri_1_jam}</td>
                                    <td style={{textAlign:'center', display: item.veri_2 === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td style={{textAlign:'center', display: item.veri_2 === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td style={{textAlign:'center', display: item.veri_2 === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td style={{textAlign:'center'}}>{item.veri_2_date}<br /> {item.veri_2_jam}</td>
                                    <td style={{textAlign:'center'}}>{item.keterangan}</td>
                                    <td style={{textAlign:'center'}}>{item.keterangan_date} <br /> {item.keterangan_jam}</td>
                                    <td style={{textAlign:'center'}}> <button onClick={(e) => handleOpenLPJ(item.id_lpj, item.stat, item.id_notif, e)} className='B-update'>Ubah</button> | 
                                    <br /><div><button className='B-deleted' onClick={() => handleDeleteLPJ(item.id_lpj)} >Hapus</button></div></td>
                                </tr>                                
                            ))}
                            </table>
                            ) : (
                                <p style={{display:'flex', paddingTop:'10px', justifyContent:'center', paddingLeft:'400px'}}>tidak ada data</p>
                            )}
                          </div>
                        )}
                        {(role === "C-04" || role_sp === "S-04") && (
                          <div className='d-flex flex-column'>
                            <h1 className='text-white fs-3 fw-bold mt-3'>Progress Pengajuan Proposal dan LPJ</h1>
                            <div style={{display: 'flex', flexDirection: "row", gap: "20px"}}>
                                <div className='d-flex flex-row gap-2'>
                                    <button className='left' onClick={handlePrev_Lpj_keuangan}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_lpj?.current_page} />
                                    <button className='right' onClick={handleNext_Lpj_keuangan}><img src={right} alt="" /></button>
                                </div>
                                <div className='d-flex align-items-center gap-2'>
                                    <label className='text-white fw-bold fs-6' htmlFor="">Bulan:</label>
                                    <select className='w-100 rounded-3 fs-6' onChange={handleChangeLPJSearchMonth} value={lpj_searchmonth} name="" id="">
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
                                    <label className='text-white fw-bold fs-6' htmlFor="">Tahun:</label>
                                    <select className='w-100 rounded-3 fs-6' onChange={handleChangeLPJSearchYear} value={lpj_searchyear} name="" id="">
                                        <option selected={currentYear === 2025} value="2025">2025</option>
                                        <option selected={currentYear === 2026} value="2026">2026</option>
                                    </select>
                                    <label className='text-white fw-bold fs-6' htmlFor="">Jenis Dokumen:</label>
                                    <select className='w-100 rounded-3 fs-6' onChange={handleChangeJenisDokumen} name="" id="">
                                        <option selected value="">-</option>
                                        <option value="LPJ">LPJ</option>
                                        <option value="Proposal">Proposal</option>
                                    </select>
                                    <button className='btn-download w-100 h-100 rounded-3 border-0 bg-teal text-white' onClick={handleDownloadExcelLpj}>Download Excel</button>
                                </div>
                            </div>
                            {lpj_keuangan.length > 0 ? (
                            <table className='table-spaced text-white mt-3 table-bordered' border="1">
                                <tr>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Nomor</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Unit</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Jenis Dokumen</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Nama Kegiatan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Tanggal Pelaksanaan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Tanggal & Jam Pengajuan Proposal</th>
                                    <th style={{textAlign:'center'}}colSpan={2}>Admin Pelayanan</th>
                                    <th style={{textAlign:'center'}}colSpan={2}>KASUBAG TATA USAHA</th>
                                    <th style={{textAlign:'center'}}colSpan={2}>KEPALA BALAI</th>
                                    <th style={{textAlign:'center'}}colSpan={2}>KEUANGAN</th>
                                    <th style={{textAlign:'center'}} rowSpan={2}>Detail</th>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <th>Tanggal & Jam Selesai diperiksa</th>
                                    <th>Status</th>
                                    <th>Tanggal & Jam Selesai diperiksa</th>
                                    <th>Status</th>
                                    <th>Tanggal & Jam Selesai diperiksa</th>
                                    <th>Keterangan</th>
                                    <th>Tanggal & Jam di Terima</th>
                                </tr>
                            {lpj_keuangan.map((item, index) => (
                                <tr key={item.id_lpj}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.units}</td>
                                    <td style={{textAlign:'center'}}>{item.dokumen}</td>
                                    <td style={{textAlign:'center'}}>{item.nama_kegiatan}</td>
                                    <td style={{textAlign:'center'}}>{item.rencana_pelaksana}</td>
                                    <td style={{textAlign:'center'}}>{item.today} <br /> {item.today_jam}</td>
                                    <td style={{textAlign:'center', display: item.veri_adm === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td style={{textAlign:'center', display: item.veri_adm === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td style={{textAlign:'center', display: item.veri_adm === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td style={{textAlign:'center'}}>{item.veri_adm_date}<br /> {item.veri_adm_jam}</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td style={{textAlign:'center'}}>{item.veri_1_date}<br /> {item.veri_1_jam}</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td style={{textAlign:'center'}}>{item.veri_1_date}<br /> {item.veri_1_jam}</td>
                                    <td style={{textAlign:'center', display: item.veri_2 === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td style={{textAlign:'center', display: item.veri_2 === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td style={{textAlign:'center', display: item.veri_2 === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td style={{textAlign:'center'}}>{item.veri_2_date}<br /> {item.veri_2_jam}</td>
                                    <td style={{textAlign:'center'}}>{item.keterangan}</td>
                                    <td style={{textAlign:'center'}}>{item.keterangan_jam}</td>                                    
                                    <td style={{textAlign:'center'}}><button onClick={(e) => handleOpenLPJ(item.id_lpj, item.stat, item.id_notif, e)} className='B-update'>Ubah</button> |
                                    <br /><div><button className='B-deleted' onClick={() => handleDeleteLPJ(item.id_lpj)} >Hapus</button></div></td>
                                </tr>                                
                            ))}
                            </table>
                            ) : (
                                <p style={{display:'flex', paddingTop:'10px', justifyContent:'center', paddingLeft:'400px'}}>tidak ada data</p>
                            )}
                          </div>
                        )}
                        { role === "A-02" && (
                          <div className='d-flex flex-column'>
                            <h1 className='text-white fs-3 fw-bold mt-3'>Progress Pengajuan Proposal dan LPJ</h1>
                            <div style={{display: 'flex', flexDirection: "row", gap: "20px"}}>
                                <div className='d-flex flex-row gap-2'>
                                    <button className='left' onClick={handlePrev_Lpj_lv1}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_lpj?.current_page} />
                                    <button className='right' onClick={handleNext_Lpj_lv1}><img src={right} alt="" /></button>
                                </div>
                                <div className='d-flex align-items-center gap-2'>
                                    <label className='text-white fw-bold fs-6' htmlFor="">Bulan:</label>
                                    <select className='w-100 rounded-3 fs-6' onChange={handleChangeLPJSearchMonth} value={lpj_searchmonth} name="" id="">
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
                                    <label className='text-white fw-bold fs-6' htmlFor="">Tahun:</label>
                                    <select className='w-100 rounded-3 fs-6' onChange={handleChangeLPJSearchYear} value={lpj_searchyear} name="" id="">
                                        <option selected={currentYear === 2025} value="2025">2025</option>
                                        <option selected={currentYear === 2026} value="2026">2026</option>
                                    </select>
                                    <label className='text-white fw-bold fs-6' htmlFor="">Jenis Dokumen:</label>
                                    <select className='w-100 rounded-3 fs-6' onChange={handleChangeJenisDokumen} name="" id="">
                                        <option selected value="">-</option>
                                        <option value="LPJ">LPJ</option>
                                        <option value="Proposal">Proposal</option>
                                    </select>
                                    <button className='btn-download w-100 h-100 rounded-3 border-0 bg-teal text-white' onClick={handleDownloadExcelLpj}>Download Excel</button>
                                </div>
                            </div>
                            {lpj_lv1.length > 0 ? (
                            <table className='table-spaced text-white mt-3 table-bordered' border="1">
                                <tr>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Nomor</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Unit</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Jenis Dokumen</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Nama Kegiatan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Tanggal Pelaksanaan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Tanggal & Jam Pengajuan Proposal</th>
                                    <th style={{textAlign:'center'}}colSpan={2}>Admin Pelayanan</th>
                                    <th style={{textAlign:'center'}}colSpan={2}>KASUBAG TATA USAHA</th>
                                    <th style={{textAlign:'center'}}colSpan={2}>KEPALA BALAI</th>
                                    <th style={{textAlign:'center'}}colSpan={2}>KEUANGAN</th>
                                    <th style={{textAlign:'center'}} rowSpan={2}>Detail</th>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <th>Tanggal & Jam Selesai diperiksa</th>
                                    <th>Status</th>
                                    <th>Tanggal & Jam Selesai diperiksa</th>
                                    <th>Status</th>
                                    <th>Tanggal & Jam Selesai diperiksa</th>
                                    <th>Keterangan</th>
                                    <th>Tanggal & Jam di Terima</th>
                                </tr>
                            {lpj_lv1.map((item, index) => (
                                <tr key={item.id_lpj}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.units}</td>
                                    <td style={{textAlign:'center'}}>{item.dokumen}</td>
                                    <td style={{textAlign:'center'}}>{item.nama_kegiatan}</td>
                                    <td style={{textAlign:'center'}}>{item.rencana_pelaksana}</td>
                                    <td style={{textAlign:'center'}}>{item.today} <br /> {item.today_jam}</td>
                                    <td style={{textAlign:'center', display: item.veri_adm === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td style={{textAlign:'center', display: item.veri_adm === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td style={{textAlign:'center', display: item.veri_adm === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td style={{textAlign:'center'}}>{item.veri_adm_date}<br /> {item.veri_adm_jam}</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td style={{textAlign:'center'}}>{item.veri_1_date}<br /> {item.veri_1_jam}</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td style={{textAlign:'center'}}>{item.veri_1_date}<br /> {item.veri_1_jam}</td>
                                    <td style={{textAlign:'center', display: item.veri_2 === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td style={{textAlign:'center', display: item.veri_2 === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td style={{textAlign:'center', display: item.veri_2 === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td style={{textAlign:'center'}}>{item.veri_2_date}<br /> {item.veri_2_jam}</td>
                                    <td style={{textAlign:'center'}}>{item.keterangan}</td>
                                    <td style={{textAlign:'center'}}>{item.keterangan_jam}</td>
                                    <td style={{textAlign:'center'}}> <button onClick={(e) => handleOpenLPJ(item.id_lpj, item.stat, item.id_notif, e)} className='B-update'>Ubah</button> 
                                    <br /><div><button className='B-deleted' onClick={() => handleDeleteLPJ(item.id_lpj)} >Hapus</button></div></td>
                                </tr>                                
                            ))}
                            </table>
                            ) : (
                                <p style={{display:'flex', paddingTop:'10px', justifyContent:'center', paddingLeft:'400px'}}>tidak ada data</p>
                            )}
                          </div>
                        )}
                        { role === "A-01" && (
                          <div className='d-flex flex-column'>
                            <h1 className='text-white fs-3 fw-bold mt-3'>Progress Pengajuan Proposal dan LPJ</h1>
                            <div style={{display: 'flex', flexDirection: "row", gap: "20px"}}>
                                <div className='d-flex flex-row gap-2'>
                                    <button className='left' onClick={handlePrev_Lpj_lv2}><img src={left} alt="" /></button>
                                    <input className='page-number' type="text" value={pagination_lpj?.current_page} />
                                    <button className='right' onClick={handleNext_Lpj_lv2}><img src={right} alt="" /></button>
                                </div>
                                <div className='d-flex align-items-center gap-2'>
                                    <label className='text-white fw-bold fs-6' htmlFor="">Bulan:</label>
                                    <select className='w-100 rounded-3 fs-6' onChange={handleChangeLPJSearchMonth} value={lpj_searchmonth} name="" id="">
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
                                    <label className='text-white fw-bold fs-6' htmlFor="">Tahun:</label>
                                    <select className='w-100 rounded-3 fs-6' onChange={handleChangeLPJSearchYear} value={lpj_searchyear} name="" id="">
                                        <option selected={currentYear === 2025} value="2025">2025</option>
                                        <option selected={currentYear === 2026} value="2026">2026</option>
                                    </select>
                                    <label className='text-white fw-bold fs-6' htmlFor="">Jenis Dokumen:</label>
                                    <select className='w-100 rounded-3 fs-6' onChange={handleChangeJenisDokumen} name="" id="">
                                        <option selected value="">-</option>
                                        <option value="LPJ">LPJ</option>
                                        <option value="Proposal">Proposal</option>
                                    </select>
                                    <button className='btn-download w-100 h-100 rounded-3 border-0 bg-teal text-white' onClick={handleDownloadExcelLpj}>Download Excel</button>
                                </div>
                            </div>
                            {lpj_lv2.length > 0 ? (
                            <table className='table-spaced text-white mt-3 table-bordered' border="1">
                                <tr>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Nomor</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Unit</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Jenis Dokumen</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Nama Kegiatan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Tanggal Pelaksanaan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Tanggal & Jam Pengajuan Proposal</th>
                                    <th style={{textAlign:'center'}}colSpan={2}>Admin Pelayanan</th>
                                    <th style={{textAlign:'center'}}colSpan={2}>KASUBAG TATA USAHA</th>
                                    <th style={{textAlign:'center'}}colSpan={2}>KEPALA BALAI</th>
                                    <th style={{textAlign:'center'}}colSpan={2}>KEUANGAN</th>
                                    <th style={{textAlign:'center'}} rowSpan={2}>Detail</th>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <th>Tanggal & Jam Selesai diperiksa</th>
                                    <th>Status</th>
                                    <th>Tanggal & Jam Selesai diperiksa</th>
                                    <th>Status</th>
                                    <th>Tanggal & Jam Selesai diperiksa</th>
                                    <th>Keterangan</th>
                                    <th>Tanggal & Jam di Terima</th>
                                </tr>
                            {lpj_lv2.map((item, index) => (
                                <tr key={item.id_lpj}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.units}</td>
                                    <td style={{textAlign:'center'}}>{item.dokumen}</td>
                                    <td style={{textAlign:'center'}}>{item.nama_kegiatan}</td>
                                    <td style={{textAlign:'center'}}>{item.rencana_pelaksana}</td>
                                    <td style={{textAlign:'center'}}>{item.today} <br /> {item.today_jam}</td>
                                    <td style={{textAlign:'center', display: item.veri_adm === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td style={{textAlign:'center', display: item.veri_adm === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td style={{textAlign:'center', display: item.veri_adm === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td style={{textAlign:'center'}}>{item.veri_adm_date}<br /> {item.veri_adm_jam}</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td style={{textAlign:'center'}}>{item.veri_1_date}<br /> {item.veri_1_jam}</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td style={{textAlign:'center'}}>{item.veri_1_date}<br /> {item.veri_1_jam}</td>
                                    <td style={{textAlign:'center', display: item.veri_2 === '1' ? 'block ': 'none'}}><img src={white} alt="" />Belum di Baca</td>
                                    <td style={{textAlign:'center', display: item.veri_2 === '2' ? 'block ': 'none'}}><img src={red} alt="" />Ditolak</td>
                                    <td style={{textAlign:'center', display: item.veri_2 === '3' ? 'block ': 'none'}}><img src={green} alt="" />Diterima</td>
                                    <td style={{textAlign:'center'}}>{item.veri_2_date}<br /> {item.veri_2_jam}</td>
                                    <td style={{textAlign:'center'}}>{item.keterangan}</td>
                                    <td style={{textAlign:'center'}}>{item.keterangan_date} <br /> {item.keterangan_jam}</td>                                    
                                    <td style={{textAlign:'center'}}> <button onClick={(e) => handleOpenLPJ(item.id_lpj, item.stat, item.id_notif, e)} className='B-update'>Ubah</button> | 
                                    <br /><div><button className='B-deleted' onClick={() => handleDeleteLPJ(item.id_lpj)} >Hapus</button></div></td>
                                </tr>                                
                            ))}
                            </table>
                            ) : (
                                <p style={{display:'flex', paddingTop:'10px', justifyContent:'center', paddingLeft:'400px'}}>tidak ada data</p>
                            )}
                          </div>
                        )}
                        <div className='d-flex flex-column'>
                            <h1 className='text-white fs-3 fw-bold mt-3'>Total Pengajuan RPD</h1>
                            <div style={{display: 'flex', flexDirection: "row", gap: "10px"}}>                                
                                <div className='d-flex flex-row align-items-center gap-2'>
                                    <label className='text-white fw-bold fs-6' htmlFor="">Bulan:</label>
                                    <select className='w-100 rounded-3 fs-6' onChange={handleChangeTotalRPDSearchMonth} value={total_rpd_searchmonth} name="" id="">
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
                                    <label className='text-white fw-bold fs-6' htmlFor="">Tahun:</label>
                                    <select className='w-100 rounded-3 fs-6' onChange={handleChangeTotalRPDSearchYear} value={total_rpd_searchyear} name="" id="">
                                        <option selected={currentYear === 2025} value="2025">2025</option>
                                        <option selected={currentYear === 2026} value="2026">2026</option>
                                    </select>
                                    <button className='btn-download w-100 h-100 rounded-3 border-0 bg-teal text-white' onClick={handleDownloadExcelTotalRpd}>Download Excel</button>
                                </div>
                            </div>
                            <table className='text-white table-bordered mt-4' border="1">
                            <tr>
                                <th style={{textAlign:'center'}}>No</th>
                                <th style={{textAlign:'center'}}>Units</th>
                                <th style={{textAlign:'center'}}>Jumlah Dana Per Unit</th>
                                <th style={{textAlign:'center'}}>Total</th>
                            </tr>
                            {total_rpd.map((item, index) => (
                                <>
                                    <tr key={index}>
                                        <th style={{textAlign:'center'}}>1</th>
                                        <th style={{textAlign:'center'}}>Sosial</th>
                                        <th style={{textAlign:'center'}}>{Number(item?.total_sosial ?? 0).toLocaleString('id-ID')}</th>
                                        <th rowSpan={3} style={{textAlign:'center', justifyContent: 'center'}}>{Number(item?.grand_total ?? 0).toLocaleString('id-ID')}</th>
                                    </tr>
                                    <tr key={index}>
                                        <th style={{textAlign:'center'}}>2</th>
                                        <th style={{textAlign:'center'}}>Medis</th>
                                        <th style={{textAlign:'center'}}>{Number(item?.total_medis ?? 0).toLocaleString('id-ID')}</th>
                                    </tr>
                                    <tr key={index}>
                                        <th style={{textAlign:'center'}}>3</th>
                                        <th style={{textAlign:'center'}}>Manajemen</th>
                                        <th style={{textAlign:'center'}}>{Number(item?.total_manajemen ?? 0).toLocaleString('id-ID')}</th>
                                    </tr>
                                </>
                            ))}                                                        
                            </table>                                                     
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Content_simak