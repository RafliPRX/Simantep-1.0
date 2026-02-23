import Sidebar from '../../component/Mawasdiri-component/sidebar'
import Cuti_form from '../../component/Mawasdiri-component/cuti'
import '../../component/css/dashboard.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Cuti = () =>  {
    const storeidNumber = localStorage.getItem('id_number');
    const [identity, setIdentity] = useState([]);
    const [kode_role_c, setKode_role_c] = useState(identity.kode_role_c);
    const getIdentity = async () => {
      try {
        const response = await axios.get(`https://simantepbareta.cloud/API/Admin_API/detail_identity.php?id=${storeidNumber}` , {
          headers: {"Content-Type": "application/json"},
        });
        console.log(response.data);
        setIdentity(response.data);
        setKode_role_c(response.data.kode_role_c);
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      getIdentity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return(
        <> 
            <div className="dashboard">
                <Sidebar/>
                <Cuti_form kode_role_c={kode_role_c}/>
            </div>
        </>
    )
}
export default Cuti