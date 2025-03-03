import Banner from '../component/Homepage-component/banner';
import Footer from '../component/Homepage-component/footer';
import Menu from '../component/Homepage-component/menu';
import './homepage.css';

const Homepage = () => {
    const storedUsername = localStorage.getItem('nama');
    const storeNrk = localStorage.getItem('nrk');
    const storedSisaCuti = localStorage.getItem('sisa_cuti');
    const storedFProfile = localStorage.getItem('f_profile');
    const storedID = localStorage.getItem('id_jabatan_sup');
    const kelompok = localStorage.getItem('no_kelompok');
    console.log(storedUsername);
    console.log(storedSisaCuti );
    console.log(storedFProfile);
    console.log(storeNrk);
    console.log(storedID);
    console.log(kelompok);

    const scrollClick = () => {
        console.log('discover');
        window.scrollTo({top: 1100, behavior: 'smooth'});
    };

    return (
        <>
            <div className='home'>
                <Banner onDiscoveryClick={scrollClick} />
                <div className='asset'></div>
                <Menu />
                <Footer />
            </div>
        </>
    );
};

export default Homepage;
