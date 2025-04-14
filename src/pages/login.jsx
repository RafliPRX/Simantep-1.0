import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ppnpn, setPPNPN] = useState(false);
    const [pppk, setPPPK] = useState(false);
    const [pppkdetail, setPPPKDetail] = useState(false);
    const [midlevel, setMidlevel] = useState(false);
    const navigate = useNavigate();

    const handlePPNPN = (event) => {
        setPPNPN(event.target.checked);
    }
    const handlePPPK = (event) => {
        setPPPK(event.target.checked);
    }
    const handlePPPKDetail = (event) => {
        setPPPKDetail(event.target.checked);
    }
    const handleMidlevel = (event) => {
        setMidlevel(event.target.checked);
    }
    const handleLogin_ppnpn = async (event) => {
        event.preventDefault();
        const payload = {
            email: username,
            pass: password 
        };
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/login_lowLevel_ppnpn.php`, payload, {
                headers: {
                'Content-Type': 'multipart/form-data',
                }
            })
            console.log(response.data.status);
            localStorage.setItem('nama', response.data.data.nama);
            localStorage.setItem('nrk', response.data.data.nrk);
            localStorage.setItem('sisa_cuti', response.data.data.sisa_cuti);
            localStorage.setItem('f_profile', response.data.data.f_profile);
            localStorage.setItem('jabatan', response.data.data.jabatan);
            localStorage.setItem('email', response.data.data.email);
            localStorage.setItem('Status', response.data.data.Stat);
            localStorage.setItem('pj', response.data.data.pj);
            localStorage.setItem('Id_user', response.data.data.id);
            setTimeout(() => {
                alert("Welcome " + response.data.data.nama);
                navigate('/Home');
            }, 1000);
        } catch (error) {
            console.log(error.response);
            alert("Login failed. Please check your credentials.");
        }
    }

    const handleLogin_pppk = async (event) => {
        event.preventDefault();
        const payload = {
            email: username,
            pass: password 
        };
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/login_lowLevel_pppkasn.php`, payload, {
                headers: {
                'Content-Type': 'multipart/form-data',
                }
            })
            console.log(response.data.status);
            localStorage.setItem('nama', response.data.data.nama);
            localStorage.setItem('nrk', response.data.data.nrk);
            localStorage.setItem('f_profile', response.data.data.f_profile);
            localStorage.setItem('jabatan', response.data.data.jabatan);
            localStorage.setItem('email', response.data.data.email);
            localStorage.setItem('Status', response.data.data.Stat);
            setTimeout(() => {
                alert("Welcome " + response.data.data.nama);
                navigate('/Home');
            }, 1000);
        } catch (error) {
            console.log(error.response);
            alert("Login failed. Please check your credentials.");
        }
    }
    const handleLogin_midLevel = async (event) => {
        event.preventDefault();
        const payload = {
            email: username,
            pass: password 
        };
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/login_midLevel.php`, payload, {
                headers: {
                'Content-Type': 'multipart/form-data',
                }
            })
            console.log(response.data.status);
            localStorage.setItem('nama', response.data.data.nama);
            localStorage.setItem('nrk', response.data.data.nrk);
            localStorage.setItem('f_profile', response.data.data.f_profile);
            localStorage.setItem('jabatan', response.data.data.jabatan);
            localStorage.setItem('email', response.data.data.email);
            localStorage.setItem('Status', response.data.data.Stat);
            setTimeout(() => {
                alert("Welcome " + response.data.data.nama);
                navigate('/Home');
            }, 1000);
        } catch (error) {
            console.log(error.response);
            alert("Login failed. Please check your credentials.");
        }
    }
    const handleChangeUsername = (event) => {
        const newUsername = event.target.value;
        setUsername(newUsername);
        console.log(newUsername);
    }

    const [showPassword, setShowPassword] = useState({
        ppnpn: false,
        pppk: false,
        midlevel: false
    });

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
        console.log(event.target.value);
    }

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    }

    return(
        <>
        <div className='login'>
            <div className='col'>
                <div className='form-col'>
                    <form>
                        <div className='header'>
                            <h1>Login</h1>
                            <h3>Enter Your Username and Password to Sign In</h3>
                        </div>
                        <div className='selection'>
                            <div className='list'>
                                <input onChange={handlePPNPN} className='check' type="checkbox" name="" id="" />
                                <label htmlFor="">PPNPN</label>
                            </div>
                            <div className='list'>
                                <input onChange={handlePPPKDetail} className='check' type="checkbox" name="" id="" />
                                <label htmlFor="">ASN</label>
                                {pppkdetail && (
                                <div className='selection2'>
                                    <div className='list2'>
                                        <input onChange={handlePPPK} className='check' type="checkbox" name="" id="" />
                                        <label htmlFor="">User ASN</label>
                                    </div>
                                    <div className='list2'>
                                        <input onChange={handleMidlevel} className='check' type="checkbox" name="" id="" />
                                        <label htmlFor="">Koordinator/Kasubbag/Kepala Balai</label>
                                    </div>
                                </div>
                                    
                                )}
                            </div>
                        </div>
                        {ppnpn && (
                        <div className='input-col'>
                            <label>Username/email PPNPN</label>
                            <input onChange={handleChangeUsername} type="text" />
                            <label>Password</label>
                            <div className="password-input-container">
                                <input 
                                    onChange={handleChangePassword}
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
                            <div className='forget'>
                                <div className='checkbox'>
                                    <input type="checkbox" name="checkbox" id="" />
                                    <label htmlFor="">Keep me logged in</label>
                                </div>
                                <a href="">Forget Password ?</a>    
                            </div>
                            <button onClick={handleLogin_ppnpn} >Log in</button>
                            <div className='register'>
                                <p>Not registered yet?</p>
                                <a href="/signup">Create an Account</a>
                            </div>
                        </div> 
                        )}
                        {pppk && (
                        <div className='input-col'>
                            <label>Username/email PPPK/ASN</label>
                            <input onChange={handleChangeUsername} type="text" />
                            <label>Password</label>
                            <div className="password-input-container">
                                <input 
                                    onChange={handleChangePassword} 
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
                            <div className='forget'>
                                <div className='checkbox'>
                                    <input type="checkbox" name="checkbox" id="" />
                                    <label htmlFor="">Keep me logged in</label>
                                </div>
                                <a href="">Forget Password ?</a>    
                            </div>
                            <button onClick={handleLogin_pppk} >Log in</button>
                            <div className='register'>
                                <p>Not registered yet?</p>
                                <a href="/signup">Create an Account</a>
                            </div>
                        </div> 
                        )}
                        {midlevel && (
                        <div className='input-col'>
                            <label>Username/email</label>
                            <input onChange={handleChangeUsername} type="text" />
                            <label>Password</label>
                            <div className="password-input-container">
                                <input 
                                    onChange={handleChangePassword} 
                                    type={showPassword.midlevel ? "text" : "password"} 
                                />
                                <button 
                                    type="button" 
                                    className="toggle-password" 
                                    onClick={() => togglePasswordVisibility('midlevel')}
                                >
                                    {showPassword.midlevel ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                            </div>
                            <div className='forget'>
                                <div className='checkbox'>
                                    <input type="checkbox" name="checkbox" id="" />
                                    <label htmlFor="">Keep me logged in</label>
                                </div>
                                <a href="">Forget Password ?</a>    
                            </div>
                            <button onClick={handleLogin_midLevel} >Log in</button>
                            <div className='register'>
                                <p>Not registered yet?</p>
                                <a href="/signup">Create an Account</a>
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
export default Login