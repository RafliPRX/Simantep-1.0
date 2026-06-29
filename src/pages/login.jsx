import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../component/css/login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLoading } from '../component/LoadingContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { isLoading, setIsLoading } = useLoading();

    const handleLogin_ppnpn = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const payload = {
            username: username,
            pass: password 
        };

        try {
            const response = await axios.post(
                'https://simantepbareta.cloud/API/login_lowLevel_ppnpn.php',
                payload,
                { 
                    headers: { 
                        'Content-Type': 'multipart/form-data' 
                    }  
                }
            );

            localStorage.setItem('id_akun', response.data.data.id_akun);
            localStorage.setItem('id_number', response.data.data.id_number);
            localStorage.setItem('nama', response.data.data.nama);

            const akses = String(response.data.data.akses_level ?? '');
            const route = `/Home/level-${akses}`;

            alert('Welcome ' + response.data.data.nama);            
            navigate(route, { replace: true });
            window.location.reload();
            // Loading akan dimatikan di homepage ketika data identity selesai dimuat
        } catch (error) {
            console.log(error.response);
            alert('Login failed. Please check your credentials.');
            setIsLoading(false);
        }
    };

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const [showPassword, setShowPassword] = useState({
        ppnpn: false,
        pppk: false,
        midlevel: false
    });

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
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
            <div className='container-fluid login w-100 vh-100 d-flex align-items-center justify-content-center p-0'>                
                <div className='row justify-content-center align-content-center w-100'>
                    <div className='col-12 col-lg-6 justify-content-center align-items-center d-flex'>
                        <div className='form-col justify-content-center align-items-center d-flex border rounded-4 w-70'>
                            <form className='d-flex flex-column g-5 m-5'>
                                <div className='header font-set'>
                                    <h1 className='font-header'>Masuk</h1>
                                    <h3 className='fs-5'>Masukan Username dan Password untuk Masuk</h3>
                                </div>
                                <div className='text-white flex-column d-flex mt-4'>
                                    <label className='mb-2'>Username</label>
                                    <input className='w-60 p-2 rounded-2 mt-1' onChange={handleChangeUsername} type="text" />
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
                                    <div className='forget mt-3 mb-3'>
                                        <div className='checkbox d-none'>
                                            <input type="checkbox" name="checkbox" id="" />
                                            <label htmlFor="">Tetap Masuk</label>
                                        </div>
                                        <a className='login-href' href="">Lupa Password ?</a>
                                    </div>
                                    <button className='btn-login p-2 rounded-4' type='submit' onClick={handleLogin_ppnpn}>Masuk</button>
                                    <div className='register'>
                                        <p>Belum Ada Akun ?</p>
                                        <a className='login-href' href="/signup">Buat Akun Disini</a>
                                    </div>
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
export default Login