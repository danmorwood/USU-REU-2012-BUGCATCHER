<?php



$compID = $_COOKIE['compID'];
if(isset($_COOKIE['compID']) && $_COOKIE['compID'] != '')
{
	$file = file("../Competitions/${compID}.txt");
    $content = '<select name="HProbNum" id="HProbNum" size=5 class="Hselect" onchange=showPre(this.value);>';
	
	for($i = 0; $i < (count($file) - 4 ); $i++)
	{
		$content .= "<option> ${file[5 + $i]} </option>";
	}
	
	$content .= '</select>';
	echo $content;
}
else 
	echo "You must be part of a competition to use code coverage";

?>