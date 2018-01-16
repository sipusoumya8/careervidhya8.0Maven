<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ page import="java.util.*" %>
    <%@ page import="cv.models.CVStudent" %>
    <%@ page import="cv.models.Admin" %>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>




<%
String name;

Admin admin=(Admin)request.getSession().getAttribute("admin");
name=admin.getName();
%>
<script type="text/javascript">
var batchNos=[];
var adminName='<%=name%>';

</script>

<script src='https://code.responsivevoice.org/responsivevoice.js'></script>

	<title>Admin DashBoard</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<meta name="viewport" content="width=device-width, initial-scale=1">

   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="<c:url value="/resources/js/ajaxOp.js"/>"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	
	
	   <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/adminDashBoard.css"/>"/>
	   <style>
	   
	   #skitt-toggle-button{
	   float:right !important;
	   }
        .navbar-default .navbar-nav>.active> a, 
			.navbar-default .navbar-nav>.active> a:focus, 
			.navbar-default .navbar-nav>.active> a:hover
        {
            color:white !important;
            text-transform:uppercase !important;
            font-size:12px !important;
            background-color:#ff6666 !important;
        }

    </style>
    
        <style>
			#chat,#chat:after,.chatbox
			{
				transition:all .4s ease-in-out
			}
			#chat,#close-chat,.minim-button,.maxi-button,.chat-text
			{
				font-weight:700;
				cursor:pointer;
				font-family:Arial,sans-serif;
				text-align:center;
				height:20px;
				line-height:20px;
			}
			#chat,#close-chat,.chatbox
			{
				border:1px solid #A8A8A8;
			}
			#chat:after,#chat:before
			{
				position:absolute;
				border-style:solid;
				content:"";
			}
			.chatbox
			{
				position:fixed;
				bottom:0;
				right:20px;
				margin:0 0 -450px;
				background-color:#00a69c;
				border-color:#00a69c;
				border-bottom:none;
				border-top-left-radius:5px;
				border-top-right-radius:5px;
				padding:28px 2px 0px 2px; 
				z-index:100000
			}
			#close-chat
			{
				position:absolute;
				top:2px;
				right:2px;
				font-size:24px;
				border:1px solid #dedede;
				width:20px;
				background:#fefefe;
				z-index:2
			}
			#minim-chat,#maxi-chat
			{
				position:absolute;
				top:0;
				left:0;
				width:100%;
				height:20px;
				line-height:20px;
				cursor:pointer;
				z-index:1
			}
			.minim-button
			{
				position:absolute;
				top:2px;
				right:26px;
				font-size:24px;
				border:1px solid #dedede;
				width:20px;
				background:#fefefe
			}
			.maxi-button
			{
				position:absolute;
				top:2px;
				right:26px;
				font-size:24px;
				border:1px solid #dedede;
				width:20px;
				background:#fefefe;
			}
			.chat-text
			{
				position:absolute;
				top:5px;
				left:10px;
				color:#fff;
				font-size:16px;
			}
			#chat
			{
				width:10%;
				height:30px !important;
				position:fixed;
				top:10;
				right:0 !important;
				margin-top:0.5%;
				margin-right:2%;
				border-radius:3px;
				border-color:#00a69c;
				padding:5px 8px 5px 8px;
				font-size:12px;
				background-color:#00a69c;
				color:#fff;
				z-index:1;
				-webkit-transform:translateZ(0);
				transform:translateZ(0)
			}
			#chat:before
			{
				border-width:10px 11px 0 0;
				border-color:#A8A8A8 transparent transparent;
				left:7px;
				bottom:-10px
			}
			#chat:after
			{
				border-width:9px 8px 0 0;
				border-color:#00a69c transparent transparent;
				left:8px;
				bottom:-8px
			}
			#chat:hover
			{
				background:#ff6666;
				border-color:#ff6666;
				-webkit-animation-name:hvr-pulse-grow;
				animation-name:hvr-pulse-grow;
				-webkit-animation-duration:.3s;
				animation-duration:.3s;
				-webkit-animation-timing-function:linear;
				animation-timing-function:linear;
				-webkit-animation-iteration-count:infinite;
				animation-iteration-count:infinite;
				-webkit-animation-direction:alternate;
				animation-direction:alternate
			}
			#chat:hover:after
			{
				border-color:#ff6666 transparent transparent transparent !important;
				background-color:#ff6666 transparent transparent!important;
			}
			.animated-chat
			{
				-webkit-animation-duration:1s;
				animation-duration:1s;
				-webkit-animation-fill-mode:both;
				animation-fill-mode:both;
				-webkit-animation-timing-function:ease-in;
				animation-timing-function:ease-in
			}
			@-webkit-keyframes tada
			{	
				0%
				{
					-webkit-transform:scale(1)
				}
				10%,20%
				{
					-webkit-transform:scale(.9)rotate(-3deg)
				}
				30%,50%,70%,90%
				{
					-webkit-transform:scale(1.1)rotate(3deg)
				}
				40%,60%,80%
				{
					-webkit-transform:scale(1.1)rotate(-3deg)
				}
				100%
				{
					-webkit-transform:scale(1)rotate(0)
				}
			}
			@keyframes tada
			{
				0%
				{
					transform:scale(1)
				}
				10%,20%
				{
					transform:scale(.9)rotate(-3deg)
				}
				30%,50%,70%,90%
				{
					transform:scale(1.1)rotate(3deg)
				}
				40%,60%,80%
				{
					transform:scale(1.1)rotate(-3deg)
				}
				100%
				{
					transform:scale(1)rotate(0)
				}
			}
			.tada
			{
				-webkit-animation-name:tada;
				animation-name:tada
			}
			@-webkit-keyframes hvr-pulse-grow
			{
				to
				{
					-webkit-transform:scale(1.1);
					transform:scale(1.1)
				}
			}
			@keyframes hvr-pulse-grow
			{
				to
				{
					-webkit-transform:scale(1.1);
					transform:scale(1.1)
				}
			}
			
			@media only screen and (max-width:768px)
			{
				#chat
				{
					width:50%;
					height:30px !important;
					position:relative;
					top:10;
					left:0 !important;
					border-color:#ff6666;
					background-color:#ff6666;
					z-index:0;
				}
				#chat:after
				{
					border-width:9px 8px 0 0;
					border-color:#ff6666 transparent transparent;
					left:8px;
					bottom:-8px
				}
				#chat:hover
				{
					background:#00a69c;
					border-color:#00a69c;
					-webkit-animation-name:hvr-pulse-grow;
					animation-name:hvr-pulse-grow;
					-webkit-animation-duration:.3s;
					animation-duration:.3s;
					-webkit-animation-timing-function:linear;
					animation-timing-function:linear;
					-webkit-animation-iteration-count:infinite;
					animation-iteration-count:infinite;
					-webkit-animation-direction:alternate;
					animation-direction:alternate
				}
				#chat:hover:after
				{
					border-color:#00a69c transparent transparent transparent !important;
					background-color:#00a69c transparent transparent!important;
				}
			}
		</style>
<script>
$(document).ready( function(){
	


	<c:forEach items="${batches }" var="b">
	batchNos.push("${b.getBatchNumber()}");
	</c:forEach>
	console.log(batchNos);
	});
</script>	
<script src="https://cdnjs.cloudflare.com/ajax/libs/annyang/2.6.0/annyang.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/speechkitt.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular.min.js"></script>	
</head>
<body>
	<!-- Entire div-->
<div class="container-fluid other">

	<!-- header-->
	
		
	<div class="container-fluid">
		<div class="row firdiv">
			<div class="col-md-6 col-sm-6 col-xs-6">
				<i class="fa fa-refresh fa-spin fa-3x fa-fw" style="float:left;display:none;" id="ajaxPageLoader"></i><br>
				<span class="welocmeName" style="color:#000 !important">Welcome <span style="letter-spacing:1px;font-family:'Cherry Swash';font-weight:600;font-size:18px;"><i><%=name %></i></span>
				<i style="margin-left:1%;" class="fa fa-calendar" aria-hidden="true"></i> <span class="welcomeDate" id="welDate"></span> </span><br>
			</div>
			<div class="col-md-6 col-sm-6 col-xs-6" style="margin-top:20px;margin-left:0px !important">
				<a onclick="displayDiv('changePassword')" style="float:right;color:#000;cursor:pointer">&nbsp<i style="color:#000;" class="fa fa-wrench" aria-hidden="true"></i> Change Password</a>
				<a href="Logout" style="float:right;color:#000"><i style="color:#000;marggin-right:1%;" class="fa fa-power-off" aria-hidden="true"></i> Logout</a>	
			</div>
		</div>
	</div>
	<!--header end-->


<!-- navbar start-->


