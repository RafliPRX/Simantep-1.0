import Sidebar_laras from "../../component/Silaras-component/sidebar-laras"
import Vehicle_Detail from "../../component/Silaras-component/vehicle_form_update"

import './form-vehicle.css'
const Form_vehicle_Detail = () =>{
    return(
        <>
            <div className="dashboard">
                <Sidebar_laras/>
                <Vehicle_Detail/>
            </div>
        </>
    )
}
export default Form_vehicle_Detail