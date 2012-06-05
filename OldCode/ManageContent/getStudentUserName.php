<?php


$currStudent = $_GET['currStudent'];
$studPos 	 = $_GET['studentPos'];

$student = explode(', ', $currStudent, 2);
$fname = $student[1];
$lname = $student[0];

$con = mysql_connect('localhost', 'guest', '');

mysql_select_db("accounts", $con);

$sql="SELECT * FROM students WHERE firstname = '${fname}' AND lastname = '${lname}'";

$result = mysql_query($sql);

$row = mysql_fetch_array($result);

$userN = $row['username'];


echo $userN;


mysql_close($con);
?>