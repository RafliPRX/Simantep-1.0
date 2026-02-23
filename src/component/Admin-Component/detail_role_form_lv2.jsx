
import '../css/form.css';
import Profile from '../profile';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
const Detail_Role_Form_Lv2 = () => {
    const storedUsername = localStorage.getItem('nama');
    const storedFProfile = localStorage.getItem('f_profile');
    const [isLoading, setIsLoading] = useState(false);        
    // const [roleTab, setRoleTab] = useState('level-1');
    const param = useParams();
    const navigate = useNavigate();

    const handleChangeNamaRole = (event) => {
        setNamaRole(event.target.value);
        console.log(event.target.value);        
    }
    const handleChangeKodeRole = (event) => {
        setKodeRole(event.target.value);
        console.log(event.target.value);
    }

    const [role_lv2_detail, setRoleLv1Detail] = useState([]);
    const [nama_role, setNamaRole] = useState(role_lv2_detail.nama_role_c);
    const [kode_role, setKodeRole] = useState(role_lv2_detail.kode_role_c);
    const getDetailRoleLv = async () => {
      try {
            const response = await axios.get(`https://simantepbareta.cloud/API/Admin_API/detail_role_lv2.php?id=${param.id}`, {
                headers: {}
            });
            setRoleLv1Detail(response.data);
            console.log(response.data);
            setNamaRole(response.data.nama_role_c);
            setKodeRole(response.data.kode_role_c);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
      getDetailRoleLv();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);    
    const handlePostRole = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      const payload = {
        nama_role_c: nama_role,
        kode_role_c: kode_role
      };
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/Admin_API/update_role_lv2.php?id=${param.id}`, payload, {
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
    // const handlePostRoleLevel2 = async (event) => {
    //   event.preventDefault();
    //   setIsLoading(true);
    //   const payload = {
    //     nama_role_c: nama_role,
    //     kode_role_c: kode_role
    //   };
    //   try {
    //     const response = await axios.post(`https://simantepbareta.cloud/API/Admin_API/new_Role_level2.php`, payload, {
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
    // const handlePostRoleLevel3 = async (event) => {
    //   event.preventDefault();
    //   setIsLoading(true);
    //   const payload = {
    //     nama_role_b: nama_role,
    //     kode_role_b: kode_role
    //   };
    //   try {
    //     const response = await axios.post(`https://simantepbareta.cloud/API/Admin_API/new_Role_level3.php`, payload, {
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
    // const handlePostRoleLevel4 = async (event) => {
    //   event.preventDefault();
    //   setIsLoading(true);
    //   const payload = {
    //     nama_role_a: nama_role,
    //     kode_role_a: kode_role
    //   };
    //   try {
    //     const response = await axios.post(`https://simantepbareta.cloud/API/Admin_API/new_Role_level4.php`, payload, {
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
                <p>Setting Akun/Update Role</p>
                <h1>Update Role</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="mawasdiri" />
                <div className='content-col'>
                    <div className='box1'>
                      <form onSubmit={handlePostRole}>
                        <div className='content-f'>
                          <h1>Update Role Level 2</h1>                            
                          <label htmlFor="">Nama Role</label>
                          <input onChange={handleChangeNamaRole} value={nama_role} placeholder='Nama Role' type="text"/>
                          <label htmlFor="">Kode Role</label>
                          <input onChange={handleChangeKodeRole} value={kode_role} placeholder='Kode Role' type="text"/>
                          <label htmlFor="">Format Kode: C-Angka </label>
                        </div>                          
                        <button className='submit' type="submit">Submit</button>
                      </form>
                        {/* {roleTab === 'level-1' && (
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
                        )} */}
                        {/* {roleTab === 'level-2' && (
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
                        )} */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Detail_Role_Form_Lv2;