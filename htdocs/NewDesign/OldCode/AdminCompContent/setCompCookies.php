<?php
//var contents = "Mode=" + ModeValue + "&NumOfProblems=" + NumProbsValue + "&AllowHints=" + HintsValue + "&CompTime=" + TimeValue;


$_COOKIE['SetMode'] = $_GET['Mode'];
if(isset($_COOKIE["compID"]) && $_COOKIE["compID"] != '')
{
	$file = file("../Competitions/${comp}.txt");
	$masterTime = file("../Competition/MasterTimer.txt");
	$masterTime[0] = $file[3];
	
}
else
	echo "";

?>