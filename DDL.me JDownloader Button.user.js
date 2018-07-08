// ==UserScript==
// @name         DDL.me JDownloader Button
// @namespace    http://de.ddl.me/
// @version      1.1.2
// @description  try to take over the world!
// @author       Sector
// @include      *de.ddl.me/*
// @grant        unsafeWindow
// @run-at       document-idle
// ==/UserScript==


var htmlButton = "<b class='border'></b><a rel='3' alt='61600' class='' style='display: block;' onclick='sendToJD()'>JDownloader</a>";

var links = [];
var openload = "";
var bar = unsafeWindow.document.getElementsByClassName("multibtn dlmode")[0].getElementsByTagName("div")[0];
var submitForm = "<FORM id='jd' ACTION='http://127.0.0.1:9666/flash/add' target='hidden' METHOD='POST' hidden></FORM>"
var packageName = unsafeWindow.document.getElementById("itemType").innerHTML.split('(')[0];
unsafeWindow.document.getElementById("adminmenu").innerHTML += submitForm;


unsafeWindow.getDlLinks = function getDlLinks()
{
	try
	{
		var dropDown = unsafeWindow.document.getElementsByClassName("select_content")[0];
		var parts = dropDown.getElementsByTagName("a");
		for(var i = 0; i < parts.length; i++)
		{
			parts[i].click();
			unsafeWindow.getOpenload();
			dropDown = unsafeWindow.document.getElementsByClassName("select_content")[0];
			parts = dropDown.getElementsByTagName("a");
		}
	}
	catch(e)
	{
		console.log("Only one part!");
		unsafeWindow.getOpenload();
	}
}
unsafeWindow.getOpenload = function getOpenload(){
	var arr = [];
	var l = unsafeWindow.document.links;
	for(var i=0; i<l.length; i++) {
		if(l[i].href.includes('openload'))
		{
			openload += l[i].href+"\r\n";
		}
	}
}

unsafeWindow.getDlLinks();
unsafeWindow.sendToJD = function sendToJD()
{
	var form = unsafeWindow.document.getElementById("jd");
	form.innerHTML += "<INPUT TYPE='hidden' NAME='package' VALUE='"+packageName+"'>";
	form.innerHTML += "<INPUT TYPE='hidden' NAME='urls' VALUE='" + openload + "'>";
	form.submit();
}


bar.innerHTML += htmlButton;