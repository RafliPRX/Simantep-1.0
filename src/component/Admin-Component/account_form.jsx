
import '../css/form.css';
import Profile from '../profile';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
const Account_Form = () => {
    const storedUsername = localStorage.getItem('nama');
    const storedFProfile = localStorage.getItem('f_profile');
    const [isLoading, setIsLoading] = useState(false);
    const [allIdentity_lv1, setAllIdentity_lv1] = useState([]);    
    const [nama, setNama] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [re_password, setRe_Password] = useState('');
    const [nip_nrk , setNIP_NRK] = useState('');
    const [nama_role, setNamaRole] = useState('');
    const [nama_role_c, setNamaRole_c] = useState('');
    const [nama_role_b, setNamaRole_b] = useState('');
    const [nama_role_a, setNamaRole_a] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [akses_level, setAksesLevel] = useState('');
    const [id_number, setId_Number] = useState('');
    // const [akses_level_3, setAksesLevel3] = useState('3');
    // const [akses_level_4, setAksesLevel4] = useState('4');
    const navigate = useNavigate();

    const [form_tab, setForm_Tab] = useState('level 1');

    const handleChangeNama = (event) => {
        setNama(event.target.value);
        const selectedIdentityData = allIdentity_lv1.find((identitas) => identitas.nama === event.target.value);
        if (selectedIdentityData) {
            setNamaRole(selectedIdentityData.nama_role);
            setAksesLevel(selectedIdentityData.akses_level);
            setId_Number(selectedIdentityData.id_number);
        }
    }
    const handleChangeNamaLv2 = (event) => {
        setNama(event.target.value);
        const selectedIdentityData = allIdentity_lv2.find((identitas) => identitas.nama === event.target.value);
        if (selectedIdentityData) {
            setNamaRole_c(selectedIdentityData.nama_role_c);
            setAksesLevel(selectedIdentityData.akses_level);
            setId_Number(selectedIdentityData.id_number);
        }
    }
    const handleChangeNamaLv3 = (event) => {
        setNama(event.target.value);
        const selectedIdentityData = allIdentity_lv3.find((identitas) => identitas.nama === event.target.value);
        if (selectedIdentityData) {
            setNamaRole_b(selectedIdentityData.nama_role_b);
            setAksesLevel(selectedIdentityData.akses_level);
            setId_Number(selectedIdentityData.id_number);
        }
    }
    const handleChangeNamaLv4 = (event) => {
        setNama(event.target.value);
        const selectedIdentityData = allIdentity_lv4.find((identitas) => identitas.nama === event.target.value);
        if (selectedIdentityData) {
            setNamaRole_a(selectedIdentityData.nama_role_a);
            setAksesLevel(selectedIdentityData.akses_level);
            setId_Number(selectedIdentityData.id_number);
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
    const getIdentity = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getIdentity_lv1.php`;
        let url = baseUrl;
        axios.get(url).then((res2) => {
            console.log(res2.data.Data);
            const response = res2.data.Data;
            setAllIdentity_lv1(response);
            console.log(response);
        })        
        .catch((error) => {
            console.log(error);
        });
    }
    const [allIdentity_lv2, setAllIdentity_lv2] = useState([]); 
    const getIdentityLv2 = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getIdentity-lv2.php`;
        let url = baseUrl;
        axios.get(url).then((res2) => {
            console.log(res2.data.Data);
            const response = res2.data.Data;
            setAllIdentity_lv2(response);
            console.log(response);
        })        
        .catch((error) => {
            console.log(error);
        });
    }
    const [allIdentity_lv3, setAllIdentity_lv3] = useState([]);
    const getIdentity_level3 = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getIdentity-level3.php`;
        let url = baseUrl;
        axios.get(url).then((res2) => {
            console.log(res2.data.Data);
            const response = res2.data.Data;
            setAllIdentity_lv3(response);
            console.log(response);
        })        
        .catch((error) => {
            console.log(error);
        });
    }
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
        getIdentity();
        getIdentityLv2();
        getIdentity_level3();
        getIdentity_level4();
    }, []);
    const handlePostAkun = async (event) => {
      event.preventDefault();
      setIsLoading(true);

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
        id_number: id_number,
        nama: nama,
        username: username,
        pass: password,
        re_pass: re_password,
        nrk_nip: nip_nrk,
        jabatan: jabatan,
        akses_level: akses_level,
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/Admin_API/new_account.php`, payload, {
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
    const [showPassword, setShowPassword] = useState({
        level1: false,
        level2: false,
        level3: false,
        level4: false
    });
    const [showRePassword, setShowRePassword] = useState({
        level1: false,
        level2: false,
        level3: false,
        level4: false
    });
    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    }
    const toggleRePasswordVisibility = (field) => {
        setShowRePassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    }
    return(
        <>
            <div className='main-dashboard'>
                {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                    <span style={{position: 'absolute', top : '500px'}} className="load-cuti"></span>
                </div>}
                <p>Setting Akun/Penambahan Akun</p>
                <h1>Penambahan Akun</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="mawasdiri" />
                <div className='content-col'>
                    <div className='box1'>
                      <div className='tab-identity'>
                            <ul className='identity-list'>
                                <li className={`identity-item ${form_tab === 'level 1' ? 'active' : ''}`}
                                onClick={() => setForm_Tab('level 1')}>Level 1</li>
                                <li className={`identity-item ${form_tab === 'level 2' ? 'active' : ''}`}
                                onClick={() => setForm_Tab('level 2')}>Level 2</li>
                                <li className={`identity-item ${form_tab === 'level 3' ? 'active' : ''}`}
                                onClick={() => setForm_Tab('level 3')}>Level 3</li>
                                <li className={`identity-item ${form_tab === 'level 4' ? 'active' : ''}`}
                                onClick={() => setForm_Tab('level 4')}>Level 4</li>
                            </ul>
                        </div>
                        {form_tab === 'level 1' && (
                          <>                          
                            <form onSubmit={handlePostAkun}>
                              <div className='content-f'>                                                    
                                <h1>Akun Level 1</h1>
                                <label htmlFor="">Nama</label>
                                <select onChange={handleChangeNama} name="" id="">
                                  <option value="" selected>Pilih Nama</option>
                                  {allIdentity_lv1.map((item) => (
                                      <>                                                                                      
                                        <option value={item.nama}>{item.nama}</option>                                        
                                      </>
                                  ))}
                                </select>
                                <label htmlFor="">Username</label>
                                <input onChange={handleChangeUsername} placeholder='Username' type="text" />
                                <label htmlFor="">Password</label>
                                <div className='password-bar'>
                                  <input className='password-input' onChange={handleChangePassword} placeholder='Password' type={showPassword.level1 ? "text" : "password"} />
                                  <button type="button" className="toggle-password" onClick={() => togglePasswordVisibility('level1')}>
                                    {showPassword.level1 ? <FaEyeSlash /> : <FaEye />}
                                  </button>
                                </div>
                                <label htmlFor="">Re-Password</label>
                                <div className='password-bar'>
                                  <input className='password-input' onChange={handleChangeRe_Password} placeholder='re_Password' type={showRePassword.level1 ? "text" : "password"} />
                                  <button type="button" className="toggle-password-2" onClick={() => toggleRePasswordVisibility('level1')}>
                                    {showRePassword.level1 ? <FaEyeSlash /> : <FaEye />}
                                  </button>
                                </div>
                                <label htmlFor="">NIP / NRK</label>
                                <input onChange={handleChangeNIP_NRK} placeholder='NIP / NRK' type="text" />
                                <label htmlFor="">Jabatan</label>
                                <input onChange={handleChangeJabatan} placeholder='Jabatan' type="text" />
                                <label htmlFor="">Nama Role</label>
                                <input placeholder='Nama Role' type="text" value={nama_role} readOnly/>
                                <label htmlFor="">Akses Level</label>
                                <input placeholder='Akses Level' type="text" value={akses_level} readOnly/>
                                <label htmlFor="">Nomor Identitas</label>
                                <input placeholder='Akses Level' type="text" value={id_number} readOnly/>
                              </div>
                              <button className='submit' type="submit">Submit</button>
                            </form>
                          </>
                        )}
                        {form_tab === 'level 2' && (
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
                                <div className='password-bar'>
                                  <input onChange={handleChangePassword} placeholder='Password' type={showPassword.level2 ? "text" : "password"} />
                                  <button type="button" className="toggle-password" onClick={() => togglePasswordVisibility('level2')}>
                                    {showPassword.level2 ? <FaEyeSlash /> : <FaEye />}
                                  </button>
                                </div>
                                <label htmlFor="">Re-Password</label>
                                <div className='password-bar'>
                                  <input onChange={handleChangeRe_Password} placeholder='re_Password' type={showRePassword.level2 ? "text" : "password"} />
                                  <button type="button" className="toggle-password-2" onClick={() => toggleRePasswordVisibility('level2')}>
                                    {showRePassword.level2 ? <FaEyeSlash /> : <FaEye />}
                                  </button>
                                </div>
                                <label htmlFor="">NIP / NRK</label>
                                <input onChange={handleChangeNIP_NRK} placeholder='NIP / NRK' type="text" />
                                <label htmlFor="">Jabatan</label>
                                <input onChange={handleChangeJabatan} placeholder='Jabatan' type="text" />
                                <label htmlFor="">Nama Role</label>
                                <input placeholder='Nama Role' type="text" value={nama_role_c} readOnly/>
                                <label htmlFor="">Akses Level</label>
                                <input placeholder='Akses Level' type="text" value={akses_level} readOnly/>
                                <label htmlFor="">Nomor Identitas</label>
                                <input placeholder='Akses Level' type="text" value={id_number} readOnly/>
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
                                <div className='password-bar'>
                                  <input onChange={handleChangePassword} placeholder='Password' type={showPassword.level3 ? "text" : "password"} />
                                  <button type="button" className="toggle-password" onClick={() => togglePasswordVisibility('level3')}>
                                    {showPassword.level3 ? <FaEyeSlash /> : <FaEye />}
                                  </button>
                                </div>                                
                                <label htmlFor="">Re-Password</label>
                                <div className='password-bar'>
                                  <input onChange={handleChangeRe_Password} placeholder='re_Password' type={showRePassword.level3 ? "text" : "password"} />
                                  <button type="button" className="toggle-password-2" onClick={() => toggleRePasswordVisibility('level3')}>
                                    {showRePassword.level3 ? <FaEyeSlash /> : <FaEye />}
                                  </button>
                                </div>                              
                                <label htmlFor="">NIP / NRK</label>
                                <input onChange={handleChangeNIP_NRK} placeholder='NIP / NRK' type="text" />
                                <label htmlFor="">Jabatan</label>
                                <input onChange={handleChangeJabatan} placeholder='Jabatan' type="text" />
                                <label htmlFor="">Nama Role</label>
                                <input placeholder='Nama Role' type="text" value={nama_role_b} readOnly/>
                                <label htmlFor="">Akses Level</label>
                                <input placeholder='Akses Level' type="text" value={akses_level} readOnly/>
                                <label htmlFor="">Nomor Identitas</label>
                                <input placeholder='Akses Level' type="text" value={id_number} readOnly/>
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
                                <div className='password-bar'>
                                  <input onChange={handleChangePassword} placeholder='Password' type={showPassword.level4 ? "text" : "password"} />
                                  <button type="button" className="toggle-password" onClick={() => togglePasswordVisibility('level4')}>
                                    {showPassword.level4 ? <FaEyeSlash /> : <FaEye />}
                                  </button>
                                </div>                                
                                <label htmlFor="">Re-Password</label>
                                <div className='password-bar'>
                                  <input onChange={handleChangeRe_Password} placeholder='re_Password' type={showRePassword.level4 ? "text" : "password"} />
                                  <button type="button" className="toggle-password-2" onClick={() => toggleRePasswordVisibility('level4')}>
                                    {showRePassword.level4 ? <FaEyeSlash /> : <FaEye />}
                                  </button>
                                </div>                                
                                <label htmlFor="">NIP / NRK</label>
                                <input onChange={handleChangeNIP_NRK} placeholder='NIP / NRK' type="text" />
                                <label htmlFor="">Jabatan</label>
                                <input onChange={handleChangeJabatan} placeholder='Jabatan' type="text" />
                                <label htmlFor="">Nama Role</label>
                                <input placeholder='Nama Role' type="text" value={nama_role_a} readOnly/>
                                <label htmlFor="">Akses Level</label>
                                <input placeholder='Akses Level' type="text" value={akses_level} readOnly/>
                                <label htmlFor="">Nomor Identitas</label>
                                <input placeholder='Nomor Identitas' type="text" value={id_number} readOnly/>
                              </div>                          
                              <button className='submit' type="submit">Submit</button>
                            </form>
                          </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Account_Form;