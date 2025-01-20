import Sidebar from '../../component/Mawasdiri-component/sidebar'
import Cuti_form from '../../component/Mawasdiri-component/cuti'
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