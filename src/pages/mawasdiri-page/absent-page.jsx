import Absent from '../../component/Mawasdiri-component/absent'
import Sidebar from '../../component/Mawasdiri-component/sidebar'
import './cuti-form.css'

const Absent_Page = () => {
    return(
        <>
            <div className='dashboard'>
                <Sidebar/>
                <Absent/>
            </div>
        </>
    )
}
export default Absent_Page