import Cuti_form from "../../component/Dashboard-component/cuti"
import Sidebar from "../../component/Dashboard-component/sidebar"
import './cuti-form.css'
const Cuti = () =>  {
    return(
        <> 
            <div className="dashboard">
                <Sidebar/>
                <Cuti_form/>
            </div>
        </>
    )
}
export default Cuti