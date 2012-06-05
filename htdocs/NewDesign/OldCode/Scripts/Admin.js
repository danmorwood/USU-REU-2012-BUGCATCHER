//###################################################################################################//
//                                         Global Variables                                          //
//###################################################################################################//

var MAX_STUDENT_ON_TEAM = 3;

//###################################################################################################//
//                                         Competition Setup                                         //
//###################################################################################################//


function startCompetition()
{

  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlstartCompetitionhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlstartCompetitionhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  xmlstartCompetitionhttp.onreadystatechange=function()
  {
    if (xmlstartCompetitionhttp.readyState == 4 && xmlstartCompetitionhttp.status == 200)
    {
      //alert(xmlstartCompetitionhttp.responseText);
      countdown();
    }
  }
  
  xmlstartCompetitionhttp.open("GET","AdminCompContent/StartCompetition.php",true);
  xmlstartCompetitionhttp.send();

}

function loadCurrentComp()
{
	document.getElementById("LanguageSet").value = compSetLanguage;
  document.getElementById("ModeSet").value = compSetMode;
  document.getElementById("NumOfProblemsSet").value = compSetProblems;
  document.getElementById("AllowHintsSet").value = compSetHints;
  document.getElementById("CompTimeSet").value = compSetTime;
  document.getElementById("CompIDSet").value = compSetID;
}

