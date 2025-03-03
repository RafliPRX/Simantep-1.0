import { useState } from 'react'
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login_ADM = () => {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('');

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
        console.log(event.target.value);
    }
    const navigate = useNavigate();
    const handleLoginADM = async (event) => {
        event.preventDefault();
        const payload = {
            nama: username,
            pass: password
        };
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/login_adm.php`, payload, {
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            });
            console.log(response.data);
            localStorage.setItem('nama', response.data.data.nama);
            setTimeout(() => {
                navigate('/Home');
            alert("Login successful: " + response.data.data.nama);

            }, 500);
        } catch (error) {
            console.log(error.response);
            alert("Login failed. Please check your credentials.");
        }
    }
    return(
        <>
        <div className='login'>
            <div className='col'>
                <div className='form-col'>
                    <form action="/Home">
                        <div className='header'>
                            <h1>Sign in</h1>
                            <h3>Enter Your Email and Password to Sign In</h3>
                        </div>
                        <div className='input-col'>
                            <label>Email</label>
                            <input onChange={handleChangeUsername} type="text" value="admin" />
                            <label>Password</label>
                            <input onChange={handleChangePassword} type="password" />
                            <div className='forget'>
                                <div className='checkbox'>
                                    <input type="checkbox" name="checkbox" id="" />
                                    <label htmlFor="">Keep me logged in</label>
                                </div>
                            </div>
                            <button onClick={handleLoginADM}>Sign In</button>
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
export default Login_ADM
