/* eslint-disable react-hooks/exhaustive-deps */
import './content-simak.css'
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

    const storeidNumber = localStorage.getItem('id_number');
    const [dana, setDana] = useState([]);
    const [pagination_dana, setPagination_Dana] = useState({
        current_page: 1,
    });
    const navigate = useNavigate();
    const getDana = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/SIMAK/Dana_RPD/dana_by_name.php?id_number=${storeidNumber}&page=${pagination_dana.current_page}`;
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
        const baseUrl = `https://simantepbareta.cloud/API/SIMAK/Dana_RPD/dana.php?page=${pagination_dana_moneymaker.current_page}`;
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
    const [lpj, setLpj] = useState([]);
    const [pagination_lpj, setPagination_lpj] = useState({
        current_page: 1,
    })
    const getLpj = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/dana_lpj_by_name.php?id_number=${storeidNumber}&page=${pagination_lpj.current_page}`;
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
    const [lpj_lv1, setLpj_lv1] = useState([]);
    const [pagination_lpj_lv1, setPagination_lpj_lv1] = useState({
        current_page: 1,
    })
    const getLpj_lv1 = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/dana_lpj_lv1.php?page=${pagination_lpj_lv1.current_page}`;
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
        const baseUrl = `https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/dana_lpj_lv2.php?page=${pagination_lpj_lv2.current_page}`;
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
        const baseUrl = `https://simantepbareta.cloud/API/SIMAK/Dana_LPJ/dana_lpj_keuangan.php?page=${pagination_lpj_keuangan.current_page}`;
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
    useEffect(() => {
        getDana();
        getDana_moneymaker();
        getLpj();
        getLpj_lv1();
        getLpj_lv2();
        getLpj_keuangan();
    },[
        pagination_lpj?.current_page, pagination_lpj_lv1?.current_page, pagination_lpj_lv2?.current_page, pagination_lpj_keuangan?.current_page,
        pagination_dana?.current_page, pagination_dana_moneymaker?.current_page
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
    const handleOpenRPD = (id) => {
        navigate(`/dashboard-simak/${level}/${role}/${role_sp}/form-dana-RPD/${id}`);
    }
    const handleOpenLPJ = (id) => {
        navigate(`/dashboard-simak/${ level }/${role}/${role_sp}/form-dana-LPJ/${id}`);
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

    return(
        <>
            <div className='main-dashboard'>
            {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
            </div>}
                <p>Simak/Database Keuangan</p>
                <h1>Sistem Manajemen Keuangan</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="simak" />
                <div className='content-col'>
                    <div className='box-s'>
                        {(role !== "C-04" || role_sp === "S-02") && (
                        <div className='content'>
                            <h1>Progress Pengajuan RPD</h1>
                            <div className='pagination'>
                                <button className='left' onClick={handlePrev_Dana}><img src={left} alt="" /></button>
                                <input className='page-number' type="text" value={pagination_dana?.current_page} />
                                <button className='right' onClick={handleNext_Dana}><img src={right} alt="" /></button>
                            </div>
                            {dana.length > 0 ? (
                            <table>
                            <tr>
                                <th style={{textAlign:'center'}}>Nomor</th>
                                <th style={{textAlign:'center'}}>Nama Kegiatan</th>
                                <th style={{textAlign:'center'}}>Tanggal Pelaksanaan</th>
                                <th style={{textAlign:'center'}}>Feedback Bagian Keuangan</th>
                                <th style={{textAlign:'center'}}>Detail</th>
                            </tr>
                            {dana.map((item, index) => (
                                <tr key={item.id_dana}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.nama_kegiatan}</td>
                                    <td style={{textAlign:'center'}}>{item.rencana_pelaksana}</td>
                                    <td style={{textAlign:'center'}}>{item.keterangan_keuangan}</td>
                                    <td style={{textAlign:'center'}}>
                                        <button onClick={() => handleOpenRPD(item.id_dana)} className='B-update'>Ubah</button> <br />
                                        <div><button className='B-deleted' onClick={() => handleDeleteRPD(item.id_dana)}>Hapus</button></div>
                                    </td>
                                </tr>
                                ))}
                            </table>
                            ) : (
                                <p style={{display:'flex', paddingTop:'10px', justifyContent:'center', paddingLeft:'400px'}}>tidak ada data</p>
                            )}                        
                        </div>
                        )}
                        {role === "C-04" && (
                            <div className='content'>
                            <h1>Progress Pengajuan RPD</h1>
                            <div className='pagination'>
                                <button className='left' onClick={handlePrev_Dana_MoneyMaker}><img src={left} alt="" /></button>
                                <input className='page-number' type="text" value={pagination_dana_moneymaker?.current_page} />
                                <button className='right' onClick={handleNext_Dana_MoneyMaker}><img src={right} alt="" /></button>
                            </div>
                            {dana_moneymaker.length > 0 ? (
                            <table>
                            <tr>
                                <th style={{textAlign:'center'}}>Nomor</th>
                                <th style={{textAlign:'center'}}>Nama Kegiatan</th>
                                <th style={{textAlign:'center'}}>Tanggal Pelaksanaan</th>
                                <th style={{textAlign:'center'}}>Feedback Bagian Keuangan</th>
                                <th style={{textAlign:'center'}}>Detail</th>
                            </tr>
                            {dana_moneymaker.map((item, index) => (
                                <tr key={item.id_dana}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.nama_kegiatan}</td>
                                    <td style={{textAlign:'center'}}>{item.rencana_pelaksana}</td>
                                    <td style={{textAlign:'center'}}>{item.keterangan_keuangan}</td>
                                    <td style={{textAlign:'center'}}>
                                        <button onClick={() => handleOpenRPD(item.id_dana)} className='B-update'>Ubah</button> <br />
                                        <div><button className='B-deleted' onClick={() => handleDeleteRPD(item.id_dana)}>Hapus</button></div>
                                    </td>
                                </tr>
                                ))}
                            </table>
                            ) : (
                                <p style={{display:'flex', paddingTop:'10px', justifyContent:'center', paddingLeft:'400px'}}>tidak ada data</p>
                            )}                        
                        </div>
                        )}
                        {(role_sp !== "S-04" && role !== "C-04") && (
                          <div style={{display: role === 'A-02' || role === "A-01" ? "none" : ""}} className='content'>
                            <h1>Progress Pengajuan Proposal dan LPJ</h1>
                            <div className='pagination'>
                                <button className='left' onClick={handlePrev_Lpj}><img src={left} alt="" /></button>
                                <input className='page-number' type="text" value={pagination_lpj?.current_page} />
                                <button className='right' onClick={handleNext_Lpj}><img src={right} alt="" /></button>
                            </div>
                            {lpj.length > 0 ? (
                            <table>
                                <tr>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Nomor</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Unit</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Nama Kegiatan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Tanggal Pelaksanaan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Tanggal & Jam Pengajuan Proposal</th>
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
                                    <th>Keterangan</th>
                                    <th>Tanggal & Jam di Terima</th>
                                </tr>
                            {lpj.map((item, index) => (
                                <tr key={item.id_lpj}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.units}</td>
                                    <td style={{textAlign:'center'}}>{item.nama_kegiatan}</td>
                                    <td style={{textAlign:'center'}}>{item.rencana_pelaksana}</td>
                                    <td style={{textAlign:'center'}}>{item.today} <br /> {item.today_jam}</td>
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
                                    <td style={{textAlign:'center'}}> <button onClick={() => handleOpenLPJ(item.id_lpj)} className='B-update'>Ubah</button>
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
                          <div className='content'>
                            <h1>Progress Pengajuan Proposal dan LPJ</h1>
                            <div className='pagination'>
                                <button className='left' onClick={handlePrev_Lpj_keuangan}><img src={left} alt="" /></button>
                                <input className='page-number' type="text" value={pagination_lpj?.current_page} />
                                <button className='right' onClick={handleNext_Lpj_keuangan}><img src={right} alt="" /></button>
                            </div>
                            {lpj_keuangan.length > 0 ? (
                            <table>
                                <tr>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Nomor</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Unit</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Nama Kegiatan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Tanggal Pelaksanaan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Tanggal & Jam Pengajuan Proposal</th>
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
                                    <th>Keterangan</th>
                                    <th>Tanggal & Jam di Terima</th>
                                </tr>
                            {lpj_keuangan.map((item, index) => (
                                <tr key={item.id_lpj}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.units}</td>
                                    <td style={{textAlign:'center'}}>{item.nama_kegiatan}</td>
                                    <td style={{textAlign:'center'}}>{item.rencana_pelaksana}</td>
                                    <td style={{textAlign:'center'}}>{item.today} <br /> {item.today_jam}</td>
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
                                    <td style={{textAlign:'center'}}> <button onClick={() => handleOpenLPJ(item.id_lpj)} className='B-update'>Ubah</button> | 
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
                          <div className='content'>
                            <h1>Progress Pengajuan Proposal dan LPJ Keuangan</h1>
                            <div className='pagination'>
                                <button className='left' onClick={handlePrev_Lpj_keuangan}><img src={left} alt="" /></button>
                                <input className='page-number' type="text" value={pagination_lpj_keuangan?.current_page} />
                                <button className='right' onClick={handleNext_Lpj_keuangan}><img src={right} alt="" /></button>
                            </div>

                            {lpj_keuangan.length > 0 ? (
                            <table>
                                <tr>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Nomor</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Unit</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Nama Kegiatan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Tanggal Pelaksanaan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Tanggal & Jam Pengajuan Proposal</th>
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
                                    <th>Keterangan</th>
                                    <th>Tanggal & Jam di Terima</th>
                                </tr>
                            {lpj_keuangan.map((item, index) => (
                                <tr key={item.id_lpj}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.units}</td>
                                    <td style={{textAlign:'center'}}>{item.nama_kegiatan}</td>
                                    <td style={{textAlign:'center'}}>{item.rencana_pelaksana}</td>
                                    <td style={{textAlign:'center'}}>{item.today} <br /> {item.today_jam}</td>
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
                                    <td style={{textAlign:'center'}}> <button onClick={() => handleOpenLPJ(item.id_lpj)} className='B-update'>Ubah</button> | 
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
                          <div className='content'>
                            <h1>Progress Pengajuan Proposal dan LPJ Kasubag</h1>
                            <div className='pagination'>
                                <button className='left' onClick={handlePrev_Lpj_lv1}><img src={left} alt="" /></button>
                                <input className='page-number' type="text" value={pagination_lpj_lv1?.current_page} />
                                <button className='right' onClick={handleNext_Lpj_lv1}><img src={right} alt="" /></button>
                            </div>                            
                            {lpj_lv1.length > 0 ? (
                            <table>
                                <tr>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Nomor</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Unit</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Nama Kegiatan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Tanggal Pelaksanaan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Tanggal & Jam Pengajuan Proposal</th>
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
                                    <th>Keterangan</th>
                                    <th>Tanggal & Jam di Terima</th>
                                </tr>
                            {lpj_lv1.map((item, index) => (
                                <tr key={item.id_lpj}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.units}</td>
                                    <td style={{textAlign:'center'}}>{item.nama_kegiatan}</td>
                                    <td style={{textAlign:'center'}}>{item.rencana_pelaksana}</td>
                                    <td style={{textAlign:'center'}}>{item.today} <br /> {item.today_jam}</td>
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
                                    <td style={{textAlign:'center'}}> <button onClick={() => handleOpenLPJ(item.id_lpj)} className='B-update'>Ubah</button> 
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
                          <div className='content'>
                            <h1>Progress Pengajuan Proposal dan LPJ Kepala Balai</h1>
                            <div className='pagination'>
                                <button className='left' onClick={handlePrev_Lpj_lv2}><img src={left} alt="" /></button>
                                <input className='page-number' type="text" value={pagination_lpj_lv2?.current_page} />
                                <button className='right' onClick={handleNext_Lpj_lv2}><img src={right} alt="" /></button>
                            </div>                            
                            {lpj_lv2.length > 0 ? (
                            <table>
                                <tr>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Nomor</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Unit</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Nama Kegiatan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Tanggal Pelaksanaan</th>
                                    <th style={{textAlign:'center'}}rowSpan={2}>Tanggal & Jam Pengajuan Proposal</th>
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
                                    <th>Keterangan</th>
                                    <th>Tanggal & Jam di Terima</th>
                                </tr>
                            {lpj_lv2.map((item, index) => (
                                <tr key={item.id_lpj}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.units}</td>
                                    <td style={{textAlign:'center'}}>{item.nama_kegiatan}</td>
                                    <td style={{textAlign:'center'}}>{item.rencana_pelaksana}</td>
                                    <td style={{textAlign:'center'}}>{item.today} <br /> {item.today_jam}</td>
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
                                    <td style={{textAlign:'center'}}> <button onClick={() => handleOpenLPJ(item.id_lpj)} className='B-update'>Ubah</button> | 
                                    <br /><div><button className='B-deleted' onClick={() => handleDeleteLPJ(item.id_lpj)} >Hapus</button></div></td>
                                </tr>                                
                            ))}
                            </table>
                            ) : (
                                <p style={{display:'flex', paddingTop:'10px', justifyContent:'center', paddingLeft:'400px'}}>tidak ada data</p>
                            )}
                          </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Content_simak