function createCompetition()
{
  var setupXML;
  
	var Language = document.getElementById("Language");
  var Mode = document.getElementById("Mode");
  var NumProbs = document.getElementById("NumOfProblems");
  var Hints = document.getElementById("AllowHints");
  var Time = document.getElementById("CompTime");
  
  if (window.XMLHttpRequest)
  {
    setupXML = new XMLHttpRequest();
  }
  else
  {
    setupXML = new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  setupXML.onreadystatechange=function()
  {
    if (setupXML.readyState == 4 && setupXML.status == 200)
    {
      //if (setupXML.responseText.length == 8)
      //{
        compSetID = setupXML.responseText;
        document.getElementById("CompIDSet").value = setupXML.responseText;
        compSetLanguage = Language.options[Language.selectedIndex].text;
				document.getElementById("LanguageSet").value = Language.options[Language.selectedIndex].text;
				Language.value = 0;
				compSetMode = Mode.options[Mode.selectedIndex].text;
        document.getElementById("ModeSet").value = Mode.options[Mode.selectedIndex].text;
        Mode.value = 0;
        compSetProblems = NumProbs.value;
        document.getElementById("NumOfProblemsSet").value = NumProbs.value;
        NumProbs.value = 1;
        compSetHints = Hints.options[Hints.selectedIndex].text;
        document.getElementById("AllowHintsSet").value = Hints.options[Hints.selectedIndex].text;
        Hints.value = 1;
        compSetTime = Time.value;
        document.getElementById("CompTimeSet").value = Time.value;
        Time.value = '';
        //setCompCookies();
        setHintState();
        createTimer();
      //}
    }
  }
	var LangVal = Language.value;
  var ModeVal = Mode.value;
  var NumProbsVal = NumProbs.value;
  var HintsVal = Hints.value;
  var TimeVal = Time.value;
  
  var contents = "Language=" + LangVal + "&Mode=" + ModeVal + "&NumOfProblems=" + NumProbsVal + "&AllowHints=" + HintsVal + "&CompTime=" + TimeVal;
  
  /*var IETimeStamp = new Date().getTime();
  
  if (navigator.appName == "Microsoft Internet Explorer")
  {
    setupXML.open("GET","setupImpl.php?"+contents+"&"+IETimeStamp,true);
    setupXML.send();
  }
  else
  {
    setupXML.open("GET","setupImpl.php?"+contents+"&"+IETimeStamp,true);
    setupXML.send();
  }*/
  setupXML.open("GET","setupImpl.php?"+contents,true);
  setupXML.send();
}

function setCompCookies()
{
  if (window.XMLHttpRequest)
  {
    setCompCookiesXML = new XMLHttpRequest();
  }
  else
  {
    setCompCookiesXML = new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  setCompCookiesXML.onreadystatechange=function()
  {
    if (setCompCookiesXML.readyState == 4 && setCompCookiesXML.status == 200)
    {
    }
  }
  var ModeValue = Mode.value;
  var NumProbsValue = NumProbs.value;
  var HintsValue = Hints.value;
  var TimeValue = Time.value;
  
  var contents = "Mode=" + ModeValue + "&NumOfProblems=" + NumProbsValue + "&AllowHints=" + HintsValue + "&CompTime=" + TimeValue;
  
  setCompCookiesXML.open("GET","setCompCookies.php?"+contents,true);
  setCompCookiesXML.send();
}

//###################################################################################################//
//                                          Team Management                                          //
//###################################################################################################//
var currentStudent = '';
var teamN = '';

//This function is called when a student is removed from a team
function setEditable(studPos)
//Precondition: studPos, Stud1, Stud2, ..., is a valid student position
//Postcondition: Username, school, and state are set to N/A,
//the student name is set to it's default, and the add button is enabled.
{

	var studentPosNum = studPos.charAt(studPos.length - 1);
    
	document.getElementById("Stud"+studentPosNum).value = "------Select a Name------";
	document.getElementById("Stud"+studentPosNum).disabled = false;
	document.getElementById("remove"+studentPosNum).disabled = true;
	document.getElementById("add"+studentPosNum).disabled = false;
	document.getElementById("Username_S"+studentPosNum).value = "N/A";
	document.getElementById("School_S"+studentPosNum).value = "N/A";
	document.getElementById("State_S"+studentPosNum).value = "N/A";
	
}

function loadTeamNameList()
//Precondition: None
//Postcondition: Produces a list of team names based on the current competition
//which can found under select a team in Team Management.
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlloadTeamNameListhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlloadTeamNameListhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlloadTeamNameListhttp.onreadystatechange=function()
  {
    if (xmlloadTeamNameListhttp.readyState==4 && xmlloadTeamNameListhttp.status==200)
    {

        document.getElementById("MTeamList").innerHTML=xmlloadTeamNameListhttp.responseText;
    }
  }
  xmlloadTeamNameListhttp.open("GET","ManageContent/loadTeamNames.php",true);
  xmlloadTeamNameListhttp.send();
}

//This function is referenced in AdminContentUpdate.js
function loadManage()
//Precondition: None
//Postcondition: Sets up the Team Management page
{
  document.getElementById("remove1").disabled=true;
  document.getElementById("remove2").disabled=true;
  document.getElementById("remove3").disabled=true;
  loadTeamNameList();
}

//This function is referenced in Content_Manage.js
function addTeam()
//Precondition: None
//Postcondition: Creates a team based on the name entered
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    addTeamXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    addTeamXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  addTeamXML.onreadystatechange=function()
  {
    if (addTeamXML.readyState == 4 && addTeamXML.status == 200)
    {
      document.getElementById("MTeamList").innerHTML=addTeamXML.responseText;
      document.getElementById("MTeamName").value='';
    }
  }
  
  var MTeamName = "MTeamName=" + document.getElementById("MTeamName").value;
  addTeamXML.open("GET","ManageContent/createTeam.php?"+MTeamName,true);
  addTeamXML.send();
}

//This function is currently not being used
function removeTeam()
//Precondition: Team exists
//Postcondition: Students on the team are removed and the team
//is removed from the current compeition.
{	
	if (teamN=="")
	{
		document.getElementById("MTeamTitle").inner.HTML="<p>Please select a team name.</p>";
		return;
	}
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		removeTeamXML=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		removeTeamXML=new ActiveXObject("Microsoft.XMLHTTP");
	}
	removeTeamXML.onreadystatechange=function()
	{
		if (removeTeamXML.readyState==4 && removeTeamXML.status==200)
		{
			loadTeamNameList();
		}
		
	}
		removeTeamhttp.open("GET","ManageContent/removeTeam.php?"+"&team=" + teamN,true);
		removeTeamhttp.send();
}

