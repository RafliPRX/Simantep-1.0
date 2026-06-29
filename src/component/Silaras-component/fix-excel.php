<?php
header("Content-type: application/vnd-ms-excel");
header("Content-Disposition: attachment; filename=Daftar surat cuti(Kepegawaian).xls");
?>
<!DOCTYPE html>
<html>
<head>
	<title>Daftar surat cuti</title>
</head>
<?php
    $bulan = isset($_GET['bulan']) ? $_GET['bulan'] : '1';
    $tahun = isset($_GET['tahun']) ? $_GET['tahun'] : '2025';
    $url_api = "https://simantepbareta.cloud/API/SILARAS/fix_excel.php?bulan=".$bulan."&tahun=".$tahun;
    $ch = curl_init($url_api);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $response = curl_exec($ch);
    $data = json_decode($response, true);
?>
<body>
	<h2 align="center">Daftar Surat Cuti</h2>    
    <table class="fl-table" border="1" width="100%" >
        <tr>
            <th style="text-align: center;">Nomor</th>
            <th style="text-align: center;">id Form</th>
            <th style="text-align: center;">Nama</th>
            <th style="text-align: center;">NIP/NRK</th>
            <th style="text-align: center;">Unit Kerja</th>
            <th style="text-align: center;">Permintaan Perbaikan</th>
        </tr>        
        <tr>
            <?php foreach ($data as $index => $row):  ?>
            <td style="text-align: center; justify-content: center;" rowspan="3"><?php echo $index + 1; ?></td>
            <td style="text-align: center;"><?php echo htmlspecialchars($row['id_fix']); ?></td>
            <td style="text-align: center;"><?php echo htmlspecialchars($row['nama']); ?></td>
            <td style="text-align: center;"><?php echo htmlspecialchars($row['nrk_nip']); ?></td>
            <?php if (htmlspecialchars($row['akses_level']) === "1") { ?>
                <td style="text-align: center;"><?php echo htmlspecialchars($row['nama_role']); ?></td> 
            <?php } elseif (htmlspecialchars($row['akses_level']) === "2") { ?>
                <td style="text-align: center;"><?php echo htmlspecialchars($row['nama_role_c']); ?></td> 
            <?php } elseif (htmlspecialchars($row['akses_level']) === "3") { ?>
                <td style="text-align: center;"><?php echo htmlspecialchars($row['nama_role_b']); ?></td> 
            <?php } elseif (htmlspecialchars($row['akses_level']) === "4") { ?>
                <td style="text-align: center;"><?php echo htmlspecialchars($row['nama_role_a']); ?></td> 
            <?php } ?>
            <td style="text-align: center;"><?php echo htmlspecialchars($row['fix']); ?></td>
            <td> <img style="height: auto; width: 100px;" src="" alt=""> </td>
            <?php endforeach; ?>
        </tr>        
    </table>
</body>
</html>