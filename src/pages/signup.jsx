import { useEffect, useState } from 'react';
import './login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nrk, setNRK] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const payload = {
            nama: username,
            pass: password,
            nrk: nrk
        };
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/signup.php`, payload, {
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

    const [nama, setNama] = useState([]);
    const getNama = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/get_nama.php`, {
                headers: {} 
            })
            console.log(response.data);
            setNama(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() =>{
        getNama();
    },[]);

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
        console.log(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
        console.log(event.target.value);
    }

    const handleChangeNRK = (event) => {
        setNRK(event.target.value);
        console.log(event.target.value);
    }
    return(
        <>
        <div className='login'>
            <div className='col'>
                <div className='form-col'>
                    <form action="/Home">
                        <div className='header'>
                            <h1>Sign Up</h1>
                            <h3>Create Your Username and Password</h3>
                        </div>
                        <div className='input-col'>
                            <label>Username</label>
                            <select onChange={handleChangeUsername}>
                                    <option value="">Select Username</option>
                                {nama.map((item, index) => (
                                    <option key={index} value={item.nama}>{item.nama}</option>
                                ))}
                            </select>
                            <label>Password</label>
                            <input onChange={handleChangePassword} type="password" />
                            <label>NRK</label>
                            <input onChange={handleChangeNRK} type="text" />
                            <button onClick={handleLogin} >Sign In</button>
                            <div className='register'>
                                <a href='/'>Already registered ?</a>
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