//This function is called when there is no student in a position on a team
function showStudents(studentPosNum)
//Precondition: Student posisition number must be valid 1,2,3,...
//Postcondition: Loads all the students that are in the database and are currently not on a team.
{

  var showStudentsXML = new Array();

  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    showStudentsXML[studentPosNum]=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    showStudentsXML[studentPosNum]=new ActiveXObject("Microsoft.XMLHTTP");
  }
  showStudentsXML[studentPosNum].onreadystatechange=function()
  {
    if (showStudentsXML[studentPosNum].readyState==4 && showStudentsXML[studentPosNum].status==200)
    {
      document.getElementById("Member"+studentPosNum).innerHTML=showStudentsXML[studentPosNum].responseText;
      document.getElementById("Stud"+studentPosNum).disabled = false;
      document.getElementById("remove"+studentPosNum).disabled = true;
      document.getElementById("add"+studentPosNum).disabled = false;
	  document.getElementById("Username_S"+studentPosNum).value = "N/A";
	  document.getElementById("School_S"+studentPosNum).value = "N/A";
	  document.getElementById("State_S"+studentPosNum).value = "N/A";
    }
  }
  var getVars = "q="+teamN+"&selectName=Stud"+studentPosNum;
  showStudentsXML[studentPosNum].open("GET","ManageContent/loadStudentNames.php?"+getVars,true);
  showStudentsXML[studentPosNum].send();

}

//This function is called when a team name is clicked.
//This function is referenced in loadTeamNames.php and createTeam.php
function loadStudentInfo(element)
//Precondition: The team name of the selection must be passed
//The student's name, username, school, and state are returned and placed in the appropriate element on the team management page
{

  teamN = element.value;
  
  if (teamN=="")//If no team is currently selected
  {
    document.getElementById("MTeamTitle").innerHTML="<p>Please select a team name.</p>";
    return;
  }
  else
  {
    document.getElementById("MTeamTitle").innerHTML="Team "+teamN;//Places the team name below the Team Information heading in Team Management
  }
	
  var studPos;
  var studentPosNum = 1;
  
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
	loadStudentsXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
	loadStudentsXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
	  loadStudentsXML.onreadystatechange=function()
	  {
		if (loadStudentsXML.readyState==4 && loadStudentsXML.status==200)
		{
		    if(studentPosNum < 4)
			{
			  
					if(loadStudentsXML.responseText == '')
					{
						switch(studentPosNum)
						{
							case 1:
								showStudents(studentPosNum);
							break;
							case 2:
								showStudents(studentPosNum);
							break;
							case 3:
								showStudents(studentPosNum);
							break;
						}

					}
					else
					{
						//alert(studentPosNum + " " + loadStudentsXML.responseText);
					
						
						loadStudName(loadStudentsXML.responseText, studPos);
						getUserName(loadStudentsXML.responseText, studentPosNum);
						getSchool(loadStudentsXML.responseText, studentPosNum);
						getState(loadStudentsXML.responseText, studentPosNum);
						document.getElementById("remove"+studentPosNum).disabled = false;
						document.getElementById("add"+studentPosNum).disabled = true;
					}
					
				studentPosNum++;
				studPos = "Stud" + studentPosNum;
				var getVars = "q="+teamN+"&studName="+studPos;
				loadStudentsXML.open("GET","ManageContent/getFullStudentName.php?"+getVars,true);
				loadStudentsXML.send();
			}
			
			
		}
	  }
	  
	  studPos = "Stud" + studentPosNum;
	  var getVars = "q="+teamN+"&studName="+studPos;
	  loadStudentsXML.open("GET","ManageContent/getFullStudentName.php?"+getVars,true);
	  loadStudentsXML.send();
}

