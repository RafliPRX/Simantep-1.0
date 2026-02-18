import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nrk, setNRK] = useState('');    
    const [nama, setNama] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [nama_role, setNamaRole] = useState('');
    const [akses_level, setAksesLevel] = useState('1');
    const [id_number, setId_Number] = useState('');
    const [re_password, setRe_Password] =useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState({
        Password: false,
    });
    const [showRePassword, setShowRePassword] = useState({
        REPassword: false,
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
    const handleLogin_ppnpn = async (event) => {
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
        nrk_nip: nrk,
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
          navigate("/");
          alert(response.data.message);
        }, 1000);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response);
        alert("error code 103");
      }
    }    
    const handleChangeUsername = (event) => {
        const value = event.target.value;
        if (value.includes(' ')) {
            alert("Username/Email cannot contain spaces.");
            return;
        }
        setUsername(value);
        console.log( "username: "+value);
    }


    const handleChangePassword = (event) => {
        setPassword(event.target.value);
        console.log("pass: "+event.target.value);
    }
    const handleChangeRePassword = (event) => {
        setRe_Password(event.target.value);
        console.log("Re-pass: "+event.target.value);
    }
    const handleChangeNRK = (event) => {
        setNRK(event.target.value);
        console.log("nrk: "+event.target.value);
    }
    const handleChangeNama = (event) => {
        setNama(event.target.value);
        const selectedIdentityData = allIdentity_lv1.find((identitas) => identitas.nama === event.target.value);
        if (selectedIdentityData) {
            setNamaRole(selectedIdentityData.nama_role);
            setAksesLevel(selectedIdentityData.akses_level);
            setId_Number(selectedIdentityData.id_number);
        }
    }
    const handleChangeJabatan = (event) => {
        setJabatan(event.target.value);
        console.log("jabatan: "+event.target.value);
    }
    const [allIdentity_lv1, setAllIdentity_lv1] = useState([]);
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
    useEffect(() => {
        getIdentity();
    },[]);
    return(
        <>
        <div className='login'>
            {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                    <span style={{position: 'absolute', top : '500px'}} className="load-cuti"></span>
            </div>}
            <div className='col'>
                <div className='form-col' style={{padding: "144px 57px"}}>
                    <form action="/Home" style={{marginTop: "-228px"}}>
                        <div className='header'>
                            <h1>Membuat Akun</h1>
                            <h3>Buat Username dan Password Anda</h3>
                        </div>  
                        <div className='input-col'>                            
                            <label>Nama</label>
                            <select onChange={handleChangeNama} name="" id="">
                                  <option value="" selected>Pilih Nama</option>
                                  {allIdentity_lv1.map((item) => (
                                      <>                                                                                      
                                        <option value={item.nama}>{item.nama}</option>                                        
                                      </>
                                  ))}
                                </select>
                            <label>Username</label>
                            <input onChange={handleChangeUsername} placeholder='Username' type="text" />    
                            <label>Password</label>
                            <div className="password-input-container">
                                <input 
                                    onChange={handleChangePassword} 
                                    placeholder='isi password' 
                                    type={showPassword.Password ? "text" : "password"} 
                                />
                                <button 
                                    type="button" 
                                    className="toggle-password" 
                                    onClick={() => togglePasswordVisibility('Password')}
                                >
                                    {showPassword.Password ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <label>Masukan Ulang Password</label>
                            <div className="password-input-container">
                                <input 
                                    onChange={handleChangeRePassword} 
                                    placeholder='isi password' 
                                    type={showRePassword.REPassword ? "text" : "password"} 
                                />
                                <button 
                                    type="button" 
                                    className="toggle-password" 
                                    onClick={() => toggleRePasswordVisibility('REPassword')}
                                >
                                    {showRePassword.REPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <label>NRK/NIP</label>
                            <input onChange={handleChangeNRK} placeholder='NRK atau NIP' type="text" />
                            <label>Jabatan</label>
                            <input onChange={handleChangeJabatan} placeholder='jabatan' type="Jabatan" />
                            <label>Satuan Kerja</label>
                            <input value={nama_role} placeholder='jabatan' type="Jabatan" />
                            {/* <label>Nomor ID</label>
                            <input value={id_number} placeholder='jabatan' type="Jabatan" /> */}
                            <button onClick={handleLogin_ppnpn} >Buat Akun</button>
                            <div className='register'>
                                <a href='/'>Sudah Punya Akun ?</a>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='logo'>
                    <div className='logo-col'>
                    <div className='logo-bg'>
                        <div className='logo'></div>
                    </div>
                        <div className='mask'>
                            <div className='pic'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Signup
