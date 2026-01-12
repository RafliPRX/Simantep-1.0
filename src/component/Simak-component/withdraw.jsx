import { useState } from 'react';
import './form.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Profile from '../profile';

const Withdraw = () => {
    const storedUsername = localStorage.getItem('nama');
    const storeNrk = localStorage.getItem('nrk');
    const storedSisaCuti = localStorage.getItem('sisa_cuti');
    const storedFProfile = localStorage.getItem('f_profile');
    const storedID = localStorage.getItem('id_jabatan_sup');
    console.log(storedUsername);
    console.log(storedSisaCuti );
    console.log(storedFProfile);
    console.log(storeNrk);
    console.log(storedID);

    const navigate = useNavigate();
    const [show, setShow] = useState(false); // Changed to boolean for clarity

    function handleShow(event) {
        setShow(event.target.checked); // Set show based on checkbox state
    }
    const [show1, setShow1] = useState(false); // Changed to boolean for clarity

    function handleShow1(event) {
        setShow1(event.target.checked); // Set show based on checkbox state
    }

    const [show2, setShow2] = useState(false); // Changed to boolean for clarity

    function handleShow2(event) {
        setShow2(event.target.checked); // Set show based on checkbox state
    }

    const [isLoading, setIsLoading] = useState(false);
    const [nama, setNama] = useState(storedUsername);
    const [nrk, setNRK] = useState(storeNrk);
    const [jabatan, setJabatan] = useState("");
    const [kegiatan, setKegiatan] = useState("");
    const [rencana, setRencana] = useState("");
    const [units, setUnits] = useState("");
    const [akun211, setAkun211] = useState("");
    const [akun113, setAkun113] = useState("");
    const [akun151, setAkun151] = useState("");
    const [akun191, setAkun191] = useState("");
    const [akun114, setAkun114] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [totaldana, setTotalDana] = useState("");
    const [metode, setMetode] =useState("");
    const [tempat, setTempat] = useState("");
    const [kendaraan, setKendaraan] = useState("");
    const handleChangeNama = (event) => {
        setNama(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeNRK = (event) => {
        setNRK(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeJabatan = (event) => {
        setJabatan(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeKegiatan = (event) => {
        setKegiatan(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeRencana = (event) => {
        setRencana(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeUnits = (event) => {
        setUnits(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeAkun211 = (event) => {
        setAkun211(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeAkun113 = (event) => {
        setAkun113(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeAkun114 = (event) => {
        setAkun114(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeAkun151 = (event) => {
        setAkun151(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeAkun191 = (event) => {
        setAkun191(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeKeterangan = (event) => {
        setKeterangan(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeDana = (event) => {
        setTotalDana(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeMetode = (event) => {
        setMetode(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeTempat = (event) => {
        setTempat(event.target.value);
        console.log(event.target.value);
    }
    const handleChangeKendaraan = (event) => {
        setKendaraan(event.target.value);
        console.log(event.target.value);
    }
    const handleRequest = async(event) => {
        setIsLoading(true);
        event.preventDefault();
        const payload = {
            nama:nama,
            NRK:nrk,
            jabatan_pj:jabatan,
            nama_kegiatan:kegiatan,
            units: units,
            rencana_pelaksana: rencana,
            acc_521211: akun211,
            acc_522141_kendaraan: kendaraan,
            acc_522141_tempat: tempat,
            acc_522151: akun151,
            acc_524113: akun113,
            acc_524114: akun114,
            acc_522191: akun191,
            keterangan: keterangan,
            total_dana_manajemen: totaldana,
            keterangan_keuangan: '',
            metode: metode
        };
        try {
            const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/new_Dana.php`, payload, {
                headers: {
                    "Content-Type" : "multipart/form-data",
                }
            });
            console.log(response.data);
            setTimeout(() => {
                setIsLoading(false);
                navigate('/dashboard-simak')
                alert(response.data.message);
            }, 1000);
        } catch (error) {
            console.log(error.response);
            alert("error code 104b");
        }
    }
    return (
        <>
            <div className='main-dashboard'>
            {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
            </div>} 
                <p>Simak/Form Rencana Penarikan Dana</p>
                <h1>Form Rencana Penarikan <br /> Dana</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="simak" />                
                <div className='content-col'>
                    <div className='box2'>
                        <form action="">
                            <div className='content-f'>
                                <h1>Data Diri</h1>
                                <label htmlFor="">Nama</label>
                                <input onChange={handleChangeNama} value={storedUsername} placeholder='Nama' type="text"/>
                                <label htmlFor="">NIP/NRK</label>
                                <input onChange={handleChangeNRK} value={storeNrk} placeholder='NIP/NRK' type="text"/>
                                <label htmlFor="">Jabatan</label>
                                <input onChange={handleChangeJabatan} value={jabatan} placeholder='Jabatan' type="text"/>
                            </div>

                            <div className='content-f'>
                                <h1>Nama Kegiatan & Unit</h1>
                                <label htmlFor="">Nama Rencana Kegiatan dan Program</label>
                                <input onChange={handleChangeKegiatan} value={kegiatan} placeholder='Nama Rencana Kegiatan dan Program' type="text"/>
                                <label htmlFor="">Rencana Pelaksanaan</label>
                                <input onChange={handleChangeRencana} value={rencana} placeholder='Rencana Pelaksanaan' type="date"/>
                                <div className='check'>
                                    <input value="Sosial" type="checkbox" id="sosialCheckbox" onChange={(event) => {
                                        handleShow(event);
                                        handleChangeUnits(event);
                                    }} />
                                    <label htmlFor="sosialCheckbox">Sosial</label>
                                </div>
                                {show && ( // Conditionally render based on show state
                                    <div className='check-form'>
                                        <label htmlFor="">Kebutuhan Akun 521211</label>
                                        <input onChange={handleChangeAkun211} value={akun211} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Kebutuhan Akun 522141</label><br /><br />
                                        <label style={{paddingLeft: '25px'}} htmlFor="">o</label>
                                        <label style={{width: '200px'}} htmlFor="">Sewa Tempat</label><br /><br />                  
                                        <input onChange={handleChangeTempat} value={tempat} placeholder='Sewa Tempat' type="text" name="" id="" />
                                        <label style={{paddingLeft: '25px'}} htmlFor="">o</label>
                                        <label style={{width: '200px'}} htmlFor="">Sewa Kendaraan</label><br /><br />                  
                                        <input onChange={handleChangeKendaraan} value={kendaraan} placeholder='Sewa Kendaraan' type="text" name="" id="" />
                                        <label htmlFor="">Kebutuhan Akun 522151</label>
                                        <input onChange={handleChangeAkun151} value={akun151} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Kebutuhan Akun 524113</label>
                                        <input onChange={handleChangeAkun113} value={akun113} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Kebutuhan Akun 524114</label>
                                        <input onChange={handleChangeAkun114} value={akun114} style={{marginTop: '10px'}} type="text" name="" id="" />
                                    </div>
                                )}
                                <div className='check'>
                                    <input value="Medis" type="checkbox" id="sosialCheckbox" onChange={(event)=> {
                                        handleShow1(event);
                                        handleChangeUnits(event);
                                    }}/>
                                    <label htmlFor="sosialCheckbox">Medis</label>
                                </div>
                                {show1 && ( // Conditionally render based on show state
                                    <div className='check-form'>
                                        <label htmlFor="">Kebutuhan Akun 521211</label>
                                        <input onChange={handleChangeAkun211} value={akun211} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Kebutuhan Akun 522191</label>
                                        <input onChange={handleChangeAkun191} value={akun191} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Keterangan</label>
                                        <input onChange={handleChangeKeterangan} value={keterangan} style={{marginTop: '10px'}} type="text" name="" id="" />
                                    </div>
                                )}
                                <div className='check'>
                                    <input type="checkbox" value="Manajemen" id="sosialCheckbox" onChange={(event) =>{
                                        handleShow2(event)
                                        handleChangeUnits(event);}} />
                                    <label htmlFor="sosialCheckbox">Manajemen</label>
                                </div>
                                {show2 && ( // Conditionally render based on show state
                                    <div className='check-form'>
                                        <label htmlFor="">Total Permintaan Dana</label>
                                        <input onChange={handleChangeDana} value={totaldana} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Metode Pembayaran</label>
                                        <input onChange={handleChangeMetode} value={metode} style={{marginTop: '10px'}} type="text" name="" id="" />
                                    </div>
                                )}
                            </div>
                            <button onClick={handleRequest} className='submit' type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>        
        </>
    );
}

export default Withdraw;
