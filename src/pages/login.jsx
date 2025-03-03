import { useState } from 'react';
import './login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const payload = {
            nama: username,
            pass: password 
        };
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/login.php`, payload, {
                headers: {
                'Content-Type': 'multipart/form-data',
                }
            })
            console.log(response.data.status);
            localStorage.setItem('nama', response.data.data.nama);
            localStorage.setItem('nrk', response.data.data.nrk);
            localStorage.setItem('sisa_cuti', response.data.data.sisa_cuti);
            localStorage.setItem('f_profile', response.data.data.f_profile);
            localStorage.setItem('id_jabatan_sup', response.data.data.id_jabatan_sup);
            localStorage.setItem('no_kelompok', response.data.data.no_kelompok);
            setTimeout(() => {
                alert("Welcome " + response.data.data.nama);
                navigate('/Home');
            }, 500);
        } catch (error) {
            console.log(error.response);
            alert("Login failed. Please check your credentials.");
        }
    }

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
        console.log(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
        console.log(event.target.value);
    }
    return(
        <>
        <div className='login'>
            <div className='col'>
                <div className='form-col'>
                    <form action="/Home">
                        <div className='header'>
                            <h1>Sign in</h1>
                            <h3>Enter Your Username and Password to Sign In</h3>
                        </div>
                        <div className='input-col'>
                            <label>Username</label>
                            <input onChange={handleChangeUsername} type="text" />
                            <label>Password</label>
                            <input onChange={handleChangePassword} type="password" />
                            <div className='forget'>
                                <div className='checkbox'>
                                    <input type="checkbox" name="checkbox" id="" />
                                    <label htmlFor="">Keep me logged in</label>
                                </div>
                                <a href="">Forget Password ?</a>    
                            </div>
                            <button onClick={handleLogin} >Sign In</button>
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