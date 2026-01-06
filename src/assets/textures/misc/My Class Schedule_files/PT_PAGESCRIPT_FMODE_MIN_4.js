

var gFFocusObjId = null;ptDialogLocal = new PT_Dialog();
function loadChart(name, gheader, gdata) {
 var r = Raphael(name),
 txtattr = { font: "20px 'Fontin Sans', Fontin-Sans, sans-serif" }; r.text(160, 10, "Multiline Series Chart").attr(txtattr); r.barchart(10, 50, 300, 220, gdata); r.text(500, 10, "Static Pie Chart").attr(txtattr); r.piechart(520, 170, 100, gdata[0]);}

function loadBarChart(name, gheader, gdata) {
 var r = Raphael(name),
 txtattr = { font: "20px 'Fontin Sans', Fontin-Sans, sans-serif" }; r.text(160, 10, "Multiline Series Chart").attr(txtattr); r.barchart(10, 5, 300, 220, gdata);}

function loadPieChart(name, gheader, gdata) {
 var r = Raphael(name),
 txtattr = { font: "20px 'Fontin Sans', Fontin-Sans, sans-serif" }; r.text(100, 10, "Static Pie Chart").attr(txtattr); r.piechart(120, 170, 100, gdata[0]);}function goTwitter()
{
document.location='https://twitter.com/';}

function createTwitter(myid, sSearch, sType, nVersion, nInterval, sTitle, sSubject, 
 nWith, nHeight, sShellBackground, sShellColor, sTweetBackground, sTweetColor, sTweetLink,
 bScrollbar, bLoop, bLive, sBehavior) {

 if (typeof nVersion == "undefined")
 nVersion = 2; if(typeof sType == "undefined")
 sType = 'search'; if (typeof sSearch == "undefined")
 sSearch = "#love"; if (typeof nInterval == "undefined")
 nInterval = 1000; if (typeof sTitle == "undefined")
 sTitle = ''; if (typeof sSubject == "undefined")
 sSubject = 'Love'; if (typeof nWith == "undefined")
 nWith = 220; if (typeof nHeight == "undefined")
 nHeight = 300; if (typeof sShellBackground == "undefined")
 sShellBackground = '#8ec1da'; if (typeof sShellColor == "undefined")
 sShellColor = '#ffffff'; if (typeof sTweetBackground == "undefined")
 sTweetBackground = '#ffffff'; if (typeof sTweetColor == "undefined")
 sTweetColor = '#444444'; if (typeof sTweetLink == "undefined")
 sTweetLink = '#1985b5'; if (typeof bScrollbar == "undefined")
 bScrollbar = false; if (typeof bLoop == "undefined")
 bLoop = true; if (typeof bLive == "undefined")
 bLive = true; if (typeof sBehavior == "undefined")
 sBehavior = 'default'; new TWTR.Widget({
 id: myid,
 version: nVersion,
 type: 'search',
 search: sSearch,
 interval: nInterval,
 title: sTitle,
 subject: sSubject,
 width: nWith,
 height: nHeight,
 theme: {
 shell: {
 background: sShellBackground,
 color: sShellColor
 },
 tweets: {
 background: sTweetBackground,
 color: sTweetColor,
 links: sTweetLink
 }
 },
 features: {
 scrollbar: bScrollbar,
 loop: bLoop,
 live: bLive,
 behavior: sBehavior
 }
 }).render().start();}

function transferAnimationIn() {
 if (!bPageTransfered) return; var mObj = document.getElementById("PT_MAIN"); if (mObj) {
 var sClass = mObj.getAttribute("class"); mObj.setAttribute("class", sClass + " ps_main_trf2"); }
 timeoutXfrAniID = window.setTimeout('transferAnimationIn2()',0);}

function transferAnimationIn2() {
 if (gAJAXNet == null || !bPageTransfered || gAJAXNet.gXMLObj == null) return; var mObj = document.getElementById("PT_MAIN"); if (mObj) {
 var sClass = mObj.getAttribute("class"); sClass = sClass.replace(" ps_main_trf2", ""); mObj.setAttribute("class", sClass + " ps_main_trf"); }
 timeoutXfrAniID = window.setTimeout('transferAnimationOut()', 2000);}

function transferAnimationOut() {
 if (gAJAXNet == null || !bPageTransfered || gAJAXNet.gXMLObj == null) return; gAJAXNet.resume(); var mObj = document.getElementById("PT_MAIN"); if (mObj) {
 var sClass = mObj.getAttribute("class"); sClass = sClass.replace(" ps_main_trf", ""); mObj.setAttribute("class", sClass); }
}

function slideV(obj) {
 var obj3 = document.getElementById("PT_CONTENT"); var obj4 = document.getElementById(obj.id.substring(0, obj.id.length - 1)); var obj2 = document.getElementById(obj.id + "0"); if (obj4.clientHeight <= 50 && obj2.style.display == "none") {
 obj2.style.display = "block"; obj4.style.height = obj2.clientHeight + 50 + 'px'; if (obj3)
 obj3.style.height = (obj3.clientHeight - obj2.clientHeight - 50) + 'px'; }
 else {
 obj.style.width = obj4.clientWidth + 'px'; obj2.style.display = "none"; obj4.style.height = '50px'; }
}

function slideH(obj) {
 var obj3 = document.getElementById(obj.id.substring(0, obj.id.length - 1)); var obj2 = document.getElementById(obj.id + "0"); if (obj.clientWidth <= 50 && obj2.style.display == "none") {
 obj2.style.display = "block"; obj3.style.width = obj2.clientWidth + 100 + 'px'; }
 else {
 obj3.style.width = obj2.clientWidth + 'px'; obj2.style.display = "none"; }
}
var nControllerTimer = 0;var bAnyLiveTiles = false;var workerURL = "";var nMaxWorkers = 5;var workers = new Array();var groupletQueue = new Array();var groupletNodes = null;var nWaitMSecFrame = 1000;var loaderTrf = null;function initGroupletNodes() {
 var groupletNodesStr = null; if (bSessionStorage)
 groupletNodesStr = sessionStorage.getItem("pt_groupletnodes"); if (typeof groupletNodesStr == "undefined" || !groupletNodesStr) 
 groupletNodes = new Array(); else 
 groupletNodes = JSON.parse(groupletNodesStr); var url = window.location.href; var uri1 = getUrlHost(url) + "/psc/" + trimWindowsNumber0(getPSHome(url)); var bFound = false; for (var i = 0; i < groupletNodes.length && !bFound; i++) {
 var uri = groupletNodes[i][0]; var bStatus = groupletNodes[i][1]; var urlList = groupletNodes[i][2]; if (url.indexOf(uri + "/") != -1 || url.indexOf(uri + "_") != -1) {
 if (bStatus)
 bFound = true; }
 }
 if (!bFound) {
 var uri = getUrlHost(window.location.href) + "/psc/" + trimWindowsNumber0(getPSHome(window.location.href)); var gnode = new Array(uri, true, null); groupletNodes.push(gnode); try {
 if (bSessionStorage)
 sessionStorage.setItem("pt_groupletnodes", JSON.stringify(groupletNodes)); } catch(e) {}
 }
}

function sleep(milliseconds) {
 var start = new Date().getTime(); for (var i = 0; i < 1e7; i++) {
 if ((new Date().getTime() - start) > milliseconds){
 break; }
 }
}

function checkGroupletNode(url, id, iIndex) {
 if (!isPIAUrl(url)) return true; var uri1 = getUrlHost(url) + "/psc/" + trimWindowsNumber0(getPSHome(url)); for (var i = 0; i < groupletNodes.length; i++) {
 var uri = groupletNodes[i][0]; var bStatus = groupletNodes[i][1]; var urlList = groupletNodes[i][2]; if (url.indexOf(uri + "/") != -1 || url.indexOf(uri + "_") != -1) {
 if (bStatus)
 return true; else {
 groupletNodes[i][2][urlList.length] = new Array(url, id, iIndex); return false; }
 }
 }
 var gnode = new Array(uri1, false, new Array(new Array(url, id, iIndex))); groupletNodes.push(gnode); sleep(4000); doGrouplet(uri1 + '/?cmd=ping,' + id + ',' + iIndex); return false;}

function processGroupletNode(url) {
 var uri1 = getUrlHost(url) + "/psc/" + getPSHome(url); for (var i = 0; i < groupletNodes.length; i++) {
 var uri = groupletNodes[i][0]; var urlList = groupletNodes[i][2]; if (url.indexOf(uri + "/") != -1 || url.indexOf(uri + "_") != -1) {
 groupletNodes[i][1] = true; for (var j = 0; j < urlList.length; j++) {
 doGrouplet(urlList[j][0] + ',' + urlList[j][1] + ',' + urlList[j][2]); }
 groupletNodes[i][2] = ""; }
 }
 updateGroupletNode();}

function updateGroupletNode() {
 if (bSessionStorage)
 sessionStorage.setItem("pt_groupletnodes", JSON.stringify(groupletNodes));}

function initWorkers(url, nMax) {
 initGroupletNodes(); if (typeof url != "undefined" && url.length > 0)
 workerURL = url; if (nMax > nMaxWorkers) nMaxWorkers = nMax; if (workers && workers.length == nMaxWorkers) return; workers = new Array(nMaxWorkers); var worker = null; for (var i = 0; i < nMaxWorkers; i++) {
 worker = new Worker(workerURL); worker.addEventListener('message', refreshGrouplet); worker.bBusy = false; workers[i] = worker; }
}


function initWorkerControllerTimer() {
 if (nControllerTimer == 0) return; workerControllerTimer = window.setInterval('refreshGrouplets(groupletList)', nControllerTimer);}

function clearWorkerTimer() {
 if (typeof workerControllerTimer == "undefined") return; window.clearTimeout(workerControllerTimer); workerControllerTimer = null;}

function refreshGrouplets(objGroupletList) {

 if (isSessionLoggedout(true) || (typeof objGroupletList == 'undefined' || objGroupletList.length == 0)) {
 clearWorkerTimer(); return false; }
 if (typeof objGroupletList == 'undefined' || objGroupletList.length == 0) return false; for (var i = 0; i < objGroupletList.length; i++) {
 var id = objGroupletList[i][0]; var url = objGroupletList[i][2]; var nLastTime = objGroupletList[i][8]; var el = document.getElementById(id); if (!el) {
 clearWorkerTimer(); return false; }
 if (url.length != 0 && isClass(el, "psc_inactive"))
 objGroupletList[i][10] = 1; else if (url.length != 0)
 {
 var nTimer = objGroupletList[i][7]; if (nTimer == 0) continue; var nNow = (new Date()).valueOf(); if ((nNow - nLastTime) > nTimer * 1000) {
 objGroupletList[i][8] = (new Date()).valueOf(); doGrouplet(url + ',' + id + ',' + i); }
 }
 }
 return false;}

function refreshGrouplet(e) {
 var eventName = ""; var eventData = ""; if (typeof e.data != "undefined") {
 var pos = e.data.indexOf("@"); if (pos != -1) {
 eventName = e.data.substring(0, pos); eventData = e.data.substring(pos + 1, e.data.length); } else
 eventData = e.data; }

 switch (eventName) {
 case "runScript":
 var sScript = eventData; eval(sScript); this.bBusy = false; this.data = ""; return; case "initScrolls":
 var nWaitMSec = 500;  if (eventData.length > 0)
 nWaitMSec = eventData; nTry = 0; if (browserInfoObj2 && (browserInfoObj2.isIE || browserInfoObj2.isFF))
 nTry = 4; function runInitScrolls() {
 initScrolls(); if (nTry > 0)
 setTimeout(runInitScrolls, nWaitMSec); nTry--; }
 setTimeout(runInitScrolls, nWaitMSec); this.bBusy = false; this.data = ""; return; case "free":
 SetCurSelectedRow(); if (groupletQueue.length > 0)
 doGrouplet(groupletQueue.shift()); return; case "eventMsg":
 this.bBusy = false; this.data = ""; doReloadOnMessage(groupletList, eventData); doReloadOnMessage(agGroupletList, eventData); break; default:
 var sArr = eventData.split(","); if (sArr.length > 3) {
 var nIndex = sArr[sArr.length - 1]; var eleId = sArr[sArr.length - 2]; sArr.splice(-2, 2); sArr = new Array(sArr.join(","), eleId, nIndex); }
 loadGrouplet(sArr[0], sArr[1], sArr[2], this); break; }
}

function doReloadOnMessage(objGroupletList, message) {
 for (var i = 0; i < objGroupletList.length; i++) {
 var id = objGroupletList[i][0]; var url = objGroupletList[i][2]; var msg = objGroupletList[i][9]; var el = document.getElementById(id); if (url.length != 0 && isClass(el, "psc_inactive"))
 objGroupletList[i][10] = 1; else if (url.length != 0 && msg == message) {
 var id = objGroupletList[i][0]; if (url.indexOf("bReload=y") == -1)
 url += "&bReload=y"
 doGrouplet(url + ',' + id + ',' + i); }
 }
}

function getGrouletIndexById(id) {
 for (var i = 0; i < groupletList.length; i++) {
 if (groupletList[i][0] == id) {
 return i; }
 }
 return -1;}

function getAGGrouletIndexById(id) {
 for (var i = 0; i < agGroupletList.length; i++) {
 if (agGroupletList[i][0] == id) {
 return i; }
 }
 return -1;}


function loadExtGrouplet(url, id, nIndex, worker) {
 
 
 var el = document.getElementById(id); if (!el)
 el = document.getElementById(winName + "div" + id); if (!el) {
 freeWorker(worker); return; }
 var psParamIdx = url.indexOf("&psqry=1"); var xTW = url.indexOf("&tW="); var xTH = url.indexOf("&tH="); if (xTW != -1) 
 el.setAttribute("data-tW", url.substring(xTW+4, xTW+5)); if (xTH != -1)
 el.setAttribute("data-tH", url.substring(xTH+4, xTH+5)); var txtHTML = "<iframe id='" + el.id + "_iframe' class='psc_groupletiframe' name='" + el.id + "_iframe'"; var title = 'Content'; if (el.id.indexOf("grouplet") != -1) {
 if (el.id.indexOf("grouplet_") != -1)
 var sId = el.id.substring(el.id.indexOf('_') + 1); else
 var sId = el.id.substring(el.id.indexOf('t') + 1); var titleObj = document.getElementById(sId); if (!titleObj) {
 sId = sId.replace('$', '_LBL$'); titleObj = document.getElementById(sId); }
 if (titleObj != null)
 title = titleObj.innerHTML; }
 txtHTML += " title='" + title + "'"; if (url.indexOf("ICGrouplet=6") != -1 || url.indexOf("tASz=1") != -1)
 txtHTML += " onload='autoResizeFrame(this)'"; if (psParamIdx != -1)
 url = url.substring(0, psParamIdx); txtHTML += " src='" + url + "'/></iframe>";  if (bypassIOSFrameWrknd()) 
 AddIOSHasStdIframe(el);  el.innerHTML = txtHTML;  freeWorker(worker); }

function isFrameReady(id) {
 var oframe = window.document.getElementById(id+"_iframe"); if (oframe && oframe.contentWindow) {
 var oWin = oframe.contentWindow; try {
 if (typeof oWin.bLoadCompleted != "undefined" && oWin.bLoadCompleted) {
 setModWinID = DoGroupletAutoSize(id + "_iframe"); return; }
 setTimeout("isFrameReady('" + id + "')", nWaitMSecFrame); }
 catch (err) {
 setTimeout("isFrameReady('" + id + "')", nWaitMSecFrame); }
 }
}

function DoGroupletAutoSize(id) {
 var oframe = top.window.document.getElementById(id); var eid = id.split("_iframe")[0]; var oContainer = window.document.getElementById(eid); if (!oframe || !oContainer) return; var nBarH = 16; if (browserInfoObj2.isIE || browserInfoObj2.isFF)
 nBarH += 19; else if (browserInfoObj2.isEdge)
 nBarH += 15; oframe.style.height =''; oContainer.style.height =''; var oWin = oframe.contentWindow; if (!oWin || !oWin.document || !oWin.document.body) return; var h = oWin.document.body.scrollHeight; if (browserInfoObj2.isChrome && h == 150) 
 h = oWin.document.body.clientHeight; if (isIOS() && !browserInfoObj2.bypassIOSFrameWrknd) 
 oContainer.style.height = h + 'px'; else
 oframe.style.height = h + 'px'; if (oWin.document.body.scrollHeight > oframe.clientHeight) {
 if (isIOS() && !browserInfoObj2.bypassIOSFrameWrknd) 
 oContainer.style.height = oWin.document.body.scrollHeight + 'px'; else
 oframe.style.height = oWin.document.body.scrollHeight + 'px'; }
 if (oWin.document.body.scrollWidth > oWin.document.body.clientWidth) {
 if (isIOS() && !browserInfoObj2.bypassIOSFrameWrknd) 
 oContainer.style.height = oWin.document.body.scrollHeight + nBarH + 'px'; else
 oframe.style.height = oWin.document.body.scrollHeight + nBarH+'px'; }

 
 if ((document.forms.length > 0) && (typeof SetGridSize == "function") &&
 ((document.forms[0].id == "PT_FLDASHBOARD") || (document.forms[0].id == "PT_LANDINGPAGE")))
 SetGridSize(null, false); }

function DoGroupletAutoSizeAll() {
 checkRemoveModeless(); if (isIOS() && isPSPhone())
 setTimeout(function () { DoGroupletAutoSizeAll0(); }, 200); else
 DoGroupletAutoSizeAll0();}

function DoGroupletAutoSizeAll0() {
 var nScrollTop = 0; var objAppContent = window.document.querySelector(".ps_apps_content"); if (objAppContent)
 nScrollTop = objAppContent.scrollTop; var gList = window.document.querySelectorAll(".psc_autosize-erc .psc_groupletiframe, .psc_autosize-grouplet .psc_groupletiframe"); for (var i = 0; i < gList.length; i++) {
 DoGroupletAutoSize(gList[i].id); }
 if (objAppContent)
 objAppContent.scrollTop = nScrollTop;}

function freeWorker(worker) {
 if (typeof worker !== "undefined") {
 worker.bBusy = false; worker.data = ""; worker.postMessage('free@'); }
 return;}

function loadGrouplet(url, id, nIndex, worker) {
 var bPingOnly = url.indexOf("?cmd=ping") != -1 && typeof id == "undefined"; if (url.length == 0 || url.indexOf("http") == -1) {
 if (ptConsole2.isActive()) {
 ptConsole2.append((new Date()).valueOf() + " bad format url: \n" + url); }
 freeWorker(worker); return; }
 if (url.indexOf("ICGrouplet=4") != -1 || url.indexOf("ICGrouplet=6") != -1){
 
 loadExtGrouplet(url, id, nIndex, worker)
 return; }

 if (id == "NB_CONTENT_TGT" && url.indexOf("PTNUI_MENU_COMP") > 0) {
 var lastFldr = null; if (url.indexOf("FLDR=") == -1) {
 lastFldr = sessionStorage.getItem("psNavBar_lastFolder"); if (lastFldr != null) {
 url = url + "&FLDR=" + lastFldr; }
 }

 if (typeof(lastFldr) == "string" && typeof(sessionStorage) != "undefined") {
 cacheId = "psNavBarCont_" + top.PTNavBar.CurPortal + "_" + lastFldr + "_" + top.document.documentElement.lang;  if (sessionStorage.getItem(cacheId) != null) {
 PTNavBar.OpenInContentArea(url, lastFldr); var sScript = "processing_" + document.forms[0].name + "(0,3000);"; eval(sScript); freeWorker(worker); return; }; }
 url = url.replace("ICGrouplet=2", "ICGrouplet=1"); }

 var el = document.getElementById(id); if (!el)
 el = document.getElementById(winName + "div" + id); if (!el && !bPingOnly) {
 freeWorker(worker); return; }

 var bLoaded = true; if (el && el.children.length == 1 && (el.children[0].tagName == "IMG" || isClass(el.children[0], 'psc_processing')))
 bLoaded = false; if (!bPingOnly && bLoaded && url.indexOf("bReload=y") == -1) {
 freeWorker(worker); return; }
 if (url.indexOf("ICGrouplet=3") != -1 || url.indexOf("ICGrouplet=5") != -1 || url.indexOf("ICGrouplet=7") != -1) {
 el.innerHTML = ""; var title = 'Content'; if (el.id.indexOf("grouplet") != -1) {
 if (el.id.indexOf("grouplet_") != -1)
 var sId = el.id.substring(el.id.indexOf('_') + 1); else
 var sId = el.id.substring(el.id.indexOf('t') + 1); var titleObj = document.getElementById(sId); if (!titleObj) {
 sId = sId.replace('$', '_LBL$'); titleObj = document.getElementById(sId); }
 if (titleObj != null)
 title = titleObj.innerHTML; else {
 if(el.parentElement && (el.parentElement.innerText && el.parentElement.innerText != "")){
 title = el.parentElement.innerText; title = title.replace(/\n/g,""); }
 }
 }
 var txtHTML = "<iframe id='" + el.id + "_iframe' title='" + title + "' class='psc_groupletiframe' src='" + url + "' name='" + el.id + "_iframe'"; if (url.indexOf("ICGrouplet=5") != -1 || url.indexOf("tASz=1") != -1)
 txtHTML += " onload='autoResizeFrame(this)'"; txtHTML += "/></iframe>"; if (bypassIOSFrameWrknd()) 
 AddIOSHasStdIframe(el); el.innerHTML = txtHTML; if (url.indexOf("ICGrouplet=7") != -1)
 setTimeout("isFrameReady('" + el.id + "')", nWaitMSecFrame); freeWorker(worker); return; }
 var loader = new net2.ContentLoader(url, null, id, "GET", 
 function () { 
 if (this.req.status == 400){
 freeWorker(worker); return; }
 if (url.indexOf("?cmd=ping") != -1) {
 if (!bPingOnly)
 processGroupletNode(url); freeWorker(worker); return; }
 var bIframe = false; if (!bIframe && this.req.responseText.indexOf("<html") != -1 || this.req.responseText.indexOf("<HTML") != -1) {
 freeWorker(worker); return; } 
 if (ptConsole2.isActive() && !bPerf) {
 ptConsole2.append((new Date()).valueOf() + " response:" + this.req.responseText.length + "\n" + this.req.responseText); }
 var bClean = true; if (url.indexOf("ICGrouplet=1") != -1)
 bClean = false; var el = document.getElementById(id); if (!el)
 el = document.getElementById(winName + "div" + id); if (!el) {
 freeWorker(worker); return; }
 if (!bIframe && el && (url.indexOf("tASz=1") != -1)) 
 el.setAttribute("data-bAutoSize", "y");  if (bIframe) {
 if (bypassIOSFrameWrknd())
 AddIOSHasStdIframe(el); el.innerHTML = ""; var txtHTML = "<iframe id='" + el.id + "_iframe' class='psc_groupletiframe' src='about:blank' name='" + el.id + "_iframe'"; if (url.indexOf("ICGrouplet=5") != -1 || url.indexOf("tASz=1") != -1)
 txtHTML += " onload='autoResizeFrame(this)'"; txtHTML += "/></iframe>";  el.innerHTML = txtHTML; elWin = document.getElementById(el.id + '_iframe'); elWin.contentDocument.write(this.req.responseText); elWin.contentDocument.close();  }
 else if (bClean) {
 el.innerHTML = ""; el.innerHTML = this.req.responseText; if (id.indexOf("$ctxmenu$divpop") != -1)
 processRCMenuPopup(el); if (url.indexOf("bTarget") != -1)
 SetTargetFocus(el); } else 
 this.processGrouplet(el); freeWorker(worker); if (typeof nIndex == 'undefined') {
 sScript = "processing_" + document.forms[0].name + "(0,3000);"; eval(sScript); }
 }, null, null, "application/x-www-form-urlencoded"); loader.objGrouplet = el; }

function doGrouplet(data)
{
 if (workers && workers.length == 0) {
 return;  }
 for (var i = 0; i < nMaxWorkers; i++) {
 if (workers[i].bBusy && workers[i].data == data) {
 groupletQueue.push(data); return; }
 }
 for (var i = 0; i < nMaxWorkers; i++) {
 if (!workers[i].bBusy) {
 workers[i].bBusy = true; workers[i].data = data; workers[i].postMessage(data); return; }
 }
 var bFound = false; for (var i = 0; i < groupletQueue.length; i++) {
 if (groupletQueue[i] == data) {
 return; }

 }
 groupletQueue.push(data);}

function anyLiveTiles(nMax, objGroupletList) {
 if (typeof objGroupletList == 'undefined' || objGroupletList.length == 0) return false; var bReturn = false; var nLiveTile = 0; for (var i = 0; i < objGroupletList.length; i++) { 
 var url = objGroupletList[i][2]; if (url.length != 0) {
 bReturn = true; nLiveTile++; }
 }
 return bReturn;}


function eventMsgCallback(EventName, EventData) {
 doGrouplet("eventMsg@"+EventName);}

function DoReloadGrouplets(objGroupletList, bRefresh) {
 if (typeof objGroupletList == 'undefined' || objGroupletList.length == 0)
 objGroupletList = groupletList; reloadGrouplets(objGroupletList, false, bRefresh);}

function LaunchTileURL(crefID, crefLabel, obj, url, nType, options, tid, bSave, bWarning, sScriptAfter) {
 if ((typeof crefID != "undefined") && (nType != 2 && nType != 3)){
 PTNavBar.saveMRU(crefID, crefLabel, url,"True");  }
 LaunchURL(obj, url, nType, options, tid, bSave, bWarning, sScriptAfter);}

function reloadGrouplets(objGroupletList, bPairing, bRefresh) {
 if (typeof objGroupletList == 'undefined' || objGroupletList.length == 0) return; if (typeof bRefresh == 'undefined') bRefresh = false; if (typeof bPairing == 'undefined') bPairing = true; for (var i = 0; i < objGroupletList.length; i++) {
 var id = objGroupletList[i][0]; var gType = objGroupletList[i][1]; var url = objGroupletList[i][2];  var aUrl =objGroupletList[i][3];  var tempUrl=objGroupletList[i][3].split("?");  var aType = objGroupletList[i][4];  var mOptions = objGroupletList[i][5];  var tid = objGroupletList[i][6]; var nTimer = objGroupletList[i][7];  var nReload = objGroupletList[i][10]; var nAsLink = objGroupletList[i][11]; var sCREFid = objGroupletList[i][12];    if(tempUrl[0].indexOf("CHANGE_PASSWORD")!= -1)
 aUrl = tempUrl[0]+"?"+encodeURIComponent(tempUrl[1]);  if (bRefresh && isClass(el, "psc_inactive") && url.length != 0)
 objGroupletList[i][10] = 1; else if ((bRefresh || nReload==1) && !isClass(el, "psc_inactive") && url.length != 0) {
 objGroupletList[i][10] = ''; if (url.indexOf("bReload=y") == -1) {
 if (url.indexOf("?") != -1)
 url = url + "&bReload=y"; else
 url = url + "?bReload=y"; }
 }
 else if (nTimer != 0 && url.length != 0) {
 if (nTimer < 10) { nTimer = 10; objGroupletList[i][7] = 10; }
 if (nTimer * 1000 < nControllerTimer || nControllerTimer == 0) nControllerTimer = nTimer * 1000; objGroupletList[i][8] = (new Date()).valueOf(); if (url.indexOf("bReload=y") == -1) {
 if (url.indexOf("?") != -1)
 url = url + "&bReload=y"; else
 url = url + "?bReload=y"; }
 }
 else
 objGroupletList[i][8] = 0; var sEventName = objGroupletList[i][9]; if (typeof sEventName != 'undefined' && sEventName.length != 0) {
 Subscribe(sEventName, eventMsgCallback); }
 var el = document.getElementById(id); if (aUrl.length > 0 && el != null && el.parentNode) {
 var grpid = id.replace('grouplet','div'); var elg = document.getElementById(grpid); var elgz = document.getElementById(grpid + '$gzoom'); if (elg && elgz) {
 elgz.setAttribute("onclick", "javascript:cancelBubble(event);gFocusObj = this;"); elgz.setAttribute("href", "javascript:LaunchURL(null,'" + aUrl + "'," + aType + ",'" + mOptions + "','" + tid + "')"); elgz.setAttribute("role", "button"); }
 else if (aUrl != "") {
 if (elg ){
 var elgLabel = elg.innerText; elgLabel = elgLabel.replace(/\'/g, ''); elgLabel = elgLabel.replace(/[\n\r]/g, ''); var crefid = grpid.replace('$', ''); var n = crefid.indexOf("PTNUI_"); if(n != -1 && n > 0) { 
 crefid = crefid.substring(n); }
 var label = elgLabel.replace(/ /g, ''); crefid = "PT_HCT_" + label; if (sCREFid != "NOTFOUND" || sCREFid != "")
 crefid = sCREFid; el.parentNode.setAttribute("onclick", "javascript:LaunchTileURL('"+ crefid +"','"+ elgLabel +"',this,'" + aUrl + "'," + aType + ",'" + mOptions + "','" + tid + "')");  }
 else {
 el.parentNode.setAttribute("onclick", "javascript:LaunchURL(this,'" + aUrl + "'," + aType + ",'" + mOptions + "','" + tid + "')"); }
 
 if (nAsLink == "1")
 el.parentNode.setAttribute("role", "link"); else
 el.parentNode.setAttribute("role", "button"); }
 } else if (url.length != 0 && el != null && el.parentNode) {
 var elP = el.parentNode; elLabel = elP.querySelector('.ps_groupleth .ps-label'); var elpers = document.querySelector('.nui_pagegb.persmode'); var eldash = document.querySelector('.pt_homepage.pt_apphomepage'); if (!elpers && (document.forms["PT_LANDINGPAGE"] || document.forms["PT_FLDASHBOARD"] || eldash)) 
 elP.setAttribute('role', 'region'); if (elLabel)
 elP.setAttribute('aria-labelledby', elLabel.id); }
 var bLoaded = true; if (el && el.children.length == 1 && (el.children[0].tagName == "IMG" || isClass(el.children[0], 'psc_processing')))
 bLoaded = false; if (url.length != 0 && !isClass(el, "psc_inactive") && (!bLoaded || url.indexOf("bReload=y") != -1)) {
 if (url.indexOf("nWidth=") == -1) {
 var nWidth = el.clientWidth; var nHeight = el.clientHeight; if (url.indexOf("?") == -1)
 url += "?nWidth=" + nWidth + "&nHeight=" + nHeight; else
 url += "&nWidth=" + nWidth + "&nHeight=" + nHeight; objGroupletList[i][2] = url; }

 if (ptConsole2.isActive())
 ptConsole2.append((new Date()).valueOf() + " grouplet content url: " + url); if (checkGroupletNode(url, id, i))
 doGrouplet(url + ',' + id + ',' + i); }
 else if (bPairing && el)
 moveGroup(id, gType); }
}
function loadGrouplets(url,nMax) {
 initWorkers(url,nMax); if (typeof groupletList != 'undefined' && groupletList.length > 0) {
 reloadGrouplets(groupletList); bAnyLiveTiles = anyLiveTiles(nMax, groupletList); if (bAnyLiveTiles)
 initWorkerControllerTimer(); }
 else if (typeof agGroupletList != 'undefined' && agGroupletList.length > 0) {
 reloadGrouplets(agGroupletList); }
 if (!gFocusObj) {
 var objWrap = document.getElementById("PT_WRAPPER"); if (isClass(objWrap, "ps_modal")) {
 DoTabbing(null, null, true); }
 }
 else
 ptCommonObj2.tryFocus0(gFocusObj); if (typeof PTNavBar == 'undefined') return;}


function addToPSTOOLSHIDDENS(id, objXML) {
 if (id == (winName + "hdrdivPTS_SRCHGROUPS_GLB")) 
 return; var objHidden = document.getElementById(winName + "divPSTOOLSHIDDENS"); if (objHidden) {

 var oObj = document.createElement("div"); var attrs = objXML.attributes; oObj.setAttribute("id", id); if (attrs.getNamedItem("class"))
 oObj.setAttribute("class", attrs.getNamedItem("class").value); oObj.innerHTML = objXML.firstChild.data; addHide(oObj); objHidden.appendChild(oObj); }
}


function moveGroup(id, gType)
{ 
 var hId = ""; var hObj = null; var bcontext = false; switch (gType) {
 case "7":
 hId = winName + "hdrdivPT_CUSTOM_LEFT"; break; case "8":
 hId = winName + "hdrdivPT_CUSTOM_RIGHT"; break; case "9":

 hObj = document.querySelector(":root.psc_form-small .ps_target-custmiddle,.ps_wrapper.pt_homepage:not(.pt_appshomepage) .ps_target-custmiddle"); if (!hObj) hObj = document.querySelector(".ps_header_bar_cont + .ps_pagetitle_cont .ps_target-custmiddle"); if (!hObj) hId = winName + "hdrdivPT_CUSTOM_ACTION"; break; case "10":
 hId = winName + "hdrdivPT_CUSTOM_BOTTOM"; break; case "15":

 hObj = document.querySelector(":root:not(.psc_form-small) .ps_context_cont .ps_custom_action"); if (!hObj) hId = winName + "hdrdivPT_CUSTOM_ACTION"; else bcontext = true; break; case "17":
 hId = winName + "hdrdivPT_CUSTOM_SEARCH"; break; case "18":
 hId = winName + "divPSPANELTABS"; break; case "19":
 hId = winName + "hdrdivPT_CUST_HEADER_AG"; break; case "20":
 hId = winName + "hdrdivPT_SEARCH_ACTION"; break; default:
 return; }
 var gObj = document.getElementById(id); if (!gObj) return; if (!hObj && hId) hObj = document.getElementById(hId); if (!hObj || gType == "18" && hObj.innerHTML =="") return; if (gType == "18") {
 var objTabC = ""; var idGTab = id + "_G"; objTabC = gObj.querySelector(".psc_group_pagetab"); if (!objTabC) {
 objTabC = document.createElement("div"); objTabC.className = "ps_box-pagetabs psc_group_pagetab"; objTabC.id = idGTab; }
 objTabC.innerHTML = hObj.innerHTML; gObj.innerHTML = ""; hObj.innerHTML = ""; addHide(hObj); gObj.appendChild(objTabC); }
 else {
 var tmp = hObj.innerHTML; hObj.innerHTML = ""; gObj = document.getElementById(id);  if (gObj && gType == 7 && bInModal) {
 objCancel = gObj.querySelector(".ps-button"); var modObj = top.document.getElementById(top.PTMOD_ + top.modId); if (modObj && objCancel) 
 modObj.sCancelName = objCancel.id;  }
 if (gObj)
 hObj.appendChild(gObj); else
 hObj.innerHTML = tmp;  if (bcontext) removeClass(hObj.parentElement.parentElement.parentElement.parentElement, "psc_force-hidden");  if (objToBeFocus)
 setTimeout(function() {tryFocusNew(document.getElementById(objToBeFocus));}, 500); }
}



function clearCustomGroup() {
 var hId = ""; hId = winName + "hdrdivPT_CUSTOM_LEFT"; var hObj = document.getElementById(hId); if (hObj) hObj.innerHTML = ""; hId = winName + "hdrdivPT_CUSTOM_RIGHT"; hObj = document.getElementById(hId); if (hObj) hObj.innerHTML = ""; var aObj = document.querySelectorAll(".ps_target-custmiddle"); for (var idx=0; idx < aObj.length; ++idx) 
 aObj[idx].innerHTML = ""; hId = winName + "hdrdivPT_CUSTOM_BOTTOM"; hObj = document.getElementById(hId); if (hObj) hObj.innerHTML = ""; hObj = document.querySelector(":root:not(.psc_form-small) .ps_context_cont .ps_custom_action"); if (hObj) {
 hObj.innerHTML = ""; addClass(hObj.parentElement.parentElement.parentElement.parentElement, "psc_force-hidden"); } else { hId = winName + "hdrdivPT_CUSTOM_ACTION"; hId = winName + "hdrdivPT_CUSTOM_ACTION"; hObj = document.getElementById(hId); if (hObj) hObj.innerHTML = ""; }
}

function getGroupletId(id, nLoc) {
 var nGId = winName; switch (nLoc) {
 case 0: 
 nGId += "hdrgrouplet"; break; case 1:
 nGId += "sidegrouplet"; break; case 2:
 nGId += "side2grouplet"; break; case 3:
 nGId += "ftrgrouplet"; break; default: 
 nGId += "grouplet"; }
 nGId += id; return nGId;}


function getGroupletParentId(id, nLoc) {
 var nGId = winName; switch (nLoc) {
 case 0: 
 nGId += "hdrdiv"; break; case 1:
 nGId += "sidediv"; break; case 2:
 nGId += "side2div"; break; case 3:
 nGId += "ftrdiv"; break; default: 
 nGId += "div"; }
 nGId += id; return nGId;}

