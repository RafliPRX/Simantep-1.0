import Admin_Sidebar from "../../component/Admin-Component/admin_sidebar";
import Role_Form from "../../component/Admin-Component/Role_form";
import '../../component/css/dashboard.css';
const RoleCreateForm = () => {
    return(
        <>
            <div className="dashboard">
                <Admin_Sidebar/>
                <Role_Form/>
            </div>
        </>
    )
}
export default RoleCreateForm;