<div class="container-fluid menuDiv">
	<nav class="navbar navbar-default navClass">
	  <div class="container-fluid">
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>                        
	      </button>
	      <!--<a href="student_index.html" class="navbar-brand"><img class="logo" src="images/cvcorpLogo.png"></a>-->
	    </div>
	    <div class="collapse navbar-collapse" id="myNavbar">
	      <ul class="nav navbar-nav">
	        <li class="active"><a href="#" onclick="displayDiv('welcome')"><i class="fa fa-home" aria-hidden="true"></i> Home</a></li>
	        <li><a href="#" onclick="displayDiv('regForm')"><i class="fa fa-user" aria-hidden="true"></i> Register a New Student</a></li>
	        <li class="dropdown">
				<a class="dropdown-toggle" style="cursor:pointer;" data-toggle="dropdown"><i class="fa fa-users" aria-hidden="true"></i> View Students<span class="caret"></span></a>
				<ul class="dropdown-menu">
					<c:forEach items="${batches }" var="b">
					<li><a style="cursor:pointer;" onclick="sendData('viewBatch/',${b.getBatchNumber()},'stArea',-1); displayDiv('stArea')">BATCH ${b.getBatchNumber()}</a></li>
					</c:forEach>
					<li><a style="cursor:pointer;" onclick="sendData('viewAll','','stArea',-1); displayDiv('stArea')">View All Students</a></li>
				</ul>
			</li>
			<!-- Multiple choice menu begin-->
		
			<li class="dropdown">
				<a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-check-square" aria-hidden="true"></i> MultiChoice Questions<span class="caret"></span></a>
				<ul class="dropdown-menu">
					<li><a style="cursor:pointer" onclick="displayDiv('pushQuestion')"> Push a New Question To DB</a></li>
					<li><a style="cursor:pointer" onclick="displayDiv('createQuestion')"> Create a New QP</a></li>
					<li><a style="cursor:pointer" onclick="sendData('getQuestionPapers/','Multiple','listQPapers',-1); displayDiv('qpapers')" > View QP's</a></li>			
				</ul>
			</li>
		
			<!-- Multiple choice menu end-->
			
			<!-- QA menu begin-->
		
			<li class="dropdown">
				<a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-question-circle" aria-hidden="true"></i> Theoretical Questions<span class="caret"></span></a>
				<ul class="dropdown-menu">
					<li><a style="cursor:pointer" onclick="displayDiv('QApushQuestion')"> Push a New Question To DB</a></li>
					<li><a style="cursor:pointer" onclick="displayDiv('QAcreateQuestion')"> Create a New QP</a></li>
					<li><a style="cursor:pointer" onclick="sendData('getQuestionPapers/','QA','listQAQPapers',-1); displayDiv('QAqpapers')"> View QP's</a></li>
				</ul>
			</li>
				
			<!-- QA menu end-->
			
			<!-- Mail Students begin-->
		
			<li class="dropdown">
			<a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-reply-all" aria-hidden="true"></i> Mail To Students<span class="caret"></span></a>
			<ul class="dropdown-menu">
			<li><a style="cursor:pointer" onclick="displayDiv('mailToBatch')"> Mail To Batches</a></li>
			<li><a style="cursor:pointer" onclick="displayDiv('mailToStudent')"> Mail To Single Student or Others</a></li>
			
			</ul>
			</li>
				
		<!-- Mail Students end-->
		<!-- View syllabus begin-->
			
			<li class="dropdown">
			<a class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-book" aria-hidden="true"></i><i class="fa fa-book" aria-hidden="true"></i> View Syllabus<span class="caret"></span></a>
			<ul class="dropdown-menu">
			<li><a style="cursor:pointer" onclick="displayDiv('aptiSyllabus')">Aptitude & Reasoning</a></li>
			<li><a style="cursor:pointer" onclick="displayDiv('javaSyllabus')">Technical</a></li>
			<li><a style="cursor:pointer" onclick="displayDiv('commSyllabus')">Communication</a></li>
			<li><a style="cursor:pointer" onclick="displayDiv('linuxSyllabus')">Linux & Database</a></li>
			</ul>
			</li>	
			
		<!--View Syllabus end-->
		
		<!-- organize batches start-->
		
			<li class="dropdown">
			
			<a class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-users" aria-hidden="true"></i> Batches<span class="caret"></span></a>
			<ul class="dropdown-menu">
			<li><a onclick="displayDiv('addBatch')"> Enroll a New Batch </a></li>
			<li><a onclick="displayDiv('viewBatches')"> View All Batches and Info</a></li>
			</ul>
			
			</li>
			
		<!--organize batches end-->
		
		
		<!-- batch progress start-->
	        <li><a href="#" onclick="displayDiv('welcome')"><i class="fa fa-hourglass-start" aria-hidden="true"></i> Batch-Progress</a></li>
	
		<!-- batch progress end--> 
		<li><a onclick="displayDiv('takeAttendance');verifyPresents();"><i class="fa fa-male" aria-hidden="true"></i> Take Attendance</a></li>
		
		<li class="dropdown">
			
			<a class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-flag-o" aria-hidden="true"></i> Student Notifications<span class="caret"></span></a>
			<ul class="dropdown-menu">
			<li><a onclick="displayDiv('viewNotifications')"> View All Posted Notifications</a></li>
			<li><a onclick="displayDiv('addNotification')"> Post a New Notification</a></li>
			</ul>
			
			
			</li>
			<li><a href="#" onclick="displayDiv('uploadFile')"><i class="fa fa-upload" aria-hidden="true"></i> Upload File</a></li>
	      </ul>
	      <!-- <ul class="nav navbar-nav navbar-right">
	        <li><a href="#"><i class="fa fa-power-off" aria-hidden="true"></i> Logout</a></li>
	        <li><a href="#"></span><i class="fa fa-key" aria-hidden="true"></i> Change Password</a></li>
	      </ul> -->
	    </div>
	  </div>
	</nav>
</div>


<!-- navbar end-->
	
	
	
	
	<!--Notification Response -->
	
  
  <div id="success" style="position:fixed;text-align:center !important;z-index:1;color:#fff;right:0%;top:0%;border:1px solid #00a69c !important;background-color:green !important;display:none;opacity:1 !important;">
  	<strong>Success!</strong><p id="reportT"> </p>
  </div>
  
  <div id="fail" style="position:fixed;text-align:center !important;z-index:1;color:#fff;background-color:red !important;right:0%;top:0%;border:1px solid #ff6666 !important;display:none;opacity:1 !important;">
  	<strong>Not success!</strong><p id="reportF"> </p>
  </div>
 
  
  <!--End of response-->
  
  <!-- Chat box code start  -->
			<div id="chat" class="animated-chat tada" onclick="loadChatbox();speakBegin()">How Can I Help?</div>
			<div class="chatbox" id="chatbox">
			<span class="chat-text">Hello <%=name %></span>
			<script>
			document.write('<div id="smartchatbox_img901621879" style="width: 280px; height: 260px;background-color:#fff; overflow: hidden; margin: auto; padding: 0;">');
			document.write('<div id="smartchatbox901621879" style="width: 280px; height: 260px;background-color:#fff; overflow: hidden; margin: auto; padding: 0; border:0; ">');
			document.write('Can I Create a New QuestionPaper?<br>'+
					   '<small>By the way, I can create a new question paper with the random'+
					    'questions and random topics.</small>'+
					   '<br>'+
					   '<button style="border:1px solid #00a69c !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#00a69c;"  onclick="assistantCreateQuestionPaper(\'Y\')">YES</button><button style="border:1px solid #00a69c !important;border-radius:5px;font-size:12px;background-color: transparent !important;color:#00a69c;" onclick="assistantCreateQuestionPaper(\'N\')" >NO</button></div></div>');
			
			</script>
			<span id="close-chat" onclick="closeChatbox()">&times;</span>
			<div id="minim-chat" onclick="minimChatbox()"><span class="minim-button">&minus;</span></div>
			<div id="maxi-chat" onclick="loadChatbox()"><span class="maxi-button">&plus;</span></div>
			</div>
			
			<script>
			
			function loadChatbox()
			{
				var e=document.getElementById("minim-chat");
				e.style.display="block";
				var e=document.getElementById("maxi-chat");
				e.style.display="none";
				var e=document.getElementById("chatbox");
				e.style.margin="0";
			}
			function closeChatbox()
			{
				var e=document.getElementById("chatbox");
				e.style.margin="0 0 -450px 0";
				responsiveVoice.speak("OK");
			}
			function minimChatbox()
			{
				var e=document.getElementById("minim-chat");
				e.style.display="none";
				var e=document.getElementById("maxi-chat");
				e.style.display="block";
				var e=document.getElementById("chatbox");
				e.style.margin="0 0 -260px 0";
			}
			
			</script>
		<!-- Chat box code end  -->
  
  
 
	<!-- container starts here-->
		<div class="container-fluid" style="width:100%;margin-top:0.3%;">
			<div class="row" style="border:1px solid gray;">
	          	
<!-- Welcome Page-->	

<div id="welcome" class="container-fluid welcomeRow">
  
    <div class="row">
        <div class="col-md-3 col-sm-3 col-xs-12">
        
        <div style="margin-top:5% !important;border-right:1px solid #4e4e4e;">
        <c:forEach items="${batches }" var="b">
            <div class="dropdown" style="margin:auto !important;">
                <button class="btn btn-default dropdown-toggle" style="width:30%;border:1px solid #ff6666 !important;margin-top:2% !important;" type="button" id="menu1" data-toggle="dropdown">Batch ${b.getBatchNumber() }
                <span class="caret"></span></button>
                <ul class="dropdown-menu dropdown-menu-left" style="margin-left:31%;margin-top: -8%;" role="menu" aria-labelledby="menu1">
                    <li role="presentation"><a onclick="getProgress('getProgress/${b.getBatchNumber()}/Math',${b.getBatchNumber()},'Math')" role="menuitem" href="#">Aptitude</a></li>
                    <li role="presentation"><a onclick="getProgress('getProgress/${b.getBatchNumber()}/Java',${b.getBatchNumber()},'Java')" role="menuitem" href="#">Java</a></li>
                    <li role="presentation"><a onclick="getProgress('getProgress/${b.getBatchNumber()}/Comms',${b.getBatchNumber()},'Comms')" role="menuitem" href="#">Communication</a></li>
                    <li role="presentation"><a onclick="getProgress('getProgress/${b.getBatchNumber()}/Linux',${b.getBatchNumber()},'Linux')" role="menuitem" href="#">Linux</a></li>
                </ul>
            </div>
            
          </c:forEach> 
          </div>
        </div>
        <div class="col-md-2 col-sm-2 col-xs-12">
        	<div id="updateProgress">
                     
                     <h3 style="text-align:center;top:20%;right:30%">WELCOME TO THE PORTAL</h3>  
             </div> 
        </div>
        <div class="col-md-7 col-sm-7 col-xs-12">
           <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                   <canvas id="progressPieChart" style="width:100%;height: 300px;"></canvas>                
               </div>
           </div>
        </div>
    </div>
    <br>
    <div class="row">
    <div class="col-sm-6 col-xs-12 col-md-6" id="TopicsFinished"></div>
    <div class="col-sm-6 col-xs-12 col-md-6" id="TopicsUnFinished"></div>
    </div><br>
