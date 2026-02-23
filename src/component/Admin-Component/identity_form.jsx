
import '../css/form.css';
import Profile from '../profile';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
const Identity_Form = () => {
    const storedUsername = localStorage.getItem('nama');
    const storedFProfile = localStorage.getItem('f_profile');
    const [isLoading, setIsLoading] = useState(false);
    const [allrole, setAllRole] = useState([]);
    const [allrole_c, setAllRole_c] = useState([]);
    const [allrole_b, setAllRole_b] = useState([]);
    const [allrole_a, setAllRole_a] = useState([]);
    const [allrole_sp, setAllRole_sp] = useState([]);
    const [nama, setNama] = useState('');
    const [sisa_cuti, setSisaCuti] = useState('');
    const [nama_role, setNamaRole] = useState('');
    const [kode_role, setKodeRole] = useState('');
    const [nama_role_c, setNamaRole_c] = useState('');
    const [kode_role_c, setKodeRole_c] = useState('');
    const [nama_role_b, setNamaRole_b] = useState('');
    const [kode_role_b, setKodeRole_b] = useState('');
    const [nama_role_a, setNamaRole_a] = useState('');
    const [kode_role_a, setKodeRole_a] = useState('');
    const [nama_role_sp, setNamaRole_sp] = useState('');
    const [kode_role_sp, setKodeRole_sp] = useState('');
    const navigate = useNavigate();

    const [form_tab, setForm_Tab] = useState('level 1');

    const handleChangeNama = (event) => {
        setNama(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeSisa_Cuti = (event) => {
        setSisaCuti(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeNamaRole = (event) => {
        setNamaRole(event.target.value);
        console.log(event.target.value);
        
        const selectedRoleData = allrole.find((role) => role.nama_role === event.target.value);
        if (selectedRoleData) {
            setKodeRole(selectedRoleData.kode_role);
        }
    }
    const handleChangeNamaRole_level2 = (event) => {
        setNamaRole_c(event.target.value);
        console.log(event.target.value);
        
        const selectedRoleData = allrole_c.find((role) => role.nama_role_c === event.target.value);
        if (selectedRoleData) {
            setKodeRole_c(selectedRoleData.kode_role_c);
        }
    }
    const handleChangeNamaRole_level3 = (event) => {
        setNamaRole_b(event.target.value);
        console.log(event.target.value);
        
        const selectedRoleData = allrole_b.find((role) => role.nama_role_b === event.target.value);
        if (selectedRoleData) {
            setKodeRole_b(selectedRoleData.kode_role_b);
        }
    }
    const handleChangeNamaRole_level4 = (event) => {
        setNamaRole_a(event.target.value);
        console.log(event.target.value);
        
        const selectedRoleData = allrole_a.find((role) => role.nama_role_a === event.target.value);
        if (selectedRoleData) {
            setKodeRole_a(selectedRoleData.kode_role_a);
        }
    }
    const handleChangeNamaRole_spesial = (event) => {
        setNamaRole_sp(event.target.value);
        console.log(event.target.value);
        
        const selectedRoleData = allrole_sp.find((role) => role.nama_role_sp === event.target.value);
        if (selectedRoleData) {
            setKodeRole_sp(selectedRoleData.kode_role_sp);
        }
    }
    const getRole = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getAllRole.php`;
        let url = baseUrl;
        axios.get(url).then((res2) => {
            console.log(res2.data.Data);
            const response = res2.data.Data;
            setAllRole(response);
            console.log(response);
        })        
        .catch((error) => {
            console.log(error);
        });
    }
    const getRole_c = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getAllrole-level2.php`;
        let url = baseUrl;
        axios.get(url).then((res2) => {
            console.log(res2.data.Data);
            const response = res2.data.Data;
            setAllRole_c(response);
            console.log(response);
        })        
        .catch((error) => {
            console.log(error);
        });
    }
    const getRole_b = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/get-allRole-level3.php`;
        let url = baseUrl;
        axios.get(url).then((res2) => {
            console.log(res2.data.Data);
            const response = res2.data.Data;
            setAllRole_b(response);
            console.log(response);
        })        
        .catch((error) => {
            console.log(error);
        });
    }
    const getRole_a = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getAllRole-level4.php`;
        let url = baseUrl;
        axios.get(url).then((res2) => {
            console.log(res2.data.Data);
            const response = res2.data.Data;
            setAllRole_a(response);
            console.log(response);
        })        
        .catch((error) => {
            console.log(error);
        });
    }
    const getRole_sp = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getAllrole-spesial.php`;
        let url = baseUrl;
        axios.get(url).then((res2) => {
            console.log(res2.data.Data);
            const response = res2.data.Data;
            setAllRole_sp(response);
            console.log(response);
        })        
        .catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        getRole();
        getRole_c();
        getRole_b();
        getRole_a();
        getRole_sp();
    }, []);
    const handlePostIdentitas = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      const payload = {
        nama: nama,
        sisa_cuti: sisa_cuti,
        nama_role: nama_role,
        kode_role: kode_role,
        nama_role_c: nama_role_c,        
        kode_role_c: kode_role_c,
        nama_role_b: "Kepegawaian",
        kode_role_b: "B-01",
        nama_role_a: "Kepala Sub Bagian Tata Usaha",
        kode_role_a: "A-02",
        nama_role_sp: nama_role_sp,
        kode_role_sp: kode_role_sp,
        akses_level: 1,
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/Admin_API/new_Identity.php`, payload, {
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
    const handlePostIdentitaslv2 = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      const payload = {
        nama: nama,
        sisa_cuti: 0,
        nama_role: 0,
        kode_role: 0,
        nama_role_c: nama_role_c,
        kode_role_c: kode_role_c,
        nama_role_b: 0,
        kode_role_b: 0,
        nama_role_a: 0,
        kode_role_a: 0,
        nama_role_sp: 0,
        kode_role_sp: 0,
        akses_level: 2,
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/Admin_API/new_Identity.php`, payload, {
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
    const handlePostIdentitaslv3 = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      const payload = {
        nama: nama,
        sisa_cuti: 0,
        nama_role: 0,
        kode_role: 0,
        nama_role_c: 0,
        kode_role_c: 0,
        nama_role_b: nama_role_b,
        kode_role_b: kode_role_b,
        nama_role_a: 0,
        kode_role_a: 0,
        nama_role_sp: 0,
        kode_role_sp: 0,
        akses_level: 3,
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/Admin_API/new_Identity.php`, payload, {
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
    const handlePostIdentitaslv4 = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      const payload = {
        nama: nama,
        sisa_cuti: 0,
        nama_role: 0,
        kode_role: 0,
        nama_role_c: 0,
        kode_role_c: 0,
        nama_role_b: 0,
        kode_role_b: 0,
        nama_role_a: nama_role_a,
        kode_role_a: kode_role_a,
        nama_role_sp: 0,
        kode_role_sp: 0,
        akses_level: 4,
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/Admin_API/new_Identity.php`, payload, {
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
                <p>Setting Akun/Penambahan Identitas</p>
                <h1>Penambahan Identitas</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="mawasdiri" />
                <div className='content-col'>
                    <div className='box1'>
                      <div className='tab-identity'>
                            <ul className='identity-list'>
                                <li className={`identity-item ${form_tab === 'level 1' ? 'active' : ''}`}
                                onClick={() => setForm_Tab('level 1')}>Level 1</li>
                                <li className={`identity-item ${form_tab === 'level 2' ? 'active' : ''}`}
                                onClick={() => setForm_Tab('level 2')}>Level 2</li>
                                <li className={`identity-item ${form_tab === 'level 3' ? 'active' : ''}`}
                                onClick={() => setForm_Tab('level 3')}>Level 3</li>
                                <li className={`identity-item ${form_tab === 'level 4' ? 'active' : ''}`}
                                onClick={() => setForm_Tab('level 4')}>Level 4</li>
                            </ul>
                        </div>
                        {form_tab === 'level 1' && (
                          <>                          
                            <form onSubmit={handlePostIdentitas}>
                              <div className='content-f'>                                                    
                                <h1>Identitas Level 1</h1>
                                <label htmlFor="">Nama</label>
                                <input onChange={handleChangeNama} placeholder='Nama' type="text" />
                                <label htmlFor="">Sisa Cuti</label>
                                <input onChange={handleChangeSisa_Cuti} placeholder='Jumlah Cuti' type="text" />
                                <label htmlFor="">Nama Role</label>
                                <select onChange={handleChangeNamaRole} name="" id="">
                                  <option value="" selected>Pilih Role</option>
                                {allrole.map((item) => (
                                    <>                                                                                    
                                      <option value={item.nama_role}>{item.nama_role}</option>                                        
                                    </>
                                ))}
                                </select>
                                <label htmlFor="">Kode Role</label>
                                <input placeholder='Kode Role' type="text" value={kode_role} readOnly/>
                                <label htmlFor="">Nama Role Level 2</label>
                                <select onChange={handleChangeNamaRole_level2} name="" id="">
                                  <option value="" selected>Pilih Role Level 2</option>
                                {allrole_c.map((item) => (
                                    <>                                                                                    
                                      <option value={item.nama_role_c}>{item.nama_role_c}</option>                                        
                                    </>
                                ))}
                                </select>
                                <label htmlFor="">Kode Role Spesial</label>
                                <input placeholder='Kode Role' type="text" value={kode_role_c} readOnly/>
                                <label htmlFor="">Nama Role Level Spesial</label>
                                <select onChange={handleChangeNamaRole_spesial} name="" id="">
                                  <option value="" selected>Pilih Role Spesial (jika tidak ada maka pilih (0))</option>
                                {allrole_sp.map((item) => (
                                    <>                                                                                    
                                      <option value={item.nama_role_sp}>{item.nama_role_sp}</option>                                        
                                    </>
                                ))}
                                </select>
                                <label htmlFor="">Kode Role Spesial</label>
                                <input placeholder='Kode Role' type="text" value={kode_role_sp} readOnly/>
                              </div>                          
                              <button className='submit' type="submit">Submit</button>
                            </form>
                          </>
                        )}
                        {form_tab === 'level 2' && (
                          <>                          
                            <form onSubmit={handlePostIdentitaslv2}>
                              <div className='content-f'>                                                    
                                <h1>Identitas Level 2</h1>
                                <label htmlFor="">Nama</label>
                                <input onChange={handleChangeNama} placeholder='Nama' type="text" />
                                <label htmlFor="">Nama Role</label>
                                <select onChange={handleChangeNamaRole_level2} name="" id="">
                                  <option value="" selected>Pilih Role</option>
                                  {allrole_c.map((item) => (
                                      <>                                                                                      
                                        <option value={item.nama_role_c}>{item.nama_role_c}</option>                                        
                                      </>
                                  ))}
                                </select>
                                <label htmlFor="">Kode Role</label>
                                <input placeholder='Kode Role' type="text" value={kode_role_c} readOnly/>
                              </div>                          
                              <button className='submit' type="submit">Submit</button>
                            </form>
                          </>
                        )}
                        {form_tab === 'level 3' && (
                          <>                          
                            <form onSubmit={handlePostIdentitaslv3}>
                              <div className='content-f'>                                                    
                                <h1>Identitas Level 3</h1>
                                <label htmlFor="">Nama</label>
                                <input onChange={handleChangeNama} placeholder='Nama' type="text" />
                                <label htmlFor="">Nama Role</label>
                                <select onChange={handleChangeNamaRole_level3} name="" id="">
                                  <option value="" selected>Pilih Role</option>
                                  {allrole_b.map((item) => (
                                      <>                                                                                      
                                        <option value={item.nama_role_b}>{item.nama_role_b}</option>                                        
                                      </>
                                  ))}
                                </select>
                                <label htmlFor="">Kode Role</label>
                                <input placeholder='Kode Role' type="text" value={kode_role_b} readOnly/>
                              </div>                          
                              <button className='submit' type="submit">Submit</button>
                            </form>
                          </>
                        )}
                        {form_tab === 'level 4' && (
                          <>                          
                            <form onSubmit={handlePostIdentitaslv4}>
                              <div className='content-f'>                                                    
                                <h1>Identitas Level 4</h1>
                                <label htmlFor="">Nama</label>
                                <input onChange={handleChangeNama} placeholder='Nama' type="text" />
                                <label htmlFor="">Nama Role</label>
                                <select onChange={handleChangeNamaRole_level4} name="" id="">
                                  <option value="" selected>Pilih Role</option>
                                  {allrole_a.map((item) => (
                                      <>                                                                                      
                                        <option value={item.nama_role_a}>{item.nama_role_a}</option>                                        
                                      </>
                                  ))}
                                </select>
                                <label htmlFor="">Kode Role</label>
                                <input placeholder='Kode Role' type="text" value={kode_role_a} readOnly/>
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
export default Identity_Form;