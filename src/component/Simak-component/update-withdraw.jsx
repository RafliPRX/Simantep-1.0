import { useEffect, useState } from 'react';
import '../css/form.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../profile';

const Update_Withdraw = () => {
    const storedUsername = localStorage.getItem('nama');
    const storedFProfile = localStorage.getItem('f_profile');
    const navigate = useNavigate();
    const param = useParams();
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
    const [detail, setDetail] = useState([]);
    const getDetail = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/detail_dana.php?id=${param.id}`, {
                headers: {}
            });
            setDetail(response.data);
            console.log(response.data);
            setNama(response.data.nama);
            setNRK(response.data.nrk_nip);
            setJabatan(response.data.jabatan);
            setKegiatan(response.data.nama_kegiatan);
            setRencana(response.data.rencana_pelaksana);
            setUnits(response.data.units);
            setAkun211(response.data.acc_521211);
            setAkun113(response.data.acc_524113);
            setAkun151(response.data.acc_522151);
            setAkun191(response.data.acc_522191);
            setAkun114(response.data.acc_524114);
            setKeterangan(response.data.keterangan);
            setTotalDana(response.data.total_dana_manajemen);
            setMetode(response.data.metode);
            setTempat(response.data.acc_522141_tempat);
            setKendaraan(response.data.acc_522141_kendaraan);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    const [isLoading, setIsLoading] = useState(false);
    const [nama, setNama] = useState(detail.nama || "");
    const [nrk, setNRK] = useState(detail.nrk_nip || "");
    const [jabatan, setJabatan] = useState(detail.jabatan || "");
    const [kegiatan, setKegiatan] = useState(detail.nama_kegiatan || "");
    const [rencana, setRencana] = useState(detail.rencana_pelaksana || "");
    const [units, setUnits] = useState(detail.units || "");
    const [akun211, setAkun211] = useState(detail.acc_521211 || "");
    const [akun113, setAkun113] = useState(detail.acc_524113 || "");
    const [akun151, setAkun151] = useState(detail.acc_522151 || "");
    const [akun191, setAkun191] = useState(detail.acc_522191 || "");
    const [akun114, setAkun114] = useState(detail.acc_524114 || "");
    const [keterangan, setKeterangan] = useState(detail.keterangan || "");
    const [totaldana, setTotalDana] = useState(detail.total_dana_manajemen || "");
    const [metode, setMetode] =useState(detail.metode || "");
    const [tempat, setTempat] = useState(detail.acc_522141_tempat || "");
    const [kendaraan, setKendaraan] = useState(detail.acc_522141_kendaraan || "");
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
            id_dana: param.id,
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
            const response = await axios.post(`https://simantepbareta.cloud/API/SIMAK/Dana_RPD/update_dana.php?id=${param.id}`, payload, {
                headers: {
                    "Content-Type" : "multipart/form-data",
                }
            });
            console.log(response.data);
            setTimeout(() => {
                setIsLoading(false);
                navigate('/dashboard-simak')
            }, 1000);
        } catch (error) {
            console.log(error.response);
        }
    }    
    return (
        <>
            <div className='main-dashboard'>
            {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
            </div>} 
                <p>Simak/Formulir Rencana Penarikan Dana</p>
                <h1>Mengubah Formulir  Rencana Penarikan <br /> Dana</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="simak" />                
                <div className='content-col'>
                    <div className='box1'>
                        <form action="">
                            <div className='content-f'>
                                <h1>Data Diri</h1>
                                <label htmlFor="">Nama</label>
                                <input onChange={handleChangeNama} disabled value={nama} placeholder={detail.nama} type="text"/>
                                <label htmlFor="">NIP/NRK</label>
                                <input onChange={handleChangeNRK} disabled value={nrk} placeholder={detail.NRK} type="text"/>
                                <label htmlFor="">Jabatan</label>
                                <input onChange={handleChangeJabatan} disabled value={jabatan} placeholder={detail.jabatan_pj} type="text"/>
                            </div>

                            <div className='content-f'>
                                <h1>Nama Kegiatan & Unit</h1>
                                <label htmlFor="">Nama Rencana Kegiatan dan Program</label>
                                <input onChange={handleChangeKegiatan} value={kegiatan} placeholder={detail.nama_kegiatan} type="text"/>
                                <label htmlFor="">Rencana Pelaksanaan</label>
                                <input onChange={handleChangeRencana} value={rencana} placeholder={detail.rencana_pelaksana} type="date"/>
                                <div className='check'>
                                    <input value="Sosial" checked={units === "Sosial"} type="checkbox" id="sosialCheckbox" onChange={(event) => {
                                        handleShow(event);
                                        handleChangeUnits(event);
                                    }} />
                                    <label htmlFor="sosialCheckbox">Sosial</label>                                    
                                </div>
                                {(show || units === "Sosial") && (
                                    <div className='check-form'>
                                        <label htmlFor="">Kebutuhan Akun 521211</label>
                                        <input onChange={handleChangeAkun211} value={akun211} placeholder={detail.acc_521211} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Kebutuhan Akun 522141</label><br /><br />
                                        <label style={{paddingLeft: '25px'}} htmlFor="">o</label>
                                        <label style={{width: '200px'}} htmlFor="">Sewa Tempat</label><br /><br />                  
                                        <input onChange={handleChangeTempat} value={tempat} placeholder={detail.acc_522141_tempat} type="text" name="" id="" />
                                        <label style={{paddingLeft: '25px'}} htmlFor="">o</label>
                                        <label style={{width: '200px'}} htmlFor="">Sewa Kendaraan</label><br /><br />                  
                                        <input onChange={handleChangeKendaraan} value={kendaraan} placeholder={detail.acc_522141_tempat} type="text" name="" id="" />
                                        <label htmlFor="">Kebutuhan Akun 522151</label>
                                        <input onChange={handleChangeAkun151} value={akun151} placeholder={detail.acc_522151} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Kebutuhan Akun 524113</label>
                                        <input onChange={handleChangeAkun113} value={akun113} placeholder={detail.acc_524113} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Kebutuhan Akun 524114</label>
                                        <input onChange={handleChangeAkun114} value={akun114} placeholder={detail.acc_524114} style={{marginTop: '10px'}} type="text" name="" id="" />
                                    </div>
                                )}
                                <div className='check'>
                                    <input value="Medis" checked={units === "Medis"} type="checkbox" id="sosialCheckbox" onChange={(event)=> {
                                        handleShow1(event);
                                        handleChangeUnits(event);
                                    }}/>
                                    <label htmlFor="sosialCheckbox">Medis</label>
                                </div>
                                {(show1 || units === "Medis") && ( // Conditionally render based on show state
                                    <div className='check-form'>
                                        <label htmlFor="">Kebutuhan Akun 521211</label>
                                        <input onChange={handleChangeAkun211} value={akun211} placeholder={detail.acc_521211} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Kebutuhan Akun 522191</label>
                                        <input onChange={handleChangeAkun191} value={akun191} placeholder={detail.acc_522191} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Keterangan</label>
                                        <input onChange={handleChangeKeterangan} value={keterangan} placeholder={detail.keterangan} style={{marginTop: '10px'}} type="text" name="" id="" />
                                    </div>
                                )}
                                <div className='check'>
                                    <input type="checkbox" value="Manajemen" checked={units === "Manajemen"} id="sosialCheckbox" onChange={(event) =>{
                                        handleShow2(event)
                                        handleChangeUnits(event);}} />
                                    <label htmlFor="sosialCheckbox">Manajemen</label>
                                </div>
                                {(show2 || units === "Manajemen") && ( // Conditionally render based on show state
                                    <div className='check-form'>
                                        <label htmlFor="">Total Permintaan Dana</label>
                                        <input onChange={handleChangeDana} value={totaldana} placeholder={detail.total_dana} style={{marginTop: '10px'}} type="text" name="" id="" />
                                        <label htmlFor="">Metode Pembayaran</label>
                                        <input onChange={handleChangeMetode} value={metode} placeholder={detail.metode} style={{marginTop: '10px'}} type="text" name="" id="" />
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

export default Update_Withdraw