function setGroupletActiveById(id, nLoc) {
 var nGId = getGroupletParentId(id, nLoc); setGroupletActive(document.getElementById(nGId));}

function setGroupletInactiveById(id, nLoc) {
 var nGId = getGroupletParentId(id, nLoc); setGroupletInactive(document.getElementById(nGId));}

function setGroupletActive(objG) {
 if (!objG) return; removeInvisible(objG); removeClass(objG, "psc_inactive");}

function setGroupletInactive(objG, bFlag) {
 if (!objG) return; addInvisible(objG); addClass(objG, "psc_inactive");}


function reloadGroupletById(id, nLoc) {
 var nGId = getGroupletId(id, nLoc); if (!document.getElementById(nGId)) return; var nIndex = getGrouletIndexById(nGId); if (nIndex == -1) return; var url = groupletList[nIndex][2]; if (url.indexOf("bReload=y") == -1)
 url += "&bReload=y"; doGrouplet(url + ',' + nGId + ',' + nIndex);}

function reloadAGGroupletById(id, nLoc) {
 var nGId = getGroupletId(id, nLoc); if (!document.getElementById(nGId)) return; var nIndex = getAGGrouletIndexById(nGId); if (nIndex == -1) return; var url = agGroupletList[nIndex][2]; if (url.indexOf("bReload=y") == -1)
 url += "&bReload=y"; doGrouplet(url + ',' + nGId + ',' + nIndex);}

function clearBackButtonFlag() {
 if (bSessionStorage) {
 sessionStorage.removeItem("isBackBtnAct"); }
}

