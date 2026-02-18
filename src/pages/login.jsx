import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');    
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin_ppnpn = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const payload = {
            username: username,
            pass: password 
        };
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/login_lowLevel_ppnpn.php`, payload, {
                headers: {
                'Content-Type': 'multipart/form-data',
                }
            })
            console.log(response.data.status);
            localStorage.setItem('id_akun', response.data.data.id_akun);
            localStorage.setItem('id_number', response.data.data.id_number);
            localStorage.setItem('nama', response.data.data.nama);
            const akses = String(response.data.data.akses_level ?? '');
            const route = `/Home/level-${akses}`;
            setTimeout(() => {
                alert("Welcome " + response.data.data.nama);                
                navigate(route, { replace: true });
                window.location.reload();
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            console.log(error.response);
            alert("Login failed. Please check your credentials.");
            setIsLoading(false);
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
        {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
            <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
        </div>}
            <div className='col'>
                <div className='form-col'>
                    <form>
                        <div className='header'>
                            <h1>Masuk</h1>
                            <h3>Masukan Username dan Password untuk Masuk</h3>
                        </div>                        
                        <div className='input-col'>
                            <label>Username</label>
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
                                    <label htmlFor="">Tetap Masuk</label>
                                </div>
                                <a href="">Forget Password ?</a>    
                            </div>
                            <button type='submit' onClick={handleLogin_ppnpn} >Masuk</button>
                            <div className='register'>
                                <p>Belum Ada Akun ?</p>
                                <a href="/signup">Buat Akun Disini</a>
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
export default Login