import '../mawasdiri-page/cuti-form.css'
import Admin_Sidebar from '../../component/Admin-Component/admin_sidebar';
import Detail_Role_Form_Lv1 from '../../component/Admin-Component/detail_role_form_lv1';
import { useParams } from 'react-router-dom';
import Detail_Role_Form_Lv2 from '../../component/Admin-Component/detail_role_form_lv2';
import Detail_Role_Form_Lv3 from '../../component/Admin-Component/detail_role_form_lv3';
import Detail_Role_Form_Lv4 from '../../component/Admin-Component/detail_role_form_lv4';

const Detail_Form_RoleLv1 = () => {
    const { level } = useParams();
    return(
        <>
            <div className='dashboard'>
                <Admin_Sidebar/>
                 {level === 'lv1' && <Detail_Role_Form_Lv1/>}
                 {level === 'lv2' && <Detail_Role_Form_Lv2/>}
                 {level === 'lv3' && <Detail_Role_Form_Lv3/>}
                 {level === 'lv4' && <Detail_Role_Form_Lv4/>}
            </div>
        </>
    )
}
export default Detail_Form_RoleLv1