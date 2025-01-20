import Fix_form from '../../component/Silaras-component/fix-form'
import Sidebar_laras from '../../component/Silaras-component/sidebar-laras'
import './fix-form.css'
const Fix = () =>  {
    return(
        <> 
            <div className="dashboard">
                <Sidebar_laras/>
                <Fix_form/>
            </div>
        </>
    )
}
export default Fix