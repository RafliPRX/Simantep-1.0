import Admin_Content from '../../component/Admin-Component/admin-content';
import Admin_Sidebar from '../../component/Admin-Component/admin_sidebar';
import '../../component/css/dashboard.css';

const Admin_Dashboard = () => {
    return(
        <>
            <div className='dashboard'>
                <Admin_Sidebar/>
                <Admin_Content/>
            </div>
        </>
    )
}
export default Admin_Dashboard;