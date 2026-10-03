import { useState } from 'react'
import '../component/css/login.css'
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
                navigate('/Home-Admin');
                alert("Login successful: " + response.data.data.nama);
                window.location.reload();
            }, 500);
        } catch (error) {
            console.log(error.response);
            alert("Login failed. Please check your credentials.");
        }
    }
    return(
        <>
        <div className='container-fluid login w-100 vh-100 d-flex align-items-center justify-content-center p-0 bg-teal overflow-auto'>
            <div className='row justify-content-center align-content-center w-100'>
                <div className='col-12 col-lg-6 justify-content-center align-items-center d-flex'>
                    <div className='form-col justify-content-center align-items-center d-flex border rounded-4 w-70 bg-green-old'>
                        <form className='d-flex flex-column g-5 m-5'>
                            <div className='header font-set'>
                                <h1 className='font-header'>Sign in</h1>
                                <h3 className='fs-5'>Enter Your Email and Password to Sign In</h3>
                            </div>
                            <div className='text-white flex-column d-flex mt-4'>
                                <label className='mb-2'>Email</label>
                                <input className='w-60 p-2 rounded-2 mt-1' onChange={handleChangeUsername} type="text" value="admin" />
                                <label className='mb-1 mt-2'>Password</label>
                                <input className='w-60 p-2 rounded-2 mt-1 mb-4'   onChange={handleChangePassword} type="password" />                            
                                <button className='btn-login p-2 rounded-4' onClick={handleLoginADM}>Sign In</button>
                            </div> 
                        </form>
                    </div>
                </div>
                <div className='col-12 col-lg-6 p-0 logo-col'>
                    <div className='d-flex justify-content-center align-items-center vh-100 bg-login-logo'>
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
export default Login_ADM