function LaunchURL(obj, url, nType, options, tid, bSave, bWarning, sScriptAfter) {

 if (loaderTrf && loaderTrf.bInProcess)
 return; closeLastModal(); clearBackButtonFlag(); var sScriptAfter = (typeof sScriptAfter == "undefined") ? null : sScriptAfter; var bLaunchScript = (url.indexOf("http") == -1); var bAutoSave = (typeof bSave == "undefined" || !bSave) ? false : true; var bWarning = (typeof bWarning == "undefined" || bWarning) ? true : false; oWin = top.window; var bTopFluid = oWin.isFModeLayout(); if (!bTopFluid) {
 var objFrame = top.frames['TargetContent']; if (objFrame)
 oWin = objFrame; } else {
 var oTFrame = document.querySelector(".ps_target-iframe"); if (oTFrame) {
 oWin = oTFrame.contentWindow; try {
 if (oWin)
 var testLoad = oWin.bLoadCompleted;  if (oWin && (typeof oWin.bLoadCompleted == "undefined" || !oWin.bLoadCompleted))
 return; }catch(e) {}
 }
 }
 var sScript = ""; var bChanged = false; var closeQAB = false; if (!bLaunchScript) { 
 bChanged = checkFrameChanged(oWin); if (!bChanged && isClassic(top.frames)) 
 bChanged = checkAnyFrameChanged(top.frames); if (bTopFluid) {
 sScript = "processing_" + window.document.forms[0].name + "(1,3000);"; if (bChanged)
 sScript = "processing_" + top.window.document.forms[0].name + "(1,3000);"; }
 }
 switch (nType) {
 case 1:
 var open = window.open(url); if (open == null || typeof(open)=='undefined')
 alert("Turn off your pop-up blocker!");  break; case 2:
 if (options.indexOf("@.ps_tabh") != -1) {
 var bFound = false; var pObj = obj.parentNode.parentNode; for (var j = 0; j < pObj.children.length; j++) {
 var cObj = pObj.children[j].children[0]; if (isSelected(cObj))
 bFound = true; if (cObj == obj)
 addSelected(obj); else
 removeSelected(cObj); }

 var cObj = document.querySelector(".ps_tab_content"); var nHeight = cObj.clientHeight; if (!bFound)
 nHeight = cObj.clientHeight - 3; options += "height@" + nHeight; }
 if (options.indexOf("bCrossDomain@1") == -1) {
 if (isModeless(MTop().modlessId)) {
 if (url.indexOf('?') == -1)
 url += '?ICDoModeless=1'; else
 url += '&ICDoModeless=1'; sScript += "window.location.href ='" + url+"';"; }
 else{
 if (obj) gFocusObj = obj; sScript += "doModeless(\"" + url + "\", \"" + options + "\");"; }
 }
 else {
 showModalDialog_pt(url, window, options); return; }
 break; case 3:
 if (url.indexOf("bReload=y") == -1)
 url += "&bReload=y"; if (url.indexOf("bTarget=y") == -1)
 url += "&bTarget=y"; closeLastModal(); var sScript2 = "processing_" + document.forms[0].name + "(1,3000);"; eval(sScript2); loadGrouplet(url , tid); if (obj != null)
 PTNavBar.SelectTile(obj); break; case 4:
 if (typeof(top.PTNavBar)=="object")
 if (top.PTNavBar.IsOpen)
 top.PTNavBar.Toggle(); if (typeof(top.PTQABWin)=="object")
 if (top.PTQABWin.IsOpen)
 {
 top.PTQABWin.Hide();  closeQAB = true; }
 var sTopUrl = top.location.href; var topPSHomeSuffix = getPSHomeSuffix(sTopUrl); if (topPSHomeSuffix != null) { 
 url = url.replace('/'+getPSHome0(url)+getPSHomeSuffix(url)+'/', '/'+getPSHome0(url)+topPSHomeSuffix+'/');  var extURL = url.indexOf("?url=");   if (extURL != -1) {
 
 var siteName = getPSHome0(decodeURIComponent(url.substring(extURL))); if (siteName != null){
 var siteSuff = getPSHomeSuffix(decodeURIComponent(url.substring(extURL))); if (siteSuff != null)
 url = url.replace('%2f'+siteName+siteSuff+'%2f', '%2f'+siteName+topPSHomeSuffix+'%2f');  }
 } 
 } 
 sScript += "top.location = \"" + url + "\";"; break; case 5:
 var sTopUrl = window.location.href; var topPSHomeSuffix = getPSHomeSuffix(sTopUrl); if (topPSHomeSuffix != null)
 url = url.replace('/' + getPSHome0(url) + getPSHomeSuffix(url) + '/', '/' + getPSHome0(url) + topPSHomeSuffix +'/'); sScript += "window.location = \"" + url + "\";"; break; case 6:
 if (!bLaunchScript)
 url = AddMDSystemParams(url, nType); if (SingleComponentAGStep(url)) {
 if (sScriptAfter)
 eval(sScriptAfter); return; }
 if (!bAutoSave && bChanged) {
 sScript += "DoAJAXTransfer(\"" + url + "\");"; if (sScriptAfter)
 sScript += sScriptAfter; }
 else {
 if (!bChanged && !bLaunchScript) {
 var sScript = "processing_" + window.document.forms[0].name + "(1,3000);"; eval(sScript); }
 if (bChanged) {
 var winname = oWin.document.forms[0].name; sScript += "oWin.submitAction_" + winname + "(oWin.document.forms[0], \"#ICSave\", null,\"" + url + "\","+ bWarning+",\""
 +sScriptAfter+"\","+nType+");";; eval(sScript); } else {
 if (bLaunchScript)
 eval(url); else
 DoAJAXTransfer(url); if (sScriptAfter && !bLaunchScript)
 eval(sScriptAfter); }
 return; }
 break; case 7:
 if (!bChanged)
 eval("setTimeout(function(){processing_" + window.document.forms[0].name + "(1,3000)},100)");   url = AddMDSystemParams(url, nType); if (bChanged) {
 sScript += "DoAJAXTransfer(\"" + url + "\");SetSearchSelectedRow(\"" + tid + "\");"; }
 else {
 DoAJAXTransfer(url); SetSearchSelectedRow(tid); return; }
 break; case 8: 
 if (!bChanged)
 clearSide1Bottom(); url = AddMDSystemParams(url, nType); if (isMDListPopup())
 disableSide1(); if (bChanged) {
 sScript += "clearSide1Bottom();DoTargetIFrame(\"" + url + "\");SetSearchSelectedRow(\"" + tid + "\");SetPrevNext(\"PT_SIDE$content\");"; }
 else {
 DoTargetIFrame(url); SetSearchSelectedRow(tid); SetPrevNext('PT_SIDE$content'); return; }
 break; case 9:
 if (!bChanged)
 clearSide1Bottom(); if (!bLaunchScript)
 url = AddMDSystemParams(url, nType); if (isMDListPopup())
 disableSide1(); if (!top.window.isPIAUrl(url) && !top.window.isPortalUrl(url)) {
 
 if (typeof top.window.HideActionHelp == "function") 
 top.window.HideActionHelp(); }
 if (!bAutoSave && bChanged) {
 sScript = "clearSide1Bottom();DoTargetIFrame(\"" + url + "\");"; if (sScriptAfter)
 sScript += sScriptAfter; }
 else {
 if (bChanged) {
 var winname = oWin.document.forms[0].name; sScript = "clearSide1Bottom();oWin.submitAction_" + winname + "(oWin.document.forms[0], \"#ICSave\", null,\"" + url + "\"," + bWarning + ",\""
 + sScriptAfter + "\"," + nType + ");";; eval(sScript); } else {
 if (bLaunchScript)
 eval(url); else
 DoTargetIFrame(url); if (sScriptAfter)
 eval(sScriptAfter); }
 return; }
 break; default:
 var sTopUrl = document.location.href;  var topPSHomeSuffix = getPSHomeSuffix(sTopUrl); if (topPSHomeSuffix != null)
 url = url.replace('/' + getPSHome0(url) + getPSHomeSuffix(url)+'/', '/' + getPSHome0(url) + topPSHomeSuffix +'/'); sScript += "document.location = \"" + url + "\";";  }
 if ((typeof nType == "undefined") && (sScript != "")) {
 eval(sScript); } else {
 if (nType !=3 && nType != 1) {
 if (bChanged && nType != 2)
 oWin.psConfirmSW("", sScript.replace(/'/g, '\"'), top.window); else {
 if (isIOS() && nType == 4) 
 setTimeout(sScript,0); else
 eval(sScript); }
 if (closeQAB && typeof(top.PTQABWin) == "object")
 top.PTQABWin.Close(); }
 }
}

function SingleComponentAGStep(url) {
 var thisUrl = url.split("?")[0].split("/"); var lastUrl = strCurrUrl.split("?")[0].split("/"); if (thisUrl[thisUrl.length - 1] != lastUrl[lastUrl.length - 1])
 return false; if (url.indexOf("ICSingleComp=Y") == -1)
 return false; var regExp = /[\?&]PAGE=([^\?&]+)/; var pageName = regExp.exec(url)[1]; if (pageName == null || pageName == "")
 return false; var winname = oWin.document.forms[0].name; loader = null; var sScript = "oWin.submitAction_" + winname + "(document.forms[0], \"#ICPageName=" + pageName + "\")"; eval(sScript); return true;}

function AddMDSystemParams(url, nType) {
 if (isMDListAccordion())
 expandAcc("PT_SIDE_TOP0", true, true); var sWinCnt = getPSHomeSuffix(top.location.href); var sGWinCnt = getPSHomeSuffix(url); url = url.replace('/'+getPSHome0(url) + sGWinCnt+'/', '/'+getPSHome0(url) + sWinCnt+'/'); var paramsAdd = ""; if (url.indexOf('?') == -1)
 paramsAdd += '?'; if ((url.indexOf('ICAJAX=1') == -1) && (nType == 6 || nType == 7))
 paramsAdd += "&ICAJAX=1"; if ((url.indexOf('ICAGTarget=start') == -1) && (nType == 6 || nType == 9))
 paramsAdd += "&ICAGTarget=start"; if ((url.indexOf('ICMDTarget=start') == -1) && (nType == 7 || nType == 8))
 paramsAdd += "&ICMDTarget=start"; if ((url.indexOf('ICMDListPopup=true') == -1) && isMDListPopup())
 paramsAdd += "&ICMDListPopup=true"; else if ((url.indexOf('ICMDListAccordion=true') == -1) && isMDListAccordion())
 paramsAdd += "&ICMDListAccordion=true"; else if ((url.indexOf('ICMDListSlideout=true') == -1) && isMDListSlideOut())
 paramsAdd += "&ICMDListSlideout=true"; if ((url.indexOf('ICGuided=true') == -1) && isMDGuided())
 paramsAdd += "&ICGuided=true"; if ((url.indexOf('ICAJAXTrf=true') == -1) && isAjaxTrf())
 paramsAdd += "&ICAJAXTrf=true"; if ((url.indexOf('ICUOW=Y') == -1) && isSUOW())
 paramsAdd += "&ICUOW=Y"; if ((url.indexOf('ICSingleComp=Y') == -1) && isSingleComponentAG())
 paramsAdd += "&ICSingleComp=Y"; url += paramsAdd; var objTarget = document.getElementById("divPAGECONTAINER_TGT"); if (nType == 9 || nType == 8) {
 addClass(objTarget, "psc_has_iframe"); if (bypassIOSFrameWrknd()) addClass(objTarget, "psc_ios_bypass"); } else {
 removeClass(objTarget, "psc_has_iframe"); if (bypassIOSFrameWrknd()) removeClass(objTarget, "psc_ios_bypass"); }
 return url;}


function ResizeTargetIFrame() {
 if (!isClass(document.getElementById('PT_WRAPPER'), "psc_target-iframe")) return; var objTargetMain = document.querySelector(".ps_ag-maincontent"); var objTargetIframe = document.querySelector(".ps_target-iframe"); if (objTargetIframe && objTargetMain)
 objTargetIframe.style.height= (objTargetMain.clientHeight - 10) + "px";}

function DoTargetIFrame(url) {
 document.getElementById("PT_SIDE2").innerHTML = ""; document.getElementById('PT_FOOTER').innerHTML = "";  var objWrapper = document.getElementById('PT_WRAPPER'); if (sMDWrapperStyle.indexOf("pst_side1-open") == -1) {
 removeClass(objWrapper, "pst_side1-open"); }
 addClass(objWrapper, "psc_target-iframe"); var objTarget = document.getElementById("divPAGECONTAINER_TGT"); var objTargetMain = document.querySelector(".ps_ag-maincontent"); var txtHTML = "<iframe title='Main Content' class='ps_target-iframe' frameborder=0 src='" + url + "' "; txtHTML += "id='main_target_" + window.document.forms[0].name + "'></iframe>"; objTarget.innerHTML = txtHTML; ResizeTargetIFrame(); var sScript = "processing_" + window.document.forms[0].name + "(0,3000);"; eval(sScript);}

function DoAJAXTransfer(url) {
 if (isMDListSlideOut())
 removeHide(document.getElementById('PT_SIDE_BOTTOM0')); removeClass(document.getElementById('PT_WRAPPER'), "psc_target-iframe"); var objPanelControlStyle = document.getElementById('ICPanelControlStyle'); document.forms[0].action = url; if (objPanelControlStyle) {
 var sValue = objPanelControlStyle.value; sValue = sValue.replace(new RegExp("pst_(collision|side2)-[^ ]+", "g"), ""); url += "&ICPanelControlStyle=" + sValue + ""; }
 loaderTrf = new net2.ContentLoader(encodeURI(url), document.forms[0], "ICAGTarget", "GET", null, null, null, null, true);}

function keyHandlerRAMenu(e, objH){
 var key = (window.event)? window.event.keyCode: e.keyCode; if(key==9){ 
 var mhid = "ptModHeader_"+ MTop().modId;  var headobj = document.getElementById(mhid); var firstchild = headobj.children[0];  if(firstchild.getAttribute("class").indexOf("ps_popup-back") >-1 && firstchild.innerHTML !="") {
 firstchild.getElementsByTagName('a')[0].focus(); }
 else{ 
 var headlen = headobj.children.length; var lastchild = headobj.children[headlen-1]; if( lastchild.getAttribute("id").indexOf("ptModClose") >-1){
 lastchild.getElementsByTagName('a')[0].focus(); }
 }
 e.preventDefault(); return; }
 if(key==39) { 
 
 var objType = objH.parentNode.getAttribute("class"); if (!objType.localeCompare("ps_menu_folder"))
 expandMenu(objH); return; }
 if(key==37 || key==27) { 
 var obj = objH.parentNode; var objP = obj.parentNode; if (objP.getAttribute("class") == "ps_menu_content")
 objP = objP.parentNode; var tempid = objP.getAttribute("class").split(/\s+/)[0]; var len = tempid.length; var level = (tempid.charAt(len-1))-0; var backid="."+ tempid.slice(0,len-1) + (level); if ((browserInfoObj2.isFF || browserInfoObj2.isSafari) && isFModeLayout()) {
 evt = (window.event)? window.event:e; backMenu(backid,evt); }
 else {
 backMenu(backid); }
 return; }
 if(key==40) { 
 var obj = objH.parentNode; var objP = obj.parentNode;  for (var j = 0; j < objP.children.length; j++) {
 if (obj == objP.children[j]) {
 objF = objP.children[j + 1]; if (!objF) return; objF.getElementsByTagName('a')[0].focus(); }
 }
 return; }
 if(key ==38){ 
 var obj = objH.parentNode; var objP = obj.parentNode;  for (var j = 0; j < objP.children.length; j++) {
 if (obj == objP.children[j]) {
 objB = objP.children[j-1]; if (!objB) return; if (objB.getAttribute("class").indexOf("psc_hidden")>-1) return; objB.getElementsByTagName('a')[0].focus(); }
 }
 return; } 

}




function expandMenu(objH,event) {
 var obj = objH.parentNode; var objP = obj.parentNode; if (objP.getAttribute("class") == "ps_menu_content")
 objP = objP.parentNode; var objGP = objP.parentNode; replaceClass(objP, "ps_menu_open", "ps_menu_close"); objP.removeAttribute("role"); for (var j = 0; j < objP.children.length; j++) {
 addHide(objP.children[j]); }
 for (var j = 0; j < objGP.children.length; j++) {
 if (objP == objGP.children[j]) {
 objF = objGP.children[j + 1]; if (!objF) return; objF.innerHTML = obj.innerHTML; objF.setAttribute("role", "menu"); replaceClass(objF, "ps_menu_close", "ps_menu_open"); objF.removeEventListener('webkitTransitionEnd', clearTargetGroupBox, false); objFHeader = objF.children[0]; objFContent = objF.children[1]; removeHide(objFContent); addHide(objFHeader); objPHeader = objP.children[0]; var aClass = objF.getAttribute("class").split(" "); setModalDialogTitle(objFHeader.children[0].children[0].innerHTML, "."+aClass[0], objPHeader.children[0].innerHTML);  objFHeader.onclick = ""; for (var i = 0; i < objFContent.children.length; i++) {
 removeHide(objFContent.children[i]); var sid = (objFContent.children[i].getAttribute("id")) ? objFContent.children[i].getAttribute("id") : ""; if (sid != ""){
 sid = sid + "."+ i; objFContent.children[i].setAttribute("id", sid); }
 }
 
 if(typeof event != "undefined" && event != null && typeof event.preventDefault != "undefined" && event.preventDefault)
 event.preventDefault(); objGP.style.height = ''; resizeModalAll(); scrollInitDivPopup(objGP.id); objFContent.children[0].getElementsByTagName('a')[0].focus(); return; }
 }
}

function backMenu(sBackIdQS, evt) {
 var obj = MTop().document.querySelector(sBackIdQS); var objP = obj.parentNode; for (var j = 0; j < objP.children.length; j++) {
 if (obj == objP.children[j]) {
 objF = objP.children[j -1]; if (!objF) return;  objB = null; if (j > 1) objB = objP.children[j - 2];  objFHeader = objF.children[0]; objFContent = objF.children[1]; var aClass = objF.getAttribute("class").split(" "); if (j == 1)
 setModalDialogTitle(objFHeader.children[0].innerHTML); else if (objB)
 setModalDialogTitle(objFHeader.children[0].children[0].innerHTML, "." + aClass[0], objB.children[0].children[0].innerHTML); for (var j = 1; j < objF.children.length; j++) {
 removeHide(objF.children[j]); }
 replaceClass(objF, "ps_menu_close", "ps_menu_open"); replaceClass(obj, "ps_menu_open", "ps_menu_close"); objF.setAttribute("role","menu"); obj.removeAttribute("role"); obj.addEventListener('webkitTransitionEnd',clearTargetGroupBox, false); var objContent = obj.children[1]; var objContentClass = objContent.getAttribute("class") + " psc_hidden"; objContent.setAttribute("class", objContentClass);  objP.style.height = ''; resizeModalAll(); scrollInitDivPopup(objP.id); if(objContent.children[0].getAttribute("class").indexOf("ps_menu_link")!=-1)
 objFContent.getElementsByTagName('a')[0].focus(); else
 objFContent.children[0].getElementsByTagName('a')[0].focus(); obj.innerHTML =""; if((browserInfoObj2.isFF || browserInfoObj2.isSafari) && isFModeLayout() && typeof evt != "undefined" && evt != null) {
 {
 evt.preventDefault(); evt.stopPropagation();  }
 }
 return; }
 }
}

function resetMenu(mDivObj) {

 if (!mDivObj.getAttribute('options') || mDivObj.getAttribute('options').indexOf("ctxmenu") == -1) return; var objGP = mDivObj.children[0]; objP = objGP.children[0]; replaceClass(objP, "ps_menu_close", "ps_menu_open"); objP.setAttribute("role", "menu"); for (var i = 1; i < objP.children.length; i++) {
 removeHide(objP.children[i]); }
 for (var j = 1; j < objGP.children.length; j++) {
 objF = objGP.children[j]; replaceClass(objF, "ps_menu_open", "ps_menu_close"); objF.removeAttribute("role"); objF.innerHTML = ""; }
}
window.onorientationchange = function (event) {
 if (!(isIOS() && isPSPhone())) return; if (window.top == window)
 DoGroupletAutoSizeAll(); else
 window.bLoadCompleted = true;}

window.onresize = function (event) {
 try {
 initScrolls0();  autoCloseTypeAhead(); var modObj = MTop().document.getElementById(MTop().PTMOD_ + MTop().modId); if (typeof modObj !== "undefined" && modObj != null && modObj && !modObj.bFullScreen) 

 doCloseLocalModals(); cleanupCalendar(); if (window.top == window)
 resizeModalAll(); ResizeTargetIFrame(); ResizeAccordions(); if (!(isIOS() && isPSPhone())) {
 if (window.top == window)
 DoGroupletAutoSizeAll(); else
 window.bLoadCompleted = true; }
 } catch (e) {}
}



function ptSetFavIcon(imageUrl) {
 if (imageUrl && document) {
 var iconlink = document.querySelector("link[rel='icon']") ; var appleiconlink = document.querySelector("link[rel='apple-touch-icon']") ; if (iconlink)
 iconlink.href =imageUrl; if (appleiconlink) { 
 
 if (imageUrl.indexOf("/cs/") == 0) {
 imageUrl = imageUrl.substring(3,imageUrl.length); }
 appleiconlink.href =imageUrl; }
 }
}

function setScrollStyle(obj)
{
 if (!isClass(obj, 'ps_scrollable')) {
 addClass(obj, "ps_scrollable"); if (obj.bCarousel)
 addClass(obj, "psc_carousel nbar"); else {
 if (obj.bVScroll && obj.bHScroll)
 addClass(obj, "ps_scrollable_both"); else if (obj.bVScroll)
 addClass(obj, "ps_scrollable_v"); else if (obj.bHScroll)
 addClass(obj, "ps_scrollable_h"); if (obj.bNoBar)
 addClass(obj, "nbar"); else {
 if (obj.bVScroll) {
 addClass(obj, "sbar"); addClass(obj, "sbar_v"); }
 if (obj.bHScroll) {
 addClass(obj, "sbar"); addClass(obj, "sbar_h"); }
 }
 }
 }
}

function clearScrollStyle(obj) {
 if (isClass(obj, 'ps_scrollable')) {
 removeClass(obj, 'psc_carousel nbar'); removeClass(obj, 'ps_scrollable_both'); removeClass(obj, 'ps_scrollable_v'); removeClass(obj, 'ps_scrollable_h'); removeClass(obj, 'ps_scrollable'); removeClass(obj, 'nbar'); removeClass(obj, 'sbar sbar_v'); removeClass(obj, 'sbar sbar_h'); return true; }
 return false;}

function clearAllScrollStyle() {
 if (typeof scrollFieldList == 'undefined' || scrollFieldList.length == 0) return; var bAnyScrollSet = false; for (var i = 0; i < scrollFieldList.length; i++) {
 var id = scrollFieldList[i][0]; var obj = document.getElementById(scrollFieldList[i][0]); bAnyScrollSet = clearScrollStyle(obj); }
 return bAnyScrollSet;}

function isScrollable(obj)
{
 if (!obj) return false; if (isClass(obj, 'ps_scrollable')) return true; if (typeof obj.id == "undefined" || !obj.id) return false; if (typeof scrollFieldList == 'undefined' || scrollFieldList.length == 0) return; for (var i = 0; i < scrollFieldList.length; i++) {
 var id = scrollFieldList[i][0]; if (obj.id == id)
 return true; }
 return false;}

function initScrolls0(bAJAX) {
 if (isPSPhone() || browserInfoObj2.isIE || browserInfoObj2.isFF)
 doGrouplet('initScrolls@100'); else
 doGrouplet('initScrolls@10');}

function initScrolls() {
 if (typeof scrollFieldList == 'undefined' || scrollFieldList.length == 0) {
 playDivPopup(); return; }
 for (var i = 0; i < scrollFieldList.length; i++) {
 var id = scrollFieldList[i][0]; var obj = document.getElementById(id); if (!obj) continue; if (obj && isClass(obj, "psc_scroll")) {
 removeClass(obj, "ps_scrollable"); removeClass(obj, "sbar_v"); removeClass(obj, "sbar"); continue; }
 obj.bVScroll = scrollFieldList[i][1]; obj.bHScroll = scrollFieldList[i][2]; obj.bCarousel = scrollFieldList[i][3]; if (isPSTablet() || isPSPhone())
 scrollFieldList[i][4] = 1; obj.bNoBar = scrollFieldList[i][4]; obj.bModal = scrollFieldList[i][5]; obj.bAutoSize = scrollFieldList[i][6]; obj.nTop = scrollFieldList[i][7]; obj.nLeft = scrollFieldList[i][8]; if (typeof scrollFieldListOld != 'undefined' && scrollFieldListOld && scrollFieldList.length == scrollFieldListOld.length && scrollFieldList[i][0] == scrollFieldListOld[i][0]){
 obj.nTop = scrollFieldListOld[i][7]; obj.nLeft = scrollFieldListOld[i][8]; }
 obj.bPopup = scrollFieldList[i][9]; setScrollStyle(obj); var nMaxHeight = 0; if (obj.bCarousel)
 carouselInit(id); else if (!obj.bPopup)
 scrollInit(id, obj.bAutoSize, nMaxHeight, obj.nTop, obj.nLeft); }
 this.bLazyLoading = false; this.nLazyTime = (new Date()).valueOf(); if (isAnyDivPopup())
 playDivPopup();}


function updateScrollFieldList(arrObj) {
 if (typeof scrollFieldList == 'undefined') {
 scrollFieldList = arrObj; return; }
 for (var i = 0; i < arrObj.length; i++) {
 var id = arrObj[i][0]; var bFound = false; for (var j = 0; j < scrollFieldList.length; j++) {
 if (scrollFieldList[j][0] == id) {
 bFound = true; if (arrObj[i][7] == -1) {
 var nTop = scrollFieldList[j][7]; var nLeft = scrollFieldList[j][8]; scrollFieldList[j] = arrObj[i]; scrollFieldList[j][7] = nTop; scrollFieldList[j][8] = nLeft; }
 break; }
 }
 if (!bFound)
 scrollFieldList[j] = [arrObj[i][0], arrObj[i][1], arrObj[i][2], arrObj[i][3], arrObj[i][4], arrObj[i][5], arrObj[i][6], arrObj[i][7], arrObj[i][8], arrObj[i][9]]; }
}

function IsAutoResize(id) {
 if (typeof scrollFieldList == 'undefined' || scrollFieldList.length == 0) return false; for (var i = 0; i < scrollFieldList.length; i++) {
 if (scrollFieldList[i][0] == id && scrollFieldList[i][2] == 1)
 return true; }
 return false;}

function carouselInit(id) {
 var obj = this.document.getElementById(id); if (!obj) return; obj.bCarousel = true; var objC = obj.children[1]; if (objC.getAttribute('class') &&
 objC.getAttribute('class').indexOf("ps_box-scrollarea") == -1)
 return; var objP = obj.parentNode; var objMore = GetLazyScrollObj(obj); var objPrev = GetLazyScrollObj(obj, true); var nCWidth = objC.children[0].clientWidth; var nCHeight = objC.children[0].clientHeight; for (var i = 1; i < objC.children.length; i++) {
 if (objC.children[i].clientHeight > nCHeight)
 nCHeight = objC.children[i].clientHeight; }
 var nMaxWidth = obj.clientWidth; var nMaxCnt = parseInt(nMaxWidth / nCWidth + 1); if (nMaxCnt > objC.children.length) nMaxCnt = objC.children.length; var nSpace = (nMaxWidth - (nMaxCnt - 1) * objC.children[0].clientWidth) / 2; var pos = obj.getBoundingClientRect(); var objLeft = obj.children[0]; var objRight = obj.children[2]; removeHide(objLeft); removeHide(objRight); objLeft.style.height = nCHeight + 'px'; objLeft.children[0].style.height = objLeft.clientWidth + 'px'; objLeft.children[0].style.width = objLeft.clientWidth * 0.9 + 'px'
 objRight.style.height = nCHeight + 'px'; objRight.children[0].style.height = objRight.clientWidth + 'px'; objRight.children[0].style.width = objRight.clientWidth * 0.9 + 'px'; var posL = objLeft.getBoundingClientRect(); objRight.style.left = posL.right + nCWidth - posL.left + 'px'; objLeft.style.top = nCHeight / 2 - 20 + 'px'; objRight.style.top = nCHeight / 2 - 20 + 'px'; obj.bCarousel = true; obj.nCWidth = nCWidth; obj.nCHeight = nCHeight; obj.nMaxCnt = nMaxCnt; obj.nSpace = nSpace; obj.nCurPos = 0; var nCnt = parseInt(nMaxCnt / 2); if (nSpace > 0) {
 var nLastPos = objC.children.length - 1; if (objMore)
 nLastPos = objC.children.length - 2; for (var i = 0; i < nCnt; i++) {
 var objLast = objC.children[nLastPos]; objC.removeChild(objLast); objC.insertBefore(objLast, objC.firstChild); }
 var objChild = objC.children[0]; if (nCWidth > nSpace)
 objChild.style.marginLeft = nSpace + 'px'; else
 objChild.style.marginLeft = nSpace - nCWidth + 'px'; }

}

function carouselLeft(objL)
{
 var obj = objL.parentNode; var nMaxCnt = obj.nMaxCnt; var nCWidth = obj.nCWidth; var nSpace = obj.nSpace; var objC = obj.children[1]; var nCurPos = obj.nCurPos; var objMore = GetLazyScrollObj(obj); var objPrev = GetLazyScrollObj(obj, true); var objFirst = objC.children[0]; if (objPrev) objFirst = objC.children[1]; objFirst.style.marginLeft = ""; var nCnt = parseInt(nMaxCnt / 2); var nLastPos = objC.children.length - 1; if (objMore)
 nLastPos = objC.children.length - 2; var objLast = objC.children[nLastPos]; objC.removeChild(objLast); objC.insertBefore(objLast, objFirst); var objChild = objC.children[0]; if (objPrev) objChild = objC.children[1]; if (nCWidth > nSpace)
 objChild.style.marginLeft = nSpace + 'px'; else
 objChild.style.marginLeft = nSpace - nCWidth + 'px'; obj.nCurPos = nCurPos + 1; if (objMore)
 objMore.onclick();}


function carouselRight(objL) {
 var obj = objL.parentNode; var nMaxCnt = obj.nMaxCnt; var nCWidth = obj.nCWidth; var nSpace = obj.nSpace; var objC = obj.children[1]; var nCurPos = obj.nCurPos; var objPrev = GetLazyScrollObj(obj, true); var objRemove = objC.children[nCurPos]; if (objPrev) objRemove = objC.children[1]; objRemove.style.marginLeft = ""; objC.removeChild(objRemove); objC.appendChild(objRemove); var objChild = objC.children[0]; if (objPrev) objChild = objC.children[1]; if (nCWidth > nSpace)
 objChild.style.marginLeft = nSpace + 'px'; else
 objChild.style.marginLeft = nSpace - nCWidth + 'px'; if (objMore)
 objMore.onclick();}

function doScroll(objWrap, bLazyScroll) {
 if (isAnyMsg() || isLastMsgModal())
 return; if (bLazyScroll)
 doLazyScroll(objWrap); var id = objWrap.id; var idHeader = id.replace("grid", "colhdr"); var objWrapHeader = document.getElementById(idHeader); if (objWrapHeader && (typeof(objWrapHeader.firstChild.style) != "undefined"))
 objWrapHeader.firstChild.style.marginLeft = -objWrap.scrollLeft+'px'; for (var j = 0; j < scrollFieldList.length; j++) {
 if (scrollFieldList[j][0] == id) {
 if (objWrap.scrollTop > 0)
 scrollFieldList[j][7] = objWrap.scrollTop; if (objWrap.scrollLeft > 0)
 scrollFieldList[j][8] = objWrap.scrollLeft; }
 }

 if (scrollFieldList.length > 0)
 scrollFieldListOld = scrollFieldList.slice(); if (isIOS()) 
 objWrap.style.zIndex = 11;}

function initAllGrids() {
 if (typeof scrollFieldList == 'undefined' || scrollFieldList.length == 0) return; for (var i = 0; i < scrollFieldList.length; i++) {
 var id = scrollFieldList[i][0]; if (id.indexOf("grid") == -1) continue; gridInit(id); }
}

function gridInit(id) {
 var objWrap = document.getElementById(id); if (!objWrap) return; setRowSelectedAll(id.replace("$grid", "")); var nLastWidth = objWrap.clientWidth; var idHeader = id.replace("grid", "colhdr"); var objWrapHeader = document.getElementById(idHeader); if (!objWrapHeader) return; var objTable = objWrap.querySelector(".ps_grid-flex"); var objHead = objWrap.querySelector(".ps_grid-head"); var objTableHeader = objWrapHeader.querySelector(".ps_grid-flex-head"); if (!objHead || !objTable || !objTableHeader) return; if (objTable.clientWidth == 0) return; var lst = objWrap.querySelectorAll(".ps_grid-col"); var lst2 = objWrapHeader.querySelectorAll(".ps_grid-col"); objTableHeader.style.width = ''; objWrapHeader.style.width = ''; for (var i = 0; i < lst2.length; i++) {
 if (i == 0 && isClass(lst[i], 'psc_checkbox'))
 { }
 else
 lst2[i].style.width = ''; }

 
 objTable.style.marginTop = -objHead.clientHeight + 'px'; objTable.style.marginTop = -objHead.clientHeight + 'px';  var bBar = (isClass(objWrap, "sbar_v") && objWrap.scrollHeight > objWrap.clientHeight) ? true : false; var nHeadW = objTable.clientWidth + 2; var objVBar = objTableHeader.querySelector(".psc_gridvbar"); if (bBar) {
 if (browserInfoObj2.isIE || browserInfoObj2.isFF) {
 nHeadW = objHead.clientWidth + 18; if (objVBar) objVBar.style.width = 17 + 'px'; }
 else if (browserInfoObj2.isEdge) {
 nHeadW = objHead.clientWidth + 13; if (objVBar) objVBar.style.width = 14 + 'px'; }
 else {
 nHeadW = objHead.clientWidth + 14; if (objVBar) objVBar.style.width = 15 + 'px'; }
 removeHide(objVBar); setAriaAttr(objVBar, "aria-hidden", "true"); objTableHeader.style.width = nHeadW + 'px'; objWrapHeader.style.width = nHeadW + 'px'; }
 else if (!isHidden(objVBar)) {
 addHide(objVBar); objTableHeader.style.width = nHeadW + 'px'; objWrapHeader.style.width = nHeadW + 'px'; }
 else if (objWrap.bHScroll || isHScroll(objWrap)) { 
 var vbarWdth = 0; if ((objWrap.bVScroll && !objWrap.bHScroll) || (isVScroll(objWrap) && !isHScroll(objWrap))) {
 vbarWdth = 14; if (browserInfoObj2.isIE || browserInfoObj2.isFF)
 vbarWdth = 18; }

 var nTblHdrWdth = objTable.clientWidth + vbarWdth; objWrapHeader.style.width = objWrapHeader.scrollWidth + 'px'; objTableHeader.style.width = nTblHdrWdth + 'px'; }
 else {
 nHeadW = objWrapHeader.scrollWidth;  objTableHeader.style.width = nHeadW + 'px'; objWrapHeader.style.width = nHeadW + 'px'; }

 
 var nWidths = []; var nColCount = lst.length -1; for (var i = 0; i <= nColCount; i++)
 nWidths.push(lst[i].clientWidth); var nLastCol = -1; for (var i = nColCount; nLastCol == -1 && i <= nColCount && i >= 0; i--) {
 if (nLastCol == -1 && lst[i].querySelector(".ps_grid-col-label") && !isClass(lst[i], "psc_trigger"))
 nLastCol = i; }

 for (var i = 0; i <= nColCount; i++) {
 if (nLastCol != i)
 lst2[i].style.width = nWidths[i] + "px"; }
 
 objTable.style.marginTop = -objHead.clientHeight + 'px'; }


function getScrollContentContainer(obj)
{
 if (!obj) return null; var objC = obj; if (isClass(objC,'ps_box-grid') && !isClass(obj.children[0], 'ps_grid-div'))
 objC = obj.children[0]; else if (isClass(objC, 'ps_header-group') && obj.children.length == 2)
 objC = obj.children[1]; return objC;}

function scrollInitDivPopup(scrollId) {
 var otb = MTop().document.getElementById("ptModTable_" + MTop().modId); var nMaxHeight = otb.clientHeight; var objPHeader = otb.querySelector(".ps_header-group.psc_side1"); if (objPHeader && !isHidden(objPHeader))
 nMaxHeight -= objPHeader.clientHeight + 13; else if (!objPHeader) {
 objPHeader = otb.querySelector(".ps_modal_header"); if (objPHeader && !isHidden(objPHeader))
 nMaxHeight -= objPHeader.clientHeight; }

 var obj = document.getElementById(scrollId); if (!isClass(obj, 'ps_scrollable'))
 initScrolls(); scrollInit(scrollId, true, nMaxHeight, 0, 0, otb.clientWidth, true);}

function scrollInit(id, bAutoSize, nMaxHeight, nTop, nLeft, nMaxWidth, bDivPopup) {
 var gid = id.replace("$grid", ""); var gobj = this.document.getElementById(gid); if (gobj && isClass(gobj, "psc_noscroll")) bAutoSize = false; var objTabs = null; if (gobj)
 objTabs = gobj.querySelector(".ps_tabs"); if (objTabs) {
 for (var i = 0; i < objTabs.children.length; i++) {
 objTab = objTabs.children[i]; if (objTab && isClass(objTab, "ps_tab") && isClass(objTab, "psc_selected")) {
 
 var grdId = id.replace(/win[0-9]+div/, ""); var gridTabId = objTab.parentNode.id.replace(/win[0-9]+div/, ""); var tabId = objTab.id.replace(/win[0-9]+div/, ""); removeClass(objTab, "psc_selected"); selectGridTab(gid, gridTabId, objTab.classList[1], tabId, true); }
 }
 }
 if (!bAutoSize) {
 gridInit(id); return; }
 var obj = this.document.getElementById(id); if (!obj) return; if (typeof nTop == 'undefined' || !nTop)
 nTop = 0; if (typeof nLeft == 'undefined' || !nLeft)
 nLeft = 0; if (typeof bDivPopup == 'undefined')
 bDivPopup = false; obj.bCarousel = false; objP = obj.parentNode; objC = getScrollContentContainer(obj); objC.style.height = ""; objC.style.width = ""; var bVScroll = obj.bVScroll || isVScroll(obj); var bHScroll = obj.bHScroll || isHScroll(obj); var objMore = GetLazyScrollObj(obj); var objPrev = GetLazyScrollObj(obj, true); var bGrid = (id.indexOf("grid") != -1)? true:false; var nCHeight = objC.clientHeight; var nBarHeight = Math.round(nCHeight /10); if (bGrid) {
 var objHead = obj.querySelector(".ps_grid-head"); if (objHead)
 nCHeight -= objHead.clientHeight; }

 var objS = this.document.getElementById('PT_SIDE'); var fullWidth = Math.min(document.body.scrollWidth,ptCommonObj2.getViewportWidth(window)); var pos = ptCommonObj2.getPosition(obj); var posS = ptCommonObj2.getPosition(objS); if (objS == null || objS.innerHTML.length <= 10)
 posS = { x: 0, y: 0 }; var nMaxW = fullWidth - pos.x - posS.x; var fullHeight = ptCommonObj2.getViewportHeight(window); var nMaxH = fullHeight - pos.y - 1; if (nMaxH < fullHeight*.20)
 nMaxH = fullHeight; else if (isPSPhone() && nMaxH < fullHeight * .50 && fullHeight < 350)
 nMaxH = fullHeight/2; var objAppC = document.querySelector(".ps_apps_content"); if (objAppC) nMaxH -= 13; var bSortList = (id.indexOf("$SORTLIST") != -1); var gid = id.replace("$grid", ""); var gobj = this.document.getElementById(gid); var sMarginBottom = gobj ? window.getComputedStyle(gobj).marginBottom : "0px"; var nMarginBottom = sMarginBottom.replace("px", ""); nMaxH -= nMarginBottom; if (bSortList) {
 nMaxHeight = getModObjHeight(MTop().modId) - getModObjHeaderHeight(MTop().modId); if (objC.clientHeight == nMaxHeight)
 nMaxHeight += 2; }

 if (typeof nMaxHeight != 'undefined' && nMaxHeight && nMaxHeight > 0) {
 fullHeight = nMaxHeight; nMaxH = nMaxHeight; }
 if (typeof nMaxWidth != 'undefined' && nMaxWidth && nMaxWidth > 0) {
 fullWidth = nMaxWidth; nMaxW = nMaxWidth; }
 if (nCHeight == 0)
 nCHeight = nMaxH; else
 nCHeight = nCHeight + 3; var objF = this.document.getElementById('PT_FOOTER'); if (!isPSPhone() && !bDivPopup && !isClass(obj, "ps_box-grid-typeahead") && objF) {
 var posF = objF.getBoundingClientRect(); nMaxH = nMaxH - (posF.bottom - posF.top); }
 if (bHScroll) nMaxH = nMaxH - 5; if (bVScroll && objP.clientWidth > 0) {
 var nHeight = 0; if (objMore && (nMaxH > (nCHeight - 15))) {
 nHeight = nCHeight - nBarHeight; }
 else if (objC.clientHeight >= nMaxH) {
 nHeight = nMaxH; }
 else
 nHeight = nCHeight - 3; if (nHeight == 0 || nHeight > nMaxH)
 nHeight = nMaxH; if (bSortList) {
 var otb = MTop().document.getElementById("ptModTable_" + MTop().modId); var otbHt = ptCommonObj2.getHeight(otb);  var vpHeight = ptCommonObj2.getViewportHeight(window); var oButton = otb.querySelector(".ps_halign-center");  if (otbHt > vpHeight) {
 var oHeader = MTop().document.getElementById("ptModHeader_" + MTop().modId); var headerHt = oHeader.clientHeight; var oContent = MTop().document.getElementById("ptModContent_" + MTop().modId); var contentHt = nHeight - headerHt; nHeight = vpHeight - 50;  otb.style.height = nHeight +'px';   oContent.style.height = contentHt +'px'; nHeight = contentHt; }
 if ((otbHt > nHeight) && (otbHt < vpHeight)) {
 if (oButton) {
 if (oButton.firstChild && ((oButton.firstChild.id.indexOf("hpers") != -1) || (oButton.firstChild.id.indexOf("hunsavesort") != -1))) {
 if (otbHt < (nHeight + oButton.clientHeight)) {
 if (otbHt + oButton.clientHeight > vpHeight) {
 otb.style.height = vpHeight + "px";  nHeight = nHeight - oButton.clientHeight;  }
 else
 otb.style.height = otbHt + oButton.clientHeight + "px";  }
 }
 else
 nHeight = nHeight - oButton.clientHeight;  }
 }
 if ((otbHt > nHeight) && (otbHt >= vpHeight)) {
 otb.style.height = vpHeight + "px"
 if (oButton) {
 if (oButton.firstChild && ((oButton.firstChild.id.indexOf("hpers") != -1) || (oButton.firstChild.id.indexOf("hunsavesort") != -1))) {
 if ((nHeight + oButton.clientHeight > vpHeight) || (otbHt == vpHeight))
 nHeight = nHeight - oButton.clientHeight; }
 else
 nHeight = nHeight - oButton.clientHeight; }
 }
 }
 obj.style.height = nHeight +'px'; resetScroll(obj); }
 if (bHScroll && objP.clientHeight > 0) {
 if (!bVScroll) {
 if ((objC.clientHeight + 5) > nMaxH) {
 objC.style.height = nMaxH + 'px'; obj.style.height = nMaxH + 'px'; }
 else {
 var nHeight = objC.clientHeight; objC.style.height = nHeight + 'px'; obj.style.height = nHeight + 'px'; }
 }

 var nWidth = 0; if (objC.clientWidth >= nMaxW)
 nWidth = nMaxW; if (nWidth > 0)
 obj.style.width = nWidth + 'px'; else {
 obj.style.width = ""; }

 if (id.indexOf("grid") != -1) {
 var idHeader = id.replace("grid", "colhdr"); var objWrapHeader = document.getElementById(idHeader); if (objWrapHeader)
 objWrapHeader.style.width = obj.clientWidth + 'px'; }
 resetScroll(obj); }

 if (bGrid)
 gridInit(id); obj.scrollTop = nTop; obj.scrollLeft = nLeft; if (isIOS()) {
 if (obj.style.zIndex == 11)
 obj.style.zIndex = 0; else
 obj.style.zIndex = 11; }
}

function isVScroll(obj) {
 var sClass = obj.getAttribute('class'); var bVScroll = (sClass && (sClass.indexOf("ps_scrollable_v") != -1 || sClass.indexOf("ps_scrollable_both") != -1)) ? true : false; return bVScroll;}

function isHScroll(obj) {
 var sClass = obj.getAttribute('class'); var bHScroll = (sClass && (sClass.indexOf("ps_scrollable_h") != -1 || sClass.indexOf("ps_scrollable_both") != -1)) ? true : false; return bHScroll;}

function resetScroll(obj) {
 var objMore = GetLazyScrollObj(obj); var objPrev = GetLazyScrollObj(obj, true); var bVScroll = isVScroll(obj); var bHScroll = isHScroll(obj); var nOff = 10; var objC = getScrollContentContainer(obj); if (objMore) {
 if (bVScroll)
 {
 var objHead = obj.querySelector(".ps_grid-head"); nOff = (objC.clientHeight - obj.clientHeight) - obj.scrollTop; if (objHead) nOff -= objHead.clientHeight; }
 else if (bHScroll) nOff = (objC.clientWidth - obj.clientWidth) - obj.scrollLeft; if (nOff < 5) {
 if (bVScroll)
 obj.scrollTop -= 10; else if (bHScroll)
 obj.scrollLeft -= 10; }
 }
 if (objPrev && bVScroll && obj.scrollTop < 5)
 obj.scrollTop = 5; else if (objPrev && bHScroll && obj.scrollLeft < 5)
 obj.scrollLeft = 5; obj.curScrollLeft = obj.scrollLeft;}

function doOnScroll(obj) {
 var objWrap = obj; if (!objWrap.parentNode) return; var objTrack = objWrap.parentNode.children[1], objContent = objWrap.children[0], objGripper = objTrack.children[0]; var t = objWrap.clientHeight, u = objContent.offsetHeight, v = objTrack.offsetHeight, w = t / u * v; if (w < v) {
 objGripper.style.height = w + 'px'; var x = objWrap.scrollTop / u * v; objGripper.style.top = x + 'px'; objTrack.style.opacity = 1; }
 else
 objTrack.style.opacity = 0;}

function showTrack(obj) {
 var objWrap = obj; var objContent = objWrap.children[0]; var objTrack = objWrap.parentNode.children[1]; var objGripper = objTrack.children[0]; var t = objWrap.clientHeight,
 u = objContent.offsetHeight,
 v = objTrack.offsetHeight,
 w = t / u * v; if (w < v)
 objGripper.style.height = w + 'px'; if (objWrap.clientHeight < objContent.clientHeight)
 objTrack.style.opacity = 1;}

function hideTrack(obj) {
 var objWrap = obj; var objTrack = objWrap.parentNode.children[1]; objTrack.style.opacity = 0;}

this.objGripper = null;this.bLazyLoading = false;this.nLazyTime = null;function scrollingStart(obj) {
 this.objGripper = null; event = event || window.event; if (!((event.which && event.which === 1) || (event.button && event.button === 1))) return; var eObj = ptCommonObj2.getEO(event); if (eObj && eObj.tagName == "INPUT") return; event.preventDefault(); this.objGripper = ptCommonObj2.getMouseCoords(event);}

function scrolling(obj) {
 if (!this.objGripper) return; event = event || window.event; if (!((event.which && event.which === 1) || (event.button && event.button === 1))) return; var eObj = ptCommonObj2.getEO(event); if (eObj && eObj.tagName == "INPUT") return; event.preventDefault(); var objMore = GetLazyScrollObj(obj); var objPrev = GetLazyScrollObj(obj, true); var ePos = ptCommonObj2.getMouseCoords(event); if ((this.objGripper.y - ePos.y) != 0) {
 obj.scrollTop += this.objGripper.y - ePos.y; }
 if ((this.objGripper.x - ePos.x) != 0)
 obj.scrollLeft += this.objGripper.x - ePos.x; this.objGripper = ePos; doLazyScroll(obj, true);}

function scrollingEnd(obj) {
 this.objGripper = null; event.preventDefault();}

function IsAppendScroll(obj) {
 if (obj.getAttribute('action')) return true; return false;}

function GetLazyScrollObj(obj, bPrev) {
 if (!obj || obj.children.length == 0) return null; var bMore = true; if (typeof bPrev != "undefined" && bPrev)
 bMore = false; var objWrap = obj; var objGridWrap = objWrap; if (obj.bCarousel)
 objGridWrap = objWrap.children[1]; if (objGridWrap) {
 for (var i = 0; i < objGridWrap.children.length; i++) {
 var obj = objGridWrap.children[i]; if (bMore && obj.getAttribute('class') && obj.getAttribute('class').indexOf("ps_box-more") != -1)
 return obj; if (!bMore && obj.getAttribute('class') && obj.getAttribute('class').indexOf("ps_box-prev") != -1)
 return obj; }
 }

 var objGridWrap = objWrap.children[0]; for (var i = 0; i < objGridWrap.children.length; i++) {
 var obj = objGridWrap.children[i]; if (bMore && obj.getAttribute('class') && obj.getAttribute('class').indexOf("ps_box-more") != -1)
 return obj; if (!bMore && obj.getAttribute('class') && obj.getAttribute('class').indexOf("ps_box-prev") != -1)
 return obj; }
 return null;}

function doLazyScroll(objWrap, bMouse) {

 

 if (objWrap.curScrollLeft != objWrap.scrollLeft)
 {
 objWrap.curScrollLeft = objWrap.scrollLeft; return; }
 var objMore = GetLazyScrollObj(objWrap); var objPrev = GetLazyScrollObj(objWrap, true); if (!objMore && !objPrev) return; var objContent = objWrap.children[0]; var sClass = objWrap.getAttribute('class'); var bVScroll = (sClass.indexOf("ps_scrollable_v") != -1 || sClass.indexOf("ps_scrollable_both") != -1); var bHScroll = (sClass.indexOf("ps_scrollable_h") != -1 || sClass.indexOf("ps_scrollable_both") != -1); var nOff = 10; if (objMore && bVScroll)
 {
 var objHead = objWrap.querySelector(".ps_grid-head"); nOff = (objContent.clientHeight - objWrap.clientHeight) - objWrap.scrollTop; if (objHead) nOff -= objHead.clientHeight; }

 if (objMore && nOff < 5)
 {
 this.bLazyLoading = true; this.nLazyTime = (new Date()).valueOf(); resetScroll(objWrap); objMore.onclick(); return; }
 else if (objPrev && (bVScroll && objWrap.scrollTop < 1 || bHScroll &&
 objWrap.scrollLeft < 1)) {
 this.bLazyLoading = true; this.nLazyTime = (new Date()).valueOf(); resetScroll(objWrap); objPrev.onclick(); return; }
}


function OnRowAction(obj, sRowActionId) {
 if (typeof sRowActionId != 'undefined' && sRowActionId.length > 0) {
 if (!isAccessibleLayout())
 gFFocusObjId = obj.id; var sEvent = "submitAction_" + winName + "(document." + winName + " ,'" + sRowActionId + "')"; eval(sEvent); }
}
function selectAllRows(obj) {
 var sScript = ""; var winName0 = getPageFormName(obj); var id = obj.id; var hid = id.replace("$selall$0$", "$selallh$0$"); var hobj = document.getElementById(hid); hobj.value = (obj.checked ? obj.getAttribute('ptchecked_val') : obj.getAttribute('ptunchecked_val')); hobj.className = (obj.checked ? 'psc_on' : 'psc_off'); var gid = id.replace("$selall$0$", ""); var objGrid = document.getElementById(winName0 + "div" + gid); var qs = ".psc_rowselect"; var arrObj = objGrid.querySelectorAll(qs); for (var i = 0; i < arrObj.length; i++) {
 arrObj[i].checked = obj.checked; arrObj[i].onclick(); sScript = sScript + "addchg_" + winName + "(null,'" + arrObj[i].id + "');"; }
 eval(sScript);}

function setRowSelected(obj, gid, rowid, event, sRowActionId) {
 cancelBubble(event); var winName0 = getPageFormName(obj); var objGrid = document.getElementById(winName0 + "div" + gid); var objRow = null; if (rowid)
 objRow = document.getElementById(rowid); var hid = obj.id.replace("$selm$", "$selmh$"); var hobj = document.getElementById(hid); hobj.value = (obj.checked ? obj.getAttribute('ptchecked_val') : obj.getAttribute('ptunchecked_val')); hobj.className = (obj.checked ? 'psc_on' : 'psc_off'); if (obj.checked) {
 addClass(objGrid, "psc_has_selected"); if (objRow)
 addClass(objRow, "psc_selected"); }
 else {
 if (objRow)
 removeClass(objRow, "psc_selected"); var qs = ".ps_box-gridc .ps_grid-row.psc_selected"; var arrObj = null; if (objGrid != null)
 arrObj = objGrid.querySelectorAll(qs); if (arrObj != null && arrObj.length == 0)
 removeClass(objGrid, "psc_has_selected"); }

 setRowSelectedAll(winName0 + "div" + gid); if (typeof sRowActionId != 'undefined' && sRowActionId.length > 0) {
 gFFocusObjId = obj.id; var sEvent = "addchg_" + winName + "(null,'" + obj.id + "');submitAction_" + winName + "(document." + winName + " ,'" + sRowActionId + "')"; eval(sEvent); }

 if (isFModeLayout()) {
 var hitIt = 0; if (objGrid != null)
 if (objGrid.classList.length > 0) {
 for (i = 0; i < objGrid.classList.length; i++) {
 if (objGrid.classList[i] == 'ps_HasRowSelectPCode') {
 hitIt = 1; break; }
 }
 }
 if (hitIt == 1) {
 var sEvent = "addchg_" + winName + "(null,'" + obj.id + "');submitAction_" + winName + "(document." + winName + " ,'" + obj.id + "')"; eval(sEvent); }
 }
}

function setRowSelectedAll(gid) {
 var objGrid = document.getElementById(gid); if (!objGrid) return; var qs = ".ps_box-gridc .ps_grid-row.psc_selected"; var qs2 = ".ps_grid-row"; var arrObj = objGrid.querySelectorAll(qs); var arrObj2 = objGrid.querySelectorAll(qs2); if (arrObj.length == 0)
 removeClass(objGrid, "psc_has_selected"); else
 addClass(objGrid, "psc_has_selected"); var obj = objGrid.querySelector(".psc_rowselectall"); if (!obj) return; var id = obj.id; var hid = id.replace("$selall$0$", "$selallh$0$"); var hobj = document.getElementById(hid); if (arrObj.length > 0 && arrObj.length == arrObj2.length)
 obj.checked = true; else if (arrObj.length == 0)
 obj.checked = false; hobj.value = (obj.checked ? obj.getAttribute('ptchecked_val') : obj.getAttribute('ptunchecked_val')); hobj.className = (obj.checked ? 'psc_on' : 'psc_off');}

function selectGridTab(gridName, gridNameTab, tabStyleName, tabName, bForceSelect)
{
 autoCloseGridSort(); var objGrid = document.getElementById(gridName); var objTab = document.getElementById(gridNameTab); var sSelTabId = ""; var obj = document.getElementById(tabName); var bSelectChanged = false; if (!bForceSelect && obj && isSelected(obj.parentNode)) return; for (var i = 0; i < objTab.children.length; i++) {
 if (isSelected(objTab.children[i])) {
 if (isClass(objTab.children[i], "tab_a"))
 sSelTabId = "tab_a"; else
 sSelTabId = "tab_" + i; removeSelected(objTab.children[i]); objTab.children[i].children[0].tabIndex = -1; objTab.children[i].children[0].setAttribute("href","javascript:void(0);"); objTab.children[i].children[0].setAttribute("aria-selected", "false"); }
 else if (isClass(objTab.children[i], tabStyleName)) {
 bSelectChanged = addSelected(objTab.children[i]); objTab.children[i].children[0].tabIndex = 0; objTab.children[i].children[0].removeAttribute("href"); objTab.children[i].children[0].setAttribute("aria-selected", "true"); }

 }
 if (!bForceSelect)
 replaceClass(objGrid, sSelTabId, tabStyleName); var id = gridName.replace('$', '$grid$'); if (!bForceSelect) {
 scrollInit(id, IsAutoResize(id)); if (bSelectChanged && tabName != null) {
 
 var sEvent = "submitAction_" + winName + "(document." + winName + " ,'" + tabName + "')"; eval(sEvent); }
 }
}


function initDropdowns() {
 if (typeof dropdownIDs == 'undefined' || dropdownIDs.length == 0) return; for (var i = 0; i < dropdownIDs.length; i++) {
 var id = dropdownIDs[i]; setDropDown(id); }
}

function setDropDown(id) {
 var obj = document.getElementById(id); if (!obj) return; var bFound = false; for (var i = 0; i < obj.options.length; ++i) {

 if (obj.options[i].selected && obj.parentNode.querySelector(".ps_facade-value")) {
 obj.parentNode.querySelector(".ps_facade-value").innerHTML = obj.options[i].innerHTML; }
 }
}



function isTriggerField(fldname) {
 var obj = document.getElementById(winName + "div" + fldname); if (!obj) return false;  if (fldname.indexOf("$") != -1)
 fldname = fldname.replace(/\$/g, "\\$"); try {
 var popupMenuObj = document.querySelector(".ps_box-group.psc_has_popup .psc_hidden > .ps_content-group .ps_box-menucontainer #" + fldname); } catch (e) {}
 while (popupMenuObj)
 {
 popupMenuObj = popupMenuObj.parentElement; if (isClass(popupMenuObj, "psc_has_popup"))
 {
 while (popupMenuObj && popupMenuObj.tagName != "A")
 popupMenuObj = popupMenuObj.firstChild; gFocusObj = popupMenuObj; ptCommonObj2.tryFocus0(gFocusObj); return true; }
 }

 var objP = obj.parentNode; if (objP &&!isClass(objP, "psc_rowact"))
 objP = objP.parentNode; if (isClass(obj, "psc_trigger")) {
 if (!gFFocusObjId && isAccessibleLayout() && objP.tagName != 'DIV')
 {
 
 var sRole = (objP.getAttribute("role")) ? objP.getAttribute("role") : ""; if (sRole.indexOf("tab") == -1)
 return false; }
 if (gFFocusObjId)
 gFocusObj = document.getElementById(gFFocusObjId); else if (isClass(objP,"psc_rowact"))
 gFocusObj = objP; ptCommonObj2.tryFocus0(gFocusObj); if (isClass(gFocusObj, "ps-radio"))
 gFocusObj.checked = true; if (!isAnyModal()) gFFocusObjId = null; return true; }
 return false;}


function DoRowSelect(oRow, event, sRowActionId) {
 var oSelect = oRow.querySelector(".ptgrid-singleselect .ps-radio"); if (!oSelect) {
 oSelect = oRow.querySelector(".ptgrid-multiselect .ps-checkbox"); if (!oSelect) return; oSelect.checked = !oSelect.checked; }
 else {
 oSelect.checked = true; }
 oSelect.onclick(); var sEvent = "addchg_" + winName + "(null,'" + oSelect.id + "');"; eval(sEvent); ptCommonObj2.tryFocus0(oSelect); if (typeof sRowActionId != 'undefined' && sRowActionId.length > 0) {
 gFFocusObjId = oSelect.id; var sEvent = "submitAction_" + winName + "(document." + winName + " ,'" + sRowActionId + "')"; eval(sEvent); }
}

function onClickRadio(obj, gid, rowid, event, sRowActionId) {
 cancelBubble(event); if (gFFocusObjId) return; obj.checked = true; setRowSelectedAllRadio(obj, rowid, gid); if (typeof sRowActionId != 'undefined' && sRowActionId.length > 0) {
 gFFocusObjId = obj.id; var sEvent = "addchg_" + winName + "(null,'" + obj.id + "');submitAction_" + winName + "(document." + winName + " ,'" + sRowActionId + "')"; eval(sEvent); }

 if (isFModeLayout()) {
 var hitIt = 0; var winName0 = getPageFormName(obj); var objGrid = document.getElementById(winName0 + "div" + gid); if (objGrid != null)
 if (objGrid.classList.length > 0) {
 for (i = 0; i < objGrid.classList.length; i++) {
 if (objGrid.classList[i] == 'ps_HasRowSelectPCode') {
 hitIt = 1; break; }
 }
 }
 if (hitIt == 1) {
 var sEvent = "addchg_" + winName + "(null,'" + obj.id + "');submitAction_" + winName + "(document." + winName + " ,'" + obj.id + "')";  eval(sEvent); }
 }
}

function setRowSelectedAllRadio(obj, rowid, gid) {

 if (gid == "") return; var winName0 = getPageFormName(obj); var objGrid = document.getElementById(winName0 + "div" + gid); addClass(objGrid, "psc_has_selected"); var objSel = objGrid.querySelector(".ps_grid-row.psc_selected"); removeClass(objSel, "psc_selected"); addClass(document.getElementById(rowid), "psc_selected");}

function doCtrlClick(id) {
 var obj = this.document.getElementById(id); if (obj.type == "radio") { 
 var pgobj = obj.parentNode.parentNode.parentNode; var qs = "#" + pgobj.id + " input"; var arrObj = document.querySelectorAll(qs); for (var j = 0; j < arrObj.length; j++) {
 if (arrObj[j].type == "radio" && arrObj[j] != obj)
 arrObj[j].checked = false; }
 }
 eval(obj.onclick);}


function doRadioOuterClick(obj)
{
var objCtrl = obj.querySelector('.ps-checkbox');objCtrl.focus();}

function doRadioClick(obj, id) {
 setupTimeout2(); var objHidden = document.getElementById(id); objHidden.value = (obj.checked ? obj.getAttribute('ptchecked_val') : obj.getAttribute('ptunchecked_val')); objHidden.className = (obj.checked ? 'psc_on' : 'psc_off'); setAriaAttr(obj, "aria-checked", obj.checked ? "true" : "false");}

function setOutline(src, tgt) {
 
 if (!src || !tgt) return;  var cssProp = window.getComputedStyle(src, null); var lineStyle = cssProp.getPropertyValue("outline-style"); var lineWidth = cssProp.getPropertyValue("outline-width"); var lineColor = cssProp.getPropertyValue("outline-color"); if (lineColor.toLowerCase() == "transparent")
 tgt.style.outlineColor = "rgb(0,0,0)";  else
 tgt.style.outlineColor = lineColor; if (lineStyle.toLowerCase() == "none")
 tgt.style.outlineStyle = "dotted"; else
 tgt.style.outlineStyle = lineStyle; if (lineWidth.toLowerCase() == "0px")
 tgt.style.outlineWidth = "1px"; else
 tgt.style.outlineWidth = lineWidth; tgt.style.outlineOffset = cssProp.getPropertyValue("outline-offset");}

function clearOutline(tgt) {
 if (!tgt) return; tgt.style.outlineColor = ""; tgt.style.outlineStyle = ""; tgt.style.outlineWidth = ""; tgt.style.outlineOffset = "";}

function setOutlineTimer(srcElementName) {
 if (!srcElementName) return; setTimeout("setOutlineTrigger('" + srcElementName + "');", 0);}

function setOutlineTrigger(srcElementName) {
 if (!srcElementName) return; var obj = document.getElementById(srcElementName); if (!obj) return; setOutline(obj, obj.nextElementSibling);}


function ptDisableHiddenRadio() {
 var aobj = document.querySelectorAll(".ps_box-radio.psc_hidden .ps-radio:not(:disabled),.ps_box-radio.psc_force-hidden .ps-radio:not(:disabled)"); for (var i=0; i < aobj.length; i++)
 aobj[i].disabled="disabled";}





function toggleGroup(fname, fname0, sCollapsTile, sExpandTitle) {
 var objP = document.getElementById(fname); var obj = document.getElementById(fname0); if (!objP && !obj) return; var objD = objP.querySelector(".ps_detail-group"); if (isClose(objD)) {
 removeClose(objP); removeClose(objD); removeClose(obj); setTitle(obj, sExpandTitle)
 }
 else {
 addClose(objP); addClose(objD); addClose(obj); setTitle(obj, sCollapsTile)
 }
 initScrolls0(); top.DoGroupletAutoSizeAll();}




function ResizeAccordions() {
 ResizeSide1Accordion();}



function ResizeSide1Accordion() {
 var objSideC = document.getElementById("PT_SIDE$content"); if (!objSideC || !isClass(objSideC, "ps_accordion")) return false; for (var j = 0 ; j < objSideC.children.length; j++) {
 if (!isClose(objSideC.children[j]))
 expandAccMD(objSideC.children[j].id, true, true); }
 return true;}

function expandAccMD(fname, bMaxH) {
 var obj = document.getElementById(fname); if (!obj || obj.children.length !=2) return; var objP = obj.parentNode;  var arrCont = objP.querySelectorAll("section"); if (arrCont[1].children[1].innerHTML.length == 0) {
 addHide(arrCont[1]); return; }
 else
 removeHide(arrCont[1]); expandAcc(fname, bMaxH, true);}

function expandAcc(fname, bMaxH, bDefault) {
 if (typeof bMaxH == "undefined")
 bMaxH = false; if (typeof bDefault == "undefined")
 bDefault = false; var nfname = fname.replace(/\$/g, "\\$");  nfname = nfname.replace(/\\\\/g, "\\");  var obj = document.querySelector(".ps_accordion > #" + nfname);  if (!obj) return; var objP = obj.parentNode;  var objOpen = null; var arrCont = objP.querySelectorAll("section");  if (!arrCont || arrCont.length == 0) return; var nCur = 0; for (var j = 0 ; j < arrCont.length; j++)
 {
 var cobj = arrCont[j].querySelector(".ps_accordion_content"); if (!isClose(arrCont[j]))
 {
 objOpen = arrCont[j]; cobj.style.height = cobj.clientHeight + "px"; }
 else
 cobj.style.height = "0px"; if (arrCont[j] == obj)
 nCur = j; }

 var fullHeight = ptCommonObj2.getViewportHeight(window) -10; if (bMaxH)
 {
 var objF = document.getElementById('PT_FOOTER'); if (objF)
 {
 var posF = objF.getBoundingClientRect(); fullHeight = fullHeight - (posF.bottom - posF.top)+10; }
 }
 var nHeaderHeight = arrCont[0].children[0].clientHeight+3; if (objOpen == obj) 
 {
 var nMaxH = fullHeight - (nHeaderHeight + arrCont.length * nHeaderHeight); var cobj = obj.querySelector(".ps_accordion_content");  if (isClose(obj))
 {
 if (!bMaxH)
 cobj.style.height = "0px"; removeClose(obj); removeClose(obj.children[1]); setAriaAttr(obj.children[0].children[0], "aria-expanded", "true"); if (bMaxH)
 {
 cobj.style.height = nMaxH + "px"; var sObj = cobj.querySelector('.ps_scrollable'); if (sObj)
 scrollInit(sObj.id, true, nMaxH, 0, 0, cobj.clientWidth, true); }
 else
 cobj.style.height = cobj.clientHeight + "px"; return; }
 else if (bMaxH && bDefault)
 {
 cobj.style.height = nMaxH + "px"; var sScript = "var cobj=document.getElementById('" + cobj.id + "');\n if (cobj) {\nvar sObj = cobj.querySelector('.ps_scrollable');\n"; sScript += "if (sObj)\n scrollInit(sObj.id, true, " + nMaxH + ", 0, 0, " + cobj.clientWidth + ", true);\n}"; setTimeout(function () { doGrouplet("runScript@" + sScript); }, 100); return; }
 else if (!bDefault && arrCont.length == 2 && (!isHidden(arrCont[1])))
 {
 objOpen = obj; if (nCur == 0)
 {
 obj = arrCont[1]; nCur = 1; }
 else
 {
 obj = arrCont[0]; nCur = 0; }
 }
 else
 return; }

 removeClose(obj); removeClose(obj.children[1]); setAriaAttr(obj.children[0].children[0], "aria-expanded", "true"); var nMaxH = fullHeight - (nHeaderHeight + arrCont.length * nHeaderHeight); var cobj = obj.querySelector(".ps_accordion_content"); if (bMaxH)
 {
 cobj.style.height = nMaxH + "px"; var sScript = "var cobj=document.getElementById('" + cobj.id + "');\n if (cobj) {\nvar sObj = cobj.querySelector('.ps_scrollable');\n"; sScript += "if (sObj)\n scrollInit(sObj.id, true, " + nMaxH + ", 0, 0, " + cobj.clientWidth + ", true);\n}"; if (bDefault)
 setTimeout(function () { doGrouplet("runScript@" + sScript); }, 100); else
 eval(sScript); }
 else
 cobj.style.height = cobj.children[0].clientHeight + "px"; if (objOpen)
 {
 addClose(objOpen); setAriaAttr(objOpen.children[0].children[0], "aria-expanded", "false"); addClose(objOpen.children[1]); var cobj = objOpen.querySelector(".ps_accordion_content"); cobj.style.height = "0px"; }

}

function expandHAcc(fname, bBack) {
 var nfname = fname.replace(/\$/g, "\\$");  nfname = nfname.replace(/\\\\/g, "\\");  var obj = document.querySelector(".ps_accordionH > #" + nfname);  if (!obj) return; var bCloseAll = (typeof bBack != 'undefined' && bBack) ? true : false; var objP = obj.parentNode; var objH = objP.children; for (var j = 0; j < objP.children.length; j++) {
 var objG = objH[j].children[1]; if (!objG) continue; var objG0 = objH[j]; var gId = objG0.id; var objHeader = objG.children[0]; var objC = objG.children[1]; var objC0 = objC.children[0]; if (gId == fname && !bCloseAll) {
 objG0.children[0].setAttribute("class", "ps_back"); objG.setAttribute("class", "ps-box_groupExpand"); objG.children[0].setAttribute("class", "ps_header-groupExpand"); objG.children[1].children[0].setAttribute("class", "ps_accordion_content0Expand"); if (objG0)
 objG0.setAttribute("class", "ps-box_groupExpand"); }
 else if (bBack) {
 if (objG0.children.length == 2)
 objG0.children[0].setAttribute("class", "ps_back_hidden"); objG.setAttribute("class", "ps-box_group"); objG.children[0].setAttribute("class", "ps_header-group"); objG.children[1].children[0].setAttribute("class", "ps_accordion_content0"); if (objG0)
 objG0.setAttribute("class", "ps-box_group"); }
 else {
 objG.setAttribute("class", "ps-box_group_hide"); objG.children[0].setAttribute("class", "ps_header-group"); objG.children[1].children[0].setAttribute("class", "ps_accordion_content0"); if (objG0)
 objG0.setAttribute("class", "ps-box_group_hide"); }
 }
}

function expandParent(obj) {
 return;  if (browserInfoObj2.isIE || !document.querySelectorAll(".ps_accordion")) return; var objC = document.querySelectorAll(".ps_accordion_content"); var objC0 = document.querySelectorAll(".ps_accordion_content0"); if (!obj || objC.length == 0) {
 return; }
 objParent = obj.parentNode; var i = -1; while (objParent) {
 for (var j = 0; j < objC.length; j++) {
 if (objParent == objC[j])
 i = j; }
 objParent = objParent.parentNode; }
 for (var j = 0; j < objC.length; j++) {
 if (j == i)
 objC[j].style.height = objC0[j].clientHeight + 'px'; else
 objC[j].style.height = '0px'; }
}


var liveTimeout = 0;function isAccessibleLayout() {
 if (typeof bAccessibleLayout == 'undefined' || !bAccessibleLayout) return false; return true;}

function hidePtWrapper() {
 var pWin = window; if (typeof oParentWin != 'undefined' && oParentWin)
 pWin = oParentWin; if (typeof pWin.document == "undefined") return; addHide(pWin.document.getElementById("PT_WRAPPER"));}

function unhidePtWrapper(){
 var pWin = window; if (typeof oParentWin != 'undefined' && oParentWin)
 pWin = oParentWin; try {
 if (typeof pWin != 'undefined' && pWin && typeof pWin.document != 'undefined' &&
 pWin.document && isHidden(pWin.document.getElementById("PT_WRAPPER"))) {
 removeHide(pWin.document.getElementById("PT_WRAPPER")); if (typeof pWin.dateBoxOpen != "undefined" && pWin.dateBoxOpen)
 
 ; else
 ptCommonObj2.tryFocus0(pWin.gFocusObj); }
 } catch (e) {};}

function clearTargetGroupBox(evt) {
 var target = ptCommonObj2.getEO(evt); if (target) target.innerHTML = "";}

function hasClass(obj, sClass0) {
 if (!obj) return false; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; if (sClass.length == 0)
 return false; var aClass = sClass.split(" "); for (var i = 0; i < aClass.length; i++)
 if (aClass[i] === sClass0)
 return true; return false;}

function replaceClass(obj, sClass0, sClass1) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; sClass = sClass.replace(sClass0, sClass1); obj.setAttribute("class", sClass);}