</div>
	
<!-- Welcome Page end-->
	
	




<!-- Take attendance Page begin-->	


<div class="container-fluid" style="display:none;" id="takeAttendance">
	
	</div>
	
	
<!-- Take attendamce Page end-->
	

	
	
<!-- student details form begin-->
	
	
<div id="regForm" style="border:1px solid gray;display:none;margin:0.5%;">
	<div class="row">
		<form id='registration' onsubmit="return false" class="form-horizontal">
			<div class="col-md-6 col-sm-6 col-xs-12">
			
			<div class="form-group">
				<h3 class="control" style="text-align:center;padding-bottom:3%;">PersonalDetails :</h3>
				<label class="control-label col-sm-4" for="fullName">Enter FullName :</label>
				<div class="col-sm-6">
				<input type="text" name="fullName" class="form-control" id="fullName" placeholder="Enter Full Name" required>
				</div>
				<div class="col-sm-2"></div>
			</div>
	  
			<div class="form-group">
				<label class="control-label col-sm-4" for="email">Enter email :</label>
				<div class="col-sm-6">
				<input type="email" name="email" class="form-control" id="email" placeholder="Enter email" required>
				</div>
				<div class="col-sm-2"></div>
			</div>
			
			<div class="form-group">
				<label class="control-label col-sm-4" for="email">Enter DOB :</label>
				<div class="col-sm-6">
				<input type="date" name="dob" class="form-control" id="dob" placeholder="Enter Date of Birth" required>
				</div>
				<div class="col-sm-2"></div>
			</div>
	  
			<div class="form-group">
				<label class="control-label col-sm-4" for="gender">Gender :</label>
				<div class="col-sm-6">
				<label class="radio-inline"><input type="radio" value="male" checked name="gender">Male</label>
				<label class="radio-inline"><input type="radio" value="female" name="gender">Female</label>
				</div>
				<div class="col-sm-2"></div>
			</div>
	  
			<div class="form-group">
				<label class="control-label col-sm-4" for="mobile">Enter mobile number :</label>
				<div class="col-sm-6">
				<input type="text" name="mobile" class="form-control" id="mobile" placeholder="Enter mobile number" required>
				</div>
				<div class="col-sm-2"></div>
			</div>
			  
			<div class="form-group">
				<label class="control-label col-sm-4" for="mobile_Parent">Enter Emergency mobile :</label>
				<div class="col-sm-6">
				<input type="text" name="mobile_Parent" class="form-control" id="mobile_Parent" placeholder="Enter Emergency mobile number" required>
				</div>
				<div class="col-sm-2"></div>
			</div>
			
			<div class="form-group">
				<label class="control-label col-sm-4" for="parentName">Enter Emergency Contact Person :</label>
				<div class="col-sm-6">
				<input type="text" name="parentName" class="form-control" id="parentName" placeholder="Enter Emergency Contact Person" required>
				</div>
				<div class="col-sm-2"></div>
			</div>
			
			<div class="form-group">
				<label class="control-label col-sm-4" for="address">Addresss :</label>
				<div class="col-sm-6 col-xs-12">
			  		<textarea name="locality" style="height:40px !important" placeholder="Enter your address" class="form-control" rows="5"  id="locality" required></textarea>
				</div>
				<div class="col-sm-2"></div>
	  		</div>
			
			<div class="form-group">
				<label class="control-label col-sm-4" for="parentName"></label>
				<div class="col-sm-6">
				<input style="margin-top:5px;" type="text" name="city" class="form-control" id="city" placeholder="Enter city" required>
				</div>
				<div class="col-sm-2"></div>
			</div>
			
			<div class="form-group">
				<label class="control-label col-sm-4" for="state"></label>
				<div class="col-sm-6">
				  <select name="state" class="form-control" style="height:32px !important;" id="state">
				  <option value="" selected disabled>Select state</option>
				  <option value="AndhraPradesh">Andhra Pradesh</option>
				  <option value="Telangana">Telangana</option>
				  <option value="Others">Others</option>
				  </select>
				</div>
			</div>
		</div>
		<div class="col-md-6 col-sm-6 col-xs-12">
			<div class="form-group">
				  <h3 class="control" style="text-align:center;padding-bottom:3%;">Education Details :</h3>
				  <label class="control-label col-sm-5" style="text-align:right;" for="sscPercentage">Enter SSC Percentage :</label>
				<div class="col-sm-6">
				  <input type="number" name="sscPercentage" class="form-control" id="sscPercentage" placeholder="Enter SSC Percentage" required>
				</div>
				<div class="col-sm-1"></div>
			</div>
				  
			<div class="form-group">
				<label class="control-label col-sm-5" style="text-align:right;" for="interPercentage">Enter Inter Percentage :</label>
				<div class="col-sm-6">
				  <input type="number" name="interPercentage" class="form-control" id="interPercentage" placeholder="Enter Inter Percentage " required>
				</div>
				<div class="col-sm-1"></div>
			</div>
				  
			<div class="form-group">
				<label class="control-label col-sm-5" style="text-align:right;" for="graduationPercentage">Enter Graduation Percentage :</label>
				<div class="col-sm-6">
				  <input type="number" name="graduationPercentage" class="form-control" id="graduationPercentage" placeholder="Enter graduation percentage" required>
				</div>
				<div class="col-sm-1"></div>
			</div>	  
				  
			<div class="form-group">
				<label class="control-label col-sm-5" style="text-align:right;" for="graduationCollege">Enter Graduation College :</label>
				<div class="col-sm-6">
				  <input type="text" name="graduationCollege" class="form-control" id="graduationCollege" placeholder="Enter Graduation College" required>
				</div>
				<div class="col-sm-1"></div>
			</div>

			<div class="form-group">
				<label class="control-label col-sm-5" style="text-align:right;" for="graduationCollege">Enter College Location :</label>
				<div class="col-sm-6">
				  <input type="text" name="graduationCity" class="form-control" id="graduationCity" placeholder="Enter city" required>
				</div>
				<div class="col-sm-1"></div>
			</div> 
							  
			<div class="form-group">
				<label class="control-label col-sm-5" style="text-align:right;" for="graduationYOP">Enter Graduation YOP:</label>
				<div class="col-sm-6">
				  <input type="number" name="graduationYOP" class="form-control" placeholder="Enter Graduation YOP" id="graduationYOP">
				</div>
				<div class="col-sm-1"></div>
			</div>
				
			<div class="form-group">
				<label class="control-label col-sm-5" style="text-align:right;" for="graduationType">Enter Graduation Type :</label>
				<div class="col-sm-6">
				  <select name="graduationType" class="form-control" style="height:32px !important;" id="graduationType">
				 <option value="BTech">BTech</option>
				 <option value="MTech">MTech</option>
				 <option value="MBA">MBA</option>
				 <option value="MCA">MCA</option>
				 <option value="Degree">Degree</option>
				  <option value="Others">Others</option>
				  </select>
				</div>
				<div class="col-sm-1"></div>
			</div>
		  
			<div class="form-group">
				<label class="control-label col-sm-5" style="text-align:right;" for="graduationBranch">Enter Graduation Branch:</label>
				<div class="col-sm-6">
				  <select name="graduationBranch" style="height:32px !important;" class="form-control" id="graduationBranch">
				  <optgroup label="B Tech or M Tech Branches">
				  <option value="CSE">CSE</option>
				  <option value="IT">IT</option>
				  <option value="ECE">ECE</option>
				  <option value="EEE">EEE</option>
				  <option value="MECH">MECH</option>
				  <option value="CIVIL">CIVIL</option>
				  <option value="Aeronautical">Aeronautical</option>
				  <option value="Electronics & Instrumentation Engineering">Electronics & Instrumentation Engineering</option>
				  <option value="Mechatronics Engineering">Mechatronics Engineering</option>
				  <option value="other">Any other</option>
				  </optgroup>
				  
				  <optgroup label="Any other">
				   <option value="Other">Any Other</option>
				  </optgroup>
				  
				  <optgroup label="Degree groups">
				  <option value="BSC Computers">BSC Computers</option>
				  <option value="BSC General">BSC General</option>
				  <option value="BCom">BCom</option>
				   <option value="BA">BA</option>
				   <option value="Other">Any Other</option>
				  </optgroup>
				  </select>
				</div>
				<div class="col-sm-1"></div>
			</div>	
			
			<div class="form-group">
				<h3 class="control" style="text-align:center;padding-bottom:3%;">Other Details :</h3>
				<label class="control-label col-sm-4" style="text-align:right;" for="batchNumber">Enter Batch Number :</label>
				<div class="col-sm-6">
				<select name="batchNumber" style="height:32px !important;" class="form-control">
				<c:forEach items="${batches }" var="b">
				<option value="${b.getBatchNumber() }" selected>${b.getBatchNumber() }</option>
				</c:forEach>
				</select>
				</div>
				<div class="col-sm-2"></div>
			</div>
			
	  
			<div class="form-group">
				<label class="control-label col-sm-4" style="text-align:right;" for="feePaid">Enter Fee Paid:</label>
				<div class="col-sm-6">
				<input type="number" name="feePaid" class="form-control" id="feePaid" placeholder="Enter Fee Paid" required>
				</div>
				<div class="col-sm-2"></div>
			</div>
			
			<div class="form-group">
				<label class="control-label col-sm-4" style="text-align:right;" for="feeTotal">Enter Total Fee:</label>
				<div class="col-sm-6">
				<input type="number" name="feeTotal" class="form-control" id="feeTotal" placeholder="Enter Fee Total" required>
				</div>
				<div class="col-sm-2"></div>
			</div>	
			
			<div class="form-group">
				<label class="control-label col-sm-4" style="text-align:right;" for="joinDate">joinDate:</label>
				<div class="col-sm-6">
				<input type="date" name="joinDate" class="form-control" id="joinDate" placeholder="YYYY/MM/DD" required>
				</div>
				<div class="col-sm-2"></div>
			</div>
		</div>
	
			<div class="form-group"> 
				<div class="col-sm-12">
				<input type="submit" onclick="sendData('registerStudent?','','',0); return false;" value="Register" class="btn btn-default" style="font-size:16px !important;color:#ff6666;border-radius:5px;border-color:#ff6666 !important;margin:auto !important;display:block !important;">
				</div>
			</div>
		</form>
	</div>
