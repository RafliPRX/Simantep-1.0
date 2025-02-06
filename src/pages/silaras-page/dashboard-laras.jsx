import Content_laras from '../../component/Silaras-component/content-laras';
import Sidebar_laras from '../../component/Silaras-component/sidebar-laras';
import './dashboard-laras.css';

const Dashboard_laras = () => {
    return (
        <>
            <div className='dashboard'>
                <Sidebar_laras />
                    <Content_laras/>
            </div>
        </>
    );
};

export default Dashboard_laras;