function getPageFormName(obj) {
 var pageFormName = winName; var id = obj.id; if (typeof id == 'undefined' || !id || id.indexOf(winName) == -1) {
 if (!obj.parentNode) return pageFormName; id = obj.parentNode.id; if (typeof id == 'undefined' || !id || id.indexOf(winName) == -1)
 return pageFormName; }
 var pos = id.indexOf("div"); pageFormName = id.substring(0, pos); return pageFormName;}

function getObjFromContainer(obj) {
 var id = obj.id; var winName0 = getPageFormName(obj); if (typeof id != undefined && id.indexOf(winName0 + 'div') != -1)
 {
 var idPreFix = winName0+'div'; id = obj.id.substring(idPreFix.length, id.length); var obj2 = document.getElementById(id); if (obj2)
 return obj2; else
 return obj; }
 else
 return obj;}

function removeStateAttr(obj, sState0) {
 if (!obj || !isClass(obj, "ps_box-group") && !isClass(obj, "ps_tab")) return; obj = getObjFromContainer(obj); var sState = (obj.getAttribute("ps_state")) ? obj.getAttribute("ps_state") : ""; sState = sState.replace(" " + sState0, ""); sState = sState.replace(sState0, ""); obj.setAttribute("ps_state", sState); var sScript = "addchg_" + winName + "(null,'" + obj.id + "');"; eval(sScript);}


function addStateAttr(obj, sState0) {
 if (!obj || !isClass(obj, "ps_box-group") && !isClass(obj, "ps_tab")) return; obj = getObjFromContainer(obj); var sState = (obj.getAttribute("ps_state")) ? obj.getAttribute("ps_state") : ""; if (sState.indexOf(" " + sState0) != -1) return; if (sState.length > 0)
 obj.setAttribute("ps_state", sState + " " + sState0); else
 obj.setAttribute("ps_state", sState0); var sScript = "addchg_" + winName + "(null,'" + obj.id + "');"; eval(sScript);}

function removeHide(obj) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; sClass = sClass.replace(" psc_hidden", ""); sClass = sClass.replace("psc_hidden", ""); obj.setAttribute("class", sClass); obj.removeAttribute("aria-hidden"); removeStateAttr(obj, "psc_hidden");}


function addHide(obj) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; if (sClass.indexOf(" psc_hidden") !=-1) return; obj.setAttribute("class", sClass + " psc_hidden"); setAriaAttr(obj, "aria-hidden", "true"); addStateAttr(obj, "psc_hidden");}

function isHidden(obj) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; if (sClass.indexOf(" psc_hidden") != -1 || sClass.indexOf("psc_hidden") == 0) return true; return false;}

function removeInvisible(obj) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; sClass = sClass.replace(" psc_invisible", ""); sClass = sClass.replace("psc_invisible", ""); obj.setAttribute("class", sClass); obj.removeAttribute("aria-hidden"); removeStateAttr(obj, "psc_invisible");}


function addInvisible(obj) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; if (sClass.indexOf(" psc_invisible") != -1) return; obj.setAttribute("class", sClass + " psc_invisible"); setAriaAttr(obj, "aria-hidden", "true"); addStateAttr(obj, "psc_invisible");}

function isInvisible(obj) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; if (sClass.indexOf(" psc_invisible") != -1) return true; return false;}

function removeClose(obj) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; sClass = sClass.replace(" psc_close", ""); sClass = sClass.replace("psc_close", ""); obj.setAttribute("class", sClass); if (obj.tagName != "DIV")
 setAriaAttr(obj, "aria-expanded", "true"); removeStateAttr(obj, "psc_close");}


function addClose(obj) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; if (sClass.indexOf(" psc_close") != -1) return; obj.setAttribute("class", sClass + " psc_close"); if (obj.tagName != "DIV")
 setAriaAttr(obj, "aria-expanded", "false"); addStateAttr(obj, "psc_close");}

function isClose(obj) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; if (sClass.indexOf(" psc_close") != -1) return true; return false;}

function isSelected(obj) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; if (sClass.indexOf(" psc_selected") != -1) return true; return false;}

function addSelected(obj, current) {
 if (!obj) return false; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; if (sClass.indexOf(" psc_selected") != -1) return false; obj.setAttribute("class", sClass + " psc_selected"); if (obj.getAttribute("role") != "presentation")
 setAriaAttr(obj, "aria-selected", "true"); addStateAttr(obj, "psc_selected"); if (typeof current != "undefined" && current)
 setAriaAttr(obj, "aria-current", current); var list = findListParent(obj); if (list != null && list.classList.contains("pt_keynav-listtab"))
 obj.setAttribute("tabindex", "0"); return true;}

function removeSelected(obj, current) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; sClass = sClass.replace(" psc_selected", ""); sClass = sClass.replace("psc_selected", ""); obj.setAttribute("class", sClass); if (obj.getAttribute("role") != "presentation")
 setAriaAttr(obj, "aria-selected", "false"); removeStateAttr(obj, "psc_selected"); if (typeof current != "undefined" && current)
 obj.removeAttribute("aria-current"); var list = findListParent(obj); if (list != null && list.classList.contains("pt_keynav-listtab"))
 obj.setAttribute("tabindex", "-1");}

function isDisabled(obj) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; if (sClass.indexOf(" psc_disabled") != -1) return true; return false;}

function addDisabled(obj) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; if (sClass.indexOf(" psc_disabled") != -1) return; obj.setAttribute("class", sClass + " psc_disabled"); setAriaAttr(obj, "aria-disabled", "true"); addStateAttr(obj, "psc_disabled");}

function removeDisabled(obj) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; sClass = sClass.replace(" psc_disabled", ""); sClass = sClass.replace("psc_disabled", ""); obj.setAttribute("class", sClass); setAriaAttr(obj, "aria-disabled", "false"); removeStateAttr(obj, "psc_disabled");}

function removeOn(obj) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; sClass = sClass.replace(" psc_on", ""); sClass = sClass.replace("psc_on", ""); obj.setAttribute("class", sClass);}

function addOn(obj) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; if (sClass.indexOf(" psc_on") != -1) return; obj.setAttribute("class", sClass + " psc_on");}

function isOn(obj) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; if (sClass.indexOf(" psc_on") != -1) return true; return false;}

function isDraggable(obj) {
 if (!obj) return false; var sValue = (obj.getAttribute('draggable')) ? obj.getAttribute('draggable') : ""; if (sValue.indexOf('true') != -1) return true; return false;}

function isDroppable(obj) {
 if (!obj) return false; var sValue = (obj.getAttribute('droppable')) ? obj.getAttribute('droppable') : ""; if (sValue.indexOf('true') != -1) return true; return false;}

function setAriaAttr(obj, sAttrName, sAttrValue) {
 setAttr(obj, sAttrName, sAttrValue);}

function setAttr(obj, sAttrName, sAttrValue) {
 if (!obj) return; obj.setAttribute(sAttrName, sAttrValue);}

function setTitle(obj, sTitle) {
 if (!obj || typeof sTitle == "undefined" || sTitle=="") return; obj.setAttribute('title', sTitle);}

function getGridTabClass(gObj) {
 for (var j = 0 ; j < 10; j++) {
 if (isClass(gObj,"tab_"+j)) return "tab_"+j; }

 if (isClass(gObj, "tab_a")) return "tab_a"; return "";}

function isTouchKeyboard() {
 if (!isFModeLayout()) return false; var obj = document.getElementById("pt_envinfo"); if (!obj) return false; var sDeviceType = obj.getAttribute("devicetype"); if (sDeviceType.indexOf("tablet") != -1 || sDeviceType.indexOf("phone") != -1)
 return true; else
 return false;}

function cleanupCalendar() {
 if (isFModeLayout() && isModalPage(winName)) {
 var cal = window._PS_popupCalendar; if (cal != null) {
 cal.onClose(cal);  window.dateBoxOpen = false;  }
 }
}

function isPSPhone() {
 var obj = document.getElementById("pt_envinfo"); if (!obj) return false; var sDeviceType = obj.getAttribute("devicetype"); if (sDeviceType.indexOf("phone") != -1)
 return true; else
 return false;}

function isIPhone() {
 if (isPSPhone() && browserInfoObj2.isSafari)
 return true; else
 return false;}

function isIPhoneInModal(obj) {
 if (isIPhone() && obj.bModal)
 return true; else
 return false;}

function isPSTablet() {
 var obj = document.getElementById("pt_envinfo"); if (!obj) return false; var sDeviceType = obj.getAttribute("devicetype"); if (sDeviceType.indexOf("tablet") != -1)
 return true; else
 return false;}

function isIPad() {
 if (isPSTablet() && browserInfoObj2.isSafari)
 return true; else
 return false;}

function isIPadInModal(obj) {
 if (isPSTablet() && obj.bModal)
 return true; else
 return false;}

function isIOS() {
 return isClass(document.querySelector('html'), "ios");}

function bypassIOSFrameWrknd() {


 return (isIOS() && browserInfoObj2.bypassIOSFrameWrknd);}

function isAndroid() {
 return isClass(document.querySelector('html'), "android");}

function isRTL() {
 return isClass(document.querySelector('html'), "psc_dir-rtl");}

function isMDMode() {
 return isClass(document.querySelector('html'), "psc_mode-md");}

function isAGMode() {
 return isClass(document.querySelector('html'), "psc_mode-ag");}

function isMDListPopup() {
 return isClass(document.querySelector('html'), "psc_mdlistpopup");}

function isMDListAccordion() {
 return isClass(document.querySelector('html'), "psc_mdlistaccordion");}

function isMDListSlideOut() {
 return isClass(document.querySelector('html'), "psc_mdlistslideout");}

function isSUOW() {
 return isClass(document.querySelector('html'), "psc_mode-suow");}

function isSingleComponentAG() {
 return isClass(document.querySelector('html'), "psc_mode-singleag");}

function isMDGuided() {
 return isClass(document.querySelector('html'), "psc_mode-guided");}

function isAjaxTrf() {
 return isClass(document.querySelector('html'), "psc_ajaxtrf");}

function getHTMLObjectByClass(obj, sClass) {
 try {
 if (typeof obj == 'undefined' || obj == null) return null; while (!hasClass(obj, sClass)) {
 obj = obj.parentElement; if (obj == null) return null; }
 if (hasClass(obj, sClass)) return obj; } catch (event) {
 return null; }
 return null;}

function getHTMLObjectByAttrVal(obj, attr, val) {
 try {
 if (typeof obj == 'undefined' || obj == null) return null; while (obj.getAttribute(attr) != val)
 obj = obj.parentElement; if (obj.getAttribute(attr) == val) return obj; } catch (event) {
 return null; }
 return null;}

function getHTMLObject(obj, attr) {
 try {
 if (typeof obj == 'undefined' || obj == null) return null; while (obj.getAttribute(attr) != "true")
 obj = obj.parentElement; if (obj.getAttribute(attr) == "true") return obj; } catch (event) {
 return null; }
 return null;}

function getLayerXY(evt, el, elGes) {
 var x = 0,
 y = 0; while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
 x += el.offsetLeft - el.scrollLeft; y += el.offsetTop - el.scrollTop; el = el.offsetParent; }

 x = evt.targetTouches[0].clientX - x;  y = evt.targetTouches[0].clientY - y;  return { x: x, y: y };}



function getJSONCookie(cookieName) {
 var deviceCookie = getCookieValue(cookieName); if (deviceCookie != null && deviceCookie != "") {
 deviceCookie = '{"' + deviceCookie + '}'; deviceCookie = deviceCookie.replace(/ /g, ',"'); deviceCookie = deviceCookie.replace(/:/g, '":'); }
 return deviceCookie;}



function doAppKeyEnter(evt, id){
 if (!isFModeLayout()) return; var key = getKeyCode(evt); if (key == 13) {
 var tObj = document.getElementById(id); if (tObj) {
 var sScript = tObj.getAttribute('href'); var bSubmitScript = (sScript != null) ? true : false; if (bSubmitScript) eval(sScript); }
 } else {
 
 if ((key == 8) || (key > 47)) {
 var elTmp = getEventTarget(evt); if (!elTmp) return; var sElTagNm = elTmp.tagName; if (sElTagNm.toUpperCase() === "INPUT") {
 var sPt = elTmp.getAttribute('pt'); var sPtFn = elTmp.getAttribute('pt_fn'); if ((typeof sPt === 'undefined') || (typeof sPtFn === 'undefined')) return; var sFormNm = getFormName(); var bHasFcs = false; var sScrpt = "if ((ptTAObj_" + sFormNm + ") && (typeof ptTAObj_" + sFormNm + ".TAFieldHasFocus === 'function'))"; sScrpt = sScrpt + " bHasFcs = ptTAObj_" + sFormNm + ".TAFieldHasFocus();"; eval(sScrpt); if (bHasFcs) {
 initTypeAheadEl(elTmp); sScrpt = "ptTAObj_" + sFormNm + ".theTextBox = elTmp;"; eval(sScrpt); sScrpt = "ptTAObj_" + sFormNm + ".DoTypeAhead();"; eval(sScrpt); }
 }
 }
 }
 return;}


function DoTabbing(evt, id, bReset, oParentWin) {
 if (typeof oParentWin == "undefined" && setFocusFModeMsgModal()) return; var target = getEventTarget(evt); var modObj = top.document.getElementById(top.PTMOD_ + top.modId);  if (modObj && modObj.bPopupMenu)
 {
 doCloseLocalModals(); var oWin = getLastModalWin(); if (typeof oParentWin != "undefined" && oParentWin && typeof oParentWin.document != "undefined")
 oWin = oParentWin; try {
 var objWrap = oWin.document.getElementById("PT_WRAPPER"); } catch (e) {objWrap = null;}
 var isShiftTab = isShiftKey(oLastKeyEvent) && getKeyCode(oLastKeyEvent) == 9 ? true : false; if (objWrap)
 {
 var objs = objWrap.querySelectorAll("[tabindex='0'], INPUT:not([type='hidden']):not([disabled]), A[href]:not([disabled]), SELECT:not([disabled]), textarea:not([disabled]), BUTTON:not([disabled])"); for (var i = 0, j = 0; i < objs.length; i++)
 {
 if (objs[i].id != modObj.sPopupParentId)
 continue; for (j = isShiftTab ? i - 1 : i + 1; j < objs.length; isShiftTab ? j-- : j++)
 {
 if (objs[j].offsetParent == null)
 continue; if (!ptCommonObj2.tryFocus0(objs[j]))
 return; }
 break; }
 }
 }

 if (modObj && modObj.bModeless && !evt && !id) {
 id = "ptModTable_" + top.modId; target = null; }
 var oWin = getLastModalWin(); if (typeof oParentWin != "undefined" && oParentWin && typeof oParentWin.document != "undefined")
 oWin = oParentWin; try {
 var objWrap = oWin.document.getElementById("PT_WRAPPER"); } catch (e) {objWrap = null;}
 if (typeof id != "undefined" && id) {
 if (modObj && modObj.bAddTabHandler)
 objWrap = top.document.getElementById(id); else
 objWrap = oWin.document.getElementById(id); }
 else if (!(isClass(objWrap, "ps_modal") || !isClass(objWrap, "ps_modal_iframe") || isDialog(objWrap)))
 return; var isTab = !isShiftKey(oLastKeyEvent) && getKeyCode(oLastKeyEvent) == 9 ? true : false; var isShiftTab = isShiftKey(oLastKeyEvent) && getKeyCode(oLastKeyEvent) == 9 ? true : false; if (modObj && modObj.bAddTabHandler) {
 if (target && typeof target.ownerDocument != "undefined" && target.ownerDocument != oWin.document) {
 isTab = !isShiftKey(oWin.oLastKeyEvent) && getKeyCode(oWin.oLastKeyEvent) == 9 ? true : false; isShiftTab = isShiftKey(oWin.oLastKeyEvent) && getKeyCode(oWin.oLastKeyEvent) == 9 ? true : false; if (!isTab && !isShiftTab) {
 isTab = !isShiftKey(oLastKeyEvent) && getKeyCode(oLastKeyEvent) == 9 ? true : false; isShiftTab = isShiftKey(oLastKeyEvent) && getKeyCode(oLastKeyEvent) == 9 ? true : false; }
 oLastKeyEvent = ""; oWin.oLastKeyEvent = ""; }
 if ((!target && typeof objWrap != "undefined" && objWrap) || (typeof objWrap != "undefined" && objWrap && typeof target != "undefined" && target && target.id && target.id.indexOf("ICLastAnchor") != -1) && isTab) {
 var objClose = objWrap.querySelector(".ps-button"); if (objClose)
 ptCommonObj2.tryFocus0(objClose); return; }
 if ( (typeof target != "undefined" && target && target.id && target.id.indexOf("ICFirstAnchor") != -1) && isShiftTab) {
 objWrap = oWin.document.getElementById("PT_WRAPPER"); }
 }

 if (!objWrap)
 return; if (modObj && !modObj.bModeless && target && target.ownerDocument != oWin.document) {
 bReset = true; }

 if (bReset || (target.id && target.id.indexOf("ICLastAnchor") != -1) && isTab) {
 if (objWrap) {
 var objs = objWrap.querySelectorAll("[tabindex='0'], INPUT:not([type='hidden']):not([disabled]), A[href]:not([disabled]), SELECT:not([disabled]), textarea:not([disabled]), BUTTON:not([disabled])"); for (var i = 0; i < objs.length; i++) {
 if (objs[i].offsetParent == null) continue; var position = ptCommonObj2.getPosition(objs[i]); if (position.x == 0 && position.y == 0) continue; if (!ptCommonObj2.tryFocus0(objs[i])) return; }
 }
 return; }
 if (target.id.indexOf("ICFirstAnchor") != -1 && isShiftTab) {
 if (objWrap) {
 var objs = objWrap.querySelectorAll("[tabindex='0'], INPUT:not([type='hidden']):not([disabled]), A[href]:not([disabled]), SELECT:not([disabled]), textarea:not([disabled]), BUTTON:not([disabled])"); for (var i = objs.length-1; i > -1; i--) {
 if (objs[i].offsetParent == null) continue; if (!isAccessibleLayout() && objs[i].id.lastIndexOf("lblhdr$") > 0)
 continue; var position = ptCommonObj2.getPosition(objs[i]); if (position.x == 0 && position.y == 0) continue; if (!ptCommonObj2.tryFocus0(objs[i])) return; }
 }
 return; }
}


function doClickModelessCloseButton() {
 var id = "ptModTable_" + top.modId; objWrap = top.document.getElementById(id); var objClose = objWrap.querySelector(".ps-button"); if (objClose)
 objClose.click();}



function ptCloseConfirmation() {
 var gbxobj = document.getElementById(document.forms[0].name + "hdrdivPT_CONFIRMATION"); if (!gbxobj) return; gbxobj.classList.remove("psc_open-alt","psc_open");}

function ptSetConfirmationMessage(msg, noautoclose, styles) {
 
 var gbxobj = document.getElementById(document.forms[0].name + "hdrdivPT_CONFIRMATION"); var txtobj = document.getElementById("PT_CONFIRM_MSG"); var btnobj = document.getElementById("PT_CONFIRM_CLOSE");  if (!gbxobj) return;  if (!msg || !styles) {
 ptCloseConfirmation(); return; }
 
 txtobj.innerHTML = msg;  var astyles = styles.split(" "); for (var i=0; i< astyles.length; i++) {
 var x = astyles[i]; if (x == "psc_open") {
 if (gbxobj.classList.contains(x)) {
 x = "psc_open-alt"; }
 gbxobj.classList.remove("psc_open"); gbxobj.classList.remove("psc_open-alt"); }
 gbxobj.classList.add(x); }
 
 btnobj.setAttribute("href","javascript:ptCloseConfirmation();");  if (noautoclose) btnobj.focus();}

function SetTargetFocus(oWrap) {
 if (oWrap) {
 var elements = oWrap.querySelectorAll("[tabindex='0'], INPUT:not([type='hidden']):not([disabled]), A[href]:not([disabled]), SELECT:not([disabled]), textarea:not([disabled]), BUTTON:not([disabled])"); for (var i = 0; i < elements.length; i++) {
 var el = elements[i]; if (el.offsetParent && !ptCommonObj2.tryFocus0(el)) return el; } 
 }
 return;}

function SetMainContentFocus(bSet)
{
 var oTFrame = document.querySelector(".ps_target-iframe"); if (oTFrame && (typeof bSet == "undefined" || bSet)) {
 return; }

 var mainObj = document.getElementById("PT_MAIN"); var panelObj = mainObj.querySelector(".psc_panel-contentinterior"); if (isClass(document.querySelector('html'), "psc_mode-fscreen-search")) {
 mainObj = document.getElementById("PT_SEARCH_SIDE"); if (!mainObj)
 mainObj = document.getElementById("PT_SEARCH"); panelObj = mainObj.querySelector(".psc_panel-contentinterior"); if (panelObj)
 mainObj = panelObj; } else if (isSide1FullScreen())
 mainObj = document.getElementById("PT_SIDE"); else if (isSide2FullScreen())
 mainObj = document.getElementById("PT_SIDE2"); else if (panelObj)
 mainObj = panelObj; if (typeof bSet == "undefined" || bSet) {
 if (typeof mainObj.tabIndex == "undefined" || mainObj.tabIndex == "" || mainObj.tabIndex == -1)
 mainObj.tabIndex = "-1"; ptCommonObj2.tryFocus0(mainObj); }

}

function isSide1FullScreen() {
 var objWrapper = document.getElementById('PT_WRAPPER'); if (isClass(objWrapper, 'pst_side1-fullsize') && isClass(objWrapper, 'pst_side1-open'))
 return ture; else
 return false;}

function isSide2FullScreen() {
 var objWrapper = document.getElementById('PT_WRAPPER'); if (isClass(objWrapper, 'pst_side2-fullsize') && isClass(objWrapper, 'pst_side2-open'))
 return ture; else
 return false;}

function showPromptCriteria() {
 var criteriaElem = document.querySelector(".ps_prompt-criteria")
 if (criteriaElem.querySelectorAll(".ps_detail-group .psc_fld-prompt").length == 0)
 addClass(criteriaElem, 'psc_hidden');}

function openIOSAttachment(url) {
 if (window.navigator.standalone) return; if (isMAF() == "1") return; var win = window.open(); if (win)
 win.document.location = url;}