</div>

<!-- students details end-->
		
	
<!-- student view div begin-->    
     
<div id="stArea" style="display:none;border-radius:5px;">

</div>

<!-- students view end-->
	
	
	
<!-- push a question div start-->

<div id="pushQuestion" style="display: none;border-radius:5px;">
	<p class="push">Push a Question To DB</p>
		<form id="pushQuestionForm" class="form-horizontal formClass" action="pushQuestion" method="get">
		  <h4 style="text-align:center;">Add Question</h4>
		<div class="form-group">
			<label class="control-label col-sm-4" for="question">Enter your Question:</label>
			<div class="col-sm-6 col-xs-12">
			  <textarea name="question" style="height:50px !important" class="form-control" rows="5"  id="questionM" required></textarea>
			</div>
			<div class="col-sm-2"></div>
	  	</div>
	  	
		<!--options starts-->
		<div class="container-fluid">
			<div class="row">
				<div class="form-group">
					<div class="col-md-2"></div>
					<label class="control-label col-md-2" for="optionA">Enter option A:</label>
					<div class="col-md-2">
					<input type="text" name="optionA" class="form-control" id="optionAM" placeholder="Enter option A" required>
					</div>
					<label class="control-label col-md-2" for="optionB">Enter option B:</label>
					<div class="col-md-2">
					<input type="text" name="optionB" class="form-control" id="optionBM" placeholder="Enter option B" required>
					</div>
					<div class="col-md-2"></div>
				</div>
			</div>
		</div>
		<div class="container-fluid">
			<div class="row">
				<div class="form-group">
					<div class="col-md-2"></div>
					<label class="control-label col-md-2" for="optionA">Enter option C:</label>
					<div class="col-md-2">
					<input type="text" name="optionC" class="form-control" id="optionCM" placeholder="Enter option C" required>
					</div>
					<label class="control-label col-md-2" for="optionB">Enter option D:</label>
					<div class="col-md-2">
					<input type="text" name="optionD" class="form-control" id="optionDM" placeholder="Enter option D" required>
					</div>
					<div class="col-md-2"></div>
				</div>
			</div>
		</div>
	
				<div class="row">
				<div class="form-group">
					<div class="col-md-2"></div>
					<label class="control-label col-md-2" for="optionE">Enter option E:</label>
					<div class="col-sm-2">
					  <input type="text" name="optionE" class="form-control" id="optionEM" placeholder="Enter option E" required>
					</div>
					<div class="col-smd-6"></div>
				</div>
				</div>
		<!-- options end here-->
	     
		<!-- select key and select difficulty level starts here-->
		
		<div class="container-fluid">
			<div class="row">
				<div class="form-group">
					<div class="col-md-2"></div>
					<label class="control-label col-md-2" for="optionA">select key:</label>
					<div class="col-md-2">
						<select class="form-control" style="height:32px !important;" name="qkey" id="qkey">
						<option value="A" selected>A</option>
						<option value="B">B</option>
						<option value="C">C</option>
						<option value="D">D</option>
						<option value="E">E</option>
						</select>
					</div>
					<label class="control-label col-md-2" for="optionB">select difficulty level:</label>
					<div class="col-md-2">
						<select class="form-control" style="height:32px !important;" name="difficulty" id="difficulty">
						<option value="Basic" selected>Basic</option>
						<option value="Easy one">Easy one</option>
						<option value="Moderate">Moderate</option>
						<option value="Advance">Not Easy</option>
						<option value="Expertise one">Expertise</option>
						</select>
					</div>
					<div class="col-md-2"></div>
				</div>
			</div>
		</div>
		
		<!--select key and difficulty ends here--> 
		
	
		<!--enter topic and subject start  here -->
		
		<div class="container-fluid">
			<div class="row">
				<div class="form-group">
					<div class="col-md-2"></div>
					
					<label class="control-label col-md-2" for="subject">Enter subject:</label>
					<div class="col-md-2">
					<select name="subject" id="questionSubject" style="height:32px !important;" class="form-control">
					<option value="Java">Java</option>
					<option value="Math">Math</option>
					<option value="Linux">Linux And SQL</option>
					<option value="Comms">Comms</option>
					<option value="Misc">Misc</option>
					</select>
					
					</div>
					<label class="control-label col-md-2" for="topic">Enter topic:</label>
					<div class="col-md-2">
					<input type="text" list="topicSuggetions" name="topic" onkeyup="getTopicsList(this.value)" class="form-control" id="topicM" placeholder="Enter topic" required>
					<datalist id="topicSuggetions"></datalist>
					</div>
					
					<div class="col-md-2"></div>
				</div>
			</div>
		</div>
		
		<!--enter topic and subject end here -->
		
		<div class="form-group">
			<label class="control-label col-sm-4" for="description">Enter Description:</label>
			<div class="col-sm-6">
			  <input type="text" name="description" class="form-control" id="descriptionM" placeholder="Enter Description" required>
			</div>
			<div class="col-sm-2"></div>
	  	</div>
	  
	  	<div class="form-group">
			<label class="control-label col-sm-4" for="explanation">Give Explanation :</label>
			<div class="col-sm-6">
			  <textarea name="explanation" style="height:50px !important"class="form-control" rows="5"  id="explanationM" required></textarea>
			</div>
			<div class="col-sm-2"></div>
		</div>	  
		
		<div class="form-group"> 
			<div class="col-sm-12 ">
			  <input type="submit" onclick="sendData('pushQuestion?','','',1); return false;" value="Push" class="btn btn-default sub"/>
			</div>
		</div>
	</form>
</div>
			
<!-- push a question end-->	
	
	
	
<!-- create your customized question paper-->

<div id="createQuestion" style="display:none;border-radius:5px;">
	<div class="row">
		
			<div class="col-md-4 col-sm-4 col-xs-12" style="border-right:1px solid #4e4e4e;">
			<form id="createQuestionPaperForm">
			<p class="push">Create your Customized Question Paper<p>
			
			<div class="form-group">
						<div class="row">
							<div class="col-md-6 col-sm-6 col-xs-12"><small id='qcount'></small></div>
							<div class="col-md-6 col-sm-6 col-xs-12">
								<div class="col-md-6">
									<label class="control-label">selected Questions:</label>
								</div>
								<div class="col-md-6">
									<input class="form-control" style="height:30px !important;" type="text" name="questions" id="qts" readonly>
								</div>
							</div>
						</div>
					</div>
				<div class="row">
				<div class="form-group"> 
					<div class="col-md-5 col-sm-6 col-xs-12">
						<label class="control-label testname">Enter Test Name:</label>
					</div>
					<div class="col-md-7 col-sm-6 col-xs-12">
						<input class="form-control" type="text" name="testName" id="testNameM">
					</div>
				</div>
				</div><br>
				<div class="row">
				<div class="form-group"> 
					<div class="col-md-6 col-sm-6 col-xs-12">
					  <small>Note : Do not select batch if you don't want to push now</small>
						<label class="control-label testfor">Test for:</label>
					</div>	
					<div class="col-md-6 col-sm-6 col-xs-12">
					<c:forEach items="${batches }" var="b">
						<label class="checkbox"><input type="checkbox" name="BatchNos" value="${b.getBatchNumber() }">Batch ${b.getBatchNumber() }</label>
						
					</c:forEach>
					</div>
				</div>
				</div><br>
				
				<div style="display:none">
				<input type="text" name="qp_type" value="Multiple">
				</div>
				
				<div class="row">
				<div class="form-group"> 
					<div class="col-md-6 col-sm-6 col-xs-12">
						<label class="control-label testfor">Test Duration in Minutes:</label>
					</div>
					<div class="col-md-6 col-sm-6 col-xs-12">
						<input class="form-control" type="number" id="durationM" name="duration">
					</div>
				</div>
				</div>
				<br>
				<div class="row">
				<div class="form-group"> 
					<div class="col-md-6 col-sm-6 col-xs-12">
						<label class="control-label testfor">Paper Type:</label>
					</div>
					<div class="col-md-6 col-sm-6 col-xs-12">
						<label class="radio"><input type="radio" value="Y" name="isPractice" checked>Practice</label>
						<label class="radio"><input type="radio" value="N" name="isPractice">Test to Examine Students</label>
					</div>
				</div>
				</div><br>
				<input type="submit" onclick="sendData('createQuestionPaper?','','',2); return false;"  value="Create" class="btn btn-primary" style="font-size:16px !important;color:#fff;background-color:#000 !important;border-color:#000 !important;margin:auto !important;display:block !important;"><br>
			</form>
			</div>
			<div class="col-md-8 col-sm-8 col-xs-12">
				<!-- searchquestion here-->
				
				<p class="searchQPClass">SearchQuestion from DB</p>
				<div class="row">
					
					<br>
					<div class="row">
					<div class="form-group">
					
					<div class="col-md-6 col-sm-6 col-xs-12">
					<div class="row" style="border:1px solid #ded4d4">
					<div class="col-md-6 col-sm-6 col-xs-12">
					<label class="control-label col-md-2" for="subject">Subject:</label>
					   <select onchange="setTopicsList(this.value)" name="subject" id="subjectInSearch" style="height:32px !important;" class="form-control">
					<option selected>select</option>
					<option value="Java">Java</option>
					<option value="Math">Math</option>
					<option value="Linux">Linux And SQL</option>
					<option value="Comms">Comms</option>
					<option value="Misc">Misc</option>
					</select>
					 </div>
					 <div class="col-md-6 col-sm-6 col-xs-12">
							<label class="control-label">Search by topic :</label><br>
							<select class="form-control" style="height:30px !important;" onchange="sendData('getQuestionsByTopic/',this.value,'qArea',-1)" id="topicsInSearch">
							
							</select>
							</div>
							</div>
						</div>
						<div class="col-md-3 col-sm-3 col-xs-12" style="border:1px solid #ded4d4">
						<div class="form-group">
							<label class="control-label">Search By Admin :</label><br>
							<select class="form-control" style="height:30px !important;" onchange="sendData('getQuestionsByAdmin/',this.value,'qArea',-1)" class="select">
							<option value="cv" style="font-size:14px;">CV</option>
							<option value="shivakumar" style="font-size:14px;">Shivakumar</option>
							<option value="sandeep" style="font-size:14px;">Sandeep</option>
							<option value="Akanksha" style="font-size:14px;">Akanksha</option>
							<option value="rajkiran" style="font-size:14px;">Rajkiran</option>
							<option value="karunakar" style="font-size:14px;">Karunakar</option>
							<option value="lalitha" style="font-size:14px;">Lalitha</option>
							</select>
						</div>
						</div>
						
						<div class="col-md-3 col-sm-3 col-xs-12" style="border:1px solid #ded4d4">
						<div class="form-group">
							<label class="control-label">Search by question :</label><br>
							<input class="form-control" type="text" style="height:30px !important;" onkeyup="sendData('getQuestionsByQuestion/',this.value,'qArea',-1)" id="topic">
						</div>
						</div>
						
					</div>
					
					</div>
				<br>
						
				<div class="container-fluid" style="width:100%;border:1px solid #4e4e4e;height:330px;overflow:scroll;" id='qArea'></div>
			</div>
			</div>

	</div>
