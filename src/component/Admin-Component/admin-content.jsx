import { useEffect, useState } from 'react';
import Profile from '../profile';
import '../css/content.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react'
// import axios from 'axios';
// import { Link } from 'react-router-dom';
const Admin_Content = () => {
    const storedUsername = localStorage.getItem('nama');
    const storeNrk = localStorage.getItem('nrk');
    const storedSisaCuti = localStorage.getItem('sisa_cuti');
    const storedFProfile = localStorage.getItem('f_profile');
    const pj = localStorage.getItem('pj');
    // const [isLoading, setIsLoading] = useState(false);  
    console.log(storedUsername);
    console.log(storedSisaCuti );
    console.log(storedFProfile);
    console.log(storeNrk);
    console.log(pj);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    const [activeTab, setActiveTab] = useState('identitas');
    const [identitasLevel, setIdentitasLevel] = useState('level 1');
    const [roleLevel, setRoleLevel] = useState('level 1');
    const [akunLevel, setAkunLevel] = useState('level 1');
    const [identitas, setIdentitas] = useState([]);
    const [pagination_identity, setPagination_identity] = useState({
        currentPage: 1,
    });
    const role_spesial_name = (RoleSP) => {
        if (RoleSP === "0") {
            return "-";}
        else { return RoleSP; }
    }
    const getIdentity = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getIdentity.php?page=${pagination_identity.currentPage}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_identity = {
                total: res1.data.total_records,
                currentPage: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setIdentitas(response);
            setPagination_identity(pagination_identity);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [identitas_level2, setIdentitas_level2] = useState([]);
    const [pagination_identity_level2, setPagination_identity_level2] = useState({
        currentPage: 1,
    });    
    const getIdentity_level2 = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getIdentity-level2.php?page=${pagination_identity_level2.currentPage}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_identity = {
                total: res1.data.total_records,
                currentPage: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setIdentitas_level2(response);
            setPagination_identity_level2(pagination_identity);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [identitas_level3, setIdentitas_level3] = useState([]);
    const [pagination_identity_level3, setPagination_identity_level3] = useState({
        currentPage: 1,
    });
    const getIdentity_level3 = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getIdentity-level3.php?page=${pagination_identity_level3.currentPage}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_identity = {
                total: res1.data.total_records,
                currentPage: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setIdentitas_level3(response);
            setPagination_identity_level3(pagination_identity);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [identitas_level4, setIdentitas_level4] = useState([]);
    const [pagination_identity_level4, setPagination_identity_level4] = useState({
        currentPage: 1,
    });
    const getIdentity_level4 = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getIdentity-level4.php?page=${pagination_identity_level4.currentPage}`;
        let url = baseUrl;
        axios.get(url).then((res1) => {
            console.log(res1.data.Data);
            const response = res1.data.Data;
            const pagination_identity = {
                total: res1.data.total_records,
                currentPage: res1.data.current_page,
                nextPage: res1.data.nextPage,
            }
            setIdentitas_level4(response);
            setPagination_identity_level4(pagination_identity);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [role, setRole] = useState([]);
    const [pagination_role, setPagination_Role] = useState({
        currentPage: 1,
    });
    const getRole = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getRole.php?page=${pagination_role.currentPage}`;
        let url = baseUrl;
        axios.get(url).then((res2) => {
            console.log(res2.data.Data);
            const response = res2.data.Data;
            const pagination_role = {
                total: res2.data.total_records,
                currentPage: res2.data.current_page,
                nextPage: res2.data.nextPage,
            }
            setRole(response);
            setPagination_Role(pagination_role);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [role_level2, setRole_level2] = useState([]);
    const [pagination_role_level2, setPagination_Role_level2] = useState({
        currentPage: 1,
    });
    const getRole_Level2 = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getRole_level2.php?page=${pagination_role_level2.currentPage}`;
        let url = baseUrl;
        axios.get(url).then((res2) => {
            console.log(res2.data.Data);
            const response = res2.data.Data;
            const pagination_role = {
                total: res2.data.total_records,
                currentPage: res2.data.current_page,
                nextPage: res2.data.nextPage,
            }
            setRole_level2(response);
            setPagination_Role_level2(pagination_role);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [role_level3, setRole_level3] = useState([]);
    const [pagination_role_level3, setPagination_Role_level3] = useState({
        currentPage: 1,
    });
    const getRole_Level3 = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getRole_level3.php?page=${pagination_role_level3.currentPage}`;
        let url = baseUrl;
        axios.get(url).then((res2) => {
            console.log(res2.data.Data);
            const response = res2.data.Data;
            const pagination_role = {
                total: res2.data.total_records,
                currentPage: res2.data.current_page,
                nextPage: res2.data.nextPage,
            }
            setRole_level3(response);
            setPagination_Role_level3(pagination_role);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [role_level4, setRole_level4] = useState([]);
    const [pagination_role_level4, setPagination_Role_level4] = useState({
        currentPage: 1,
    });
    const getRole_Level4 = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getRole_level4.php?page=${pagination_role_level4.currentPage}`;
        let url = baseUrl;
        axios.get(url).then((res2) => {
            console.log(res2.data.Data);
            const response = res2.data.Data;
            const pagination_role = {
                total: res2.data.total_records,
                currentPage: res2.data.current_page,
                nextPage: res2.data.nextPage,
            }
            setRole_level4(response);
            setPagination_Role_level4(pagination_role);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [role_spesial, setRole_Spesial] = useState([]);
    const [pagination_role_spesial, setPagination_Role_Spesial] = useState({
        currentPage: 1,
    });
    const getRole_Spesial = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/get_Role_spesial.php?page=${pagination_role_spesial.currentPage}`;
        let url = baseUrl;
        axios.get(url).then((res2) => {
            console.log(res2.data.Data);
            const response = res2.data.Data;
            const pagination_role = {
                total: res2.data.total_records,
                currentPage: res2.data.current_page,
                nextPage: res2.data.nextPage,
            }
            setRole_Spesial(response);
            setPagination_Role_Spesial(pagination_role);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [akun_level1, setAkun_level1] = useState([]);
    const [pagination_akun_level1, setPagination_Akun_level1] = useState({
        currentPage: 1,
    });
    const getAkun_level1 = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getAccount-lv1.php?page=${pagination_akun_level1.currentPage}`;
        let url = baseUrl;
        axios.get(url).then((res2) => {
            console.log(res2.data.Data);
            const response = res2.data.Data;
            const pagination_akun = {
                total: res2.data.total_records,
                currentPage: res2.data.current_page,
                nextPage: res2.data.nextPage,
            }
            setAkun_level1(response);
            setPagination_Akun_level1(pagination_akun);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [akun_level2, setAkun_level2] = useState([]);
    const [pagination_akun_level2, setPagination_Akun_level2] = useState({
        currentPage: 1,
    });
    const getAkun_level2 = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getAccount-lv2.php?page=${pagination_akun_level2.currentPage}`;
        let url = baseUrl;
        axios.get(url).then((res2) => {
            console.log(res2.data.Data);
            const response = res2.data.Data;
            const pagination_akun = {
                total: res2.data.total_records,
                currentPage: res2.data.current_page,
                nextPage: res2.data.nextPage,
            }
            setAkun_level2(response);
            setPagination_Akun_level2(pagination_akun);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [akun_level3, setAkun_level3] = useState([]);
    const [pagination_akun_level3, setPagination_Akun_level3] = useState({
        currentPage: 1,
    });
    const getAkun_level3 = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getAccount-lv3.php?page=${pagination_akun_level3.currentPage}`;
        let url = baseUrl;
        axios.get(url).then((res2) => {
            console.log(res2.data.Data);
            const response = res2.data.Data;
            const pagination_akun = {
                total: res2.data.total_records,
                currentPage: res2.data.current_page,
                nextPage: res2.data.nextPage,
            }
            setAkun_level3(response);
            setPagination_Akun_level3(pagination_akun);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const [akun_level4, setAkun_level4] = useState([]);
    const [pagination_akun_level4, setPagination_Akun_level4] = useState({
        currentPage: 1,
    });
    const getAkun_level4 = async() => {
        const baseUrl = `https://simantepbareta.cloud/API/Admin_API/getAccount-lv4.php?page=${pagination_akun_level4.currentPage}`;
        let url = baseUrl;
        axios.get(url).then((res2) => {
            console.log(res2.data.Data);
            const response = res2.data.Data;
            const pagination_akun = {
                total: res2.data.total_records,
                currentPage: res2.data.current_page,
                nextPage: res2.data.nextPage,
            }
            setAkun_level4(response);
            setPagination_Akun_level4(pagination_akun);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        getIdentity();
        getRole();
        getRole_Level2();
        getRole_Level3();
        getRole_Level4();
        getRole_Spesial();
        getIdentity_level2();
        getIdentity_level3();
        getIdentity_level4();
        getAkun_level1();
        getAkun_level2();
        getAkun_level3();
        getAkun_level4();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ pagination_identity?.currentPage, pagination_role?.currentPage,
        pagination_identity_level2?.currentPage, pagination_role_level2?.currentPage, 
        pagination_role_level3?.currentPage, pagination_role_level4?.currentPage, 
        pagination_identity_level3?.currentPage, pagination_identity_level4?.currentPage,
        pagination_akun_level1?.currentPage, pagination_akun_level2?.currentPage,
        pagination_akun_level3?.currentPage, pagination_akun_level4?.currentPage,
        pagination_role_spesial?.currentPage
    ]);

    const handleNext_Identity = () => {
        setPagination_identity({
            ...pagination_identity,
            currentPage: pagination_identity.currentPage + 1,
        })
    }
    const handleNext_Identity_level2 = () => {
        setPagination_identity_level2({
            ...pagination_identity_level2,
            currentPage: pagination_identity_level2.currentPage + 1,
        })
    }
    const handleNext_Identity_level3 = () => {
        setPagination_identity_level3({
            ...pagination_identity_level3,
            currentPage: pagination_identity_level3.currentPage + 1,
        })
    }
    const handleNext_Identity_level4 = () => {
        setPagination_identity_level4({
            ...pagination_identity_level4,
            currentPage: pagination_identity_level4.currentPage + 1,
        })
    }
    const handleNext_Role = () => {
        setPagination_Role({
            ...pagination_role,
            currentPage: pagination_role.currentPage + 1,
        })
    }
    const handleNext_Role_level2 = () => {
        setPagination_Role_level2({
            ...pagination_role_level2,
            currentPage: pagination_role_level2.currentPage + 1,
        })
    }
    const handleNext_Role_level3 = () => {
        setPagination_Role_level3({
            ...pagination_role_level3,
            currentPage: pagination_role_level3.currentPage + 1,
        })
    }
    const handleNext_Role_level4 = () => {
        setPagination_Role_level4({
            ...pagination_role_level4,
            currentPage: pagination_role_level4.currentPage + 1,
        })
    }    
    const handleNext_Role_Spesial = () => {
        setPagination_Role_Spesial({
            ...pagination_role_spesial,
            currentPage: pagination_role_spesial.currentPage + 1,
        })
    }
    const handleNext_Akun_Level1 = () => {
        setPagination_Akun_level1({
            ...pagination_akun_level1,
            currentPage: pagination_akun_level1.currentPage + 1,
        })
    }
    const handleNext_Akun_Level2 = () => {
        setPagination_Akun_level2({
            ...pagination_akun_level2,
            currentPage: pagination_akun_level2.currentPage + 1,
        })
    }
    const handleNext_Akun_Level3 = () => {
        setPagination_Akun_level3({
            ...pagination_akun_level3,
            currentPage: pagination_akun_level3.currentPage + 1,
        })
    }
    const handleNext_Akun_Level4 = () => {
        setPagination_Akun_level4({
            ...pagination_akun_level4,
            currentPage: pagination_akun_level4.currentPage + 1,
        })
    }
    const handlePrev_Identity = () => {
        setPagination_identity({
            ...pagination_identity,
            currentPage: pagination_identity.currentPage - 1,
        })
    }
    const handlePrev_Identity_level3 = () => {
        setPagination_identity_level3({
            ...pagination_identity_level3,
            currentPage: pagination_identity_level3.currentPage - 1,
        })
    }
    const handlePrev_Identity_level2 = () => {
        setPagination_identity_level2({
            ...pagination_identity_level2,
            currentPage: pagination_identity_level2.currentPage - 1,
        })
    }
    const handlePrev_Identity_level4 = () => {
        setPagination_identity_level4({
            ...pagination_identity_level4,
            currentPage: pagination_identity_level4.currentPage - 1,
        })
    }
    const handlePrev_Role = () => {
        setPagination_Role({
            ...pagination_role,
            currentPage: pagination_role.currentPage - 1,
        })
    }
    const handlePrev_Role_level2 = () => {
        setPagination_Role_level2({
            ...pagination_role_level2,
            currentPage: pagination_role_level2.currentPage - 1,
        })
    }
    const handlePrev_Role_level3 = () => {
        setPagination_Role_level3({
            ...pagination_role_level3,
            currentPage: pagination_role_level3.currentPage - 1,
        })
    }
    const handlePrev_Role_level4 = () => {
        setPagination_Role_level4({
            ...pagination_role_level4,
            currentPage: pagination_role_level4.currentPage - 1,
        })
    }
    const handlePrev_Role_Spesial = () => {
        setPagination_Role_Spesial({
            ...pagination_role_spesial,
            currentPage: pagination_role_spesial.currentPage - 1,
        })
    }
    const handlePrev_Akun_level1 = () => {
        setPagination_Akun_level1({
            ...pagination_akun_level1,
            currentPage: pagination_akun_level1.currentPage - 1,
        })
    }
    const handlePrev_Akun_level2 = () => {
        setPagination_Akun_level2({
            ...pagination_akun_level2,
            currentPage: pagination_akun_level2.currentPage - 1,
        })
    }
    const handlePrev_Akun_Level3 = () => {
        setPagination_Akun_level3({
            ...pagination_akun_level3,
            currentPage: pagination_akun_level3.currentPage + 1,
        })
    }
    const handlePrev_Akun_Level4 = () => {
        setPagination_Akun_level4({
            ...pagination_akun_level4,
            currentPage: pagination_akun_level4.currentPage + 1,
        })
    }
    const handleDeleteIdentity = async (id) => {
        setIsLoading(true);
        try {
            const response = await axios.delete(`https://simantepbareta.cloud/API/Admin_API/deleteIdentity.php?id=${id}`, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(response.data);
            setTimeout(() => {
                setIsLoading(false);
                window.location.reload();
            }, 500);
        } catch (error) {
            console.log(error.response);
        }
    }
    const handleDeleteAccount = async (id) => {
        setIsLoading(true);
        try {
            const response = await axios.delete(`https://simantepbareta.cloud/API/Admin_API/deletedAccount.php?id=${id}`, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(response.data);
            setTimeout(() => {
                setIsLoading(false);
                window.location.reload();
            }, 500);
        } catch (error) {
            console.log(error.response);
        }
    }
    const confirmDeleteIdentity = (id) => {
        if (window.confirm("Apakah Anda yakin Identitas ini di Hapuskan ?")) {
            handleDeleteIdentity(id);
        }
    }
    const confirmDeleteAccount = (id) => {
        if (window.confirm("Apakah Anda yakin Akun ini di Hapuskan ?")) {
            handleDeleteAccount(id);
        }
    }    
    // Navigasi Update Role
    const handleOpenRoleLv1 = (id) => {
        navigate(`/Home-Admin/Update-Role/lv1/${id}`);
    }
    const handleOpenRoleLv2 = (id) => {
        navigate(`/Home-Admin/Update-Role/lv2/${id}`);
    }
    const handleOpenRoleLv3 = (id) => {
        navigate(`/Home-Admin/Update-Role/lv3/${id}`);
    }
    const handleOpenRoleLv4 = (id) => {
        navigate(`/Home-Admin/Update-Role/lv4/${id}`);
    }
    // Navigasi Update Identity
    const handleOpenIdentityLv1 = (id) => {
        navigate(`/Home-Admin/Update-Identity/lv1/${id}`);
    }
    const handleOpenIdentityLv2 = (id) => {
        navigate(`/Home-Admin/Update-Identity/lv2/${id}`);
    }
    const handleOpenIdentityLv3 = (id) => {
        navigate(`/Home-Admin/Update-Identity/lv3/${id}`);
    }
    const handleOpenIdentityLv4 = (id) => {
        navigate(`/Home-Admin/Update-Identity/lv4/${id}`);
    }
    const handleOpenAccountlv1 = (id) => {
        navigate(`/Home-Admin/Update-Account/lv1/${id}`);
    }
    const handleOpenAccountlv2 = (id) => {
        navigate(`/Home-Admin/Update-Account/lv2/${id}`);
    }
    const handleOpenAccountlv3 = (id) => {
        navigate(`/Home-Admin/Update-Account/lv3/${id}`);
    }
    const handleOpenAccountlv4 = (id) => {
        navigate(`/Home-Admin/Update-Account/lv4/${id}`);
    }
    return(
        <>
            <div className='main-dashboard'>
            {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '100%', height: '100vh'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
            </div>}     
                <p>Admin/Dashboard</p>
                <h1>Main Dashboard</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile}/>
                <div className='content-col'>
                    <div className='box-m'>
                        <div className='tab-container'>
                            <ul className='tab-list'>
                                <li className={`tab-item ${activeTab === 'identitas' ? 'active' : ''}`}
                                onClick={() => setActiveTab('identitas')}>
                                    Identitas
                                </li>
                                <li className={`tab-item ${activeTab === 'Role' ? 'active' : ''}`}
                                onClick={() => setActiveTab('Role')}>
                                    Role
                                </li>
                                <li className={`tab-item ${activeTab === 'Akun' ? 'active' : ''}`}
                                onClick={() => setActiveTab('Akun')}>
                                    Akun
                                </li>
                            </ul>
                        </div>
                        {activeTab === 'identitas' && (
                        <div className='content'>
                            <div className='tab-identity'>
                                <ul className='identity-list'>
                                    <li className={`identity-item ${identitasLevel === 'level 1' ? 'active' : ''}`}
                                    onClick={() => setIdentitasLevel('level 1')}>Level 1</li>
                                    <li className={`identity-item ${identitasLevel === 'level 2' ? 'active' : ''}`}
                                    onClick={() => setIdentitasLevel('level 2')}>Level 2</li>
                                    <li className={`identity-item ${identitasLevel === 'level 3' ? 'active' : ''}`}
                                    onClick={() => setIdentitasLevel('level 3')}>Level 3</li>
                                    <li className={`identity-item ${identitasLevel === 'level 4' ? 'active' : ''}`}
                                    onClick={() => setIdentitasLevel('level 4')}>Level 4</li>                                    
                                </ul>
                            </div>
                            {identitasLevel === 'level 1' && (                             
                            <>    
                                <h1>Daftar Identitas Pegawai Level 1</h1>
                                <div>
                                    <button onClick={handlePrev_Identity}>Previous</button>
                                    <button onClick={handleNext_Identity}>Next</button>
                                </div>
                                <table>
                                    <tr>
                                        <th>Nomor</th>
                                        <th>Nama Lengkap</th>
                                        <th>Role</th>
                                        <th>Kode Role</th>
                                        <th>Role Atasan</th>
                                        <th>Role Spesial</th>
                                        <th>Opsi lain</th>
                                    </tr>
                                    {identitas.map((item, index) => (
                                        <tr key={item.id_number}>
                                            <td>{index + 1}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.nama_role}</td>
                                            <td>{item.kode_role}</td>
                                            <td>{item.nama_role_c} ({item.kode_role_c})</td>
                                            <td>{role_spesial_name(item.kode_role_sp)}</td>
                                            <td><button className='B-deleted' onClick={() => confirmDeleteIdentity(item.id_number)}>Deleted</button> | <button onClick={() => handleOpenIdentityLv1(item.id_number)} className='B-update'>Update</button></td>
                                        </tr>
                                    ))}
                                </table>
                            </>
                            )}
                            {identitasLevel === 'level 2' && (
                            <>    
                                <h1>Daftar Identitas Pegawai Level 2</h1>
                                <div>
                                    <button onClick={handlePrev_Identity_level2}>Previous</button>
                                    <button onClick={handleNext_Identity_level2}>Next</button>
                                </div>
                                <table>
                                    <tr>
                                        <th>Nomor</th>
                                        <th>Nama Lengkap</th>
                                        <th>Role</th>
                                        <th>Kode Role</th>                                        
                                        <th>Opsi lain</th>
                                    </tr>
                                    {identitas_level2.map((item, index) => (
                                        <tr key={item.id_number}>
                                            <td>{index + 1}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.nama_role_c}</td>
                                            <td>{item.kode_role_c}</td>                                            
                                            <td><button className='B-deleted' onClick={() => confirmDeleteIdentity(item.id_number)}>Deleted</button> | <button onClick={() => handleOpenIdentityLv2(item.id_number)} className='B-update'>Update</button></td>
                                        </tr>
                                    ))}
                                </table>
                            </>
                            )}
                            {identitasLevel === 'level 3' && (
                            <>    
                                <h1>Daftar Identitas Pegawai Level 3</h1>
                                <div>
                                    <button onClick={handlePrev_Identity_level3}>Previous</button>
                                    <button onClick={handleNext_Identity_level3}>Next</button>
                                </div>
                                <table>
                                    <tr>
                                        <th>Nomor</th>
                                        <th>Nama Lengkap</th>
                                        <th>Role</th>
                                        <th>Kode Role</th>                                        
                                        <th>Opsi lain</th>
                                    </tr>
                                    {identitas_level3.map((item, index) => (
                                        <tr key={item.id_number}>
                                            <td>{index + 1}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.nama_role_b}</td>
                                            <td>{item.kode_role_b}</td>                                            
                                            <td><button className='B-deleted' onClick={() => confirmDeleteIdentity(item.id_number)}>Deleted</button> | <button onClick={() => handleOpenIdentityLv3(item.id_number)} className='B-update'>Update</button></td>
                                        </tr>
                                    ))}
                                </table>
                            </>
                            )}
                            {identitasLevel === 'level 4' && (
                            <>    
                                <h1>Daftar Identitas Pegawai Level 4</h1>
                                <div>
                                    <button onClick={handlePrev_Identity_level4}>Previous</button>
                                    <button onClick={handleNext_Identity_level4}>Next</button>
                                </div>
                                <table>
                                    <tr>
                                        <th>Nomor</th>
                                        <th>Nama Lengkap</th>
                                        <th>Role</th>
                                        <th>Kode Role</th>
                                        <th>Opsi lain</th>
                                    </tr>
                                    {identitas_level4.map((item, index) => (
                                        <tr key={item.id_number}>
                                            <td>{index + 1}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.nama_role_a}</td>
                                            <td>{item.kode_role_a}</td>                                            
                                            <td><button className='B-deleted' onClick={() => confirmDeleteIdentity(item.id_number)}>Deleted</button> | <button onClick={() => handleOpenIdentityLv4(item.id_number)} className='B-update'>Update</button></td>
                                        </tr>
                                    ))}
                                </table>
                            </>
                            )}                            
                        </div>
                        )}
                        {activeTab === 'Role' && (
                        <div className='content'>
                            <div className='tab-identity'>
                                <ul className='identity-list'>
                                    <li className={`identity-item ${roleLevel === 'level 1' ? 'active' : ''}`}
                                    onClick={() => setRoleLevel('level 1')}>Level 1</li>
                                    <li className={`identity-item ${roleLevel === 'level 2' ? 'active' : ''}`}
                                    onClick={() => setRoleLevel('level 2')}>Level 2</li>
                                    <li className={`identity-item ${roleLevel === 'level 3' ? 'active' : ''}`}
                                    onClick={() => setRoleLevel('level 3')}>Level 3</li>
                                    <li className={`identity-item ${roleLevel === 'level 4' ? 'active' : ''}`}
                                    onClick={() => setRoleLevel('level 4')}>Level 4</li>
                                    <li className={`identity-item ${roleLevel === 'spesial' ? 'active' : ''}`}
                                    onClick={() => setRoleLevel('spesial')}>Spesial</li>
                                </ul>
                            </div>
                            {roleLevel === 'level 1' && (
                                <>
                                    <h1>Daftar Role Simanteb Level 1</h1>
                                    <div>
                                        <button onClick={handlePrev_Role}>Previous</button>
                                        <button onClick={handleNext_Role}>Next</button>
                                    </div>
                                    <table>
                                        <tr>
                                            <th>Nomor</th>
                                            <th>Nama Role</th>
                                            <th>Kode Role</th>
                                            <th>Opsi Lain</th>
                                        </tr>
                                        {role.map((item, index) => (
                                            <tr key={item.id_number}>
                                                <td>{index + 1}</td>
                                                <td>{item.nama_role}</td>
                                                <td>{item.kode_role}</td>
                                                <td><button onClick={() => handleOpenRoleLv1(item.kode_role)} className='B-update'>Update</button></td>
                                            </tr>
                                        ))}
                                    </table>  
                                </>
                            )}
                            {roleLevel === 'level 2' && (
                                <>
                                    <h1>Daftar Role Simanteb Level 2</h1>
                                    <div>
                                        <button onClick={handlePrev_Role_level2}>Previous</button>
                                        <button onClick={handleNext_Role_level2}>Next</button>
                                    </div>
                                    <table>
                                        <tr>
                                            <th>Nomor</th>
                                            <th>Nama Role</th>
                                            <th>Kode Role</th>
                                            <th>Opsi Lain</th>
                                        </tr>
                                        {role_level2.map((item, index) => (
                                            <tr key={item.id_number}>
                                                <td>{index + 1}</td>
                                                <td>{item.nama_role_c}</td>
                                                <td>{item.kode_role_c}</td>
                                                <td><button onClick={() => handleOpenRoleLv2(item.kode_role_c)} className='B-update'>Update</button></td>
                                            </tr>
                                        ))}
                                    </table>  
                                </>
                            )}
                            {roleLevel === 'level 3' && (
                                <>
                                    <h1>Daftar Role Simanteb Level 3</h1>
                                    <div>
                                        <button onClick={handlePrev_Role_level3}>Previous</button>
                                        <button onClick={handleNext_Role_level3}>Next</button>
                                    </div>
                                    <table>
                                        <tr>
                                            <th>Nomor</th>
                                            <th>Nama Role</th>
                                            <th>Kode Role</th>
                                            <th>Opsi Lain</th>
                                        </tr>
                                        {role_level3.map((item, index) => (
                                            <tr key={item.id_number}>
                                                <td>{index + 1}</td>
                                                <td>{item.nama_role_b}</td>
                                                <td>{item.kode_role_b}</td>
                                                <td><button onClick={() => handleOpenRoleLv3(item.kode_role_b)} className='B-update'>Update</button></td>
                                            </tr>
                                        ))}
                                    </table>  
                                </>
                            )}
                            {roleLevel === 'level 4' && (
                                <>
                                    <h1>Daftar Role Simanteb Level 4</h1>
                                    <div>
                                        <button onClick={handlePrev_Role_level4}>Previous</button>
                                        <button onClick={handleNext_Role_level4}>Next</button>
                                    </div>
                                    <table>
                                        <tr>
                                            <th>Nomor</th>
                                            <th>Nama Role</th>
                                            <th>Kode Role</th>
                                            <th>Opsi Lain</th>
                                        </tr>
                                        {role_level4.map((item, index) => (
                                            <tr key={item.id_number}>
                                                <td>{index + 1}</td>
                                                <td>{item.nama_role_a}</td>
                                                <td>{item.kode_role_a}</td>
                                                <td><button onClick={() => handleOpenRoleLv4(item.kode_role_a)} className='B-update'>Update</button></td>
                                            </tr>
                                        ))}
                                    </table>  
                                </>
                            )}
                            {roleLevel === 'spesial' && (
                                <>
                                    <h1>Daftar Role Simanteb Spesial</h1>
                                    <div>
                                        <button onClick={handlePrev_Role_Spesial}>Previous</button>
                                        <button onClick={handleNext_Role_Spesial}>Next</button>
                                    </div>
                                    <table>
                                        <tr>
                                            <th>Nomor</th>
                                            <th>Nama Role</th>
                                            <th>Kode Role</th>
                                            <th>Opsi Lain</th>
                                        </tr>
                                        {role_spesial.map((item, index) => (
                                            <tr key={item.id_number}>
                                                <td>{index + 1}</td>
                                                <td>{item.nama_role_sp}</td>
                                                <td>{item.kode_role_sp}</td>
                                                <td><button onClick={() => handleOpenRoleLv4(item.kode_role_sp)} className='B-update'>Update</button></td>
                                            </tr>
                                        ))}
                                    </table>  
                                </>
                            )}
                        </div>                            
                        )}
                        {activeTab === 'Akun' && (
                        <div className='content'>
                            <div className='tab-identity'>
                                <ul className='identity-list'>
                                    <li className={`identity-item ${akunLevel === 'level 1' ? 'active' : ''}`}
                                    onClick={() => setAkunLevel('level 1')}>Level 1</li>
                                    <li className={`identity-item ${akunLevel === 'level 2' ? 'active' : ''}`}
                                    onClick={() => setAkunLevel('level 2')}>Level 2</li>
                                    <li className={`identity-item ${akunLevel === 'level 3' ? 'active' : ''}`}
                                    onClick={() => setAkunLevel('level 3')}>Level 3</li>
                                    <li className={`identity-item ${akunLevel === 'level 4' ? 'active' : ''}`}
                                    onClick={() => setAkunLevel('level 4')}>Level 4</li>
                                </ul>
                            </div>
                            {akunLevel === 'level 1' && (
                            <>
                                <h1>Daftar Akun Pegawai Level 1</h1>
                                <div>
                                    <button onClick={handlePrev_Akun_level1}>Previous</button>
                                    <button onClick={handleNext_Akun_Level1}>Next</button>
                                </div>
                                <table>
                                    <tr>
                                        <th>Nomor</th>
                                        <th>Nama Lengkap</th>
                                        <th>Username</th>
                                        <th>Password</th>
                                        <th>NRK/NIP</th>
                                        <th>Jabatan</th>
                                        <th>Akses Level</th>
                                        <th>Opsi lain</th>
                                    </tr>
                                    {akun_level1.map((item, index) => (
                                        <tr key={item.id_number}>
                                            <td>{index + 1}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.username}</td>
                                            <td>{item.re_pass}</td>
                                            <td>{item.nrk_nip}</td>
                                            <td>{item.jabatan}</td>
                                            <td>Akses Level {item.akses_level}</td>
                                            <td><button className='B-deleted' onClick={() => confirmDeleteAccount(item.id_akun)}>Deleted</button> | <button onClick={() => handleOpenAccountlv1(item.id_akun)} className='B-update'>Update</button></td>
                                        </tr>
                                    ))}
                                </table>
                            </>
                            )}
                            {akunLevel === 'level 2' && (
                            <>    
                                <h1>Daftar Akun Pegawai Level 2</h1>
                                <div>
                                    <button onClick={handlePrev_Akun_level2}>Previous</button>
                                    <button onClick={handleNext_Akun_Level2}>Next</button>
                                </div>
                                <table>
                                    <tr>
                                        <th>Nomor</th>
                                        <th>Nama Lengkap</th>
                                        <th>Username</th>
                                        <th>Password</th>
                                        <th>NRK/NIP</th>
                                        <th>Jabatan</th>
                                        <th>Akses Level</th>
                                        <th>Opsi lain</th>
                                    </tr>
                                    {akun_level2.map((item, index) => (
                                        <tr key={item.id_number}>
                                            <td>{index + 1}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.username}</td>
                                            <td>{item.re_pass}</td>
                                            <td>{item.nrk_nip}</td>
                                            <td>{item.jabatan}</td>
                                            <td>Akses Level {item.akses_level}</td>
                                            <td><button className='B-deleted' onClick={() => confirmDeleteAccount(item.id_akun)}>Deleted</button> | <button onClick={() => handleOpenAccountlv2(item.id_akun)} className='B-update'>Update</button></td>
                                        </tr>
                                    ))}
                                </table>
                            </>
                            )}
                            {akunLevel === 'level 3' && (
                            <>    
                                <h1>Daftar Akun Pegawai Level 3</h1>
                                <div>
                                    <button onClick={handlePrev_Akun_Level3}>Previous</button>
                                    <button onClick={handleNext_Akun_Level3}>Next</button>
                                </div>
                                <table>
                                    <tr>
                                        <th>Nomor</th>
                                        <th>Nama Lengkap</th>
                                        <th>Username</th>
                                        <th>Password</th>
                                        <th>NRK/NIP</th>
                                        <th>Jabatan</th>
                                        <th>Akses Level</th>
                                        <th>Opsi lain</th>
                                    </tr>
                                    {akun_level3.map((item, index) => (
                                        <tr key={item.id_number}>
                                            <td>{index + 1}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.username}</td>
                                            <td>{item.re_pass}</td>
                                            <td>{item.nrk_nip}</td>
                                            <td>{item.jabatan}</td>
                                            <td>Akses Level {item.akses_level}</td>
                                            <td><button className='B-deleted' onClick={() => confirmDeleteAccount(item.id_akun)}>Deleted</button> | <button onClick={() => handleOpenAccountlv3(item.id_akun)} className='B-update'>Update</button></td>
                                        </tr>
                                    ))}
                                </table>
                            </>
                            )}
                            {akunLevel === 'level 4' && (
                            <>    
                                <h1>Daftar Akun Pegawai Level 4</h1>
                                <div>
                                    <button onClick={handlePrev_Akun_Level4}>Previous</button>
                                    <button onClick={handleNext_Akun_Level4}>Next</button>
                                </div>
                                <table>
                                    <tr>
                                        <th>Nomor</th>
                                        <th>Nama Lengkap</th>
                                        <th>Username</th>
                                        <th>Password</th>
                                        <th>NRK/NIP</th>
                                        <th>Jabatan</th>
                                        <th>Akses Level</th>
                                        <th>Opsi lain</th>
                                    </tr>
                                    {akun_level4.map((item, index) => (
                                        <tr key={item.id_number}>
                                            <td>{index + 1}</td>
                                            <td>{item.nama}</td>
                                            <td>{item.username}</td>
                                            <td>{item.re_pass}</td>
                                            <td>{item.nrk_nip}</td>
                                            <td>{item.jabatan}</td>
                                            <td>Akses Level {item.akses_level}</td>
                                            <td><button className='B-deleted' onClick={() => confirmDeleteAccount(item.id_akun)}>Deleted</button> | <button onClick={() => handleOpenAccountlv4(item.id_akun)} className='B-update'>Update</button></td>
                                        </tr>
                                    ))}
                                </table>
                            </>
                            )}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Admin_Content       