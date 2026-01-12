import Admin_Sidebar from '../../component/Admin-Component/admin_sidebar';
import Identity_Form from '../../component/Admin-Component/identity_form';
import '../mawasdiri-page/cuti-form.css';

const Identity_Create_Form = () =>  {
    return(
        <>
            <div className='dashboard'>
                <Admin_Sidebar/>
                <Identity_Form/>
            </div>
        </>
    )
}
export default Identity_Create_Form