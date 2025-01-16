import Content from '../component/Dashboard-component/content'
import Sidebar from '../component/Dashboard-component/sidebar'
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