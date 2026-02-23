import { useEffect, useState } from 'react'
import '../css/form.css';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Profile from '../profile'
const Request_Form_Update = () => {
    const {level} = useParams();
    const {role} = useParams();
    const {role_sp} = useParams();
    const storedUsername = localStorage.getItem('nama');
    const storedFProfile = localStorage.getItem('f_profile');
    const [isLoading, setIsLoading] = useState(false);
    const [request, setRequest] = useState([]);
    const [nama, setNama] = useState(request.nama);
    const [nrk_nip, setNrk_nip] = useState(request.nrk_nip);
    const [jabatan, setJabatan] = useState(request.jabatan);
    const [unit, setUnit] = useState(request.unit);
    const [barang, setBarang] = useState(request.barang);
    const [barang2, setBarang2] = useState(request.barang2);
    const [barang3, setBarang3] = useState(request.barang3);
    const [barang4, setBarang4] = useState(request.barang4);
    const [barang5, setBarang5] = useState(request.barang5);
    const [jumlah_barang, setJumlahBarang] = useState(request.jumlah_barang);
    const [jumlah_barang2, setJumlahBarang2] = useState(request.jumlah_barang2);
    const [jumlah_barang3, setJumlahBarang3] = useState(request.jumlah_barang3);
    const [jumlah_barang4, setJumlahBarang4] = useState(request.jumlah_barang4);
    const [jumlah_barang5, setJumlahBarang5] = useState(request.jumlah_barang5);
    const [satuan_barang, setSatuanBarang] = useState(request.satuan);
    const [satuan_barang2, setSatuanBarang2] = useState(request.satuan2);
    const [satuan_barang3, setSatuanBarang3] = useState(request.satuan3);
    const [satuan_barang4, setSatuanBarang4] = useState(request.satuan4);
    const [satuan_barang5, setSatuanBarang5] = useState(request.satuan5);
    const navigate = useNavigate();

    const param = useParams();
    const handleChangeUnit = (event) => {
      console.log(event.target.value);
      setUnit(event.target.value);
    }
    const handleChangeBarang = (event) => {
      console.log(event.target.value);
      setBarang(event.target.value);
    }
    const handleChangeJumlahBarang = (event) => {
      console.log(event.target.value);
      setJumlahBarang(event.target.value);
    }
    const handleChangeSatuanBarang = (event) => {
      console.log(event.target.value);
      setSatuanBarang(event.target.value);
    }
    const handleChangeBarang2 = (event) => {
      console.log(event.target.value);
      setBarang2(event.target.value);
    }
    const handleChangeJumlahBarang2 = (event) => {
      console.log(event.target.value);
      setJumlahBarang2(event.target.value);
    }
    const handleChangeSatuanBarang2 = (event) => {
      console.log(event.target.value);
      setSatuanBarang2(event.target.value);
    }
    const handleChangeBarang3 = (event) => {
      console.log(event.target.value);
      setBarang3(event.target.value);
    }
    const handleChangeJumlahBarang3 = (event) => {
      console.log(event.target.value);
      setJumlahBarang3(event.target.value);
    }
    const handleChangeSatuanBarang3 = (event) => {
      console.log(event.target.value);
      setSatuanBarang3(event.target.value);
    }
    const handleChangeBarang4 = (event) => {
      console.log(event.target.value);
      setBarang4(event.target.value);
    }
    const handleChangeJumlahBarang4 = (event) => {
      console.log(event.target.value);
      setJumlahBarang4(event.target.value);
    }
    const handleChangeSatuanBarang4 = (event) => {
      console.log(event.target.value);
      setSatuanBarang4(event.target.value);
    }
    const handleChangeBarang5 = (event) => {
      console.log(event.target.value);
      setBarang5(event.target.value);
    }
    const handleChangeJumlahBarang5 = (event) => {
      console.log(event.target.value);
      setJumlahBarang5(event.target.value);
    }
    const handleChangeSatuanBarang5 = (event) => {
      console.log(event.target.value);
      setSatuanBarang5(event.target.value);
    }
    const hadleRequest = async (event) => {
      event.preventDefault();
      setIsLoading(true);
      const payload = {
        unit: unit,
        barang: barang,
        jumlah_barang: jumlah_barang,
        satuan: satuan_barang,
        barang2: barang2,
        jumlah_barang2: jumlah_barang2,
        satuan2: satuan_barang2,
        barang3: barang3,
        jumlah_barang3: jumlah_barang3,
        satuan3: satuan_barang3,
        barang4: barang4,
        jumlah_barang4: jumlah_barang4,
        satuan4: satuan_barang4,
        barang5: barang5,
        jumlah_barang5: jumlah_barang5,
        satuan5: satuan_barang5,
      };
      if (!payload.unit || !payload.barang || !payload.jumlah_barang || !payload.satuan) {
        alert("Mohon isi semua field yang wajib diisi");
        return;
      }
      try {
        const response = await axios.post(`https://simantepbareta.cloud/API/SILARAS/update_request.php?id=${param.id}`, payload, {
          headers: {
            "Content-Type" : "multipart/form-data"
          }
        });
        console.log(response.data);
        setTimeout(() => {
          navigate(`/dashboard-laras/${level}/${role}/${role_sp}`);
          alert(response.data.message);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error.response);
        alert(error.response.data.message);
        setIsLoading(false);
      }
    }
    
    const getRequest = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/detail_request.php?id=${param.id}`, {
                headers: {}
            })
            console.log(response.data);
            setRequest(response.data);
            setNama(response.data.nama);
            setNrk_nip(response.data.nrk_nip);
            setJabatan(response.data.jabatan);
            setBarang(response.data.barang);
            setJumlahBarang(response.data.jumlah_barang);
            setSatuanBarang(response.data.satuan);
            setUnit(response.data.unit);
            setBarang2(response.data.barang2);
            setJumlahBarang2(response.data.jumlah_barang2);
            setSatuanBarang2(response.data.satuan2);
            setBarang3(response.data.barang3);
            setJumlahBarang3(response.data.jumlah_barang3);
            setSatuanBarang3(response.data.satuan3);
            setBarang4(response.data.barang4);
            setJumlahBarang4(response.data.jumlah_barang4);
            setSatuanBarang4(response.data.satuan4);
            setBarang5(response.data.barang5);
            setJumlahBarang5(response.data.jumlah_barang5);
            setSatuanBarang5(response.data.satuan5);            
        } catch (error) {
            console.log(error.response);
        }
    };
    useEffect(() => {
        getRequest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
            <div className='main-dashboard'>
              {isLoading && <div style={{position: 'absolute', marginLeft: '-303px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', width: '1934px', height: '2504px'}}>
                <span style={{position: 'absolute', top : '600px'}} className="load-cuti"></span>
              </div>} 
                <p>Silaras/Formulir Permohonan BHP & ATK</p>
                <h1>Mengubah Formulir Permohonan Barang <br /> Habis Pakai & Alat Tulis <br /> Kantor</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="silaras" />                 
                <div className='content-col'>
                    <div className='box1' id='box_request'>
                        <form action="">
                        <div className='content-f'>
                            <h1>Data Diri Peminjam</h1>
                            <label htmlFor="">Nama</label>
                            <input value={nama} disabled placeholder='Nama' type="text"/>
                            <label htmlFor="">NIP/NRK</label>
                            <input value={nrk_nip} disabled placeholder='NRK' type="text"/>
                            <label htmlFor="">Jabatan</label>
                            <input value={jabatan} disabled placeholder='NRK' type="text"/>
                            <label htmlFor="">Unit Kerja</label>
                            <input onChange={handleChangeUnit} value={unit} placeholder='Unit Kerja' type="text"/>
                            <label htmlFor="">Permohonan Barang (Deskripsikan Permohonan)</label>
                            <table>
                              <tbody>
                                <tr className='barang-bar'>
                                  <th className='barang-no'>No</th>
                                  <th className='barang-jenis'>Nama Barang</th>
                                  <th className='barang-jumlah'>Jumlah</th>
                                  <th className='barang-satuan'>Satuan</th>
                                </tr>
                                <tr className='barang-bar'>
                                  <th className='barang-no'>1</th>
                                  <th className='barang-jenis'><input onChange={handleChangeBarang} value={barang} type="text" /></th>
                                  <th className='barang-jumlah'><input onChange={handleChangeJumlahBarang} value={jumlah_barang} type="text" /></th>
                                  <th className='barang-satuan'><input onChange={handleChangeSatuanBarang} value={satuan_barang} type="text" /></th>
                                </tr>
                                <tr className='barang-bar'>
                                  <th className='barang-no'>2</th>
                                  <th className='barang-jenis'><input onChange={handleChangeBarang2} value={barang2} type="text" /></th>
                                  <th className='barang-jumlah'><input onChange={handleChangeJumlahBarang2} value={jumlah_barang2} type="text" /></th>
                                  <th className='barang-satuan'><input onChange={handleChangeSatuanBarang2} value={satuan_barang2} type="text" /></th>

                                </tr>
                                <tr className='barang-bar'>
                                  <th className='barang-no'>3</th>
                                  <th className='barang-jenis'><input onChange={handleChangeBarang3} value={barang3} type="text" /></th>
                                  <th className='barang-jumlah'><input onChange={handleChangeJumlahBarang3} value={jumlah_barang3} type="text" /></th>
                                  <th className='barang-satuan'><input onChange={handleChangeSatuanBarang3} value={satuan_barang3} type="text" /></th>
                                </tr>
                                <tr className='barang-bar'>
                                  <th className='barang-no'>4</th>
                                  <th className='barang-jenis'><input onChange={handleChangeBarang4} value={barang4} type="text" /></th>
                                  <th className='barang-jumlah'><input onChange={handleChangeJumlahBarang4} value={jumlah_barang4} type="text" /></th>
                                  <th className='barang-satuan'><input onChange={handleChangeSatuanBarang4} value={satuan_barang4} type="text" /></th>
                                </tr>
                                <tr className='barang-bar'>
                                  <th className='barang-no'>5</th>
                                  <th className='barang-jenis'><input onChange={handleChangeBarang5} value={barang5} type="text" /></th>
                                  <th className='barang-jumlah'><input onChange={handleChangeJumlahBarang5} value={jumlah_barang5} type="text" /></th>
                                  <th className='barang-satuan'><input onChange={handleChangeSatuanBarang5} value={satuan_barang5} type="text" /></th>
                                </tr>
                              </tbody>
                            </table>
                        </div>                        
                         <button  className='submit' onClick={(event)=>hadleRequest(event)} type="submit">Submit</button>
                        </form>                        
                    </div> 
                </div>
            </div>        
        </>
    )
}
export default Request_Form_Update