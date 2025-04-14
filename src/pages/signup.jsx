import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nrk, setNRK] = useState('');
    const [pj_id, setPJID] = useState('');
    const [nama, setNama] = useState('');
    const [jabatan, setJabatan] = useState('');
    const navigate = useNavigate();
    const [ppnpn, setPPNPN] = useState(false);
    const [pppk, setPPPK] = useState(false);
    const [pj, setPj] = useState([]);
    const [status, setStatus] = useState('');
    const [showPassword, setShowPassword] = useState({
        ppnpn: false,
        pppk: false
    });

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    }
    const handleLogin_ppnpn = async (event) => {
        event.preventDefault();
        const payload = {
            email: username,
            nama: nama,
            pass: password,
            nrk: nrk,
            pj: pj_id,
            jabatan: jabatan,
        };
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/signup_lowlevel_ppnpn.php`, payload, {
                headers: {
                'Content-Type': 'multipart/form-data',
                }
            })
            console.log(response.data.status);
            setTimeout(() => {
                alert(response.data.message);
                navigate('/');
            }, 500);
        } catch (error) {
            console.log(error.response);
            alert("error Signup code 101");
        }
    }
    const handleLogin_pppk = async (event) => {
        event.preventDefault();
        const payload = {
            email: username,
            nama: nama,
            pass: password,
            nrk: nrk,
            pj: pj_id,
            jabatan: jabatan,
            Stat: status
        };
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/signup_lowlevel_pppkasn.php`, payload, {
                headers: {
                'Content-Type': 'multipart/form-data',
                }
            })
            console.log(response.data.status);
            setTimeout(() => {
                alert(response.data.message);
                navigate('/');
            }, 500);
        } catch (error) {
            console.log(error.response);
            alert("error Signup code 101");
        }
    }
    const handlePPNPN = (event) => {
        setPPNPN(event.target.checked);
    }
    const handlePPPK = (event) => {
        setPPPK(event.target.checked);
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

    const handleChangeNRK = (event) => {
        setNRK(event.target.value);
        console.log("nrk: "+event.target.value);
    }
    const handleChangeNama = (event) => {
        setNama(event.target.value);
        console.log("nama: "+event.target.value);
    }
    const handleChangeJabatan = (event) => {
        setJabatan(event.target.value);
        console.log("jabatan: "+event.target.value);
    }
    const handleChangePJ = (event) => {
        setPJID(event.target.value);
        console.log("PJ: "+event.target.value);
    }
    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
        console.log("status: "+event.target.value);
    }
    const getPJ = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/get_PJ_Midlevel.php`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.log(response.data);
            setPj(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }
    useEffect(() => {
        getPJ();
    },[]);
    return(
        <>
        <div className='login'>
            <div className='col'>
                <div className='form-col' style={{padding: "144px 57px"}}>
                    <form action="/Home" style={{marginTop: "-228px"}}>
                        <div className='header'>
                            <h1>Sign Up</h1>
                            <h3>Create Your Username and Password</h3>
                        </div>
                        <div className='selection'>
                            <div className='list'>
                                <input onChange={handlePPNPN} className='check' type="checkbox" name="" id="" />
                                <label htmlFor="">PPNPN</label>
                            </div>
                            <div className='list'>
                                <input onChange={handlePPPK} className='check' type="checkbox" name="" id="" />
                                <label htmlFor="">ASN</label>
                            </div>
                        </div>
                        {ppnpn && (
                        <div className='input-col'>
                            <label>Username/Email</label>
                            <input onChange={handleChangeUsername} placeholder='Username atau Email' type="text" />
                            <label>Nama</label>
                            <input type="text" onChange={handleChangeNama} placeholder='Nama Lengkap Beserta Gelar' name="" id="" />
                            <label>Password</label>
                            <div className="password-input-container">
                                <input 
                                    onChange={handleChangePassword} 
                                    placeholder='isi password' 
                                    type={showPassword.ppnpn ? "text" : "password"} 
                                />
                                <button 
                                    type="button" 
                                    className="toggle-password" 
                                    onClick={() => togglePasswordVisibility('ppnpn')}
                                >
                                    {showPassword.ppnpn ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            
                            <label>NRK/NIP</label>
                            <input onChange={handleChangeNRK} placeholder='NRK atau NIP' type="text" />
                            <label>Jabatan</label>
                            <input onChange={handleChangeJabatan} placeholder='jabatan' type="Jabatan" />
                            <label>Penanggung Jawab</label>
                            <select onChange={handleChangePJ} name="" id="">
                                <option value="">Pilih Penanggung Jawab</option>
                                {pj.map((item, index) => (
                                    <option key={index} value={item.Stat}>{item.nama}-{item.Stat}</option>
                                ))}
                            </select>
                            <button onClick={handleLogin_ppnpn} >Sign In</button>
                            <div className='register'>
                                <a href='/'>Already registered ?</a>
                            </div>
                        </div>                         
                        )}
                        {pppk && (
                        <div className='input-col'>
                            <label>Username/Email</label>
                            <input type="text" onChange={handleChangeUsername} placeholder='Username atau Email' name="" id="" />
                            <label htmlFor="">Nama</label>
                            <input type="text" onChange={handleChangeNama} placeholder='Nama Lengkap Beserta Gelar' name="" id="" />
                            <label>Password</label>
                            <div className="password-input-container">
                                <input 
                                    onChange={handleChangePassword}
                                    placeholder='Password' 
                                    type={showPassword.pppk ? "text" : "password"} 
                                />
                                <button 
                                    type="button" 
                                    className="toggle-password" 
                                    onClick={() => togglePasswordVisibility('pppk')}
                                >
                                    {showPassword.pppk ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <label>NRK/NIP</label>
                            <input onChange={handleChangeNRK} placeholder='NRK/NIP' type="text" />
                            <label htmlFor="">Jabatan</label>
                            <input type="text" onChange={handleChangeJabatan} placeholder='jabatan' name="" id="" />
                            <label htmlFor="">Status</label>
                            <div className='status'>
                                <div className='list'>
                                    <input onChange={handleChangeStatus} value="PNS" className='checkbox' type="checkbox" name="" id="" />
                                    <label htmlFor="">PNS</label>
                                </div>
                                <div className='list'>
                                    <input onChange={handleChangeStatus} value="PPPK" className='checkbox' type="checkbox" name="" id="" />
                                    <label htmlFor="">PPPK</label>
                                </div>
                            </div>
                            <button onClick={handleLogin_pppk} >Sign In</button>
                            <div className='register'>
                                <a href='/'>Already registered ?</a>
                            </div>
                        </div>                         
                        )}
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
