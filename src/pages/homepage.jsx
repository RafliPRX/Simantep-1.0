import Banner from '../component/Homepage-component/banner'
import Footer from '../component/Homepage-component/footer'
import Menu from '../component/Homepage-component/menu'
import './homepage.css'
const Homepage = () => {
    const scrollClick = () => {
        console.log('discover');
        window.scrollTo({top: 1100, behavior: 'smooth'});
    };
    return(
        <>
            <div className='home'>
                <Banner onDiscoveryClick={scrollClick} />
                <div className='asset'></div>
                <Menu/>
                <Footer/>
            </div>
        </>
    )
}
export default Homepage