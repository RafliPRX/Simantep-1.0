import '../css/form.css';
import Profile from '../profile';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
const Detail_Account_Form_lv4 = () => {
    const storedUsername = localStorage.getItem('nama');
    const storedFProfile = localStorage.getItem('f_profile');
    const [isLoading, setIsLoading] = useState(false);
    // const [allIdentity_lv1, setAllIdentity_lv1] = useState([]);            
    // const [nama_role_b, setNamaRole_b] = useState('');
    const [nama_role_a, setNamaRole_a] = useState('');    
    const [akses_level, setAksesLevel] = useState('');
    // const [nama_role_c, setNamaRole_c] = useState('');
    // const [akses_level_3, setAksesLevel3] = useState('3');
    // const [akses_level_4, setAksesLevel4] = useState('4');
    const navigate = useNavigate();   
    // const handleChangeNama = (event) => {
    //     setNama(event.target.value);
    //     const selectedIdentityData = allIdentity_lv1.find((identitas) => identitas.nama === event.target.value);
    //     if (selectedIdentityData) {
    //         setNamaRole(selectedIdentityData.nama_role);
    //         setAksesLevel(selectedIdentityData.akses_level);
    //     }
    // }   
    // const handleChangeNamaLv3 = (event) => {
    //     setNama(event.target.value);
    //     const selectedIdentityData = allIdentity_lv3.find((identitas) => identitas.nama === event.target.value);
    //     if (selectedIdentityData) {
    //         setNamaRole_b(selectedIdentityData.nama_role_b);
    //         setAksesLevel(selectedIdentityData.akses_level);
    //     }
    // }
    const handleChangeNamaLv4 = (event) => {
        setNama(event.target.value);
        const selectedIdentityData = allIdentity_lv4.find((identitas) => identitas.nama === event.target.value);
        if (selectedIdentityData) {
            setNamaRole_a(selectedIdentityData.nama_role_a);
            setAksesLevel(selectedIdentityData.akses_level);
        }
    }
    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
        console.log(event.target.value);            
    }
    const handleChangePassword = (event) => {
        setRe_Password(event.target.value);
        console.log(event.target.value);            
    }
    const handleChangeRe_Password = (event) => {
        setPassword(event.target.value);
        console.log(event.target.value);            
    }
    const handleChangeNIP_NRK = (event) => {
        setNIP_NRK(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeJabatan = (event) => {
        setJabatan(event.target.value);
        console.log(event.target.value);
    }    
    // const getIdentity = async() => {
    //     const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getIdentity_lv1.php`;
    //     let url = baseUrl;
    //     axios.get(url).then((res2) => {
    //         console.log(res2.data.Data);
    //         const response = res2.data.Data;
    //         setAllIdentity_lv1(response);
    //         console.log(response);
    //     })        
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }     
    const param = useParams();
    const [accountData, setAccountData] = useState([]);
    const [nama, setNama] = useState(accountData.nama);
    const [username, setUsername] = useState(accountData.username);
    const [password, setPassword] = useState(accountData.re_pass);
    const [re_password, setRe_Password] = useState(accountData.re_pass);
    const [nip_nrk , setNIP_NRK] = useState(accountData.nrk_nip);
    // const [nama_role, setNamaRole] = useState(accountData.nama_role);    
    const [jabatan, setJabatan] = useState(accountData.jabatan);
    const getAccountData = async () => {
      try {
            const response = await axios.get(`https://simantepbareta.cloud/API/Admin_API/detail-account.php?id=${param.id}`, {
                headers: {}
            });
            setAccountData(response.data);
            console.log(response.data);
            setNama(response.data.nama);                                    
            setUsername(response.data.username);
            setPassword(response.data.re_pass);
            setRe_Password(response.data.re_pass);            
            setNIP_NRK(response.data.nrk_nip);
            setJabatan(response.data.jabatan);
            setAksesLevel(response.data.akses_level);           
        } catch (error) {
            console.error(error);
        }
    }
    // const [allIdentity_lv2, setAllIdentity_lv2] = useState([]); 
    // const getIdentityLv2 = async() => {
    //     const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getIdentity-lv2.php`;
    //     let url = baseUrl;
    //     axios.get(url).then((res2) => {
    //         console.log(res2.data.Data);
    //         const response = res2.data.Data;
    //         setAllIdentity_lv2(response);
    //         console.log(response);
    //     })        
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }
    // const handleChangeNamaLv2 = (event) => {
    //     setNama(event.target.value);
    //     const selectedIdentityData = allIdentity_lv2.find((identitas) => identitas.nama === event.target.value);
    //     if (selectedIdentityData) {
    //         setNamaRole_c(selectedIdentityData.nama_role_c);
    //         setAksesLevel(selectedIdentityData.akses_level);
    //     }
    // }
    // const [allIdentity_lv3, setAllIdentity_lv3] = useState([]);
    // const getIdentity_level3 = async() => {
    //     const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getIdentity-level3.php`;
    //     let url = baseUrl;
    //     axios.get(url).then((res2) => {
    //         console.log(res2.data.Data);
    //         const response = res2.data.Data;
    //         setAllIdentity_lv3(response);
    //         console.log(response);
    //     })        
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }
    const [allIdentity_lv4, setAllIdentity_lv4] = useState([]);
    const getIdentity_level4 = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getIdentity-level4.php`;
        let url = baseUrl;
        axios.get(url).then((res2) => {
            console.log(res2.data.Data);
            const response = res2.data.Data;
            setAllIdentity_lv4(response);
            console.log(response);
        })        
        .catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        // getIdentity();
        getAccountData();
        // getIdentityLv2();
        // getIdentity_level3();
        getIdentity_level4();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleUpdateAkun = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      if (!nama || !username || !nip_nrk || !jabatan) {
        setIsLoading(false);
        alert("Semua field wajib diisi.");
        return;
      }

      if (password !== re_password) {
        alert("Password and Re-Password do not match!");
        setIsLoading(false);
        return;
      }

      if (password.length < 8) {
        alert("Password Minimal 8 Karakter!");
        setIsLoading(false);
        return;
      }

      const payload = {
        nama: nama,
        username: username,
        pass: password,
        re_pass: re_password,
        nrk_nip: nip_nrk,
        jabatan: jabatan,
        akses_level: akses_level,
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/Admin_API/update-account.php?id=${param.id}`, payload, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/Home-Admin/Akun-Dashboard");
          alert(response.data.message);
        }, 1000);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response);
        alert("error code 103");
      }
    }
    return(
        <>
            <div className='main-dashboard'>
                {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                    <span style={{position: 'absolute', top : '500px'}} className="load-cuti"></span>
                </div>}
                <p>Setting Akun/Update Akun</p>
                <h1>Update Akun</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="mawasdiri" />
                <div className='content-col'>
                    <div className='box1'>                    
                        <form onSubmit={handleUpdateAkun}>
                              <div className='content-f'>                                                    
                                <h1>Akun Level 2</h1>
                                <label htmlFor="">Nama</label>
                                <select onChange={handleChangeNamaLv4} name="" id="">
                                  <option value="" selected>{nama} (default)</option>
                                  {allIdentity_lv4.map((item) => (
                                      <>                                                                                      
                                        <option value={item.nama}>{item.nama}</option>                                        
                                      </>
                                  ))}
                                </select>
                                <label htmlFor="">Username</label>
                                <input onChange={handleChangeUsername} value={username} placeholder='Username' type="text" />
                                <label htmlFor="">Password</label>
                                <input onChange={handleChangePassword} value={re_password} placeholder='Password' type="password" />
                                <label htmlFor="">Re-Password</label>
                                <input onChange={handleChangeRe_Password} value={re_password} placeholder='re_Password' type="password" />
                                <label htmlFor="">NIP / NRK</label>
                                <input onChange={handleChangeNIP_NRK} value={nip_nrk} placeholder='NIP / NRK' type="text" />
                                <label htmlFor="">Jabatan</label>
                                <input onChange={handleChangeJabatan} value={jabatan} placeholder='Jabatan' type="text" />
                                <label htmlFor="">Nama Role</label>
                                <input placeholder='Nama Role' type="text" value={nama_role_a} readOnly/>
                                <label htmlFor="">Akses Level</label>
                                <input placeholder='Akses Level' type="text" value={akses_level} readOnly/>
                              </div>                          
                              <button className='submit' type="submit">Submit</button>
                            </form>
                        {/* {form_tab === 'level 2' && (
                          <>                          
                            <form onSubmit={handlePostAkun}>
                              <div className='content-f'>                                                    
                                <h1>Akun Level 2</h1>
                                <label htmlFor="">Nama</label>
                                <select onChange={handleChangeNamaLv2} name="" id="">
                                  <option value="" selected>Pilih Nama</option>
                                  {allIdentity_lv2.map((item) => (
                                      <>                                                                                      
                                        <option value={item.nama}>{item.nama}</option>                                        
                                      </>
                                  ))}
                                </select>
                                <label htmlFor="">Username</label>
                                <input onChange={handleChangeUsername} placeholder='Username' type="text" />
                                <label htmlFor="">Password</label>
                                <input onChange={handleChangePassword} placeholder='Password' type="password" />
                                <label htmlFor="">Re-Password</label>
                                <input onChange={handleChangeRe_Password} placeholder='re_Password' type="password" />
                                <label htmlFor="">NIP / NRK</label>
                                <input onChange={handleChangeNIP_NRK} placeholder='NIP / NRK' type="text" />
                                <label htmlFor="">Jabatan</label>
                                <input onChange={handleChangeJabatan} placeholder='Jabatan' type="text" />
                                <label htmlFor="">Nama Role</label>
                                <input placeholder='Nama Role' type="text" value={nama_role_c} readOnly/>
                                <label htmlFor="">Akses Level</label>
                                <input placeholder='Akses Level' type="text" value={akses_level} readOnly/>
                              </div>                          
                              <button className='submit' type="submit">Submit</button>
                            </form>
                          </>
                        )}
                        {form_tab === 'level 3' && (
                          <>                          
                            <form onSubmit={handlePostAkun}>
                              <div className='content-f'>                                                    
                                <h1>Akun Level 3</h1>
                                <label htmlFor="">Nama</label>
                                <select onChange={handleChangeNamaLv3} name="" id="">
                                  <option value="" selected>Pilih Nama</option>
                                  {allIdentity_lv3.map((item) => (
                                      <>                                                                                      
                                        <option value={item.nama}>{item.nama}</option>                                        
                                      </>
                                  ))}
                                </select>
                                <label htmlFor="">Username</label>
                                <input onChange={handleChangeUsername} placeholder='Username' type="text" />
                                <label htmlFor="">Password</label>
                                <input onChange={handleChangePassword} placeholder='Password' type="password" />
                                <label htmlFor="">Re-Password</label>
                                <input onChange={handleChangeRe_Password} placeholder='re_Password' type="password" />
                                <label htmlFor="">NIP / NRK</label>
                                <input onChange={handleChangeNIP_NRK} placeholder='NIP / NRK' type="text" />
                                <label htmlFor="">Jabatan</label>
                                <input onChange={handleChangeJabatan} placeholder='Jabatan' type="text" />
                                <label htmlFor="">Nama Role</label>
                                <input placeholder='Nama Role' type="text" value={nama_role_b} readOnly/>
                                <label htmlFor="">Akses Level</label>
                                <input placeholder='Akses Level' type="text" value={akses_level} readOnly/>
                              </div>                          
                              <button className='submit' type="submit">Submit</button>
                            </form>
                          </>
                        )}
                        {form_tab === 'level 4' && (
                          <>                          
                            <form onSubmit={handlePostAkun}>
                              <div className='content-f'>                                                    
                                <h1>Akun Level 4</h1>
                                <label htmlFor="">Nama</label>
                                <select onChange={handleChangeNamaLv4} name="" id="">
                                  <option value="" selected>Pilih Nama</option>
                                  {allIdentity_lv4.map((item) => (
                                      <>                                                                                      
                                        <option value={item.nama}>{item.nama}</option>                                        
                                      </>
                                  ))}
                                </select>
                                <label htmlFor="">Username</label>
                                <input onChange={handleChangeUsername} placeholder='Username' type="text" />
                                <label htmlFor="">Password</label>
                                <input onChange={handleChangePassword} placeholder='Password' type="password" />
                                <label htmlFor="">Re-Password</label>
                                <input onChange={handleChangeRe_Password} placeholder='re_Password' type="password" />
                                <label htmlFor="">NIP / NRK</label>
                                <input onChange={handleChangeNIP_NRK} placeholder='NIP / NRK' type="text" />
                                <label htmlFor="">Jabatan</label>
                                <input onChange={handleChangeJabatan} placeholder='Jabatan' type="text" />
                                <label htmlFor="">Nama Role</label>
                                <input placeholder='Nama Role' type="text" value={nama_role_a} readOnly/>
                                <label htmlFor="">Akses Level</label>
                                <input placeholder='Akses Level' type="text" value={akses_level} readOnly/>
                              </div>                          
                              <button className='submit' type="submit">Submit</button>
                            </form>
                          </>
                        )} */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Detail_Account_Form_lv4;