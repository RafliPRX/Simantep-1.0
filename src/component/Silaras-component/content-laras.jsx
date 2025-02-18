import { useEffect, useState } from 'react';
import './content-laras.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
// import green from '../../assets/green.svg'
const Content_laras = () => {
    const [fix, setFix] = useState([]);

    const getFix = async () => {
        try {
            const response = await axios.get("http://localhost/Simantep_API/SILARAS/fix.php", {
                headers: {}
            });
            console.log(response.data); // Log the response data
            setFix(response.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        getFix();
    }, []);

    const [vehicle, setVehicle] = useState([]);

    const getVehicle = async () => {
        try {
            const response = await axios.get("http://localhost/Simantep_API/SILARAS/vehicle.php", {
                headers: {}
            })
            console.log(response.data);
            setVehicle(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getVehicle();
    }, [])
    const [request, setRequest] = useState([]);
    const getRequest = async () => {
        try {
            const response = await axios.get("http://localhost/Simantep_API/SILARAS/request.php", {
                headers: {}
            })
            console.log(response.data);
            setRequest(response.data);
        } catch (error) {
            console.log(error.response);
        }
    };
    useEffect(() => {
        getRequest();
    }, [])
    const handleDeleteFix = async (id) => {
        try {
          const response = await axios.delete(`http://localhost/Simantep_API/SILARAS/delete_fix.php?id=${id}`, {
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
          const response = await axios.delete(`http://localhost/Simantep_API/SILARAS/delete_vehicle.php?id=${id}`, {
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
          const response = await axios.delete(`http://localhost/Simantep_API/SILARAS/delete_request.php?id=${id}`, {
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
                    <input placeholder='Search' type="text" />
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
                            {fix.length > 0 ? (
                            <table>
                              <tr>
                                <th style={{textAlign:'center'}}>Nomor</th>
                                <th style={{textAlign:'center'}}>id Form</th>
                                <th style={{textAlign:'center'}}>Nama</th>
                                <th style={{textAlign:'center'}}>NIP/NRK</th>
                                <th style={{textAlign:'center'}}>Unit Kerja</th>
                                <th style={{textAlign:'center'}}>Permintaan Perbaikan</th>
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
                    </div>
                    <div className='box'>
                        <div className='content'>
                            <h1>Daftar Form Peminjaman Kendaraan Dinas</h1>
                            {vehicle.length > 0 ? (
                            <table>
                                <tr>
                                    <th style={{textAlign:'center'}}>Nomor</th>
                                    <th style={{textAlign:'center'}}>id Form</th>
                                    <th style={{textAlign:'center'}}>Nama</th>
                                    <th style={{textAlign:'center'}}>Unit Kerja</th>
                                    <th style={{textAlign:'center'}}>Jenis Peminjaman Kendaraan</th>
                                    <th style={{textAlign:'center'}}>Tanggal Peminjaman</th>
                                    <th style={{textAlign:'center'}}>Jam Peminjaman</th>
                                    <th style={{textAlign:'center'}}>Durasi Peminjaman</th>
                                    <th style={{textAlign:'center'}}>Detail</th>
                                </tr>
                              {vehicle.map((item, index) => (
                                <tr key={item.id}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.id}</td>
                                    <td style={{textAlign:'center'}}>{item.nama}</td>
                                    <td style={{textAlign:'center'}}>{item.unit}</td>
                                    <td style={{textAlign:'center'}}>{item.jenis}</td>
                                    <td style={{textAlign:'center'}}>{item.tanggal_pinjam}</td>
                                    <td style={{textAlign:'center'}}>{item.jam_pinjam}</td>
                                    <td style={{textAlign:'center'}}>{item.durasi_pinjam}</td>
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
                    </div>
                    <div className='box'>
                        <div className='content'>
                            <h1>Daftar Form Permohonan Barang Habis Pakai dan Alat Tulis Kantor</h1>
                            {request.length > 0 ? (
                            <table>
                                <tr>
                                   <th style={{textAlign:'center'}}>Nomor</th>
                                   <th style={{textAlign:'center'}}>id Form</th>
                                   <th style={{textAlign:'center'}}>Nama</th>
                                   <th style={{textAlign:'center'}}>NIP/NRK</th>
                                   <th style={{textAlign:'center'}}>Unit Kerja</th>
                                   <th style={{textAlign:'center'}}>Permohonan Barang</th>
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
