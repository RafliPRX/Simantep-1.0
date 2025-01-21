import Content_simak from '../../component/Simak-component/content-simak'
import Sidebar_simak from '../../component/Simak-component/sidebar-simak'
import './dashboard-simak.css'

const Dashboard_simak = () => {
    return(
        <>
            <div className='dashboard'>
                <Sidebar_simak/>
                <Content_simak/>
            </div>
        </>
    )
}
export default Dashboard_simak