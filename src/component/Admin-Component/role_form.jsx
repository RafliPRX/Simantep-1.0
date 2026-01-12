
import '../Mawasdiri-component/cuti.css';
import Profile from '../profile';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
const Role_Form = () => {
    const storedUsername = localStorage.getItem('nama');
    const storedFProfile = localStorage.getItem('f_profile');
    const [isLoading, setIsLoading] = useState(false);    
    const [nama_role, setNamaRole] = useState('');
    const [kode_role, setKodeRole] = useState('');
    const [roleTab, setRoleTab] = useState('level-1');
    const navigate = useNavigate();

    const handleChangeNamaRole = (event) => {
        setNamaRole(event.target.value);
        console.log(event.target.value);
        
    }
    const handleChangeKodeRole = (event) => {
        setKodeRole(event.target.value);
        console.log(event.target.value);
    }        
    const handlePostRole = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      const payload = {
        nama_role: nama_role,
        kode_role: kode_role
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/Admin_API/new_Role.php`, payload, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/Home-Admin/Akun-Dashboard");
          alert(response.data.message);
        }, 1000);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response);
        alert("error code 103");
      }
    }
    const handlePostRoleLevel2 = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      const payload = {
        nama_role_c: nama_role,
        kode_role_c: kode_role
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/Admin_API/new_Role_level2.php`, payload, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/Home-Admin/Akun-Dashboard");
          alert(response.data.message);
        }, 1000);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response);
        alert("error code 103");
      }
    }
    const handlePostRoleLevel3 = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      const payload = {
        nama_role_b: nama_role,
        kode_role_b: kode_role
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/Admin_API/new_Role_level3.php`, payload, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/Home-Admin/Akun-Dashboard");
          alert(response.data.message);
        }, 1000);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response);
        alert("error code 103");
      }
    }
    const handlePostRoleLevel4 = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      const payload = {
        nama_role_a: nama_role,
        kode_role_a: kode_role
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/Admin_API/new_Role_level4.php`, payload, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/Home-Admin/Akun-Dashboard");
          alert(response.data.message);
        }, 1000);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response);
        alert("error code 103");
      }
    }
    const handlePostRoleSpesial = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      const payload = {
        nama_role_sp: nama_role,
        kode_role_sp: kode_role
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/Admin_API/new_Role_spesial.php`, payload, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/Home-Admin/Akun-Dashboard");
          alert(response.data.message);
        }, 1000);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response);
        alert("error code 103");
      }
    }
    return(
        <>
            <div className='main-dashboard'>
                {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                    <span style={{position: 'absolute', top : '500px'}} className="load-cuti"></span>
                </div>} 
                <p>Setting Akun/Penambahan Role</p>
                <h1>Penambahan Role</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="mawasdiri" />
                <div className='content-col'>
                    <div className='box1'>
                       <div className='tab-identity'>
                            <ul className='identity-list'>
                                <li className={`identity-item ${roleTab === 'level-1' ? 'active' : ''}`}
                                onClick={() => setRoleTab('level-1')}>Level 1</li>
                                <li className={`identity-item ${roleTab === 'level-2' ? 'active' : ''}`}
                                onClick={() => setRoleTab('level-2')}>Level 2</li>
                                <li className={`identity-item ${roleTab === 'level-3' ? 'active' : ''}`}
                                onClick={() => setRoleTab('level-3')}>Level 3</li>
                                <li className={`identity-item ${roleTab === 'level-4' ? 'active' : ''}`}
                                onClick={() => setRoleTab('level-4')}>Level 4</li>
                                <li className={`identity-item ${roleTab === 'spesial-role' ? 'active' : ''}`}
                                onClick={() => setRoleTab('spesial-role')}>Spesial</li>
                            </ul>
                        </div>
                        {roleTab === 'level-1' && (
                          <>
                            <form onSubmit={handlePostRole}>
                              <div className='content-f'>
                                <h1>Membuat Role Level 1</h1>                            
                                <label htmlFor="">Nama Role</label>
                                <input onChange={handleChangeNamaRole} placeholder='Nama Role' type="text"/>
                                <label htmlFor="">Kode Role</label>
                                <input onChange={handleChangeKodeRole} placeholder='Kode Role' type="text"/>
                                <label htmlFor="">Format Kode: D-Angka </label>
                              </div>                          
                              <button className='submit' type="submit">Submit</button>
                            </form>
                          </>
                        )}
                        {roleTab === 'level-2' && (
                          <>
                            <form onSubmit={handlePostRoleLevel2}>
                              <div className='content-f'>
                                <h1>Membuat Role Level 2</h1>                            
                                <label htmlFor="">Nama Role</label>
                                <input onChange={handleChangeNamaRole} placeholder='Nama Role' type="text"/>
                                <label htmlFor="">Kode Role</label>
                                <input onChange={handleChangeKodeRole} placeholder='Kode Role' type="text"/>
                                <label htmlFor="">Format Kode: C-Angka </label>
                              </div>                          
                              <button className='submit' type="submit">Submit</button>
                            </form>
                          </>
                        )}
                        {roleTab === 'level-3' && (
                          <>
                            <form onSubmit={handlePostRoleLevel3}>
                              <div className='content-f'>
                                <h1>Membuat Role Level 3</h1>                            
                                <label htmlFor="">Nama Role</label>
                                <input onChange={handleChangeNamaRole} placeholder='Nama Role' type="text"/>
                                <label htmlFor="">Kode Role</label>
                                <input onChange={handleChangeKodeRole} placeholder='Kode Role' type="text"/>
                                <label htmlFor="">Format Kode: B-Angka</label>
                              </div>                          
                              <button className='submit' type="submit">Submit</button>
                            </form>
                          </>
                        )}
                        {roleTab === 'level-4' && (
                          <>
                            <form onSubmit={handlePostRoleLevel4}>
                              <div className='content-f'>
                                <h1>Membuat Role Level 4</h1>                            
                                <label htmlFor="">Nama Role</label>
                                <input onChange={handleChangeNamaRole} placeholder='Nama Role' type="text"/>
                                <label htmlFor="">Kode Role</label>
                                <input onChange={handleChangeKodeRole} placeholder='Kode Role' type="text"/>
                                <label htmlFor="">Format Kode: A-Angka</label>
                              </div>                          
                              <button className='submit' type="submit">Submit</button>
                            </form>
                          </>
                        )}
                        {roleTab === 'spesial-role' && (
                          <>
                            <form onSubmit={handlePostRoleSpesial}>
                              <div className='content-f'>
                                <h1>Membuat Role Spesial</h1>                            
                                <label htmlFor="">Nama spesial Role</label>
                                <input onChange={handleChangeNamaRole} placeholder='Nama Role' type="text"/>
                                <label htmlFor="">Kode Spesial Role</label>
                                <input onChange={handleChangeKodeRole} placeholder='Kode Role' type="text"/>
                                <label htmlFor="">Format Kode: S-Angka</label>
                              </div>                          
                              <button className='submit' type="submit">Submit</button>
                            </form>
                          </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Role_Form;