//This function is called when a team is selected
//and has students on the team.
function loadStudName(studentName, studPos)
//Precondition: Student position, Stud1, Stud2, ..., must be valid and a team must be selected
//Postcondition: Student name is placed in an option which is then disabled
//for viewing purposes.
{

	switch(studPos)
	{
		case 'Stud1':
			member = 'Member1';
			break;
		case 'Stud2':
			member = 'Member2';
			break;
		case 'Stud3':
			member = 'Member3';
			break;
		default:
			alert("Error from loadStudName in admin.js");
			
	}

  if (teamN=="")
  {
	//document.getElementById("txtHint").innerHTML="";
	return;
  } 
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
	loadStudNameXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
	loadStudNameXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  loadStudNameXML.onreadystatechange=function()
  {
	if (loadStudNameXML.readyState==4 && loadStudNameXML.status==200)
	{
			document.getElementById(member).innerHTML=loadStudNameXML.responseText;
			document.getElementById(studPos).disabled = true;
	}
  }
  var getVars = "q="+studentName+"&studName="+studPos;
  loadStudNameXML.open("GET","ManageContent/studentNameLoad.php?"+getVars,true);
  loadStudNameXML.send();

}

//This function is called when a student is either added or removed from a team.
function refreshTeamInfo(element)
//Precondition: Student position must be provided such as Stud1, Stud2, etc
//Postcondition: Refreshes the other students provided that there are no students in the team slots
{
  if (teamN=="")
  {
    document.getElementById("MTeamTitle").innerHTML="<p>Please select a team name.</p>";
    return;
  }
  else
  {
    document.getElementById("MTeamTitle").innerHTML="Team "+teamN;
  } 
      
	if(document.getElementById("Stud1").disabled == false)
	{
	  showStudents(1);
	}
	if (document.getElementById("Stud2").disabled == false)
	{
	  showStudents(2);
	}
	if (document.getElementById("Stud3").disabled == false)
	{
	  showStudents(3);
	}
}
//This function is referenced in loadStudentNames.php and studentNameLoad.php
function currentSelection(element, currentStudPos)
//Precondition: The student's name must be passed as well as the currentStudPosition such as stud1, stud2, etc.
//Postcondition: Calls the appropriate functions to display the student's username, school, and state.
{
  currentStudent = element.value;
  studentPos = currentStudPos.charAt(currentStudPos.length - 1);

  getUserName(currentStudent, studentPos);
  getSchool(currentStudent, studentPos);
  getState(currentStudent, studentPos);
}

//This function is called when a team has a student in a given position.
function getUserName(student, studentPosNum)
//Precondition: Student name in the form lastName, firstName must be provided as well as the students position number such as 1, 2, 3...
//Postcondition: Places the student's username in the correct field on the Team Management page
{
	var userN;
	var getUserNameXML = new Array();
	
	if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
      getUserNameXML[studentPosNum]=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
      getUserNameXML[studentPosNum]=new ActiveXObject("Microsoft.XMLHTTP");
    }
    getUserNameXML[studentPosNum].onreadystatechange=function()
    {
      if (getUserNameXML[studentPosNum].readyState==4 && getUserNameXML[studentPosNum].status==200)
      {
			document.getElementById("Username_S"+studentPosNum).value=getUserNameXML[studentPosNum].responseText;

      }
    }
	
	getUserNameXML[studentPosNum].open("GET","ManageContent/getStudentUserName.php?currStudent="+student,true);
    getUserNameXML[studentPosNum].send();
}

