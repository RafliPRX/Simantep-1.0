import './content.css'
import green from '../../assets/green.svg'
import red from '../../assets/decline.svg'
import white from '../../assets/unread.svg'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Content = () => {
    const storedUsername = localStorage.getItem('nama');
    const storeNrk = localStorage.getItem('nrk');
    const storedSisaCuti = localStorage.getItem('sisa_cuti');
    const storedFProfile = localStorage.getItem('f_profile');
    const storedID = localStorage.getItem('id_jabatan_sup');
    const kelompok = parseInt(localStorage.getItem('no_kelompok')) + 1;
    console.log(storedUsername);
    console.log(storedSisaCuti );
    console.log(storedFProfile);
    console.log(storeNrk);
    console.log(storedID);
    console.log(kelompok);
    
    

    const [surat, setSurat] = useState([]);
    const getSurat = async () => {
      if (storedID === "6") {
        try {
          const response = await axios.get(`http://localhost/Simantep_API/MAWASDIRI/Cuti/surat.php?nama`, {
            headers: {}
          })
          console.log(response.data);
          setSurat(response.data);
        } catch (error) {
          console.log(error.response);
        }
      } else if (storedID > "2" && storedID < "9") {
        try {
          const response = await axios.get(`http://localhost/Simantep_API/MAWASDIRI/Cuti/surat_by_kelompok.php?no_kelompok=${kelompok}`, {
            headers: {}
          })
          console.log(response.data);
          setSurat(response.data);
        } catch (error) {
          console.log(error.response);
        }

      } else {
        try {
          const response = await axios.get(`http://localhost/Simantep_API/MAWASDIRI/Cuti/surat_by_name.php?nama=${storedUsername}`, {
            headers: {}
          })
          console.log(response.data);
          setSurat(response.data);
        } catch (error) {
          console.log(error.response);
        }
      }
    }
    useEffect(() => {
      getSurat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const hadleDeleteSurat = async (id) => {
      try {
        const response = await axios.delete(`http://localhost/Simantep_API/MAWASDIRI/Cuti/delete_surat.php?id=${id}`, {
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
                <p>Mawasdiri/Dashboard</p>
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
                            <h1>Progress Pengajuan Surat</h1>
                            {surat.length > 0 ? (
                              <table>
                                  <tr>
                                      <th style={{textAlign:'center'}}>Nomor</th>
                                      <th style={{textAlign:'center'}}>id Surat</th>
                                      <th style={{textAlign:'center'}}>Nama</th>
                                      <th style={{textAlign:'center'}}>Keterangan</th>
                                      <th style={{textAlign:'center'}}>Jabatan</th>
                                      <th style={{textAlign:'center'}}>Jenis Surat</th>
                                      <th style={{textAlign:'center'}}>PJ/PM/Koordinator</th>
                                      <th style={{textAlign:'center'}}>Kepegawaian</th>
                                      <th style={{textAlign:'center'}}>Kasubag Tata Usaha</th>
                                      <th style={{textAlign:'center'}}>Surat</th>
                                  </tr>
                                  {surat.map((item, index) =>(
                                  <tr key={item.id_surat}>
                                    <td style={{textAlign:'center'}}>{index + 1}</td>
                                    <td style={{textAlign:'center'}}>{item.id_surat}</td>
                                    <td style={{textAlign:'center'}}>{item.nama}</td>
                                    <td style={{textAlign:'center'}}>{item.keterangan}</td>
                                    <td style={{textAlign:'center'}}>{item.jabatan}</td>
                                    <td style={{textAlign:'center'}}>{item.jenis_surat}</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '1' ? '' : 'none'}}><img src={white} alt="" />Unread</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '2' ? '' : 'none'}}><img src={red} alt="" />Delay</td>
                                    <td style={{textAlign:'center', display: item.veri_1 === '3' ? '' : 'none'}}><img src={green} alt="" />Agreed</td>
                                    <td style={{textAlign:'center', display: item.veri_2 === '1' ? '' : 'none'}}><img src={white} alt="" />Unread</td>
                                    <td style={{textAlign:'center', display: item.veri_2 === '2' ? '' : 'none'}}><img src={red} alt="" />Delay</td>
                                    <td style={{textAlign:'center', display: item.veri_2 === '3' ? '' : 'none'}}><img src={green} alt="" />Agreed</td>
                                    <td style={{textAlign:'center', display: item.veri_3 === '1' ? '' : 'none'}}><img src={white} alt="" />Unread</td>
                                    <td style={{textAlign:'center', display: item.veri_3 === '2' ? '' : 'none'}}><img src={red} alt="" />Delay</td>
                                    <td style={{textAlign:'center', display: item.veri_3 === '3' ? '' : 'none'}}><img src={green} alt="" />Agreed</td>
                                    <td style={{textAlign:'center'}}> <Link to={`/Cuti-detail/${item.id_surat}`}>Detail</Link> | 
                                    <br /><button onClick={() => hadleDeleteSurat(item.id_surat)}>Hapus</button></td>
                                  </tr>
                                  ))}
                              </table>
                            ): (
                              <p style={{display:'flex', paddingTop:'10px', justifyContent:'center', paddingLeft:'400px'}}>tidak ada data</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
  }

export default Content