</div>

<!-- question paper ends here-->



	
<!--List Question papers begin -->

<div id="qpapers" style="display:none;border-radius:5px;">
	 <div class="row">
	 	<div class="col-sm-3 scrollClass"  style="border:1px solid black">
	 		<div id="listQPapers"></div>
	 	</div>
	 	
	 <!-- Question paper begin -->
	 
	 	<div class="col-sm-9"  style="border:1px solid black">
			 <div id="viewQPaper">
			Questions Here
			 </div>
	 	</div>
	 
	 <!-- Question paper end -->
	 
	 </div>
</div>
	
<!-- List Question papers end -->
	


<!-- QAPush Question to begin -->

<div id="QApushQuestion" style="display:none;border-radius:5px;">
	<p class="push">Push a Question To DB</p>
		<form id="QApushQuestionForm" class="form-horizontal">
			  <div class="form-group">
				<h4 style="padding-left:50px;">Add Question</h4>
				<label class="control-label col-sm-4" for="question">Enter your Question:</label>
				<div class="col-sm-6 col-xs-12">
				  <textarea name="question" style="height:50px !important" class="form-control" rows="5"  id="questionQA" required></textarea>
				</div>
				<div class="col-sm-2"></div>
			  </div>
	  
			  
			  
			  <div class="form-group">
				<label class="control-label col-sm-4" for="subject">Select Subject :</label>
				<div class="col-sm-6">
				  <select name="subject" style="height:32px !important;" id="subjectInQA" class="form-control">
					
					<option value="Java">Java</option>
					<option value="Math">Math</option>
					<option value="Linux">Linux And SQL</option>
					<option value="Comms">Comms</option>
					<option value="Misc">Misc</option>
					</select>
				</div>
				<div class="col-sm-2"></div>
			  </div>
			  
			  <div class="form-group">
				<label class="control-label col-sm-4" for="topic">Enter Topic :</label>
				<div class="col-sm-6">
				  <input list="topicsListinQA" type="text" name="topic" onkeyup="getTopicsListQA(this.value)" class="form-control" id="topicQA" placeholder="Enter Topic" required>
				  <datalist id="topicsListinQA">
				  
				  </datalist>
				</div>
				<div class="col-sm-2"></div>
			  </div>
	     
	 <!-- select key and select difficulty level starts here-->
	 
	 	<div class="container-fluid">
			<div class="row">
				<div class="form-group">
					<label class="control-label col-md-4" for="optionB">Select difficulty level:</label>
					<div class="col-md-6">
					<select class="form-control" name="difficulty" id="difficulty" style="height:32px !important;">
						<option value="Basic" selected>Basic</option>
						<option value="Easy one">Easy one</option>
						<option value="Moderate">Moderate</option>
						<option value="Advance">Not Easy</option>
						<option value="Expertise one">Expertise</option>
					</select>
					</div>
					<div class="col-md-2"></div>
				</div>
			</div>
		</div>
		
	<!--select key and difficulty ends here--> 
	
		  <div class="form-group">
			<label class="control-label col-sm-4" for="description">Enter Description:</label>
			<div class="col-sm-6">
			  <input type="text" name="description" class="form-control" id="descriptionQA" placeholder="Enter Description" required>
			</div>
			<div class="col-sm-2"></div>
		  </div>
		  
		  <div class="form-group"> 
			<div class="col-sm-offset-2 col-sm-10 ">
			  <input type="submit" value="Push" onclick="sendData('pushQAQuestion?','','',3); return false;" class="btn btn-primary" style="font-size:16px !important;color:#fff;background-color:#000 !important;border-color:#000 !important;margin:auto !important;display:block !important;">
			</div>
		  </div>
	</form>	
</div>
	
<!-- QAPush Question to end -->
	


<!--  customized QA question paper-->
	
<div id="QAcreateQuestion" style="display:none;border-radius:5px;">
	<div class="row">
		<form id="QAcreateQuestionPaperForm">
			<div class="col-md-4 col-sm-4 col-xs-12" style="border-right:1px solid #4e4e4e;">
			<p class="push">Create your Customized Question Paper<p>
				<div class="row">
				<div class="form-group"> 
					<div class="col-md-5 col-sm-6 col-xs-12">
						<label class="control-label testname">Enter Test Name:</label>
					</div>
					<div class="col-md-7 col-sm-6 col-xs-12">
						<input class="form-control" type="text" name="testName" id="testNameQA" required>
					</div>
				</div>
				</div><br>
				<div class="row">
				<div class="form-group"> 
					<div class="col-md-6 col-sm-6 col-xs-12">
						<label class="control-label testfor">Test for:</label>
					</div>	
					<div class="col-md-6 col-sm-6 col-xs-12">
						<c:forEach items="${batches }" var="b">
						<label class="checkbox"><input type="checkbox" name="BatchNos" value="${b.getBatchNumber() }">Batch ${b.getBatchNumber() }</label>
						
					</c:forEach>
					</div>
				</div>
				</div><br>
				
				<div style="display:none">
				<input type="text" name="qp_type" value="QA">
				</div>
				
				<div class="row">
				<div class="form-group"> 
					<div class="col-md-6 col-sm-6 col-xs-12">
						<label class="control-label testfor">Test Duration in Minutes:</label>
					</div>
					<div class="col-md-6 col-sm-6 col-xs-12">
						<input class="form-control" type="number" id="durationQA" name="duration" required>
					</div>
				</div>
				</div>
				<br>
				<div class="row">
				<div class="form-group"> 
					<div class="col-md-6 col-sm-6 col-xs-12">
						<label class="control-label testfor">Paper Type:</label>
					</div>
					<div class="col-md-6 col-sm-6 col-xs-12">
						<label class="radio"><input type="radio" value="Y" name="isPractice" checked>Practice</label>
						<label class="radio"><input type="radio" value="N" name="isPractice">Test to Examine Students</label>
					</div>
				</div>
				</div><br>
				<input type="submit" onclick="sendData('createQuestionPaper?','','QA',4); return false;"  value="Create" class="btn btn-primary" style="font-size:16px !important;color:#fff;background-color:#000 !important;"><br>
			</div>
			<div class="col-md-8 col-sm-8 col-xs-12">
				<!-- searchquestion here-->
				<small id='QAqcount'></small>
				<p class="searchQPClass">SearchQuestion from DB</p>
				<div class="row">
					<div class="form-group">
						<div class="row">
							<div class="col-md-5 col-sm-6 col-xs-12"></div>
							<div class="col-md-7 col-sm-6 col-xs-12">
								<div class="col-md-6">
									<label class="control-label">Your Selected Questions IDs:</label>
								</div>
								<div class="col-md-6">
									<input class="form-control" style="height:30px !important;" type="text" name="questions" id="QAqts" readonly>
								</div>
							</div>
						</div>
					</div>
					<br>
					<div class="row">
					<div class="form-group">
						<div class="col-md-6 col-sm-6 col-xs-12">
						<div class="row" style="border:1px solid #ded4d4">
						<div class="col-md-6 col-sm-6 col-xs-12">
							<label class="control-label">Subject :</label><br>
							<select class="form-control" style="height:30px !important;" onchange="sendData('getQAQuestionsBySubject/',this.value,'QAqArea',-1);setTopicsQA(this.value)">
							<option selected>select</option>
							<option value="Java">Java</option>
							<option value="Math">Math</option>
							<option value="Linux">Linux and SQL</option>
							
							<option value="Comms">Comms</option>
							
					 		<option value="Misc">Misc</option>
						   
							</select>
							</div>
							<div class="col-md-6 col-sm-6 col-xs-12">
							<label class="control-label">Topic :</label><br>
							<select id="topicsListQA" onchange="getQuestionsByTopicQA(this.value)">
							
							</select>
							
							</div>
						</div>
						</div>
						<div class="col-md-3 col-sm-3 col-xs-12" style="border:1px solid #ded4d4">
						<div class="form-group">
							<label class="control-label">Search By Admin :</label><br>
							<select class="form-control" style="height:30px !important;" onchange="sendData('getQAQuestionsByAdmin/',this.value,'QAqArea',-1)" class="select">
							<option value="cv" style="font-size:14px;">CV</option>
							<option value="shivakumar" style="font-size:14px;">Shivakumar</option>
							<option value="sandeep" style="font-size:14px;">Sandeep</option>
							<option value="rajkiran" style="font-size:14px;">Rajkiran</option>
							<option value="rajkiran" style="font-size:14px;">Karunakar</option>
							</select>
						</div>
						</div>
						
						<div class="col-md-3 col-sm-3 col-xs-12" style="border:1px solid #ded4d4">
						<div class="form-group">
							<label class="control-label">Search by question :</label><br>
							<input class="form-control" type="text" style="height:30px !important;" onkeyup="sendData('getQAQuestionsByQuestion/',this.value,'QAqArea',-1)" id="topic">
						</div>
						</div>
					</div>
					</div>
				<br>
				<div class='row' style="pading:0 !important;"><div class='col-sm-5'></div><div class="col-sm-2" id="spinloader" class="spinLoader" style="display:none;"><i class="fa fa-spinner fa-spin" style="font-size:40px"></i><div class='col-sm-5'></div></div></div>
				<div class="container-fluid" style="width:100%;border:1px solid #4e4e4e;height:330px;overflow:scroll;" id='QAqArea'></div>
			</div>
			</div>
		</form>
	</div>