//This function is called when a team has a student in a given position.
function getSchool(student, studentPosNum)
//Precondition: Student name in the form lastName, firstName must be provided as well as the students position number such as 1, 2, 3...
//Postcondition: Places the student's school in the correct field on the Team Management page
{

	var getSchoolXML = new Array();
	
	if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
      getSchoolXML[studentPosNum]=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
      getSchoolXML[studentPosNum]=new ActiveXObject("Microsoft.XMLHTTP");
    }
    getSchoolXML[studentPosNum].onreadystatechange=function()
    {
      if (getSchoolXML[studentPosNum].readyState==4 && getSchoolXML[studentPosNum].status==200)
      {
			document.getElementById("School_S"+studentPosNum).value=getSchoolXML[studentPosNum].responseText;
      }
    }
    getSchoolXML[studentPosNum].open("GET","ManageContent/getStudentSchool.php?currStudent="+student,true);
    getSchoolXML[studentPosNum].send();
}

//This function is called when a team has a student in a given position.
function getState(student, studentPosNum)
//Precondition: Student name in the form lastName, firstName must be provided as well as the students position number such as 1, 2, 3...
//Postcondition: Places the student's state in the correct field on the Team Management page
{

	var getStateXML = new Array();

	if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
      getStateXML[studentPosNum]=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
      getStateXML[studentPosNum]=new ActiveXObject("Microsoft.XMLHTTP");
    }
    getStateXML[studentPosNum].onreadystatechange=function()
    {
      if (getStateXML[studentPosNum].readyState==4 && getStateXML[studentPosNum].status==200)
      {		
			document.getElementById("State_S"+studentPosNum).value=getStateXML[studentPosNum].responseText;
      }
    }
    getStateXML[studentPosNum].open("GET","ManageContent/getStudentState.php?currStudent="+student,true);
    getStateXML[studentPosNum].send();
}

//This function is referenced in Content_Manage.js
function addRemoveStudent(userN, studPos)
//Precondition: Valid username and student position must be provided.
//Postcondition: Student is either added or removed from a team.
{

  var selectElement = document.getElementById(studPos);
  var selectUser = document.getElementById(userN).value;
  var selectStud = studPos;
  var removeSelected;
  var addSelected;
  var studentPosNum;
  var xmladdRemoveStudenthttp = new Array();
  
  if(selectStud == "Stud1")
  {
		removeSelected = "remove1";
		addSelected = "add1";
		studentPosNum = 1;
  }
  else if(selectStud == "Stud2")
  {
		removeSelected = "remove2";
		addSelected = "add2";
		studentPosNum = 2;
  }
  else
  {
		removeSelected = "remove3";
		addSelected = "add3";
		studentPosNum = 3;
  }

  if(document.getElementById(removeSelected).disabled)
  {
	  if(currentStudent == "------Select a Name------" || currentStudent == '')
	  {
		alert("That is not a valid selection");
	  }
	  else
	  {
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmladdRemoveStudenthttp[studentPosNum]=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
		  xmladdRemoveStudenthttp[studentPosNum]=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmladdRemoveStudenthttp[studentPosNum].onreadystatechange=function()
		{
		  if (xmladdRemoveStudenthttp[studentPosNum].readyState==4 && xmladdRemoveStudenthttp[studentPosNum].status==200)
		  {
		    //refreshTeamInfo(selectElement);
		    document.getElementById(selectStud).disabled=true;
			document.getElementById(addSelected).disabled=true;
			document.getElementById(removeSelected).disabled=false;
			refreshTeamInfo(selectElement);
		
		  }
		}
		
		xmladdRemoveStudenthttp[studentPosNum].open("GET","ManageContent/placeStudentOnTeam.php?userN="+selectUser + "&team=" + teamN + "&studNum="+selectStud,true);
		xmladdRemoveStudenthttp[studentPosNum].send();
		currentStudent='------Select a Name------';
		
	  }
  }
  else 
  {
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmladdRemoveStudenthttp[studentPosNum]=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
		  xmladdRemoveStudenthttp[studentPosNum]=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmladdRemoveStudenthttp[studentPosNum].onreadystatechange=function()
		{
		  if (xmladdRemoveStudenthttp[studentPosNum].readyState==4 && xmladdRemoveStudenthttp[studentPosNum].status==200)
		  {
		    //alert(xmladdRemoveStudenthttp[studentPosNum].responseText);
			
			setEditable(selectStud);
			refreshTeamInfo(selectElement);
		  }
		}
		xmladdRemoveStudenthttp[studentPosNum].open("GET","ManageContent/removeStudentFromTeam.php?userN="+selectUser + "&team=" + teamN + "&studNum="+selectStud,true);
		xmladdRemoveStudenthttp[studentPosNum].send();
		currentStudent='------Select a Name------';
	
  }
	
}

