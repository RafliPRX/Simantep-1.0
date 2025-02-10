import Fix_form_Detail from '../../component/Silaras-component/fix-form-detail'
import Sidebar_laras from '../../component/Silaras-component/sidebar-laras'
import './fix-form.css'
const Fix_Detail = () =>  {
    return(
        <> 
            <div className="dashboard">
                <Sidebar_laras/>
                <Fix_form_Detail/>
            </div>
        </>
    )
}
export default Fix_Detail