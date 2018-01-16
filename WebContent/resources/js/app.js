		
		var selector = '.nav li';

$(selector).on('click', function(){
    $(selector).removeClass('active');
    $(this).addClass('active');
});
		
		
		var divs = ["regForm", "batch","viewallstds","customqp","pushQuestion","show","math","english","program"];
		
			var visibleDivId = null;
			function visibility(divId) 
			{
			  if(visibleDivId === divId) {
				//visibleDivId = null;
			  } else {
				visibleDivId = divId;
			  }
			  hideNonVisibleDivs();
			}
			function hideNonVisibleDivs()
			{
			  var i, divId, div;
			  for(i = 0; i < divs.length; i++) {
				divId = divs[i];
				div = document.getElementById(divId);
				if(visibleDivId === divId) {
				  div.style.display = "block";
				} else {
				  div.style.display = "none";
				}
			  }
			}

			var divsStudent = ["home","profile", "statistics","multipleChoice","theoreticQp"];
			var visibleDivIdStd = null;
			function visibilityStd(divIdStd) 
			{
			  if(visibleDivIdStd === divIdStd) {
				//visibleDivId = null;
			  } else {
				visibleDivIdStd = divIdStd;
			  }
			  hideNonVisibleDivsStd();
			}
			function hideNonVisibleDivsStd()
			{
			  var i, divIdStd, div;
			  for(i = 0; i < divsStudent.length; i++) {
				divIdStd = divsStudent[i];
				div = document.getElementById(divIdStd);
				if(visibleDivIdStd === divIdStd) {
				  div.style.display = "block";
				} else {
				  div.style.display = "none";
				}
			  }
			}



