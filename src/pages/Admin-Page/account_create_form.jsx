import Account_Form from '../../component/Admin-Component/account_form';
import Admin_Sidebar from '../../component/Admin-Component/admin_sidebar';
import '../../component/css/dashboard.css';

const Account_Create_Form = () =>  {
    return(
        <>
            <div className='dashboard'>
                <Admin_Sidebar/>
                <Account_Form/>
            </div>
        </>
    )
}
export default Account_Create_Form