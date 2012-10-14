function getUrlParameter(name) {
 
    var searchString = location.search.substring(1).split('&'),
    	parameter;
 
    for (var i = 0; i < searchString.length; i++) {
		parameter = searchString[i].split('=');
        if(name == parameter[0])
        	return parameter[1];
    }
 
    return false;
}

function loadScript(url)
{
	var head = document.getElementsByTagName('head')[0];
   	var script = document.createElement('script');

   	url += "?v=" + (new Date().getTime());
   	script.type = 'text/javascript';
   	script.src = url;
   	head.appendChild(script);
 }

window.onload = function() {

	availableDemo = ["whyScmIsPowerfull", "fallingBalls"];

	if ((param = getUrlParameter("demo")) && param != "")
	{
		for (var i = 0; i != availableDemo.length; i++)
			if (availableDemo[i] == param)
			{
				$("#viewSource").text(availableDemo[i].substr(0, 1).toUpperCase() + availableDemo[i].substr(1, availableDemo[i].length) + " : View source code");
				loadScript(availableDemo[i]+"/"+availableDemo[i]+".js");
				$(".codeViewProjectName").text(availableDemo[i].substr(0, 1).toUpperCase() + availableDemo[i].substr(1, availableDemo[i].length) + " : ");
				$($("#demo a").get(0)).attr("href", "https://github.com/MyBoon/Simple-Canvas-Manager/blob/master/demo/" + availableDemo[i]+"/"+availableDemo[i]+".js");
				$("#demo").show();
			}
	}
};