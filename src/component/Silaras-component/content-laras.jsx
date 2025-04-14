/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './content-laras.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import green from '../../assets/green.svg'
import white from '../../assets/unread.svg'
import red from '../../assets/decline.svg'
const Content_laras = () => {
    const storedUsername = localStorage.getItem('nama');
    const storeNrk = localStorage.getItem('nrk');
    const storedSisaCuti = localStorage.getItem('sisa_cuti');
    const storedFProfile = localStorage.getItem('f_profile');
    const pj = localStorage.getItem('pj');
    const status = localStorage.getItem('Status');
    console.log(storedUsername);
    console.log(storedSisaCuti );
    console.log(storedFProfile);
    console.log(storeNrk);
    console.log(pj);
    console.log(status);
    
    const [fix, setFix] = useState([]);
    const [pagination_fix, setPagination_Fix] = useState({
        current_page: 1,
    });
    const getFix = async () => {
      if (status === "Pj. Rumah Tanggal dan Aset") {
        try {
          axios.get(`https://simantepbareta.cloud/API/SILARAS/fix.php?page=${pagination_fix.current_page}`)
          .then((res1) => {
              console.log(res1.data.Data);
              const response = res1.data.Data;

              const pagination_fix = {
                  total: res1.data.total_records,
                  current_page: res1.data.current_page,
                  nextPage: res1.data.nextPage, // Corrected to match the response structure    
              }
              setFix(response);
              setPagination_Fix(pagination_fix);
              console.log(response);
          })
        } catch (error) {
            console.log(error.response);
        }
      } else {
        try {
          axios.get(`https://simantepbareta.cloud/API/SILARAS/fix_by_name.php?nama=${storedUsername}&page=${pagination_fix.current_page}`)
          .then((res1) => {
              console.log(res1.data.Data);
              const response = res1.data.Data;

              const pagination_fix = {
                  total: res1.data.total_records,
                  current_page: res1.data.current_page,
                  nextPage: res1.data.nextPage, // Corrected to match the response structure    
              }
              setFix(response);
              setPagination_Fix(pagination_fix);
              console.log(response);
          })
        } catch (error) {
            console.log(error.response);
        }
      }
    };
    useEffect(() => {
      getFix();
    }, [pagination_fix?.current_page]);
    const [vehicle, setVehicle] = useState([]);
    const [pagination_vehicle, setPagination_Vehicle] = useState({
      current_page: 1,
    });
    const getVehicle = async () => {
      if (status === "Pj. Rumah Tanggal dan Aset") {
        try {
          axios.get(`https://simantepbareta.cloud/API/SILARAS/vehicle.php?page=${pagination_vehicle.current_page}`)
          .then((res2) => {
              console.log(res2.data.Data);
              const response = res2.data.Data;

              const pagination_vehicle = {
                  total: res2.data.total_records,
                  current_page: res2.data.current_page,
                  nextPage: res2.data.nextPage, // Corrected to match the response structure    
              }
              setVehicle(response);
              setPagination_Vehicle(pagination_vehicle);
              console.log(response);
          })
        } catch (error) {
            console.log(error.response);
        }
      } else {
        try {
          axios.get(`https://simantepbareta.cloud/API/SILARAS/vehicle_by_name.php?nama=${storedUsername}&page=${pagination_vehicle.current_page}`)
          .then((res2) => {
              console.log(res2.data.Data);
              const response = res2.data.Data;

              const pagination_vehicle = {
                  total: res2.data.total_records,
                  current_page: res2.data.current_page,
                  nextPage: res2.data.nextPage, // Corrected to match the response structure    
              }
              setVehicle(response);
              setPagination_Vehicle(pagination_vehicle);
              console.log(response);
          })
        } catch (error) {
            console.log(error.response);
        }
      }
    }
    useEffect(() => {
      getVehicle();
    }, [pagination_vehicle?.current_page]);

    const [request, setRequest] = useState([]);
    const [pagination_request, setPagination_Request] = useState({
      current_page: 1,
    })
    const getRequest = async () => {
      if (status === "Pj. Rumah Tanggal dan Aset") {
        try {
          axios.get(`https://simantepbareta.cloud/API/SILARAS/request.php?page=${pagination_request.current_page}`)
          .then((res3) => {
              console.log(res3.data.Data);
              const response = res3.data.Data;

              const pagination_request = {
                  total: res3.data.total_records,
                  current_page: res3.data.current_page,
                  nextPage: res3.data.nextPage, // Corrected to match the response structure    
              }
              setRequest(response);
              setPagination_Request(pagination_request);
              console.log(response);
          })
        } catch (error) {
            console.log(error.response);
        }
      } else {
        try {
          axios.get(`https://simantepbareta.cloud/API/SILARAS/request_by_name.php?nama=${storedUsername}&page=${pagination_request.current_page}`)
          .then((res3) => {
              console.log(res3.data.Data);
              const response = res3.data.Data;

              const pagination_request = {
                  total: res3.data.total_records,
                  current_page: res3.data.current_page,
                  nextPage: res3.data.nextPage, // Corrected to match the response structure    
              }
              setRequest(response);
              setPagination_Request(pagination_request);
              console.log(response);
          })
        } catch (error) {
            console.log(error.response);
        }
      }
    };
    useEffect(() => {
      getRequest();
    }, [pagination_request?.current_page]);
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
    const handleDeleteFix = async (id) => {
        try {
          const response = await axios.delete(`https://simantepbareta.cloud/API/SILARAS/delete_fix.php?id=${id}`, {
            headers: {
              "Content-Type" : "multipart/form-data"
            }
          });
          console.log(response.data);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } catch (error) {
          console.log(error.response);
        }
      }
      const handleDeleteVehicle = async (id) => {

        try {
          const response = await axios.delete(`https://simantepbareta.cloud/API/SILARAS/delete_vehicle.php?id=${id}`, {
            headers: {
              "Content-Type" : "multipart/form-data"
            }
          });
          console.log(response.data);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } catch (error) {
          console.log(error.response);
        }
      }
      const handleDeleteRequest = async (id) => {

        try {
          const response = await axios.delete(`https://simantepbareta.cloud/API/SILARAS/delete_request.php?id=${id}`, {
            headers: {
              "Content-Type" : "multipart/form-data"
            }
          });
          console.log(response.data);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } catch (error) {
          console.log(error.response);
        }
      }
      return(
        <>
            <div className='main-dashboard'>
                <p>Silaras/Dashboard</p>
                <h1>Main Dashboard</h1>
                <div className='profile'>
                <p style={{fontFamily: 'Poppins', fontSize: '15px', marginTop: '22px'}}>{storedUsername}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <g clipPath="url(#clip0_5_1232)">
                        <path d="M19.29 17.29L18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.62999 5.36 5.99999 7.92 5.99999 11V16L4.70999 17.29C4.07999 17.92 4.51999 19 5.40999 19H18.58C19.48 19 19.92 17.92 19.29 17.29ZM16 17H7.99999V11C7.99999 8.52 9.50999 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17ZM12 22C13.1 22 14 21.1 14 20H9.99999C9.99999 21.1 10.89 22 12 22Z" fill="white"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_5_1232">
                          <rect width="24" height="24" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 18 18" fill="none">
                      <g clipPath="url(#clip0_5_1230)">
                        <path d="M9.95691 18C12.7329 18 15.2683 16.737 16.948 14.6675C17.1965 14.3613 16.9255 13.9141 16.5415 13.9872C12.175 14.8188 8.1651 11.4709 8.1651 7.06303C8.1651 4.52398 9.52431 2.18914 11.7334 0.931992C12.0739 0.738211 11.9883 0.221941 11.6013 0.150469C11.0589 0.0504468 10.5085 8.21369e-05 9.95691 0C4.98902 0 0.956909 4.02578 0.956909 9C0.956909 13.9679 4.98269 18 9.95691 18Z" fill="white"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_5_1230">
                          <rect width="18" height="18" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <div className='pic'></div>
                </div>
                <div className='content-col'>
                    <div className='box'>
                        <div className='content'>
                            <h1>Daftar Form Perbaikan</h1>
                            <div>
                                <button onClick={handlePrev_Fix}>Previous</button>
                                <button onClick={handleNext_Fix}>Next</button>
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
                                  <td style={{textAlign:'center'}}>{item.id}</td>
                                  <td style={{textAlign:'center'}}>{item.nama}</td>
                                  <td style={{textAlign:'center'}}>{item.nrk}</td>
                                  <td style={{textAlign:'center'}}>{item.unit}</td>
                                  <td style={{textAlign:'center'}}>{item.fix}</td>
                                  <td style={{textAlign:'center', display: item.Approval === '1' ? 'block' : 'none', marginTop: '30px'}}> <img src={white} alt="" /> </td>
                                  <td style={{textAlign:'center', display: item.Approval === '2' ? 'block' : 'none', marginTop: '30px'}}> <img src={red} alt="" /> </td>
                                  <td style={{textAlign:'center', display: item.Approval === '3' ? 'block' : 'none', marginTop: '30px'}}> <img src={green} alt="" /> </td>                                  
                                  <td style={{textAlign:'center'}}>
                                    <Link to={`/form-perbaikan/${item.id}`}>Lihat Disini |</Link>
                                    <br /><div><button className='putih' onClick={() => handleDeleteFix(item.id)}>Hapus</button></div>
                                  </td>
                                </tr>
                              ))}
                            </table>
                            ) : (
                                <p style={{display:'flex', paddingTop:'10px', justifyContent:'center', paddingLeft:'400px'}}>tidak ada data</p>
                            )}                        
                        </div>
                        <div className='content'>
                            <h1>Daftar Form Peminjaman Kendaraan Dinas</h1>
                            <div>
                                <button onClick={handlePrev_Vehicle}>Previous</button>
                                <button onClick={handleNext_Vehicle}>Next</button>
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
                                    <td style={{textAlign:'center'}}>{item.id}</td>
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
                                    <td style={{textAlign:'center'}}><Link to={`/form-kendaraan-dinas/${item.id}`}>Lihat Disini|</Link>
                                    <br /><div><button onClick={() => handleDeleteVehicle(item.id)}>Hapus</button></div> 
                                    </td>
                                </tr>
                          ))}
                            </table>
                            ) : (
                                <p style={{display:'flex', paddingTop:'10px', justifyContent:'center', paddingLeft:'400px'}}>tidak ada data</p>
                            )}                        
                        </div>
                        <div className='content'>
                            <h1>Daftar Form Permohonan Barang Habis Pakai dan Alat Tulis Kantor</h1>
                            <div>
                                <button onClick={handlePrev_Request}>Previous</button>
                                <button onClick={handleNext_Request}>Next</button>
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
                                    <td style={{textAlign:'center'}}>{item.id}</td>
                                    <td style={{textAlign:'center'}}>{item.nama}</td>
                                    <td style={{textAlign:'center'}}>{item.nrk}</td>
                                    <td style={{textAlign:'center'}}>{item.unit}</td>
                                    <td style={{textAlign:'center'}}>{item.barang}</td>
                                    <td style={{textAlign:'center', display: item.Approval === '1' ? 'block' : 'none', marginTop: '30px'}}> <img src={white} alt="" /> </td>
                                    <td style={{textAlign:'center', display: item.Approval === '2' ? 'block' : 'none', marginTop: '30px'}}> <img src={red} alt="" /> </td>
                                    <td style={{textAlign:'center', display: item.Approval === '3' ? 'block' : 'none', marginTop: '30px'}}> <img src={green} alt="" /> </td>
                                    <td style={{textAlign:'center'}}><Link to={`/form-permintaan-barang-baru/${item.id}`}>Lihat Disini|</Link>
                                    <br /><div><button onClick={() => handleDeleteRequest(item.id)}>Hapus</button></div>
                                </td>
                            </tr>
                          ))}
                            </table>
                            ) : (
                                <p style={{display:'flex', paddingTop:'10px', justifyContent:'center', paddingLeft:'400px'}}>tidak ada data</p>
                            )}                        
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Content_laras
