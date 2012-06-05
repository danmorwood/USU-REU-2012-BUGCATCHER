/*
Table of Contents
	1.	Global Variables ---------- GV1000
		1.1 hasFinished			  ---------- GV1001
		1.2 currProblem		      ---------- GV1002
		1.3 coverage			  ---------- GV1003
		1.4 prevFound			  ---------- GV1004
		1.5 t1					  ---------- GV1005
		1.6 t2					  ---------- GV1006
		1.7 t3					  ---------- GV1007
		1.8 t4				      ---------- GV1008
		1.9 pingCount		      ---------- GV1009
	2.  General 		---------- G1000 
		2.1 getWinningTeams		  ---------- G1001
		2.2 getCompID		      ---------- G1002
		2.3 instantMessaging	  ---------- G1003
		2.4 recieve				  ---------- G1004
		2.5 setCodeCoverageState  ---------- G1005
	3.  Probs and Reqs  ---------- PR1000
		3.1 getReqAndProb		  ---------- PR1001
		3.2 getReq				  ---------- PR1002
		3.3 getProb				  ---------- PR1003
	4.  Bugs found 				  ---------- BF1000
		4.1 getBugs				  ---------- BF1001
	5.  Competition     ---------- C1000
		5.1 hasCompStarted		  ---------- C1001
		5.2 stopComp			  ---------- C1002
		5.3 checkCompFinished	  ---------- C1003
	6.  Initialization  ---------- I1000
		6.1 initialize			  ---------- I1001
	7.  Server Ping 	---------- SP1000 
		7.1 pingServer		      ---------- SP1001
*/

//###################################################################################################//
//                                         Global Variables GV1000                                   //
//###################################################################################################//

var hasFinished = 0;  //Find Code ---------- GV1001

//Problems and requierments
var currProblem = ''; //Find Code ---------- GV1002
var coverage = '';	  //Find Code ---------- GV1003

//Bugs found
var prevFound = 0;	  //Find Code ---------- GV1004

//Competition
var t1;		 		  //Find Code ---------- GV1005
var t2;				  //Find Code ---------- GV1006
var t3;				  //Find Code ---------- GV1007
var t4;			      //Find Code ---------- GV1008

//Server ping
var pingCount = 0;	  //Find Code ---------- GV1009

//###################################################################################################//
//                                             General G1000                                         //
//###################################################################################################//

//This function is called in the initialize function below
//Precondition: Student must be in a valid compeition
//Postcondition: Lists the top three teams on the student side
function getWinningTeams()//Find Code ---------- G1001
{
  var compID;
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    getWinningTeams=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    getWinningTeams=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  getWinningTeams.onreadystatechange=function()
  {
    if (getWinningTeams.readyState==4 && getWinningTeams.status==200)
    {
      document.getElementById("header-winningteams").innerHTML=getWinningTeams.responseText;
    }
  }
  getWinningTeams.open("GET","StudentContent/showWinningTeams.php",true);
  getWinningTeams.send();
}

//Precondition: Student must be in a valid compeition
//Postcondition: Returns the competition id of the current compeition
function getCompID()//Find Code ---------- G1002
{
  var compID;
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    getCompIDXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    getCompIDXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  getCompIDXML.onreadystatechange=function()
  {
    if (getCompIDXML.readyState==4 && getCompIDXML.status==200)
    {
      //document.getElementById("header-middle").innerHTML="<h1> Competition ID: " + displayCompIDXML.responseText + "</h1>";
	  return getCompIDXML.responseText;
    }
  }
  getCompIDXML.open("GET","StudentContent/getCompIDFromStudent.php",true);
  getCompIDXML.send();
}

//Precondition: Student must be on a team 
//Postcondition: Pushes the message to the appropriate team content file.
function instantMessaging(message)//Find Code ---------- G1003
{
  var compTime;
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    instantMessagingXML=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    instantMessagingXML=new ActiveXObject("Microsoft.XMLHTTP");
  }
  instantMessagingXML.onreadystatechange=function()
  {
    if (instantMessagingXML.readyState==4 && instantMessagingXML.status==200)
    {
	   document.getElementById("ChatInput").value="";
    }
  }
  instantMessagingXML.open("GET","StudentContent/instantMessaging.php?string="+message,true);
  instantMessagingXML.send();
}

//This function is called in the initialize function below
//Precondition: Student must be on a team and compeition must be valid
//Postcondition: Recieves the team content file and displays the contents
function recieve()//Find Code ---------- G1004
{
  //alert("recieving now");
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    loadInfoRecieve=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    loadInfoRecieve=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  loadInfoRecieve.onreadystatechange=function()
  {
    if (loadInfoRecieve.readyState==4 && loadInfoRecieve.status==200)
    {
       document.getElementById("ResultsList").innerHTML=loadInfoRecieve.responseText;
    }
  }
  loadInfoRecieve.open("GET","StudentContent/recieve.php",true);
  loadInfoRecieve.send();
}

