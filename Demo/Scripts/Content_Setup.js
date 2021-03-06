var string_Setup = '<div id="CompMain" align=center>';
string_Setup +=  '  <h1>Competition Setup</h1>';
string_Setup +=  '  <div id="CsetupForm" align=center>';
string_Setup +=  '    <form onSubmit="event.preventDefault(); createCompetition(); return false;" method="GET">';
string_Setup +=  '    ';
string_Setup +=  '      Select Language:<br>';
string_Setup +=  '      <select name="Language" id="Language" class="Cselect">';
string_Setup +=  '        <option value=0>Java</option>';
string_Setup +=  '        <option value=1>C++</option>';
string_Setup +=  '      </select><br>';
string_Setup +=  '';
string_Setup +=  '      Select Mode:<br>';
string_Setup +=  '      <select name="Mode" id="Mode" class="Cselect">';
string_Setup +=  '        <option value=0>Requirements & Code</option>';
string_Setup +=  '        <option value=1>Requirements, Code, & Code Coverage</option>';
string_Setup +=  '      </select><br>';
string_Setup +=  '';
string_Setup +=  '      Select Number of Problems:<br>';
string_Setup +=  '      <select name="NumOfProblems" id="NumOfProblems" class="Cselect">';
string_Setup +=  '        <option value=1>1</option>';
string_Setup +=  '        <option value=2>2</option>';
string_Setup +=  '        <option value=3>3</option>';
string_Setup +=  '        <option value=4>4</option>';
string_Setup +=  '        <option value=5>5</option>';
string_Setup +=  '      </select><br>';
string_Setup +=  '';
string_Setup +=  '      Allow Hints:<br>';
string_Setup +=  '      <select name="AllowHints" id="AllowHints" class="Cselect">';
string_Setup +=  '        <option value=1>YES</option>';
string_Setup +=  '        <option value=0>NO</option>';
string_Setup +=  '      </select><br>';
string_Setup +=  '';
string_Setup +=  '      Competition Time (mins):<br>';
string_Setup +=  '      <input name="CompTime" id="CompTime" class="Ctext"><br>';
string_Setup +=  '';
string_Setup +=  '      <input type="submit" value="Setup Competition" name="submit" id="submit" class="Cbutton"><br><br>';
string_Setup +=  '    </form>';
string_Setup +=  '  </div>';
string_Setup +=  '</div>';
string_Setup +=  '<div id="CompRight" align=center>';
string_Setup +=  '  <h1>Selected Settings</h1>';
string_Setup +=  '  <div id="CsettingsForm" align=center>';
string_Setup +=  '    Language:<br>';
string_Setup +=  '    <input name="LanguageSet" id="LanguageSet" class="Ctext" disabled><br>';
string_Setup +=  '';
string_Setup +=  '    Mode:<br>';
string_Setup +=  '    <input name="ModeSet" id="ModeSet" class="Ctext" disabled><br>';
string_Setup +=  '';
string_Setup +=  '    Number of Problems:<br>';
string_Setup +=  '    <input name="NumOfProblemsSet" id="NumOfProblemsSet" class="Ctext" disabled><br>';
string_Setup +=  '';
string_Setup +=  '    Hints Allowed:<br>';
string_Setup +=  '    <input name="AllowHintsSet" id="AllowHintsSet" class="Ctext" disabled><br>';
string_Setup +=  '';
string_Setup +=  '    Competition Time(mins):<br>';
string_Setup +=  '    <input name="CompTimeSet" id="CompTimeSet" class="Ctext" disabled><br>';
string_Setup +=  '    ';
string_Setup +=  '    Competition ID:<br>';
string_Setup +=  '    <input name="CompIDSet" id="CompIDSet" class="Ctext" disabled><br>';
string_Setup +=  '  </div>';
string_Setup +=  '</div>';
