import Absent from '../../component/Mawasdiri-component/absent'
import Sidebar from '../../component/Mawasdiri-component/sidebar'
import '../../component/css/dashboard.css';

const Absent_Page = () => {
    return(
        <>
            <div className='dashboard'>
                <Sidebar/>
                <Absent title="Absensi Pagi"/>
            </div>
        </>
    )
}
export default Absent_Page