//###################################################################################################//
//                                        Progress/Statistics                                        //
//###################################################################################################//
function showTableProg()
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      document.getElementById("PTeamTables").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("GET","ProgressContent/progressImpl.php",true);
  xmlhttp.send();
}

//###################################################################################################//
//                                               Hints                                               //
//###################################################################################################//

var hintsEnabled;

function setHintState()
{
	//alert("recieving now");
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    setHintStateXml=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    setHintStateXml=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  setHintStateXml.onreadystatechange=function()
  {
    if (setHintStateXml.readyState==4 && setHintStateXml.status==200)
    {
       if(setHintStateXml.responseText != "SET")
	   {
			hintsEnabled = false;
			// alert("Hints: " + setHintStateXml.responseText);
			// document.getElementById("SendPreDef").disabled = true;
			// document.getElementById("SendCustom").disabled = true;
			// document.getElementById("CustomHint").disabled = true;
			// document.getElementById("HHintNum").disabled = true;
			// document.getElementById("hintCountClear").disabled = true;
	   }
	   else
		hintsEnabled = true;
    }
  }
  setHintStateXml.open("GET","HintsContent/hintsState.php",true);
  setHintStateXml.send();
}

function sendHintsCust(str)
{
  if(hintsEnabled)
  {
	  if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	  }
	  else
	  {// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  xmlhttp.onreadystatechange=function()
	  {
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
		  document.getElementById("CustomHint").value='';
		}
	  }
	  
	  //var Hints = document.getElementById("customHint").value;

	  xmlhttp.open("GET","HintsContent/sendCustom.php?customHint="+str,true);
	  xmlhttp.send();
	}
	else
		document.getElementById("CustomHint").value="Hints have been disabled. Please create a competition with hints enabled";
}

var currProblemSelected = '';

function showPre(str)
{
	
  currProblemSelected = str;
	

  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    showPreXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    showPreXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  showPreXML.onreadystatechange=function()
  {
    if (showPreXML.readyState==4 && showPreXML.status==200)
    {
      document.getElementById("HintNum").innerHTML=showPreXML.responseText;
    }
  }

  showPreXML.open("GET","HintsContent/showPreDefHints.php?hintPreDef="+str,true);
  showPreXML.send();
  
}

var lastHintSelected = '';

function showPreHintText(str)
{

	  lastHintSelected = str;
	  if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
		showPreTextXML=new XMLHttpRequest();
	  }
	  else
	  {// code for IE6, IE5
		showPreTextXML=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  showPreTextXML.onreadystatechange=function()
	  {
		if (showPreTextXML.readyState==4 && showPreTextXML.status==200)
		{
				document.getElementById("HintText").innerHTML=showPreTextXML.responseText;
		   
		}
	  }

	  showPreTextXML.open("GET","HintsContent/showPreDefHintText.php?problemSelected="+currProblemSelected + "& =" + str,true);
	  showPreTextXML.send();

}


