import '../mawasdiri-page/cuti-form.css'
import Admin_Sidebar from '../../component/Admin-Component/admin_sidebar';
import { useParams } from 'react-router-dom';
import Detail_Identity_Form_lv1 from '../../component/Admin-Component/detail_identity_form_lv1';
import Detail_Identity_Form_lv2 from '../../component/Admin-Component/detail_identity_form_lv2';
import Detail_Identity_Form_lv3 from '../../component/Admin-Component/detail_identity_form_lv3';
import Detail_Identity_Form_lv4 from '../../component/Admin-Component/detail_identity_form_lv4';

const Detail_Form_IdentityLv1 = () => {
    const { level } = useParams();
    return(
        <>
            <div className='dashboard'>
                <Admin_Sidebar/>
                 {level === 'lv1' && <Detail_Identity_Form_lv1/>}
                 {level === 'lv2' && <Detail_Identity_Form_lv2/>}
                 {level === 'lv3' && <Detail_Identity_Form_lv3/>}
                 {level === 'lv4' && <Detail_Identity_Form_lv4/>}
            </div>
        </>
    )
}
export default Detail_Form_IdentityLv1