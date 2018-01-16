<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>CareerVidhya_Operations</title>
	
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href=<c:url value="/resources/css/adminDashBoard.css"/>>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<style>
		a:hover
		{
			color:#ff6666 !important;
		}
	</style>
	<script type="text/javascript">
	
	function flipElem(e)
	{
		if(document.getElementById(e).style.display=="none")
			{
			document.getElementById(e).style.display="block";
			}
		else{
			document.getElementById(e).style.display="none"
		}
	}
	
	function forgotPassword(url)
	{
		var email;
		
		if(url=="forgotStudentPassword")
			{
			$("#ajaxPageLoaderStudent").show();
			 email=$("#forgotStudentEmail").val();
			}
		else{
			$("#ajaxPageLoaderAdmin").show();
			 email=$("#forgotAdminEmail").val();
		}
		$.get(url+"/"+email+"/1", function(data){
			
			data=JSON.parse(data);
			alert(data["notification"]);
			if(data["status"])
				{
				  $("#forgotAdminMailPart").hide();
				  $("#forgotStudentMailPart").hide();
				}
			$("#ajaxPageLoaderAdmin").hide();
			$("#ajaxPageLoaderStudent").hide();
		});
	}
	</script>
</head>
<body>
	<div class="container-fluid" style="height:520px;">
		<div class="container-fluid">
			<div class="row headDiv" style="margin-right: 0px !important;margin-left: 0px !important;">
				<div class="col-md-12 col-sm-12 col-xs-12">
					<a href="/"><img class="logoHome" src="<c:url value="/resources/images/cvcorpLogo.png"/>"></a>
					<!-- <strong><span style="color:red;font-size:33px">CV</span><span style="color:black;font-size:33px">CORP</span></strong>-->
				</div>
			</div>
		</div>
		<div class="container-fluid">
			<div class="row secdiv">
				<div class="col-md-12 col-sm-12 col-xs-12">
					<p class="welcomeNote">Welcome to CareerVidhya</p>
				</div>
			</div>
		</div>
		<div class="container-fluid halfdiv">
		<p class="login">LogIn</p>
		<div class="container-fluid thirddiv">
			<div class="row">
				<div class="col-md-5 col-sm-5 col-xs-12">
				<form action="adminLogin" method="post">
					<label class="admin" style="letter-spacing:3px;text-align:center;float:left !important;">Admin</label><br>
					<span class="errorCLass">${errorA}</span>
					<input class="email" type="email" placeholder="email" name="email" required>
					<input class="email" type="password" placeholder="password" name="password" required>
					
					<div class="row">
						<div class="col-md-12 col-sm-12 col-xs-12 spaceMargin">
							<input type="checkbox" name="rememberMe" class="check"><label class="new">Remember me</label><br>
							<label class="forgot frgtSpace"><a onclick="flipElem('forgotAdminMailPart')" id="forgotId">Forgot Password ?</a></label>
						</div>
					</div>
					<div class="form-group" style="display:none" id="forgotAdminMailPart">
						<label class="control-label col-sm-4" for="email">Enter email :</label>
						<div class="col-sm-6">
							<input type="email" class="form-control" id="forgotAdminEmail" placeholder="Enter email">
						</div>
						<div class="col-sm-2">
							<span class="btn btn-default resetBtn" onclick="forgotPassword('forgotAdminPassword'); return false;">Reset</span>		
						</div>
						<i class="fa fa-refresh fa-spin fa-3x fa-fw" style="display:none;" id="ajaxPageLoaderAdmin"></i>
					</div>
					<input class="sub" type="submit" value="Login"><br>
				</form>
				</div>
				<div class="col-md-2 col-sm-2 col-xs-12">
					<div class="innerdiv">
					</div>
				</div>
				<div class="col-md-5 col-sm-5 col-xs-12">
				<form action="studentLogin" method="post">
					<label class="admin" style="letter-spacing:3px;text-align:center;float:left !important;">Student</label><br>
					<span style="color:red;float:right !important;padding-top:3% !important;">${errorS}</span>
					<input class="email sideSpace" type="text" placeholder="email" name="email" required>
					<input class="email sideSpace" type="password" placeholder="password" name="password" required>
											  
						<div class="row">
							<div class="col-md-12 col-sm-12 col-xs-12 spaceMargin">
								<input type="checkbox" name="rememberMe" class="check"><label class="new">Remember me</label>
								<label class="forgot frgtSpace"><a onclick="flipElem('forgotStudentMailPart')" id="forgotId">Forgot Password ?</a></label>
								<label class="forgot frgtSpace"><a href="temporaryStudentRegestration" id="forgotId">New ? Register here?</a></label><br>
							</div>
						</div>
						<div class="form-group" style="display:none;" id="forgotStudentMailPart">
							<label class="control-label col-sm-4" for="email">Enter email :</label>
							<div class="col-sm-6">
								<input type="email" class="form-control" id="forgotStudentEmail" placeholder="Enter email">
								
							</div>
							<div class="col-sm-2">
								<span class="btn btn-default resetBtn" onclick="forgotPassword('forgotStudentPassword'); return false;">Reset</span>
							</div>
							<i class="fa fa-refresh fa-spin fa-3x fa-fw" style="display:none;" id="ajaxPageLoaderStudent"></i>
						</div>
					<input class="sub" type="submit" value="Login"><br>
				</form>
				</div>
			</div>
		</div>
		</div>
		<!--footer start-->
			<div class="container-fluid footerDivIndex">
			    <div class="row">
			        <div class="col-md-12">
			            <p class="footersIndex" style="color:#fff;">@CVCORPCopyRightsReserved</p>
			        </div>
			    </div>
			</div>
		<!-- footer end-->
</div>


</body>
</html>