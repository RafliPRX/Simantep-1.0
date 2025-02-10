import Request_form_Detail from '../../component/Silaras-component/request-form-detail'
import Sidebar_laras from '../../component/Silaras-component/sidebar-laras'
import './fix-form.css'
const Request_Detail = () =>  {
    return(
        <> 
            <div className="dashboard">
                <Sidebar_laras/>
                <Request_form_Detail/>
            </div>
        </>
    )
}
export default Request_Detail