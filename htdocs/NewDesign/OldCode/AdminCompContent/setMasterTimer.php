<?php
$time = $_GET['time'];
$comp = $_GET['compID'];

$timerFile = fopen("../Competitions/".$comp."MasterTimer.txt","w");

if ($time < 10)
{
  fwrite($timerFile,"0".$time."00");
}
else
{
  fwrite($timerFile,$time."00");
}
fclose($timerFile);
echo "Timer set to: ".$time." minutes.";


?>