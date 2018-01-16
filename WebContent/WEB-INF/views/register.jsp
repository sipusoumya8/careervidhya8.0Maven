<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
     <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	
<title>New Student Registration</title>

 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="<c:url value="/resources/js/ajaxOp.js"/>"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	
	
	   <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/adminDashBoard.css"/>"/>
	   <style>
        .nav > li.active > a,.nav > li > a:active, .nav > li > a:focus
        {
            color:white !important;
            text-transform:uppercase !important;
            font-size:12px !important;
            background-color:#ff6666 !important;
        }
      

    </style>
  <script type="text/javascript">
        function testNumber()
        {
        	$('#sscPercentage').val($('#sscPercentage').val().split(".")[0]);
        	console.log($('#sscPercentage').val().split(".")[0]);
        	$('#interPercentage').val($('#interPercentage').val().split(".")[0]);
        	$('#graduationPercentage').val($('#graduationPercentage').val().split(".")[0]);
        	return true;
        }
        </script>
</head>
<body>

	
<!-- student details form begin-->
	<h3 class="control" style="text-align:center;color:#00a69c">Student Registration Form</h3>
<div id="regForm" style="border:1px solid gray">
	<div class="row" >
		<form id='registration' action="registerStudent" method="get" class="form-horizontal">
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
			  		<textarea name="locality" style="height:40px !important" placeholder="Enter your address" class="form-control" rows="5"  id="houseNo" required></textarea>
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
				  <option value="AndhraPradesh" selected>Andhra Pradesh</option>
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
				  <input type="text"  name="sscPercentage" class="form-control" id="sscPercentage" placeholder="Enter SSC Percentage" required>
				</div>
				<div class="col-sm-1"></div>
			</div>
				  
			<div class="form-group">
				<label class="control-label col-sm-5" style="text-align:right;" for="interPercentage">Enter Inter Percentage :</label>
				<div class="col-sm-6">
				  <input type="text" name="interPercentage" class="form-control" id="interPercentage" placeholder="Enter Inter Percentage " required>
				</div>
				<div class="col-sm-1"></div>
			</div>
				  
			<div class="form-group">
				<label class="control-label col-sm-5" style="text-align:right;" for="graduationPercentage">Enter Graduation Percentage :</label>
				<div class="col-sm-6">
				  <input type="text"  name="graduationPercentage" class="form-control" id="graduationPercentage" placeholder="Enter graduation percentage" required>
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
				
				<option value="5" selected>5</option>
				<option value="6" selected>6</option>
				<option value="7" selected>7</option>
				<option value="8" selected>8</option>
				<option value="9" selected>9</option>
				<option value="10" selected>10</option>
				
				</select>
				</div>
				<div class="col-sm-2"></div>
			</div>
			
	  
			
	
			<div class="form-group"> 
				<div class="col-sm-12">
				<input type="submit" onclick="testNumber()" value="Register" class="btn btn-default" style="font-size:16px !important;text-align:center;color:#fff;background-color:#000 !important;border-color:#000 !important;margin:auto !important;display:block !important;">
				</div>
			</div>
		</form>
	</div>
</div>

<!-- students details end-->

</body>
</html>