import Content_Corner from '../../component/e-corner-component/content_corner'
import Sidebar_Corner from '../../component/e-corner-component/sidebar_corner'
import '../mawasdiri-page/dashboard.css';
const Dashboard_Corner = () => {    
    return(
        <>
            <div className='dashboard'>
                <Sidebar_Corner/>
                <Content_Corner/>
            </div>
        </>
    )
}
export default Dashboard_Corner