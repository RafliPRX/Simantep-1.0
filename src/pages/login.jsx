import { useState, useEffect } from 'react';
import './login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fetchedName, setFetchedName] = useState(''); // New state for fetched name
    const [usernames, setUsernames] = useState([]); // State to hold usernames for the select dropdown
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsernames = async () => {
            try {
                const response = await axios.get(`https://simantepbareta.cloud/API/get_username.php`); // Ensure this endpoint is correct
                console.log("Usernames fetched:", response.data); // Log the response for debugging
                if (Array.isArray(response.data)) {
                    setUsernames(response.data); // Set the usernames for the dropdown
                } else {
                    console.error("Unexpected data format:", response.data);
                }
            } catch (error) {
                console.error("Error fetching usernames:", error);
            }
        };
        fetchUsernames();
    }, []);

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

    useEffect(() => {
        const fetchName = async () => {
            if (username) {
                try {
                    const response = await axios.get(`https://simantepbareta.cloud/API/get_username.php`);
                    console.log(response.data); // Log the entire response for debugging
                    console.log("Fetched Name:", response.data); // Log the fetched name for debugging
                    setFetchedName(response.data.nama); // Assuming the API returns an object with a key 'nama'
                } catch (error) {
                    console.error("Error fetching name:", error);
                    setFetchedName(''); // Clear name if there's an error
                }
            } else {
                setFetchedName(''); // Clear name if username is empty
            }
        };
        fetchName();
    }, [username]);

    const handleChangeUsername = (event) => {
        const newUsername = event.target.value;
        setUsername(newUsername);
        console.log(newUsername);
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
                            <select onChange={handleChangeUsername}>
                                <option value="">Select Username</option>
                                {usernames.map((user) => (
                                    <option key={user.nama} value={user.nama}>{user.nama}</option> // Assuming each user has a unique nama

                                ))}
                            </select>
                            {fetchedName && <p style={{ color: 'blue' }}>{fetchedName}</p>} {/* Display fetched name */}

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