</div>

<!-- QAquestion paper ends here-->
	
	
	
<!--View QA begin -->

<div id="QAqpapers" style="display:none;border-radius:5px;">
	<div class="row">
		<div class="col-sm-3"  style="border:1px solid black">
	 		<div id="listQAQPapers"></div>
	 	</div>
	 
	 <!-- Question paper begin -->
	 
	 	<div class="col-sm-9"  style="border:1px solid black">
	 		<div id="viewQAQPaper">Questions Here</div>
	 	</div>
	</div>
</div>

<!-- View QA end -->
	 


<!-- mail to batch start -->
	 
<div id="mailToBatch" style="display:none;border-radius:5px;">
    <div class="container-fluid">
        <p class="push">Mail to Batch</p>
        <form id="mailToBatchForm">
        <div class="row">
           
                <div class="form-group">
                    <label class="control-label col-sm-3" for="email">Select your batch :</label>
                <div class="col-sm-7">
                <c:forEach items="${batches }" var="b">
                    <label class="checkbox-inline"><input type="checkbox" name="batch" onchange="setBatchMails(this)" value="${b.getBatchNumber() }">Batch ${b.getBatchNumber() }</label>
                   </c:forEach>
                    
                        <span id="errEmail" style="color:red;"></span>
                </div>
                    <div class="col-sm-2"></div>
                </div>
        </div>
       
        <div id="multipleMails" style="display:none">
                
        </div>
        
        
         <div class="row" style="margin-top:1% !important;">
                <div class="form-group">
                    <label class="control-label col-sm-3" for="to">To :</label>
                <div class="col-sm-7" id="batchMailButtons" style="border:1px solid black">
                   
                </div>
                <div class="col-sm-2">
                    <input type="button" onclick="displayD('ccrecipients')" class="btn btn-default" style="margin:2px 0px 2px 0px;" name="cc" id="cc" value="CC"/>
                    <input type="button" onclick="displayD('bccrecipients')" class="btn btn-default" name="bcc" id="bcc" value="Bcc"/>
                </div>
                </div>
        </div>

        <div class="row" style="margin-top:1% !important;display:none;" id="ccrecipients">
                <div class="form-group">
                    <label class="control-label col-sm-3" for="to">Cc :</label>
                <div class="col-sm-7" id="mailToBatchCC">
                    <input type="text"class="form-control"  name="ccrecipients" placeholder="Add Cc"/>
                     <i class="fa fa-plus-square" onclick="addCC('mailToBatchCC','ccrecipients')" style="cursor:pointer" aria-hidden="true"></i>
                </div>
                <div class="col-sm-2"></div>
                </div>
        </div>

        <div class="row" style="margin-top:1% !important;display:none;" id="bccrecipients">
                <div class="form-group">
                    <label class="control-label col-sm-3" for="to">Bcc :</label>
                <div class="col-sm-7" id="mailToBatchbCC">
                    <input type="text"class="form-control"  name="bccrecipients" placeholder="Add Bcc"/>
                     <i class="fa fa-plus-square" onclick="addCC('mailToBatchbCC','bccrecipients')" style="cursor:pointer" aria-hidden="true"></i>
                </div>
                <div class="col-sm-2"></div>
                </div>
        </div>
        
        <div class="row" style="margin-top:1% !important;">
            <div class="form-group">
                    <label class="control-label col-sm-3" for="email">Subject :</label>
                <div class="col-sm-7">
                    <textarea name="subject" class="form-control" style="height: 40px !important;" id="subject" placeholder="Enter your subject" rows="3"></textarea>
                </div>
                <div class="col-sm-2">
                    
                </div>
            </div>
        </div>
        
        <div class="row" style="margin-top:1% !important;">
            <div class="form-group">
                    <label class="control-label col-sm-3" for="email">Message :</label>
                <div class="col-sm-7">
                    <textarea name="message" class="form-control" style="height: 250px !important;" id="message" placeholder="Enter your message" rows="30" id="comment"></textarea>
                </div>
                <div class="col-sm-2">
                    
                </div>
            </div>
        </div>
        <div class="row" style="margin:1% 0% 1% 0% !important;">
            <div class="col-md-3"></div>
            <div class="col-md-7">
                <input type="submit" onclick="sendMail('sendMail','mailToBatchForm'); return false;" class="btn btn-primary" style="font-size:16px !important;color:#fff;background-color:#000 !important;border-color:#000 !important;margin:auto !important;display:block !important;" value="send" id="send"/>
            </div>
            <div class="col-md-2"></div>
        </div>
      </form>
	</div>
</div>

<!-- mail to batch end -->
	 


<!-- mail to student start -->

<div id="mailToStudent" style="display:none;border-radius:5px;">
	<p class="push">Mail to Student or Other</p>
	<div class="container-fluid">
	<form id="mailToStudentForm" class="formClass">
		<div class="row" style="margin-top:1% !important;">
                <div class="form-group">
                    <label class="control-label col-sm-3" for="to">To :</label>
                <div class="col-sm-7" id="mailToStudentTo">
                    <input list="singleStudentMailsList" type="text"class="form-control" onkeyup="getStudentsMails(this.value)"  name="recipients" id="recipientsSt" placeholder="Add recipients" required/>
                     <datalist id="singleStudentMailsList">
                     </datalist>
                     <i class="fa fa-plus-square" onclick="addCC('mailToStudentTo','recipients')" style="cursor:pointer" aria-hidden="true"></i>
                    
                     
                       <div id="mailToStudentTo"></div>
                </div>
                
                <div class="col-sm-2">
                    <input type="button" onclick="displayD('ccrecipientsSt')" class="btn btn-default" style="margin:2px 0px 2px 0px;" name="cc" id="cc" value="CC"/>
                    <input type="button" onclick="displayD('bccrecipientsSt')" class="btn btn-default" name="bcc" id="bcc" value="Bcc"/>
                </div>
                </div>
                
        </div>
       

        <div class="row" style="margin-top:1% !important;display:none;" id="ccrecipientsSt">
                <div class="form-group">
                    <label class="control-label col-sm-3" for="to">Cc :</label>
                <div class="col-sm-7" id="mailToStudentCC">
                    <input type="text"class="form-control"  name="ccrecipients" placeholder="Add Cc"/>
                   <i class="fa fa-plus-square" onclick="addCC('mailToStudentCC','ccrecipients')" style="cursor:pointer" aria-hidden="true"></i>
                </div>
                <div class="col-sm-2"></div>
                </div>
        </div>

        <div class="row" style="margin-top:1% !important;display:none;" id="bccrecipientsSt">
                <div class="form-group">
                    <label class="control-label col-sm-3" for="to">Bcc :</label>
                <div class="col-sm-7" id="mailToStudentbCC">
                    <input type="text"class="form-control"  name="bccrecipients" placeholder="Add Bcc"/>
                    <i class="fa fa-plus-square" onclick="addCC('mailToStudentbCC','bccrecipients')" style="cursor:pointer" aria-hidden="true"></i>
                </div>
                <div class="col-sm-2"></div>
                </div>
        </div>
        
        
        <div class="row" style="margin-top:1% !important;">
            <div class="form-group">
                    <label class="control-label col-sm-3" for="email">Subject :</label>
                <div class="col-sm-7">
                    <textarea name="subject" class="form-control" style="height: 40px !important;" id="subject" placeholder="Enter the subject" rows="3" required></textarea>
                </div>
                <div class="col-sm-2">
                    
                </div>
            </div>
        </div>


        <div class="row" style="margin-top:1% !important;">
            <div class="form-group">
                    <label class="control-label col-sm-3" for="email">Message :</label>
                <div class="col-sm-7">
                    <textarea name="message" class="form-control" style="height: 250px !important;" id="message" placeholder="Enter your message" rows="30" id="comment" required></textarea>
                </div>
                <div class="col-sm-2">
                    
                </div>
            </div>
        </div>
        <div class="row" style="margin:1% 0% 1% 0% !important;">
            <div class="col-md-3"></div>
            <div class="col-md-7">
                <input type="submit" onclick="sendMail('sendMail','mailToStudentForm'); return false;" class="btn btn-primary" style="font-size:16px !important;color:#fff;background-color:#000 !important;border-color:#000 !important;margin:auto !important;display:block !important;" value="send" id="send"/>
            </div>
            <div class="col-md-2"></div>
        </div>
            </form>
        </div>
</div>

<!-- mail to student end -->



<!-- aptitude syllabus start -->

