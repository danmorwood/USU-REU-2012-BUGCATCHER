<?php

$compID = $_COOKIE['compID'];
if(isset($_COOKIE['compID']) && $_COOKIE['compID'] != '')
{
	
	
	chdir("C:\Dropbox\htdocs\NewDesign\OldCode");//Change the directory to that of the root directory
	$file = file("Competitions/${compID}.txt");

	if($file[0] == 1)
		echo "SET";
	else
		echo "NOTSET";
	}
else 
	echo "You must be part of a competition to use code coverage";

?>