//This function is called in the initialize function below
//Precondition: Competition must be valid
//Postcondition: Disables the radio buttons if code coverage is disabled
function setCodeCoverageState()//Find Code ---------- G1005
{
	//alert("recieving now");
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    setCodeCoverageStateXml=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    setCodeCoverageStateXml=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  setCodeCoverageStateXml.onreadystatechange=function()
  {
    if (setCodeCoverageStateXml.readyState==4 && setCodeCoverageStateXml.status==200)
    {
       if(setCodeCoverageStateXml.responseText != "SET")
	   {
			//alert("The admin has disabled code coverage");
			document.getElementById("radio1").disabled = true;
			document.getElementById("radio2").disabled = true;
	   }
    }
  }
  setCodeCoverageStateXml.open("GET","StudentContent/codeCoverageState.php",true);
  setCodeCoverageStateXml.send();
}

function loadStudentProblems()
{
  alert("Called loadStudentProblems.php");
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlloadStudentProblems=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlloadStudentProblems=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  xmlloadStudentProblems.onreadystatechange=function()
  {
    if (xmlloadStudentProblems.readyState == 4 && xmlloadStudentProblems.status == 200)
    {
		//document.getElementById('SelectedProblems').innerHTML=xmlloadStudentProblems.responseText;
                var arr = eval(xmlloadStudentProblems.responseText);
                alert(arr[0]);
                
                for(var i = 1; i <= arr[0]; i++)
                {
                    document.getElementById("Prob" + i).innerHTML = arr[i + 1];
                }
		
    }
  }
  
  xmlloadStudentProblems.open("GET","StudentContent/loadStudProbs.php",true);
  xmlloadStudentProblems.send();
}

//###################################################################################################//
//                                     Problems and Requirements PR1000                              //
//###################################################################################################//

//This function is referenced in Student.html
//This function takes the problem number as a string such as problem1, problem2, and so on. 
//The function also takes a bool, cov, true if coverage is enabled false otherwise
//Precondition: Problem and coverage files must exist
//Postcondition: The appropriate functions are called to set up the problems that will be seen by the students.
function getReqAndProb(str, cov)//Find Code ---------- PR1001
{
	getProb(str, cov);
	getReq(str);
	currProblem = str;
	coverage = cov;
}

//This function is called in the function getReqAndProb look up 
//Precondition: Competition must be valid and started
//Postcondition: Displays the requirements of the problem that was selected.
function getReq(str)//Find Code ---------- PR1002
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    loadInfoGetReq=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    loadInfoGetReq=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  loadInfoGetReq.onreadystatechange=function()
  {
    if (loadInfoGetReq.readyState==4 && loadInfoGetReq.status==200)
    {
	  if(hasFinished == 0)
	  {
		document.getElementById("RequirementsList").innerHTML=loadInfoGetReq.responseText;
	  }
	  else
	  {
		document.getElementById("RequirementsList").innerHTML="This competition has concluded";
	  }
    }
  }
  loadInfoGetReq.open("GET","StudentContent/showCodeReq.php?problem="+str,true);
  loadInfoGetReq.send();
}

//This function is called in the function getReqAndProb look up 
//Precondition: Competition must be valid and started
//Postcondition: Displays the problem that the student selected
function getProb(str, cov)//Find Code ---------- PR1003
{
  
  //currProblem = str;
  
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    loadInfoGetProb=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    loadInfoGetProb=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  loadInfoGetProb.onreadystatechange=function()
  {
    if (loadInfoGetProb.readyState==4 && loadInfoGetProb.status==200)
    {
	  if(hasFinished == 0)
	  {
		document.getElementById("ProblemCode").innerHTML=loadInfoGetProb.responseText;
		prettyPrint();
	  }
	  else
	  {
		document.getElementById("ProblemCode").innerHTML="This competition has concluded";
	  }
    }
  }
  loadInfoGetProb.open("GET","StudentContent/showCode.php?problem="+str+"&coverage="+cov,true);
  loadInfoGetProb.send();
}

//###################################################################################################//
//                                             Bugs found BF1000  	                                 //
//###################################################################################################//

//This function is called in the initialize function below
//Precondition: Competition must be valid and student must be on a team
//Postcondition: Displays a team's bugs found
function getBugs()//Find Code ---------- BF1001
{

  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    loadInfoGetBugs=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    loadInfoGetBugs=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  loadInfoGetBugs.onreadystatechange=function()
  {
    if (loadInfoGetBugs.readyState==4 && loadInfoGetBugs.status==200)
    {
	  //alert(loadInfoGetBugs.responseText);
      document.getElementById("BugsFoundText").innerHTML=loadInfoGetBugs.responseText;
    }
  }
  
  loadInfoGetBugs.open("GET","StudentContent/getBugsFound.php",true);
  loadInfoGetBugs.send();
}


