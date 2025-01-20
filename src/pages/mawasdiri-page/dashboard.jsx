import Content from '../../component/Mawasdiri-component/content'
import Sidebar from '../../component/Mawasdiri-component/sidebar'
import './dashboard.css'
const Dashboard = () => {
    return(
        <>
            <div className='dashboard'>
                <Sidebar/>
                <Content/>
            </div>
        </>
    )
}
export default Dashboard