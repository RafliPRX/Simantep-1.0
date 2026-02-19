/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './content-laras.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import green from '../../assets/green.svg'
import white from '../../assets/unread.svg'
import red from '../../assets/decline.svg'
import left from '../../assets/left.svg'
import right from '../../assets/right.svg'
import Profile from '../profile';
const Content_laras = () => {
    const storedUsername = localStorage.getItem('nama');
    const storeNrk = localStorage.getItem('nrk');
    const storedSisaCuti = localStorage.getItem('sisa_cuti');
    const storedFProfile = localStorage.getItem('f_profile');
    const pj = localStorage.getItem('pj');
    const status = localStorage.getItem('Status');
    const storeidNumber = localStorage.getItem('id_number');
    console.log(storedUsername);
    console.log(storedSisaCuti );
    console.log(storedFProfile);
    console.log(storeNrk);
    console.log(pj);
    console.log(status);
    const navigate = useNavigate();
    const { level } = useParams();
    const { role } = useParams();
    const { role_sp } = useParams();
    const [fix, setFix] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination_fix, setPagination_Fix] = useState({
        current_page: 1,
    });
    const getFix = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/SILARAS/fix_by_name.php?id=${storeidNumber}&page=${pagination_fix.current_page}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_dana = {
                total: res1.data.total_records,
                current_page: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setFix(response);
            setPagination_Fix(pagination_dana);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [fix_sarpras, setFix_Sarpras] = useState([]);
    const [pagination_fix_sarpras, setPagination_Fix_Sarpras] = useState({
        current_page: 1,
    });
    const getFix_Sarpras = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/SILARAS/fix.php?page=${pagination_fix_sarpras.current_page}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_dana = {
                total: res1.data.total_records,
                current_page: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setFix_Sarpras(response);
            setPagination_Fix_Sarpras(pagination_dana);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
      getFix();
      getFix_Sarpras();
    }, [pagination_fix?.current_page, pagination_fix_sarpras?.current_page]);
    const [vehicle, setVehicle] = useState([]);
    const [pagination_vehicle, setPagination_Vehicle] = useState({
      current_page: 1,
    });
    const getVehicle = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/SILARAS/vehicle_by_name.php?id=${storeidNumber}&page=${pagination_vehicle.current_page}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_dana = {
                total: res1.data.total_records,
                current_page: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setVehicle(response);
            setPagination_Vehicle(pagination_dana);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [vehicle_sarpras, setVehicle_sarpras] = useState([]);
    const [pagination_vehicle_sarpras, setPagination_Vehicle_Sarpras] = useState({
      current_page: 1,
    });
    const getVehicle_sarpras = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/SILARAS/vehicle.php?page=${pagination_vehicle_sarpras.current_page}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_dana = {
                total: res1.data.total_records,
                current_page: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setVehicle_sarpras(response);
            setPagination_Vehicle_Sarpras(pagination_dana);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
      getVehicle();
      getVehicle_sarpras();
    }, [pagination_vehicle?.current_page, pagination_vehicle_sarpras?.current_page]);

    const [request, setRequest] = useState([]);
    const [pagination_request, setPagination_Request] = useState({
      current_page: 1,
    })
    const getRequest = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/SILARAS/request_by_name.php?id=${storeidNumber}&page=${pagination_request.current_page}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_dana = {
                total: res1.data.total_records,
                current_page: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setRequest(response);
            setPagination_Request(pagination_dana);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [request_sapras, setRequest_Sapras] = useState([]);
    const [pagination_request_sapras, setPagination_Request_Sapras] = useState({
      current_page: 1,
    })
    const getRequest_Sapras = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/SILARAS/request.php?page=${pagination_request_sapras.current_page}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_dana = {
                total: res1.data.total_records,
                current_page: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setRequest_Sapras(response);
            setPagination_Request_Sapras(pagination_dana);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
      getRequest();
      getRequest_Sapras();
    }, [pagination_request?.current_page, status, storedUsername]);
    const handleNext_Fix = () => {
        setPagination_Fix({
            ...pagination_fix,
            current_page: pagination_fix?.current_page + 1
        })
    }
    const handlePrev_Fix = () => {
      setPagination_Fix({
            ...pagination_fix,
            current_page: pagination_fix?.current_page - 1
        })
    }
    const handleNext_Fix_Sarpras = () => {
        setPagination_Fix_Sarpras({
            ...pagination_fix_sarpras,
            current_page: pagination_fix_sarpras?.current_page + 1
        })
    }
    const handlePrev_Fix_Sarpras = () => {
      setPagination_Fix_Sarpras({
            ...pagination_fix_sarpras,
            current_page: pagination_fix_sarpras?.current_page - 1
        })
    }
    const handleNext_Vehicle = () => {
      setPagination_Vehicle({
          ...pagination_vehicle,
          current_page: pagination_vehicle?.current_page + 1
      })
    }
    const handlePrev_Vehicle = () => {
      setPagination_Vehicle({
            ...pagination_vehicle,
            current_page: pagination_vehicle?.current_page - 1
        })
    }
    const handleNext_Vehicle_Sarpras = () => {
      setPagination_Vehicle_Sarpras({
          ...pagination_vehicle_sarpras,
          current_page: pagination_vehicle_sarpras?.current_page + 1
      })
    }
    const handlePrev_Vehicle_Sarpras = () => {
      setPagination_Vehicle_Sarpras({
            ...pagination_vehicle_sarpras,
            current_page: pagination_vehicle_sarpras?.current_page - 1
        })
    }
    const handleNext_Request = () => {
      setPagination_Request({
          ...pagination_request,
          current_page: pagination_request?.current_page + 1
      })
    }
    const handlePrev_Request = () => {
      setPagination_Request({
            ...pagination_request,
            current_page: pagination_request?.current_page - 1
        })
    }

    const handleNext_Request_Sarpras = () => {
      setPagination_Request_Sapras({
          ...pagination_request_sapras,
          current_page: pagination_request_sapras?.current_page + 1
      })
    }
    const handlePrev_Request_Sarpras = () => {
      setPagination_Request_Sapras({
            ...pagination_request_sapras,
            current_page: pagination_request_sapras?.current_page - 1
        })
    }
    const handleDeleteFix = async (id) => {
        setIsLoading(true);
        try {
          const response = await axios.delete(`https://simantepbareta.cloud/API/SILARAS/delete_fix.php?id=${id}`, {
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
      const handleDeleteVehicle = async (id) => {
        setIsLoading(true);
        try {
          const response = await axios.delete(`https://simantepbareta.cloud/API/SILARAS/delete_vehicle.php?id=${id}`, {
            headers: {
              "Content-Type" : "multipart/form-data"
            }
          });
          console.log(response.data);
          setTimeout(() => {
            window.location.reload();
            setIsLoading(false);
          }, 1000);
        } catch (error) {
          console.log(error.response);
        }
      }
      const handleDeleteRequest = async (id) => {
        setIsLoading(true);
        try {
          const response = await axios.delete(`https://simantepbareta.cloud/API/SILARAS/delete_request.php?id=${id}`, {
            headers: {
              "Content-Type" : "multipart/form-data"
            }
          });
          console.log(response.data);
          setTimeout(() => {
            window.location.reload();
            setIsLoading(false);
          }, 500);
        } catch (error) {
          console.log(error.response);
        }
      }
      const handleOpenFix = (id) => {
        navigate(`/dashboard-laras/${level}/${role}/${role_sp}/form-perbaikan/${id}`);
      }
      const handleOpenVehicle = (id) => {
        navigate(`/dashboard-laras/${level}/${role}/${role_sp}/form-kendaraan-dinas/${id}`);
      }
      const handleOpenBHP = (id) => {
        navigate(`/dashboard-laras/${level}/${role}/${role_sp}/form-permintaan-barang-baru/${id}`);
      }
      return(
        <>
            <div className='main-dashboard'>
              {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
              </div>}
                <p>Silaras/Database Sarpras</p>
                <h1>Sistem Layanan sarana dan Prasarana</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="silaras" />
                <div className='content-col'>
                    <div className='box'>
                      { (role !== "C-03" ) &&
                        <div className='content'>
                            <h1>Daftar Form Perbaikan</h1>
                            <div className='pagination'>
                                <button className='left' onClick={handlePrev_Fix}><img src={left} alt="" /></button>
                                <input className='page-number' type="text" value={pagination_fix?.current_page} />
                                <button className='right' onClick={handleNext_Fix}><img src={right} alt="" /></button>
                            </div>
                            {fix.length > 0 ? (
                            <table>
                              <tr>
                                <th style={{textAlign:'center'}}>Nomor</th>
                                <th style={{textAlign:'center'}}>id Form</th>
                                <th style={{textAlign:'center'}}>Nama</th>
                                <th style={{textAlign:'center'}}>NIP/NRK</th>
                                <th style={{textAlign:'center'}}>Unit Kerja</th>
                                <th style={{textAlign:'center'}}>Permintaan Perbaikan</th>
                                <th style={{textAlign:'center'}}>Approval Status</th>
                                <th style={{textAlign:'center'}}>Detail</th>
                              </tr>
                              {fix.map((item, index) => (
                                <tr key={item.id}>
                                  <td style={{textAlign:'center'}}>{index + 1}</td>
                                  <td style={{textAlign:'center'}}>{item.id_fix}</td>
                                  <td style={{textAlign:'center'}}>{item.nama}</td>
                                  <td style={{textAlign:'center'}}>{item.nrk_nip}</td>
                                  <td style={{textAlign:'center'}}>{item.unit}</td>
                                  <td style={{textAlign:'center'}}>{item.fix}</td>
                                  <td style={{textAlign:'center', display: item.Approval === '1' ? 'block' : 'none', marginTop: '30px'}}> <img src={white} alt="" /> </td>
                                  <td style={{textAlign:'center', display: item.Approval === '2' ? 'block' : 'none', marginTop: '30px'}}> <img src={red} alt="" /> </td>
                                  <td style={{textAlign:'center', display: item.Approval === '3' ? 'block' : 'none', marginTop: '30px'}}> <img src={green} alt="" /> </td>                                  
                                  <td style={{textAlign:'center'}}>
                                    <button className='B-update' onClick={() => handleOpenFix(item.id_fix)}>Lihat disini</button>
                                    <br /><div><button className='B-deleted' onClick={() => handleDeleteFix(item.id_fix)}>Hapus</button></div>
                                  </td>
                                </tr>
                              ))}
                            </table>
                            ) : (
                                <p style={{display:'flex', paddingTop:'10px', justifyContent:'center', paddingLeft:'400px'}}>tidak ada data</p>
                            )}                        
                        </div>
                      }
                      {role === "C-03" && (
                        <div className='content'>
                            <h1>Daftar Form Perbaikan Sarpras</h1>
                            <div className='pagination'>
                                <button className='left' onClick={handlePrev_Fix_Sarpras}><img src={left} alt="" /></button>
                                <input className='page-number' type="text" value={pagination_fix_sarpras?.current_page} />
                                <button className='right' onClick={handleNext_Fix_Sarpras}><img src={right} alt="" /></button>
                            </div>
                            {fix_sarpras.length > 0 ? (
                            <table>
                              <tr>
                                <th style={{textAlign:'center'}}>Nomor</th>
                                <th style={{textAlign:'center'}}>id Form</th>
                                <th style={{textAlign:'center'}}>Nama</th>
                                <th style={{textAlign:'center'}}>NIP/NRK</th>
                                <th style={{textAlign:'center'}}>Unit Kerja</th>
                                <th style={{textAlign:'center'}}>Permintaan Perbaikan</th>
                                <th style={{textAlign:'center'}}>Approval Status</th>
                                <th style={{textAlign:'center'}}>Detail</th>
                              </tr>
                              {fix_sarpras.map((item, index) => (
                                <tr key={item.id}>
                                  <td style={{textAlign:'center'}}>{index + 1}</td>
                                  <td style={{textAlign:'center'}}>{item.id_fix}</td>
                                  <td style={{textAlign:'center'}}>{item.nama}</td>
                                  <td style={{textAlign:'center'}}>{item.nrk_nip}</td>
                                  <td style={{textAlign:'center'}}>{item.unit}</td>
                                  <td style={{textAlign:'center'}}>{item.fix}</td>
                                  <td style={{textAlign:'center', display: item.Approval === '1' ? 'block' : 'none', marginTop: '30px'}}> <img src={white} alt="" /> </td>
                                  <td style={{textAlign:'center', display: item.Approval === '2' ? 'block' : 'none', marginTop: '30px'}}> <img src={red} alt="" /> </td>
                                  <td style={{textAlign:'center', display: item.Approval === '3' ? 'block' : 'none', marginTop: '30px'}}> <img src={green} alt="" /> </td>                                  
                                  <td style={{textAlign:'center'}}>
                                    <button className='B-update' onClick={() => handleOpenFix(item.id_fix)}>Lihat disini</button> <br />
                                    <div><button className='B-deleted' onClick={() => handleDeleteFix(item.id_fix)}>Hapus</button></div>
                                  </td>
                                </tr>
                              ))}
                            </table>
                            ) : (
                                <p style={{display:'flex', paddingTop:'10px', justifyContent:'center', paddingLeft:'400px'}}>tidak ada data</p>
                            )}                        
                        </div>
                      )}
                      {role_sp === "S-03" && (
                        <div className='content'>
                            <h1>Daftar Form Perbaikan Sarpras</h1>
                            <div className='pagination'>
                                <button className='left' onClick={handlePrev_Fix_Sarpras}><img src={left} alt="" /></button>
                                <input className='page-number' type="text" value={pagination_fix_sarpras?.current_page} />
                                <button className='right' onClick={handleNext_Fix_Sarpras}><img src={right} alt="" /></button>
                            </div>
                            {fix_sarpras.length > 0 ? (
                            <table>
                              <tr>
                                <th style={{textAlign:'center'}}>Nomor</th>
                                <th style={{textAlign:'center'}}>id Form</th>
                                <th style={{textAlign:'center'}}>Nama</th>
                                <th style={{textAlign:'center'}}>NIP/NRK</th>
                                <th style={{textAlign:'center'}}>Unit Kerja</th>
                                <th style={{textAlign:'center'}}>Permintaan Perbaikan</th>
                                <th style={{textAlign:'center'}}>Approval Status</th>
                                <th style={{textAlign:'center'}}>Detail</th>
                              </tr>
                              {fix_sarpras.map((item, index) => (
                                <tr key={item.id}>
                                  <td style={{textAlign:'center'}}>{index + 1}</td>
                                  <td style={{textAlign:'center'}}>{item.id_fix}</td>
                                  <td style={{textAlign:'center'}}>{item.nama}</td>
                                  <td style={{textAlign:'center'}}>{item.nrk_nip}</td>
                                  <td style={{textAlign:'center'}}>{item.unit}</td>
                                  <td style={{textAlign:'center'}}>{item.fix}</td>
                                  <td style={{textAlign:'center', display: item.Approval === '1' ? 'block' : 'none', marginTop: '30px'}}> <img src={white} alt="" /> </td>
                                  <td style={{textAlign:'center', display: item.Approval === '2' ? 'block' : 'none', marginTop: '30px'}}> <img src={red} alt="" /> </td>
                                  <td style={{textAlign:'center', display: item.Approval === '3' ? 'block' : 'none', marginTop: '30px'}}> <img src={green} alt="" /> </td>                                  
                                  <td style={{textAlign:'center'}}>
                                    <button className='B-update' onClick={() => handleOpenFix(item.id_fix)}>Lihat disini</button>
                                    <br /><div><button className='B-deleted' onClick={() => handleDeleteFix(item.id_fix)}>Hapus</button></div>
                                  </td>
                                </tr>
                              ))}
                            </table>
                            ) : (
                                <p style={{display:'flex', paddingTop:'10px', justifyContent:'center', paddingLeft:'400px'}}>tidak ada data</p>
                            )}                        
                        </div>
                      )}
                      { (role !== "C-03" ) &&(
                          <div className='content'>
                            <h1>Daftar Form Peminjaman Kendaraan Dinas</h1>
                            <div className='pagination'>
                                <button className='left' onClick={handlePrev_Vehicle}><img src={left} alt="" /></button>
                                <input className='page-number' type="text" value={pagination_vehicle_sarpras?.current_page} />
                                <button className='right' onClick={handleNext_Vehicle}><img src={right} alt="" /></button>
                            </div>
                            {vehicle.length > 0 ? (
                            <table>
                                <tr>
                                    <th style={{textAlign:'center'}}>Nomor</th>
                                    <th style={{textAlign:'center'}}>id Form</th>
                                    <th style={{textAlign:'center'}}>Nama</th>
                                    <th style={{textAlign:'center'}}>Unit Kerja</th>
                                    <th style={{textAlign:'center'}}>Jenis Peminjaman Kendaraan</th>
                                    <th style={{textAlign:'center'}}>Tujuan Peminjaman</th>
                                    <th style={{textAlign:'center'}}>Keperluan Peminjaman</th>
                                    <th style={{textAlign:'center'}}>Tanggal Peminjaman</th>
                                    <th style={{textAlign:'center'}}>Jam Peminjaman</th>
                                    <th style={{textAlign:'center'}}>Durasi Peminjaman</th>
                                    <th style={{textAlign:'center'}}>Approval Status</th>
                                    <th style={{textAlign:'center'}}>Detail</th>
                                </tr>
                              {vehicle.map((item, index) => (
                                <tr key={item.id}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.id_vehicle}</td>
                                    <td style={{textAlign:'center'}}>{item.nama}</td>
                                    <td style={{textAlign:'center'}}>{item.unit}</td>
                                    <td style={{textAlign:'center'}}>{item.jenis}</td>
                                    <td style={{textAlign:'center'}}>{item.tujuan}</td>
                                    <td style={{textAlign:'center'}}>{item.keperluan}</td>
                                    <td style={{textAlign:'center'}}>{item.tanggal_pinjam}</td>
                                    <td style={{textAlign:'center'}}>{item.jam_pinjam}</td>
                                    <td style={{textAlign:'center'}}>{item.durasi_pinjam}</td>
                                    <td style={{textAlign:'center', display: item.Approval === '1' ? 'block' : 'none', marginTop: '30px'}}> <img src={white} alt="" /> </td>
                                    <td style={{textAlign:'center', display: item.Approval === '2' ? 'block' : 'none', marginTop: '30px'}}> <img src={red} alt="" /> </td>
                                    <td style={{textAlign:'center', display: item.Approval === '3' ? 'block' : 'none', marginTop: '30px'}}> <img src={green} alt="" /> </td>
                                    <td style={{textAlign:'center'}}><button className='B-update' onClick={() => handleOpenVehicle(item.id_vehicle)}>Lihat Disini</button>
                                    <br /><div><button className='B-deleted' onClick={() => handleDeleteVehicle(item.id_vehicle)}>Hapus</button></div> 
                                    </td>
                                </tr>
                          ))}
                            </table>
                            ) : (
                                <p style={{display:'flex', paddingTop:'10px', justifyContent:'center', paddingLeft:'400px'}}>tidak ada data</p>
                            )}                        
                        </div>
                      )}
                      { role === "C-03" && (
                        <div className='content'>
                            <h1>Daftar Form Peminjaman Kendaraan Dinas Sarpras</h1>
                            <div className='pagination'>
                                <button className='left' onClick={handlePrev_Vehicle_Sarpras}><img src={left} alt="" /></button>
                                <input className='page-number' type="text" value={pagination_vehicle_sarpras?.current_page} />
                                <button className='right' onClick={handleNext_Vehicle_Sarpras}><img src={right} alt="" /></button>
                            </div>
                            {vehicle_sarpras.length > 0 ? (
                            <table>
                                <tr>
                                    <th style={{textAlign:'center'}}>Nomor</th>
                                    <th style={{textAlign:'center'}}>id Form</th>
                                    <th style={{textAlign:'center'}}>Nama</th>
                                    <th style={{textAlign:'center'}}>Unit Kerja</th>
                                    <th style={{textAlign:'center'}}>Jenis Peminjaman Kendaraan</th>
                                    <th style={{textAlign:'center'}}>Tujuan Peminjaman</th>
                                    <th style={{textAlign:'center'}}>Keperluan Peminjaman</th>
                                    <th style={{textAlign:'center'}}>Tanggal Peminjaman</th>
                                    <th style={{textAlign:'center'}}>Jam Peminjaman</th>
                                    <th style={{textAlign:'center'}}>Durasi Peminjaman</th>
                                    <th style={{textAlign:'center'}}>Approval Status</th>
                                    <th style={{textAlign:'center'}}>Detail</th>
                                </tr>
                              {vehicle_sarpras.map((item, index) => (
                                <tr key={item.id}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.id_vehicle}</td>
                                    <td style={{textAlign:'center'}}>{item.nama}</td>
                                    <td style={{textAlign:'center'}}>{item.unit}</td>
                                    <td style={{textAlign:'center'}}>{item.jenis}</td>
                                    <td style={{textAlign:'center'}}>{item.tujuan}</td>
                                    <td style={{textAlign:'center'}}>{item.keperluan}</td>
                                    <td style={{textAlign:'center'}}>{item.tanggal_pinjam}</td>
                                    <td style={{textAlign:'center'}}>{item.jam_pinjam}</td>
                                    <td style={{textAlign:'center'}}>{item.durasi_pinjam}</td>
                                    <td style={{textAlign:'center', display: item.Approval === '1' ? 'block' : 'none', marginTop: '30px'}}> <img src={white} alt="" /> </td>
                                    <td style={{textAlign:'center', display: item.Approval === '2' ? 'block' : 'none', marginTop: '30px'}}> <img src={red} alt="" /> </td>
                                    <td style={{textAlign:'center', display: item.Approval === '3' ? 'block' : 'none', marginTop: '30px'}}> <img src={green} alt="" /> </td>
                                    <td style={{textAlign:'center'}}><button className='B-update' onClick={() => handleOpenVehicle(item.id_vehicle)}>Lihat Disini</button>
                                    <br /><div><button className='B-deleted' onClick={() => handleDeleteVehicle(item.id_vehicle)}>Hapus</button></div> 
                                    </td>
                                </tr>
                          ))}
                            </table>
                            ) : (
                                <p style={{display:'flex', paddingTop:'10px', justifyContent:'center', paddingLeft:'400px'}}>tidak ada data</p>
                            )}                        
                        </div>
                      )}
                      { role === "S-03" && (
                        <div className='content'>
                            <h1>Daftar Form Peminjaman Kendaraan Dinas Sarpras</h1>
                            <div className='pagination'>
                                <button className='left' onClick={handlePrev_Vehicle_Sarpras}><img src={left} alt="" /></button>
                                <input className='page-number' type="text" value={pagination_vehicle_sarpras?.current_page} />
                                <button className='right' onClick={handleNext_Vehicle_Sarpras}><img src={right} alt="" /></button>
                            </div>
                            {vehicle_sarpras.length > 0 ? (
                            <table>
                                <tr>
                                    <th style={{textAlign:'center'}}>Nomor</th>
                                    <th style={{textAlign:'center'}}>id Form</th>
                                    <th style={{textAlign:'center'}}>Nama</th>
                                    <th style={{textAlign:'center'}}>Unit Kerja</th>
                                    <th style={{textAlign:'center'}}>Jenis Peminjaman Kendaraan</th>
                                    <th style={{textAlign:'center'}}>Tujuan Peminjaman</th>
                                    <th style={{textAlign:'center'}}>Keperluan Peminjaman</th>
                                    <th style={{textAlign:'center'}}>Tanggal Peminjaman</th>
                                    <th style={{textAlign:'center'}}>Jam Peminjaman</th>
                                    <th style={{textAlign:'center'}}>Durasi Peminjaman</th>
                                    <th style={{textAlign:'center'}}>Approval Status</th>
                                    <th style={{textAlign:'center'}}>Detail</th>
                                </tr>
                              {vehicle_sarpras.map((item, index) => (
                                <tr key={item.id}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.id_vehicle}</td>
                                    <td style={{textAlign:'center'}}>{item.nama}</td>
                                    <td style={{textAlign:'center'}}>{item.unit}</td>
                                    <td style={{textAlign:'center'}}>{item.jenis}</td>
                                    <td style={{textAlign:'center'}}>{item.tujuan}</td>
                                    <td style={{textAlign:'center'}}>{item.keperluan}</td>
                                    <td style={{textAlign:'center'}}>{item.tanggal_pinjam}</td>
                                    <td style={{textAlign:'center'}}>{item.jam_pinjam}</td>
                                    <td style={{textAlign:'center'}}>{item.durasi_pinjam}</td>
                                    <td style={{textAlign:'center', display: item.Approval === '1' ? 'block' : 'none', marginTop: '30px'}}> <img src={white} alt="" /> </td>
                                    <td style={{textAlign:'center', display: item.Approval === '2' ? 'block' : 'none', marginTop: '30px'}}> <img src={red} alt="" /> </td>
                                    <td style={{textAlign:'center', display: item.Approval === '3' ? 'block' : 'none', marginTop: '30px'}}> <img src={green} alt="" /> </td>
                                    <td style={{textAlign:'center'}}><button className='B-update' onClick={() => handleOpenVehicle(item.id_vehicle)}>Lihat Disini</button>
                                    <br /><div><button className='B-deleted' onClick={() => handleDeleteVehicle(item.id_vehicle)}>Hapus</button></div> 
                                    </td>
                                </tr>
                          ))}
                            </table>
                            ) : (
                                <p style={{display:'flex', paddingTop:'10px', justifyContent:'center', paddingLeft:'400px'}}>tidak ada data</p>
                            )}                        
                        </div>
                      )}
                      {(role !== "C-03" ) && (
                        <div className='content'>
                            <h1>Daftar Form Permohonan Barang Habis Pakai dan Alat Tulis Kantor Sarpras</h1>
                            <div className='pagination'>
                                <button className='left' onClick={handlePrev_Request}><img src={left} alt="" /></button>
                                <input className='page-number' type="text" value={pagination_request?.current_page} />
                                <button className='right' onClick={handleNext_Request}><img src={right} alt="" /></button>
                            </div>
                            {request.length > 0 ? (
                            <table>
                                <tr>
                                   <th style={{textAlign:'center'}}>Nomor</th>
                                   <th style={{textAlign:'center'}}>id Form</th>
                                   <th style={{textAlign:'center'}}>Nama</th>
                                   <th style={{textAlign:'center'}}>NIP/NRK</th>
                                   <th style={{textAlign:'center'}}>Unit Kerja</th>
                                   <th style={{textAlign:'center'}}>Permohonan Barang</th>
                                   <th style={{textAlign:'center'}}>Approval Status</th>
                                   <th style={{textAlign:'center'}}>Detail</th>
                                </tr>
                              {request.map((item, index) => (
                                <tr key={item.id}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.id_bhp}</td>
                                    <td style={{textAlign:'center'}}>{item.nama}</td>
                                    <td style={{textAlign:'center'}}>{item.nrk_nip}</td>
                                    <td style={{textAlign:'center'}}>{item.unit}</td>
                                    <td style={{textAlign:'center'}}>{item.barang}</td>
                                    <td style={{textAlign:'center', display: item.Approval === '1' ? 'block' : 'none', marginTop: '30px'}}> <img src={white} alt="" /> </td>
                                    <td style={{textAlign:'center', display: item.Approval === '2' ? 'block' : 'none', marginTop: '30px'}}> <img src={red} alt="" /> </td>
                                    <td style={{textAlign:'center', display: item.Approval === '3' ? 'block' : 'none', marginTop: '30px'}}> <img src={green} alt="" /> </td>
                                    <td style={{textAlign:'center'}}> <button className='B-update' onClick={() => handleOpenBHP(item.id_bhp)}>Lihat Disini</button>
                                    <br /><div><button className='B-deleted' onClick={() => handleDeleteRequest(item.id_bhp)}>Hapus</button></div>
                                </td>
                            </tr>
                          ))}
                            </table>
                            ) : (
                                <p style={{display:'flex', paddingTop:'10px', justifyContent:'center', paddingLeft:'400px'}}>tidak ada data</p>
                            )}                        
                        </div>
                      )}
                      { role === "C-03" && (
                        <div className='content'>
                            <h1>Daftar Form Permohonan Barang Habis Pakai dan Alat Tulis Kantor Sarpras</h1>
                            <div className='pagination'>
                                <button className='left' onClick={handlePrev_Request_Sarpras}><img src={left} alt="" /></button>
                                <input className='page-number' type="text" value={pagination_request_sapras?.current_page} />
                                <button className='right' onClick={handleNext_Request_Sarpras}><img src={right} alt="" /></button>
                            </div>
                            {request_sapras.length > 0 ? (
                            <table>
                                <tr>
                                   <th style={{textAlign:'center'}}>Nomor</th>
                                   <th style={{textAlign:'center'}}>id Form</th>
                                   <th style={{textAlign:'center'}}>Nama</th>
                                   <th style={{textAlign:'center'}}>NIP/NRK</th>
                                   <th style={{textAlign:'center'}}>Unit Kerja</th>
                                   <th style={{textAlign:'center'}}>Permohonan Barang</th>
                                   <th style={{textAlign:'center'}}>Approval Status</th>
                                   <th style={{textAlign:'center'}}>Detail</th>
                                </tr>
                              {request_sapras.map((item, index) => (
                                <tr key={item.id}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.id_bhp}</td>
                                    <td style={{textAlign:'center'}}>{item.nama}</td>
                                    <td style={{textAlign:'center'}}>{item.nrk_nip}</td>
                                    <td style={{textAlign:'center'}}>{item.unit}</td>
                                    <td style={{textAlign:'center'}}>{item.barang}</td>
                                    <td style={{textAlign:'center', display: item.Approval === '1' ? 'block' : 'none', marginTop: '30px'}}> <img src={white} alt="" /> </td>
                                    <td style={{textAlign:'center', display: item.Approval === '2' ? 'block' : 'none', marginTop: '30px'}}> <img src={red} alt="" /> </td>
                                    <td style={{textAlign:'center', display: item.Approval === '3' ? 'block' : 'none', marginTop: '30px'}}> <img src={green} alt="" /> </td>
                                    <td style={{textAlign:'center'}}><button className='B-update' onClick={() => handleOpenBHP(item.id_bhp)}>Lihat Disini</button>
                                    <br /><div><button className='B-deleted' onClick={() => handleDeleteRequest(item.id_bhp)}>Hapus</button></div>
                                </td>
                            </tr>
                          ))}
                            </table>
                            ) : (
                                <p style={{display:'flex', paddingTop:'10px', justifyContent:'center', paddingLeft:'400px'}}>tidak ada data</p>
                            )}                        
                        </div>
                      )}
                      { role_sp === "S-03" && (
                        <div className='content'>
                            <h1>Daftar Form Permohonan Barang Habis Pakai dan Alat Tulis Kantor</h1>
                            <div className='pagination'>
                                <button className='left' onClick={handlePrev_Request_Sarpras}><img src={left} alt="" /></button>
                                <input className='page-number' type="text" value={pagination_request_sapras?.current_page} />
                                <button className='right' onClick={handleNext_Request_Sarpras}><img src={right} alt="" /></button>
                            </div>
                            {request_sapras.length > 0 ? (
                            <table>
                                <tr>
                                   <th style={{textAlign:'center'}}>Nomor</th>
                                   <th style={{textAlign:'center'}}>id Form</th>
                                   <th style={{textAlign:'center'}}>Nama</th>
                                   <th style={{textAlign:'center'}}>NIP/NRK</th>
                                   <th style={{textAlign:'center'}}>Unit Kerja</th>
                                   <th style={{textAlign:'center'}}>Permohonan Barang</th>
                                   <th style={{textAlign:'center'}}>Approval Status</th>
                                   <th style={{textAlign:'center'}}>Detail</th>
                                </tr>
                              {request_sapras.map((item, index) => (
                                <tr key={item.id}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.id_bhp}</td>
                                    <td style={{textAlign:'center'}}>{item.nama}</td>
                                    <td style={{textAlign:'center'}}>{item.nrk_nip}</td>
                                    <td style={{textAlign:'center'}}>{item.unit}</td>
                                    <td style={{textAlign:'center'}}>{item.barang}</td>
                                    <td style={{textAlign:'center', display: item.Approval === '1' ? 'block' : 'none', marginTop: '30px'}}> <img src={white} alt="" /> </td>
                                    <td style={{textAlign:'center', display: item.Approval === '2' ? 'block' : 'none', marginTop: '30px'}}> <img src={red} alt="" /> </td>
                                    <td style={{textAlign:'center', display: item.Approval === '3' ? 'block' : 'none', marginTop: '30px'}}> <img src={green} alt="" /> </td>
                                    <td style={{textAlign:'center'}}><button className='B-update' onClick={() => handleOpenBHP(item.id_bhp)}>Lihat Disini</button>
                                    <br /><div><button className='B-deleted' onClick={() => handleDeleteRequest(item.id_bhp)}>Hapus</button></div>
                                </td>
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
export default Content_laras
