
import '../css/form.css';
import Profile from '../profile';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
const Detail_Identity_Form_lv2 = () => {
    const storedUsername = localStorage.getItem('nama');
    const storedFProfile = localStorage.getItem('f_profile');
    const [isLoading, setIsLoading] = useState(false);
    // const [allrole, setAllRole] = useState([]);
    const [allrole_c, setAllRole_c] = useState([]);
    // const [allrole_b, setAllRole_b] = useState([]);
    // const [allrole_a, setAllRole_a] = useState([]);    
    // const [nama_role_b, setNamaRole_b] = useState('');
    // const [kode_role_b, setKodeRole_b] = useState('');
    // const [nama_role_a, setNamaRole_a] = useState('');
    // const [kode_role_a, setKodeRole_a] = useState('');
    const param = useParams();
    const navigate = useNavigate();

    // const [form_tab, setForm_Tab] = useState('level 1');
  
    const handleChangeNama = (event) => {
        setNama(event.target.value);
        console.log(event.target.value);
    }
    // const handleChangeSisa_Cuti = (event) => {
    //     setSisaCuti(event.target.value);
    //     console.log(event.target.value);
    // }
    // const handleChangeNamaRole = (event) => {
    //     setNamaRole(event.target.value);
    //     console.log(event.target.value);
        
    //     const selectedRoleData = allrole.find((role) => role.nama_role === event.target.value);
    //     if (selectedRoleData) {
    //         setKodeRole(selectedRoleData.kode_role);
    //     }
    // }
    const handleChangeNamaRole_level2 = (event) => {
        setNamaRole_c(event.target.value);
        console.log(event.target.value);
        
        const selectedRoleData = allrole_c.find((role) => role.nama_role_c === event.target.value);
        if (selectedRoleData) {
            setKodeRole_c(selectedRoleData.kode_role_c);
        }
    }
    // const handleChangeNamaRole_level3 = (event) => {
    //     setNamaRole_b(event.target.value);
    //     console.log(event.target.value);
        
    //     const selectedRoleData = allrole_b.find((role) => role.nama_role_b === event.target.value);
    //     if (selectedRoleData) {
    //         setKodeRole_b(selectedRoleData.kode_role_b);
    //     }
    // }
    // const handleChangeNamaRole_level4 = (event) => {
    //     setNamaRole_a(event.target.value);
    //     console.log(event.target.value);
        
    //     const selectedRoleData = allrole_a.find((role) => role.nama_role_a === event.target.value);
    //     if (selectedRoleData) {
    //         setKodeRole_a(selectedRoleData.kode_role_a);
    //     }
    // }
    const [identityData, setIdentityData] = useState([]);
    const [nama, setNama] = useState(identityData.nama);
    // const [sisa_cuti, setSisaCuti] = useState(identityData.sisa_cuti);
    // const [nama_role, setNamaRole] = useState(identityData.nama_role);
    // const [kode_role, setKodeRole] = useState(identityData.kode_role);
    const [nama_role_c, setNamaRole_c] = useState(identityData.nama_role_c);
    const [kode_role_c, setKodeRole_c] = useState(identityData.kode_role_c);
    const getIdentityData = async () => {
      try {
            const response = await axios.get(`https://simantepbareta.cloud/API/Admin_API/detail_identity.php?id=${param.id}`, {
                headers: {}
            });
            setIdentityData(response.data);
            console.log(response.data);
            setNama(response.data.nama);
            // setSisaCuti(response.data.sisa_cuti);
            // setNamaRole(response.data.nama_role);
            // setKodeRole(response.data.kode_role);
            setNamaRole_c(response.data.nama_role_c);
            setKodeRole_c(response.data.kode_role_c);
        } catch (error) {
            console.error(error);
        }
    }
    // const getRole = async() => {
    //     const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getAllRole.php`;
    //     let url = baseUrl;
    //     axios.get(url).then((res2) => {
    //         console.log(res2.data.Data);
    //         const response = res2.data.Data;
    //         setAllRole(response);
    //         console.log(response);
    //     })        
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }
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
    // const getRole_b = async() => {
    //     const baseUrl = `https://simantepbareta.cloud/API/Admin_API/get-allRole-level3.php`;
    //     let url = baseUrl;
    //     axios.get(url).then((res2) => {
    //         console.log(res2.data.Data);
    //         const response = res2.data.Data;
    //         setAllRole_b(response);
    //         console.log(response);
    //     })        
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }
    // const getRole_a = async() => {
    //     const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getAllRole-level4.php`;
    //     let url = baseUrl;
    //     axios.get(url).then((res2) => {
    //         console.log(res2.data.Data);
    //         const response = res2.data.Data;
    //         setAllRole_a(response);
    //         console.log(response);
    //     })        
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }
    useEffect(() => {
        getIdentityData();
        // getRole();
        getRole_c();
        // getRole_b();
        // getRole_a();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleUpdateIdentitas = async (event) => {
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
        akses_level: 2,
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/Admin_API/update_identity.php?id=${param.id}`, payload, {
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
    // const handlePostIdentitaslv2 = async (event) => {
    //   event.preventDefault();
    //   setIsLoading(true);
    //   const payload = {
    //     nama: nama,
    //     sisa_cuti: 0,
    //     nama_role: 0,
    //     kode_role: 0,
    //     nama_role_c: nama_role_c,
    //     kode_role_c: kode_role_c,
    //     nama_role_b: 0,
    //     kode_role_b: 0,
    //     nama_role_a: 0,
    //     kode_role_a: 0,
    //     akses_level: 2,
    //   };
    //   try {
    //     const response = await axios.post(`https://simantepbareta.cloud/API/Admin_API/new_Identity.php`, payload, {
    //       headers: {
    //         "Content-Type": "multipart/form-data"
    //       }
    //     });
    //     console.log(response.data);
    //     setTimeout(() => {
    //       setIsLoading(false);
    //       navigate("/Home-Admin/Akun-Dashboard");
    //       alert(response.data.message);
    //     }, 1000);
    //   } catch (error) {
    //     setIsLoading(false);
    //     console.log(error.response);
    //     alert("error code 103");
    //   }
    // }
    // const handlePostIdentitaslv3 = async (event) => {
    //   event.preventDefault();
    //   setIsLoading(true);
    //   const payload = {
    //     nama: nama,
    //     sisa_cuti: 0,
    //     nama_role: 0,
    //     kode_role: 0,
    //     nama_role_c: 0,
    //     kode_role_c: 0,
    //     nama_role_b: nama_role_b,
    //     kode_role_b: kode_role_b,
    //     nama_role_a: 0,
    //     kode_role_a: 0,
    //     akses_level: 3,
    //   };
    //   try {
    //     const response = await axios.post(`https://simantepbareta.cloud/API/Admin_API/new_Identity.php`, payload, {
    //       headers: {
    //         "Content-Type": "multipart/form-data"
    //       }
    //     });
    //     console.log(response.data);
    //     setTimeout(() => {
    //       setIsLoading(false);
    //       navigate("/Home-Admin/Akun-Dashboard");
    //       alert(response.data.message);
    //     }, 1000);
    //   } catch (error) {
    //     setIsLoading(false);
    //     console.log(error.response);
    //     alert("error code 103");
    //   }
    // }
    // const handlePostIdentitaslv4 = async (event) => {
    //   event.preventDefault();
    //   setIsLoading(true);
    //   const payload = {
    //     nama: nama,
    //     sisa_cuti: 0,
    //     nama_role: 0,
    //     kode_role: 0,
    //     nama_role_c: 0,
    //     kode_role_c: 0,
    //     nama_role_b: 0,
    //     kode_role_b: 0,
    //     nama_role_a: nama_role_a,
    //     kode_role_a: kode_role_a,
    //     akses_level: 4,
    //   };
    //   try {
    //     const response = await axios.post(`https://simantepbareta.cloud/API/Admin_API/new_Identity.php`, payload, {
    //       headers: {
    //         "Content-Type": "multipart/form-data"
    //       }
    //     });
    //     console.log(response.data);
    //     setTimeout(() => {
    //       setIsLoading(false);
    //       navigate("/Home-Admin/Akun-Dashboard");
    //       alert(response.data.message);
    //     }, 1000);
    //   } catch (error) {
    //     setIsLoading(false);
    //     console.log(error.response);
    //     alert("error code 103");
    //   }
    // }
    return(
        <>
            <div className='main-dashboard'>
                {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                    <span style={{position: 'absolute', top : '500px'}} className="load-cuti"></span>
                </div>}
                <p>Setting Akun/Perubahan Identitas</p>
                <h1>Perubahan Identitas Level 1</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="mawasdiri" />
                <div className='content-col'>
                    <div className='box1'>
                      <div className='tab-identity'>                            
                        </div>
                        <form onSubmit={handleUpdateIdentitas}>
                              <div className='content-f'>                                                    
                                <h1>Identitas Level 2</h1>
                                <label htmlFor="">Nama</label>
                                <input onChange={handleChangeNama} value={nama} placeholder='Nama' type="text" />
                                <label htmlFor="">Nama Role</label>
                                <select onChange={handleChangeNamaRole_level2} value={nama_role_c} name="" id="">
                                  <option value={nama_role_c} selected>{nama_role_c}</option>
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
                        {/* {form_tab === 'level 1' && (
                          <>                          
                            <form onSubmit={handlePostIdentitas}>
                              <div className='content-f'>                                                    
                                <h1>Identitas Level 1</h1>
                                <label htmlFor="">Nama</label>
                                <input onChange={handleChangeNama} value={nama} placeholder='Nama' type="text" />
                                <label htmlFor="">Sisa Cuti</label>
                                <input onChange={handleChangeSisa_Cuti} value={sisa_cuti} placeholder='Jumlah Cuti' type="text" />
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
                                <label htmlFor="">Kode Role level 2</label>
                                <input placeholder='Kode Role' type="text" value={kode_role_c} readOnly/>
                              </div>                          
                              <button className='submit' type="submit">Submit</button>
                            </form>
                          </>
                        )} */}
                        {/* {form_tab === 'level 2' && (
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
                        )} */}
                        {/* {form_tab === 'level 3' && (
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
                        )} */}
                        {/* {form_tab === 'level 4' && (
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
                        )} */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Detail_Identity_Form_lv2;