<div id="aptiSyllabus" style="display:none;border-radius:5px;">
	 <div class="row">
            <p class="push" style="text-align: center;">Aptitude syllabus</p>
            <div class="col-md-1 col-sm-1 col-xs-12"></div>
            <div class="col-md-10 col-sm-10 col-xs-12">
            <table class="table table-responsive table-hover table-bordered table-striped">
           	<thead>
            <tr class="theadText"><th class="thText">Flow number of topic</th><th class="thText">Topic Name</th><th class="thText">Duration in Days (approximation)</th><th class="thText">Best internet resource</th></tr>
            </thead>
            <tbody>
            <c:forEach items="${math }" var="m">
            <tr><td class="tdText">${m.getFlowNumber() }</td><td class="tdText">${m.getTopicName() }</td><td class="tdText">${m.getDurationDays() }</td><td class="tdText"><a href="${m.getResource() }" target="_blank">${m.getResource() }</a></td></tr>
            </c:forEach>
           	</tbody>
            </table>
            </div>
            <div class="col-md-1 col-sm-1 col-xs-12"></div>
        </div>
 </div>
	 
<!-- aptitude syllabus end -->




<!-- java syllabus start -->

<div id="javaSyllabus" style="display:none;border-radius:5px;">
		<div class="row">
			<p class="push" style="text-align: center;">Technical syllabus</p>
            <div class="col-sm-1 col-md-1 col-xs-0"></div>
            <div class="col-sm-10 col-md-10 col-xs-12">
            
            <table class="table table-responsive table-hover table-bordered table-striped">
           	<thead>
            <tr class="theadText"><th class="thText">Flow number of topic</th><th class="thText">Topic Name</th><th class="thText">Duration in Days (approximation)</th><th class="thText">Best internet resource</th></tr>
            </thead>
            <tbody>
            <c:forEach items="${java }" var="j">
            <tr><td class="tdText">${j.getFlowNumber() }</td><td class="tdText">${j.getTopicName() }</td><td class="tdText">${j.getDurationDays() }</td><td class="tdText"><a href="${j.getResource() }" target="_blank">${j.getResource() }</a></td></tr>
            </c:forEach>
           	</tbody>
            </table>
            
            </div>
            
            <div class="col-sm-1 col-md-1 col-xs-0"></div>
        </div>
</div>

<!-- java syllabus end -->
	
	
	
<!-- comm syllabus start -->
	
<div id="commSyllabus" style="display:none;border-radius:5px;">
		<div class="row">
            <p class="push" style="text-align: center;">English syllabus</p>
            <div class="col-md-1 col-sm-1 col-xs-12"></div>
            <div class="col-md-10 col-sm-10 col-xs-12">
            <table class="table table-responsive table-hover table-bordered table-striped">
           	<thead>
            <tr class="theadText"><th class="thText">Flow number of topic</th><th class="thText">Topic Name</th><th class="thText">Duration in Days (approximation)</th><th class="thText">Best internet resource</th></tr>
            </thead>
            <tbody>
            <c:forEach items="${comms }" var="c">
            <tr><td class="tdText">${c.getFlowNumber() }</td><td class="tdText">${c.getTopicName() }</td><td class="tdText">${c.getDurationDays() }</td><td class="tdText"><a href="${c.getResource() }" target="_blank">${c.getResource() }</a></td></tr>
            </c:forEach>
           	</tbody>
            </table>
            </div>
               <div class="col-md-1 col-sm-1 col-xs-12"></div>
        </div>
</div>	
	
<!-- comm syllabus end -->
	

<!-- Linux syllabus start  -->

<div id="linuxSyllabus" style="display:none;border-radius:5px;">
	<div class="row">
			<p class="push" style="text-align: center;">Linux syllabus</p>
            <div class="col-md-1 col-sm-1 col-xs-12"></div>
            <div class="col-md-10 col-sm-10 col-xs-12">
           <table class="table table-responsive table-hover table-bordered table-striped">
           <thead>
            <tr class="theadText"><th class="thText">Flow number of topic</th><th class="thText">Topic Name</th><th class="thText">Duration in Days (approximation)</th><th class="thText">Best internet resource</th></tr>
            </thead>
            <tbody>
            <c:forEach items="${linux }" var="l">
            <tr><td class="tdText">${l.getFlowNumber() }</td><td class="tdText">${l.getTopicName() }</td><td class="tdText">${l.getDurationDays() }</td><td class="tdText"><a href="${l.getResource() }" target="_blank">${l.getResource() }</a></td></tr>
            </c:forEach>
           </tbody>
            </table>
            </div>
            <div class="col-md-1 col-sm-1 col-xs-12"></div>
        </div>
</div>	 

<!-- Linux syllabus end  -->



<!-- Add Batch begin -->

<div id="addBatch" style="display:none;border-radius:5px;">
	<p class="push">Enroll a New Batch</p><br>
	<div class="row">
		<div class="col-md-2 col-sm-2 col-xs-0"></div>
		<div class="col-md-7 col-sm-7 col-xs-12 formClass">
			<form id='addBatchForm'>
				<div class="row">
			         <div class="form-group">
            	        <label class="control-label col-sm-4" for="to">Enter the new Batch Number :</label>
                		<div class="col-sm-6">
                    		<input class="form-control" type="number" name="batchNumber" id="batchNumberAdd" placeholder="Enter batch Number" required />
                		</div>
                		<div class="col-sm-2"></div>
         			</div>
				</div>
				
				<div class="row">
			         <div class="form-group">
						<label class="control-label col-sm-4" for="to">Enter batch begin Date (Approx) :</label>
						<div class="col-sm-6">
							<input class="form-control" type="text" name="beginDate" id="batchBeginDate" placeholder="YYYY-MM-DD"/>
			            </div>
			          	<div class="col-sm-2"></div>
			         </div>
				</div>

				<div class="row">
			         <div class="form-group">
						<label class="control-label col-sm-4" for="to">Enter batch end Date (Approx) :</label>
			            <div class="col-sm-6">
							<input class="form-control" type="text" name="endDate" id="batchEndDate" placeholder="YYYY-MM-DD"/>
			            </div>
			            <div class="col-sm-2S"></div>
			         </div>
				</div>
				
				<div class="row" style="margin-top:1% !important;">
            		<div class="col-md-4"></div>
            		<div class="col-md-4">
                		<button id="addBatchButton" class="btn btn-primary" style="margin:auto !important;dispaly:block !important;" onclick="addBatch();return false">Enroll</button>
            		</div>
            		<div class="col-md-4"></div>
     			</div>
     		</form>
     	</div>
     	<div class="col-md-3 col-sm-3 col-xs-0"></div>
	</div>
</div>

<!-- Add Batch begin -->


<!-- View all Batches -->

<div id="viewBatches" style="display:none;border-radius:5px;">
	<p class="push">All batches</p><br>
	<div class="row">
		<div class="col-sm-1 col-md-1 col-xs-0"></div>
		<div class="col-sm-10 col-md-10 col-xs-12">
			<table class="table table-responsive table-hover table-bordered table-striped">
				<thead>
					<tr class="theadText"><th class="thText">Batch Number</th><th class="thText">Begin Date(Approx)</th><th class="thText">End Date(Approx)</th><th class="thText">Number of Students Enrolled</th></tr>
				</thead>
				<tbody>
					<c:forEach items="${batches }" var="b">
					<tr><td class="tdText">${b.getBatchNumber() }</td><td class="tdText">${b.getBeginDate() }</td><td class="tdText">${b.getEndDate() }</td><td class="tdText">${b.getTotalStudents() }</td></tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
		<div class="col-sm-1 col-md-1 col-xs-0"></div>
	</div>
</div>


<!-- View all Batches -->

<!-- Change password start -->

<div id="changePassword" style="display:none;border-radius:5px;">
	<p class="push">Change your password</p><br>
	<form method="post" id="changeAdminPassword" class="formClassForPassChange">
		<div class="row">
	         <div class="form-group marginFormCLass">
	                    <label class="control-label col-sm-5" for="to">Enter old password :</label>
	                <div class="col-sm-4">
	                    <input class="form-control"type="password" name="oldPassword" id="oldPassword" placeholder="Enter old password"/>
	                </div>
	                <div class="col-sm-3"></div>
	         </div>
		</div>
		<div class="row" style="margin-top:1% !important;">
	         <div class="form-group">
	                    <label class="control-label col-sm-5" for="to">Enter New Password :</label>
	                <div class="col-sm-4">
	                    <input class="form-control" type="password" name="newPassword"id="newPassword" placeholder="Enter New Password"/>
	                </div>
	                <div class="col-sm-3"></div>
	         </div>
		</div>
		<div class="row" style="margin-top:1% !important;">
	         <div class="form-group">
	                    <label class="control-label col-sm-5" for="to">Confirm new Password :</label>
	                <div class="col-sm-4">
	                    <input type="password" class="form-control"  name="confirmpsw" id="confirmpsw" placeholder="Confirm new Password"/>
	                	<br>
	                </div>
	                <div class="col-sm-3"></div>
	         </div>
		</div>
		<div class="row" style="margin-top:1% !important;">
	            <div class="col-md-5"></div>
	            <div class="col-md-4">
	                <button id="changeAdminPasswordButton" class="btn btn-default" style="border:1px solid #00a69c !important;border-radius:5px !important;color:#00a69c !important;" onclick="changePassword();return false">Change</button>
	            </div>
	            <div class="col-md-3"></div>
	     </div>
	</form>
</div>


<!-- Change password end -->



<!-- Add notification begin -->


