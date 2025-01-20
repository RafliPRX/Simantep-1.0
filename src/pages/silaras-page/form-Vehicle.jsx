import Sidebar_laras from "../../component/Silaras-component/sidebar-laras"
import Vehicle from "../../component/Silaras-component/vehicle"
import './form-vehicle.css'
const Form_vehicle = () =>{
    return(
        <>
            <div className="dashboard">
                <Sidebar_laras/>
                <Vehicle/>
            </div>
        </>
    )
}
export default Form_vehicle