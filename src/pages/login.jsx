import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');    
    const navigate = useNavigate();

    const handleLogin_ppnpn = async (event) => {
        event.preventDefault();
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
                                    <label htmlFor="">Keep me logged in</label>
                                </div>
                                <a href="">Forget Password ?</a>    
                            </div>
                            <button type='submit' onClick={handleLogin_ppnpn} >Log in</button>
                            <div className='register'>
                                <p>Not registered yet?</p>
                                <a href="/signup">Create an Account</a>
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