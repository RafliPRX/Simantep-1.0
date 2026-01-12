import PropTypes from "prop-types";
import XLSX from 'xlsx';

const TemplateExcel = ({ filterAbsent }) => {
  
  const ws = XLSX.utils.json_to_sheet(filterAbsent);

  return (
    <div>
      <h1>Template Excel</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Tanggal</th>
            <th>Jam Masuk</th>
            <th>Jam Keluar</th>
          </tr>
        </thead>
        <tbody>
          {filterAbsent.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.nama}</td>
              <td>{item.tanggal}</td>
              <td>{item.jam_in}</td>
              <td>{item.jam_out}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => XLSX.writeFile(ws, 'template_excel.xlsx')}>Download Template Excel</button>
    </div>
  );
};

TemplateExcel.propTypes = {
  filterAbsent: PropTypes.array
};
export default TemplateExcel;