<div id="addNotification" style="display:none;border-radius:5px;">
	<p class="push">Add a new Notification to Students</p><br>
	<form method="post" id="addNotificationForm">
		<div class="row">
	         <div class="form-group">
	                    <label class="control-label col-sm-4" for="to">Enter What to notify :</label>
	                <div class="col-sm-4">
	                    <input class="form-control" type="text" name="notification" placeholder="Enter the message"/>
	                </div>
	                <div class="col-sm-4"></div>
	         </div>
		</div>
		
		<div class="row">
	           
	                <div class="form-group">
	                    <label class="control-label col-sm-3" for="email">Select batches to push:</label>
	                <div class="col-sm-7">
	                <c:forEach items="${batches }" var="b">
	                    <label class="checkbox-inline"><input type="checkbox" name="batchNos" value="${b.getBatchNumber() }">Batch ${b.getBatchNumber() }</label>
	                   </c:forEach>
	                    
	                        
	                </div>
	                    <div class="col-sm-2"></div>
	                </div>
	        </div>
		
		<div class="row" style="margin-top:1% !important;">
	            <div class="col-md-4"></div>
	            <div class="col-md-4">
	                <input name="btn" type="submit" value="Post"  class="btn btn-primary" onclick="addNotification();return false;" style="margin:auto !important;dispaly:block !important;">
	            </div>
	            <div class="col-md-4"></div>
	     </div>
	</form>
</div>


<!-- Add notification end -->

<!-- Uploading file start -->


<div id="uploadFile" style="display:none;" class="">

<p class="push">Add a New File</p><br>
	<form action="uploadFile" method="post" id="sendFileForm" enctype="multipart/form-data">
		<div class="row">
	         <div class="form-group">
	                    <label class="control-label col-sm-4" for="to">Enter File Name</label>
	                <div class="col-sm-4">
	                    <input class="form-control" type="text" name="fileName" placeholder="Enter fileName"/>
	                </div>
	                <div class="col-sm-4"></div>
	         </div>
		</div>
		
		<div class="row">
	         <div class="form-group">
	                    <label class="control-label col-sm-4" for="to">Select File</label>
	                <div class="col-sm-4">
	                    <input class="form-control" type="file" name="file" placeholder="select File"/>
	                </div>
	                <div class="col-sm-4"></div>
	         </div>
		</div>
		<div class="row">
	         <div class="form-group">
	                    <label class="control-label col-sm-4" for="to">Select Subject</label>
	                <div class="col-sm-4">
	                   <select name="subject">
	                   <option selected value="Java">Java</option>
	                   <option value="Math">Math</option>
	                   <option value="Linux">Linux</option>
	                   <option value="SQL">SQL</option>
	                   <option value="Comms">Communication</option>
	                   <option value="Others">Others</option>
	                   </select>
	                </div>
	                <div class="col-sm-4"></div>
	         </div>
		</div>
		
		<div class="row">
	           
	                <div class="form-group">
	                    <label class="control-label col-sm-3" for="email">Select batches to push:</label>
	                <div class="col-sm-7">
	                <c:forEach items="${batches }" var="b">
	                    <label class="checkbox-inline"><input type="checkbox" name="batchNos" value="${b.getBatchNumber() }">Batch ${b.getBatchNumber() }</label>
	                   </c:forEach>
	                    
	                        
	                </div>
	                    <div class="col-sm-2"></div>
	                </div>
	        </div>
		
		<div class="row" style="margin-top:1% !important;">
	            <div class="col-md-4"></div>
	            <div class="col-md-4">
	                <button class="btn btn-primary" onclick="sendFile(); return false;" style="margin:auto !important;dispaly:block !important;">Upload Data and File</button>
	            </div>
	            <div class="col-md-4"></div>
	     </div>
	</form>

</div>


<!-- Uploading file end -->

<!--view all notification begin -->


<div id='viewNotifications' style="display:none">
	<p class="push">All Notifications</p><br>
	<div class="row">
		<div class="col-sm-1 col-md-1 col-xs-0"></div>
		<div class="col-sm-10 col-md-10 col-xs-12">
			<table class="table table-responsive table-hover table-bordered table-striped">
				<thead>
					<tr class="theadText"><th class="thText">Posted On</th><th class="thText">Posted By</th><th class="thText">Notification</th><th class="thText">Posted For Batches</th></tr>
				</thead>
				<tbody>
					<c:forEach items="${notifications }" var="n">
					<tr><td class="tdText">${n.getPostDate() }</td><td class="tdText">${n.getName() }</td><td class="tdText">${n.getNotification() }</td><td class="tdText">${n.getBatchNos()[0] }</td></tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
		<div class="col-sm-1 col-md-1 col-xs-0"></div>
	</div>
</div>


<!-- view notifications end -->

	</div>
</div>




<!-- <div class="assistant" style="position:fixed;right:0;bottom:10%;background-color:#7b6e2d;color:white;padding:10px;border-radius:15%"><span onclick="displayD('assistantWork')">How Can I Help You?</span>
  <span id="assistantWork" style="width:200px;">
 <br> Hi <%=name %><br>
  I am Your Assistant ""<br>
  <span id="assistantCreateQP">
  </span>
   <span id="assistantCreateQPOptions">
    <br>
   Can I Create a New QuestionPaper?<br>
   <small>By the way, I can create a new question paper with the random
    questions and random topics.</small>
   <br>
   <button style="color:black" onclick="assistantCreateQuestionPaper('Y')">YES</button><button onclick="displayD('assistantWork')" style="color:black" >NO</button>
   
   </span>
   
  </span> 
</div> -->

<!--footer strat-->
<div class="container-fluid footerDiv">
    <div class="row">
        <div class="col-md-12">
            <p class="footers" style="color:#fff;float:left;">@CVCORPCopyRightsReserved</p>
            <img class="logo" style="float:right;margin-top:1%;" src="<c:url value="/resources/images/cvcorpLogo.png"/>">
        </div>
    </div>
</div>



<!-- footer end-->

</div>
<script type="text/javascript">
var studentsListVoice;
var found=[];
var emailVoice;
$(document).ready()
{
	$.get("viewAll", function(list){
		studentsListVoice=list["studentsList"];
	});
	}
if (annyang) {
	  // Add our commands to annyang
	  annyang.addCommands({
	    'hello *name': function(name) { responsiveVoice.speak("Hello <%=name%>"); },
	    'create a question paper': function() { assistantCreateQuestionPaper("Y"); },
	    'java': function() { assistantCreateQuestionPaper("Java"); },
	    'maths': function() { assistantCreateQuestionPaper("Math"); },
	    'aptitude': function() { assistantCreateQuestionPaper("Math"); },
	    'multiple choice':function() { assistantCreateQuestionPaper("Multiple"); },
	    'Theory':function() { assistantCreateQuestionPaper("QA"); },
	     'view multiple choice Papers': function(){ sendData("getQuestionPapers/","Multiple","listQPapers",-1); displayDiv("qpapers"); 
	     responsiveVoice.speak("Listed all papers you can check nonw");},
	     'view theory type question Papers': function(){ sendData("getQuestionPapers/","QA","listQAQPapers",-1); displayDiv("QAqpapers"); },
	      'view all students': function(){sendData("viewAll","","stArea",-1); displayDiv("stArea");
	      responsiveVoice.speak("done"); },
	      'send a mail to student *name': function(name){
	    	  
	    	  
	    	 for(i=0;i<studentsListVoice.length;i++)
	    		 {
	    		   if(studentsListVoice[i].fullName.search(name)>=0)
	    			   {
	    			     found.push(studentsListVoice[i]);
	    			   }
	    		 }
	    	 if(found.length>1)
	    		 {
	    		  loadChatbox();
	    		  var st="";
	    		  for(k=0;k<found.length;k++)
	    			  st=st+found[k].fullName+"  Batch"+found[k].batchNumber+"<br>";
	    		  $("#smartchatbox901621879").html(st);
	    		  responsiveVoice.speak("Which student, say full name as, student, fullname");
	    		 }
	    	 else if(found.length==1)
	    		 {
	    		    emailVoice=found[0].email;
	    		 responsiveVoice.speak("What is the subject, say as subject, subject");
	    		 }
	    	 else{
	    		 responsiveVoice.speak("No student found with the name");
	    	 }
	    	  
	      },
	      'student *name':function(name){
	    	
	    	  if(found.length>0){
	    	  for(i=0;i<found.length;i++)
	    		  {
	    		    
	    		  }
	    	  }
	    	  else{
	    		  responsiveVoice.speak("What do I do with student"+name); 
	    	  }
	      },
	      'subject *subject': function(subject){
	    	
	    	  responsiveVoice.speak("Type the message in the box then I will send");
	    	  loadChatbox();
	    	  $("#smartchatbox901621879").html("<strong>To: "+emailVoice+"<br>Subject: "+subject+"</strong><br>Message<textarea></textarea><br><input type='submit' value='send'>");
	      },
	      'send a mail to batch *num': function(num){
	    	  responsiveVoice.speak("I can send a mail but not now"); 
	      },
	      ' view progress of *name':function(name){
	    	  responsiveVoice.speak("I can view progress but not now");  
	      },
	      
	      'view students from batch *num': function(num){
	    	  console.log(batchNos[batchNos.length-1]);
	    	 
	    	  if(!isNaN(num) && batchNos[batchNos.length-1]>=parseInt(num)){
	    	  sendData("viewBatch/",num,"stArea",-1); displayDiv("stArea");
	    	  
	    	  }
	    	  else{
	      responsiveVoice.speak("Please mention the correct batch Number");} },
	       'search *text':function(text){
	    	   window.open('http://google.com?search'+text, '_blank');
	       },
	       'can you *something': function(){
	    	   responsiveVoice.speak("Yes I can do that but not now");
	       },
	       '*anything': function(anything){
	    	   responsiveVoice.speak("please check what you are asking, If you have'nt said it properly say again, otherwise sorry I cannot help");
	       }, 
	  });

	  // Tell KITT to use annyang
	  SpeechKITT.annyang();

	  annyang.debug();
	  // Define a stylesheet for KITT to use
	  SpeechKITT.setStylesheet('http://cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');

	  // Render KITT's interface
	  SpeechKITT.vroom();
	}
	</script>
</body>
<script>
		var selector = '.nav li';

			$(selector).on('click', function(){
				$(selector).removeClass('active');
				$(this).addClass('active');
			});
			
			
</script>
</html>