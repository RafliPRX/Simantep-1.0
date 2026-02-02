import '../mawasdiri-page/cuti-form.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar_Corner from '../../component/e-corner-component/sidebar_corner';
import Update_Klien_form from '../../component/e-corner-component/update_klien';
const Klien_form_Update = () =>  {
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
                <Sidebar_Corner/>
                <Update_Klien_form kode_role_c={kode_role_c}/>
            </div>
        </>
    )
}
export default Klien_form_Update