import Proposed from '../../component/Simak-component/proposed'
import Sidebar_simak from '../../component/Simak-component/sidebar-simak'
import './dashboard-simak.css'

const Proposed_Form = () => {
    return(
        <>
            <div className='dashboard'>
                <Sidebar_simak/>
                <Proposed/>
            </div>
        </>
    )
}
export default Proposed_Form