<?php 
include 'connect.php';
//get user data
$sql = "SELECT * FROM user_bnn";
$result = mysqli_query($koneksi, $sql);
$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}
echo json_encode($data);
?>