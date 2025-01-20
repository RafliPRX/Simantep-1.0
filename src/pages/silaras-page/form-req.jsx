import Request from '../../component/Silaras-component/request'
import Sidebar_laras from '../../component/Silaras-component/sidebar-laras'
import './fix-form.css'
const Form_request = () => {
    return(
        <>
            <div className="dashboard">
                <Sidebar_laras/>
                <Request/>
            </div>
        </>
    )
}
export default Form_request