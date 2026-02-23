import { useState } from "react";
import Sidebar_laras from "../../component/Silaras-component/sidebar-laras"
import '../../component/css/dashboard.css';
import Vehicle_Update from "../../component/Silaras-component/vehicle_form_update";
import Vehicle_Detail from "../../component/Silaras-component/vehicle-form-detail";
const Form_vehicle_Detail = () =>{ 
    const [showDetail, setShowDetail] = useState(true);
    
    const toggleForm = () => {
        setShowDetail(!showDetail);
    };

return(
    <>
        <div className="dashboard">
            <Sidebar_laras/>
            <div className="content">
                <button className='switch' onClick={toggleForm}>
                    {showDetail ? 'Switch to Update Form' : 'Switch to Detail Form'}
                </button>
                {showDetail ?<Vehicle_Detail/> : <Vehicle_Update/>}
            </div>
        </div>
    </>
)
}
export default Form_vehicle_Detail