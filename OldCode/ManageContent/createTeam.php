<?php	



if(isset($_COOKIE['compID']) && $_COOKIE['compID'] != '')
{

	$teamName = $_GET["MTeamName"];


	$compID = strtolower($_COOKIE['compID']);
	$compIDUpper = $_COOKIE['compID'];
	$con = mysql_connect("localhost","guest","");

	mysql_select_db("competition", $con);
	$sql = "INSERT INTO ${compID}teams (teamname) VALUES ('${teamName}')";
	mysql_query($sql);
	chdir("C:\Dropbox\htdocs\NewDesign\OldCode");//Change the directory to that of the root directory
	$fileName = "Competitions/".$compIDUpper . $teamName . "Content" . ".txt";
	$file = fopen($fileName,"w+");
	fclose($file);
	
	$results = mysql_query("SELECT * FROM ${compID}teams");
	$team_String = '<select name="MTeamSelect" id="MTeamSelect" size=10 onchange="loadStudentInfo(this)">';//This onchage function is called when a team name is selected
	$names = '';
	while($row = mysql_fetch_array($results))
	{
	  if(strcmp($row['teamname'],"") != 0)//Removes a blank element
	  {
		$name = $row['teamname'];
		$NextOption = '<option>'.$name.'</option>';
		$team_String .= $NextOption;
	  }
	}
	$team_String .= '</select>';
	echo $team_String;
	mysql_close($con);
}
else
	echo "Please create a competition " . "<br / >" . "before creating a team" . "<br /><br /><br /><br /><br /><br /><br /><br /><br />";
?>