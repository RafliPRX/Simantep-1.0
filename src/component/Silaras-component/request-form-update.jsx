import { useEffect, useState } from 'react'
import './fix-form'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Profile from '../profile'
const Request_Form_Update = () => {
    const storedUsername = localStorage.getItem('nama');
    const storedFProfile = localStorage.getItem('f_profile');
    const [nama, setNama] = useState('')
    const [nrk, setNRK] = useState('')
    const [unit, setUnit] = useState('')
    const [barang, setBarang] = useState('')
    const navigate = useNavigate();

    const param = useParams();
    const handleChangeNama = (event) => {
      console.log(event.target.value);
      setNama(event.target.value);
    }
    const handleChangeNRK = (event) => {
      console.log(event.target.value);
      setNRK(event.target.value);
    }
    const handleChangeUnit = (event) => {
      console.log(event.target.value);
      setUnit(event.target.value);
    }
    const handleChangeBarang = (event) => {
      console.log(event.target.value);
      setBarang(event.target.value);
    }
    const hadleRequest = async (event) => {
      event.preventDefault();
      const payload = {
        nama: nama,
        nrk: nrk,
        unit: unit,
        barang: barang,
      };
      if (!payload.nama || !payload.unit || !payload.nrk || !payload.barang) {
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
          navigate("/dashboard-laras");
        }, 1000);
      } catch (error) {
        console.log(error.response);
      }
    }
    const [request, setRequest] = useState([]);
    const getRequest = async () => {
        try {
            const response = await axios.get(`https://simantepbareta.cloud/API/SILARAS/detail_request.php?id=${param.id}`, {
                headers: {}
            })
            console.log(response.data);
            setRequest(response.data);
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
                <p>Silaras/Form Permohonan BHP & ATK</p>
                <h1>Form Permohonan Barang <br /> Habis Pakai & Alat Tulis <br /> Kantor</h1>
                <Profile nama={storedUsername} f_profile={storedFProfile} feature="silaras" />                 
                <div className='content-col'>
                    <div className='box3' style={{marginTop: '-277px'}}>
                        <form action="">
                        <div className='content-f'>
                            <h1>Data Diri Peminjam</h1>
                            <label htmlFor="">Nama</label>
                            <input onChange={handleChangeNama} placeholder={request.nama} type="text"/>
                            <label htmlFor="">NIP/NRK</label>
                            <input onChange={handleChangeNRK} placeholder={request.nrk} type="text"/>
                            <label htmlFor="">Unit Kerja</label>
                            <input onChange={handleChangeUnit} placeholder={request.unit} type="text"/>
                            <label htmlFor="">Permohonan Barang (Deskripsikan Permohonan)</label>
                            <textarea onChange={handleChangeBarang} placeholder={request.barang} name="" id=""></textarea>
                        </div>
                        <button onClick={hadleRequest} className='submit' type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>        
        </>
    )
}
export default Request_Form_Update