//###################################################################################################//
//                                             Competition C1000  	                                 //
//###################################################################################################//

//This function is called in the initialize function below
function hasCompStarted()//Find Code ---------- C1001
//Precondition: Compeition must be valid
//Postcondition: Checks to see if the competition has started and sets up the competition if the response text = 1
{

	//alert("recieving now");
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    sethasCompStartedXml=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    sethasCompStartedXml=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  sethasCompStartedXml.onreadystatechange=function()
  {
    if (sethasCompStartedXml.readyState==4 && sethasCompStartedXml.status==200)
    {
       if(sethasCompStartedXml.responseText == 1)
	   {
			//alert("The admin has disabled code coverage");
			document.getElementById("testforBug").disabled = false;
			document.getElementById("testInput").disabled = false;
			document.getElementById("testOutput").disabled = false;
			clearInterval(t1);
			currProblem = 1;
			getProb(currProblem);
			getCompID();
			createTimer();
			loadStudentProblems();
	   }
	   else
	   {
			//alert(sethasCompStartedXml.responseText);
			document.getElementById("testforBug").disabled = true;
			document.getElementById("testInput").disabled = true;
			document.getElementById("testOutput").disabled = true;
	   }
    }
  }
  sethasCompStartedXml.open("GET","StudentContent/checkCompStart.php",true);
  sethasCompStartedXml.send();

}


function stopComp()//Find Code ---------- C1002
//Precondition: Competition must be valid and time must be 0
//Postcondition: Stops the competition
{

		//alert("recieving now");
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    stopCompXml=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    stopCompXml=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  stopCompXml.onreadystatechange=function()
  {
    if (stopCompXml.readyState==4 && stopCompXml.status==200)
    {
			//alert(stopCompXml.responseText);
			document.getElementById("testforBug").disabled = true;
			document.getElementById("testInput").disabled = true;
			document.getElementById("testOutput").disabled = true;
			hasFinished = 1;
			getReqAndProb(currProblem);
    }
  }
  stopCompXml.open("GET","StudentContent/stopCompOnEnd.php",true);
  stopCompXml.send();


}

function checkCompFinished()//Find Code ---------- C1003
{
	
		//alert("recieving now");
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    checkCompFinishedXml=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    checkCompFinishedXml=new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  checkCompFinishedXml.onreadystatechange=function()
  {
    if (checkCompFinishedXml.readyState==4 && checkCompFinishedXml.status==200)
    {
		//alert(checkCompFinishedXml.responseText);
       if(checkCompFinishedXml.responseText == 0)
	   {
			//alert("The admin has disabled code coverage");
			document.getElementById("testforBug").disabled = false;
			document.getElementById("testInput").disabled = false;
			document.getElementById("testOutput").disabled = false;
	   }
	   else
	   {
			//alert(checkCompFinishedXml.responseText);
			document.getElementById("testforBug").disabled = true;
			document.getElementById("testInput").disabled = true;
			document.getElementById("testOutput").disabled = true;
			clearInterval(t1);
			clearInterval(t2);
			clearInterval(t3);
			document.getElementById("ResultsList").innerHTML="This competition has concluded";
			hasFinished = 1;
			getReqAndProb(currProblem);
	   }
    }
  }
  checkCompFinishedXml.open("GET","StudentContent/hasCompFinished.php",true);
  checkCompFinishedXml.send();
	
}

//###################################################################################################//
//                Initialization - all things that need to be done onLoad go here I000	             //
//###################################################################################################//

//This function is referenced in Student.html
//Precondition: None
//Postcondtion: Sets up the student side
function initialize()//Find Code ---------- I1000
{
	setCodeCoverageState();
    prettyPrint();
	//getBugs();
	createStudentTimer();
	t2 = setInterval(getBugs,3000);
	t5 = setInterval(getWinningTeams, 6000);
	t1 = setInterval(hasCompStarted, 500);
	t3 = setInterval(recieve,500);
	t4 = setInterval(pingServer,500);
	checkCompFinished();
}


//###################################################################################################//
//                                            Server Ping SP1000                                     //
//###################################################################################################//


//Pings the server at a given interval to indicate user account activity
//Precondition: Student must be loged in
//Postcondition: Pings the server to check if the student is active
function pingServer()//Find Code ---------- SP1001
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		pingXML=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		pingXML=new ActiveXObject("Microsoft.XMLHTTP");
  	}
	
	
	pingXML.onreadystatechange=function()
	{
		if (pingXML.readyState==4 && pingXML.status==200)
		{
		}
	}
	
	pingCount++;
	pingXML.open("GET","PingImpl.php?pingCount="+pingCount,true);
	pingXML.send();
}