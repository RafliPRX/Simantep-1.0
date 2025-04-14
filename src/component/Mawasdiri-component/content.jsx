import './content.css';
import green from '../../assets/green.svg';
import red from '../../assets/decline.svg';
import white from '../../assets/unread.svg';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const Content = () => {
    const storedUsername = localStorage.getItem('nama');
    const storeNrk = localStorage.getItem('nrk');
    const storedSisaCuti = localStorage.getItem('sisa_cuti');
    const storedFProfile = localStorage.getItem('f_profile');
    const pj = localStorage.getItem('pj');
    const status = localStorage.getItem('Status');
    const kelompok = parseInt(localStorage.getItem('no_kelompok')) + 1;
    console.log(storedUsername);
    console.log(storedSisaCuti);
    console.log(storedFProfile);
    console.log(storeNrk);
    console.log(pj);
    console.log(kelompok);
    console.log(status);

    const [surat, setSurat] = useState([]);
    const [pagination_surat, setPagination_Surat] = useState({
        current_page: 1,
    });
    const allowedValues = [
        "Koordinator Layanan Rehabilitasi",
        "Pj. Supervisi Klinis",
        "Program Manager Layanan Rehabilitasi",
        "Pj. Tata Kelola Klinik",
        "Pj. Penunjang Medis",
        "Pj. Vokasional",
        "Pj. Pembina Jasmani dan Mental",
        "Pj. Informasi dan Data",
        "Pj. Layanan E-Corner",
        "Pj. Pembendaharaan",
        "Pj. Kepegawaian",
        "Pj. Barang Milik Negara serta Operator Aset & Operator Persediaan",
        "Pj. Rumah Tanggal dan Aset",
        "Pj. Humas dan Kerjasama",
        "Pj. Perencanaan Anggaran dan Pelaporan",
    ];
    const getSurat = async () => {
        try {
            if (status == "Kepegawaian") {
                axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/surat_by_veri_1.php?page=${pagination_surat.current_page}&veri_1=3`)
                .then((res2) => {
                    console.log(res2.data.Data);
                    const response = res2.data.Data;

                    const pagination_surat = {
                        total: res2.data.total_records,
                        current_page: res2.data.current_page,
                        nextPage: res2.data.nextPage, // Corrected to match the response structure    
                    }
                    setSurat(response);
                    setPagination_Surat(pagination_surat);
                    console.log(response);
                })
            } else if (status === "Kasubbag" || storedUsername === 'admin') {
                axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/surat_by_veri_2.php?page=${pagination_surat.current_page}&veri_2=3`)
                .then((res2) => {
                    console.log(res2.data.Data);
                    const response = res2.data.Data;

                    const pagination_surat = {
                        total: res2.data.total_records,
                        current_page: res2.data.current_page,
                        nextPage: res2.data.nextPage, // Corrected to match the response structure    
                    }
                    setSurat(response);
                    setPagination_Surat(pagination_surat);
                    console.log(response);
                })
            } else if (allowedValues.includes(status))
                {
                axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/surat_by_kelompok.php?pj=${status}&page=${pagination_surat.current_page}`)
                .then((res2) => {
                    console.log(res2.data.Data);
                    const response = res2.data.Data;

                    const pagination_surat = {
                        total: res2.data.total_records,
                        current_page: res2.data.current_page,
                        nextPage: res2.data.nextPage, // Corrected to match the response structure    
                    }
                    setSurat(response);
                    setPagination_Surat(pagination_surat);
                    console.log(response);
                })
            } else {
                axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/surat_by_name.php?nama=${storedUsername}&page=${pagination_surat.current_page}`)
                .then((res2) => {
                    console.log(res2.data.Data);
                    const response = res2.data.Data;

                    const pagination_surat = {
                        total: res2.data.total_records,
                        current_page: res2.data.current_page,
                        nextPage: res2.data.nextPage, // Corrected to match the response structure    
                    }
                    setSurat(response);
                    setPagination_Surat(pagination_surat);
                    console.log(response);
                })
            }
        } catch (error) {
            console.log(error.response);
        }
    }
    const [absent, setAbsent] = useState([]);

    const downloadExcel = () => {
        axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Absen/Absent_all.php`)
        .then(response => {
          const data = response.data;
          const ws = XLSX.utils.json_to_sheet(data);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "User");
          XLSX.writeFile(wb, "User_data.xlsx");
        })
        .catch(error => {
          console.error(error);
        });    
    }
    const [pagination_absent, setPagination_Absent] = useState({
        current_page: 1,
    })
    const allowedValues2 = [
        "Kepegawaian",
        "Kasubbag",
        "Kepala Balai"
    ];
        const getAbsent = async () => {
        if (allowedValues2.includes(status)) {
            axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Absen/absent.php?page=${pagination_absent.current_page}`)
            .then((res1) => {
                console.log(res1.data.Data);
                const response = res1.data.Data;

                const pagination_Absent = {
                    total: res1.data.total_records,
                    current_page: res1.data.current_page,
                    nextPage: res1.data.nextPage, // Corrected to match the response structure

                };
                setAbsent(response); // Ensure absent is set to an empty array if response is undefined

                console.log(response);
                setPagination_Absent(pagination_Absent);
            })
            .catch((err) => console.log(err))
        } else {
            axios.get(`https://simantepbareta.cloud/API/MAWASDIRI/Absen/absent_byName.php?nama=${storedUsername}&page=${pagination_absent.current_page}`)
            .then((res1) => {
                console.log(res1.data.Data);
                const response = res1.data.Data;

                const pagination_Absent = {
                    total: res1.data.total_records,
                    current_page: res1.data.current_page,
                    nextPage: res1.data.nextPage, // Corrected to match the response structure

                };
                setAbsent(response); // Ensure absent is set to an empty array if response is undefined

                console.log(response);
                setPagination_Absent(pagination_Absent);
            })
            .catch((err) => console.log(err))
        }
    }

    const [user, setUser] = useState([]);
    const getUser = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/get_username_locked.php`, {
                headers: {}
            });
            console.log(response.data);
            setUser(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleUnlocked = async (id) => {
        const payload = {
            Locked: 2
        }
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/unlocked_acc.php?id=${id}`, payload, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log(response.data);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (error) {
            console.log(error.response);
        }
    }
    useEffect(() => {
        let isMounted = true;
        let retryCount = 0;
        const maxRetries = 3;

        const fetchData = async () => {
            if (!isMounted) return;
            
            try {
                // Execute all API calls in parallel
                await Promise.allSettled([
                    getSurat(),
                    getAbsent(),
                    getUser()
                ]);
                
                // Reset retry count on success
                retryCount = 0;
                console.log('Data successfully refreshed at:', new Date().toLocaleTimeString());
            } catch (error) {
                console.error('Error refreshing data:', error);
                
                // Implement exponential backoff for retries
                if (retryCount < maxRetries) {
                    retryCount++;
                    const delay = Math.min(1000 * Math.pow(2, retryCount), 30000);
                    console.log(`Retrying in ${delay/1000} seconds... (Attempt ${retryCount})`);
                    setTimeout(fetchData, delay);
                }
            }
        };

        // Initial fetch
        fetchData();

        // Set up interval with error handling
        const interval = setInterval(fetchData, 10000);

        // Cleanup function
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination_absent?.current_page, pagination_surat?.current_page]);
    const handleNext_Absent = () => {
        setPagination_Absent({
            ...pagination_absent,
            current_page: pagination_absent?.current_page + 1
        })
    }
    const handlePrev_Absent = () => {
        setPagination_Absent({
            ...pagination_absent,
            current_page: pagination_absent?.current_page - 1
        })
    }
    const handleNext_Surat = () => {
        setPagination_Surat({
            ...pagination_surat,
            current_page: pagination_surat?.current_page + 1
        })
    }
    const handlePrev_Surat = () => {
        setPagination_Surat({
            ...pagination_surat,
            current_page: pagination_surat?.current_page - 1
        })
    }
    const handleDeleteSurat = async (id) => {
        try {
            const response = await axios.delete(`https://simantepbareta.cloud/API/MAWASDIRI/Cuti/delete_surat.php?id=${id}`, {
                headers: {
                    "Content-Type": "multipart/form-data"
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

    const confirmDelete = (id) => {
        if (window.confirm("Apakah Anda yakin Cuti ini di Batalkan ?")) {
            handleDeleteSurat(id);
        }
    }

    return (
        <>
        <div className='main-dashboard'>
        <p>Mawasdiri/Dashboard</p>
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
                <div className='box-m'>
                        <div className='content'>
                            <h1>Progress Pengajuan Surat</h1>
                            <div>
                                <button onClick={handlePrev_Surat}>Previous</button>
                                <button onClick={handleNext_Surat}>Next</button>
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
                                        <th style={{ textAlign: 'center' }}>Surat</th>
                                        <th style={{ textAlign: 'center' }}>Pembatalan Surat</th>
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
                                            <td style={{ textAlign: 'center' }}> <Link to={`/Cuti-detail/${item.id_surat}`}>Detail</Link></td>
                                            <td style={{ textAlign: 'center' }}><button onClick={() => confirmDelete(item.id_surat)}>Batal</button></td>  
                                            </tr>
                                        ))} 
                                    </table>
                                ) : (
                                    <p style={{ display: 'flex', paddingTop: '10px', justifyContent: 'center', paddingLeft: '400px' }}>tidak ada data</p>
                            )}
                        </div>
                        <div className='content'>
                            <h1>Absensi</h1>
                            <div>
                                <button onClick={handlePrev_Absent}>Previous</button>
                                <button onClick={handleNext_Absent}>Next</button>
                            </div>
                            <button style={{ marginLeft: '50px', display: pj === 'Pj. Kepegawaian' ? 'flex' : 'none' }} onClick={downloadExcel}>Download Excel</button>
                            {absent.length > 0 ? (
                                <table>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>Nomor</th>
                                        <th style={{ textAlign: 'center' }}>Nama</th>
                                        <th style={{ textAlign: 'center' }}>Tanggal</th>
                                        <th style={{ textAlign: 'center' }}>Jam Masuk</th>
                                        <th style={{ textAlign: 'center' }}>Jam Keluar</th>
                                        <th style={{ textAlign: 'center' }}>Detail</th>
                                    </tr>
                                    {absent.map((item, index) => (
                                        <tr key={item.id_surat}>
                                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                            <td style={{ textAlign: 'center' }}>{item.nama}</td>
                                            <td style={{ textAlign: 'center' }}>{item.today}</td>
                                            <td style={{ textAlign: 'center' }}>{item.jam_in}</td>
                                            <td style={{ textAlign: 'center' }}>{item.jam_out}</td>
                                            <td style={{ textAlign: 'center' }}>klik disini</td>
                                    </tr>
                                ))} 
                            </table>                            
                        ) : (
                            <p style={{ display: 'flex', paddingTop: '10px', justifyContent: 'center', paddingLeft: '400px' }}>tidak ada data</p>
                        )}
                        <div></div>                                                    
                    </div>
                    <div style={{display: storedUsername === 'Rafli Pratama Hidayat S.Tr.T' ? 'flex' : 'none'}} className='content'>
                            <h1>Daftar Akun</h1>
                            {user.length > 0 ? (
                                <table>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>Nomor</th>
                                        <th style={{ textAlign: 'center' }}>Nama</th>
                                        <th style={{ textAlign: 'center' }}>Password</th>
                                        <th style={{ textAlign: 'center' }}>NIP/NRK</th>
                                        <th style={{ textAlign: 'center' }}>Jabatan</th>
                                        <th style={{ textAlign: 'center' }}>Membuka Akun ?</th>
                                    </tr>
                                    {user.map((item, index) => (
                                        <tr key={item.id_surat}>
                                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                            <td style={{ textAlign: 'center' }}>{item.nama}</td>
                                            <td style={{ textAlign: 'center' }}>{item.pass}</td>
                                            <td style={{ textAlign: 'center' }}>{item.nrk}</td>
                                            <td style={{ textAlign: 'center' }}>{item.jabatan}</td>
                                            <td style={{ textAlign: 'center' }}><button onClick={() => handleUnlocked(item.id)}>Membuka Akun</button></td>  
                                            </tr>
                                        ))} 
                                    </table>
                                ) : (
                                    <p style={{ display: 'flex', paddingTop: '10px', justifyContent: 'center', paddingLeft: '400px' }}>tidak ada data</p>
                            )}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Content;