function psAnnounceText(str) {
 if (loader) {
 psAnnounceText0(str); } else {
 var strEscapeQuote = str.replace(/\"/g, "\\\"").replace(/\'/g, "\\'"); var oWin = window; if (isTopFModeLayout())
 oWin = top.window; oWin.doGrouplet("runScript@setTimeout(function () { psAnnounceText0('"+strEscapeQuote+"'); }, 500);"); }
}

function psAnnounceText0(str) {
 var obj = document.querySelector(".ps_box-announce.ps_alert-normal"); if (obj) psPostText(obj, str);}

function psPostText(obj,str) {
 
 
 
 var originalStr = unescape(str); var t = document.createTextNode(originalStr); if (!t) return; obj.appendChild(t); clearTimeout(liveTimeout); liveTimeout = setTimeout(() => {
 obj.textContent = ""; } , 1000);}

function doCloseKeyboard(obj)
{
if (!isTouchKeyboard()) return;try {
 var aObj = obj; if (typeof obj == 'undefined' || !obj)
 aObj = document.activeElement; if (aObj)
 aObj.blur();}
catch (e)
{ }
}


function changeImage(id, srcUrl) {
 var obj = document.getElementById(id); obj.src = srcUrl + "?" + new Date();}



function ptUpdateMyPrefContext(sComponent, otherParams) {
 if (!sComponent) return; var winTarget = window.top;  var docTarget = winTarget.document; var myPref = docTarget.getElementById("PT_MY_PREFERENCES"); if (!myPref) return; var sHref = myPref.href; if (!sHref || typeof sHref === "undefined") return; if (typeof otherParams === "undefined" || otherParams === null) otherParams=""; if (otherParams && otherParams.charAt(0) != "&") otherParams = "&" + otherParams;  var nHref = sHref.replace(/---[^\']+/, "---"+sComponent+otherParams); myPref.href = nHref;}


function ptActionListItem(id, label, href, func_class) {
 this.id = id; this.label = (typeof label === "undefined" || label == null) ? "" : label; this.href = (typeof href === "undefined" || href == null) ? "" : href; this.functionalClass = (typeof func_class === "undefined" || func_class == null) ? "" : func_class; this.docTarget = window.top.document; this.winName = window.top.winName; this.getHTMLElement = function() {
  var newLIObj = null; if (!this.id || !this.label || !this.href) return ""; newLIObj = this.docTarget.createElement("li"); newLIObj.id = this.winName + this.id+"$list"; newLIObj.className = "ps_box-group psc_layout ps_box-menuitem ps_menuitem psc_js-added "+this.functionalClass; newLIObj.setAttribute("role","presentation"); var newDIVObj = this.docTarget.createElement("div"); newDIVObj.id = this.winName + "div" + this.id; newDIVObj.className = "ps_box-link"; newDIVObj.setAttribute("role","presentation"); var newSPANObj = this.docTarget.createElement("span"); newSPANObj.id = this.id+"$span"; newSPANObj.className = "ps-link-wrapper"; newSPANObj.setAttribute("role","presentation"); var newAObj = this.docTarget.createElement("a"); newAObj.id = this.id; newAObj.className = "ps-link"; newAObj.tabIndex="-1"; newAObj.setAttribute("onclick","javascript:cancelBubble(event);"); newAObj.setAttribute("role","menuitem"); newAObj.href=this.href; newAObj.appendChild(this.docTarget.createTextNode(this.label)); newSPANObj.appendChild(newAObj); newDIVObj.appendChild(newSPANObj); newLIObj.appendChild(newDIVObj); return newLIObj; }
}


function ptAddJSActionListEntry(items) {
 var litems = items; var winTarget = window.top;  var docTarget = winTarget.document; var isSFF = (document.querySelector('html').getAttribute('class').indexOf('psc_form-small') >= 0) ? true: false;  if (!items || typeof items === "undefined") return; if (!Array.isArray(items))
 litems = new Array(items);  var pObj; if (isSFF) 
 docTarget.querySelector(".ps_actions_cont .psc_menu-act .ps_custom_action"); else
 docTarget.querySelector(".ps_pagetitle_cont .psc_menu-act .ps_custom_action"); if (!pObj) return; var winName = getPageFormName(pObj); var gObj = pObj.querySelector("ul"); var bInsertUL = (!gObj); if (bInsertUL) {
 gObj = document.createElement("ul"); gObj.id=winName + "divJS_APPS_CUSTOM"; gObj.className = "ps_box-group psc_layout psc_js-added"; gObj.setAttribute("role","presentation"); pObj.appendChild(gObj); }

 for (var i=0; i < litems.length; i++) {
 var iObj = litems[i]; var elem = iObj.getHTMLElement(); if (elem)
  gObj.appendChild(elem); }
}


function ptRemoveAllJSActionList() {
 var winTarget = window.top;  var docTarget = winTarget.document; var objArray = docTarget.querySelectorAll(".ps_custom_action .psc_js-added"); if (objArray && objArray.length > 0) {
 for (var i=0; i < objArray.length; i++) {
 var tName = objArray[i].tagName; objArray[i].parentNode.removeChild(objArray[i]); if (tName == "UL")
 break; }
 delete objArray; }
}


function ptRemoveJSActionListEntry(items) {
 var litems = items; var winTarget = window.top;  var docTarget = winTarget.document; if (typeof items === "undefined") return; if (typeof items === "string")
 items = new ptActionListItem(items); if (!Array.isArray(items))
 litems = new Array(items); else {
 if (items.length == 0) return; if (typeof items[0] === "string") {
 litems = []; for(var i=0; i< items.length; i++)
 litems[i] = new ptActionListItem(items[i]); }
 }

 var sScan=[]; for(var i=0,u=0; i < litems.length; i++)
 if (litems[i].id)
 sScan[u++] = "#"+litems[i].id; if (sScan.length == 0) return; var sScan = sScan.join(","); var objArray = docTarget.querySelectorAll(".ps_custom_action li.psc_js-added"); if (objArray && objArray.length > 0) {
 for (var i=0; i < objArray.length; i++) {
 var isMatch = objArray[i].querySelector(sScan); if (isMatch)
 objArray[i].parentNode.removeChild(objArray[i]); }
 delete objArray; }
 var pObj = docTarget.querySelector(".ps_custom_action .psc_js-added:empty"); if (pObj)
 pObj.parentNode.removeChild(pObj);}


function iOSIframeUpdate() {
 var ofrmcont = document.querySelectorAll(".psc_has_iframe:not(.psc_ios_bypass)"); if (ofrmcont && ofrmcont.length && ofrmcont.length > 0) {
 var icont; for (icont=0; icont < ofrmcont.length; icont++)
 ofrmcont[icont].classList.add("psc_ios_bypass"); }
}


function AddIOSHasStdIframe(elObj){

 if (elObj && (elObj.tagName.toUpperCase() == "DIV") && (elObj.className.indexOf("psc_has_iframe") != -1))
 addClass(elObj, "psc_ios_bypass");}


function triggerKeyboardShortcutPopup(obj) {
var idP = obj.objP.id;var idFocus = idP.replace("$divpop", "$PIMG");document.getElementById("ICFocus").value = idFocus;var sEvent = "submitAction_" + winName + "(document." + winName + ", '#KEYAK')";eval(sEvent);}



function showKeyFieldsOnly(objSG, bFlag){ 
 for (var j = 0 ; j < objSG.children.length; j++) {
 if (bFlag && !isClass(objSG.children[j], "psc_key"))
 addHide(objSG.children[j]); else if (!bFlag && !isClass(objSG.children[j], "psc_key"))
 removeHide(objSG.children[j]); }
}


function changeOperator(obj) {
 var wrapObj = obj.parentElement.parentElement; var sClass = (wrapObj.getAttribute("class")) ? wrapObj.getAttribute("class") : ""; if (obj.value == 9 || sClass.indexOf("psc_op-between") > 0)
 toggleClass(wrapObj, "psc_op-between"); var opId = obj.id.split("$")[0] + "_OP"; document.getElementById(opId).innerHTML = obj.options[obj.selectedIndex].text; if (obj.value == 10) 
 obj.parentElement.nextSibling.firstChild.removeAttribute("maxlength")
 else
 obj.parentElement.nextSibling.firstChild.setAttribute("maxlength", obj.parentElement.nextSibling.firstChild.getAttribute("maxlengthnui"));} 

function SearchPageOpen() {
 SetSearchPrevNext(); var searchObj = document.getElementById("PT_SEARCH"); if (!searchObj) return; removeClose(searchObj); var objC = document.getElementById("PT_CONTENT"); addHide(objC);}

function SearchPageClose() {
 SetSearchPrevNext(); var searchObj = document.getElementById('PT_SEARCH'); if (!searchObj) return; addClass(searchObj, 'side'); addClose(searchObj); var objC = document.getElementById("PT_CONTENT"); removeHide(objC); if (searchObj.children.length == 0) {
 var nextInListObj = document.querySelector('.ps_menuitem.ps_header-retlist'); addHide(nextInListObj); }
}


function SearchPageInModal(id, bAdd, moptions) {
 var mDivObj = document.getElementById(winName + "div" + id); if (!mDivObj) return; moptions += "sCacheParentId@" + mDivObj.parentNode.id + ";"; addDivPopup(mDivObj, window, moptions); playDivPopup(); doGrouplet("initScrolls@100"); if (typeof bAdd != 'undefined' && bAdd) 
 selectSearchTab(document.getElementById("PTLAYOUT_SEARCHPAGETAB2")); else
 selectSearchTab(document.getElementById("PTLAYOUT_SEARCHPAGETAB1"));}

function SearchPageInFullSreen(id, bAdd) {
 openSide1FullScreen(); removeClass(document.querySelector('html'), "psc_mode-search"); addClass(document.querySelector('html'), "psc_mode-fscreen-search");   var objTop = document.getElementById('PT_SIDE_TOP0'); if (objTop && isClass(objTop.firstChild, 'ps_header-group'))
 addHide(objTop.firstChild); var objBottom0 = document.getElementById('PT_SIDE_BOTTOM0'); if (objBottom0) {
 if (isClass(objBottom0.firstChild, 'ps_header-group'))
 addHide(objBottom0.firstChild); addHide(objBottom0); }
 if (typeof bAdd != 'undefined' && bAdd)
 selectSearchTab(document.getElementById("PTLAYOUT_SEARCHPAGETAB2")); else
 selectSearchTab(document.getElementById("PTLAYOUT_SEARCHPAGETAB1")); doGrouplet("initScrolls@100");}

function DoSearch(bMSearch, id, bAdd, moptions) {
 closeLastModal(); if (typeof moptions != 'undefined' && moptions.length > 0)
 SearchPageInModal(id, bAdd, moptions); else
 SearchPageInFullSreen(id, bAdd); if (typeof bMSearch == 'undefined' || !bMSearch) {
 SearchPageOpen(); var objRtnSrchHdr = document.getElementById(winName + "srchdivPTS_RTNSRCH_HDR"); if (objRtnSrchHdr)
 removeClass(objRtnSrchHdr, 'psc_force-hidden'); initScrolls0(); var objCancel = document.getElementById(winName + "srchdivPT_SEARCHCANCEL"); if (objCancel)
 removeHide(objCancel); }
}

function DoSearchCancel(){
 var searchObj = document.getElementById("PT_SEARCH"); if (!searchObj) return; SearchPageClose(); var saveObj = document.getElementById(winName + "hdrdivPT_SAVE"); if (saveObj)
 removeHide(saveObj); var prevObj = document.querySelector('.ps_menuitem.ps_header-previous'); removeHide(prevObj); var nextObj = document.querySelector('.ps_menuitem.ps_header-next'); removeHide(nextObj);}

function selectSearchTab(objLink) {
 var idTabBox = winName + "srchdivPT_SEARCHTABBOX"; var objP = document.getElementById(idTabBox); if (!objP || objP.children.length != 2) return; var obj = objLink.parentNode.parentNode.parentNode; if (isSelected(obj)) return; var idSGrp = winName + "srchdivPT_SEARCHITEMBOX"; var idAGrp = winName + "srchdivPT_ADDITEMBOX"; var idSRGrp = winName + "srchdivPT_SEARCHRESULT"; if (objP.children[0] == obj) {
 removeSelected(objP.children[1]); addHide(document.getElementById(idAGrp)); addSelected(objP.children[0]); removeHide(document.getElementById(idSGrp)); removeHide(document.getElementById(idSRGrp)); }
 else {

 addHide(document.getElementById(idSGrp)); removeSelected(objP.children[0]); removeHide(document.getElementById(idAGrp)); addSelected(objP.children[1]); addHide(document.getElementById(idSRGrp)); }

}

function DoBackToSearch() {
 var bChanged = checkFrameChanged(window); var agTarget = typeof document.getElementById("ICAGTarget") != 'undefined' && document.getElementById("ICAGTarget"); var agChanged = agTarget ? (typeof document.getElementById("ICUOW") != 'undefined' && document.getElementById("ICUOW") != null && document.getElementById("ICUOW").value != "N" ? true : false) : false; if (bChanged || agChanged) {
 var sJS = 'javascript:DoBackToSearch0()';  psConfirmSW("", sJS, window); } else {
 DoBackToSearch0(); }
}

function DoBackToSearch0() {
 removeClass(document.querySelector('html'), "psc_mode-guided"); var oWin = top.window; var retListObjC = oWin.document.querySelector('.ps_menuitem.ps_header-returnlist'); if (!retListObjC) return; bSearchDialog_empty = true; var retListObj = retListObjC.querySelector('A'); var sScript = retListObj.getAttribute('href');  var bScript = (isOnClickCancelBubble(retListObj) && sScript != null && sScript.indexOf("javascript:") != -1) ? true : false; if (bScript) {
 var objSkipPending = document.getElementById("ICSkipPending"); if (objSkipPending)
 objSkipPending.value = 1; eval(sScript); }
 else
 retListObj.onclick();}





function toggleGBLSearchTray(buttonid) {
 var obj; if (!buttonid) buttonid="PT_GSEARCH_BTN"; obj = document.getElementById(buttonid); if (!obj) return; toggleClass(obj.parentElement.parentElement.nextElementSibling,'psc_closed');  obj.setAttribute('aria-expanded',(obj.getAttribute('aria-expanded') == 'true')?'false':'true');}

function closeGBLSearchTray(evt,buttonid) {
 if (evt && getKeyCode(evt) == 27) { 
 toggleGBLSearchTray(buttonid); cancelBubble(evt); }
}

function closeSide1FullScreen() {
 var objWrapper = document.getElementById('PT_WRAPPER'); removeClass(objWrapper, 'pst_side1-fullsize'); removeClass(objWrapper, 'pst_side1-open');}

function openSide1FullScreen() {
 var objWrapper = document.getElementById('PT_WRAPPER'); addClass(objWrapper, 'pst_side1-fullsize'); addClass(objWrapper, 'pst_side1-open');}

function disableSide1() {
 var objWrapper = document.getElementById('PT_WRAPPER'); addClass(objWrapper,'pst_side1-disabled');}

function clearSide1Bottom() {
 var objWrapper = document.getElementById('PT_WRAPPER'); removeClass(objWrapper, 'pst_collision-intra'); removeClass(objWrapper, 'pst_collision-inter'); var objSide1Bottom = document.getElementById('PT_SIDE_BOTTOM'); objSide1Bottom.innerHTML = ""; addHide(document.getElementById('PT_SIDE_BOTTOM0')); var objPanelTabs = document.getElementById(winName + "divPSPANELTABS"); if (objPanelTabs) {
 objPanelTabs.innerHTML = ""; }
 if (isMDListSlideOut()) {
 var objTitle = document.getElementById("PT_SIDE_TOP0$h"); if (objTitle)
 setAriaAttr(objTitle, "aria-expanded", 'false'); }
}

function enableSide2() {
 var objSide2 = document.getElementById('PT_SIDE2'); removeClass(objSide2, 'psc_force-hidden');}

function selectSide2Tab(obj, idGrp1, idGrp2)
{
 var objC = document.getElementById(winName + "side2div" + obj.id); var objP = objC.parentNode; if (!objP || objP.children.length != 2) return; if (isSelected(objP)) return; var idGrp1 = winName + "side2div" + idGrp1; var idGrp2 = winName + "side2div" + idGrp2; if (objP.children[0] == objC) {
 removeSelected(objP.children[1]); addHide(document.getElementById(idGrp2)); addSelected(objP.children[0]); removeHide(document.getElementById(idGrp1)); }
 else {

 addHide(document.getElementById(idGrp1)); removeSelected(objP.children[0]); removeHide(document.getElementById(idGrp2)); addSelected(objP.children[1]); }
}





function toggleTwoChildGroups(fname, nIndex) {
 var objP = document.getElementById(fname); if (!objP || objP.children.length != 2) return; if (typeof nIndex == "undefined") nIndex = -1; if (nIndex == 1) {
 addHide(objP.children[0]); removeHide(objP.children[1]); return; }
 if (nIndex == 0) {
 addHide(objP.children[1]); removeHide(objP.children[0]); return; }
 if (isHidden(objP.children[0])) {
 addHide(objP.children[1]); removeHide(objP.children[0]); }
 else {
 addHide(objP.children[0]); removeHide(objP.children[1]); }
 return;}

function toggleSideTab(fname, nSide) {
 var objWrapper = document.getElementById("PT_WRAPPER");  var objSide = document.getElementById(fname);  var sClassOpen = 'pst_side' + nSide + '-open'; var sClassClose = 'pst_side' + nSide + '-closed'; var bOpen = isClass(objWrapper, sClassOpen); if (bOpen) {
 removeClass(objWrapper, sClassOpen); addClass(objWrapper, sClassClose); setAriaAttr(objSide, "aria-expanded", "false"); } else {
 removeClass(objWrapper, sClassClose); addClass(objWrapper, sClassOpen); setAriaAttr(objSide, "aria-expanded", "true"); }

 if (typeof(SetGridSize) == "function") SetGridSize(); if (ResizeAccordions() || !isClass(objWrapper, "pst_side1-fixed") && !isClass(objWrapper, "pst_side1-overlay"))
 initScrolls0(); if (nSide == 1)
 closeCollision(); top.DoGroupletAutoSizeAll();}



function closeSidePanel(nSide, objSide) {
 if (nSide < 1 || nSide > 2) return; if (typeof objSide == "string") {
 if (objSide) {
 objSide = document.getElementById(objSide); } else {
 objSide = document.querySelector(".pst_panel-side"+nSide+" .pst_panel-tabcontainer .ps-button"); }
 }
 if (!objSide) return; var objWrapper = document.getElementById("PT_WRAPPER");  var sClassOpen = 'pst_side' + nSide + '-open'; var sClassClose = 'pst_side' + nSide + '-closed'; var bOpen = isClass(objWrapper, sClassOpen); if (bOpen) {
 removeClass(objWrapper, sClassOpen); addClass(objWrapper, sClassClose); bOpen = (!bOpen); }
 
 setAriaAttr(objSide, "aria-expanded", String(bOpen));}


function openSidePanel(nSide, objSide, forceMode) {
 if (nSide < 1 || nSide > 2) return; var objSidePanel = document.querySelector(".pst_panel-side"+nSide); if (!objSidePanel) return; if (typeof objSide == "string") {
 if (objSide) {
 objSide = document.getElementById(objSide); } else {
 objSide = objSidePanel.querySelector(".pst_panel-tabcontainer .ps-button"); }
 }
 if (!objSide) return; var objWrapper = document.getElementById("PT_WRAPPER");  var sClassOpen = 'pst_side' + nSide + '-open'; var sClassClose = 'pst_side' + nSide + '-closed'; var bOpen = isClass(objWrapper, sClassOpen); var bInOverlay = (window.getComputedStyle(objSidePanel, null).getPropertyValue("position") == "absolute"); var bTabVisible = (objSide.offsetParent != null); if (!bOpen && ((bInOverlay && forceMode) || (!bInOverlay && (bTabVisible || forceMode)))) {
 removeClass(objWrapper, sClassClose); addClass(objWrapper, sClassOpen); bOpen = (!bOpen); }
 
 setAriaAttr(objSide, "aria-expanded", String(bOpen));}


function syncSideTabAria(nSide,objSide) {
 if (nSide < 1 || nSide > 2) return; if (typeof objSide == "string") {
 if (objSide) {
 objSide = document.getElementById(objSide); } else {
 objSide = document.querySelector(".pst_panel-side"+nSide+" .pst_panel-tabcontainer .ps-button"); }
 }
 if (!objSide) return; var objWrapper = document.getElementById("PT_WRAPPER");  var sClassOpen = "pst_side" + nSide + "-open"; var bOpen = isClass(objWrapper, sClassOpen);  setAriaAttr(objSide, "aria-expanded", String(bOpen));}

function toggle2PanelTab(fname) {

 var objWrapper = document.getElementById(winName+fname); var sClassOpen = 'psc_open'; var sClassClose = 'psc_closed'; removeClass(objWrapper, 'psc_initial'); var bOpen = isClass(objWrapper, sClassOpen); if (bOpen) {
 removeClass(objWrapper, sClassOpen); addClass(objWrapper, sClassClose); setAriaAttr(objWrapper, "aria-expanded", "false"); } else {
 removeClass(objWrapper, sClassClose); addClass(objWrapper, sClassOpen); setAriaAttr(objWrapper, "aria-expanded", "true"); }
}

function expandSideTab(fname) {
 if (browserInfoObj2.isIE) return; var obj = document.getElementById(fname);  var bDoOpen = true; if (obj.getAttribute("class").indexOf(" open") != -1)
 bDoOpen = false; var objP = obj.parentNode; for (var j = 0; j < objP.children.length; j++) {
 var objC = objP.children[j]; if (bDoOpen) {
 if (objC.id != fname)
 addHide(objC); else {
 removeClose(objP); removeClose(objC); addClass(objC, "open"); }
 } else {
 if (objC.id != fname)
 removeHide(objC); else {
 addClose(objP); addClose(objC); removeClass(objC, "open"); }
 }
 }

}




function DoMDListPopup(id, moptions0) {
 var mDivObj = document.getElementById("PT_SIDE_TOP"); if (!mDivObj) return; var objTitle = document.getElementById("PT_SIDE_TOP0$h"); if (objTitle && objTitle.innerHTML != "")
 removeHide(objTitle.parentNode); var moptions = ''
 moptions += "sPopupParentId@" + id; moptions += ";sCacheParentId@PT_SIDE_TOP0;"; moptions += "bPIA@1;bPopup@1;bMask@0;bClose@1;bHeader@1;bCache@1;bHeader@0;bVertical@1;bMask@1;sTitle@Master List;bAutoClose@1;sStyle@ps_popup-menu ps_menutype-grid lpselbtn;"
 moptions += moptions0; var sObj = mDivObj.querySelector('.ps_scrollable'); bLocalModal = true; if (sObj)
 addDivPopup(mDivObj, window, moptions, sObj.id); else
 addDivPopup(mDivObj, window, moptions); playDivPopup();}

function DoRowAction(nRow, gid)
{
 if (typeof nRow == "undefined") nRow = 0; var gObj = null; var bSA = false; if (typeof gid == "undefined") {
 gObj = document.querySelector('.ps_masterlist-group .ps_box-scrollarea'); if (gObj) bSA = true; if (!gObj)
 gObj = document.querySelector('.ps_masterlist-group .ps_box-grid-list'); if (!gObj)
 gObj = document.querySelector('.ps_masterlist-group .ps_box-grid-flex');   if (!gObj) return; var id = gObj.id; if (bSA)
 gid = id.substring(0, id.indexOf("$")); else {
 var pos = id.indexOf("div"); gid = id.substring(pos + 3, id.length); }
 }
 else
 gObj = document.getElementById(gid);  var rObj = document.getElementById(gid + "_row_" + nRow); if (!rObj)
 rObj = document.getElementById(gid + "_row$" + nRow); if (rObj) 
 {
 if (rObj.getAttribute("onclick"))
 rObj.onclick(); else 
 {
 var aObj = rObj.querySelector("a"); if (aObj)
 aObj.click(); }
 }
}
function updateBackMDUrl(id) {
 if (typeof id == 'undefined' || !id) return; var nRow = ""; var tmpArr = id.split("row_"); if (tmpArr.length == 2)
 nRow = tmpArr[1]; else {
 tmpArr = id.split("row$"); if (tmpArr.length == 2)
 nRow = tmpArr[1]; }
 if (nRow == "") return; var pt_history = getHistoryObject(); if (pt_history && pt_history.size() != 0) {
 var histRec = pt_history.pop(); var sUrl = histRec.url; if (sUrl.indexOf("nRow=") == -1 || sUrl.indexOf("nRow=" + nRow) != -1) return; var tmpArr = sUrl.split("nRow="); var sTmp = tmpArr[1]; var pos = sTmp.indexOf("&"); var newUrl = tmpArr[0] + "nRow=" + nRow + sTmp.substring(pos, sTmp.length); histRec.url = newUrl; pt_history.push(histRec); pt_history.save(); }

}

function SetSearchSelectedRow(id)
{
 if (isMDMode() && id) {
 updateBackMDUrl(id)
 }
 fixUpBackButton();  var objBottom = document.getElementById('PT_SIDE_BOTTOM'); if (objBottom && objBottom.innerHTML != "")
 removeHide(document.getElementById('PT_SIDE_BOTTOM0')); if (isClass(document.querySelector('html'), "psc_mode-fscreen-search")) {
 removeClass(document.querySelector('html'), "psc_mode-fscreen-search"); addClass(document.querySelector('html'), "psc_mode-search"); var objTop = document.getElementById('PT_SIDE_TOP0'); if (objTop && isClass(objTop.firstChild, 'ps_header-group'))
 removeHide(objTop.firstChild);  if (objBottom && objBottom.innerHTML != "") {
 var objBottom0 = document.getElementById('PT_SIDE_BOTTOM0'); if (objBottom0 && isClass(objBottom0.firstChild, 'ps_header-group'))
 removeHide(objBottom0.firstChild); }
 else
 addHide(document.getElementById('PT_SIDE_BOTTOM0')); }







 if (gcurSearchRowId == "" && typeof id == "undefined") return; var curObj = document.getElementById(gcurSearchRowId); if (curObj)
 removeSelected(curObj, "aria-current"); if (typeof id != "undefined" && id) gcurSearchRowId = id; curObj = document.getElementById(gcurSearchRowId); if (!curObj) return; var objP = curObj.parentNode; removeSelected(objP.querySelector('.psc_selected')); if (curObj.tagName == "A") {
 var objP0 = curObj.parentNode.parentNode.parentNode; if (isClass(objP0, "psc_rowact")) {
 var objP = objP0.parentNode; removeSelected(objP.querySelector('.psc_selected')); addClass(objP0, "psc_selected"); addStateAttr(objP0, "psc_selected"); setAriaAttr(objP0, "aria-selected", "true"); }
 }
 addSelected(curObj, "page");}

function SetCurSelectedRow() {

 if (gcurSearchRowId == "" && typeof id == "undefined") return; var curObj = document.getElementById(gcurSearchRowId); if (curObj)
 removeSelected(curObj); if (typeof id != "undefined" && id) gcurSearchRowId = id; curObj = document.getElementById(gcurSearchRowId); if (!curObj || isSelected(curObj)) return; addSelected(curObj);}

function removeRowSelected(obj, current) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; sClass = sClass.replace(" psc_selected", ""); sClass = sClass.replace("psc_selected", ""); obj.setAttribute("class", sClass); if (obj.getAttribute("role") != "presentation")
 setAriaAttr(obj, "aria-selected", "false"); removeStateAttr(obj, "psc_selected"); if (typeof current != "undefined" && current)
 obj.removeAttribute("aria-current"); var list = findListParent(obj); if (list != null && list.classList.contains("pt_keynav-listtab"))
 obj.setAttribute("tabindex", "-1");}

function SetSearchStatus(obj, form) {
 DoSearchCancel(); if (gcurSearchRowId != "") {
 var curObj = document.getElementById(gcurSearchRowId); if (curObj)
 removeRowSelected(curObj); }
 addSelected(obj); gcurSearchRowId = obj.id; SetSearchPrevNext();}

function SetSearchPrevNext(bGuided)
{
 if (typeof bGuided != "undefined" && bGuided)
 addClass(document.querySelector('html'), "psc_mode-guided"); var oWin = top.window; removeHide(oWin.document.querySelector('.ps_menuitem.ps_header-returnadd')); var prevObj = null; var nextObj = null; var i = 0; if (isMDGuided()) {
 prevObj = oWin.document.querySelectorAll('.ps_box-button.ps_header-previous');  nextObj = oWin.document.querySelectorAll('.ps_box-button.ps_header-next');  }
 else {
 prevObj = oWin.document.querySelectorAll('.ps_menuitem.ps_header-previous'); nextObj = oWin.document.querySelectorAll('.ps_menuitem.ps_header-next'); var elRetToAdd = oWin.document.querySelector('.ps_menuitem.ps_header-retlist'); if (elRetToAdd) {
 var elAtag = document.getElementById('PT_RETURNLST'); if (elAtag) {
 var sRtnHref = elAtag.getAttribute('href'); var sRtnOnclick = elAtag.getAttribute('onclick'); if (!sRtnHref && !sRtnOnclick) {
 elAtag.setAttribute('href', 'javascript:processing_win0(0,3000); void DoBackToSearch();'); elAtag.setAttribute('onclick', 'javascript:cancelBubble(event);'); elAtag.innerHTML = "Add"; ; }
 }
 }
 }
 
 if (oWin.gcurSearchRowId == "") return; var obj = oWin.document.getElementById(oWin.gcurSearchRowId); if (!obj)
 {
 for (i = 0; i < prevObj.length; i++) { 
 addHide(prevObj[i]);  } 
 for (i = 0; i < nextObj.length; i++) { 
 addHide(nextObj[i]);  } 
 return;  }
 var objP = obj.parentNode; for (var j = 0; j < objP.children.length; j++) {
 if (objP.children[j] == obj) {
 oWin.gcurSearchRowNo = j; break; }
 } 
 if (objP.children.length > 1) { 
 if (gcurSearchRowNo == 0) 
 { 
 for (i = 0; i < prevObj.length; i++) { 
 addHide(prevObj[i]);  } 
 } 
 if (gcurSearchRowNo > 0) 
 { 
 for (i = 0; i < prevObj.length; i++) { 
 removeHide(prevObj[i]);  } 
 } 
 if (gcurSearchRowNo == (objP.children.length - 1)) 
 { 
 for (i = 0; i < nextObj.length; i++) { 
 addHide(nextObj[i]);  } 
 } 
 else if (gcurSearchRowNo < (objP.children.length - 1)) 
 { 
 for (i = 0; i < nextObj.length; i++) { 
 removeHide(nextObj[i]);  } 
 } 
 } 
 else { 
 if (objP.children.length = 1) { 
 for (i = 0; i < prevObj.length; i++) { 
 addHide(prevObj[i]);  } 
 for (i = 0; i < nextObj.length; i++) { 
 addHide(nextObj[i]);  } 
 } 
 } 
}

function SetPrevNext(pid) {
 SetSearchPrevNext();  if (typeof pid != "undefined") {
 var objP = document.getElementById(pid); if (objP && objP.children.length == 2 && objP.children[1].children.length > 0) {
 removeHide(document.querySelector('.ps_menuitem.ps_header-retlist')); }
 else
 addHide(document.querySelector('.ps_menuitem.ps_header-retlist')); }
}

function SetAGAction(sPrev, sNext, sSubmit, sExit) {
 var oWin = top.window; var prevObj = null; var nextObj = null; var submitObj = oWin.document.querySelector('.ps_process-submit.ps_header-submit'); var exitObj = oWin.document.getElementById("PT_WORK_PT_BUTTON_BACK"); if (exitObj && typeof sExit != "undefined" && sExit != null && sExit.length != 0) {
 exitObj.setAttribute("onclick", sExit); exitObj.setAttribute("href", 'javascript:void(0);'); }
 if (isMDGuided()) {
 prevObj = oWin.document.querySelector('.ps_box-button.ps_header-previous'); nextObj = oWin.document.querySelector('.ps_box-button.ps_header-next'); }
 else {
 prevObj = oWin.document.querySelector('.ps_menuitem.ps_header-previous'); nextObj = oWin.document.querySelector('.ps_menuitem.ps_header-next'); }
 if (prevObj && typeof sPrev != "undefined" && sPrev != null && sPrev.length != 0) {
 var aObj = prevObj.querySelector('A'); aObj.setAttribute("onclick", sPrev); aObj.setAttribute("href", 'javascript:void(0);'); removeHide(prevObj); }
 else
 addHide(prevObj); if (nextObj && typeof sNext != "undefined" && sNext != null && sNext.length != 0) {
 var aObj = nextObj.querySelector('A'); aObj.setAttribute("onclick", sNext); aObj.setAttribute("href", 'javascript:void(0);'); removeHide(nextObj); }
 else
 addHide(nextObj); if (submitObj && typeof sSubmit != "undefined" && sSubmit != null && sSubmit.length != 0) {
 var aObj = submitObj.querySelector('A'); aObj.setAttribute("onclick", sSubmit); aObj.setAttribute("href", 'javascript:void(0);'); removeHide(submitObj); }
 else
 addHide(submitObj);}


function DoPrevInList(obj) {
 var bChanged = checkFrameChanged(window); if (!bChanged)
 return DoPrevInList0(obj); var sScript = "DoPrevInList0(document.getElementById('" + obj.id + "'));"; psConfirmSW('', sScript.replace(/'/g, '\"'), window);}

function DoPrevInList0(obj) {
 if (gcurSearchRowId == "" || gcurSearchRowNo == 0) return; bSearchDialog_empty = true; var curObj = document.getElementById(gcurSearchRowId); var objP = curObj.parentNode; var prevObj = objP.children[gcurSearchRowNo - 1]; closeLastModal(); if (prevObj.onclick == null) {
 if (isClass(prevObj, "psc_close"))
 prevObj = prevObj.querySelector('A'); if (!prevObj || prevObj.onclick == null) {
 var objPrevRowActAll = prevObj.querySelectorAll('.psc_rowact'); if (objPrevRowActAll.length > 1) {
 for (var j = 0; j < objPrevRowActAll.length; j++) {
 if (objPrevRowActAll[j].onclick) {
 prevObj = objPrevRowActAll[j]; break; }
 }
 }
 }

 }
 var sScript = prevObj.getAttribute('href');  if (sScript == null && prevObj.onclick == null) {
 prevObj = prevObj.querySelector('.psc_trigger'); prevObj = prevObj.querySelector('a'); sScript = prevObj.getAttribute('href'); }
 var bScript = (isOnClickCancelBubble(prevObj) && sScript != null && sScript.indexOf("javascript:") != -1) ? true : false; if (bScript)
 eval(sScript); else 
 prevObj.onclick();}


function DoNextInList(obj) {
 var bChanged = checkFrameChanged(window); if (!bChanged)
 return DoNextInList0(obj); var sScript = "DoNextInList0(document.getElementById('" + obj.id + "'));"; psConfirmSW('', sScript.replace(/'/g, '\"'), window);}

function DoNextInList0(obj) {
 if (gcurSearchRowId == "") return; bSearchDialog_empty = true; var curObj = document.getElementById(gcurSearchRowId); var objP = curObj.parentNode; if (gcurSearchRowNo == (objP.children.length - 1)) return; if ((objP.children.length -gcurSearchRowNo) < 3) {
 var sTmpId = gcurSearchRowId.substring(0,gcurSearchRowId.indexOf("_row")); var sWrapId = winName+"srchdiv"+sTmpId.replace("$", "$grid$"); var objWrap = document.getElementById(sWrapId); if (objWrap) {
 objMore = GetLazyScrollObj(objWrap); if (objMore) {
 objMore.onclick(); doLazyScroll(objWrap); g_bDoNextInList = true; return; }
 }
 }

 var nextObj = objP.children[gcurSearchRowNo + 1]; closeLastModal(); if (nextObj.onclick == null) {
 if (isClass(nextObj, "psc_close"))
 nextObj = nextObj.querySelector('A'); if (!nextObj || nextObj.onclick == null) {
 var objNextRowActAll = nextObj.querySelectorAll('.psc_rowact'); if (objNextRowActAll.length > 1) {
 for (var j = 0; j < objNextRowActAll.length; j++) {
 if (objNextRowActAll[j].onclick) {
 nextObj = objNextRowActAll[j]; break; }
 }
 }
 }

 }
 var sScript = nextObj.getAttribute('href');  if (sScript == null && nextObj.onclick == null) {
 nextObj = nextObj.querySelector('.psc_trigger'); var objNextAll = nextObj.querySelectorAll('a'); for (var j = 0; j < objNextAll.length; j++) {
 if (objNextAll[j].onclick) {
 nextObj = objNextAll[j]; break; }
 }
 sScript = nextObj.getAttribute('href'); }
 var bScript = (isOnClickCancelBubble(nextObj) && sScript != null && sScript.indexOf("javascript:") != -1) ? true : false; if (bScript)
 eval(sScript); else
 nextObj.onclick();}

function SetSideTopTitle(sTitle)
{
 if (isMDListSlideOut() && isMDMode()) {
 var objS1C = document.getElementById('PT_SIDE_TOP0$h'); var objS1Span = objS1C.querySelector('.ps-text'); if (objS1Span)
 objS1Span.innerHTML = sTitle; SetMDListSlideOutTitles(false); } else {
 var objTitle = document.getElementById('PT_SIDE_TOP0$h'); if (!objTitle) return; removeHide(objTitle.parentNode); objTitle.innerHTML = sTitle; }
}

function SetSideBottomTitle(sTitle)
{
 if (isMDListSlideOut() && isMDMode()) {
 var objS2C = document.getElementById('PT_SIDE_BOTTOM$hcont'); if (objS2C) {
 var objS2Span = objS2C.querySelector('.ps-text'); if (objS2Span) objS2Span.innerHTML = sTitle; }
 SetMDListSlideOutTitles(); } else {
 var objTitle = document.getElementById('PT_SIDE_BOTTOM0$h'); objTitle.innerHTML = sTitle; }
}

function SetSide1TabButtonLabel(sTitle) 
{
 var objC = document.getElementById('PT_SIDE$tab$buttton'); if (!objC) return; setTitle(objC.querySelector('.ps-button-wrapper'), sTitle); var objS2 = objC.querySelector('.ps-button-wrapper .ps-text'); if (objS2)
 objS2.innerHTML = sTitle;}

function SetMDListSlideOutTitles(bSide)
{
 if (!isMDListSlideOut()) return; updateTitleFromSide1(); if (typeof bSide != "undefined") {
 var objHSpan = document.querySelector('.ps_system_cont:not(.psc_force-hidden) .ps_pagetitle .ps-text');  if (!objHSpan) return; var objS1C = document.getElementById('PT_SIDE_TOP0$h'); if (!objS1C) return; setAriaAttr(objS1C, "aria-expanded", "false"); var objS1Span = objS1C.querySelector('.ps-text'); if (!objS1Span) return; var objS2C = document.getElementById('PT_SIDE_BOTTOM$hcont'); if (!objS2C) return; var objS2Span = objS2C.querySelector('.ps-text'); if (!objS2Span) return; if (bSide) {
 objS1Span.innerHTML = objHSpan.innerHTML; }
 else if (isMDMode()) {
 
 var info = objS1Span.innerHTML; objHSpan.innerHTML = info;  updateBrowserTitle(info); }
 }
}

function showInterCollision(bVal) {
 var objWrapper = document.querySelector('.ps_wrapper.pst_collision-inter'); if (!objWrapper) return;  var objPanelControlStyle = document.getElementById('ICPanelControlStyle'); var sValue = objPanelControlStyle.value; if (bVal) {
 addClass(objWrapper, 'pst_collision-show'); if (sValue.indexOf(" pst_collision-show") == -1)
 sValue += ' pst_collision-show'; } else {
 removeClass(objWrapper, 'pst_collision-show'); if (sValue.indexOf(" pst_collision-show") != -1)
 sValue = sValue.replace(" pst_collision-show", ""); }
 objPanelControlStyle.value = sValue; closeCollision();   if (!bVal) {
 window.bSkipFocus = true; delayPanelTabFocus(1); }
}

function delayPanelTabFocus(collisiontype) {
 if (collisiontype == 1) {
 
 setTimeout(function() {
 var panelbutton = document.querySelector(".ps_content .psc_panel-action .psc_panel-tabcontainer .ps-button"); if (panelbutton && ptCommonObj2) {
 ptCommonObj2.tryFocus0(panelbutton); }
 }, 650); } else {
 
 setTimeout(function() {
 var panelbutton = document.querySelector(".pst_panel-side1 .pst_panel-tabcontainer .ps-button"); if (panelbutton && ptCommonObj2) {
 ptCommonObj2.tryFocus0(panelbutton); }
 }, 650); }
}

function openCollision() {
 var objWrapper = document.getElementById("PT_WRAPPER"); if (!objWrapper) return; addClass(objWrapper, "pst_collision-open"); var colobj = document.querySelector(".pst_collision-button .ps-button"); if (colobj) setAriaAttr(colobj,"aria-expanded","true");}

function closeCollision() {
 var objWrapper = document.getElementById("PT_WRAPPER"); if (!objWrapper) return; var bIsCollisionInter = isClass(objWrapper, "pst_collision-inter"); var sOpenClass = "pst_collision-open"; if (bIsCollisionInter) sOpenClass= "pst_side1-open"; removeClass(objWrapper, sOpenClass); var colobj = document.querySelector(".pst_collision-button .ps-button"); if (colobj) setAriaAttr(colobj,"aria-expanded","false");}


function toggleCollisionTab(fname) {
 var objWrapper = document.getElementById("PT_WRAPPER"); var objSide = document.getElementById(fname); var isCollisionInter = isClass(objWrapper, "pst_collision-inter"); var sClassOpen = 'pst_collision-open'; if (isCollisionInter) sClassOpen = "pst_side1-open"; toggleClass(objWrapper, sClassOpen); var bOpen = isClass(objWrapper, sClassOpen); setAriaAttr(objSide, "aria-expanded", bOpen.toString());}

function createInterHeaderStructure(closeimg, closetext) {
 if (!document.querySelector(".ps_content .psc_panel-action .pst_panel-header-cont")) {
 var phcont = document.createElement("div"); var ph2 = document.createElement("h2"); var phtitle = document.createElement("span"); var phclose = document.createElement("div"); var phwrap = document.createElement("span"); var phbutton = document.createElement("a"); var phimg = document.createElement("img"); phcont.className = "pst_panel-header-cont"; phcont.id = "PT_SIDE_PANEL$hcont"; ph2.className = "ps_header-group"; phtitle.className = "ps-text"; phtitle.id="PT_SIDE_PANEL0$h"; phtitle.appendChild(document.createTextNode(" "));  phclose.className = "ps_box-button psc_modal-close pst_panel-close"; phclose.id= "PT_SIDE_PANEL$close$0"; phwrap.className = "ps-button-wrapper"; phwrap.title = closetext;  phwrap.id = "PT_SIDE_PANEL$close$0span"; phbutton.className = "ps-button"; phbutton.id = "PT_SIDE_PANEL$close"; phbutton.setAttribute("role","button");  var panel854button = document.querySelector(".ps_content .psc_panel-action .psc_panel-tabcontainer .ps-button"); if (panel854button)
 phbutton.href = panel854button.href; phbutton.onclick = "javascript:cancelBubble(evt);"; phimg.className = "ps-img"; phimg.alt = phwrap.title; phimg.title = ""; phimg.src = closeimg;  phcont.appendChild(ph2); ph2.appendChild(phtitle); phcont.appendChild(phclose); phclose.appendChild(phwrap); phwrap.appendChild(phbutton); phbutton.appendChild(phimg); var pobj = document.querySelector(".ps_content .psc_panel-action"); if (pobj) {
 pobj.insertBefore(phcont,pobj.querySelector(".psc_panel-actioninterior")); }
 }
 updateTitleFromSide1();}

function updateTitleFromSide1()
{
 var objWrapper = document.getElementById("PT_WRAPPER"); var isCollisionInter = isClass(objWrapper,"pst_collision-inter"); var isCollisionIntra = isClass(objWrapper,"pst_collision-intra"); if (!isCollisionInter && !isCollisionIntra) return; var titlespan; var selectedTextNodes; var textArray=[]; if (isCollisionInter) {
 titlespan = document.querySelector(".ps_content .psc_panel-action .pst_panel-header-cont .ps_header-group .ps-text"); }
 if (isCollisionIntra) {
 titlespan = document.querySelector(".pst_panel-side1-bottom .pst_panel-header-cont .ps_header-group .ps-text");  }

 if (!titlespan) return;  var sourceElement; sourceElement = document.querySelector(".pst_panel-side1 .pst_panel-side1-top-cont .psc_selected[stepTitle]");  if (sourceElement) {
 textArray.push(sourceElement.getAttribute("stepTitle")); } else {
 sourceElement = document.querySelector(".pst_panel-side1 .pst_panel-side1-top-cont .psc_selected .psc_source-text"); if (!sourceElement)
 sourceElement = document.querySelector(".pst_panel-side1 .pst_panel-side1-top-cont .psc_selected"); if (sourceElement) {
 selectedTextNodes = getTextNodesIn(sourceElement); for (var i = selectedTextNodes.length-1; i >= 0; i--) {
 textArray.push(selectedTextNodes[i].nodeValue); }
 } else {
 textArray.push(" "); }
 }
 if (textArray.length > 0) {
 var simpleText = textArray.join(" "); titlespan.firstChild.nodeValue = simpleText; }
}


function getTextNodesIn(elem) {
 var textNodes = []; if (elem) {
 for (var nodes = elem.childNodes, i = nodes.length; i--;) {
 var node = nodes[i], nodeType = node.nodeType; if (nodeType == 3) {
 if (node.nodeValue != "\x0a")
 textNodes.push(node); }
 else if (nodeType == 1 || nodeType == 9 || nodeType == 11) {
 textNodes = textNodes.concat(getTextNodesIn(node)); }
 }
 }
 return textNodes;}


function mediaQListernerEnabled(){
 var mql = window.matchMedia("only screen and (min-width:1px) and (max-width:900px), only screen and (orientation:portrait)");  mql.addListener(mediaQHandler);}


function mediaQHandler(mql) {
 
 if (mql.matches) {
 var objWrapper = document.getElementById("PT_WRAPPER"); var isCollisionInter = isClass(objWrapper, "pst_collision-inter"); var isCollisionIntra = isClass(objWrapper, "pst_collision-intra"); var isFixed = isClass(objWrapper, "pst_side1-fixed"); if (!(isCollisionInter || isCollisionIntra) || !isFixed) return; if (isCollisionInter) {
 if (isClass(objWrapper,"pst_side1-open") && !isClass(objWrapper,"pst_collision-show")) {
 closeCollision(); }
 } else {
 
 if (!isClass(objWrapper,"pst_side1-open")) {
 closeCollision(); }
 }
 }
}



function DoPin() {

} 




function generateNewwinURL() {
 var twl = top.window.location, path = twl.pathname, path_parts = path.split("/"); if (path_parts.length > 5) {
 path_parts[path_parts.length-5] = path_parts[path_parts.length-5].split("_")[0] + "_newwin"; }

 return twl.protocol + "//" + twl.host + path_parts.join("/") + twl.search;}

function DoNewWindowFL(obj) {
 var url = generateNewwinURL().replace(/#\w*$/,'').replace(/&*$/, '');  doCloseLocalModals(); window.open(DoPortalUrl(url));}

function initHelp() {
 var oWin = window; var oTFrame = top.window.document.querySelector(".ps_target-iframe"); if (oTFrame)
 oWin = oTFrame.contentWindow; var oHelpUrl = null; try {
 oHelpUrl = ((typeof oWin.document.forms[0] != "undefined") ? oWin.document.forms[0].ICPanelHelpUrl : null); } catch (e) {} 
 var url = ""; if (oHelpUrl)
 url = oHelpUrl.value; var oHelp = top.window.document.querySelector('.ps_header-help'); if (oHelpUrl && url.length > 0)
 top.window.removeHide(oHelp); else
 top.window.addHide(oHelp);}

function HideActionHelp(){
 var oHelp = top.window.document.querySelector('.ps_header-help'); if (oHelp)
 top.window.addHide(oHelp);}


function DoHelp(helpTile) {
 var mOption = "bCrossDomain@1;sStyle@frame-pt_help;sTitle@" + helpTile + ";bClose@1;bFullScreen@1;"; var oWin = window; var oTFrame = document.querySelector(".ps_target-iframe"); if (oTFrame)
 oWin = oTFrame.contentWindow; var oHelpUrl = null; try {
 oHelpUrl = ((typeof oWin.document.forms[0] != "undefined") ? oWin.document.forms[0].ICPanelHelpUrl : null); }catch (e) {} 
 var url = ""; if (oHelpUrl)
 url = oHelpUrl.value; var bIOSFullScreen = false; if (("standalone" in window.navigator) && window.navigator.standalone)
 bIOSFullScreen = true; if (url.length > 0){
 if (bIOSFullScreen)
 LaunchURL(null, url, 2, mOption); else {
 
 doCloseLocalModals(); window.open(url, 'help'); }
 }
}

function DoHome(url) {
 
 var addressLoc = getPortalNodePart(location.href); if (addressLoc != null) {
 var temp = getPortalNodePart(url); if (temp != null)
 url = String(url).replace(temp, addressLoc);  }

 var sScript = null; if (document.forms && document.forms.length > 0)
 sScript = "processing_" + document.forms[0].name;  if ((sScript == null) || (typeof window[sScript] != 'function'))
 sScript = null; DoURLWarningWithYesNoEvent(url, null, null, null, sScript);}

function DoLogout(url) { 
 if (url.indexOf('cmd=logout') != -1) 
 url = stripNewWin(url); initWorkers(); DoURLWarningWithYesNoEvent(url, null, null, null, 'sessionStorage.clear();');}

function DoNavBar(url) {
 if (typeof url != "undefined") {
 if (url.indexOf('?') == -1)
 url += '?ICDoModelessIframe=1'; else
 url += '&ICDoModelessIframe=1'; }
 PTNavBar.Toggle(url);}


function SetPageTitle(sTitle)
{
var objPageTitle = document.getElementById("PT_PAGETITLE");var objPageTitle1 = document.getElementById("PT_PAGETITLE1"); if ((!objPageTitle && !objPageTitle1) || sTitle.length == 0) return;var objLabel;if (objPageTitle) {
 objLabel = objPageTitle.querySelector(".ps-text"); if (objLabel)
 objLabel.innerHTML = sTitle;}
if (objPageTitle1) {
 objLabel = objPageTitle1.querySelector(".ps-text"); if (objLabel)
 objLabel.innerHTML = sTitle;}
}

function doPopupRequest(form, name, formname) {
 isPopupRequest(form, name, formname);}

function isPopupRequest(form,name,formname) {
 var winName0 = (typeof form!= 'undefined' && form)?form.name:formname; var tObj = document.getElementById(winName0 + 'div' + name); if (isDraggable(tObj) || isDroppable(tObj)) return false; var addClass = null; var sname = null; if (name.indexOf("$srt") != -1) {
 var sTmp = name.substring(name.indexOf("$srt") + 1, name.length); var sname = name.substring(0, name.indexOf("$srt")) + "$SORT" + sTmp.substring(sTmp.indexOf("$"), sTmp.length); var sObj = document.getElementById(winName0 + 'div' + sname); if (sObj) {
 addOn(sObj); sObj = document.getElementById(sname); sObj.setAttribute("aria-pressed", "true"); }
 }
 else if (name.indexOf("PT_ACCESS_ASSIST") != -1)
 toggleQABPopup(null); else
 doCloseLocalModals(); var tmp = name.split("$"); var id1 = "", id2 = "", id3 = ""; var nLen = tmp.length; if (nLen >=3 && name.indexOf("$SORT") == -1)
 {
 id2 = 'div'; for (var i = 0; i < nLen-1; i++){
 id2 += tmp[i] + '$'; }
 id2 += 'divpop$' + tmp[nLen-1]; id1 = winName0 + id2; }

 else {
 id1 = winName0 + 'div' + name + '$divpop'; id2 = name + '$divpop'; id3 = id2 + '$scroll'; if (!sname && document.getElementById(id3))
 sname = id3; }
 var mDivObj = document.getElementById(id1); if (!mDivObj)
 mDivObj = document.getElementById(id2); if (!mDivObj) {
 var pObj = document.getElementById(winName0 + 'div' + name); if (pObj) {
 var gname = name.replace("$SORT", ""); var gObj = document.getElementById(winName0 + 'div' + gname); if (gObj)
 addClass = "ps_modal-gridsort ps_box-grid-flex " + getGridTabClass(gObj); mDivObj = pObj.querySelector(".ps_box-menu"); }
 }
 if (!mDivObj) { 
 if(name.indexOf("PTS_RELACTIONS") >-1)setLocalModal(true);  return false;  }
 var moptions = mDivObj.getAttribute('options'); if((typeof form != "undefined") && (typeof form.ICFocus != "undefined") && (typeof form.ICFocus.nRCFLastKey != "undefined")) {
 var posRCF = moptions.indexOf("bRCFModal@"); if (posRCF != -1 && form.ICFocus.nRCFLastKey == "\t".charCodeAt(0)) {
 delete form.ICFocus.nRCFLastKey; return false; }
 }

 if (isClass(mDivObj, 'psc_disabled')) {
 var sScript = "processing_" + winName0 + "(0, 3000);"; eval(sScript); return true; }

 var pos = moptions.indexOf("sRCParams@"); if (pos != -1 && mDivObj.innerHTML == "") {
 var url = sRCRequestURL + "?"; var params = moptions.substring(pos); var params = params.substring(params.indexOf("@") + 1, params.indexOf(";")); url += params; loadGrouplet(url, mDivObj.id); return true; }
 
 var nBulkActionExist = moptions.indexOf("bBulkAction"); if (nBulkActionExist == -1 && mDivObj.innerHTML != "") {
 displayPopup(mDivObj, sname, addClass, winName0, name); return true; }
 return false;}

function displayPopup(mDivObj, sname, addClass, winName0, name, pWin)
{ 
 if (isAnyDivPopup()) return; if (typeof pWin == "undefined" || !pWin)
 pWin = window; if (mDivObj.innerHTML != "") {
 var pObj = pWin.document.getElementById(winName0 + name); if (pObj)
 gFocusObj = pObj; var sScript = "if (pWin.document."+winName0+") pWin.processing_" + winName0 + "(0, 3000);"; eval(sScript); resetMenu(mDivObj); removeHide(mDivObj); var moptions = mDivObj.getAttribute('options');  var optionsParts = moptions.split(";"), prntEleId = null; for (var i =0; i < optionsParts.length; i++) {
 if (optionsParts[i].search("sPopupParentId") > -1) {
 prntEleId = optionsParts[i].split("@")[1]; break; }
 }
 var temppp = sessionStorage.getItem("RCActionHotKey"); if( temppp == "1")
 {
 if(prntEleId.indexOf("$ctxmenu$img") != -1)
 {
 var value1 = moptions.indexOf("$ctxmenu$img"); var moptions_mod = moptions.substring(0,value1); moptions_mod = moptions_mod + moptions.substring(value1+12,moptions.length); moptions = moptions_mod; }
 }
 if (addClass) moptions += "sStyle@" + addClass + ";"
 if (typeof name != "undefined") moptions += "sortid@" + name + ";"; if (moptions.indexOf("bFullScreen@1") == -1)
 setLocalModal(true); if (((mDivObj.id == 'INFOPAGE$divpop') || (mDivObj.id == 'KEYINFOPAGE$divpop')) 
 && (window != top) && window.isFModeLayout() && !top.window.isFModeLayout())
 setLocalModal(true); if (!sname)
 sname = mDivObj.firstChild.id; addDivPopup(mDivObj, pWin, moptions, sname); var objC = pWin.document.getElementById(sname); if (objC) {
 objC.style.height = ""; objC.style.width = ""; }
 playDivPopup(); return true; }
}


function processRCMenuPopup(el)
{
 var winName0 = getPageFormName(el);  var sRCMenu = el.innerHTML; if (sRCMenu != "" && sRCMenu.indexOf("ps_menu") != -1)
 displayPopup(el, null, "", winName0); else
 {
 addMsg(sRCMenu); playMsg(); }
 
 if (sRCMenu == "" || sRCMenu.indexOf("ps_menu") == -1)
 {
 
 var sScript = "processing_"+winName0+"(0, 3000);"; eval(sScript); var pObj = el.parentNode; iOjbWrap = pObj.querySelector(".ps-icon-wrapper"); if (iOjbWrap)
 addClass(iOjbWrap, "psc_disabled"); else
 addClass(pObj, "psc_disabled"); addClass(el, "psc_disabled"); }
}



function uploadFile(obj)
{
 var formObject = new FormData();  var fileField = document.getElementById('#ICOrigFileName');  var file = fileField.files[0]; formObject.append("file", file); loader=new net2.ContentLoader(postUrl_win0,fileField.form,'#ICOrigFileName',null,null,null,null,null,null,null);}

function scrollCloudListL(divid,pixels)
{
 var scroller = document.getElementById(divid); scroller.scrollLeft -= pixels;}

function scrollCloudListR(divid,pixels)
{
 var scroller = document.getElementById(divid); scroller.scrollLeft += pixels;}


function FileAttachment(fList, dropArea, field, uploadBT, clistBT, numFiles) {

 var fileList = fList,
 fileField = field,
 dropZone = dropArea,
 okBT = document.getElementById("#ICOK"),
 wrapper = document.getElementById("PT_WRAPPER"); fileQueue = new Array(),
 cloudFileQueue = new Array(),
 preview = null; var numFilesAllowed = 1; var allowFileDragnDrop = true; var numCloudFilesSelected = 0; if (typeof numFiles != "undefined")
 numFilesAllowed = numFiles; var hrefUpload,
 hrefOK,
 hrefClear,
 formname; var userLanguageISO="en"; var isMobile = { Android: function() { return navigator.userAgent.match(/Android/i);},
 iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);}}; var icoMydevice ="",
 icoImage ="",
 icoPDF="",
 icoDoc="",
 icoPPT ="",
 icoXLS="",
 icoTXT="",
 icoUnknown ="",
 icoCloud ="";  this.init = function () {
 fileField.onchange = this.addFiles; dropZone.addEventListener("dragenter", this.stopProp, false); dropZone.addEventListener("dragleave", this.dragExit, false); dropZone.addEventListener("dragover", this.dragOver, false); dropZone.addEventListener("drop", this.showDroppedFiles, false); uploadBT.href = "javascript:void(0)"; formname = field.form.name; hrefUpload = this.uploadFiles; hrefClear = this.clearList; hrefOK = okBT.href; uploadBT.addEventListener("keypress", function(event) {
 if (event.keyCode == 32||event.which == 32 ) {
 document.getElementById("#ICUpload").click()
 }
 }); enableControl(uploadBT, false);  enableControl(clistBT, false, hrefClear); addClass(wrapper, "ps_popup-attach"); addClass(wrapper, "psc_attach-selecting"); if (numFilesAllowed > 1)
 addClass(wrapper, "psc_attach-multiple"); }

 this.loadDefaultIconUrls = function ( picoMydevice,picoImage,picoPDF,picoDoc,picoPPT,picoXLS,picoTXT,picoUnknown,picoCloud) {

 icoMydevice= picoMydevice; icoImage = picoImage; icoPDF = picoPDF; icoDoc = picoDoc; icoPPT = picoPPT; icoXLS = picoXLS; icoTXT = picoTXT; icoUnknown = picoUnknown; icoCloud = picoCloud; }

 this.displayProvider = function(provider_id,display_option){
 var provider = document.getElementById(provider_id); if(isMobile.Android()){
 if( display_option != "A" && display_option != "F")
 provider.setAttribute("style","display:none;"); }
 else if(isMobile.iOS()){
 if( display_option != "I" && display_option != "F")
 provider.setAttribute("style","display:none;"); }
 }

 this.addFiles = function () {
 if(field.value != "")
 addFileListItems(this.files); }

 this.showDroppedFiles = function (ev) {
 ev.stopPropagation(); ev.preventDefault(); this.classList.remove('ps-drag-over'); if (allowFileDragnDrop) {
 var files = ev.dataTransfer.files; if (files.length > 1 && numFilesAllowed == 1)
 alert("AddAttachment only allows single file. For multiple files use MAddAttachment."); else
 addFileListItems(files); } else {
 alert("Additional files cannot be attached after file upload."); }
 }

 this.clearList = function (ev) {
 ev.preventDefault(); while (fileList.childNodes.length > 0) {
 fileList.removeChild(
 fileList.childNodes[fileList.childNodes.length - 1]
 ); }
 enableControl(uploadBT, false); enableControl(clistBT, false);  removeClass(wrapper, "psc_attach-selected"); addClass(wrapper, "psc_attach-selecting"); field.value = ""; field.removeAttribute("disabled"); fileQueue = []; cloudFileQueue = []; EnableAllFileAdd(); }

 this.dragOver = function (ev) {
 ev.stopPropagation(); ev.preventDefault(); this.classList.add('ps-drag-over'); psAnnounceText("Please drop files here."); }

 this.dragExit = function (ev) {
 ev.stopPropagation(); ev.preventDefault(); this.classList.remove('ps-drag-over'); }

 this.stopProp = function (ev) {
 ev.stopPropagation(); ev.preventDefault(); }

 this.uploadQueue = function (ev) {
 ev.preventDefault(); while (fileQueue.length > 0) {
 var item = fileQueue.pop(); var p = document.createElement("p"); p.className = "loader"; var pText = document.createTextNode("Uploading..."); p.appendChild(pText); item.li.appendChild(p); if (item.file.size < 10485760) {
 uploadFile(item.file, item.li); } else {
 p.textContent = 'File too large.'; p.classList.add('ps-file_upload_error'); psAnnounceText("File too large."); }
 }
 }
 
 this.isFull = function()
 {
 if ( (fileQueue.length + cloudFileQueue.length ) < numFilesAllowed) {return Boolean(0);}
 return Boolean(1); }

 this.AddCloudFileListItems = function(fname, fsize, furl, fprovider ,fthumbnail, pauthtoken){

 var li = document.createElement("li"); if (typeof(fthumbnail ) !== 'undefined' ) {
 var thumb = new Image(); thumb.src = fthumbnail; thumb.className = "ps_attach-img"; thumb.alt = ""; li.appendChild(thumb); }

 else {
 var fileExt = fname.split('.').pop(); var fileExtUpperCase = fileExt.toUpperCase(); var iconName = ""; var word =["DOC", "DOCX", "DOTX"]; var powerpoint = ["PPT", "PPTX", "PPSX", "SLDX","PPTM","PSM","PPSM"]; var excel = ["XLS", "XLSX", "XLSM", "XLTX","CSV"]; var pdf = ["PDF"]; var image = ["JPG","JPEG","GIF","BMP","PNG","TTF"]; var textfiles = ["TXT","RTF","ODT"]; if ( word.indexOf(fileExtUpperCase) > -1 ) iconName = icoDoc; else if ( powerpoint.indexOf(fileExtUpperCase) > -1 ) iconName = icoPPT; else if ( excel.indexOf(fileExtUpperCase) > -1 ) iconName = icoXLS; else if ( pdf.indexOf(fileExtUpperCase) > -1 ) iconName = icoPDF; else if ( image.indexOf(fileExtUpperCase) > -1 ) iconName = icoImage; else if ( textfiles.indexOf(fileExtUpperCase) > -1 ) iconName = icoTXT; else iconName = icoUnknown; if( iconName != "") {
 var thumb = new Image(); thumb.src = iconName; thumb.className = "ps_attach-img"; thumb.alt = ""; li.appendChild(thumb); }
 }

 var h2 = document.createElement("h2"); var h2Text = document.createTextNode(fname); h2.appendChild(h2Text); li.appendChild(h2)
 var p = document.createElement("p"); var pText = document.createTextNode("File Size: " + fsize + " Bytes"); if(fsize != "") p.appendChild(pText);  li.appendChild(p); fileList.appendChild(li); cloudFileQueue.push({ name: fname, url: furl, li: li , authtoken: pauthtoken }); enableControl(uploadBT, true, hrefUpload); replaceClass(wrapper, "psc_attach-selecting", "psc_attach-selected"); enableControl(clistBT, true, hrefClear); if (numFilesAllowed <= fileList.childElementCount ) {
 DisableAllFileAdd(); }

 }


 var enableControl = function (fldObj, bEnable, hrefString) {
 var getType = {}; if (bEnable) {

 fldObj.style.display = "block"; if (getType.toString.call(hrefString) == '[object Function]') {
 fldObj.href = "javascript:cancelBubble(event);"; fldObj.onclick = hrefString; }
 else {
 fldObj.href = hrefString; fldObj.onclick = function () { cancelBubble(event); }; }


 }
 else {
 fldObj.style.display = "none"; fldObj.href = "javascript:void(0)"; fldObj.onclick = "#"; }
 }

 var addFileListItems = function (files) {
 if (numFilesAllowed == 1) {
 while (fileList.childNodes.length > 0) {
 fileList.removeChild(
 fileList.childNodes[fileList.childNodes.length - 1]
 ); }
 }

 var nFileCount = files.length; if (numFilesAllowed < fileList.childElementCount + files.length) {
 alert("Total number of files to be uploaded at a time has been exceeded."); return; }

 
 var bUnsupportedCharacter = false; var sUnsupportedFileNames = ""; var format = /[*:"<>?/\\|]+/;; for (var i = 0; i < nFileCount; i++) {
 var filename = files.item(i).name; if(format.test(filename)){
 if (sUnsupportedFileNames == "") {
 sUnsupportedFileNames = filename; }else {
 sUnsupportedFileNames = sUnsupportedFileNames + "," + filename; }
 bUnsupportedCharacter = true; }
 }

 if(bUnsupportedCharacter) {
 var sMsgLog = "Unsupported character *:\"<>?/\\| found in file name"; alert(sMsgLog + " " + sUnsupportedFileNames + "."); field.value = ""; return; }

 for (var i = 0; i < nFileCount; i++) {
 var fr = new FileReader(); fr.file = files[i]; fr.onloadend = showFileInList; fr.readAsDataURL(files[i]); }
 if (numFilesAllowed != 0 && numFilesAllowed <= fileList.childElementCount + files.length) {
 if (numFilesAllowed < (fileList.childElementCount + files.length)) {
 
 }
 field.disabled = "disabled"; DisableAllFileAdd(); }
 
 }

 var showFileInList = function (ev) {
 var file = ev.target.file; if (file) {
 var li = document.createElement("li"); if (file.type.search(/image\/.*/) != -1) {
 var thumb = new Image(); thumb.src = ev.target.result; thumb.className = "ps_attach-img"; thumb.alt = ""; li.appendChild(thumb); }
 else
 {
 var fileExt = file.name.split('.').pop(); var fileExtUpperCase = fileExt.toUpperCase(); var iconName = ""; var word =["DOC", "DOCX", "DOTX"]; var powerpoint = ["PPT", "PPTX", "PPSX", "SLDX","PPTM","PSM","PPSM"]; var excel = ["XLS", "XLSX", "XLSM", "XLTX","CSV"]; var pdf = ["PDF"]; var image = ["JPG","JPEG","GIF","BMP","PNG","TTF"]; var textfiles = ["TXT","RTF","ODT"]; if ( word.indexOf(fileExtUpperCase) > -1 ) iconName = icoDoc; else if ( powerpoint.indexOf(fileExtUpperCase) > -1 ) iconName = icoPPT; else if ( excel.indexOf(fileExtUpperCase) > -1 ) iconName = icoXLS; else if ( pdf.indexOf(fileExtUpperCase) > -1 ) iconName = icoPDF; else if ( image.indexOf(fileExtUpperCase) > -1 ) iconName = icoImage; else if ( textfiles.indexOf(fileExtUpperCase) > -1 ) iconName = icoTXT; else iconName = icoUnknown; if( iconName != "") {
 var thumb = new Image(); thumb.src = iconName; thumb.className = "ps_attach-img"; thumb.alt = ""; li.appendChild(thumb); }
 }

 var h2 = document.createElement("h2"); var h2Text = document.createTextNode(file.name); h2.appendChild(h2Text); li.appendChild(h2)
 var p = document.createElement("p"); var pText = document.createTextNode(
 "File Size: " + Math.round(file.size / 1024) + "KB"
 ); p.appendChild(pText); li.appendChild(p); fileList.appendChild(li); fileQueue.push({ file: file, li: li }); }

 enableControl(uploadBT, true, hrefUpload); replaceClass(wrapper, "psc_attach-selecting", "psc_attach-selected"); enableControl(clistBT, true, hrefClear); uploadBT.focus(); }

 var showImagePreview = function (ev) {
 var div = document.createElement("div"); div.style["top"] = (ev.pageY + 10) + "px"; div.style["left"] = (ev.pageX + 10) + "px"; div.style["opacity"] = 0; div.className = "imagePreview"; var img = new Image(); img.src = ev.target.src; div.appendChild(img); document.body.appendChild(div); document.body.addEventListener("mousemove", movePreview, false); preview = div; fadePreviewIn(); }

 var movePreview = function (ev) {
 if (preview) {
 preview.style["top"] = (ev.pageY + 10) + "px"; preview.style["left"] = (ev.pageX + 10) + "px"; }
 }

 var removePreview = function (ev) {
 document.body.removeEventListener("mousemove", movePreview, false); document.body.removeChild(preview); }

 var fadePreviewIn = function () {
 if (preview) {
 var opacity = preview.style["opacity"]; for (var i = 10; i < 250; i = i + 10) {
 (function () {
 var level = i; setTimeout(function () {
 preview.style["opacity"] = opacity + level / 250; }, level); })(); }
 }
 }

 var DisableAllFileAdd = function()
 {
 var divToDisable = document.getElementById("FILEATTACH_SOURCELIST_DIV"); divToDisable.className += " ps_attach_prvdr-btn-disabled"; divToDisable.setAttribute("aria-disabled", "true"); var listOfAnchorTags=divToDisable.getElementsByTagName("a"); for(i=0;i<listOfAnchorTags.length;i++)
 {
 listOfAnchorTags.item(i).setAttribute("tabindex","-1"); }
 }

 var EnableAllFileAdd = function ()
 {
 allowFileDragnDrop = true; var divToEnable = document.getElementById("FILEATTACH_SOURCELIST_DIV"); divToEnable.className = "ps_attach-source-list"; divToEnable.removeAttribute("style"); divToEnable.removeAttribute("aria-disabled"); var listOfAnchorTags=divToEnable.getElementsByTagName("a"); for(i=0;i<listOfAnchorTags.length;i++)
 {
 listOfAnchorTags.item(i).setAttribute("tabindex","0"); }
 }
 this.uploadFiles = function (ev) {
 ev.preventDefault(); var xhr = new XMLHttpRequest(),
 upload = xhr.upload; replaceClass(wrapper, "psc_attach-selected", "psc_attach-uploading"); field.disabled = "disabled"; DisableAllFileAdd(); allowFileDragnDrop = false; var pctLoaded = 0; psAnnounceText("Uploading..."); upload.addEventListener("progress", function (ev) {
 if (ev.lengthComputable) {
 var loader = document.getElementById("divIndicater"); pctLoaded = (ev.loaded / ev.total) * 100; loader.style["width"] = pctLoaded + "%"; }
 }, false); var intervalId = setInterval(function () { psAnnounceText(Math.round(pctLoaded) + " %") }, 5000); upload.addEventListener("load", function (ev) {
 
 clearInterval(intervalId); replaceClass(wrapper, "psc_attach-uploading", "psc_attach-completed"); var div = document.getElementById("divIndicater"); div.style["width"] = "100%"; psAnnounceText("Upload Complete"); enableControl(document.getElementById("#ICCancel"), false); okBT.focus(); }, false); upload.addEventListener("error", function (ev) { console.log(ev); }, false);  var pUrl = eval("postUrl_" + fileField.form.name); xhr.open("POST", pUrl); if (typeof xhr.withCredentials != 'undefined')
 xhr.withCredentials = "true"; document.getElementById("prompts").value = numFiles; var hiddenObj = document.getElementById(fileField.form.name + 'divPSHIDDENFIELDS'); var formObject = new FormData(); formObject.append('ICAJAX', '1'); var params = "ICAJAX=1&"; for (var i = 0; i < hiddenObj.childNodes.length; i++) {
 var eObj = hiddenObj.childNodes[i]; if (eObj && typeof eObj.id != 'undefined' && eObj.id != ""){
 params += ptCommonObj2.getNV(eObj); formObject.append(eObj.id, encodeURIComponent(eObj.value)); }
 }
 if (ptConsole2.isActive() && !bPerf)
 ptConsole2.append((new Date()).valueOf() + " params:" + params.length + "\n" + params); for (var i = 0; i < numFiles; i++) {
 if (!i)
 fldid = fileField.id
 else
 fldid = fileField.id + i; if (typeof fileQueue[i] != 'undefined' && fileQueue[i] != null) {
 formObject.append(fldid, fileQueue[i].file); }
 else {
 var emptyFile = new Blob();  formObject.append(fldid, emptyFile); xhr.setRequestHeader("X-File-Name", ""); } 
 }

 for (var i = 0; i < cloudFileQueue.length ; i++) {
 var str = cloudFileQueue[i].name; var enc = ""; str = str.replace(/ |@|#|\$|%|&|\||\+|;|!|&|\\/g, "_"); for (j = 0; j < str.length; j++) {
 enc += str.charCodeAt(j)+ "_"; }

 var strEncodedFileName = encodeURIComponent(cloudFileQueue[i].name); var strURL = cloudFileQueue[i].url; var strEncodedURL = strURL.replace(cloudFileQueue[i].name, strEncodedFileName); xhr.setRequestHeader("X-CloudFile-Name", enc); xhr.setRequestHeader("X-CloudFile-URL", strEncodedURL); if(typeof(cloudFileQueue[i].authtoken) !== 'undefined')
 xhr.setRequestHeader("X-Provider-Token", cloudFileQueue[i].authtoken); else
 xhr.setRequestHeader("X-Provider-Token","NR"); }
 xhr.setRequestHeader("X-CloudFile-Count", cloudFileQueue.length); fileQueue = []; cloudFileQueue = []; var fileTileAnchors = document.getElementsByName("fileStorage_provider_a"); for (var i = 0; i < fileTileAnchors.length; i++) {
 fileTileAnchors[i].onclick = "javascript:void(0)"; }


 xhr.setRequestHeader("Cache-Control", "no-cache"); xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"); xhr.send(formObject); }
}

function loadAttachment(allowMultiple) {
 if (typeof FileReader == "undefined") alert("Sorry your browser does not support the File API."); fileAttachment = new FileAttachment(
 document.getElementById("fileList"),
 document.getElementById("divFILESLIST"),
 document.getElementById("#ICOrigFileName"),
 document.getElementById("#ICUpload"),
 document.getElementById("#ICClear"),
 allowMultiple
 ); fileAttachment.init();}

function AddFileToArray(Array, fileName, fileSize, fileURL, provider, thumbnailLink, authtoken)
{
 var elementIndex = Array.length; Array.push(new Object()); if (typeof(fileName) !== 'undefined') Array[elementIndex].name = fileName; if (typeof(fileSize) !== 'undefined') Array[elementIndex].size = fileSize; if (typeof(fileURL) !== 'undefined') Array[elementIndex].url = fileURL; if (typeof(provider) !== 'undefined') Array[elementIndex].provider = provider; if (typeof(thumbnailLink) !== 'undefined') Array[elementIndex].thumbnailLink = thumbnailLink; if (typeof(authtoken) !== 'undefined') Array[elementIndex].authtoken = authtoken;}



function CloudAttachFile(fileListArray) 
 {
 
 
 var bUnsupportedCharacter = false; var sUnsupportedFileNames = ""; var format = /[*:"<>?/\\|]+/; for (var nIndex = 0; nIndex < fileListArray.length; nIndex++) {
 var filename = fileListArray[nIndex].name; if(format.test(filename)){
 if (sUnsupportedFileNames == "") {
 sUnsupportedFileNames = filename; }else {
 sUnsupportedFileNames = sUnsupportedFileNames + "," + filename; }
 bUnsupportedCharacter = true; }
 }

 if(bUnsupportedCharacter) {
 var sMsgLog = "Unsupported character *:\"<>?/\\| found in file name"; alert(sMsgLog + " " +sUnsupportedFileNames + "."); return; }

 var elementIndex; for (elementIndex = 0; elementIndex < fileListArray.length; elementIndex++) { 
 var fileName; var fileSize; var fileURL; var provider; var icon; var thumbnailLink; var authtoken; if (typeof(fileListArray[elementIndex].name) === 'undefined' || typeof(fileListArray[elementIndex].url ) === 'undefined' ) {
 alert("Adding files failed, please verify provider configuration."); return; } 
 
 if (fileAttachment.isFull() ) {
 alert("Adding files skipped after reached limit, try clearing list for adding more."); return; } 
 
 fileName = fileListArray[elementIndex].name; fileSize = fileListArray[elementIndex].size; fileURL = fileListArray[elementIndex].url; provider = fileListArray[elementIndex].provider; icon = fileListArray[elementIndex].icon; thumbnailLink = fileListArray[elementIndex].thumbnailLink ; authtoken = fileListArray[elementIndex].authtoken; fileAttachment.AddCloudFileListItems(fileName,fileSize,fileURL,provider,thumbnailLink,authtoken); }
 }

function setUserLanguageISO(lngISO)
{
 fileAttachment.userLanguageISO = lngISO;}

function getUserLanguageISO()
{
 return fileAttachment.userLanguageISO;}

function isJSLoaded(jsSrc)
{
 var myStringArray = document.getElementsByTagName("script"); var arrayLength = myStringArray.length; for (var i = 0; i < arrayLength; i++)
 {
 if(typeof(myStringArray[i].src) !== 'undefined')
 {
 if(myStringArray[i].src==jsSrc) return "YES"; }
 }
 return "NO";}

if (!(typeof removeClass == 'function')) {
 removeClass = function (obj, sClass0) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; sClass = sClass.replace(" " + sClass0, ""); sClass = sClass.replace(sClass0, ""); obj.setAttribute("class", sClass); }
}

if (!(typeof addClass == 'function')) {
 addClass = function (obj, sClass0) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; if (sClass.indexOf(" "+sClass0) != -1) return; obj.setAttribute("class", sClass + " "+sClass0); }
}

if (!(typeof toggleClass == 'function')) {
 toggleClass = function (obj, sClass0) {
 if (!obj) return; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; if (sClass.indexOf(" "+sClass0) != -1)
 removeClass(obj, sClass0); else
 addClass(obj, sClass0); }
}

if (!(typeof DoNavBar == 'function')) {
 DoNavBar = function (url) {
 PTNavBar.Toggle(url); }
}

function getThemePortal() {
 var re = /portal:([\w]+)/; var tPortal = re.exec(getCookie("ps_theme")); if (tPortal != null && tPortal.length > 1)
 return tPortal[1]; else
 return "";}

var PTNavBar = {
 const_keyCode : { ARRLEFT : 37,ARRUP : 38,ARRRIGHT : 39,ARRDN : 40,ENTER : 13,
 ARROPEN : ("ltr" == "ltr") ? 39 : 37,ARRCLOSE : ("ltr" == "ltr") ? 37 : 39,
 ARRPREV: ("ltr" == "ltr") ? 37 : 39,ARRNEXT: ("ltr" == "ltr") ? 39 : 37,
 ESC : 27,TAB : 9, END : 35, HOME : 36
 }, 
 Url: "",
 CurTileEl: null,
 OpenState: "",
 StartPersState: "",
 IsOpen: false,
 IsLoaded: false,
 IframeDoc: null,
 IsSFF: false,
 IsAccessible: false,
 Delay: 1000,
 bDirty: false,
 unmruCref: "false", 
 hasMRU : false, 
 nMaxMRU : 100, 
 ptBaseURI : "",
 CurPortal : "",
 backMenuClicked: false,
 backMenuEl: "",
 lastMenuSectionFocus: "", 
 Load: function() {
 var psNBMask = document.createElement("div"); psNBMask.id = "psNavBarMask"; psNBMask.setAttribute('onclick', 'javascript:DoNavBar();'); var navBarEl = document.createElement("div"); navBarEl.id = "psNavBar"; navBarEl.setAttribute("class", "psNavBar PTNavBarModal"); var nBifel = document.createElement("iframe"); nBifel.id = "psNavBarIFrame"; nBifel.name = "psNavBarIFrame"; nBifel.onload = PTNavBar.FirstLoad; nBifel.title = "NavBar"; nBifel.frameBorder = "0"; nBifel.setAttribute("onmousewheel", "");  PTNavBar.CurPortal = getThemePortal(); if (typeof(sessionStorage) != "undefined") {
 var CachedUrl = sessionStorage.getItem("NavBarUrl_" + PTNavBar.CurPortal); if (CachedUrl != null)
 PTNavBar.Url = CachedUrl; }

 if (typeof(bFMode) == "undefined")
 bFMode = false; nBifel.src = encodeURI(PTNavBar.Url); navBarEl.appendChild(nBifel); var el = document.querySelector('body'); el.appendChild(psNBMask); el.appendChild(navBarEl); var sScript = "processing_empty"; if (eval ("typeof " + sScript + " !== 'function'")) {
 if (document.forms.length > 0)
 sScript = "processing_" + document.forms[0].name; if (bFMode == false) {
 if (typeof ptLoadingStatus_empty === 'function')
 sScript = "ptLoadingStatus_empty"; else {
 var tcFrame = "window.frames['TargetContent']"; if (typeof(window.frames['TargetContent']) !== 'undefined')
 if (window.frames['TargetContent'].document.forms.length > 0)
 sScript = tcFrame + ".processing_" + eval(tcFrame + ".document.forms[0].name"); }
 }
 }
 if (eval ("typeof " + sScript + " === 'function'")) {
 eval(sScript + "(1,1000);"); var rcTimeOutId = setInterval( function() {
 if (PTNavBar.IsLoaded == true) {
 eval(sScript + "(0,1000);"); clearInterval(rcTimeOutId); }
 }, 100); }
 PTNavBar.bDirty = false; PTNavBar.ptBaseURI = getptBaseURI(); },
 Refresh: function() {
 var el = document.querySelector('.PTNavBarModal'); if (el != null) {
 var elIF = el.querySelector('#psNavBarIFrame'); elIF.src = PTNavBar.IframeDoc.document.location.href; if (PTNavBar.IframeDoc.document.getElementById("PTNB$PTNUI_NB_MRU"))
 PTNavBar.hasMRU = true;  }
 PTNavBar.bDirty = false; },
 FirstLoad: function() {
 var el = document.querySelector('.PTNavBarModal'); removeClass(el, PTNavBar.OpenState); if (PTNavBar.IsOpen)
 addClass(el, PTNavBar.OpenState); PTNavBar.Delay = 0; var nbFrame = window.frames['psNavBarIFrame']; if (typeof nbFrame != 'undefined') {
 PTNavBar.IframeDoc = nbFrame; nbFrame.PTNavBar.SetHeaderLabel(''); }
 if (nbFrame.document.getElementById("PTNB$PTNUI_NB_MRU")) {
 PTNavBar.hasMRU = true;  PTNavBar.synchHNAVMRU(); }

 try {
 if (typeof(sessionStorage) != "undefined")
 sessionStorage.setItem("NavBarUrl_" + PTNavBar.CurPortal, nbFrame.location.href); } catch(ex) {
 }
 },
 Toggle: function(navBarUrl) {
 if (typeof(navBarUrl) != 'undefined') {
 PTNavBar.Url = navBarUrl; }

 var el = document.querySelector('.PTNavBarModal'); if (el == null) {
 this.Load(); el = document.querySelector('.PTNavBarModal'); }else if (PTNavBar.bDirty) {
 PTNavBar.Refresh(); }else {
 
 PTNavBar.synchHNAVMRU(); }
 this.IsOpen = !this.IsOpen; this.IsSFF = (document.querySelector('html').getAttribute('class') != null && document.querySelector('html').getAttribute('class').indexOf('psc_form-small') >= 0); this.IsAccessible = (getCookieValue('ps_theme').indexOf('accessibility:A') != -1); if (this.OpenState == '') {
 if (this.CurTileEl == null || this.IsSFF)
 this.OpenState = 'slidein'; else {
 this.OpenState = 'slidein_full'; }
 }

 var elBody = document.querySelector('body'); var nbMask = document.querySelector('#psNavBarMask'); var nbIF = document.querySelector('#psNavBarIFrame'); var nbIFBody = nbIF.contentWindow ? nbIF.contentWindow.document.querySelector('body') : nbIF.contentDocument.document.querySelector('body'); var elmod = document.getElementById('pt_modals'); if (this.IsOpen) {
 nbMask.style.cssText = "display:block"; elBody.style.cssText = "position: fixed; width: 100%; height: 100%; overflow: hidden; -webkit-backface-visibility: hidden; -webkit-transform: translateZ(0);"; if (this.IsAccessible) {
 elBody.style.cssText = elBody.style.cssText + " visibility: hidden;"; if (elmod) elmod.style.cssText = elmod.style.cssText + " visibility: visible;"; if (typeof hidePtWrapper == "function") hidePtWrapper(); addClass(nbMask, 'acs_mode'); addClass(el, 'acs_mode'); }
 this.SetFocus(); nbIF.tabIndex = 0; elBody.tabIndex = -1; nbIFBody.style.cssText = "display: block;"; }
 else {
 nbMask.style.cssText = "display:none"; elBody.style.cssText = ""; if (this.IsAccessible) {
 if (elmod) elmod.style.removeProperty ("visibility"); if (typeof unhidePtWrapper == "function") unhidePtWrapper(); removeClass(nbMask, 'acs_mode'); removeClass(el, 'acs_mode'); }
 nbIF.tabIndex = -1; elBody.tabIndex = -1; nbIFBody.style.cssText = "display: none;"; this.SetBlur(); }

 if (this.Delay == 0)
 toggleClass(el, this.OpenState); if (this.IframeDoc != null) {
 PTNavBar.ToggleAriaShowHide(); }

 
 if (this.IframeDoc != null && this.IsOpen) {
 if (this.OpenState == 'slidein')
 this.IframeDoc.PTNavBar.SelectTile(this.IframeDoc.PTNavBar.CurTileEl); else
 if (this.OpenState == 'slidein_full')
 this.IframeDoc.PTNavBar.SetContentFocus(); }

 
 if (typeof(doCloseLocalModals) == 'function') {
 doCloseLocalModals(); if (this.IsSFF && this.IsAccessible && this.IsOpen) {
 if (typeof hidePtWrapper == "function") hidePtWrapper(); }
 if (this.IframeDoc != null && typeof(this.IframeDoc.doCloseLocalModals) == 'function')
 this.IframeDoc.doCloseLocalModals(); }
 },

 ClearNBMenuStorage:function(){
 
 Object.keys(sessionStorage).map(function(c,i,a){
 
 if (c.indexOf("psNavBar")!= -1)
 sessionStorage.removeItem(c); }); },

 SetInitialSectionFocus: function(){
 
 var sectionMenu = document.querySelector("ul.ps_box-scrollarea.ps_box-menucontainer li.ps_box-menuitem:first-child div.nui-menu-section a"); if (sectionMenu) {
 sectionMenu.setAttribute("tabindex", "0");  PTNavBar.lastMenuSectionFocus = sectionMenu.id;  sectionMenu.focus(); }
 },

 SetInitialBreadCrumb:function(parentId, parentLabel, bcURL){
 
 PTNavBar.SetInitialSectionFocus();  if (typeof(sessionStorage) == "undefined") 
 return; var bcLink = "<li role='presentation' class='nui-menu-bc'>"; bcLink += "<a id='" + "bc0_" + parentId + "' href='javascript:PTNavBar.OpenInContentArea(%27"; bcLink += bcURL + "%27,%27" + parentId + "%27)'"; bcLink += " onclick='PTNavBar.UpdateBreadCrumb(event)'"; bcLink += " aria-label='Main Menu'"; bcLink += " role='menuitem'>"; bcLink += parentLabel; bcLink += "</a></li>"; sessionStorage.setItem("psNavBar_BC", bcLink); },
 
 SetBreadcrumb: function(event){
 
 if ((typeof(sessionStorage) == "undefined") || (typeof(event) == "undefined"))
 return; var bc_sessionItem = sessionStorage.getItem("psNavBar_BC"); var bcArray = bc_sessionItem.split("|"); var num = bcArray.length > 0 ? (bcArray.length) : 0; var parentId = event.target.getAttribute("ptfid"); if (parentId)
 parentId = parentId.replace("fldra_", "bc" + num + "_"); else 
 parentId = "bc_MENUITEM";  var liItem = "<li role='presentation' class='nui-menu-bc'>"; liItem += "<a id='" + parentId + "' role='menuitem' href='" + event.target.href +"'"; liItem += " onclick='PTNavBar.UpdateBreadCrumb(event)'"; liItem += ">"; liItem += event.target.textContent; liItem += "</a></li>"; if (bc_sessionItem)
 bc_sessionItem = bc_sessionItem + "|" + liItem; else
 bc_sessionItem = liItem;  sessionStorage.setItem("psNavBar_BC", bc_sessionItem);  },
 
 UpdateBreadCrumb: function(event){
 
 if (typeof(sessionStorage) == "undefined") 
 return; var bc_sessionItem = sessionStorage.getItem("psNavBar_BC"); var bcArray = bc_sessionItem.split("|"); if (!bc_sessionItem)
 return; var itemArr = event.target.id.split("_"); var itemId = itemArr[0]; itemId = itemId.replace("bc", ""); var newBCList=""; bcArray = bcArray.slice(0, parseInt(itemId)+1); for (var i=0; i<bcArray.length; i++) {
 if (i>0)
 newBCList += "|"; newBCList += bcArray[i]; }
 sessionStorage.setItem("psNavBar_BC", newBCList);  },
 
 ShowBreadCrumb: function(){
 
 if (typeof(sessionStorage) == "undefined") 
 return; var bcContainer = document.querySelector(".nui-menu-bc"); if (bcContainer){
 var htmlDoc = document.getElementsByTagName("html"); var bcItem = sessionStorage.getItem("psNavBar_BC"); var bcArray = bcItem.split("|"); bcItem = ""; for (var i=0; i<bcArray.length-1; i++){
 bcItem += bcArray[i]; }
 
 if (bcItem){
 bcContainer.innerHTML = bcItem; }
 }
 },

 SetNBContainerTabIndex : function(tindex) {
 
 var divObj = document.querySelector("div.ps_box-group.psc_layout.nbcontarea"); if (divObj)
 divObj.setAttribute("tabindex", tindex); },


 OpenInContentArea: function(url, cacheId) {
 var cacheHTML = null; var prevFldr = null; var backMenuPrevEl = PTNavBar.backMenuEl; if (typeof(cacheId) == "string" && typeof(sessionStorage) != "undefined") {
 var tCacheId = "psNavBarCont_" + top.PTNavBar.CurPortal + "_" + cacheId + "_" + top.document.documentElement.lang; cacheHTML = sessionStorage.getItem(tCacheId); }
 var nbContEl = document.querySelector('.nbcontarea'); if (cacheHTML == null) {
 LaunchURL(null, url,3,'bGrouplet@1;','NB_CONTENT_TGT'); } else {
 if (url.indexOf("PTNUI_MENU_COMP") > -1){
 if (PTNavBar.backMenuClicked == true || document.activeElement.id == "PTNUI_MENU_BACKBTN") {
 prevFldr = sessionStorage.getItem("psNavBar_lastFolder"); }
 PTNavBarNavigator.SetLastNavFolder(cacheId); }
 nbContEl.innerHTML = cacheHTML;  PTNavBar.ShowBreadCrumb();  if ((PTNavBar.backMenuClicked == false) && (cacheId == "PORTAL_ROOT_OBJECT")) 
 PTNavBar.SetInitialSectionFocus();  if (PTNavBar.backMenuClicked == true) 
 PTNavBar.backMenuClicked = false;  if (prevFldr != null) {
 var pos = prevFldr.indexOf(":");  if (pos != -1) prevFldr = prevFldr.substring(pos + 1); var listItems = document.querySelectorAll('.lplistitem.fldr a'); var listFldr=null; for (var i = 0; i < listItems.length; i++) {
 listFldr= listItems[i].getAttribute("ptfid"); if (pos != -1) { 
 pos = listFldr.indexOf("_PTUN");  listFldr = listFldr.substring(0, pos); }
 if (listFldr == "fldra_" + prevFldr) {
 if (i >= 0) { 
 
 listItems[0].removeAttribute('sfocus');  listItems[0].setAttribute("tabindex","-1");  listItems[i].setAttribute("sfocus",""); listItems[i].setAttribute("tabindex","0"); }
 break; }
 }
 }

 
 PTNavBar.SetContentFocus(); }
 if (top.PTNavBar.IsAccessible) {
 var t2 = setTimeout(function() {
 PTNavBar.backMenuEl = document.querySelector(".ptnui_menu_back a"); if (!backMenuPrevEl && PTNavBar.backMenuEl != null)
 PTNavBar.SetAnnounceText("The back to parent and back to root buttons are available to use."); if (backMenuPrevEl != null && PTNavBar.backMenuEl == null)
 PTNavBar.SetAnnounceText("The back to parent and back to root buttons are no longer available."); clearTimeout(t2);},1000);  }
 },
 OpenInWindow: function(url, crefID, crefLabel) {
 if ((typeof crefID != "undefined")){
 PTNavBar.saveMRU(crefID, crefLabel, url);  }
 LaunchURL(null, url, 4); },
 saveMRU: function (crefID, crefLabel, url,FromTile) {
 
 top.PTNavBar.ptBaseURI = getptBaseURI(); var ajaxUrl = top.PTNavBar.ptBaseURI + "s/WEBLIB_PT_NAV.ISCRIPT1.FieldFormula.IScript_PT_NAV_MRU_Update"; var isUnav = "false";  var sVal = "", s = ptUtil.id("PTNUI_NB_WRK_PTNUI_SSID"); if (s) { 
 if (!/ptnbsid/.test(s.value))
 sVal = "&ptnbsid=" + s.value; else
 sVal = "&" + s.value;  } else {
 
 s = top.window.document.getElementById("ICSCRIPTSID"); if (s && s.tagName.toUpperCase() === "SPAN") {
 if (!/ptnbsid/.test(s.textContent))
 sVal = "&ptnbsid=" + s.textContent ; else 
 sVal = "&" + s.textContent;  }
 } 

 if (top.PTNavBar.unmruCref == "false"){
 if((String(url).indexOf("cmd=uninav&Rnode=") != -1) || (String(url).indexOf("?tab=REMOTEUNIFIEDDASHBOARD") != -1 )){
 
 
 var isUnav = "true"; var Unavcref = "DUMMY_PTUN"; var Unavcreflbl = "DUMMY OBJECT";  if (top.PTNavBar.ptBaseURI != "" && String(top.PTNavBar.ptBaseURI).indexOf("/psc/") != -1) 
 {
 ajaxUrl = getptBaseURI()+ "s/WEBLIB_PT_NAV.ISCRIPT1.FieldFormula.IScript_PT_NAV_MRU_Update"; }
 
 
 
 var url1 = decodeURIComponent(url);  var PtunStr = url1.substring(url1.indexOf("{PTUN_")); PtunStr = PtunStr.substring(1,PtunStr.indexOf(","));  var pairs = url1.split("}."); if(pairs.length > 0)
 {
 
 var pair = pairs[pairs.length-1]; Unavcreflbl = String(pair).substring(0,pair.indexOf("{"));    Unavcreflbl = Unavcreflbl.replace("\\'", "'"); Unavcref = String(pair).substring(pair.indexOf("{")+1,pair.indexOf("}")); Unavcref = Unavcref + "_" +PtunStr; }
 
 top.PTNavBar.unmruCref = Unavcref + "$$$" + Unavcreflbl;  top.PTNavBar.unmruCrefhref = url; crefID = top.PTNavBar.unmruCref;  }

 if (typeof FromTile != "undefined" && FromTile == "True"){
 var isTile = "true";  if (top.PTNavBar.ptBaseURI != "" && String(top.PTNavBar.ptBaseURI).indexOf("/psc/") != -1) 
 {
 ajaxUrl = getptBaseURI()+ "s/WEBLIB_PT_NAV.ISCRIPT1.FieldFormula.IScript_PT_NAV_MRU_Update"; }
 
 top.PTNavBar.unmruCref = crefID + "$$$" + crefLabel;  top.PTNavBar.unmruCrefhref = url; crefID = top.PTNavBar.unmruCref;  } 
 } 

 var params = "mrulist=" + encodeURIComponent(crefID) + "&mruAction=ptmruinst&maxMRU="+ top.PTNavBar.nMaxMRU + sVal; if (isUnav == "true" || isTile == "true") 
 params = params + "&unmruCref=" + encodeURIComponent(top.PTNavBar.unmruCref) + "&unmruCrefhref=" + encodeURIComponent(top.PTNavBar.unmruCrefhref);  if (isTile == "true") 
 params = params + "&FromTile=true";  if (typeof crefLabel != "undefined") 
 {
 var urlArray = PTNavBar.URLToArray(url); params = params + "&unfromNavBar=true&unmruCref=" + crefLabel + "&" + PTNavBar.ArrayToURL(urlArray); }
 
 var mruLoader = new net2.ContentLoader(ajaxUrl,null,null,"post",function(){},
 null,params,"application/x-www-form-urlencoded",1,0,null,false); mruLoader = null; },

 URLToArray: function (url) {
 var request = {}; var arr = [];  var pairs =url.split('&'); for (var i = 0; i < pairs.length; i++) {
 var pair = []; if (i === 0 )
 {
 pair[0] = "unnavbarUrl"; pair[1] = pairs[0]; } 
 else
 pair = pairs[i].split('=');  if(PTNavBar.endsWith(decodeURIComponent(pair[0]), '[]') ) {
 var arrName = decodeURIComponent(pair[0]).substring(0, decodeURIComponent(pair[0]).length - 2); if(!(arrName in arr)) {
 arr.push(arrName); arr[arrName] = []; }

 arr[arrName].push(decodeURIComponent(pair[1])); request[arrName] = arr[arrName]; } else {
 request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]); }
 }
 return request; },

 endsWith: function (str, suffix) {
 return str.indexOf(suffix, str.length - suffix.length) !== -1; },

 ArrayToURL: function (array) {
 var pairs = []; for (var key in array)
 if (array.hasOwnProperty(key))
 pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(array[key])); return pairs.join('&');},
 synchHNAVMRU: function() { 
 if (!PTNavBar.hasMRU)
 return;   if ((typeof top.pthNav != "undefined") && top.pthNav.mruRoot && !top.pthNav.mru.dbSaved && top.pthNav.mruRoot.childNodes.length > 0) { 
 top.pthNav.mru.save();  } 
 },
 
 SetContentAreaCache: function(cacheId) {
 try {
 if (typeof(sessionStorage) == "object") {
 cacheId = "psNavBarCont_" + top.PTNavBar.CurPortal + "_" + cacheId + "_" + top.document.documentElement.lang; var nbContEl = document.querySelector('.nbcontarea'); sessionStorage.setItem(cacheId, nbContEl.innerHTML); }
 } catch(ex) {
 }
 },
 SetHeaderLabel: function(lbl) {
 var nbHdrLabelEl = document.querySelector('.nbhdr .nbhdr_lbl > span'); if (nbHdrLabelEl) {
 var nbHdrLabel = nbHdrLabelEl.innerHTML; var needle = ": "; var lblArr = nbHdrLabel.split(needle); if (lbl == "")
 nbHdrLabel = lblArr[0]; else
 nbHdrLabel = lblArr[0] + needle + lbl; nbHdrLabelEl.innerHTML = nbHdrLabel; if (nbHdrLabel == lblArr[0]) {
 if (top.PTNavBar.IsAccessible && top.PTNavBar.OpenState == 'slidein') {
 addClass(nbHdrLabelEl, 'psc_hidden-readable'); } else {
 removeClass(nbHdrLabelEl, 'psc_hidden-readable'); }
 } else {
 removeClass(nbHdrLabelEl, 'psc_hidden-readable'); }
 }
 },
 SelectTile: function(el) {
 if (PTNavBar.CurTileEl != null) {
 toggleClass(PTNavBar.CurTileEl, 'sel'); PTNavBar.CurTileEl.removeAttribute("aria-current"); PTNavBar.CurTileEl.setAttribute("aria-expanded", "false");  PTNavBar.CurTileEl.removeAttribute("aria-controls"); PTNavBar.CurTileEl.removeAttribute("aria-haspopup"); if (PTNavBar.CurTileEl != el)
 
 PTNavBar.CurTileEl.setAttribute("tabindex", "-1"); } else {
 
 if (el != null) {
 var nbtiles = el.parentNode.parentNode.children; for (var i = 0; i < nbtiles.length; i++) {
 if (nbtiles[i].lastElementChild.tabIndex == "0") {
 nbtiles[i].lastElementChild.removeAttribute("aria-current"); nbtiles[i].lastElementChild.setAttribute("tabindex", "-1"); break; }
 }
 }
 }

 window.top.PTNavBar.IframeDoc = window.self; if (PTNavBar.CurTileEl == el || el == null) {
 PTNavBar.CurTileEl = null; PTNavBar.HideContentArea(); PTNavBar.SetHeaderLabel(''); if (el != null)
 el.focus();  } else {
 var label = el.querySelector('.ps_groupleth .ps-label'); if (label) {
 PTNavBar.SetHeaderLabel(label.innerHTML); }
 this.CurTileEl = el; toggleClass(PTNavBar.CurTileEl, 'sel'); PTNavBar.CurTileEl.setAttribute("aria-current", "true"); PTNavBar.CurTileEl.setAttribute("aria-expanded", "true"); PTNavBar.CurTileEl.setAttribute("aria-haspopup", "true"); PTNavBar.CurTileEl.setAttribute("tabindex", "0"); var nbContEl = document.querySelector(".nbcontarea"); if (nbContEl != null) {
 PTNavBar.CurTileEl.setAttribute("aria-controls", nbContEl.id);  }; if (top.PTNavBar.IsAccessible ) {
 var curTileLabel = PTNavBar.CurTileEl.querySelector('.ps_groupleth > .ps-label').innerHTML; var nbRegionEl = document.querySelector('.nbcacont'); if (nbRegionEl && curTileLabel) nbRegionEl.setAttribute("aria-label", curTileLabel); var setTabNoData = function() {
 nbContEl = document.getElementById('PT_NAV_WRK_GROUPBOX2lbl'); if ((PTNavBar.CurTileEl.id == "PTNB$PTNUI_NB_MRU" || PTNavBar.CurTileEl.id == "PTNB$PTNUI_NB_FAV") && document.querySelectorAll('.nbcacont .lplistgrid').length == 0) {
 PTNavBar.CurTileEl.removeAttribute("aria-haspopup");  }
 }; var t1 = setTimeout(function() {setTabNoData();clearTimeout(t1);},1000); }; PTNavBar.ShowContentArea(); }; },
 ShowContentArea: function() {
 if (top.PTNavBar.OpenState != 'slidein_full') {
 var el = top.document.querySelector('.PTNavBarModal'); if (window.top != window.self) {
 window.top.PTNavBar.OpenState = 'slidein_full'; PTNavBar.OpenState = 'slidein_full'; var hdr_el = document.querySelector('.ptnavbar'); removeClass(hdr_el, 'nbmin'); var nbcont_el = document.querySelector('.nbcacont'); removeClass(nbcont_el, 'psc_hidden');  PTNavBar.SetContentFocus(); PTNavBar.ToggleAriaShowHide(); }; replaceClass(el, 'slidein', this.OpenState); }
 else
 PTNavBar.SetContentFocus(); },
 HideContentArea: function() {
 if (top.PTNavBar.OpenState != 'slidein_full') {
 
 return; }; if (window.top != window.self) {
 window.top.PTNavBar.OpenState = 'slidein'; PTNavBar.OpenState = 'slidein'; var hdr_el = document.querySelector('.ptnavbar'); addClass(hdr_el, 'nbmin'); var nbcont_el = document.querySelector('.nbcacont'); addClass(nbcont_el, 'psc_hidden');  PTNavBar.ToggleAriaShowHide(); }; var el = top.document.querySelector('.PTNavBarModal'); replaceClass(el, 'slidein_full', this.OpenState); },
 StartPersonalization: function() {
 PTNavBar.ShowContentArea(); window.top.PTNavBar.StartPersState = PTNavBar.OpenState; setPSTouchHandlerDraggbles(); var elperstiles = document.querySelectorAll('.nbpers .nbtile-row');  if (elperstiles && elperstiles.length !== 0) {
 for (var i = 0; i < elperstiles.length; i++) {
 elperstiles[i].setAttribute("aria-labelledby", "PTNUI_DOCK_REC_TITLE$" + i); }
 } 
 },
 StopPersonalization: function() {
 if (window.top.PTNavBar.StartPersState == 'slidein')
 PTNavBar.HideContentArea(); window.top.PTNavBar.StartPersState = ''; window.top.PTNavBar.IsLoaded = true; },
 InitDefaultTile: function() {
 var hdr_el = document.querySelector('.ptnavbar'); if (window.top.PTNavBar.OpenState == 'slidein_full')
 removeClass(hdr_el, 'nbmin'); else
 addClass(hdr_el, 'nbmin'); this.HideContentArea(); var listItems = document.querySelectorAll('.nuinb'); listItems[0].tabIndex = 0; for (var i = 1; i < listItems.length; i++) {
 listItems[i].tabIndex = -1; }
 },
 SetBlur: function() {
 var el; if (this.IsSFF)
 el = top.document.getElementById("PT_ACTION_MENU$PIMG"); else
 el = top.document.querySelector('#PT_NAVBAR');  if (el == null)
 el = top.document.querySelector('#pthdr2navbar'); if (el != null)
 el.focus(); },
 SetFocus: function() {
 var fInterval = setInterval(function() {
 try {
 var fEl = window.frames['psNavBarIFrame'].document.querySelector('#PTNUI_NB_HDRWRK_PTNUI_NB_ACTION'); if (!fEl)
 {
 
 fEl = PTNavBar.IframeDoc.document.querySelector('#PTNUI_NB_HDRWRK_PTNUI_ACTION_LINK2'); if (!fEl || fEl && fEl.parentElement.parentElement.offsetParent == null)
 {
 var objs = window.frames['psNavBarIFrame'].document.querySelectorAll('[tabindex="0"]'); for (var i = 0, j = 0; i < objs.length; i++, j++) 
 {
 if (objs[i].offsetParent == null) continue; fEl = objs[i]; if (j > 0)
 break; }
 }
 }
 if (fEl) 
 {
 clearInterval(fInterval); fEl.focus(); }
 } 
 catch(e) {}; }, 200); },
 kbHandler: function(e) {
 var kbSetFocus = function(el, e) {
 if (el) {
 el.focus(); e.preventDefault(); e.stopPropagation(); }
 }; var e = window.event || e;  var fEl = document.activeElement; if (typeof fEl == "undefined" || fEl == null) return; var nbContEl = document.querySelector(".nbcacont"); if (nbContEl == null) return; var fElClass = fEl.getAttribute("class"); if (typeof fElClass == "undefined" || fElClass == null) return; var isTile = (fElClass.indexOf("nuinb") > -1); var isTilePers = (fElClass.indexOf("nbtile-row") > -1 && window.top.PTNavBar.StartPersState != null); var inCont = (nbContEl.compareDocumentPosition(fEl) & Node.DOCUMENT_POSITION_CONTAINED_BY); var isListItem = false; var isFolder = false; var isMenuSection = false;  var menuRowEl; if (inCont > 0) {
 menuRowEl = fEl.parentElement.parentElement; isListItem = ((menuRowEl.getAttribute("class").indexOf("lplistitem") > -1) && (menuRowEl.getAttribute("class").indexOf("nb-menu-link") > -1))?true:false;  isFolder = ((menuRowEl.getAttribute("class").indexOf("fldr") > -1) || (menuRowEl.getAttribute("class").indexOf("categorylist") > -1));  isMenuSection = ((fEl.tagName.toUpperCase() == "A") && (menuRowEl.className.indexOf("nui-menu-section") > -1))? true: false;  }

 switch (e.keyCode) {
 case PTNavBar.const_keyCode.TAB: 
 var winName = ((typeof document.forms != "undefined") && (document.forms.length > 0)) ? document.forms[0].name : "win1"; if (e.target.id == "ICLastAnchor_" + winName) {
 var elGear = document.getElementById("PTNUI_NB_HDRWRK_PTNUI_NB_ACTION"); var elClose = document.getElementById("PTNUI_NB_HDRWRK_PTNUI_ACTION_LINK2"); var elCancel = null; if (nbContEl.getAttribute("class").indexOf("addtilecontainer") > -1)
 elCancel = document.getElementById("PTUN_GSRC_N_WRK_CANCEL_BTN");  else
 elCancel = document.getElementById("PTNUI_NB_HDRWRK_PTNUI_BACK_BTN");  if (elGear && elGear.offsetParent != null)
 kbSetFocus(elGear,e);  else if (elClose && elClose.offsetParent != null)
 kbSetFocus(elClose,e);  else if (elCancel && elCancel.offsetParent != null)
 kbSetFocus(elCancel, e); else {
 var firstElem = document.getElementById("PTNUI_DOCK_REC$0_row_0"); if ((typeof firstElem != "undefined") && (firstElem!= null) && (firstElem.childNodes.length >= 3))
 kbSetFocus(firstElem.childNodes[2],e);  }
 }
 else if (e.shiftKey && (e.target.id == "ICFirstAnchor_" + winName)) {
 if (top.PTNavBar.OpenState == 'slidein_full') {
 if (window.top.PTNavBar.StartPersState == "") {
 var elnbcont = document.querySelector('.nbcontarea .nui-myfav-gb li a[tabindex="0"]'); if (elnbcont) {
 kbSetFocus(elnbcont,e);  break; }
 }
 else {
 var elperstiles = document.querySelectorAll('.nbpers .nbtile-row');  if (elperstiles && elperstiles.length !== 0) {
 var elpers = elperstiles[elperstiles.length - 1]; var eltiledelbtn = elpers.parentElement.querySelector('.nbtile-del-btn > .psc_image_only:not(.psc_hidden) a'); if (eltiledelbtn)
 kbSetFocus(eltiledelbtn,e); else 
 kbSetFocus(elpers,e); break;  } 
 else {
 var eladdthdr = document.querySelector('.addtilesrchcontainer .ptnui_menu_hdr');  if (eladdthdr && hasClass(eladdthdr, "psc_hidden"))
 var eladdt = document.querySelector('.nbcacont .lplistgrid li:first-child .lplistitem.categorylist a');  else 
 var eladdt = document.querySelector('.nbcacont .lplistgrid li:first-child .lplistitem:not(.categorylist) a'); if (eladdt) kbSetFocus(eladdt,e);  break;  }
 }
 } 
 var elnbcurr = document.querySelector('.nbtilegrid .nuinb[tabindex="0"]');  if (elnbcurr) kbSetFocus(elnbcurr,e);  }
 break; case PTNavBar.const_keyCode.ENTER: 
 if (isMenuSection){
 var prevFocus = document.getElementById(PTNavBar.lastMenuSectionFocus); if (prevFocus)
 prevFocus.setAttribute("tabindex", "-1"); fEl.setAttribute("tabindex", "0"); PTNavBar.lastMenuSectionFocus = fEl.id; }
 break; case PTNavBar.const_keyCode.ESC: 
 if (isFolder || isListItem) {
 
 var bcList = document.querySelector("ul.ps_box-group.ps_box-menucontainer.pt_keynav-list.nui-menu-bc"); if (bcList && (bcList.childNodes.length > 0) ){
 var bcItem = bcList.querySelector("li:last-child a"); if (bcItem) {
 PTNavBar.backMenuClicked = true;  bcItem.click(); break; }
 }
 }
 if (typeof bPTDrag != "undefined" && bPTDrag)
 bPTDrag = false; else {
 top.PTNavBar.Toggle(); PTNavBar.SetBlur(); }
 e.preventDefault(); break; case PTNavBar.const_keyCode.END: 
 var nextEl = null; if (isListItem) {
 var nextRowEl = fEl.parentElement.parentElement.parentElement.parentElement.querySelector("li:last-child"); if (nextRowEl) {
 nextEl = nextRowEl.querySelector(".lplistitem a"); }
 }
 if (isTile) {
 nextEl = document.querySelector(".nbtilegrid .ps_grid-body>li:last-child .nuinb"); }
 if (nextEl) {
 nextEl.focus(); e.preventDefault(); e.stopPropagation(); }
 break; case PTNavBar.const_keyCode.HOME:
 var nextEl = null; if (isListItem) {
 var nextRowEl = fEl.parentElement.parentElement.parentElement.parentElement.querySelector("li:first-child"); if (nextRowEl) {
 nextEl = nextRowEl.querySelector(".lplistitem a"); }
 }
 if (isTile) {
 nextEl = document.querySelector(".nbtilegrid .ps_grid-body>li:first-child .nuinb"); }
 kbSetFocus(nextEl,e); break; case PTNavBar.const_keyCode.ARRPREV: 
 
 var bcList = document.querySelector("ul.ps_box-group.ps_box-menucontainer.pt_keynav-list.nui-menu-bc"); if (bcList && (bcList.childNodes.length > 0) ){
 var bcItem = bcList.querySelector("li:last-child a"); if (bcItem) {
 PTNavBar.backMenuClicked = true;  bcItem.click(); }
 }else if (document.querySelector("div.nui-menu-section")){
 
 var sectionID = fEl.getAttribute("ptsectionid"); if (sectionID) {
 var sectionGrp = document.getElementById(sectionID); if (sectionGrp) {
 fEl.setAttribute("tabindex", "-1"); PTNavBar.lastMenuSectionFocus = "PTNUI_MENU_DV_PTNUI_MENU_GRP$0";  var firstSection = document.getElementById(PTNavBar.lastMenuSectionFocus); if (firstSection) 
 firstSection.setAttribute("tabindex", "0");  sectionGrp.focus(); }
 } 
 } 
 break; case PTNavBar.const_keyCode.ARRUP: 
 var nextEl = null; var nextRowEl = null;  if (isTile) {
 var nextRowEl = fEl.parentElement.previousElementSibling; if (nextRowEl) {
 nextEl = nextRowEl.querySelector(".nuinb"); }
 } else if (isTilePers) {
 nextRowEl = fEl.parentElement.previousElementSibling; if (nextRowEl) {
 nextEl = nextRowEl.querySelector(".nbtile-row"); }
 } else if (isListItem) {
 nextRowEl = menuRowEl.parentElement.previousElementSibling; if (!nextRowEl) 
 nextRowEl = menuRowEl.parentElement.parentElement.lastElementChild;  if (nextRowEl)
 nextEl = nextRowEl.querySelector(".lplistitem a");  }else if (isMenuSection){
 nextRowEl = menuRowEl.parentElement.previousElementSibling; if (nextRowEl)
 nextEl = nextRowEl.querySelector("div.nui-menu-section a"); else {
 
 nextRowEl = menuRowEl.parentElement.parentElement.lastElementChild; if (nextRowEl)
 nextEl = nextRowEl.querySelector("div.nui-menu-section a"); }
 
 }
 kbSetFocus(nextEl,e); break; case PTNavBar.const_keyCode.ARROPEN: 
 if (isFolder) fEl.click(); else {
 if (isMenuSection){
 var sectionMenus = menuRowEl.nextElementSibling.querySelector("ul.ps_grid-body.ps_box-menucontainer li.ps_box-menuitem:first-child a");  if (sectionMenus){ 
 sectionMenus.focus(); }
 }
 }
 break; case PTNavBar.const_keyCode.ARRDN: 
 var nextEl = null; var nextRowEl = null; if (isTile) {
 var nextRowEl = fEl.parentElement.nextElementSibling; if (nextRowEl) {
 nextEl = nextRowEl.querySelector(".nuinb"); }
 } else if (isTilePers) {
 nextRowEl = fEl.parentElement.nextElementSibling; if (nextRowEl) {
 nextEl = nextRowEl.querySelector(".nbtile-row"); }
 } else if (isListItem) {
 nextRowEl = menuRowEl.parentElement.nextElementSibling; if (!nextRowEl) {
 
 nextRowEl = menuRowEl.parentElement.parentElement.firstElementChild; }
 if (nextRowEl) 
 nextEl = nextRowEl.querySelector(".lplistitem a");  } else if (isMenuSection){
 nextRowEl = menuRowEl.parentElement.nextElementSibling; if (nextRowEl)
 nextEl = nextRowEl.querySelector("div.nui-menu-section a"); else {
 
 nextRowEl = menuRowEl.parentElement.parentElement.firstElementChild; if (nextRowEl)
 nextEl = nextRowEl.querySelector("div.nui-menu-section a"); }
 
 }
 kbSetFocus(nextEl,e); break; default:
 break; }
 },

 SetContentFocus : function() {
 var currURL = null; if(typeof window != 'undefined' && window && typeof window.location != 'undefined' && window.location) 
 currURL = window.location.href; if(typeof currURL != 'undefined' && currURL && currURL.indexOf("ptreqfrom=rc") != -1)
 return; var tDelay = 0; if (PTNavBar.CurTileEl && PTNavBar.CurTileEl.id == "PTNB$PTNUI_NB_FAV")
 tDelay = 500; PTNavBar.SetAnnounceText(""); var t = setTimeout(function() {
 var fEl = document.querySelector("a[sfocus]"); if (fEl) {
 fEl.focus(); if (PTNavBar.CurTileEl && PTNavBar.CurTileEl.id == "PTNB$PTNUI_NB_FAV")
 PTNavBar.SetAnnounceText("You can select the Edit Favorites button to access the Edit Favorites page"); }
 clearTimeout(t);},tDelay); },
 ToggleAriaShowHide : function() {
 var showhide = !top.PTNavBar.IsOpen; var nbshowhide = showhide; if (top.PTNavBar.IsSFF && top.PTNavBar.IsAccessible)
 nbshowhide = !(top.PTNavBar.IsOpen && top.PTNavBar.OpenState == 'slidein'); var nbtiles = top.PTNavBar.IframeDoc.document.querySelectorAll(".nbtilegrid .nuinb"); for (var i = 0; i < nbtiles.length; i++) {
 nbtiles[i].setAttribute("aria-hidden", nbshowhide); }; var persEl = top.PTNavBar.IframeDoc.document.querySelector('#PTNUI_NB_HDRWRK_PTNUI_NB_ACTION'); if (persEl)
 persEl.setAttribute("aria-hidden", showhide);  var closeEl = top.PTNavBar.IframeDoc.document.querySelector('#PTNUI_NB_HDRWRK_PTNUI_ACTION_LINK2'); if (closeEl)
 closeEl.setAttribute("aria-hidden", showhide); },
 SetAnnounceText : function(str) {
 var ariaLiveEl = document.querySelector(".ps_box-announce.ps_alert-normal"); if (ariaLiveEl) {
 var originalStr = unescape(str); var t = document.createTextNode(originalStr); if (!t) return; while (ariaLiveEl.firstChild) {
 ariaLiveEl.removeChild(ariaLiveEl.firstChild); }
 ariaLiveEl.appendChild(t); }
 },
 SetPersTileFocus: function(row) {
 if (!row) row=0; var el=document.querySelectorAll('.nbpers .nbtile-row')[row]; if (!el || (el && hasClass(el.parentElement, 'nuihidden')))
 el=document.querySelectorAll('.nbpers .nbtilegrid li:not(.nuihidden) > .nbtile-row')[0]; if (el) el.focus(); }
};var PTNavBarNavigator = {
 SetLastNavFolder : function(fldr) {
 try {
 if (typeof(sessionStorage) == "object") {
 sessionStorage.setItem("psNavBar_lastFolder", fldr); }
 } catch(ex) {
 }
 }
};
var PT_DND = {
 holdDelay: 500,
 t: null,
 setDrag: function (elem, isDrag) {
 elem.setAttribute("draggable", isDrag ? "true" : "false"); },
 startHold: function (elem) {
 
 PT_DND.t = setTimeout(function () { PT_DND.setDrag(elem, true); addClass(elem, "ps-drag-start"); }, PT_DND.holdDelay); },
 endHold: function (elem) {
 PT_DND.setDrag(elem, false);  removeClass(elem, "ps-drag-start"); clearTimeout(PT_DND.t); }
};function SetDNDGestures() {
var sAreaRows = document.querySelectorAll(".ps_box-scrollarea-row");for (var i = 0; i < sAreaRows.length; i++){
 sAreaRows[i].setAttribute("gestures", "true"); }
}

function PT_TouchDND(doc) {
 var touchStarted = false, 
 dndStarted = false,
 swipeThreshold = 80,
 tapThreshold = 150,
 dndThreshold = 400,
 tapnholdThreshold = 1000,
 startTime = 0, endTime = 0; precision = 60 / 2, 
 tapNum = 0,
 tapStarted = false,
 currX = 0, currY = 0, cachedX = 0, cachedY = 0, dndTimer = 0, tapTimer = 0,
 ptdragTimer = null, dPercision = Math.round(screen.height / 10), ptdragTimer2 = null; sendEvent = function (elem, eventName, originalEvent, data) {
 var customEvent = doc.createEvent('Event'); data = data || {}; data.x = currX; data.y = currY; data.distance = data.distance; customEvent.originalEvent = originalEvent; customEvent.initEvent(eventName, true, true); elem.dispatchEvent(customEvent); },

 this.doTouchStart = function (e) {
 var target = getEventTarget(e); var o = getHTMLObject(target, "draggable"); var oGesture = getHTMLObject(target, "gestures"); if (target.tagName == "INPUT" || target.tagName == "A" || target.tagName == "BUTTON" 
 || target.tagName == "SELECT" || target.tagName == "TEXTAREA" || (!o && !oGesture))
 return true; if (target.tagName == "IMG") 
 e.preventDefault();  cachedX = currX = e.targetTouches[0].pageX; cachedY = currY = e.targetTouches[0].pageY; startTime = +new Date(); touchStarted = true; tapNum++;  clearTimeout(dndTimer); dndStarted = false; dndTimer = setTimeout(function () {
 if (cachedX >= currX - precision &&
 cachedX <= currX + precision &&
 cachedY >= currY - precision &&
 cachedY <= currY + precision) {
 if (!touchStarted) {
 if (tapNum > 1)
 sendEvent(e.target, 'doubletap', e); if ((endTime - startTime) < dndThreshold ) {
 sendEvent(e.target, 'tap', e); }
 }
 else {
 dndStarted = true; if (o) {
 var oPos = GetObjPos(o); var layer = getLayerXY(e, o, oGesture); o.setAttribute("offsetX", oPos.x + layer.x); o.setAttribute("offsetY", oPos.y + layer.y); o.style.zIndex = 100; addClass(o, "ps-drag-start"); }
 }
 }
 tapNum = 0; }, dndThreshold); },

 this.doTouchMove = function (e) {
 var target = getEventTarget(e); var o = getHTMLObject(target, "draggable"); var offsetHeight = 0
 var oGesture = getHTMLObject(target, "gestures"); if (target.tagName == "INPUT" || target.tagName == "A" || target.tagName == "BUTTON" 
 || target.tagName == "SELECT" || target.tagName == "TEXTAREA" || (!o && !oGesture)) 
 return true; currX = e.targetTouches[0].pageX; currY = e.targetTouches[0].pageY; if (Math.abs(currX - cachedX) > Math.abs(currY - cachedY))
 e.preventDefault();  if (dndStarted && o) {
 e.preventDefault(); orgX = e.targetTouches[0].pageX;  orgY = e.targetTouches[0].pageY;  if ((oGesture = getHTMLObject(e.target, "gestures")) == null)
 return false; if (ptdragTimer == null &&
 (currY >= oGesture.clientHeight - Math.round(oGesture.clientHeight / 10) ||
 (currY <= (document.body.clientHeight - oGesture.clientHeight)))) {
 ptdragTimer = setTimeout(function () {
 if (orgX >= currX - dPercision &&
 orgX <= currX + dPercision &&
 orgY >= currY - dPercision &&
 orgY <= currY + dPercision) {
 if (currY >= oGesture.clientHeight - Math.round(oGesture.clientHeight / 10)) {
 clearTimeout(ptdragTimer); ptdragTimer = null; oGesture.scrollTop = oGesture.scrollTop + Math.round(oGesture.clientHeight / 10); oGesture.scrollTop = oGesture.scrollTop > oGesture.scrollHeight ? oGesture.scrollHeight : oGesture.scrollTop; } 
 else if (currY <= (document.body.clientHeight - Math.round(oGesture.clientHeight / 10))) { 
 clearTimeout(ptdragTimer); ptdragTimer = null; oGesture.scrollTop = oGesture.scrollTop - Math.round(oGesture.clientHeight / 10); }
 }
 }, 100); }
 var curX = e.targetTouches[0].pageX - parseInt(o.getAttribute("offsetX")); var curY = e.targetTouches[0].pageY - parseInt(o.getAttribute("offsetY")) + oGesture.scrollTop;  o.style.top = curY + 'px'; o.style.left = curX + 'px'; o.style.right = (-1 * curX) + 'px'; o.style.bottom = (-1 * curY) + 'px'; o.style.zIndex = 100; replaceClass(o, "ps-drag-start", "ps-drag"); }
 },

 this.doTouchEnd = function (e) {
 var target = getEventTarget(e); var oGesture = getHTMLObject(target, "gestures"); var o = getHTMLObject(target, "draggable"); if (target.tagName == "INPUT" || target.tagName == "A" || target.tagName == "BUTTON" 
 || target.tagName == "SELECT" || target.tagName == "TEXTAREA" || (!o && !oGesture))
 return true; var formname; endTime = +new Date(); deltaY = cachedY - currY,
 deltaX = cachedX - currX; if (deltaX < precision && deltaY < precision) {
 if ((endTime - startTime) >= tapnholdThreshold) {
 clearTimeout(dndTimer); sendEvent(e.target, 'tapandhold', e); }
 }
 touchStarted = false; clearTimeout(ptdragTimer); ptdragTimer = null; if (dndStarted) {
 dndStarted = false; if (o) {
 removeClass(o, "ps-drag"); o.style.zIndex = -1; if (e.preventDefault) e.preventDefault();  srcValue = o.id; var dndSrc = document.getElementById("ICDNDSrc"); var ndiv = srcValue.indexOf("div"); if (ndiv != -1) {
 formname = srcValue.substring(0, ndiv); srcValue = srcValue.substring(ndiv + 3); }
 dndSrc.value = srcValue; try {
 var targetElem = document.elementFromPoint(e.changedTouches[0].pageX, e.changedTouches[0].pageY); while (targetElem.getAttribute("droppable") != "true") {
 targetElem = targetElem.parentElement; }
 }
 catch (event) {
 targetElem = o; }
 var aField = targetElem.id.substring(targetElem.id.indexOf("div") + 3); var sEvent = "submitAction_" + formname + "(" + formname + " ,'" + aField + "')"; eval(sEvent); }
 }
 else {
 var eventsArr = []; if (deltaX <= -swipeThreshold)
 eventsArr.push('swipeleft'); if (deltaX >= swipeThreshold)
 eventsArr.push('swiperight'); if (deltaY <= -swipeThreshold)
 eventsArr.push('swipedown'); if (deltaY >= swipeThreshold)
 eventsArr.push('swipeup'); if (eventsArr.length) {
 for (var i = 0; i < eventsArr.length; i++) {
 var eventName = eventsArr[i]; sendEvent(e.target, eventName, e, {
 distance: {
 x: Math.abs(deltaX),
 y: Math.abs(deltaY)
 }
 }); }
 }
 }

 return false; },

 this.doTouchCancel = function (e) {
 touchStarted = false; dndStarted = false; clearTimeout(ptdragTimer); ptdragTimer = null; }
};function doSwipeDown(e) {}
function doSwipeUp(e) {}
function doSwipeLeft(e) {
 var obj = e.target; while (obj != document.body && obj.onclick == null && obj.getAttribute("href") == null) {
 if (obj.tagName == "LABEL") {
 obj = document.getElementById(obj.getAttribute("for")); if (['radio', 'checkbox'].indexOf(obj.getAttribute('type')) != -1) {
 obj.checked = !obj.checked; if (obj.onclick != null)
 obj.onclick(); if (obj.parentElement.onclick != null)
 obj.parentElement.onclick(); }
 else
 obj.focus(); return false; }
 obj = obj.parentElement; }
 if (['radio', 'checkbox'].indexOf(obj.getAttribute('type')) != -1)
 obj.checked = !obj.checked;}

function doSwipeRight(e) {
 var obj = e.target; while (obj != document.body && obj.onclick == null && obj.getAttribute("href") == null) {
 if (obj.tagName == "LABEL") {
 obj = document.getElementById(obj.getAttribute("for")); if (['radio', 'checkbox'].indexOf(obj.getAttribute('type')) != -1) {
 obj.checked = !obj.checked; if (obj.onclick != null)
 obj.onclick(); if (obj.parentElement.onclick != null)
 obj.parentElement.onclick(); }
 else
 obj.focus(); return false; }
 obj = obj.parentElement; }
 if (['radio', 'checkbox'].indexOf(obj.getAttribute('type')) != -1)
 obj.checked = !obj.checked;}

function doTap(e) {
 var obj = e.target; while (obj != document.body && obj.onclick == null && obj.getAttribute("href") == null) {
 if (obj.tagName == "LABEL") {
 obj = document.getElementById(obj.getAttribute("for")); if (['radio', 'checkbox'].indexOf(obj.getAttribute('type')) != -1) {
 obj.checked = !obj.checked; if (obj.onclick != null) 
 obj.onclick(); if (obj.parentElement.onclick != null)
 obj.parentElement.onclick(); }
 else
 obj.focus(); return false; }
 obj = obj.parentElement; }
 if (['radio', 'checkbox'].indexOf(obj.getAttribute('type')) != -1)
 obj.checked = !obj.checked; if (obj != 'undefined' && obj != null && obj.onclick != null)
 obj.onclick(); if (obj && obj.getAttribute("href") != null)
 eval(obj.getAttribute("href")); return false;}
function doTapAndHold(e) { 
 ptConsole2.active();  return false; }

function doDoubleTap(e) { }
function isTouchDisbled() {
 var dnd_els = document.querySelectorAll('[draggable=true]'); if (dnd_els.length == 0) {
 var swipe_el = top.document.getElementsByClassName("nuiswipe"); if (swipe_el.length == 0) return true; }
 return false;}

 var touchDND = new PT_TouchDND(document);function setPSTouchHandler(obj) {
 if (typeof obj == "undefined" || !obj) return; obj.ontouchstart = touchDND.doTouchStart; obj.ontouchmove = touchDND.doTouchMove; obj.ontouchend = touchDND.doTouchEnd; obj.ontouchcancel = touchDND.doTouchCancel; obj.addEventListener("tap", doTap, false);  obj.addEventListener("swipedown", doSwipeDown, false); obj.addEventListener("swipeup", doSwipeUp, false); obj.addEventListener("swipeleft", doSwipeRight, false); obj.addEventListener("swiperight", doSwipeLeft, false); }

function setPSTouchHandlerDoc() {
 if (!isTouchDisbled() && (typeof window.setTouchEventHandler == 'undefined' || window.setTouchEventHandler == null)) {
 window.setTouchEventHandler = function () { 
 setPSTouchHandler(document); }
 setTouchEventHandler(); }
}

function setPSTouchHandlerDraggbles() {
 if (window.top != window && (isIPhone() || isIPad())) {
 var dnd_els = document.querySelectorAll('[draggable=true]'); for (var i = 0; i < dnd_els.length; ++i) {
 setPSTouchHandler(dnd_els[i]); }
 }
}
function doDragStart(e) {
 if ((obj = getHTMLObject(e.target, "draggable")) == null)
 return false; e.dataTransfer.effectAllowed = 'copy';  e.dataTransfer.setData('Text', obj.id);  addClass(obj, "ps-drag-start"); ptdragTimer = null; dPercision = Math.round(screen.height / 10); ptdragTimer2 = null; cloneElem = null;}

function doDragOver(e) {
 if (e.preventDefault) e.preventDefault();  if ((obj = getHTMLObject(e.target, "draggable")) == null)
 return false; if (typeof srcArray != 'undefined' && srcArray.length > 0) {
 var dValue = e.dataTransfer.getData('Text'); if (isValidSource(srcArray, dValue))
 e.dataTransfer.dropEffect = 'copy'; }
 else
 e.dataTransfer.dropEffect = 'copy';   ffPageX=e.clientX||e.pageX;  ffPageY=e.clientY||e.pageY;  return false;}

function doDragEnter(e) {
 enterX = e.pageX; enterY = e.pageY; if ((obj = getHTMLObject(e.target, "draggable")) == null)
 return false; var el = document.querySelector('.ps-drag-over'); if (el != null)
 removeClass(el, 'ps-drag-over'); rrz = {}; rrz.minX = e.x - e.offsetX; rrz.minY = e.y - e.offsetY; rrz.maxX = rrz.minX + obj.offsetWidth; rrz.maxY = rrz.minY + obj.offsetHeight; addClass(obj, "ps-drag-over"); e.stopPropagation(); e.preventDefault(); return false;}

function doDragLeave(e) {
 if ((obj = getHTMLObject(e.target, "draggable")) == null)
 return false; clearTimeout(ptdragTimer2); ptdragTimer2 = null; if (e.x < rrz.minX || e.x > rrz.maxX || e.y < rrz.minY || e.y > rrz.maxY)
 removeClass(obj, "ps-drag-over"); e.stopPropagation(); e.preventDefault(); return false;}

function doDrag(e) {
 if ((obj = getHTMLObject(e.target, "draggable")) == null)
 return; var currX = e.pageX || ffPageX; var currY = e.pageY || ffPageY; orgX = currX; orgY = currY; if ((oGesture = getHTMLObject(e.target, "gestures")) == null)
 return; if (ptdragTimer == null &&
 ((currY >= oGesture.clientHeight - Math.round(oGesture.clientHeight / 10)) ||
 (currY <= (document.body.clientHeight - oGesture.clientHeight)))) {
 ptdragTimer = setTimeout(function () {
 if (orgX >= currX - dPercision &&
 orgX <= currX + dPercision &&
 orgY >= currY - dPercision &&
 orgY <= currY + dPercision) { 
 if (currY >= oGesture.clientHeight - Math.round(oGesture.clientHeight / 10)) {
 
 clearTimeout(ptdragTimer); ptdragTimer = null; oGesture.scrollTop = oGesture.scrollTop + Math.round(oGesture.clientHeight / 10); }
 else if (currY <= (document.body.clientHeight - oGesture.clientHeight)) {
 
 clearTimeout(ptdragTimer); ptdragTimer = null; oGesture.scrollTop = oGesture.scrollTop - Math.round(oGesture.clientHeight / 10); }
 }
 }, 100); }
 
 replaceClass(obj, "ps-drag-start", "ps-drag");}

function doDragEnd(e) {
 clearTimeout(ptdragTimer); ptdragTimer = null; clearTimeout(ptdragTimer2); ptdragTimer2 = null; if ((obj = getHTMLObject(e.target, "draggable")) == null)
 return false; removeClass(obj, "ps-drag");}

function doDrop(e) {
 var formname; if ((obj = getHTMLObject(e.target, "droppable")) == null)
 return false; if (e.preventDefault) e.preventDefault();  var dndSrc = document.getElementById("ICDNDSrc"); var dValue = e.dataTransfer.getData('Text'); if (typeof srcArray != 'undefined' && srcArray.length > 0 && !isValidSource(srcArray, dValue))
 return false; var ndiv = dValue.indexOf("div"); if (ndiv != -1) {
 formname = dValue.substring(0, ndiv); dValue = dValue.substring(ndiv + 3); }
 dndSrc.value = dValue; var dndFocus = document.getElementById("ICFocus"); dndFocus.value = obj.id; var aField = obj.id.substring(obj.id.indexOf("div") + 3); var sEvent = "submitAction_" + formname + "(" + formname + " ,'" + aField + "')"; eval(sEvent); return false;}

if (typeof window.setMouseEventHandler == 'undefined' || window.setMouseEventHandler == null) {
 window.setMouseEventHandler = function () {
 document.ondragstart = doDragStart; document.ondragenter = doDragEnter; document.ondragover = doDragOver; document.ondragleave = doDragLeave; document.ondrag = doDrag; document.ondragend = doDragEnd; document.ondrop = doDrop; }
}


 

function DragStartHandler(e, obj){
 e.dataTransfer.effectAllowed = 'copy';  e.dataTransfer.setData('Text', e.target.id);  addClass(obj, "ps-drag-start");} 

function DragOverHandler(e,obj, srcArray){
 if (e.preventDefault) e.preventDefault();  if (typeof srcArray != 'undefined' && srcArray.length > 0){
 var dValue = e.dataTransfer.getData('Text'); if (isValidSource(srcArray, dValue))
 e.dataTransfer.dropEffect = 'copy'; }
 else
 e.dataTransfer.dropEffect = 'copy'; return false;} 

function DragEnterHandler(e, obj){
 var el = document.querySelector('.ps-drag-over'); if (el != null)
 removeClass(el, 'ps-drag-over'); rrz = {}; rrz.minX = e.x - e.offsetX; rrz.minY = e.y - e.offsetY; rrz.maxX = rrz.minX + e.target.offsetWidth; rrz.maxY = rrz.minY + e.target.offsetHeight; addClass(obj, "ps-drag-over"); e.stopPropagation(); e.preventDefault(); return false;}

function DragLeaveHandler(e, obj){
 if (e.x < rrz.minX || e.x > rrz.maxX || e.y < rrz.minY || e.y > rrz.maxY)
 removeClass(obj, "ps-drag-over"); e.stopPropagation(); e.preventDefault(); return false;} 

function DragHandler(e, obj){
 replaceClass(obj, "ps-drag-start", "ps-drag");} 

function DragEndHandler(e, obj){
 removeClass(obj, "ps-drag");} 

function DropHandler(e,obj, srcArry){
 var formname; if (e.preventDefault) e.preventDefault();  var dndSrc = document.getElementById("ICDNDSrc"); var dValue = e.dataTransfer.getData('Text'); if (typeof srcArray != 'undefined' && srcArray.length > 0 && !isValidSource(srcArray, dValue))
 return false; var ndiv = dValue.indexOf("div"); if (ndiv != -1){
 formname = dValue.substring(0, ndiv); dValue = dValue.substring(ndiv+3); }
 dndSrc.value = dValue; var aField = obj.id.substring(obj.id.indexOf("div")+3); var sEvent = "submitAction_" + formname + "(" + formname + " ,'" + aField + "')"; eval(sEvent); return false;}

function isValidSource(srcArray, eId) {
 for(var i = 0; i < srcArray.length; i++)
 {
 if (srcArray[i].indexOf(eId))
 return true; }
 return false;}

function GetObjPos(obj){
var x = 0;var y = 0; var w = obj.offsetWidth;var h = obj.offsetHeight;if (obj.offsetParent) {
 x = obj.offsetLeft
 y = obj.offsetTop
 while (obj = obj.offsetParent){
 x += obj.offsetLeft; y += obj.offsetTop; }
}

return {x:x, y:y, w:w, h:h};} 

function TouchStartHandler(e, obj){ 

var o = e.target;while (o.getAttribute("draggable") != "true")
 o = o.parentElement;var oPos = GetObjPos(o);o.setAttribute("offsetX", oPos.x + e.layerX);o.setAttribute("offsetY", oPos.y + e.layerY);addClass(obj, "ps-drag-start");}

function TouchMoveHandler(e, obj, srcArray){
 var o = e.targetTouches[0].target; while (o.getAttribute("draggable") != "true")
 o = o.parentElement;  e.preventDefault(); var curX = e.targetTouches[0].pageX - parseInt(o.getAttribute("offsetX")); var curY = e.targetTouches[0].pageY - parseInt(o.getAttribute("offsetY")); o.style.position = "absolute"; o.style.top = curY + 'px'; o.style.left = curX + 'px';  replaceClass(obj, "ps-drag-start", "ps-drag");} 

function TouchEndHandler(e, obj, srcArray){
 var formname; removeClass(obj, "ps-drag"); if (e.preventDefault) e.preventDefault();  srcValue = obj.id; var dndSrc = document.getElementById("ICDNDSrc"); if (typeof srcArray != 'undefined' && srcArray.length > 0 && !isValidSource(srcArray, srcValue))
 return false;   var ndiv = srcValue.indexOf("div")
 if (ndiv != -1){
 formname = srcValue.substring(0, ndiv); srcValue = srcValue.substring(ndiv+3); }

 dndSrc.value = srcValue;  targetElem = document.elementFromPoint(e.changedTouches[0].pageX,e.changedTouches[0].pageY);  while (targetElem.getAttribute("draggable") != "true"){
 targetElem = targetElem.parentElement;  }
 var aField = targetElem.id.substring(obj.id.indexOf("div")+3); var sEvent = "submitAction_" + formname + "(" + formname + " ,'" + aField + "')"; eval(sEvent); return false;}


function TouchCancelHandler(e, obj, srcArray){
}

function StartDragAccessible(id) {
 var dropTargets = document.querySelectorAll('[' + 'draggable' + ']'); if (dropTargets.length) { 
 var el = document.getElementById(id); el = getHTMLObject(el, "draggable"); var srcValue = el.id; var dndSrc = document.getElementById("ICDNDSrc"); var ndiv = srcValue.indexOf("div"); if (ndiv != -1) {
 formname = el.id.substring(0, ndiv); srcValue = el.id.substring(ndiv + 3); }
 dndSrc.value = srcValue;  var dropTarget = document.querySelector(".ps-drag-start"); if (dropTarget != null) 
 {
 removeClass(dropTarget, "ps-drag-start"); dropTarget.removeAttribute("aria-grabbed"); dropTarget.setAttribute("aria-describedby", "pt_dnd_" + formname); }
 el.removeAttribute('aria-describedby'); el.setAttribute('aria-grabbed', 'true'); addClass(el, "ps-drag-start"); for (var i = 0; i < dropTargets.length; i++) {
 if (el != dropTargets[i]) {
 removeClass(dropTargets[i], "ps-drag-start"); }
 }

 
 var str = 'Object grabbed %1.'; str = str.replace("%1", el.textContent); var string = str + ' ' + 'Continue tabbing to find desired target object. Escape to cancel the grab.'; var liveRegion = document.getElementById('pt_liveregion'); if (liveRegion)
 liveRegion.innerHTML = ''; psAnnounceText(string); var elDND = document.getElementById('pt_dnd_' + formname); string = str + ' ' + 'Continue tabbing to find desired target object. Press Ctrl+Alt+M to drop grabbed object here.  Escape to cancel the grab.'; elDND.innerHTML = string; return true; }
 return false;}

function EndDragAccessible(id) {
 var dropTargets = document.querySelectorAll('[' + 'draggable' + ']'); if (dropTargets.length) {
 var el = document.getElementById(id); el = getHTMLObject(el, "draggable"); var dndSrc = document.getElementById("ICDNDSrc"); var ndiv = el.id.indexOf("div"); if (ndiv != -1)
 formname = el.id.substring(0, ndiv); var dndFocus = document.getElementById("ICFocus"); dndFocus.value = el.id; el.removeAttribute("aria-grabbed"); var aField = el.id.substring(el.id.indexOf("div") + 3); var sEvent = "submitAction_" + formname + "(" + formname + " ,'" + aField + "')"; eval(sEvent); var dndSrcEl = document.getElementById(formname + 'div' + dndSrc.value); if (dndSrcEl)
 {
 var str = 'Object %1 has been moved.'; str = str.replace("%1", dndSrcEl.textContent); }
 
 var liveRegion = document.getElementById('pt_liveregion'); if (liveRegion)
 liveRegion.innerHTML = ''; psAnnounceText(str); dndSrc.value = ""; dndSrcEl = document.querySelector(".ps-drag-start"); if (dndSrcEl)
 removeClass(dndSrcEl, "ps-drag-start"); }
}

function CancelDragAccessible() {
 var dropTarget = document.querySelector(".ps-drag-start"); removeClass(dropTarget, "ps-drag-start"); if (dropTarget != null)
 {
 dropTarget.removeAttribute("aria-grabbed"); var ndiv = dropTarget.id.indexOf("div"); if (ndiv != -1)
 formname = dropTarget.id.substring(0, ndiv); dropTarget.setAttribute("aria-describedby", "pt_dnd_" + formname); }
 document.getElementById("ICDNDSrc").value = ""; gFocusObj = null;  var liveRegion = document.getElementById('pt_liveregion');  if (liveRegion)
 liveRegion.innerHTML = ''; psAnnounceText('Drag and drop operation cancelled.'); var elDND = document.getElementById('pt_dnd_' + formname); elDND.innerHTML = 'Press Control+M to start dragging object';}










var ptTileUtil = {
 init : false,
 isSFF : false,
 tileWSize : 250,
 tileHSize: 197,
 tilePadd: 42, 
 HCONST: 1, 
 WCONST: 0, 
 
 W_SZ : 1,
 H_SZ : 2,
 WH_SZ: 3,

 
 maxLogicalSize: 9, 

 initialize : function(){
 this.isSFF = (document.querySelector('html').getAttribute('class').indexOf('psc_form-small') >= 0) ? true: false; this.tileWSize = parseInt(getComputedStyle(document.body).getPropertyValue("--pt-tile-width")); this.tileHSize = parseInt(getComputedStyle(document.body).getPropertyValue("--pt-tile-height")); this.tilePadd = this.deriveTilePadd(); this.init = true; },
 
 
 deriveTilePadd : function(){
 return parseInt(getComputedStyle(document.body).getPropertyValue("--pt-tile-spacing"))*2;  },

 roundUpWSize : function (Wcurr){
 var pgEl = document.querySelector('#PT_CONTENT'); var minWDisp = ((this.tileWSize * 2) + (this.tilePadd * (2-1))); var maxW = Math.min(Wcurr, Math.max(pgEl.clientWidth, minWDisp)); var i=1; var currW = 0
 while (((currW=((this.tileWSize * i) + (this.tilePadd * (i-1)))) < maxW) && (i<this.maxLogicalSize)) 
 i++;  if (currW >= maxW) {
 if (currW > Math.max(pgEl.clientWidth, minWDisp))
 return (i-1); else
 return i; }
 return i; },

 
 roundUpHSize : function(Hcurr){
 var pgEl = document.querySelector('#PT_CONTENT'); var maxH = Math.min(Hcurr, pgEl.clientHeight); var i=1; var currH = 0; while (((currH=((this.tileHSize * i) + (this.tilePadd * (i-1)))) < maxH) && (i<this.maxLogicalSize)) 
 i++;  if (currH >= maxH) {
 if (currH > pgEl.clientHeight)
 return i-1; else
 return i; } 
 return i; },

 getCurMaxHeight : function(curHeight) {
 var pgEl = document.querySelector('#PT_CONTENT');  maxLogicalHeight = Math.floor(pgEl.clientHeight / (this.tileHSize + this.tilePadd)); if(maxLogicalHeight == 0)maxLogicalHeight = 1;  return Math.min(curHeight, maxLogicalHeight); },

 getCurMaxWidth : function(curWidth) {
 var pgEl = document.querySelector('#PT_CONTENT');  maxLogicalWidth = Math.floor(pgEl.clientWidth / (this.tileWSize + this.tilePadd)); if(maxLogicalWidth == 0)maxLogicalWidth = 1; return Math.min(curWidth, maxLogicalWidth); },

 getNHeight : function(tileHeight) {
 var nH = (this.tileHSize * tileHeight) + (this.tilePadd * (tileHeight - 1)); var extraHeight = 22; return nH - this.tilePadd - extraHeight; },

 getNWidth : function(tileWidth) {
 var nW = (this.tileWSize * tileWidth) + (this.tilePadd * (tileWidth - 1)); var extraWidth = 2; return nW - this.tilePadd - extraWidth; },

 autoSizeMe : function(obj, w, h){
 if (!this.init) 
 this.initialize(); if (typeof w != "undefined") {
 var newW = this.roundUpWSize(w); newW = (newW == 1) ? newW : Math.max(newW, 2); if (newW)
 obj.className = obj.className.replace(/rsz_w\d/g,"rsz_w" + newW); }
 if (typeof h != "undefined") {
 var newH = Math.max(this.roundUpHSize(h), 1);  if (newH)
 obj.className = obj.className.replace(/rsz_h\d/g,"rsz_h" + newH);  } 
 },

 getParentTileDiv : function(obj){
 
 var myParentTile = obj.parentNode; while (myParentTile && ((myParentTile.tagName != "DIV") || (myParentTile.className.indexOf("nuitile") == -1)))
 myParentTile = myParentTile.parentNode; if ((myParentTile.tagName == "DIV") && (myParentTile.className.indexOf("nuitile") != -1))
 return myParentTile; return null; },

 getAppsContentSizes: function (obj, bFrame, flag) {
 
 var idx = 0; var hwSize = [[], []]; var fDoc = obj; try {
 if (!bFrame) {
 if (flag & this.H_SZ) hwSize[this.HCONST][idx] = obj.scrollHeight; if (flag & this.W_SZ) hwSize[this.WCONST][idx] = obj.scrollWidth; } else {
 fDoc = (obj.contentWindow && obj.contentWindow.document) ? obj.contentWindow.document.body : obj.contentDocument.documentElement; if (flag & this.H_SZ) hwSize[this.HCONST][idx] = fDoc.scrollHeight; if (flag & this.W_SZ) hwSize[this.WCONST][idx] = fDoc.scrollWidth; if (obj.contentDocument.documentElement) {
 idx++; if (flag & this.H_SZ) hwSize[this.HCONST][idx] = obj.contentDocument.documentElement.scrollHeight; if (flag & this.W_SZ) hwSize[this.WCONST][idx] = obj.contentDocument.documentElement.scrollWidth; }
 }
 } catch (ex) {
 if (flag & this.H_SZ) hwSize[this.HCONST][idx] = 0; if (flag & this.W_SZ) hwSize[this.WCONST][idx] = 0; throw ex;  } 
 
 var psAppsContent = fDoc.querySelectorAll(".ps_apps_content");  if (psAppsContent != null) {
 for (var i = 0; i < psAppsContent.length; i++) {
 idx++; if (flag & this.H_SZ) hwSize[this.HCONST][idx] = psAppsContent[i].scrollHeight; if (flag & this.W_SZ) {
 var maxScrollLeft = psAppsContent[i].scrollWidth - psAppsContent[i].clientWidth; hwSize[this.WCONST][idx] = psAppsContent[i].scrollWidth + maxScrollLeft; }
 }
 }
 
 
 psAppsContent = fDoc.getElementsByClassName("ps_box-grid ps_scrollable"); if (psAppsContent != null) {
 for (var i = 0; i < psAppsContent.length; i++) {
 idx++; if (flag & this.H_SZ) hwSize[this.HCONST][idx] = psAppsContent[i].scrollHeight; if (flag & this.W_SZ) hwSize[this.WCONST][idx] = psAppsContent[i].scrollWidth;  }
 }

 var psAppsTab = fDoc.querySelectorAll(".ps_tabs"); if (psAppsTab != null) {
 for (var i = 0; i < psAppsTab.length; i++) {
 idx++; if (flag & this.H_SZ) hwSize[this.HCONST][idx] = psAppsTab[i].scrollHeight; if (flag & this.W_SZ) hwSize[this.WCONST][idx] = psAppsTab[i].scrollWidth; }
 }
 var maxh, maxW = 0; var maxContArr = []; if (flag & this.H_SZ) {
 maxh = Math.max.apply(Math, hwSize[this.HCONST]); maxContArr[this.HCONST] = maxh; }
 if (flag & this.W_SZ) {
 maxw = Math.max.apply(Math, hwSize[this.WCONST]); maxContArr[this.WCONST] = maxw; }
 return maxContArr; }
};if ((typeof szCrefID !== "undefined") && ((szCrefID == "PT_LANDINGPAGE_GBL") || (szCrefID == "PT_FLDASHBOARD"))) {
 
 addEventListener("message", ptRcvDocSize, false); }

function autoResizeDiv(obj) {
 
 if (obj.getElementsByTagName("iframe").length > 0)
 return; var getH = function(event) {
 objContArr = ptTileUtil.getAppsContentSizes(obj, false, ptTileUtil.H_SZ);  autoResizeThis(obj, objContArr[ptTileUtil.WCONST], objContArr[ptTileUtil.HCONST], obj.id); }; var objContArr = ptTileUtil.getAppsContentSizes(obj, false, ptTileUtil.W_SZ);  var myContainer = autoResizeThis(obj, objContArr[ptTileUtil.WCONST], objContArr[ptTileUtil.HCONST], obj.id); setTimeout(getH, 300);  if(!myContainer)
 {
 return; }
 if (myContainer.offsetHeight < objContArr[ptTileUtil.HCONST] || myContainer.offsetWidth < objContArr[ptTileUtil.WCONST])
 obj.style.overflow = "auto"; else
 obj.style.overflow = "hidden";}

function autoResizeThis(obj, w, h, oid){
 var myParentTile = obj.parentNode; while (myParentTile && ((myParentTile.tagName != "DIV") || (myParentTile.className.indexOf("nuitile") == -1)))
 myParentTile = myParentTile.parentNode; if (myParentTile && (myParentTile.tagName == "DIV") && (myParentTile.className.indexOf("nuitile") != -1)) {
 ptTileUtil.autoSizeMe(myParentTile, w, h);  }
 if (myParentTile && (!myParentTile.getAttribute("data-autosize")))
 myParentTile.setAttribute("data-autosize", obj.parentNode.id);  if (typeof SetGridSize == "function") 
 SetGridSize(null, false); return myParentTile;}

function autoResizeFrame(obj) {
 
 var getH = function(szmode) {
 try {
 var objContArr = ptTileUtil.getAppsContentSizes(obj, true, szmode); autoResizeThis(obj, objContArr[ptTileUtil.WCONST], objContArr[ptTileUtil.HCONST], obj.parentNode.id); }catch (e1){
 if (szmode == ptTileUtil.W_SZ)
 return;    var tw = null; var th = null; if (obj && obj.parentNode) {
 tw = obj.parentNode.getAttribute("data-tW");  th = obj.parentNode.getAttribute("data-tH");  }
 if ((tw != null) && (th != null)) {
 if (!ptTileUtil.init) 
 ptTileUtil.initialize(); var wpx = ((ptTileUtil.tileWSize * tw) + (ptTileUtil.tilePadd * (tw-1))); var hpx = ((ptTileUtil.tileHSize * th) + (ptTileUtil.tilePadd * (th-1))); autoResizeThis(obj, wpx, hpx, obj.parentNode.id); } 
 }
 }; setTimeout(function(){getH(ptTileUtil.H_SZ);}, 300); getH(ptTileUtil.W_SZ);}


function ptRcvDocSize(event)
{
 
 
 try {
 if (event.source.frameElement && event.source.frameElement.parentNode) {
 if (event.source.frameElement.parentNode.getAttribute("data-bAutoSize") == null) 
 return;  if (event.data && /^w:[0-9]+,h:[0-9]+$/.test(event.data)) {
 var w = event.data.match(/w:[0-9]+/).toString(); var h = event.data.match(/h:[0-9]+/).toString(); autoResizeThis(event.source.frameElement, w.substring(2), h.substring(2), event.source.frameElement.parentNode.id);  }
 }
 }catch(e){}
}




PTRTEFillcache = function (URI,UrlID,UrlRepository,EditorField,DisplayOnly)
{
 var EditorString =""; var psSiteName=""; var DatafromXML=""; var EditorId = EditorField; var temp=""; var newdiv = document.createElement('div'); var divIdName = 'PTRTE_'+EditorId; var dblocation=UrlRepository.split("record://"); var EditorStringObj = document.getElementById(EditorField);  if ((typeof(EditorStringObj) != 'undefined') && (EditorStringObj != null)) {
 if (DisplayOnly == 1)
 EditorString = EditorStringObj.innerHTML; else
 EditorString = EditorStringObj.value; }

 newdiv.setAttribute('id',divIdName); newdiv.setAttribute('style','none'); newdiv.innerHTML = EditorString; var images = newdiv.getElementsByTagName('img' ); var imgStr=""; var URLocTemp=URI.split("/"); var URLoc=""; var ImageSource = ""; var imageNew = ""; var img = "";  if (URI.substring(0,4).toLowerCase() != "http") {
 URI=window.location.href; URLocTemp=URI.split("/"); }

 
 if (dblocation[1])
 {
 for ( var ii = 0 ; ii < (URLocTemp.length-1) ; ii++ )
 {
 if (ii != (URLocTemp.length-2) && ii != 3)
 {
 URLoc=URLoc+URLocTemp[ii]+"/"; }
 if(ii==3)
 {
 URLoc=URLoc+"psc"+"/"; }
 if(ii==4)
 {
 psSiteName = URLocTemp[ii]
 
 
 var tSite = psSiteName.split("_"); psSiteName = tSite[0]; }
 }
 for ( var i = 0 ; i < images.length ; i++ )
 {
 var img = images[i]; if(img.src.startsWith("data:image"))
 {
  
  continue; }

 if(images[i].id.includes("###"))
 {
  
  var tempname = images[i].id;  }
 else 
 {
 
 if(images[i].src.includes("###"))
 { 
 var tempname= images[i].src;  }
 }

 if(tempname)
 {
 var tempval=tempname.split("###");  var ImgID='PT_RTE_IMG_DB_LOC'; var filename=tempval[1]; if(UrlID == ImgID)
 {
 imgStr=imgStr+"&Params="+filename; ImageSource=img.src.split("/"); var temp_img_src ="";  temp_img_src = "/cs/"+psSiteName+"/";  imageNew = temp_img_src + ImageSource[ImageSource.length-2] + "/" + ImageSource[ImageSource.length-1] ; img.setAttribute("oracletempimagesrc",imageNew); img.removeAttribute("src"); }
 }

 }
 
 if(imgStr != "")
 {
 var xmlHttpReq = false; var self = this; var BeforeParse= newdiv.innerHTML; var textAreaValue = BeforeParse.replace(new RegExp("oracletempimagesrc", "gi"), "src"); URLoc=URLoc+"s/WEBLIB_PTRTE.ISCRIPT1.FieldFormula.IScript_RTE_IMAGE_ATTACH?URL="+dblocation[1]+imgStr;  if (window.XMLHttpRequest) {
 self.xmlHttpReq = new XMLHttpRequest(); }
 
 else if (window.ActiveXObject) {
 self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP"); }
 self.xmlHttpReq.open('POST', URLoc, true); self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); self.xmlHttpReq.onreadystatechange = function() {
 if (self.xmlHttpReq.readyState == 4) {
 temp = self.xmlHttpReq.responseText; var images = newdiv.getElementsByTagName('img' ); for ( var i1 = 0 ; i1 < images.length ; i1++ ) {
 var tmpImage = document.getElementById(images[i1].id); if(tmpImage) {
 var tmpUrl = tmpImage.src; tmpImage.src = tmpUrl+"?"+new Date(); tmpImage.src = tmpUrl; if (browserInfoObj2.isIE) {
 var imgObj = document.createElement("img"); imgObj.src = tmpUrl; imgObj.onerror = imgObj.onload = imgObj.onreadystatechange = changeImage(tmpImage.id, imgObj.src); }
 }
 }
 }
 }
 self.xmlHttpReq.send(null); return textAreaValue; }
 else
 return EditorString; }
 else
 return EditorString;}

replaceImageSource = function (instanceName)
{

 var EditorString = ""; if (CKEDITOR.instances[instanceName].checkDirty())
 {
 if (document.getElementById(instanceName).type == 'textarea')
 {
 EditorString = CKEDITOR.instances[instanceName].getData(); }
 else
 {
 EditorString = document.getElementById(instanceName).innerHTML; }

 updateTextArea(EditorString,CKEDITOR.instances[instanceName]); }
}

updateTextArea = function(textareaValue,instanceName)
{
 var element = instanceName.element; if ( element && instanceName.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE )
 {
 if ( element.is( 'textarea' ) )
 element.setValue( textareaValue ); else
 element.setHtml( textareaValue ); }
}