function sendHintPreDef()
{
	if(hintsEnabled)
	{
	  if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlsendHintPreDefhttp=new XMLHttpRequest();
	  }
	  else
	  {// code for IE6, IE5
		xmlsendHintPreDefhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }

	   xmlsendHintPreDefhttp.onreadystatechange=function()
	  {
		if (xmlsendHintPreDefhttp.readyState==4 && xmlsendHintPreDefhttp.status==200)
		{
		  document.getElementById("HintText").innerHTML=xmlsendHintPreDefhttp.responseText;
		  //document.getElementById("HintText").innerHTML=xmlsendHintPreDefhttp.responseText;
		   
		}
	  }
	  
	  xmlsendHintPreDefhttp.open("GET","HintsContent/sendPre.php?problemSelected="+currProblemSelected + "&hintSlected=" + lastHintSelected,true);
	  xmlsendHintPreDefhttp.send();
	 
	}
	else
		document.getElementById("HintText").innerHTML="<p>Hints have been disabled. Please create a competition with hints enabled</p>";
}

function loadProblemNames()
{
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
		loadProblemNamesXML=new XMLHttpRequest();
	  }
	  else
	  {// code for IE6, IE5
		loadProblemNamesXML=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	  loadProblemNamesXML.onreadystatechange=function()
	  {
		if (loadProblemNamesXML.readyState==4 && loadProblemNamesXML.status==200)
		{
		  document.getElementById("probNames").innerHTML=loadProblemNamesXML.responseText;
		}
	  }

	  loadProblemNamesXML.open("GET","HintsContent/getProbNames.php",true);
	  loadProblemNamesXML.send();
}

function setupCompetition()
{
  if (STOPPED)
  {
    startCompetition();
	}
	startTimer();
}

//User Status Check
///////////////////////////////////////////////////////////////////////////////////////
function AdminLoadCheck()
{
	//checkActiveCompetition()
	getActiveCompetition();
	setInterval(checkUserStatus,1000);
}

function checkUserStatus()
{
	//alert("It's working");
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		checkUsersXML=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		checkUsersXML=new ActiveXObject("Microsoft.XMLHTTP");
  	}
	
	
	checkUsersXML.onreadystatechange=function()
	{
		if (checkUsersXML.readyState==4 && checkUsersXML.status==200)
		{
		}
	}
	checkUsersXML.open("GET","UserCheck.php",true);
	checkUsersXML.send();
}

function getActiveCompetition()
{
	var var_count = 1;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		activeCompXML=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		activeCompXML=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	
	activeCompXML.onreadystatechange=function()
	{
		if (activeCompXML.readyState==4 && activeCompXML.status==200)
		{
			switch(var_count)
			{
        case 1:
					compSetID = activeCompXML.responseText;
					if (compSetID.length == 8)
					{
            getMasterTime();
          }
          else
          {
            compSetID = '';
            var_count = 7;
          }
					break;
				case 2:
					compSetMode = activeCompXML.responseText;
					break;
				case 3:
					compSetProblems = activeCompXML.responseText;
					break;
				case 4:
					compSetHints = activeCompXML.responseText;
					break;
				case 5:
					compSetTime = activeCompXML.responseText;
					break;
				case 6:
					compSetLanguage = activeCompXML.responseText;
					break;
			}
			var_count++;
			if (var_count < 7)
			{
        activeCompXML.open("GET","getCompInfo.php?varNum="+var_count,true);
        activeCompXML.send();
      }
		}
	}
	activeCompXML.open("GET","getCompInfo.php?varNum="+var_count,true);
	activeCompXML.send();
}

function getMasterTime()
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		getTimerXML=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		getTimerXML=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	getTimerXML.onreadystatechange=function()
	{
		if (getTimerXML.readyState==4 && getTimerXML.status==200)
		{
			var time = getTimerXML.responseText;
			  if (time.length > 3)
			  {
				  s = time.substring(time.length-2,time.length);
				  m = time.substring(0,time.length-2);
				  document.getElementById("header-timer").innerHTML=m+":"+s;
			  }
			  else
			  {
				  //A competition has not been created.
			  }
		}
	}
	getTimerXML.open("GET","AdminCompContent/getMasterTime.php?compID="+compSetID,true);
	getTimerXML.send();
}