import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../component/css/login.css'
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
            setNRK(selectedIdentityData.nrk_nip);
            setJabatan(selectedIdentityData.jabatan);
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
            {isLoading && (
                        <div style={{
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            width: '100%',
                            height: '100%',
                            zIndex: '9999'
                        }}>
                            <div style={{width: '4rem', height: '4rem'}} className="spinner-grow text-success" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
            )}
            <div className='container-fluid login d-flex align-items-center justify-content-center p-5 bg-teal'>                
                <div className='row justify-content-center align-content-center w-100'>
                    <div className='col-12 col-lg-6 d-flex justify-content-center'>
                        <div className='container-xxl border rounded-4 bg-green-old p-4 p-lg-5'>
                            <form className='d-flex flex-column gap-3 w-100'>
                                <div className='header font-set'>
                                    <h1 className='font-header'>Buat Akun</h1>
                                    <h3 className='font-sub-header'>Masukan Username dan Password untuk Membuat Akun</h3>
                                </div>
                                <div className='text-white flex-column d-flex mt-4'>
                                    <label>Nama</label>
                                        <select onChange={handleChangeNama} name="" id="">
                                            <option value="" selected>Pilih Nama</option>
                                            {allIdentity_lv1.map((item) => (
                                                <>                                                                                      
                                                    <option value={item.nama}>{item.nama}</option>                                        
                                                </>
                                            ))}
                                        </select>
                                        
                                    <label className='mb-2'>Username</label>
                                    <input className='p-2 rounded-2 mt-1' onChange={handleChangeUsername} type="text" />
                                    <label className='mt-2 mb-1'>Password</label>
                                    <div className="d-flex align-items-center w-100 mt-1 position-relative">
                                        <input
                                            onChange={handleChangePassword}
                                            type={showPassword.ppnpn ? "text" : "password"}
                                            className='w-100 p-2 rounded-2'
                                        />
                                        <button
                                            type="button"
                                            className="position-absolute end-0 me-3 bg-transparent border-0"
                                            onClick={() => togglePasswordVisibility('ppnpn')}                                            
                                        >
                                            {showPassword.ppnpn ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    <label className='mt-2 mb-1'>Konfirmasi Password</label>
                                    <div className="d-flex align-items-center w-100 mt-1 position-relative">
                                        <input
                                            onChange={handleChangeRePassword}
                                            type={showRePassword.ppnpn ? "text" : "password"}
                                            className='w-100 p-2 rounded-2'
                                        />
                                        <button
                                            type="button"
                                            className="position-absolute end-0 me-3 bg-transparent border-0"
                                            onClick={() => toggleRePasswordVisibility('ppnpn')}                                            
                                        >
                                            {showRePassword.ppnpn ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    <label className='mb-2'>NIP</label>
                                    <input className='w-60 p-2 rounded-2 mt-1' value={nrk} onChange={handleChangeNRK} type="text" />
                                    <label className='mb-2'>Jabatan</label>
                                    <input className='w-60 p-2 rounded-2 mt-1' value={jabatan} onChange={handleChangeJabatan} type="text" />
                                    <label className='mb-2'>Unit</label>
                                    <input className='w-60 p-2 rounded-2 mt-1' value={nama_role} placeholder='Unit' type="text" />
                                    <button className='btn-login p-2 rounded-4 mt-4' type='submit' onClick={handleLogin_ppnpn}>Buat Akun</button>
                                    <div className='register'>
                                        <a className='login-href' href="/">Sudah Punya Akun?</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-12 col-lg-6 p-0 logo-col'>
                        <div className='d-flex justify-content-center align-items-center bg-login-logo'>
                            <div className='logo-col'>
                                <div className='logo-bg'>
                                    <div className='logo'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Signup
