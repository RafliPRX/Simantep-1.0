import { useState } from 'react';
import Request_Form_Update from '../../component/Silaras-component/request-form-update'
import Sidebar_laras from '../../component/Silaras-component/sidebar-laras'
import '../../component/css/dashboard.css';
import Request_Form_Detail from '../../component/Silaras-component/request-form-detail';
const Request_Detail = () =>  {
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
                {showDetail ?<Request_Form_Detail/> : <Request_Form_Update/>}
            </div>
            </div>
        </>
    )
}
export default Request_Detail