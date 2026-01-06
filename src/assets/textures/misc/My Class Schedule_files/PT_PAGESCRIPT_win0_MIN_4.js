
var gFocusObj = null;var bRichTextEnabled = 0;var gRichTextField = null;var bTimer=null;var objBeforeOrAfterFocusSave = null; var objToBeFocus = null; var gcurSearchRowId = "";var gActiveBtn = null;var gSetFocusByAjax = false; var inside_win0 = false;var called_win0= false;var gCalendarClose = false;callbackOnDelay_win0= function() {
 var waitobj = document.getElementById("WAIT_win0"); var isSaveAction = false; if(typeof document.win0.ICAction != undefined) {
 if(document.win0.ICAction.value == "#ICSave") {
 waitobj = document.getElementById("SAVED_win0"); isSaveAction = true; }
 }
 if(waitobj) {
 var str = waitobj.style.visibility; if(str.indexOf("visible")!=-1) {
 var delayobj = document.getElementById("Delayed_win0"); if(delayobj){
 delayobj.style.visibility="visible"; delayobj.style.display="block"; delayobj.innerHTML=""; if(isSaveAction)
 delayobj.innerHTML="<span>Saving. Please wait</span>"; else
 delayobj.innerHTML="<span>Processing Please wait</span>"; inside_win0=true; var session_len = sessionStorage.length; for( i=0; i<session_len; i++) {
 var skey = sessionStorage.key(i); if(skey!=null && /globalInside/.test(skey))
 sessionStorage.removeItem(skey); }
 if (bSessionStorage) {
 sessionStorage.setItem("globalInside_win0", inside_win0); sessionStorage.setItem("sourceform","win0"); }
 }
 }
 }
}

callback_end_win0= function(){
 called_win0 = true; var waitobj = document.getElementById("WAIT_win0"); if(waitobj) {
 var str = waitobj.style.visibility; if( str.indexOf("visible")==-1) {
 var delayobj = document.getElementById("Delayed_win0"); delayobj.style.visibility="visible"; delayobj.style.display="block"; var spannode = delayobj.firstElementChild; if(spannode)
 spannode.style.visibility="hidden"; delayobj.innerHTML="Loading Complete"; setTimeout(initialize_win0,100); }
 }
}

initialize_win0 = function(){
 var delayobj = document.getElementById("Delayed_win0"); delayobj.innerHTML=""; delayobj.style.visibility="hidden"; delayobj.style.display="none"; inside_win0=false; called_win0 = false; sessionStorage.removeItem("globalInside_win0"); sessionStorage.removeItem("sourceform");}

if (window.showhide == null)
{
window.showhide = function (obj, bShow)
 {
 if (obj == null)
 return; if (!isFModeLayout())
 obj.style.zIndex = 99991; if (bShow)
 {
 var scrollY = ptCommonObj2.getScrollY(); var x = ptCommonObj2.getScrollX(); if (browserInfoObj2.isIE && ("ltr"==="rtl"))
 x = obj.parentNode.scrollWidth - obj.parentNode.clientWidth - obj.parentNode.scrollLeft; if (obj.parentNode.tagName.toLowerCase() !== "body") {
 var topCoord = getPgltTopY(obj);  scrollY = topCoord.y; x = topCoord.x; }
 x = (x > 0) ? (0-x) : x; if (scrollY != 0 || obj.style.top != "") 
 obj.style.top = scrollY+'px'; obj.style.right = x+'px'; if(obj.id.indexOf("WAIT_win0") == 0)
 {
 disableInteractionDuringProcessing(obj, true); }
 obj.style.visibility = "visible"; obj.style.display = "block"; setTimeout(callbackOnDelay_win0,2000); }
 else
 {
 if(obj.id.indexOf("WAIT_win0") == 0)
 {
 disableInteractionDuringProcessing(obj, false); }
 obj.style.visibility = "hidden"; obj.style.display = "none"; var globalInside_win0 = sessionStorage.getItem("globalInside_win0"); var srcformname = sessionStorage.getItem("sourceform"); if(!called_win0 && srcformname !=null && srcformname.localeCompare("win0")!=0)
 callback_end_win0(); else if(!called_win0 && globalInside_win0!=null && globalInside_win0.indexOf("true")>=0 )
 callback_end_win0(); }
 }
}


function foundClosestTag(obj, tagStr){
 if(obj == null || typeof obj == "undefined")
 return null; if(typeof obj.closest !== "undefined")
 return obj.closest(tagStr); var parnt = obj.parentNode; while(parnt != null && typeof parnt != "undefined"
 && parnt.tagName.toLowerCase() != tagStr.toLowerCase())
 parnt = parnt.parentNode; return parnt;}


function disableInteractionDuringProcessing(watiWinObj, disable) {
 if(watiWinObj == null || typeof watiWinObj == "undefined")
 return; if(disable)
 {
 var nstBody = foundClosestTag(watiWinObj, "body"); if(nstBody != null && typeof nstBody != "undefined" )
 {
 var styleText = nstBody.getAttribute("style"); if(styleText == null)
 styleText = "pointer-events: none;"; else
 styleText = "pointer-events: none;" + styleText; nstBody.setAttribute("style", styleText); }
 }
 else
 {
 var nstBody = foundClosestTag(watiWinObj, "body"); if(nstBody != null && typeof nstBody != "undefined" )
 {
 var styleText = nstBody.getAttribute("style"); while(styleText != null && typeof styleText != "undefined"&& styleText.indexOf("pointer-events: none") >= 0)
 {
 styleText = styleText.replace("pointer-events: none;", ""); nstBody.setAttribute("style", styleText); }
 if(styleText == null || styleText == "")
 nstBody.removeAttribute("style"); }
 }
}


function getPgltTopY(obj)
{

 
 if (top.ptalPage && top.ptalPage.isAccessibilityMode)
 return 1;  var topY = ptCommonObj2.getScrollY(); var topX = ptCommonObj2.getScrollX(); if (window.ptalPageletArea || (parent && parent.ptalPageletArea))
 var objGP = document.getElementById(this.ptalPageletArea.ptalPagelet.hoverElementId); else
 var objGP= ptUtil.getGrandParent(obj);   if (objGP.style.height != "" && browserInfoObj2.isIE) {
 
 topY = objGP.scrollTop; if ("ltr" === "ltr")
 topX = (objGP.scrollLeft > 0) ? -objGP.scrollLeft : 0; else
 topX = (objGP.offsetLeft > 0 && ((objGP.scrollWidth-objGP.scrollLeft) == objGP.clientWidth))? 0: (0-(objGP.scrollWidth-objGP.scrollLeft-objGP.clientWidth)); }else {
 var gpScrollTop = objGP.scrollTop;  var p = obj.parentNode; while (p && (p.tagName.toLowerCase()!=="li" && p.tagName.toLowerCase()!=="body")) {
 if (p.tagName.toLowerCase() == "div" && p.id.indexOf("WSRPDIV") >= 0)
 break;  p = p.parentNode; }
 if (p) {
 if (p.tagName.toLowerCase()== "body") {
 return {x:topX, y:topY}; }
 
 var pgltTop = 0, pgltHeader = ptUtil.getElemsByClass("PTPAGELETHEADER", p, "table"); if (pgltHeader[0]) {
 pgltTop = pgltHeader[0].offsetHeight + 4; } else { 
 pgltHeader = ptUtil.getElemsByClass("PTPAGELETBODY", p, "table")[0]; if (!pgltHeader) {
 pgltHeader = p;  }
 pgltTop = pgltHeader.offsetTop + 4; }

 if (p.tagName.toLowerCase() === "li" && objGP.style.height != "") {
 
 
 topY = (gpScrollTop <=0 ) ? 0 : gpScrollTop;  topX = (objGP.scrollLeft > 0) ? (0-objGP.scrollLeft) : 0; } else {
 if (p.id.indexOf("WSRPDIV") >= 0) {
 var tempY = ptCommonObj2.getPosition(p).y; topY = (tempY > topY) ? tempY : topY; }
 else { 
 topY = (topY > p.offsetTop) ? (topY - p.offsetTop) : (gpScrollTop ? gpScrollTop + pgltTop : pgltTop); }
 if ((p.offsetLeft + p.offsetWidth) > document.body.clientWidth) {
 topX = (p.offsetLeft + p.offsetWidth) - document.body.clientWidth - document.body.scrollLeft; topX = (topX < 0)? 0 : topX; } else {
 if ("ltr" === "rtl") {
 topX = (p.offsetLeft > 0 && ((document.body.scrollWidth-document.body.scrollLeft) >= document.body.clientWidth))? 0: (0-p.offsetLeft); }else
 topX = 0;  }
 }
 } 
 }
 return {x:topX, y:topY};}

function setSaveText_win0(txt)
{
var saveobj = document.getElementById("SAVED_win0");if (saveobj)
 {
 if (txt == "") txt = 'Saving...';  document.getElementById("ptStatusText_win0").innerHTML = txt; showhide(saveobj, true); document.getElementById("saveWait_win0").style.display = ""; }

if(isClassicPlus())
 {
 var saveMessageContainer = document.getElementById("PTCPSAVEDMSG"); if(!saveMessageContainer)
 {
 var divEl = document.createElement("div"); divEl.setAttribute("class", "PTCPSAVETEXTMSGNODE"); divEl.setAttribute("id", "PTCPSAVEDMSG"); saveobj.appendChild(divEl); }
 saveMessageContainer = document.getElementById("PTCPSAVEDMSG"); saveMessageContainer.innerHTML = "Saving Page"; var closeEl = document.createElement("a"); closeEl.setAttribute("title", "Close"); closeEl.setAttribute("id", "ptpopupclose"); closeEl.setAttribute("onclick", "javascript:(this.parentNode.parentNode.style.display=\'none\');"); if(saveMessageContainer)
 saveMessageContainer.appendChild(closeEl); }
 resetCkeditorFiveUpdatedFlag();}

function processing_win0(opt,waittime)
{
var waitobj = document.getElementById("WAIT_win0");var saveobj = document.getElementById("SAVED_win0");var saveWaitObj = document.getElementById("saveWait_win0");var waitobjModal = null;var saveobjModal = null;var saveWaitObjModal = null;var oframe = null;if (MTop())
{
 oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + PT_GetTopmostModalDialogIdCount()); if (oframe && oframe.contentWindow)
 {
 try {
 waitobjModal = oframe.contentWindow.document.getElementById("WAIT_win0"); saveobjModal = oframe.contentWindow.document.getElementById("SAVED_win0"); saveWaitObjModal = oframe.contentWindow.document.getElementById("saveWait_win0"); } catch (e) {}
 }
}

updateWindowTitleFromFakeBC(); displayPageTitle(); if (opt == 0)
{
 showhide(waitobj, false); showhide(saveobj, false); showhide(waitobjModal, false); showhide(saveobjModal, false); return;}
if (opt == 1)
{
 if (saveobj && (saveobj.style.visibility != "hidden") && (saveobj.style.display != "none")
 && (saveWaitObj.style.display != "none"))
 return; if (saveobjModal && (saveobjModal.style.visibility != "hidden") && (saveobjModal.style.display != "none")
 && (saveWaitObjModal.style.display != "none"))
 return; showhide(waitobj, true); showhide(saveobj, false); showhide(waitobjModal, true); showhide(saveobjModal, false); if(typeof bTimer != "undefined" && bTimer != null)
 clearTimeout(bTimer); return;}
if (opt == 2)
{
 showhide(waitobj, false); showhide(waitobjModal, false); setSaveText_win0('Saved'); if (saveWaitObj)
 saveWaitObj.style.display = "none"; if (saveWaitObjModal)
 saveWaitObjModal.style.display = "none"; bTimer = setTimeout("processing_win0(0)",waittime);  if (!isFModeLayout() && (typeof top.ptaiAguide=='object') && top.ptaiAguide.ptaiItemId!=null && top.ptaiAguide.ptaiItemId)
 {AgPostMessage();}
}
}

function isAltKey(evt)
{
if (!evt && window.event)
 evt = window.event;if (!evt)
 return false;if (evt.altKey)
 return true;if (evt.modifiers)
 return (evt.modifiers & Event.ALT_MASK) != 0;return false;}

function isCtrlKey(evt)
{
if (!evt && window.event)
 evt = window.event;if (!evt)
 return false;if (evt.ctrlKey)
 return true;if (evt.modifiers)
 return (evt.modifiers & Event.CONTROL_MASK) != 0;return false;}

function isShiftKey(evt)
{
if (!evt && window.event)
 evt = window.event;if (!evt)
 return false;if (evt.shiftKey)
 return true;if (evt.modifiers)
 return (evt.modifiers & Event.SHIFT_MASK) != 0;return false;}

function getKeyCode(evt)
{
if (!evt && window.event)
 evt = window.event;if (!evt)
 return 0;if (evt.keyCode)
 return evt.keyCode;if (evt.which)
 return evt.which;return 0;}

function cancelBubble(evt)
{
if (!evt && window.event)
 evt = window.event;if (!evt)
 return;if (typeof evt.cancelBubble != "undefined")
 evt.cancelBubble = true;if (typeof evt.stopPropagation != "undefined" && evt.stopPropagation)
 evt.stopPropagation();}

function isPromptKey(evt)
{
var bMACHotKey = (isMAC() && isCtrlKey(evt) && isShiftKey(evt))? true : false; if ((isAltKey(evt) && !isMAC() && getKeyCode(evt) == "5".charCodeAt(0)) || 
 (bMACHotKey && getKeyCode(evt) == "5".charCodeAt(0)))
{
 cancelBubble(evt); return true;}
return false;}

function getEventTarget(evt)
{
if (!evt && window.event)
 evt = window.event;if (!evt)
 return null;if (evt.srcElement)
 return evt.srcElement;if (evt.target)
 return evt.target;return null;}

function getModifiers(evt)
{
var res = "";if (isAltKey(evt)) 
 res += "A";if (isCtrlKey(evt))
 res += "C";if (isShiftKey(evt))
 res += "S";return res;}

function mouseoverHotkeyHandler(evt)
{
 var key = (window.event) ? window.event.keyCode : evt.keyCode; if (key == 80 && isCtrlKey(evt) && isAltKey(evt) ){
 return true; }
 return false;}

var nLastKey_win0 = 0;var oLastKeyEvent = null;var gKeyDownTarget = null;var keys = [];function findNewList(evt, list, keyCode)
{
var target = getEventTarget(evt);var onClick = false;while (target && target.tagName != "UL" && target.getAttribute("tabindex") == null)
 target = target.parentNode;if (target.tagName == "UL")
 {
 target = getEventTarget(evt); onClick = true; }

var tagName = target.tagName;var objList = null;if (onClick)
 objList = list.querySelectorAll(tagName + "[onclick]");else
 objList = list.querySelectorAll(tagName + "[tabindex]");if (!objList || !objList.length)
 return false; switch (keyCode)
 {
 case 35:
 if (findLastInList(objList))
 return true; break; case 36:
 if (findFirstInList(objList))
 return true; break; case 37: 
 case 38:
 if (findNextInList(target, objList, false))
 return true; break; case 39: 
 case 40:
 if (findNextInList(target, objList, true))
 return true; break; }

return false;}

function findFirstInList(objList)
{
for (var i = 0; i < objList.length; i++)
 {
 if (objList[i].offsetParent && !ptCommonObj2.tryFocus0(objList[i]))
 {
 setTimeout(function () { objList[i].scrollIntoView(); }, 10); return true; }
 }
return false;}

function findLastInList(objList)
{
for (var i = objList.length; i-- > -1;)
 {
 if (objList[i].offsetParent && !ptCommonObj2.tryFocus0(objList[i]))
 {
 setTimeout(function () { objList[i].scrollIntoView(); }, 10); return true; }
 }
return false;}

function findNextInList(target, objList, bDown)
{
var bScroll = false;for (var i = 0, newIndex = 0; i < objList.length; i++)
 {
 if (objList[i].id == target.id)
 {
 while (objList.length > 1 && !bScroll)
 {
 if (bDown)
 {
 if (i == objList.length - 1)
 {
 newIndex = 0; i = newIndex; bScroll = true; }
 else
 newIndex = ++i; }
 else
 {
 if (!i)
 {
 newIndex = objList.length - 1; i = newIndex; bScroll = true; }
 else
 newIndex = --i; }
 if (objList[newIndex].offsetParent && !ptCommonObj2.tryFocus0(objList[newIndex]))
 {
 if (bScroll)
 setTimeout(function () { objList[newIndex].scrollIntoView(); }, 100); return true; }
 }
 }
 }

return false;}

function findListParent(target)
{

for ( ; target && target !== document; target = target.parentNode) 
 {
 if (hasClass (target, "pt_keynav-list")) 
 return target; if (hasClass (target, "pt_keynav-listtab")) 
 return target; }
return null;}

function isTablet() {
 return isClass(document.querySelector('html'), "tablet");}

function isPhone() {
 return isClass(document.querySelector('html'), "phone");}
function isTouchDevice() {
 return this.isPhone() || this.isTablet();}


function keyHandlerRAActionMenu(evt,target)
{
 var nKeyCode = evt.keyCode; var bAlt = isAltKey(evt); var bCtrl = isCtrlKey(evt); var bShift = isShiftKey(evt); var bWinHotKey = ((!isMAC()) && (!bShift) && (!bCtrl) && (bAlt)); var bMACHotKey = (isMAC() && bCtrl && bShift && (!bAlt));  if((bWinHotKey || bMACHotKey) && ((nKeyCode == 186) || (nKeyCode == 59)) )
 {
 var rcmenu = ""; var rcmenu_mod = ""; var rcmenu_pos = 0; rcmenu = target.id; if(rcmenu.length > 0)
 {
 var rcmenu_pos = rcmenu.indexOf("$"); if(rcmenu_pos == -1) 
 {
 
 rcmenu_mod = rcmenu + "$ctxmenu"; }
 else 
 {
 
 rcmenu_mod = rcmenu.substring(0,rcmenu_pos); rcmenu_mod = rcmenu_mod + "$ctxmenu"; rcmenu_mod = rcmenu_mod + rcmenu.substring(rcmenu_pos,rcmenu.length); }
 sessionStorage.setItem("RCActionHotKey","1"); submitAction_win0(document.win0,rcmenu_mod); return; }
 }
}

function doKeyDown_win0(evt)
{
oLastKeyEvent = evt;var target = getEventTarget(evt);keys[evt.keyCode] = true;if (isFModeLayout())
 {
 if (target && target.id.length > 0)
 {
 var bValid; switch (evt.keyCode)
 {
 case 13: 
 case 32: 
 if (target && target.getAttribute("aria-selected") == "true")
 return false; break; case 37: 
 case 39: 
 if (target && target.getAttribute("role") != null && target.getAttribute("role").indexOf("menuitem") > -1)
 return false; bValid = true; break; case 35: 
 case 36: 
 case 38: 
 case 40: 
 bValid = true; break; default:
 break; }

 if (typeof bValid != "undefined")
 {
 
 var divParent = target.parentElement.parentElement; if ((divParent.className.indexOf("nb-menu-link") != -1) || (divParent.className.indexOf("nui-menu-section") != -1))
 return false;    var list = findListParent(target); if (list && findNewList(evt, list, evt.keyCode))
 return true; }
 }

 if (keys[17] && keys[18] && keys[77] && bPTDrag)
 {
 keys[17] = false; keys[18] = false; keys[77] = false; EndDragAccessible(target.id); bPTDrag = false; return false; }
 if (keys[17] && keys[77])
 {
 keys[17] = false; keys[77] = false; bPTDrag = StartDragAccessible(target.id); return false; }
 if (evt.keyCode == 27 && bPTDrag)
 {
 CancelDragAccessible(); if (document.forms[0].id != "PT_LANDINGPAGE" && document.forms[0].id != "PTNUI_NAVBAR")
 bPTDrag = false; return; }
 }

oLastKeyEvent = evt;var target = getEventTarget(evt);gKeyDownTarget = target;if (!isFModeLayout() && !PT_handleTabKeyForModalDialog(evt))
 return false;if (target && target.form && target.form.name != "win0")
 return findHandler("doKeyDown_" + target.form.name, evt);nLastKey_win0 = getKeyCode(evt);if (isFModeLayout() && nLastKey_win0 == 13 && target)
 {
 var sKeyupScript = target.getAttribute('onkeyup'); var bKeyUp = sKeyupScript != null; if (bKeyUp && sKeyupScript.indexOf("DatePrompt") != -1)
 
 bKeyUp = false; if (bKeyUp)
 evt.preventDefault(); }

if (nLastKey_win0 != "\t".charCodeAt(0))
 {
 if (isGridNav(evt))
 ptGridObj_win0.doArrowNavGrid(evt); if (isTypeAheadEl(evt))
 {
 
 
 ptTAObj_win0.KeyUpDown(evt); }

 if (target.nodeName == "A" && typeof ptIframeHdr != "undefined" && ptIframeHdr && ptIframeHdr.isAccessibility() && nLastKey_win0 == 27)
 return false;  var FFver = 0; if(browserInfoObj2.isFF)
 {
 var match = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./); FFver = match ? parseInt(match[1]) : 0; }

 if((browserInfoObj2.isSafari || browserInfoObj2.isChrome || (browserInfoObj2.isFF && FFver >= 66) || browserInfoObj2.isEdge) && nLastKey_win0 == 27)
 {
 if (!isFModeLayout() || bInModal)
 {
 var evt2 = document.createEvent('Event'); evt2.initEvent('keypress', true, true); evt2.keyCode = evt.keyCode; target.dispatchEvent(evt2); }
 }

 
 if (nLastKey_win0 == 13)
 {
 var nFilePromptCounter; var filePromptName; var filePromptNames; for (nFilePromptCounter = 0; ; ++nFilePromptCounter)
 {
 filePromptName = '#ICOrigFileName'; if (nFilePromptCounter > 0)
 filePromptName += nFilePromptCounter.toString(); filePromptNames = document.getElementsByName(filePromptName); if (!filePromptNames || (filePromptNames.length != 1))
 break; if (!target || (target.name != filePromptName))
 continue; if (!evt && window.event)
 evt = window.event; if (evt)
 {
 if (typeof evt.preventDefault != "undefined" && evt.preventDefault && evt.cancelable)
 {
 evt.preventDefault(); }
 else
 {
 evt.returnValue = false; cancelBubble(evt); }

 return false; }
 }
 }

 return true; }

if (isCtrlKey(evt))
 return tryFocus(oFirstTab_win0);if (isAltKey(evt) || (isShiftKey(evt) && !isGridNav(evt)))
 return true;if (target == oLastTab_win0)
 {
 if (oFirstTB_win0)
 {
 if (!bTabOverTB_win0)
 return true; }
 if (oFirstPg_win0)
 {
 if (!bTabOverPg_win0)
 return tryFocus(oFirstPg_win0); }
 if (bTabOverNonPS_win0 || oFirstTB_win0 != null || oFirstPg_win0 != null)
 return tryFocus(oFirstTab_win0); return true; }

if (target == oLastTB_win0)
 {
 if (oFirstPg_win0)
 {
 if (!bTabOverPg_win0)
 return tryFocus(oFirstPg_win0); }
 if (bTabOverNonPS_win0 || oFirstPg_win0 != null)
 return tryFocus(oFirstTab_win0); return true; }

if (target == oLastPg_win0)
 {
 if (bTabOverNonPS_win0)
 return tryFocus(oFirstTab_win0); return true; }


if (nLastKey_win0 == "\t".charCodeAt(0) && isTypeAheadEl(evt))
 {
 ptTAObj_win0.KeyUpDown(evt); return true; }

}

function getLastKey_win0()
{
var nTemp = nLastKey_win0;nLastKey_win0 = 0;return nTemp;}

function doKeyUp_win0(evt)
{
var target = getEventTarget(evt);keys[evt.keyCode] = false;var key = getKeyCode(evt);var keyChar = String.fromCharCode(key);var bAlt = isAltKey(evt);var bCtrl = isCtrlKey(evt);var bNotMine = false;var bMACHotKey = (isMAC() && bCtrl && isShiftKey(evt))? true : false; var bRouteKeyRes = true; if (bAlt && isMAC() && altKey_win0.indexOf(keyChar) >= 0)
 return; if (bCtrl && bAlt && key == 83 && (typeof (bDoModal_win0) == "undefined" || !bDoModal_win0))
 { 
 ptCommonObj2.moveToSkipLink(); return; }

if (isFModeLayout() && target)
 {
 var sKeyupScript = target.getAttribute('onkeyup'); var bDatePrompt = sKeyupScript != null && sKeyupScript.indexOf("DatePrompt") != -1; var bSpellCheck = sKeyupScript != null && sKeyupScript.indexOf("spellCheckSession") != -1;  if (sKeyupScript != null && !bDatePrompt && !bSpellCheck || target.getAttribute('onkeydown') != null)
 {
 if (isFModeLayout() && key == 27)
 closeLastModal(); return; }
 }

if (!isFModeLayout() && !PT_handleTabKeyForModalDialog(evt))
 return false;if (target && target.form && target.form.name != "win0")
 return findHandler("doKeyUp_" + target.form.name, evt);if (bCtrl && key==221) 
 {
 
 ptConsole2.active(); return false; }

if (keyChar == "\r" && (!(isButton(target) || isRowAct(target)) || !isFModeLayout()) || key == 27)
 {
 
 if (target != null && target.id.indexOf("$delete") != -1)
 {
 if(!evt)return; return; }
 if (key == 27)
 {
 if (typeof closeCalendar != "undefined" && closeCalendar)
 {
 
 closeCalendar = false; return; }

 var sCancelName = '#ICCancel'; var modObj = MTop().document.getElementById(MTop().PTMOD_ + modalID); if (isTopFModeLayout() && modObj && modObj.bModeless) {
 top.doClickModelessCloseButton(); return; }
 if (modObj && modObj.sCancelName.length != 0)
 sCancelName = modObj.sCancelName; if (typeof (bDoModal_win0) != "undefined" && bDoModal_win0 && modalID != null )
 {
 if (target.className == "PSLONGEDITBOX")
 {
 
 
 var cObj = MTop().document.getElementById("pt_modals"); if (cObj && cObj.childNodes.length > 2)
 return; }
 
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + MTop().modId); if (modObj && (modObj.bGridSort || modObj.bPopupMenu) && getPTDialog().isInModal(MTop().modId, target))
 {
 doCloseModal(MTop().modId); return; }
 
 var cancelObj = document.getElementById(sCancelName); if (!(cancelObj && cancelObj.style.display == "none"))
 doUpdateParent(document.win0, sCancelName); }
 else if (isFModeLayout() && bInModal && !isLastLocalModal() )
 submitAction_win0(document.win0, sCancelName); else if (isFModeLayout() && key == 27)
 {
 var modObj1 = MTop().document.getElementById(MTop().PTMOD_ + MTop().modId); if(!(modObj1 && modObj1.bRCFModal))
 closeLastModal(); }
 return; }

 if (key == 13 && target != null && target.getAttribute('onclick') != null
 && (target.getAttribute("role") == "menuitem" || target.getAttribute("role") == "tab"))
 {
 if (isFModeLayout() && target != gKeyDownTarget)
 return; target.onclick(); return; }

 if (isFModeLayout() && key == 27)
 closeLastModal(evt, target); return; }

if ((bAlt && !isMAC()) || bMACHotKey)
 bRouteKeyRes = routeKeyEvent(evt);if (!bRouteKeyRes)
 return false;if (bAlt && !isMAC()) 
 {
 if (bCtrl || altKey_win0.indexOf(keyChar) < 0)
 {
 if (keyChar == "9" || key == 220 || key == 186)
 return true; else if(keyChar == "2")
 if(bCtrl)
 bNotMine = true; else
 bNotMine = false; else if(keyChar == "3" || keyChar == "4")
 if(bCtrl)
 bNotMine = true; else
 bNotMine = false; else if (keyChar == "K") 
 {
 submitAction_win0(document.win0, "#KEY" + "A" + keyChar); return false; }
 else
 bNotMine = true; }
 }
else if (bCtrl && !bMACHotKey)
 {
 if (keyChar == "K" && !isMAC())
 return false;  if (key == 88 || key == 120) 
 {
 
 ptConsole2.deactive(); return false; }
 keyChar = String.fromCharCode(key | 0x40); if (ctrlKey_win0.indexOf(keyChar) < 0)
 bNotMine = true; if (bMACHotKey) 
 bNotMine = false; }
else if ((key == 32 || key == 13) && (isButton(target)) || (key == 13 && isRowAct(target)))
 {
 bNotMine = false; }
else
 {
 if (baseKey_win0.indexOf(keyChar) < 0)
 bNotMine = true; }


if (bMACHotKey && ((altKey_win0.indexOf(keyChar) >= 0) || /2|3|4/g.test(keyChar)))
 bNotMine = false;if (bNotMine) {
 
 if (bAlt || bCtrl) {
 
 var navFrame = parent.frames["NAV"]; if (!navFrame) {
 navFrame = parent.frames["UniversalHeader"]; }
 if (navFrame && navFrame.parentKeyHandler && !isCrossDomain(navFrame)) {
 navFrame.parentKeyHandler(window, key, bAlt, bCtrl);  } else if (parent.ptIframe && parent.ptIframe.parentKeyHandler && !isCrossDomain(parent)) {
 parent.ptIframe.parentKeyHandler(window,key,bAlt,bCtrl); } else if (parent.parent.ptIframe && parent.parent.ptIframe.parentKeyHandler && !isCrossDomain(parent.parent)) {
 parent.parent.ptIframe.parentKeyHandler(window,key,bAlt,bCtrl); }
 }
 if (isGridNav(evt)) 
 ptCommonObj2.terminateEvent(evt); if (isTypeAheadEl(evt)) 
 ptTAObj_win0.GiveOptions(evt); return true;}


var code = (bMACHotKey) ? ("A" + keyChar) : getModifiers(evt) + keyChar; if (target && target.name)
 document.win0.ICFocus.value = target.name;if (code == "A8")
 if (!doDeleteKey_win0(target))
 return false;if (code == "A\xbf")
 {
 var findObj; if (window.FindString_win0
 && document.win0.ICFind){
 var findObj = findScroll(target); if (findObj && findObj.id.match(/\$grid/) && isFModeLayout()){
 var n = findObj.id.indexOf("\$"); var formDivGridName = findObj.id.slice(0, n); var RegExp1 = /^win\d+div/;  if (formDivGridName.search(RegExp1) > -1)
 formDivGridName = (formDivGridName).replace(RegExp1, ""); var findName = formDivGridName.concat("\$hfind"); submitAction_win0(document.win0, findName); return false; }
 else if (findObj && !FindString_win0(document.win0.ICFind))
 return false; }
 else
 return false; }

if (code == "A7")
 if (!doInsertKey_win0(target))
 return false;if (code == "A\xbc" || code == "A\xbe" || code == "A\xde")
 if (!activeLink(target,code))
 return false;if (code == 'A5')
{
 var id_s = target.id.split("$")[0]; var occ_s = target.id.split("$")[1]; var pid = id_s+"$prompt"; if (occ_s && typeof occ_s != "undefined")
 pid +="$"+occ_s; var pobj = document.getElementById(pid); var operation = ""; if (!pobj || typeof pobj == "undefined" ) {
 pid = id_s+"$spellcheck"; if (occ_s && typeof occ_s != "undefined")
 pid +="$"+occ_s; pobj = document.getElementById(pid); if (pobj && typeof pobj != "undefined" ) operation = "$spellcheck"; }

 if (!pobj || typeof pobj == "undefined" ) {
 pid = target.id+"$prompt"; pobj = document.getElementById(pid); if (!pobj || typeof pobj == "undefined" )
 return false; }
}

if (key == 13 && !ptCommonObj2.isSearchPage(target.form)
 || (key == 32 || key == 13) && isButton(target)
 || key == 13 && isRowAct(target)) 
{
 if (target.getAttribute('onclick') != null && (target.getAttribute('href') == null || key == 32 && target.getAttribute('href') == 'javascript:void(0);')) {
 if (isFModeLayout() && target != gKeyDownTarget) return; target.onclick(); return; }
 else if (modalZoomName != null) {
 doUpdateParent(document.win0, '#ICReturn'); return; }
 else if (isFModeLayout()) {
 if (target != gKeyDownTarget || key == 13 && typeof target.tagName != "undefined" && (target.tagName == "a" || target.tagName == "A"))
 return; var sScript = target.getAttribute('href'); var bScript = (isOnClickCancelBubble(target) && sScript != null && sScript.indexOf("javascript:") != -1) ? true : false; var bDatePicker = (ptUtil.isClassMember(target, "ps_icon-date") && sScript != null && sScript.indexOf("javascript:") != -1) ? true : false; if ((bScript || bDatePicker) && !gCalendarClose)
 eval(decodeURIComponent(sScript)); gCalendarClose = false; return; }
 else if (typeof event != "undefined") {
 if(key == 32 && !isFModeLayout() && isButton(target)) {
 if(target.id == "prevmonth" || target.id == "nextmonth"|| target.id == "PTClose") return; else {
 var sScript = target.getAttribute('href'); if(sScript.indexOf("javascript:DatePrompt")!=-1) {
 if (!gCalendarClose)
 eval(sScript); gCalendarClose = false;  return; }
 }
 }
 submitAction_win0(document.win0, event.srcElement.id); }
 else { 
 if(key == 32 && !isFModeLayout() && isButton(target)) {
 if(target.id == "prevmonth" || target.id == "nextmonth"|| target.id == "PTClose") return; else {
 var sScript = target.getAttribute('href'); if(sScript.indexOf("javascript:DatePrompt")!=-1) {
 if (!gCalendarClose)
  eval(sScript); gCalendarClose = false; return; }
 }
 }
 submitAction_win0(document.win0, evt.target.id); }
}else
{
 if (target && target.form)
 addchg_win0(target); if (code == 'A5'){
 
 if(isFModeLayout())
 submitAction_win0(document.win0, pid, target.id); else
 submitAction_win0(document.win0, "#KEY" + code + operation, target.id); }else if(bAlt || bMACHotKey){
 
 if ((key == 49) && !isFModeLayout() && ptCommonObj2.isSavePage(target.getElementsByTagName("Form")[0]) )
 setSaveText_win0('Saving...', true, false);  if(altKey_win0.indexOf(keyChar) >= 0 || keyChar == "2" || keyChar == "3" || keyChar == "4"){
 var tmpToolPB = null; if(keyChar == "2" && (((tmpToolPB = document.getElementById("#ICList")) == null) || tmpToolPB.disabled))
 return false; if(keyChar == "3" && (((tmpToolPB = document.getElementById("#ICNextInList")) == null) || tmpToolPB.disabled))
 return false; if(keyChar == "4" && (((tmpToolPB = document.getElementById("#ICPrevInList")) == null) || tmpToolPB.disabled))
 return false; if(keyChar == "2" || keyChar == "3" || keyChar == "4"){
 var url = "javascript:submitAction_win0(document.win0, \'#KEY" + code + "\')"; if (!saveWarning("", null, "", url))
 return false; }
 if( !ptCommonObj2.isSearchPage(target.form) && (code == "A\xbc" || code == "A\xbe" || code == "A\xde") && gActiveBtn && target.name == null)
 {
 document.win0.ICFocus.value = gActiveBtn.name
 submitAction_win0(document.win0, gActiveBtn.name); }
 else {
 
 
 if (!((key == 49) && isFModeLayout()))
 submitAction_win0(document.win0, "#KEY" + code); }
 }
 }else{
 if (isFModeLayout() && target && target.id)
 document.win0.ICFocus.value = target.id; submitAction_win0(document.win0, "#KEY" + code); }
}

return false;}

function delPageBarAndTabs()
{
var obj = document.getElementById('win0divPAGEBAR');if(obj != null && typeof obj != 'undefined')
 obj.innerHTML = "";obj = document.getElementById('win0divPSPANELTABS');if(obj != null && typeof obj != 'undefined')
 obj.innerHTML = "";obj = document.getElementById('win0divPSPANELTABLINKS');if(obj != null && typeof obj != 'undefined')
 obj.innerHTML = "";}

function extractFilename(path) {
 if (path.substr(0, 12) == "C:\\fakepath\\")
 return path.substr(12);  var x; x = path.lastIndexOf('/'); if (x >= 0) 
 return path.substr(x+1); x = path.lastIndexOf('\\'); if (x >= 0) 
 return path.substr(x+1); return path; }

function enableUpload()
{
var format = /[*:"<>?/\\|]+/;var uploadButtons = document.getElementsByName('Upload');if (!uploadButtons || (uploadButtons.length != 1))
 return;uploadButtons[0].disabled = true;var nFilePromptCounter;var filePromptName;var filePromptNames;for (nFilePromptCounter = 0; ; ++nFilePromptCounter)
 {
 filePromptName = '#ICOrigFileName'; if (nFilePromptCounter > 0)
 filePromptName += nFilePromptCounter.toString(); filePromptNames = document.getElementsByName(filePromptName); if (!filePromptNames || (filePromptNames.length != 1))
 break;  var files = filePromptNames[0].files; var fileName = files[0].name; if(format.test(fileName)){
 filePromptNames[0].value= "";  var sMsgLog = "Unsupported character *:\"<>?/\\| found in file name"; alert(sMsgLog + " " + fileName + "."); break; }

 if (filePromptNames[0].value != "")
 {
 uploadButtons[0].disabled = false; break; }
 }
}

function enableMultiUpload(nPrompt)
{
var uploadButtons = document.getElementsByName('Upload');if (!uploadButtons || (uploadButtons.length != 1))
 return;uploadButtons[0].disabled = true;var nFilePromptCounter;var filePromptName;var filePromptNames;var format = /[*:"<>?/\\|]+/;for (nFilePromptCounter = 0; ; ++nFilePromptCounter)
 {
 filePromptName = '#ICOrigFileName'; if (nFilePromptCounter > 0)
 filePromptName += nFilePromptCounter.toString(); filePromptNames = document.getElementsByName(filePromptName); if (!filePromptNames || (filePromptNames.length != 1))
 break;  var files = filePromptNames[0].files; if(files.length > nPrompt)
 {
 filePromptNames[0].value= ""; alert("Total number of files to be uploaded at a time has been exceeded."); break; }

 var bUnsupportedCharacter = false; var sUnsupportedFileNames = ""; var nIndex = 0; var nFileCount = files.length; for (nIndex = 0; nIndex < nFileCount; nIndex++)
 {
 
 var sTempFileName = files[nIndex].name; if(format.test(sTempFileName))
 {
 if (sUnsupportedFileNames == "") {
 sUnsupportedFileNames = sTempFileName; }else {
 sUnsupportedFileNames = sUnsupportedFileNames + "," + sTempFileName; }
 bUnsupportedCharacter = true; }
 }

 if(bUnsupportedCharacter)
 {
 var sMsgLog = "Unsupported character *:\"<>?/\\| found in file name"; alert(sMsgLog + " " + sUnsupportedFileNames + "."); filePromptNames[0].value= ""; return; }

 if (filePromptNames[0].value != "")
 {
 uploadButtons[0].disabled = false; break; }
 }
}

function activeLink(obj, akey)
{
var scrl = findScroll(obj);var btnid;if (!scrl) {
 
 if (akey == "A\xbc")
 btnid = "#ICPrevPage"; else if (akey == "A\xbe")
 btnid = "#ICNextPage"; else
 return false; var btn = document.getElementById(btnid); if (btn)
 return true; else
 return false; }
if (akey == "A\xbc")
 btnid = "\$hup\$";else if (akey == "A\xbe")
 btnid = "\$hdown\$";else if (akey == "A\xde")
 btnid = "\$hviewall\$";btnid = scrl.id.replace(/\$scroll[im]?\$/,btnid);var btn = document.getElementById(btnid);gActiveBtn=btn;if (btn)
 return true;return false;}

function findHandler(handlerName, evt)
{
var obj = window[handlerName];if (typeof obj == "function")
 return obj(evt);return true;}

function keyHandler(keyCode, bIsAlt, bIsCtrl)
{
return keyHandler_win0(keyCode, bIsAlt, bIsCtrl);}

function keyHandler_win0(keyCode, bIsAlt, bIsCtrl)
{
var keyChar = String.fromCharCode(keyCode);var code = "";if (bIsAlt)
{
 code = "A"; if (bIsCtrl || altKey_win0.indexOf(keyChar) < 0)
 return false;}
else if (bIsCtrl)
{
 code = "C"; keyChar = String.fromCharCode(keyCode | 0x40); if (ctrlKey_win0.indexOf(keyChar) < 0)
 return false;}
else
 return false;code += keyChar;if (code == "A8" || code == "A\xbf" || code == "A7")
 return false;if (target && target.form)
 addchg_win0(target);submitAction_win0(document.win0, "#KEY" + code);return true;}

function doDeleteKey_win0(obj)
{
if (!window.DeleteCheck2_win0)
 return false;var bscrollArea = false; var scroll = findScroll(obj);if (!scroll) {
 scroll = findScrollarea(obj); bscrollArea = true;}

if (!scroll)
 return false;var bFocusable = true;if((obj.nodeName == 'BODY' || obj.id.length == 0) && preID_win0!= null ) {
 var temp = obj.ownerDocument.getElementById(preID_win0); if(typeof temp != 'undefined')
 obj=temp; bFocusable = false;}
if (scroll.id.search(/^(.*)(\$scroll[im]?\$)(.*)$/,"$fdelete$") < 0)
 buttonid = scroll.id;else
 buttonid = RegExp["$1"] + "$fdelete$" + RegExp["$3"];if ((scroll.id.match(/\$grid/) || bscrollArea) && isFModeLayout()) { 
 var n = scroll.id.indexOf("\$"); var formDivGridName = scroll.id.slice(0, n); var RegExp1 = /^win\d+div/;  var nn = obj.id.lastIndexOf("$"); var gridRow = obj.id.slice(nn); var nnn = scroll.id.lastIndexOf("$");  var occursNum = scroll.id.slice(nnn + 1); if (formDivGridName.search(RegExp1) > -1) {
 formDivGridName = (formDivGridName).replace(RegExp1, ""); buttonid = formDivGridName + "$delete" + gridRow + "$$" + occursNum; }
}

if (document.getElementById(buttonid))
 return DeleteCheck2_win0(buttonid);if (bFocusable) {
if (obj.id == null || obj.id.search(/\$(\d*)(\$\$\d*)?$/) < 0)
 return false;}
else {
 if (obj.id == null || obj.id.search(/tr(.*)\$(\d*)_row(\d*)?/) < 0)
 return false;}
var row = bFocusable ? RegExp.$1 : RegExp.$3 - 1 ;if (buttonid.search(/^(.*)(\$fdelete\$)(.*)$/) < 0)
 return false;buttonid = RegExp["$1"] + "$delete$" + row + "$$" + RegExp["$3"];if (document.getElementById(buttonid))
 return DeleteCheck2_win0(buttonid);return false;}

function doInsertKey_win0(obj)
{
if (!window.AddMultiple_win0)
 return false;var bscrollArea = false; var scroll = findScroll(obj);if (!scroll) {
 scroll = findScrollarea(obj); bscrollArea = true;}

if (!scroll)
 return false;var bHasInsertBtn = false;if (scroll.id.search(/^(.*)(\$scroll[im]?\$)(.*)$/,"$fnew$") < 0)
 buttonid = scroll.id;else
 buttonid = RegExp["$1"] + "$fnew$" + RegExp["$3"];if ((scroll.id.match(/\$grid/) || bscrollArea) && isFModeLayout()) { 
 var n = scroll.id.indexOf("\$"); var formDivGridName = scroll.id.slice(0, n); var RegExp1 = /^win\d+div/;  var nn = obj.id.lastIndexOf("$"); var gridRow = obj.id.slice(nn); var nnn = scroll.id.lastIndexOf("$");  var occursNum = scroll.id.slice(nnn + 1); if (formDivGridName.search(RegExp1) > -1) {
 formDivGridName = (formDivGridName).replace(RegExp1, ""); buttonid = formDivGridName + "$new" + gridRow + "$$" + occursNum; }
 if (document.getElementById(buttonid)) {
 if (obj && obj.id && obj.id.length > 0)
 document.win0.ICFocus.value = obj.id; return true; }
}

if (document.getElementById(buttonid))
 bHasInsertBtn = true;if (obj.id == null || obj.id.search(/\$(\d*)(\$\$\d*)?$/) < 0)
 return false;var row = RegExp.$1;if (buttonid.search(/^(.*)(\$fnew\$)(.*)$/) < 0)
 return false;buttonid = RegExp["$1"] + "$new$" + row + "$$" + RegExp["$3"];if (!bHasInsertBtn)
{
 if(document.getElementById(buttonid))
 bHasInsertBtn = true;}
if (!bHasInsertBtn)
{
 
 buttonid = RegExp["$1"] + "$newm$" + row + "$$" + RegExp["$3"]; if(document.getElementById(buttonid))
 bHasInsertBtn = true;}
if (bHasInsertBtn)
{
 if (scroll.id.match(/\$scrollm\$/))
 return AddMultiple_win0(document.win0.ICAddCount); if (scroll.id.match(/\$scrolli\$/))
 return true;}
return false;}

function findScroll(obj)
{
var temp = null;if(obj.nodeName == 'BODY' && preID_win0 != null ) {
 temp = obj.ownerDocument.getElementById(preID_win0); if(typeof temp != 'undefined')
 obj=temp;}

while (obj)
{
 if (typeof obj.id != "undefined") {
 if (obj.id.match(/\$scroll/))
 return obj; else if (obj.id.match(/\$grid/) && isFModeLayout())
 return obj; }

 if (typeof obj.parentNode != "undefined")
 obj = obj.parentNode; else if (typeof obj.offsetParent != "undefined")
 obj = obj.offsetParent; else
 return null;}
}


function findScrollarea(obj)
{
var temp = null;if (obj.nodeName == 'BODY' && preID_win0 != null )
 {
 temp = obj.ownerDocument.getElementById(preID_win0); if (typeof temp != 'undefined')
 obj=temp; }

while (obj) 
 {
 if (typeof obj.id != "undefined") 
 {
 if (((obj.getAttribute('class')
 && obj.getAttribute('class').indexOf("ps_box-scrollarea") != -1)
 && obj.getAttribute('class').indexOf("ps_box-scrollarea-row") == -1)
 && isFModeLayout())
 return obj; }

 if (typeof obj.parentNode != "undefined")
 obj = obj.parentNode; else if (typeof obj.offsetParent != "undefined")
 obj = obj.offsetParent; else
 return null; }
} 


if (window.doKeyPress_win0 == null)
{
window.doKeyPress_win0 = function (evt)
 {

 
 if ( evt.target.classList.contains( 'ck-editor__editable') ) { return; }; oLastKeyEvent = evt; var event = evt ? evt : window.evt; var target = getEventTarget(event); if (target && target.form)
 addchg_win0(target); if (isFModeLayout() && target)
 {
 var sKeyupScript = target.getAttribute('onkeyup'); var bDatePrompt = sKeyupScript != null && sKeyupScript.indexOf("DatePrompt") != -1;  if (sKeyupScript != null && !bDatePrompt || target.getAttribute('onkeydown') != null)
 return; }

 if (target && target.form && target.form.name != "win0")
 return findHandler("doKeyPress_" + target.form.name, event); var key = getKeyCode(event); var keyChar = String.fromCharCode(key); if (key==27)
 {
 if (!(glObjTr.isEmpty(glObjTr.sOpen))){
 glObjTr.removePrevMenu(event); return true; }

 if(typeof window.bEscOnCal != 'undefined' && window.bEscOnCal == true){
 window.bEscOnCal = false; return; }

 
 if (!isFModeLayout() && MOpopupObj_win0 && typeof(MOpopupObj_win0.bIs_shown) != "undefined" && MOpopupObj_win0.bIs_shown)
 return MOpopupObj_win0.StopAccess(event);  if (typeof (bDoModal_win0) != "undefined" && bDoModal_win0)
 return true; else if (isTypeAheadEl(event)) 
 return true; }

 if (keyChar != "\r" && key != 27)
 {
 if (isFModeLayout() && key == 32 && isButton(target))
 return false;  else
 return true; }

 
 
 var objGridZoom = document.getElementById("ICZoomGrid"); if (objGridZoom && typeof objGridZoom != "undefined")
 {
 if (keyChar == "\r" && !(target.href || typeof target.onclick == "function") && objGridZoom.value == 1 && target.id != "ICOKZG")
 return true; }


 
 if (!routeKeyEvent(event))
 return false; if (target && key != 27)
 {
 if (!isOnClickCancelBubble(target) && (typeof target.onclick == "function" || target.href)
 && target.type != "radio" && target.type != "checkbox")
 return true; if (target.type == "textarea")
 return true; if (key != 13 && isOnClickCancelBubble(target))
 return true; }

 var bMACHotKey = (isMAC() && isCtrlKey(event) && isShiftKey(event))? true : false;  var code = (bMACHotKey) ? ("A" + keyChar) : getModifiers(event) + keyChar;  if (target && target.name)
 document.win0.ICFocus.value = target.name;  var bHaveId = false; if (key == 13) {
 
 if (isTypeAheadEl(event) && ptTAObj_win0.IsGrabHighlighted()) {
 if (isFModeLayout())
 typeAheadPositionTopClear()
 else
 ptTAObj_win0.HideTheBox(); return false; }

 if (isFModeLayout() && isPopupRequest(target.form, target.id))
 return false; var sScript = target.getAttribute('href'); var bSubmitScript = (sScript != null && sScript.indexOf("javascript:") != -1) ? true : false; if (bSubmitScript) { eval(decodeURIComponent(sScript)); return false; }

 
 if (isFModeLayout())
 {
 if (typeof bPTActEnterKey != "undefined" && !bPTActEnterKey)
 {
 if (target.tagName == "INPUT" && !(target.type == "checkbox" || target.type == "radio"))
 bHaveId = true;  else
 return false; }
 }

 
 if (target && typeof target.form == "undefined")
 return false; }

 
 
 if (key == 27 && bSessionStorage) { sessionStorage.setItem("keyboardKey","ESC"); }

 var modObj = MTop().document.getElementById(MTop().PTMOD_ + MTop().modId); var navBar = MTop().document.getElementById("psNavBar"); var isNavBarOpen = (navBar != null && (navBar.classList.contains("slidein") || navBar.classList.contains("slidein_full"))) ? true : false; if (isTopFModeLayout() && key == 27)
 
 {}
 else if (!isTopFModeLayout() && isNavBarOpen && key == 27)
 
 {}
 else
 {
 var bDisabled = false; if (isFModeLayout())
 {
 if (target.tagName == "A")
 bDisabled = target.getAttribute("aria-disabled") ? target.getAttribute("aria-disabled").indexOf("true") != -1 : false; else if (target.tagName == "LI")
 bDisabled = target.classList.contains("psc_disabled"); }
 if (!bDisabled)
 submitAction_win0(document.win0, bHaveId ? target.id : "#KEY" + code); }
 return false; }
}


function isOnClickCancelBubble(target)
{
 if (!target || typeof target.onclick != "function") return false; var sString = String(target.onclick); if (sString.indexOf("javascript:cancelBubble(event);") == -1)
 return false; return true;}

var oFirstTab_win0 = null;var oLastTab_win0 = null;var oFirstTB_win0 = null;var oLastTB_win0 = null;var oFirstPg_win0 = null;var oLastPg_win0 = null;var nFirstTBIndex = 5000; var nFirstPgIndex = 10000;function checkTabIndex(obj)
{
if (obj.tabIndex && obj.tabIndex >= 0)
{
 if (obj.tabIndex < nFirstTBIndex)
 {
 if (oLastTab_win0 == null || obj.tabIndex > oLastTab_win0.tabIndex)
 oLastTab_win0 = obj; if (oFirstTab_win0 == null || obj.tabIndex < oFirstTab_win0.tabIndex)
 oFirstTab_win0 = obj; }
 else if (obj.tabIndex < nFirstPgIndex)
 {
 if (oLastTB_win0 == null || obj.tabIndex > oLastTB_win0.tabIndex)
 oLastTB_win0 = obj; if (oFirstTB_win0 == null || obj.tabIndex < oFirstTB_win0.tabIndex)
 oFirstTB_win0 = obj; }
 else
 {
 if (oLastPg_win0 == null || obj.tabIndex > oLastPg_win0.tabIndex)
 oLastPg_win0 = obj; if (oFirstPg_win0 == null || obj.tabIndex < oFirstPg_win0.tabIndex)
 oFirstPg_win0 = obj; }
}
}

function setEventHandlers_win0(sFirst, sLast, bMac)
{
var focus1, focus2;focus1 = function (evt) {doFocus_win0(this, true, true);};focus2 = function (evt) {doFocus_win0(this, false, true);};fchange = function(evt) {addchg_win0(this); };var i;if (sFirst!="")
 {
 var docanchors = null; if (isFModeLayout())
 docanchors = document.querySelectorAll('A,.psc_rowact[tabindex]'); else
 docanchors = document.anchors; var docanclen = docanchors.length; for (i = 0; i < docanclen; ++i)
 {
 if (docanchors[i].id == sFirst) break; }
 for (++i; i < docanclen; ++i)
 {
 var anc = docanchors[i]; if (anc.id == sLast) break; checkTabIndex(anc); checkAccessKeys(anc); if (typeof anc.onfocus != "function")
 anc.onfocus = focus1; }
 }

var frm = document.win0;if (!frm) return;var frmlen = frm.length;objBeforeOrAfterFocusSave = null; var objBefore = null; var bAfter = 0; var b = navigator.userAgent.toLowerCase();var bIE = browserInfoObj2.isIE;var bIE8 = (bIE && b.indexOf("trident/4.0;") != -1) ? 1:0; for (i = 0; i < frmlen; ++i)
 {
 var frmi = frm[i]; if (frmi.type=="hidden")
 continue;   if (bIE8 && objToBeFocus && !objBeforeOrAfterFocusSave && !frmi.isDisabled &&
 !(frmi.offsetParent && frmi.offsetParent.offsetParent && frmi.offsetParent.offsetParent.offsetParent &&
 frmi.offsetParent.offsetParent.className == "PSPAGECONTAINER" && frmi.offsetParent.offsetParent.offsetParent.style.visibility == "hidden") )
 {
 if (frmi.id != objToBeFocus)
 {
 objBefore = frmi; if (bAfter && objBefore)
 {
 objBeforeOrAfterFocusSave = objBefore; bAfter = 0; }
 }
 else
 {
 if (objBefore)
 objBeforeOrAfterFocusSave = objBefore; else
 bAfter = 1; }
 }

 checkTabIndex(frmi); checkAccessKeys(frmi); if (typeof frmi.onblur != "function") {
 frmi.onblur = fchange; }

 if (typeof frmi.onchange != "function") {
 frmi.onchange = fchange; }

 if (typeof frmi.onfocus != "function" && !(frmi.type == "checkbox" || frmi.type == "radio"))
 {
 if (!isOnClickCancelBubble(frmi) && typeof frmi.onclick == "function")
 frmi.onfocus = focus1; else
 frmi.onfocus = focus2; }
 else if (frmi.type == "checkbox" || frmi.type == "radio")
 {
 var sScript = frmi.getAttribute('onfocus'); if (!(sScript && sScript.indexOf("doFocus_win0") != -1))
 {
 if (!isOnClickCancelBubble(frmi) && typeof frmi.onclick == "function")
 frmi.addEventListener("focus", focus1); else
 frmi.addEventListener("focus", focus2); }
 }

 }
}

if (window.setKeyEventHandler_win0 == null)
{
 window.setKeyEventHandler_win0 = function ()
 {
 if (typeof(baseKey_win0) != "undefined")
 {
 document.onkeyup = doKeyUp_win0; if (baseKey_win0.indexOf("\r") >= 0 || baseKey_win0.indexOf("\x1b") >= 0)
 document.onkeypress = doKeyPress_win0; }
 document.onkeydown = doKeyDown_win0; }
}

var oTop = null;var oBottom = null;if (window.routeKeyEvent == null)
 {
 window.routeKeyEvent = function(evt)
 {
 var key = getKeyCode(evt); if (key == 57 && oTop != null)
 {
 oTop.focus(); return false; }
 if (key == 220 && oBottom != null)
 {
 oBottom.focus(); return false; }
 return true; }
 }

if (window.checkAccessKeys == null)
{
window.checkAccessKeys = function(obj)
 {
 var attr = obj.getAttribute("PSaccesskey"); if (attr == "9")
 oTop = obj; else if (attr == "\\")
 oBottom = obj; }
}

function setFocus_win0(fldname, indx, oDoc0)
{

if (isFModeLayout() && typeof window.bSkipFocus != "undefined" && window.bSkipFocus) {
 window.bSkipFocus = false; return; }

if (isFModeLayout() && isTriggerField(fldname)) { 
 if (typeof bPTFind == "undefined" || !bPTFind)
 return; }

if((fldname.indexOf("SEARCH_RESULT")!=-1) && typeof bAccessibleLayout !== 'undefined' && bAccessibleLayout) {
 var srchobj = document.getElementById("PSSRCHWRNGMWESSAGE"); if(typeof srchobj !== "undefined" && srchobj!=null){
 srchobj.focus(); return true; }
}
if (isFModeLayout() && (fldname.indexOf("$hdown") != -1 || fldname.indexOf("$srt") != -1)) {
 if (gKeyDownTarget)
 fldname = gKeyDownTarget.id; else {
 DoTabbing(null, null, true); return; }
}

gRichTextField = fldname;if(typeof CKEDITOR != 'undefined')
 {
 for ( var instanceName in CKEDITOR.instances )
 {
 if (instanceName == fldname)
 {
 bRichTextEnabled = 1; gRichTextField = fldname; }
 }
 }

if (bRichTextEnabled == 0)
 {
 var oDoc = null; if (!oDoc0 || typeof oDoc0 == "undefined")
 oDoc = document; else
 oDoc = oDoc0; var obj = null; if (oDoc.win0)
 {
 obj = oDoc.win0.elements[fldname]; if (!obj)
 obj = oDoc.win0[fldname]; }

 if (!obj)
 obj = oDoc.getElementById(fldname); if (!obj && isFModeLayout())
 obj = oDoc.getElementById(fldname + "$PIMG"); if (!obj)
 {
 if (isFModeLayout())
 DoTabbing(null, null, true); else
 findFocusableElement(); return false; }

 if (indx >= 0 && obj.length && indx < obj.length)
 obj = obj[indx]; if (isFModeLayout())
 expandParent(obj); var bRtn = false; if (!oDoc0 || typeof oDoc0 == "undefined")
 bRtn = !tryFocusNew(obj); else
 bRtn = !tryFocus0New(obj); if (isFModeLayout() && !gFocusObj)
 DoTabbing(null, "PT_WRAPPER", true); return bRtn; }
}


function findFocusableElement()
{
 var element, nodeList, container; if( typeof bAccessibleLayout !== 'undefined' && bAccessibleLayout)
 {
 container = document.getElementsByClassName("PSPAGECONTAINER"); if(container)
 nodeList = container[0].querySelectorAll("input,a,textarea,select"); }
 else
 {
 container = document.getElementById(document.win0.name+"divPAGECONTAINER"); if(container)
 nodeList = container.querySelectorAll("input,a,textarea,select"); }
 if(nodeList)
 {
 for (var j = 0; j < nodeList.length; j++)
 {
 element = nodeList[j]; if( element && element.type != "hidden" && element.tabIndex > 0)
 {
 try
 {
 tryFocus0New(element); break; }
 catch(e)
 {
 return; }
 }
 }
 }
 return false;}

function canFocus(obj) {
 if (obj && (obj.tagName == 'INPUT' || obj.tagName == 'A' || obj.tagName == 'SELECT' || obj.tagName == 'BUTTON' || obj.tagName == 'TEXTAREA' 
 || obj.tabIndex == 0))
 return true; else
 return false;}


function tryFocusNew(obj)
{
if (!tryFocus0New(obj))
 gFocusObj = obj;return;}


function tryFocus0New(obj)
{
if (obj && typeof obj.focus != 'undefined' && (typeof bPTFind != 'undefined'
 || !(obj.getAttribute('disabled') == 'disabled') && !obj.disabled && obj.style.visibility != 'hidden' && canFocus(obj)))
 {
 if (obj.getAttribute("disabled"))
 {
 
 var objP = obj.parentElement; if(browserInfoObj2.isMozilla) 
 {
 while (!hasClass(objP, "psc_disabled"))
 objP = objP.parentElement; }
 objP.tabIndex = "-1"; if(browserInfoObj2.isIE) 
 objP.setAttribute("aria-labelledby", obj.id); objP.focus(); }
 else
 obj.focus();  if (typeof(firstFocusID) != "undefined")
 firstFocusID = obj.id; if (browserInfoObj2.isIE) { 
 if (gSetFocusByAjax) {
 obj.blur(); obj.focus(); gSetFocusByAjax = false; }
 }
 if (window.focusHook)
 focusHook(obj); var gn = isGridEl(null, obj.id); if (gn != null)
 ptGridObj_win0.doScrollOnFocus(gn, obj); if (isFModeLayout() && isTouchKeyboard() && obj && ptCommonObj2.isEdibleField(obj))
 doCloseKeyboard(obj); return false; }

 return true;}

function tryFocus(obj)
{
if (!tryFocus0(obj))
 gFocusObj = obj;return;}

function tryFocus0(obj)
{
var url = window.location.href;if(url.search("ptreqfrom=rc") > 0) return;if (obj && typeof obj.focus != "undefined" && !obj.disabled && typeof obj.style != "undefined" && obj.style.visibility!="hidden")
 {
 if (obj.focus)
 {
 try { 
 obj.focus(); }
 catch (err) {
 return true; }
 }
 else if (obj.setActive)
 obj.setActive(); if (window.focusHook)
 focusHook(obj); var gn = isGridEl(null,obj.id); if (gn != null)
 ptGridObj_win0.doScrollOnFocus(gn, obj); if (isFModeLayout() && isTouchKeyboard() && obj && ptCommonObj2.isEdibleField(obj)) {
 doCloseKeyboard(obj); }
 return false; }

return true;}


function setFocusSecPageMessage_win0()
{
var obj;obj = document.getElementById("#ICOK");if (obj)
 return tryFocus(obj);obj = document.getElementById("#ICYes");if (obj)
 return tryFocus(obj);obj = document.getElementById("#ICAbort");if (obj)
 return tryFocus(obj);obj = document.getElementById("#ICRetry");if (obj)
 return tryFocus(obj);}


function delayFocus(id)
{
if (id == "")
 return;var obj = document.getElementById(id);var tgName = obj.tagName;if (tgName.indexOf("SELECT") >=0)
 {
 if (objBeforeOrAfterFocusSave)
 try {
 objBeforeOrAfterFocusSave.focus(); }
 catch (err)
 {}
 }
else if (tgName.indexOf("INPUT") >=0)
 {
 var idArray = id.split("$"); var tmp = idArray[0]; idArray.shift(); var promptId = tmp.concat("$prompt$", idArray.join()); var fObject = document.getElementById(promptId); var popupId = tmp.concat("$popup"); var fObject2 = document.getElementById(popupId); if (fObject)
 fObject.focus(); else if(fObject2)
 fObject2.focus(); else
 {
 if (objBeforeOrAfterFocusSave)
 {
 try {
 objBeforeOrAfterFocusSave.focus(); }
 catch (err)
 {}
 }
 }
 }


if (obj.focus)
 {
 try {
 obj.focus(); }
 catch (err)
 {}
 }
else if (obj.setActive)
 obj.setActive();if (MTop()) 
 MTop().bSetFocusComplete = true;}


if (typeof CKEDITOR != 'undefined') CKEDITOR.on( 'instanceReady', function( ev )
{
 ev.editor.dataProcessor.writer.setRules( 'p',
 {
 indent : false,
 breakBeforeOpen : false,
 breakAfterOpen : false,
 breakBeforeClose : false,
 breakAfterClose : false
 }); for ( var instanceName in CKEDITOR.instances )
 {
 if (instanceName == gRichTextField)
 {
 CKEDITOR.instances[instanceName].focus(); }
 }
});function keyPressHandler(e)
{
 var kCode = (window.event) ? event.keyCode : e.keyCode;  return kCode;}


function UpdateEditorLinkedField()
{
 for ( var instanceName in CKEDITOR.instances )
 {
 if (document.getElementById(instanceName) != null)
 replaceImageSource(instanceName); }
}


function positionWAIT_win0(){
var waitobj = null;var savedobj = null;var objFrame = top.frames['TargetContent'];if (objFrame) {
 waitobj = objFrame.document.getElementById("WAIT_win0"); savedobj = objFrame.document.getElementById("SAVED_win0");}
else {
 waitobj = document.getElementById("WAIT_win0"); savedobj = document.getElementById("SAVED_win0");}

if (waitobj && waitobj.style.display != "none" && waitobj.style.visibility != "hidden")
 keepObjTopRight(waitobj);if (savedobj && savedobj.style.display != "none" && savedobj.style.visibility != "hidden")
 keepObjTopRight(savedobj);}

function isGridEl(evt,objid)
{
if (typeof ptGridObj_win0 == "undefined" || !ptGridObj_win0)
 return null;if (typeof gridList_win0 == "undefined" || typeof gridFieldList_win0 == "undefined")
 return null;var obj = null;var id = '';var nRowCnt = 0;var idarr = '';if (!objid || typeof objid == "undefined") {
 obj = getEventTarget(evt); if (!obj || !obj.id) return null; id = obj.id; nRowCnt = 0; idarr = id.split("$"); if (idarr.length<2) return null; if (isNaN(idarr[1]))
 nRowCnt = idarr[2]; else
 nRowCnt = idarr[1];}
else {
 id = objid; idarr = id.split("$"); if (idarr.length<2) return null; nRowCnt = idarr[1];}

for (var i = 0; i < gridList_win0.length; i++)
{
var gn = gridList_win0[i][0];var gc = document.getElementById('divgc'+gn);if (!gc || typeof gc == "undefined") continue;var gfields = gridFieldList_win0[i];for (var j = 0; j < gfields.length; j++)
{
 var gfield = gfields[j].replace(/%c/,nRowCnt); if (id==gfield)
 return gn;}
}
return null;}



function getGridRowID(oContrl)
{
 var obj = oContrl; var bGrid = false; if (!obj)
 return null; if (!obj.id)
 return null; while (obj && obj.tagName != 'HTML' && obj.tagName != 'FORM')
 {
 if (obj.tagName == "TD")
 {
 if (obj.className.indexOf("GRIDROW") != -1 || obj.className.indexOf("GRIDODDROW") != -1 || obj.className.indexOf("GRIDEVENROW") != -1) 
 {
 bGrid = true; obj = obj.parentNode; continue; }
 else
 return null; }
 
 
 else if (bGrid && (obj.nodeName).indexOf("TR")==0 && ( (obj.id).indexOf("tr")==0 || (obj.id).indexOf("ftr")==0) )
 {
 if (isMoreThanOneGridRow(obj)) 
 return obj.id; else
 return null; }
 else
 obj = obj.parentNode; }


 return null;}


function getNextSibling(obj)
{
 if (!obj)
 return null; var oElement = obj.nextSibling; while (oElement)
 {
 if (oElement.nodeType == 1)
 return oElement; else
 oElement = oElement.nextSibling; }

 return null;}


function getPrevSibling(obj)
{
 if (!obj)
 return null; var oElement = obj.previousSibling; while (oElement)
 {
 if (oElement.nodeType == 1)
 return oElement; else
 oElement = oElement.previousSibling; }

 return null;}



function isMoreThanOneGridRow(oRowObject)
{
 if (!oRowObject)
 return false; var nCnt=1; var objNextSib = getNextSibling(oRowObject); var objPrevSib = getPrevSibling(oRowObject); if (objNextSib && (objNextSib.nodeName).indexOf("TR")==0 && ((objNextSib.id).indexOf("tr") == 0 || (objNextSib.id).indexOf("ftr") == 0) )
 nCnt++; if (objPrevSib && (objPrevSib.nodeName).indexOf("TR")==0 && ((objPrevSib.id).indexOf("tr") == 0 || (objPrevSib.id).indexOf("ftr") == 0) )
 nCnt++; return (nCnt > 1 ? 1 : 0);}

function isGridNav(evt)
{
var gn = this.isGridEl(evt);if (typeof ptGridObj_win0 != "undefined" && ptGridObj_win0 && gn != null)
{
 evt= (evt)? evt: ((event)? event:null); var key = getKeyCode(evt); if (isShiftKey(evt) && key<=40 && key>=37)
 return true;}
return false;}



function initTypeAheadEl(el) {
 var oWin = window; var oDoc = document; var form = el.form; var pId = el.id + "$prompt"; var sPt = el.getAttribute('pt'); var sPt_fn = el.getAttribute('pt_fn'); if (typeof(sPt) !== "undefined" && typeof(sPt_fn) !== "undefined" && sPt && sPt_fn) {
 var sSkipFldNms = ""; var nIndx = 0; while (true) {
 var sSkipFn = el.getAttribute('skipfn' + nIndx); nIndx = nIndx + 1; if ((typeof(sSkipFn) !== "undefined") && sSkipFn && (sSkipFn != "")) {
 if (sSkipFldNms !== "")
 sSkipFldNms = sSkipFldNms + ","; sSkipFldNms = sSkipFldNms + sSkipFn; } else {
 break; }
 if (nIndx > 100) 
 break; }

 if ((typeof(form) !== "undefined") && form) {
 form.PrmtTbl.value = sPt; form.PrmtTbl_fn.value = sPt_fn; form.TA_SkipFldNms.value = sSkipFldNms; } else {
 setElementValueUtil('PrmtTbl', sPt); setElementValueUtil('PrmtTbl_fn', sPt_fn); setElementValueUtil('TA_SkipFldNms', sSkipFldNms); }
 }

 if (document.getElementById(pId))
 icAction = pId; else if (ptCommonObj2.isSearchSearchPage(form))
 icAction = '#ICSrchTypAhd'; else
 {
 var nsuffixIndex = el.id.lastIndexOf('$'); if (nsuffixIndex > -1)
 {
 var fname = el.id.slice(0, nsuffixIndex); var nsuffix = el.id.slice(nsuffixIndex + 1, el.id.length); }
 else
 var fname = el.id; icAction = fname + "$prompt"; if (nsuffixIndex > -1)
 icAction += "$" + nsuffix; }
 var serverScript = "ptTAObj_win0.oWin.pAction_win0(ptTAObj_win0.oDoc.win0,'" + icAction + "');"; el.obj = oWin.ptTAObj_win0.SetProperties(el, 0, form.ICTypeAheadID, serverScript, true, false, false, true, true, 500);  }

 function removeOccursNum(fname) {
 
 var i1 = fname.indexOf('$');  if (i1 < 0) 
 return fname; if (fname.length == i1+1) 
 return fname; var i2 = fname.indexOf('$', i1+1);  if (i2 < 0) 
 return fname.substring(0, i1); if (fname.length == i2+1) 
 return fname; return fname.substring(0, i2+1);  }


 function isTypeAheadEvtTgt(el,kCode) {
 if (el && el.form && !el.form.ICTypeAheadID) return false; if(typeof kCode != 'undefined'){
 if (!el || el.type != 'text' || (el.value == "" && kCode == 9)) return false; }else{
 if (!el || el.type != 'text' || el.value == "") return false; }
 if (typeof el.obj != 'undefined')
 return true; else if (typeof PFieldList_win0 != 'undefined' && PFieldList_win0) {
 var fname = removeOccursNum(el.id); for (var i = 0; i < PFieldList_win0.length; i++) {
 if (fname == PFieldList_win0[i][0] || el.id == PFieldList_win0[i][0]) {
 initTypeAheadEl(el); return true; }
 }
 }
 if (ptCommonObj2.isSearchSearchPage(el.form)) {
 if (typeof EFieldList_win0 != 'undefined' && EFieldList_win0) {
 for (var i = 0; i < EFieldList_win0.length; i++) {
 if (fname == EFieldList_win0[i][0] || el.id == EFieldList_win0[i][0]) {
 initTypeAheadEl(el); return true; }
 }
 }
 }
 return false; }


function isTypeAheadEl(evt)
{
 var el = getEventTarget(evt); var kCode = getKeyCode(evt); return isTypeAheadEvtTgt(el,kCode);}

function isTypeAheadField(id)
{
 var el = document.getElementById(id); return isTypeAheadEvtTgt(el);}

function GenerateABN() {

 
 var abnContainer = document.getElementById("ptabncontainer"); if (abnContainer) {

 
 var abnBCContainer = document.getElementById("ptabnbccontainer");  var abnFlyOutContainer = document.getElementById("ptabnfocontainer");  if (abnBCContainer)
 {
 var abnBCData = abnBCContainer.removeChild(abnBCContainer.firstChild); abnBCContainer.parentNode.removeChild(abnBCContainer); }

 
 if (abnFlyOutContainer)
 {
 var abnFlyOutData = abnFlyOutContainer.parentNode.removeChild(abnFlyOutContainer); }

 
 if (abnContainer) {
 var abnData = abnContainer.removeChild(abnContainer.firstChild); abnContainer.parentNode.removeChild(abnContainer); }

 try {
 if (!isCrossDomain(parent) && typeof(parent.ptIframe) !== "undefined") {
 if (typeof(parent.pthNav) !== "undefined") {
 
 parent.pthNav.abn.updateBC(abnBCData, abnFlyOutData); parent.pthNav.abn.addData(abnData); }
 }
 } catch (e) {}
 }

}

function UpdateBreadCrumbs() {

 if (backNavigation.classicBackButton.isUsed()) { return; }

 bcUpdater.updateBreadCrumbs(document.win0); bcUpdater.removeRemoteData();  backNavigation.setCookie(); if (!isFModeLayout() && (typeof updClassicHistory == 'function')) {
 updClassicHistory(); }

 if (sessionStorage.getItem("isBackBtnAct") != null)
 sessionStorage.removeItem("isBackBtnAct");}


function GetDomData(form, szTC, szActionName) {

 if (typeof bGenDomInfo == 'undefined' || bGenDomInfo == null || !bGenDomInfo)
 return;  var divHiddenFields = document.querySelector("#" + "win0" + "divPSHIDDENFIELDS")
 if (typeof refererURL != 'undefined' && refererURL && divHiddenFields) {
 var urlParts = refererURL.split("?"); if (urlParts.length > 1 && divHiddenFields) {
 var qsStringParams = urlParts[1].replace(/&#039;/g, "'").split("&"); for (var i = 0; i < qsStringParams.length; i++) {
 var qsNameValue = qsStringParams[i].split("=");  if(qsNameValue=='' || qsNameValue[0]=='')continue; var inputEl = divHiddenFields.querySelector("#" + qsNameValue[0]); if (typeof inputEl == "undefined" || !inputEl) { inputEl = document.createElement("input"); }
 inputEl.setAttribute("type", "hidden"); inputEl.setAttribute("name", qsNameValue[0]); inputEl.setAttribute("id", qsNameValue[0]); inputEl.setAttribute("value", qsNameValue[1]); divHiddenFields.appendChild(inputEl); }
 }
 }

 form.target = szTC; form.ICAction.value = szActionName; submitAction_win0(form, szActionName);}

function GenerateFakeBC() {

 
 var bcContainer; try {
 if(top.frames['TargetContent'] && top.frames['TargetContent'].document)
 bcContainer = top.frames['TargetContent'].document.getElementById("pt_fakeBC"); }
 catch (e) {}

 if (bcContainer) {

 
 var abnBCData; if(bcContainer.firstChild) {
 abnBCData = bcContainer.removeChild(bcContainer.firstChild); bcContainer.parentNode.removeChild(bcContainer); try {
 if (!isCrossDomain(parent) && typeof(parent.ptIframe) !== "undefined") {
 if (typeof(parent.pthNav) !== "undefined") {
 
 parent.pthNav.FakeBCUpdate(abnBCData); }
 }
 } catch (e) {} }
 return; }
}


function bcUpdateForPTF() {
 try {
 var dn = top.document.domain;  try {
 if (typeof(top.pthNav) !== "undefined") {
 top.pthNav.doBCUpdateForPTF(); }
 } catch (ex2) {}
 } catch (ex1) {}
}

function preSubmitWorkCenter_win0(arg1, arg2) {
 var isWorkCenter = top.document.getElementById('ptalPgltAreaFrame'); if(!isWorkCenter || !arg1) {return true; }

 
 if(parent.ptIframe || (top.ptalPage.isAccessibilityMode && parent.parent.ptIframe) )
 return preSubmitCheckWorkCenter_win0(arg1,arg2,true);}

function preSubmitCheckWorkCenter_win0(arg1,arg2,bPtreplace) {
if(bPtreplace)
{
if (browserInfoObj2.isIE) {
 if (arg1 != null && typeof arg1.document != "undefined")
 curAnchorObj = arg1.document.getElementById(arg2); }
 else {
 if (arg1 != null && typeof arg1.ownerDocument != "undefined")
 curAnchorObj = arg1.ownerDocument.getElementById(arg2); }

 if((typeof curAnchorObj === 'undefined') || !curAnchorObj)
 return true; var anchorType = curAnchorObj.getAttribute("ptlinktgt"); if(anchorType == null) return true; if((anchorType) && (anchorType !== 'pt_replace'))
 return true;}


if ( ( parent.ptIframe && parent.ptIframe.isWorkCenterDirty() ) || ( top.ptalPage.isAccessibilityMode && parent.parent.ptIframe && parent.parent.ptIframe.isWorkCenterDirty()) ) {
 var cancelFn = function(arg1, arg2) {
 var tgtFrameForm = top.frames['TargetContent'].document.forms[0]; if(tgtFrameForm && (tgtFrameForm.ICChanged))
 tgtFrameForm.ICChanged.value='-1'; submitAction_win0(arg1, arg2); return; }

 
 if ( (parent.ptIframe && parent.ptIframe.saveWarningForWorkCenter(cancelFn,null ,1,arg1, arg2)) ||
 (top.ptalPage.isAccessibilityMode && parent.parent.ptIframe && parent.parent.ptIframe.saveWarningForWorkCenter(cancelFn,null ,1,arg1, arg2)) )
 return false;}
return true;}

function preSubmitProcessSpellcheck_win0(form, name) {
 var spellcheckobj = document.getElementById('SPELLCHECKSTRING'); if (spellcheckobj && spellcheckobj != 'undefined' && RTEspellcheck == true) {
 var spellcheckstring = spellcheckobj.value; if ((name != "#ICSCChange") && (name != "#ICSCAddToPD"))
 {
 var regExp = /\n/g; spellcheckobj.value = ReplaceRTESpellSpaces(spellcheckstring); var revisedText = spellcheckobj.value; var revisedText = revisedText.replace(regExp, "<br />"); spellcheckobj.value = revisedText; }
 }
}

function preSubmitProcessCKEDITOR_win0(form, name) {
 if (typeof CKEDITOR != 'undefined') UpdateEditorLinkedField();}

function preSubmitProcess_win0(form, name) {
 if ((name.indexOf('$delete') > 0 || name.indexOf('$srt') > 0) && typeof (preID_win0) != 'undefined' && preID_win0 != null)
 preID_win0 = null;  if (form == null) {
 form = document.forms['win0']; form.style.display = 'block'; }
 preSubmitProcessSpellcheck_win0(form, name); preSubmitProcessCKEDITOR_win0(form, name);    if (!isFModeLayout()) {
 if (typeof bcUpdater.getStoredData(bcUpdater.isMenuCrefNav) == 'undefined' || bcUpdater.getStoredData(bcUpdater.isMenuCrefNav) == null) {
 bcUpdater.setStoredData(bcUpdater.isMenuCrefNav, "P"); }
 }
}

function isLoaderInProcess()
{
if (loader != null && loader.GetInProcess())
 return true;return false;}

function aAction0_win0(form, name, params, bAjax, bPrompt, sAjaxTrfUrl, bWarning, sScriptAfter, nTrfURLType)
{
if (isFModeLayout() && isPopupRequest(form, name)) {
 form.ICAction.value = "None"; return;}
var modObj = top.document.getElementById(top.PTMOD_ + top.modId);if (modObj) {
 if (isFModeLayout() && (bInModal || modObj.sCancelName == name) ) {
 var oLastModalWin = getLastModalWin(); if (oLastModalWin) {
 var objButton = oLastModalWin.document.getElementById(name); if (objButton && objButton.getAttribute("pt_promptclear") || modObj.sCancelName == name) {
 form.ICModelCancel.value = 1; oLastModalWin.document.chgFldArr_win0 = new Array(); } else {
 
 form.ICModelCancel.value = 0; }
 }
 }
}


if (typeof sessionStorage != "undefined" &&
 sessionStorage.getItem("keyboardKey") && sessionStorage.getItem("keyboardKey") == "ESC" &&
 sessionStorage.getItem("divPopupClosed") && sessionStorage.getItem("divPopupClosed") == "1") {
 
 
 sessionStorage.removeItem("divPopUpParentId"); sessionStorage.removeItem("keyboardKey"); sessionStorage.removeItem("divPopupClosed"); processing_win0(0, 3000); return;} else if (typeof sessionStorage != "undefined") {
 
 sessionStorage.removeItem("divPopUpParentId"); sessionStorage.removeItem("keyboardKey"); sessionStorage.removeItem("divPopupClosed");}


if (typeof bSearchDialog_win0 != 'undefined' && !bDoModal_win0 && bSearchDialog_win0 && form.ICAction.value.indexOf("\x1b") >=0)
 {
 processing_win0(0, 3000); return; }


if (loader != null && loader.GetInProcess2() && loader.formname != null && form.name != null && loader.formname == form.name) return;if (loader != null && loader.GetInProcess())
 {
 if ((loader.GetWaitingICAction() == "" && loader.GetInProcessICActionValue() != name && name == "#ICSave") ||
 (loader.formname != null && form.name != null && loader.formname != form.name))
 loader.SetWaitingObject(form, name, params, bAjax, bPrompt); return; }

if (typeof ptGridObj_win0 != 'undefined' && ptGridObj_win0)
 ptGridObj_win0.saveScrollPos();if (isFModeLayout() && !(typeof form.ICTypeAheadID != 'undefined' && form.ICTypeAheadID.value != ''))
 if (typeof doCloseKeyboard === 'function')
 doCloseKeyboard();form.ICResubmit.value=nResubmit;form.ICAction.value=name;form.ICXPos.value = ptCommonObj2.getScrollX();form.ICYPos.value = ptCommonObj2.getScrollY();bcUpdater.getAdvSrchLblFrmCriteria(name, form);var waitingObjList = null;if (loader != null && loader.GetWaitingICAction() != "")
 waitingObjList = loader.GetWaitingObjectList();if (typeof bAjax != "undefined" && !bAjax && (typeof params == "undefined" || params == null || params == "") && (typeof popupObj_win0.isModalWidget == "undefined" || !popupObj_win0.isModalWidget))
 form.submit();else
 loader = new net2.ContentLoader(postUrl_win0, form, name, null, null, null, params, null, bAjax, bPrompt, null, null, null, sAjaxTrfUrl, bWarning, sScriptAfter, nTrfURLType);if (waitingObjList != null)
 loader.WaitingObjQueue = waitingObjList;}

function pAction_win0(form, name, efieldname)
{
if(typeof CKEDITOR != 'undefined')UpdateEditorLinkedField();if ((loader != null) && (loader.GetInProcess())) return;form.ICAction.value = name;form.ICXPos.value = ptCommonObj2.getScrollX();form.ICYPos.value = ptCommonObj2.getScrollY();if (typeof form.ICTypeAheadID != 'undefined' && form.ICTypeAheadID.value != '') {
 
 if (pm)
 pm.updateTypeaheadMsgEvent(name); var flag = form.ICActionPrompt.value; form.ICActionPrompt.value = 'false'; var ret = aAction_win0(form, name, "", true, 1); form.ICActionPrompt.value = flag; return ret;}
else {
 
 if (pm)
 pm.updatePromptMsgEvent(name); form.ICActionPrompt.value = 'true'; return aAction_win0(form, name, "", true, true);}
}

function mAction_win0(form, name, height, width, title, bModalElement, bSizeOnLoad)
{
 form.ICAction.value = name; form.ICXPos.value = ptCommonObj2.getScrollX(); form.ICYPos.value = ptCommonObj2.getScrollY(); aAction_win0(form, name, null, true, false);}




function getRowElement(form, name)
{
 var el = document.getElementById(form.name + "srchdiv" + name); if (!el) return; while ((el.parentElement.nodeName != 'TR') && (el.parentElement.nodeName != 'LI'))
 el = el.parentElement; return el.parentElement;}


function getActionParam()
{
 var sAction = "U"; var sRet = "&Action=" ; var sRetVal = sRet.concat(sAction); var el_c = document.getElementById("PTS_UPDATE_HIST$chk"); if (el_c) 
 {
 if (el_c.value == "Y")
 sAction = "C"; }
 if (sAction != "C")
 {
 var el_l = document.getElementById("PTS_INCLUDE_HIST$chk"); if (el_l) 
 {
 if (el_l.value == "Y")
 sAction = "L"; }
 }
 sRetVal = sRet.concat(sAction); return sRetVal;}

function changeKeyList_win0(obj, form, name, params)
{
 
 
 const queryString = window.location.search; const urlParams = new URLSearchParams(queryString); const ispreviewMode = urlParams.get('previewMode'); if (ispreviewMode == "Y") {
 return; }
 
 params = params.concat(getActionParam()); aAction_win0(form, name, params); var searchObj = document.getElementById('PT_SEARCH'); addClass(searchObj, 'side'); addClose(searchObj); closeSide1FullScreen(); doCloseModal(MTop().modId); if (obj == window)
 obj = getRowElement(form, name); SetSearchStatus(obj, form);}



function updateFromPrompt_win0(obj, form, name, params) {
 aAction_win0(form, name, params);}

function updateFromInPrompt_win0(obj, form, name, params) {
 var res = []; var arr1 = document.querySelectorAll(".ps_prompt-resultsgrid .ps_grid-body .psc_on"); for (var i = 0; i < arr1.length; i++)
 res.push(arr1[i].parentElement.parentElement.parentElement.querySelector(".ps_box-value").firstChild.nodeValue); var objHidden = document.getElementById("PT_WORK_PT_PROMPT_TEMP_IN"); objHidden.value = res.join(","); addchg_win0(objHidden); aAction_win0(form, name, params);}

function getFormName() {
 var sFormName = "win0"; return sFormName;}



function doModalURL(url, options) {
 var moptions = 'bCrossDomain@1;bPIA@0;bClose@1;bCenter@1;sTitle@Page Title;'; if (ptConsole2.isActive() && !bPerf)
 ptConsole2.append((new Date()).valueOf() + "doModalURL url:\n" + url + "\n"); moptions += options; window.modWin = showModalDialog_pt(url, window, moptions);}

function doModeless(url, options) {
 var findApos = '&#39;'; var re = new RegExp(findApos, 'g'); options = String(options).replace(re, "'"); var moptions = 'bModeless@1;bPIA@1;closeUrl@' + modalCloseUrl + ';closeAlt@' + modalCloseAlt + ';resizeUrl@' + modalResizeUrl + ';resizeAlt@' + modalResizeAlt + ';moveAlt@' + modalMoveAlt + ';'; if (top.window.isFModeLayout() &&
 (options == -1 || options.indexOf("bRCFGrouplet@1") != -1)) 
 moptions = 'bModeless@1;bPIA@1;bAutoClose@0;'; else if (top.window.isFModeLayout())
 moptions = 'bModeless@1;bPIA@1;bAutoClose@1;'; if (options == -1 || options.indexOf("bCrossDomain@1") == -1) {
 if (url.indexOf('?') == -1)
 url += '?ICDoModeless=1'; else
 url += '&ICDoModeless=1'; if (options == -1)
 options = ""; }
 if (ptConsole2.isActive() && !bPerf)
 ptConsole2.append((new Date()).valueOf() + "modeless url:\n" +url +"\n"); if (typeof MTop().window.modLessWinArr == 'undefined')
 MTop().window.modLessWinArr = new Array(); moptions += options; if (moptions.indexOf("bRCFModal@1") != -1 && isModeless(MTop().modId))
 
 moptions = moptions.replace(/bPIA@1/g, "bPIA@0"); window.modLessWin = showModalDialog_pt(url, window, moptions); function checkForReadiness()
 {
 if (window.modLessWin && window.modLessWin.contentWindow)
 {
 try {
 if (window.modLessWin.contentWindow.document.readyState == "complete")
 {
 setModWinID = setModlessWinParent(); return; }
 setTimeout(checkForReadiness, 1000); }
 catch (err)
 {
 setTimeout(checkForReadiness, 1000); }
 }
 }

 setTimeout(checkForReadiness, 1000); try {
 MTop().window.modLessWinArr.push(window.modLessWin); } catch(e) {
 }
}




function doTransfer(url) {
 loader2 = new net2.ContentLoader(url, null, null,'GET');}

function doModlessOnLoad_win0() {
 if (window.name.length == 0)
 window.name = "win0"; document.win0.target = window.name;}


function doModal(url, bPrompt, oParentWin, sCancelName, form, name, sPopupOptions, sResponseHTML) {
 doCloseLocalModals(); if (typeof(oParentWin.modWin) != 'undefined' && oParentWin.modWin != null) {
 closeModal(oParentWin.modWin.modalID); oParentWin.modWin = null; }

 var options = 'bPIA@1;'; var bPopup = 0; if (isFModeLayout()) {
 var sOptionsDefault = "bCenter@1;bAutoClose@0;bHeader@0;"; options += sOptionsDefault; if (sPopupOptions) {
 if (sPopupOptions.length > 0 && sPopupOptions.indexOf("bPopup@1") != -1 && sPopupOptions.indexOf("sPopupParentId") == -1 && sPopupOptions.indexOf("sPopupParentQS") == -1)
 options += "sPopupParentId@" + name + ";"; options += sPopupOptions; }
 bPopup = 1; }
 if (!bPopup)
 options += 'closeUrl@' + modalCloseUrl + ';closeAlt@' + modalCloseAlt + ';resizeUrl@' + modalResizeUrl + ';resizeAlt@' + modalResizeAlt + ';moveAlt@' + modalMoveAlt + ';'; if (bPrompt == 1) {
 options += "bClose@1;"; }

 if (typeof sCancelName != "undefined" && sCancelName != null && sCancelName.length > 0) {
 if (isFModeLayout())
 options += 'sCancelName@' + sCancelName + ';'; else
 options += 'bClose@1;sCancelName@' + sCancelName + ';'; }

 var nWaitMSec = 1000; var bWriteReponse = false; if (isFModeLayout() && !browserInfoObj2.isIE && !browserInfoObj2.isFF && !browserInfoObj2.isChrome && typeof sResponseHTML != "undefined")
 bWriteReponse = true; if (bWriteReponse)
 url = "about:blank"; else {
 if (ptConsole2.isActive() && !bPerf)
 ptConsole2.append((new Date()).valueOf() + "modal url:\n" + url + "\n"); }
 window.modWin = showModalDialog_pt(url, window, options, null, null, form, name); if (bWriteReponse) {
 nWaitMSec = 50; window.modWin.contentDocument.write(sResponseHTML); setModWinID = setModWinParentPIA(); }
 function isModalReady() {
 if (bWriteReponse) {
 try {
 if (typeof window.modWin.bLoadCompleted != "undefined" && window.modWin.bLoadCompleted) {
 window.modWin.onLoadExt_win0(); return; }
 setTimeout(isModalReady, nWaitMSec); }
 catch (err) {
 setTimeout(isModalReady, nWaitMSec); }
 }
 else if (window.modWin && window.modWin.contentWindow) {
 try {
 if (window.modWin.contentWindow.document.readyState == "complete") {
 setModWinID = setModWinParentPIA(); return; }
 setTimeout(isModalReady, nWaitMSec); }
 catch (err) {
 setTimeout(isModalReady, nWaitMSec); }
 }
 }

 setTimeout(isModalReady, nWaitMSec);}

function setWinParent_win0() {
 
}

function setModWinParentPIA() {
 if (setModWinParent())
 document.win0.ICResubmit.value = 0;}

function doCancelMsg() {
 aAction_win0(document.win0, '#ICCancel');}

function isModalCancel(name) {
 if (window.modalID) {
 if (name.indexOf(getCancelId(window.modalID)) != -1)
 return true; }
}

function getCancelId (modid) {
 var modObj = MTop().document.getElementById("ptMod_" + modid); if (modObj.sCancelName.length > 0) return modObj.sCancelName; var sCloseId = '#ICCancel'; if (!document.getElementById(sCloseId) && document.getElementById("#ICReturn"))
 sCloseId = '#ICReturn'; return sCloseId;}

function doCancel(sCancelName) {

 var sCloseId= ''; if (typeof sCancelName != 'undefined' && sCancelName.length > 0 && (sCancelName !== " ") && 
 document.getElementById(sCancelName))
 sCloseId = sCancelName; else {
 sCloseId= '#ICCancel';  }
 if (typeof window.bMFormSubmit != 'undefined') {
 if (!window.bMFormSubmit)
 document.win0.ICAction.value = "None"; else {
 winParent.modWinClosed = null; return; }
 }

 if (browserInfoObj2.isIE && typeof window.modWin != 'undefined' && window.modWin != null) {
 var win = window.modWin; if (win.document) {
 var fm = win.document.win0; if (!fm) fm = window.document.win0; fm.ICAction.value = sCloseId; document.win0.ICAction.value = "None"; }
 }
 if (!winParent && sCloseId != "#ICCancel") {
 aAction_win0(document.win0, sCloseId); return; }
 try {
 document.win0.target = winParent.name; if (document.win0.ICAction.value != "None") return; if (typeof window.bMFormSubmit != 'undefined')
 winParent.modWinClosed = null; winParent.nResubmit = 0; if (window.document.win0.enctype.indexOf('multipart') != -1 && typeof window.bMFormSubmit != 'undefined' && !window.bMFormSubmit) {
 winParent.document.win0.ICAction.value = "None"; winParent.MTop().ptCommonObj2.hidePopupMask(); closeModal(modalID); }
 
 else if (sCloseId != "#ICCancel")
 aAction_win0(document.win0, sCloseId); else
 {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + modalID); if ((typeof modObj != 'undefined') && modObj && modObj.bRCFModal &&
 (typeof(winParent.aAction_win0) == 'undefined'))
 {
 try
 {
 closeModal(modalID); }
 catch (err) {}
 if (typeof window.modWin != 'undefined')
 window.modWin = null; if (typeof winParent!= 'undefined' && typeof winParent.modWin != 'undefined')
 winParent.modWin = null; }
 else
 winParent.aAction_win0(document.win0, sCloseId); }
 if (winParent.winParent)
 ptCommonObj2.hidePopupMask(winParent); else
 ptCommonObj2.hidePopupMask(MTop()); }
 catch (err) {
 if (typeof closeModal == 'function') {
 closeModal(); }
 }
}

function closeModWin_win0() {
 if ((typeof window.modWinClosed != 'undefined') && window.modWinClosed) {
 window.modWin = null; window.modWinClosed = false; return; }
 if (window.modWin) {
 try {
 window.modWin.document.win0.ICAction.value = '#ICCancel'; closeModal(window.modWin.modalID); }
 catch (err) {
 }
 }
 window.modWin = null;}


function onParentUnload_win0() {
 if ((typeof window.modWin != 'undefined') && window.modWin) closeModWin_win0();}

function doModalOnLoad_win0(bStartUp, bFileDetach, bNoParent) {
 mTop = MTop();  if (isFModeLayout() && bNoParent) {
 window.bDoModal = true; if (mTop) resizeModalDialog_pt(mTop.modId); return; }
 try
 {
 if (!mTop || typeof mTop.oParentWin == 'undefined' || !mTop.oParentWin) return; }
 catch (err) {
 return; }
 if (bStartUp || bFileDetach) {
 winParent = mTop.oParentWin; dialogArguments = mTop.oParentWin; modalID = mTop.modId; window.name = "modWin_" + mTop.modId; if (bStartUp) {
 if (modalZoomName != null) {
 var zObj = winParent.document.getElementById(modalZoomName); if (zObj) zObj.style.display = 'none'; }
 if ((mTop.modlessId == -1 || mTop.modlessId != mTop.modId)
 && winParent.document && typeof winParent.document.win0 != 'undefined')
 winParent.processing_win0(0, 3000); resizeModalDialog_pt(modalID); }
 }
 else if (modalID != null) {
 if (modalZoomName != null) {
 var zObj = document.getElementById(modalZoomName); if (zObj && zObj.innerHTML.indexOf("CKEDITOR") == -1) {
 var modObj = MTop().document.getElementById(MTop().PTMOD_ + modalID); resizeZoomGrid(modalZoomName,ptCommonObj2.getWidth(modObj), ptCommonObj2.getHeight(modObj)); }
 }
 resizeModalDialog_pt(modalID, true); }

 if (window.document.win0.enctype.indexOf('multipart') != -1)
 window.bMFormSubmit = false;}

function doUpdateParent(form, name) {
 if (typeof winParent != 'undefined' && winParent != null) {
 nResubmit++; if (nResubmit > 1) 
 return; }
 if (typeof winParent == 'undefined' || winParent == null ) {
 submitAction_win0(document.win0, name); return; }
 if (winParent.bDefer && name.indexOf("#ICCancel") != -1 && bPromptPage_win0) {
 winParent.bCleanHtml = false; winParent.loader = null; winParent.document.win0.ICStateNum.value = document.win0.ICStateNum.value; winParent.aAction_win0(winParent.document.win0, '#ICCancel'); var cObj = winParent.document.getElementById("pt_modals"); if(cObj) cObj.style.display = "none"; } else {
 processing_win0(1, 3000); form.target = winParent.name; form.ICAction.value = name; if (typeof CKEDITOR != 'undefined') UpdateEditorLinkedField(); winParent.loader = null; if (pm)
 pm.updateParentMsgData(winParent,name);  winParent.aAction_win0(form, name); }
}

function doModalMFormSubmit_win0(form, name) {
 if (name.indexOf("#ICCancel") != -1) {
 winParent.bCleanHtml = false; winParent.loader = null; winParent.document.win0.ICStateNum.value = document.win0.ICStateNum.value; winParent.aAction_win0(winParent.document.win0, '#ICCancel'); return; }
 window.bMFormSubmit = true; submitAction_win0(form, name); doModalMFormClose_win0();}

function doModalMFormClose_win0() {
 winParent.bUpLoadProgress = true; winParent.nResubmit = 1; winParent.document.win0.ICStateNum.value = document.win0.ICStateNum.value; winParent.loader = null; winParent.aAction_win0(winParent.document.win0, 'Resubmit'); if (typeof window.winParent != 'undefined' && window.winParent.winParent != null)
 ptCommonObj2.hideParModalMask(window.winParent); else
 ptCommonObj2.hidePopupMask(MTop()); if (!isFModeLayout())
 hideModal(window.modalID);}

function doUpdateFirstParent(form, name, firstParent) {
 form.target = firstParent.name; form.ICAction.value = name; if (typeof CKEDITOR != 'undefined') UpdateEditorLinkedField(); firstParent.loader = null; firstParent.aAction_win0(form, name); if (typeof window.winParent != 'undefined' && window.winParent.winParent != null)
 ptCommonObj2.hidePopupMask(window.winParent); else
 ptCommonObj2.hidePopupMask(MTop()); hideModal(window.modalID);}

function resizeZoomGrid(id, w, h) {
 if (typeof gridList_win0 == 'undefined') 
 return; var nMinHeight = 140;  var exp = "win0" + "div";  var gNameParts = id.split(exp); var gToolBar = "win0" + "divG" + gNameParts[1]; var gSParts = gNameParts[1].split("$"); var gName = gSParts[0]; var gSID = gSParts[0] + "$scrolli$" + gSParts[1]; var gNavBar = exp + gSParts[0] + "GP$" + gSParts[1];  var gScrollAreaID = "divgbr" + gNameParts[1];  var gScrollAreaHdrID = "divghrc" + gNameParts[1]; var gFrozenAreaID = "divgbl" + gNameParts[1];  var mRight = document.getElementById(gScrollAreaID); var mRightHdr = document.getElementById(gScrollAreaHdrID); var bIsVSVisible = false; if (mRight && mRightHdr)
 {
 oColHeader = mRightHdr.children[0].children[0].children[0].children[0]; oLastColHeader = oColHeader.children[oColHeader.children.length - 1]; if (oLastColHeader.children[0].tagName == 'SPAN' && (oLastColHeader.children[0].innerHTML == '<NOBR>&nbsp;</NOBR>') || (oLastColHeader.children[0].innerHTML == '<nobr>&nbsp;</nobr>'))
 bIsVSVisible = true; }

 if (!bIsVSVisible)
 return; if (mRight && mRightHdr)
 {
 var nMaxBodyHeight = mRight.children[0].offsetHeight;  if (browserInfoObj2.isIE)
 nMaxBodyHeight = nMaxBodyHeight - 5; if (nMaxBodyHeight < 140)
 nMinHeight = nMaxBodyHeight; if (browserInfoObj2.isSafari)
 nMaxBodyHeight = mRight.offsetHeight; var nHdrHeight = mRightHdr.offsetHeight; var nOthHeight = 150; var nMaxTmpHeight = h - nOthHeight; var nMaxHeight = nMinHeight; if (nMaxTmpHeight > 0 && nMaxTmpHeight < nMaxBodyHeight && nMaxTmpHeight > nMinHeight)
 nMaxHeight = nMaxTmpHeight; else if (nMaxTmpHeight > nMaxBodyHeight)
 nMaxHeight = nMaxBodyHeight; var oS = null; var nGridNewHeight = 0;   var oS1 = document.getElementById(gSID);  if (oS1 == null)
 {
 gSID = gSParts[0] + "$scrollm$" + gSParts[1]; oS1 = document.getElementById(gSID); if (oS1 == null)
 {
 gSID = gSParts[0] + "$scroll$" + gSParts[1]; oS1 = document.getElementById(gSID); if (oS1 == null)
 return; }
 }

 oS1.id = gSID+"zzzz";  oS = document.getElementById(gSID); if (!oS)
 oS = oS1; oS1.id = gSID;  nGridNewHeight = oS.offsetHeight + nMaxHeight - ptCommonObj2.getPixValue(mRight.style.height); mRight.style.height = nMaxHeight + 'px';  if (browserInfoObj2.isSafari)
 oS.style.height = nGridNewHeight + 'px';  else
 {
 if (browserInfoObj2.isIE)
 oS.style.height = nGridNewHeight + 'px';  else
 oS.style.height = nGridNewHeight + 6 + 'px';  var oTabElm = document.querySelector("[data-id='tblpstabs']");  var oTabTd = document.querySelector('td.PSGRIDTABBACKGROUND'); if (oTabElm && oTabTd)
 oTabTd.style.height = oTabElm.offsetHeight + 'px'; var oNavElm = document.getElementById(gNavBar); if (oNavElm)
 oNavElm.parentNode.style.height = oNavElm.offsetHeight + 'px'; }
 }

 var mLeft = document.getElementById(gFrozenAreaID);  if (mLeft)
 mLeft.style.height = (mRight.offsetHeight) + 'px'; var mToolBar = document.getElementById(gToolBar); if (mToolBar)
 mToolBar.style.width = (mLeft.offsetWidth + mRight.offsetWidth) + 'px';}


function AgPostMessage(){
 if ((typeof top.ptaiAguide=='object') && top.ptaiAguide.ptaiItemId!=null && top.ptaiAguide.ptaiItemId) {
 var iframes=parent.parent.document.getElementsByTagName('iframe'); for(i=0;i<iframes.length;i++){
 
 if(/ptalPgltAreaFrame/.test(iframes[i].id)){
 try {
 if (top.ptaiAguide.ptaiPostProc!=null && top.ptaiAguide.ptaiPostProc) {
 pm.postMessage(top.ptaiAguide.ptaiItemId+",save", ((iframes[i].contentWindow.document) ? iframes[i].contentWindow.document : iframes[i].contentDocument).location.href, iframes[i].contentWindow); }
 else {
 if (top.ptaiAguide.ptaiSaveNextBtnId!=null && top.ptaiAguide.ptaiSaveNextBtnId && top.ptaiAguide.ptaiButtonAction!=null && top.ptaiAguide.ptaiButtonAction=='next') {
 top.ptaiAguide.ptaiButtonAction=""; pm.postMessage(top.ptaiAguide.ptaiItemId+",next"+","+top.ptaiAguide.ptaiListId, ((iframes[i].contentWindow.document) ? iframes[i].contentWindow.document : iframes[i].contentDocument).location.href, iframes[i].contentWindow); }
 else {
 if (top.ptaiAguide.ptaiSavePrevBtnId!=null && top.ptaiAguide.ptaiSavePrevBtnId && top.ptaiAguide.ptaiButtonAction!=null && top.ptaiAguide.ptaiButtonAction=='prev') {
 top.ptaiAguide.ptaiButtonAction=""; pm.postMessage(top.ptaiAguide.ptaiItemId+",prev"+","+top.ptaiAguide.ptaiListId, ((iframes[i].contentWindow.document) ? iframes[i].contentWindow.document : iframes[i].contentDocument).location.href, iframes[i].contentWindow); }
 }
 }
 } catch(e) {alert(e);}
 }
 }
 }
}

function goToServer_Ch(strCntr)
{

strCntr+="A";submitAction_win0(document.win0,strCntr);}





var bIsPagelet_win0 = "false", sPageletName_win0 = "";ResetGlyph_win0 = function() {
 if (typeof(sGlyphList_win0) !== "undefined" && sGlyphList_win0 !== "") {
 HideGlyph(sGlyphList_win0); }
}

setPageletInfoInCtxmenu_win0 = function(isPagelet,sPgltName) {
 bIsPagelet_win0 = (isPagelet === "false") ? "false" : "true"; sPageletName_win0 = (typeof(sPgltName) !== "undefined" && sPgltName && sPgltName !== "") ? sPgltName : "";}


window.PT_typeahead = function(){};PT_typeahead.prototype = {
init:function(oWin,oDoc,oForm,url_up,url_dn,url_close,nDelayTime){
 this.oWin = oWin; this.oDoc = oDoc; this.oForm = oForm; this.url_up = url_up; this.url_dn = url_dn; this.url_close = url_close; this.arrOptions=new Array();  this.arrHeaders=new Array();  this.arrMatches=new Array();  this.strLastValue=""; this.bMadeRequest; this.theTextBox=null; this.objLastActive; this.currentValueSelected=-2; this.bNoResults = false; this.nDelayTime=nDelayTime; this.isDelayTiming =true; this.isTiming =true; this.isOpera=(navigator.userAgent.toLowerCase().indexOf('opera')!=-1); this.countForId=0; this.currentTotalRow=0;  this.startPos=0; this.maxRange=3;  this.ndisplay=1;  this.bScrolldownImage=0;  this.bStartNewList = 0;  this.promptWidth=0; this.opValue=-1; this.bodyScrollTop=0; this.bodyScrollLeft=0; this.noMatchingDataMessage = "No matching values were found.";if (isFModeLayout())
{
 this.undeStart="<span class='psc_strong'>"; this.undeEnd = "</span>"; this.selectSpanStart="<span class='ps_box-value' "; this.selectSpanEnd='</span>'; this.tableStart = "<table class='ps_grid-flex ps_grid-typeahead psc_grid-highlightrow'>"; this.tableEnd = "</table>"; this.trHStart = "<tr class='ps_grid-head-row'>"; this.trStart = "<tr class='ps_grid-row'>"; this.trEnd="</tr>"; this.tdStart = "<td class='ps_grid-cell'>"; this.tdEnd = "</td>"; this.thStart = "<th scope='col' class='ps_grid-col'><div class='ps_box_grid-col'>"; this.thEnd="</div></th>";}
else
{
 this.undeStart="<span class='spanMatchText'>"; this.undeEnd="</span>"; this.selectSpanStart="<span style='width:100%;display:block' class='spanNormalElement' onmouseover='ptTAObj_win0.SetHighColor(this)' "; this.selectSpanEnd='</span>'; this.tableStart="<table class='PSSRCHRESULTSTITLE' id='ttable' dir=\'"+'ltr'+"' cellpadding='1' cellspacing='0'>"; this.tableEnd="</table>"; this.trStart="<tr align=\'"+'left'+"\'>"; this.trEnd="</tr>"; this.tdScrollStart="<td class='PSSRCHRESULTSEVENROW' align='center' colspan='"; this.tdODDStart="<td class='PSSRCHRESULTSODDROW' nowrap='nowrap'>"; this.tdEVENStart="<td class='PSSRCHRESULTSEVENROW' nowrap='nowrap'>"; this.tdEnd="</td>"; this.thStart="<th scope='col' class='PSTARESULTSHDR' nowrap='nowrap'><span class='PSTARESULTSHDR'>"; this.thEnd="</span></th>"; this.header="<tr align=\'"+'left'+"\'><th scope='col' class='PSTARESULTSHDR' ><span class='PSTARESULTSHDRR' name='#ICSortCol0'>User ID</span></th><th scope='col' class='PSTARESULTSHDR' ><span class='PSTARESULTSHDR' name='#ICSortCol1'>Description</span></th></tr>"; }
 this.bTabPressed = false; this.bKeyUp = false; this.bKeyDown = false; this.lastIntKey = -1; this.bGrabHighlighted = false;  this.typeAheadProcessedValue = "";  this.currentTypeAheadField = "";  this.bStaledResult = false;  this.bLostFocus = true;  this.bInProcess = false;  this.BACKSPACE = 8; this.TAB = 9; this.ENTER = 13; this.SHIFT = 16; this.CTRL = 17; this.ALT = 18; this.CAPLOCK = 20; this.ESCAPE = 27; this.END = 35; this.LEFTARROW = 37; this.UPARROW = 38; this.RIGHTARROW = 39; this.DOWNARROW = 40; this.EQUALSIGN = 187; this.FORWARDSLASH = 191; this.OPENBRACKET = 219; this.BACKSLASH = 220; this.CLOSEBRACKET = 221; var ptObj = oDoc.getElementById("pt_typeahead0"); if (ptObj)
 ptObj.style.display = 'none'; }
};var ptTAObj_win0 = new PT_typeahead();function CreateRCMenu4PVG(sPvtGridName,nContext,nLeft,nTop,sActions,sPvgData,BulkActions)
{
var strAction = sPvtGridName+"$PVGCTXMENU~";strAction += nContext+"~"+nLeft+"~"+nTop;if (typeof BulkActions != "undefined" && BulkActions)
strAction += "~"+BulkActions;var ch9=String.fromCharCode(9);var elemPVGAct = document.getElementById("ICPVGActMenu");if (elemPVGAct)
 elemPVGAct.value = sActions;var elemPVGData = document.getElementById("ICPVGData");if (elemPVGData)
 elemPVGData.value = sPvgData;submitAction_win0(document.win0,strAction);}

InvokePageAppCls = function(sServname,sData)
{
var sFormName = "win0";var form = document.forms[sFormName];if (typeof form.ICAppClsData != 'undefined')
 form.ICAppClsData.value = sData;var sAppServname = "$APPCLS#"+sServname;submitAction_win0(document.win0,sAppServname);}

IsRCFConfigured4PVG = function(FormName, sPvtGridName, nContext, sPvgData) {
try {
 if (!FormName) return false ; var strAction = sPvtGridName + "$PVGRCFMENUQRY~"; strAction += nContext; var form = document.forms[FormName]; form.ICAction.value = strAction; if (typeof form.ICPVGData != 'undefined')
 form.ICPVGData.value = sPvgData; var resPTxt = ""; var xmlDoc = null; var sLoader = new net2.ContentLoader(postUrl_win0, form, null, "post",function(){},
 null, null, "application/x-www-form-urlencoded",
 1, 0, null, false); if (sLoader == null || sLoader.req == null) return false; if (window.ActiveXObject)
 {
 if ((sLoader.req.responseXML != null && sLoader.req.responseXML != 'undefined') &&
 (sLoader.req.responseXML.parseError != null && sLoader.req.responseXML.parseError != 'undefined') &&
 (sLoader.req.responseXML.parseError.errorCode == 0 && sLoader.req.responseXML.xml != "")) 
 xmlDoc = sLoader.req.responseXML; else { 
 xmlDoc = sLoader.createIEXMLParser(); xmlDoc.async = "false"; try {
 xmlDoc.loadXML(sLoader.req.responseText); }
 catch (e) {
 return false; }
 }
 }
 else
 {
 var parser=new DOMParser(); xmlDoc = parser.parseFromString(sLoader.req.responseText, "text/xml"); if (xmlDoc.documentElement.nodeName=="parsererror") {
 var sText = sLoader.req.responseText; if (sText.indexOf("\u001E") != -1) {
 bRecSep = 1; sText = sText.replace(/\u001E/g, "&#30;");  }
 if (sText.indexOf("\u0001") != -1) {
 bSOH = 1; sText = sText.replace(/\u0001/g, "&#1;");  }

 xmlDoc=parser.parseFromString(sText,"text/xml"); if (xmlDoc.documentElement.nodeName=="parsererror") {
 return false; }
 }
 }
 var scriptList = xmlDoc.getElementsByTagName("GENSCRIPT"); if (scriptList)
 {
 for (var i = 0; i < scriptList.length; i++) {
 var sTmp = (scriptList[i].firstChild.data).toLowerCase(); sLoader = null; if (sTmp == "true")
 return true; else
 return false; }
 }
 sLoader = null; return false;}
catch (e) {
 return false; }
}




function doFolder(form, pid, fid) {
 gobj = document.getElementById(fid); obj = gobj.children[0]; if (gobj.children.length > 1)
 obj = gobj.children[1]; if (obj && obj.children.length > 0) {
 if (obj.children[0].tagName != "IMG") {
 if (isHidden(obj.children[0]))
 {
 removeHide(obj.children[0]); addClass(obj.parentNode.children[0], "ps_dash"); }
 else {
 addHide(obj.children[0]); }
 return; }
 else if (obj.children.length > 1 && obj.children[0].tagName == "IMG") {
 if (isHidden(obj.children[0])){
 removeHide(obj.children[0]); removeClass(obj.parentNode.children[0], "ps_dash"); addHide(obj.children[1]); } else{
 removeHide(obj.children[1]); addHide(obj.children[0]); addClass(obj.parentNode.children[0], "ps_dash"); }
 return; }
 }
 var objHidden = document.getElementById(pid); if (objHidden.tagName == "INPUT")
 objHidden.value = fid; addchg_win0(objHidden); submitAction_win0(form, pid);}

function findFirstTab(tabSelect)
{
var tabList = tabSelect.parentNode;while (tabList.getAttribute("role") != "tablist")
 tabList = tabList.nextElementSibling || tabList.nextSibling; var eTab = tabList.firstElementChild || tabList.firstChild;while (eTab)
 {
 if (eTab.getAttribute("role") == "tab" ||
 (eTab.firstElementChild && eTab.firstElementChild.getAttribute("role") == "tab") ||
 (eTab.firstChild && eTab.firstChild.getAttribute("role") == "tab"))
 break; else
 eTab = eTab.nextElementSibling || eTab.nextSibling; }
return eTab;}

function findLastTab(tabSelect)
{
var tabList = tabSelect.parentNode;while (tabList.getAttribute("role") != "tablist")
 tabList = tabList.nextElementSibling || tabList.nextSibling; var eTab = tabList.lastElementChild || tabList.lastChild;while (eTab)
 {
 if (eTab.getAttribute("role") == "tab" || (eTab.firstElementChild && eTab.firstElementChild.getAttribute("role") == "tab"))
 break; else
 eTab = eTab.previousElementSibling || eTab.previousSibling; }
return eTab;}

function selectTab(el)
{
if (el.getAttribute("role") == "tab") 
 el.focus();else
 (el.firstElementChild || el.firstChild).focus();}

function doTabNav(event)
{
var bEventContinue= true;var tabSelect;var newTab = null;var currentTarget = event.currentTarget || event.srcElement;if (currentTarget.tagName == 'LI') 
 tabSelect = currentTarget;else
 tabSelect = currentTarget.parentNode;switch (event.keyCode)
 {
 case 13: 
 case 32: 
 bEventContinue = false; if (currentTarget.getAttribute("aria-selected") != "true")
 {
 document.win0.ICFocus.value = (tabSelect.firstElementChild || tabSelect.firstChild).id; currentTarget.onclick(); }
 break; case 39: 
 case 40: 
 newTab = tabSelect.nextElementSibling || tabSelect.nextSibling; if (newTab && newTab.getAttribute("aria-selected") == "true") 
 break; else
 {
 if (newTab && newTab.firstElementChild && newTab.firstElementChild.getAttribute("role") != "tab")
 newTab = newTab.nextElementSibling || newTab.nextSibling;  if (newTab)
 {
 var eTab = newTab.firstElementChild || newTab.firstChild; if (eTab && eTab.getAttribute("role") == "tab")
 break; }
 }

 case 36: 
 newTab = findFirstTab(tabSelect); break; case 37: 
 case 38: 
 newTab = tabSelect.previousElementSibling || tabSelect.previousSibling; if (isClassicPlus() && newTab && newTab.className == 'PSBOTTOMLINE')
 {
 newTab = findLastTab(tabSelect); break; }
 if (newTab && newTab.getAttribute("aria-selected") == "true") 
 break; else
 {
 if (newTab && (newTab.firstElementChild || newTab.firstChild).getAttribute("role") != "tab")
 newTab = newTab.previousElementSibling || newTab.previousSibling;  if (newTab)
 {
 var eTab = newTab.firstElementChild || newTab.firstChild; if (eTab && eTab.getAttribute("role") == "tab")
 break; }
 }

 case 35: 
 newTab = findLastTab(tabSelect); }

if (newTab != 'undefined' && newTab != null)
 {
 selectTab(newTab); bEventContinue=false; }

return bEventContinue;}

function doTabNavExt(event)
{
var bReturn = false;var tabSelect = null;var currentTarget = event.currentTarget || event.srcElement;if (currentTarget.tagName == 'LI')
 tabSelect = currentTarget;else
 tabSelect = currentTarget.parentNode;switch (event.keyCode)
 {
 case 13: 
 case 32: 
 bReturn = false; tabSelect = null; if (currentTarget.id.indexOf("ICTAB_SCROLL_R") == 0)
 document.win0.ICFocus.value = currentTarget.id.replace("_R", "_L"); else if (currentTarget.id.indexOf("ICTAB_SCROLL_L") == 0)
 document.win0.ICFocus.value = currentTarget.id.replace("_L", "_R"); else if (currentTarget.id.indexOf("ICTAB_HIDE") == 0)
 document.win0.ICFocus.value = currentTarget.id; currentTarget.onclick(); break; case 36: 
 tabSelect = findFirstTab(tabSelect); break; case 35: 
 tabSelect = findLastTab(tabSelect); break; default:
 bReturn = true; tabSelect = null; }

if (tabSelect != null && tabSelect != 'undefined')
 selectTab(tabSelect);return bReturn;}

function InvokeFieldChange_win0(sFldName)
{
 submitAction_win0(document.win0, sFldName);}
function onRCService(url,nOpenMode,nFluidComponent,szServType,strLabel,strFldID,bBulkAction,szParamXML)
{


var sFormName = "win0";OpenRCService(url,nOpenMode,nFluidComponent,szServType,strLabel,strFldID,bBulkAction,szParamXML,sFormName);if (nOpenMode != "4")
 processing_win0(0, 3000);}






var TOOLS_RETURN = "#ICReturn"; function isZoom()
{
 var bZoom = false; var oframe = null; var oWin = null; var returnButton = null; var topmostModalDialogIdCount = PT_GetTopmostModalDialogIdCount(); oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + topmostModalDialogIdCount); if (!oframe) {
 return bZoom; }

 oWin = oframe.contentWindow; if (!oWin)
 return bZoom; returnButton = oWin.document.getElementById(TOOLS_RETURN); if (!returnButton)
 return bZoom; bZoom = true; return bZoom;}



function isChangedForAutosave()
{
 var changed = null; var objFrame = null; if (document.win0)
 changed = checkFormChanged(document.win0, null); if ((changed == null || !changed) && top.frames) {
 objFrame = top.frames['TargetContent']; if (objFrame)
 changed=checkFrameChanged(objFrame); }

 if ((changed == null || !changed) && top.frames) {
 changed = checkAnyFrameChanged(top.frames); }

 if (changed == null)
 return false; else
 return true;}


function getAutoSaveButton()
{
 var bFound = false; var array_PTTRANSPARENT = null; if (top.frames) {
 objFrame = top.frames['TargetContent']; if (objFrame) {
 array_PTTRANSPARENT = objFrame.document.getElementsByClassName("PTTRANSPARENT"); }
 }
 for (var i=0; array_PTTRANSPARENT != null && i < array_PTTRANSPARENT.length; i++) {
 if (/_ICAUTOSAVE$/.test(array_PTTRANSPARENT[i].id)) {
 bFound = true; break; }
 }

 if (bFound) {
 return objFrame.document.getElementById(array_PTTRANSPARENT[i].id); } else {
 return null; }
}


function isAutoSaveEnabled()
{
 var bAutoSaveEnabled = false; if (getAutoSaveButton()) {
 
 if (isChangedForAutosave()) {
 bAutoSaveEnabled = true; }
 }

 return bAutoSaveEnabled;}


function getICAutoSave()
{
 var autoSave = null; autoSave = getAutoSaveButton(); if (autoSave == null) {
 return autoSave; }

 
 if (isChangedForAutosave()) {
 return autoSave; } else {
 return null; }
}


function submitSave(saveButton)
{
 if (saveButton == null)
 return; var bZoom = isZoom(); setSaveText_win0('Saving...', true, false); bAutoSave = true; if (bZoom) {
 var topmostModalDialogIdCount = PT_GetTopmostModalDialogIdCount(); var oframe = MTop().document.getElementById(MTop().PTMODFRAME_ + topmostModalDialogIdCount); if (!oframe) return; var oWin = oframe.contentWindow; if (typeof oWin != 'undefined' && oWin != null ) {
 var icReturn = oWin.document.getElementById(TOOLS_RETURN); if ((icReturn != null) && (typeof oWin.document.win0.ICAutoSave != "undefined" )) {
 oWin.document.win0.ICAutoSave.value = '1'; icReturn.click(); }
 }
 }


 if (top.frames) {
 var tgtFrame = top.frames['TargetContent']; var winn = tgtFrame.winName; var tf = "top.frames['TargetContent'].document." + winn; var sb = "top.frames['TargetContent'].submitAction_" + winn; var tgtForm = eval(tf); var sbAct = eval(sb); if (!bZoom) {
 sbAct(tgtForm, saveButton); } else {
 
 setTimeout(function(){sbAct(tgtForm, saveButton)}, 5000); }
 return; }

 if (!bZoom) {
 submitAction_win0(document.win0, saveButton); } else {
 
 setTimeout(function(){submitAction_win0(document.win0,saveButton)}, 5000); }
 }


function autoSave()
{
 var TOOLS_SAVEBUTTON_ID = "#ICSave"; var autoSave = null;  var saveButton = null; var saveButtonID = null; if (!isAutoSaveEnabled())
 return; autoSave = getICAutoSave(); if (autoSave != null) {
 saveButtonID = autoSave.value;  if (saveButtonID == null || saveButtonID == '\xa0') {
 saveButton = document.getElementById(TOOLS_SAVEBUTTON_ID); if (saveButton != null)
 saveButtonID = saveButton.id; }
 if (saveButtonID != null)
 submitSave(saveButtonID); } else {
 if (isZoom()) {
 submitSave(TOOLS_SAVEBUTTON_ID); }
 }
}



function DoEmbedGroupletSave()
{
if (document.win0 && checkFormChanged(document.win0, null))
 submitAction_win0(document.win0,"#ICSave");}

function isButton(obj)
{
 if (!obj) return false; var sRole = (obj.getAttribute("role")) ? obj.getAttribute("role") : (obj.getAttribute("data-role")) ? obj.getAttribute("data-role") : ""; if (sRole.indexOf("button") != -1 || sRole.indexOf("link") != -1 || sRole.indexOf("tab") != -1)
 return true; return false;}

function isDialog(obj)
{
 if (!obj) return false; var sRole = (obj.getAttribute("role")) ? obj.getAttribute("role") : ""; if (sRole.indexOf("dialog") != -1) return true; return false;}

function isRowAct(obj)
{
 if (!obj) return false; var sRole = (obj.getAttribute("crole")) ? obj.getAttribute("crole") : ""; if (sRole.indexOf("rowact") != -1)
 return true; return false;}

function htmlDecode(input){
 var e = document.createElement('textarea'); e.innerHTML = input;  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;}

function updateWindowTitleFromFakeBC() {

 if (top == null || top.document == null)
 return; var bTopFMode = isTopFModeLayout(); if (bTopFMode && top.isMDListSlideOut()) {
 var objHSpan = top.document.querySelector('.ps_system_cont:not(.psc_force-hidden) .ps_pagetitle .ps-text');  if (objHSpan)
 updateBrowserTitle(objHSpan.innerHTML); return; } else if (bTopFMode && isFModeLayout()) {
 
 if ((document.title == "") && (typeof szPinCrefLabel != "undefined") && (szPinCrefLabel != null) && (szPinCrefLabel != "")) {
 updateBrowserTitle(szPinCrefLabel); return; }
 }

 var url = window.location.href; if(url.search("ICDoModeless=1") > 0) return; var ptFakeBC = document.getElementById('pt_fakeBC'); if (typeof(ptFakeBC) != 'undefined' && ptFakeBC != null)
 {
 var ptFakeBCAnchor = ptFakeBC.getElementsByTagName('a')[0]; if (typeof(ptFakeBCAnchor) != 'undefined' && ptFakeBCAnchor != null && ptFakeBCAnchor.textContent != "")
 {
 var hrefString = ptFakeBCAnchor.getAttribute("href"); if(hrefString != null && hrefString.indexOf("pgltnode=") >= 0 && hrefString.indexOf("?tab=DEFAULT") >= 0)
 {
 return; }

 var objList = document.getElementsByTagName("div"); if(null != objList )
 {
 for (var i = 0; i < objList.length; i++)
 {
 if (objList.item(i) != null && objList.item(i).id == "pt_fakeBC")
 {
 var ptFakeBC = objList.item(i); if (typeof(ptFakeBC) != 'undefined' && ptFakeBC != null )
 {
 var ptFakeBCtab = ptFakeBC.getElementsByTagName('a')[0]; if (typeof(ptFakeBCtab) != 'undefined' && ptFakeBCtab != null && ptFakeBCtab.textContent != "")
 {
 var hrefStringtab = ptFakeBCtab.getAttribute("href"); if(hrefStringtab != null && (hrefStringtab.indexOf("pgltnode=") >= 0 || hrefStringtab.indexOf("?tab=DEFAULT") >= 0))
 {
 return; }
 }
 }
 }
 }
 }
 top.document.title = ptFakeBCAnchor.textContent; if (typeof szAccTagText != 'undefined' && szAccTagText != null && szAccTagText.length > 0)
 {
 
 szAccTagText = szAccTagText.replace(/&amp;/g , "&");  var index = szAccTagText.lastIndexOf("&"); szAccTagText = szAccTagText.slice(0, index) + szAccTagText.slice(index).replace('&', ""); top.document.title += ' - ' + szAccTagText; }
 

 else if(typeof szSecPageTitle != 'undefined')
 top.document.title += ' - ' + szSecPageTitle; }
 else
 {
 this.TargetFrame = top.frames["TargetContent"]; if (TargetFrame && (this.TargetFrame !== 'undefined') && (typeof(this.TargetFrame.szPinCrefReg)!=='undefined') && (this.TargetFrame.szPinCrefReg=='T')) {
 top.document.title = htmlDecode(this.TargetFrame.szPinCrefLabel); }
 }
 }
}

function DisplayNUIRCMenu_win0(FieldName,nLeft,nTop,sMenu) {

 
 
 sMenu = sMenu.replace("\\\'", "&apos;"); var mDivObj = document.getElementById('win0' + 'div' + FieldName + '$divpop'); if (!mDivObj)
 mDivObj = document.getElementById(FieldName + '$divpop'); if (!mDivObj)
 {
 var mDivRCObj = document.getElementById('PTRCF_NUI$Ctxmenu'); if (!mDivRCObj)
 {
 mDivRCObj = document.createElement('div'); mDivRCObj.id = "PTRCF_NUI$Ctxmenu"; mDivRCObj.innerHTML = sMenu; }
 mDivObj = mDivRCObj.firstChild; }
 if (isFModeLayout() && mDivObj && mDivObj.innerHTML != "") {
 processing_win0(0, 3000); resetMenu(mDivObj); var sClass = mDivObj.getAttribute("class"); sClass = sClass.replace(" psc_hidden", ""); mDivObj.setAttribute("class", sClass); if (typeof(nLeft) != 'undefined' && typeof(nTop) != 'undefined')
 {
 var sOptions = mDivObj.getAttribute('options'); sOptions += "nrcfLeft@"+nLeft+";nrcfTop@"+nTop+";"; mDivObj.setAttribute("options", sOptions); }
 if (window != top)
 bLocalModal = true; addDivPopup(mDivObj, window, mDivObj.getAttribute('options')); if (!isLoaderInProcess())
 playDivPopup(); return; }
}


function DisplayNUIRCMenu(FieldName,sMenu,nLeft,nTop) {
 DisplayNUIRCMenu_win0(FieldName,nLeft,nTop,sMenu);}

InvokeAppClsService_win0 = function(sFldName,sService,sData)
{
var nPos = sFldName.lastIndexOf("$");var szBase = sFldName;if (nPos != -1)
 {
 if (nPos == sFldName.length-1)
 {
 szBase = sFldName; szBase += "$APPCLS#"+sService; }
 else
 {
 szBase = sFldName.substring(0,nPos); szBase += "$APPCLS#"+sService; szBase += sFldName.substring(nPos,sFldName.length); }
 }
else
 szBase = sFldName+"$APPCLS#"+sService;var sFormName = "win0";var form = document.forms[sFormName];if (typeof form.ICAppClsData != 'undefined')
 form.ICAppClsData.value = sData;submitAction_win0(document.win0,szBase);}


function TransferImageUrl()
{
 var imgurl = document.getElementById("PTUPLOAD_CKE5_PTFCK_PATH_CKE5").value ; if(top.bFMode === true)
 {
 if(top.length >= 2)
 {
 
 top[top.length-2].document.getElementById(top.Ckeditor5CurrFieldIdForImgUpload + "_cke5ImgUploadUrl").innerHTML = imgurl ; top[top.length-2].document.getElementById(top.Ckeditor5CurrFieldIdForImgUpload + "_cke5ImgUploadUrlLink").click(); }
 else
 {
 
 top.document.getElementById(top.Ckeditor5CurrFieldIdForImgUpload + "_cke5ImgUploadUrl").innerHTML = imgurl ; top.document.getElementById(top.Ckeditor5CurrFieldIdForImgUpload + "_cke5ImgUploadUrlLink").click(); }
 }
 else
 {
 if(top.length >= 5)
 {
 
 
 
 for (let i=top.length-1; i >= 0; i--)
 {
 if(top[i] && top[i].document.getElementById(top.Ckeditor5CurrFieldIdForImgUpload + "_cke5ImgUploadUrl"))
 {
 top[i].document.getElementById(top.Ckeditor5CurrFieldIdForImgUpload + "_cke5ImgUploadUrl").innerHTML = imgurl ; top[i].document.getElementById(top.Ckeditor5CurrFieldIdForImgUpload + "_cke5ImgUploadUrlLink").click(); break; }
 }
 }
 else
 {
 
 top[0].document.getElementById(top.Ckeditor5CurrFieldIdForImgUpload + "_cke5ImgUploadUrl").innerHTML = imgurl ; top[0].document.getElementById(top.Ckeditor5CurrFieldIdForImgUpload + "_cke5ImgUploadUrlLink").click(); }
 }
}

function MoveImgUrlToCkeditorInstance(fldId)
{
 var imgurl = document.getElementById(fldId + "_cke5ImgUploadUrl").innerHTML ; var nodeone = document.getElementById(fldId).nextSibling; var domEditableElement = nodeone.querySelector( '.ck-editor__editable' ); const editorInstance = domEditableElement.ckeditorInstance ; editorInstance.model.change( function(writer) {
 const image = writer.createElement( 'imageBlock', { src: imgurl } ); editorInstance.model.insertContent( image , editorInstance.model.document.selection); } );}

function generateNewwinURL_CKE5() {

 if(top.length > 0)
 {
 
 var twl = top[0].window.location;  }
 else
 {
 var twl = top.window.location; }

 var path = twl.pathname, path_parts = path.split("/"); if (path_parts.length > 5) {
 path_parts[path_parts.length-5] = path_parts[path_parts.length-5].split("_")[0] + "_newwin"; }

 return twl.protocol + "//" + twl.host + path_parts[0] 
 + "/" + path_parts[1] + "/" 
 + path_parts[2] + "/" 
 + path_parts[3] + "/" 
 + path_parts[4] + "/" ;}

function OpenUploadDialogue(fldId)
{
 top.Ckeditor5CurrFieldIdForImgUpload = fldId ; if(top.bFMode === true && !(top.document.getElementById("PT_AGSTARTPAGE_NUI"))) 
 var url = "c/PTRTE.PTUPLOAD_CKE5FLUID.GBL?URLID=PT_RTE_IMG_DB_LOC&TYPE=record://PTRTDB" ; else
 var url = "c/PTRTE.PTUPLOAD_CKE5.GBL?URLID=PT_RTE_IMG_DB_LOC&TYPE=record://PTRTDB" ; if(top.bFMode === true && !(top.document.getElementById("PT_AGSTARTPAGE_NUI")))
 var options = ""; else
 var options = "bModeless@0;";  url = generateNewwinURL_CKE5() + url; url = url.replace("/psp/", "/psc/"); if(top.bFMode === true && !(top.document.getElementById("PT_AGSTARTPAGE_NUI")))
 processing_win0(1,3000);   doModeless(url, options);}

function SetListAttr(el, sSelector, attrNm, attrVal)
{
 if (!el) {
 el = document; }
 var nodeLst = el.querySelectorAll(sSelector); if (nodeLst) {
 for (let j = 0; j < nodeLst.length; j++) {
 nodeLst[j].setAttribute(attrNm, attrVal); }
 }
}

function ResetHeight(el)
{
 if (!el) return; var nodeLst = el.querySelectorAll('tr'); if (nodeLst) {
 for (let k = 0; k < nodeLst.length; k++) {
 var elTd = nodeLst[k].querySelector('td'); var colsp = elTd.getAttribute('colspan'); var ht = elTd.getAttribute('height'); if (!colsp) {
 if (typeof ht !== 'undefined') {
 if (ht !== '0') {
 elTd.setAttribute('height', ''); break; }
 }
 }
 }
 }
}

function AddItemNoUpdate() {
 var elemId= "win0divPTS_CFG_CL_WRK_PTS_CFG_CL_RSLT_GB$1$"; var el = document.getElementById(elemId); if (el) {
 el.style.display = 'none'; el.setAttribute('aria-hidden', 'true'); el.textContent = ''; }

 var elSpan = document.getElementById('PTS_CRITTEXT_DISP'); if (elSpan) {
 var msgTxt = "<BR>The value you have tried to add already exists.  Please specify a new value in the fields above."; msgTxt = msgTxt.replace('<BR>', ''); elSpan.textContent = msgTxt; }
}

function SetRowActions(gridname)
{
 
 const queryString = window.location.search; const urlParams = new URLSearchParams(queryString); const ispreviewMode = urlParams.get('previewMode'); if (ispreviewMode == "Y") {
 return; }
 

 var elSrchBtn = document.getElementById('PTS_CFG_CL_WRK_PTS_SRCH_BTN'); if (elSrchBtn)
 elSrchBtn.setAttribute('accesskey','1'); else {
 const nodeLst = document.querySelectorAll('input[id^="PTS_CFG_CL_WRK_PTS_SRCH_BTN"]'); if (nodeLst) {
 for (let i = 0; i < nodeLst.length; i++) {
 if (nodeLst[i])
 nodeLst[i].setAttribute('accesskey','1'); }
 }
 }
 var elAddBtn = document.getElementById('PTS_CFG_CL_WRK_PTS_ADD_BTN'); if (elAddBtn)
 elAddBtn.setAttribute('accesskey','1'); const nodeTableList = document.querySelectorAll('span[class^="PSSRCHTITLE"]'); if (nodeTableList) {
 for (let i = 0; i < nodeTableList.length; i++) {
 if (nodeTableList[i]) {
 nodeTableList[i].setAttribute('role','heading'); nodeTableList[i].setAttribute('aria-level','2'); }
 }
 }

 
 
 var elSrchPgGb = document.getElementById('ACE_PTS_CFG_CL_WRK_PTS_SRCHPAGE_GB'); if (elSrchPgGb) {
 var bProcessed = elSrchPgGb.getAttribute('processed'); if (!bProcessed) {
 elSrchPgGb.setAttribute('processed', '1'); var nSrchPgWid = Number(elSrchPgGb.offsetWidth); var rectSrchPg = elSrchPgGb.getBoundingClientRect(); nSrchPgWid = nSrchPgWid + rectSrchPg.left; const nodeTableLst = document.querySelectorAll('table[class^="PTS_CRITERIA_GBWBO"]'); if (nodeTableLst) {
 for (let i = 0; i < nodeTableLst.length; i++) {
 if (nodeTableLst[i]) {
 var rectTbl = nodeTableLst[i].getBoundingClientRect(); var nTblWid = Number(nodeTableLst[i].offsetWidth); nTblWid = nTblWid + rectTbl.left;  if (nSrchPgWid < nTblWid) {
 var nTdColSpan = 0; var elParentTr = nodeTableLst[i].parentElement.parentElement.parentElement; const nodeTdLst = elParentTr.querySelectorAll('td'); if (nodeTdLst) {
 nTdColSpan = Number(nodeTdLst[0].getAttribute('colspan')); nTdColSpan = nTdColSpan - 1; if (nTdColSpan > 0) {
 nodeTdLst[0].setAttribute("colspan", nTdColSpan);  nTblWid = rectTbl.left + Number(nodeTableLst[i].offsetWidth); }
 }
 if (nSrchPgWid < nTblWid) {
 rectTbl = nodeTableLst[i].getBoundingClientRect();  elSrchPgGb.setAttribute('width', (nTblWid - rectSrchPg.left - rectTbl.left));  }
 }
 }
 }
 }
 }
 }
 

 
 var elCoreArea = document.getElementById('ACE_PTS_CFG_CL_WRK_PTS_COREAREA_GB'); var elPgGrp = document.getElementById('ACE_PTS_CFG_CL_WRK_PTS_GROUPBOX13');  var elKwPgGrp = document.getElementById('ACE_PTS_CFG_CL_WRK_PTS_CFG_KWPAGE_GB'); var elKwGrp = document.getElementById('ACE_PTS_CFG_CL_WRK_PTS_KEYWORD_GRPB'); if (elKwGrp) {
 var bKwGrpProcessed = elKwGrp.getAttribute('processed'); if (!bKwGrpProcessed) {
 elKwGrp.setAttribute('processed', '1'); SetListAttr(elKwGrp, 'td.PTS_FILTER_VALUE:nth-child(n+3)', 'align', 'left'); SetListAttr(elKwGrp, 'td.PTS_PROMPT1:nth-child(n+3)', 'align', 'left'); SetListAttr(elKwGrp, 'td.PTS_PROMPT2:nth-child(n+3)', 'align', 'left'); SetListAttr(elKwGrp, 'td.PTS_XLAT1:nth-child(n+3)', 'align', 'left'); SetListAttr(elKwGrp, 'td.PTS_XLAT2:nth-child(n+3)', 'align', 'left'); SetListAttr(elKwGrp, 'td.PTS_PROMPTNOEDIT1:nth-child(n+3)', 'align', 'left'); SetListAttr(elKwGrp, 'td.PTS_PROMPTNOEDIT2:nth-child(n+3)', 'align', 'left'); SetListAttr(elKwGrp, 'td.PTS_DATEPROMPT1:nth-child(n+3)', 'align', 'left'); SetListAttr(elKwGrp, 'td.PTS_YESNO1:nth-child(n+3)', 'align', 'left'); SetListAttr(elKwGrp, 'td.PTS_YESNO2:nth-child(n+3)', 'align', 'left'); var elMiscInfo = document.getElementById('PTS_MISCINFO'); if (elMiscInfo) {
 var bDoubleCol = false; var sVal = elMiscInfo.getAttribute('value');  if ((typeof sVal !== 'undefined') && (sVal === '2'))
 bDoubleCol = true; var elScrl = document.getElementById('PTS_FILTER_KW_C$scrolli$0'); if (elScrl) {
 var sCls = elScrl.getAttribute('class'); if (typeof sCls !== 'undefined') {
 if (bDoubleCol)
 elScrl.setAttribute('class', sCls + ' pts_doublecol'); else
 elScrl.setAttribute('class', sCls + ' pts_singlecol'); }

 if (bDoubleCol) {
 var sWid = elScrl.getAttribute('width'); if (typeof sWid !== 'undefined') {
 var nWid = parseInt(sWid);  var elPrnt = elKwGrp.parentElement; for (let k = 0; k < 20; k++) {
 if (elPrnt.tagName.toUpperCase() === 'TABLE') break; elPrnt = elPrnt.parentElement; }
 var sWdth = elPrnt.getAttribute('width'); var nParentWdth = 0; if (typeof sWdth !== 'undefined') 
 nParentWdth = parseInt(sWdth); if ((elPrnt.offsetWidth - nParentWdth) > 50)
 nParentWdth = elPrnt.offsetWidth - 50; sWdth = elKwGrp.getAttribute('width'); if (typeof sWdth !== 'undefined'){
 var nWdth = parseInt(sWdth); if (nWdth < nParentWdth)
 elKwGrp.setAttribute('width', nParentWdth); }
 var nNewWdth = (nWid * 2); if (nNewWdth > nParentWdth)
 nNewWdth = nParentWdth; elScrl.setAttribute('width', nNewWdth); }

 var elPrnt = elKwGrp.parentElement; for (let k = 0; k < 20; k++) {
 if (elPrnt.tagName.toUpperCase() === 'TR') break; elPrnt = elPrnt.parentElement; }
 var elTd = elPrnt.querySelector('td'); elTd.setAttribute('height', '');  ResetHeight(elKwGrp); ResetHeight(elKwPgGrp); ResetHeight(elPgGrp); ResetHeight(elCoreArea); }
 }
 }
 }
 }

 
 var el_res_gb = document.getElementById('PTS_CFG_CL_WRK_PTS_CFGSRCH_RSLTGB'); if (el_res_gb)
 el_res_gb.setAttribute('aria-describedby','PTS_CRITTEXT_DISP');  var tableID = "tdgbr"+gridname+"$0"; var table = document.getElementById(tableID); if(table) {
 var rows = table.rows; for(var i=0; i<rows.length; i++) {
 var irowID = 0; var bUseRowId = true; var sBufNum = rows[i].getAttribute("bufnum"); if (sBufNum) {
 var nBufNum = parseInt(sBufNum); if (nBufNum >= 0) {
 irowID = nBufNum; bUseRowId = false; }
 }
 var rowstring = rows[i].id; if (bUseRowId === true) {
 var rowID = rowstring.substring(rowstring.lastIndexOf('_row')+4); irowID = parseInt(rowID)-1; }
 var js = "javascript:submitAction_win0(document.win0,'#ICRow" + irowID + "');"; js = js + " javascript:cancelBubble(event)"; rows[i].setAttribute("onclick",js);   var jsEntKey = "javascript: doKeyEnter(event, '" + rowstring + "');"; rows[i].setAttribute("onkeypress", jsEntKey); rows[i].setAttribute("tabindex",0);  }

 var bIsAccessibleMode = false; if (typeof g_bAccessibilityMode !== 'undefined')
 bIsAccessibleMode = g_bAccessibilityMode; var msg28010Org = "Apply %1 filter"; var msg2809Org = "Remove %1 filter"; var elSelect; var elIdSelect; var nIndx = 0; var elSelectLbl; var elIdSelectLbl; while (true) {
 elIdSelect = "PTS_SELECT$" + nIndx; elSelect = document.getElementById(elIdSelect); if (elSelect) {
 var sTitle = elSelect.getAttribute("title"); if (sTitle) break; elIdSelectLbl = "PTS_SELECT_LBL$" + nIndx; elSelectLbl = document.getElementById(elIdSelectLbl); if (!elSelectLbl) {
 elIdSelectLbl = "PTS_CSRCH_FV_CL_PTS_FCT_DV_DIS$" + nIndx; elSelectLbl = document.getElementById(elIdSelectLbl); }
 sTitle = elSelectLbl.textContent; var msg28010 = msg28010Org; var msg2809 = msg2809Org; var bIsSelected = false; var sChecked = elSelect.getAttribute("checked"); if (typeof sChecked !== 'undefined' && sChecked === 'checked')
 bIsSelected = true; if (bIsSelected)
 sTitle = msg2809.replace("%1", sTitle); else
 sTitle = msg28010.replace("%1", sTitle); if (sTitle.length > 0) {
 elSelect.setAttribute("aria-label", sTitle); if (bIsAccessibleMode == false)
 elSelect.setAttribute("title", sTitle); }
 } else {
 
 elIdSelect = "PTS_FACET_DV_COUNT$" + nIndx; elSelect = document.getElementById(elIdSelect); if (!elSelect) {
 elIdSelect = "PTS_CSRCH_FV_CL_PTS_FCT_DV_DIS$" + nIndx; elSelect = document.getElementById(elIdSelect); if (!elSelect)
 break; }
 }
 nIndx = nIndx + 1; }
 }
}

function RunSearch(strSrchBtnId)
{
 javascript:submitAction_win0(document.win0,strSrchBtnId);}

function UpdateClassicStyle()
{
 var str = "win0" + "divPTS_CFG_CL_WRK_PTS_COREAREA_GB"; if (document.getElementById(str))
 {
 if(!document.getElementById(str).classList.contains("pts_cfg_srch"))
 document.getElementById(str).classList.add("pts_cfg_srch"); } else {
 str = "win0" + "divSEARCHADV"; if (document.getElementById(str)) {
 if (!document.getElementById(str).classList.contains("pts_cfg_srch"))
 document.getElementById(str).classList.add("pts_cfg_srch"); }
 }

 str = "win0" + "divPTS_CFG_CL_WRK_PTS_SRCH_BTN$44$"; if(document.getElementById(str) && document.getElementById(str).childElementCount > 0)
 {
 const a = document.getElementById(str).children[0]; if(!a.classList.contains("PSPRIMARY"))
 a.classList.add("PSPRIMARY"); }

 str = "win0" + "divPTS_CFG_CL_WRK_PTS_SRCH_BTN$6$"; if(document.getElementById(str) && document.getElementById(str).childElementCount > 0)
 {
 const a = document.getElementById(str).children[0]; if(!a.classList.contains("PSPRIMARY"))
 a.classList.add("PSPRIMARY"); }

 str = "PTS_CFG_CL_WRK_PTS_KW$55$"; if(document.getElementById(str))
 {
 document.getElementById(str).placeholder = "Enter keywords here"; }

 str = "PTS_CFG_CL_WRK_PTS_KW"; if(document.getElementById(str))
 {
 document.getElementById(str).placeholder = "Enter keywords here"; }

 str = "PTS_CFG_CL_WRK_PTS_SHOWHIDE_FLT"; if(document.getElementById(str))
 {
 if(!document.getElementById(str).classList.contains("pts_showhide_flt"))
 document.getElementById(str).classList.add("pts_showhide_flt"); }

 str = "PTS_CFG_CL_WRK_PTS_BASCSRCH_LINK"; if(document.getElementById(str))
 {
 if(!document.getElementById(str).classList.contains("pts_showhide_morelessopt"))
 document.getElementById(str).classList.add("pts_showhide_morelessopt"); }

 
 if(isClassicPlus())
 str = "PTS_CFG_CL_STD_RSL$gridActionIcon$0"; else 
 str = "PTS_CFG_CL_STD_RSL$hmodal$0"; if(document.getElementById(str))
 {
 document.getElementById(str).style.display = "none"; if(!document.getElementById(str).classList.contains("pts_display_none"))
 document.getElementById(str).classList.add("pts_display_none"); }

 str = "win0" + "divPTS_CFG_CL_WRK_PTS_VIEWMODE"; if(document.getElementById(str))
 {
 if(!document.getElementById(str).classList.contains("pts_gridview_grid_border_radius"))
 document.getElementById(str).classList.add("pts_gridview_grid_border_radius"); }

 str = "PTS_CFG_CL_WRK_PTS_VIEWMODE"; if(document.getElementById(str))
 {
 document.getElementById(str).style.opacity = 0; if(document.getElementById(str).getAttribute("checked") == "checked")
 {
 var str1 = "win0" + "divPTS_CFG_CL_WRK_PTS_VIEWMODE"; if(!document.getElementById(str1).classList.contains("pts_radio_btn_selected"))
 document.getElementById(str1).classList.add("pts_radio_btn_selected"); }
 else
 {
 var str1 = "win0" + "divPTS_CFG_CL_WRK_PTS_VIEWMODE"; if(!document.getElementById(str1).classList.contains("pts_radio_btn_unselected"))
 document.getElementById(str1).classList.add("pts_radio_btn_unselected"); }

 }

 str = "PTS_CFG_CL_WRK_PTS_VIEWMODE_LBL"; if(document.getElementById(str))
 {
 if(!document.getElementById(str).classList.contains("pts_gridview_grid"))
 document.getElementById(str).classList.add("pts_gridview_grid"); }

 str = "win0" + "divPTS_CFG_CL_WRK_PTS_VIEWMODE$32$"; if(document.getElementById(str))
 {
 if(!document.getElementById(str).classList.contains("pts_gridview_list_border_radius"))
 document.getElementById(str).classList.add("pts_gridview_list_border_radius"); }


 str = "PTS_CFG_CL_WRK_PTS_VIEWMODE$32$"; if(document.getElementById(str))
 {
 document.getElementById(str).style.opacity = 0; if(document.getElementById(str).getAttribute("checked") == "checked")
 {
 var str1 = "win0" + "divPTS_CFG_CL_WRK_PTS_VIEWMODE$32$"; if(!document.getElementById(str1).classList.contains("pts_radio_btn_selected"))
 document.getElementById(str1).classList.add("pts_radio_btn_selected"); }
 else
 {
 var str1 = "win0" + "divPTS_CFG_CL_WRK_PTS_VIEWMODE$32$"; if(!document.getElementById(str1).classList.contains("pts_radio_btn_unselected"))
 document.getElementById(str1).classList.add("pts_radio_btn_unselected"); }
 }

 str = "PTS_CFG_CL_WRK_PTS_VIEWMODE$32$_LBL"; if(document.getElementById(str))
 {
 if(!document.getElementById(str).classList.contains("pts_gridview_list"))
 document.getElementById(str).classList.add("pts_gridview_list"); }

 str = "win0" + "divPTS_CFG_CL_WRK_PTS_VIEWMODE$31$"; if(document.getElementById(str))
 {
 if(!document.getElementById(str).classList.contains("pts_gridview_grid_border_radius"))
 document.getElementById(str).classList.add("pts_gridview_grid_border_radius"); }


 str = "PTS_CFG_CL_WRK_PTS_VIEWMODE$31$"; if(document.getElementById(str))
 {
 document.getElementById(str).style.opacity = 0; if(document.getElementById(str).getAttribute("checked") == "checked")
 {
 var str1 = "win0" + "divPTS_CFG_CL_WRK_PTS_VIEWMODE$31$"; if(!document.getElementById(str1).classList.contains("pts_radio_btn_selected"))
 document.getElementById(str1).classList.add("pts_radio_btn_selected"); }
 else
 {
 var str1 = "win0" + "divPTS_CFG_CL_WRK_PTS_VIEWMODE$31$"; if(!document.getElementById(str1).classList.contains("pts_radio_btn_unselected"))
 document.getElementById(str1).classList.add("pts_radio_btn_unselected"); }
 }

 str = "PTS_CFG_CL_WRK_PTS_VIEWMODE$31$_LBL"; if(document.getElementById(str))
 {
 if(!document.getElementById(str).classList.contains("pts_gridview_grid"))
 document.getElementById(str).classList.add("pts_gridview_grid"); }

 str = "win0" + "divPTS_CFG_CL_WRK_PTS_VIEWMODE$33$"; if(document.getElementById(str))
 {
 if(!document.getElementById(str).classList.contains("pts_gridview_list_border_radius"))
 document.getElementById(str).classList.add("pts_gridview_list_border_radius"); }


 str = "PTS_CFG_CL_WRK_PTS_VIEWMODE$33$"; if(document.getElementById(str))
 {
 document.getElementById(str).style.opacity = 0; if(document.getElementById(str).getAttribute("checked") == "checked")
 {
 var str1 = "win0" + "divPTS_CFG_CL_WRK_PTS_VIEWMODE$33$"; if(!document.getElementById(str1).classList.contains("pts_radio_btn_selected"))
 document.getElementById(str1).classList.add("pts_radio_btn_selected"); }
 else
 {
 var str1 = "win0" + "divPTS_CFG_CL_WRK_PTS_VIEWMODE$33$"; if(!document.getElementById(str1).classList.contains("pts_radio_btn_unselected"))
 document.getElementById(str1).classList.add("pts_radio_btn_unselected"); }
 }

 str = "PTS_CFG_CL_WRK_PTS_VIEWMODE$33$_LBL"; if(document.getElementById(str))
 {
 if(!document.getElementById(str).classList.contains("pts_gridview_list"))
 document.getElementById(str).classList.add("pts_gridview_list"); }

}


function CustomSearchGeneration(parentdropdown,dropdownidval,operatorval,type)
{
 this.elements = {
 Iddropdown:dropdownidval,
 OperDisp:operatorval,
 inputDelayTime:null,
 ptsResultsOpen:false,
 IsCompleted:false,
 IsSavedsrch:type,
 Dropdowntext:document.querySelector(parentdropdown),
 Pts_cd_searchmask:document.createElement("div"),
 Pts_cd_contentbox:document.createElement("div"),
 
 Pts_cd_searchedit:document.createElement("div"),
 Pts_cd_keyword:document.createElement("div"),
 Pts_cd_keywordctrl:document.createElement("div"),
 Pts_cd_keyword_ip:document.createElement("input"),
 Pts_cd_srchrslts_ariaD:document.createElement("span"),
 
 Pts_cd_Categories:document.createElement("div"),
 Pts_cd_rsltsstream:document.createElement("div"),
 Pts_cd_rslts_ul:document.createElement("ul") 
 }; this.generateCDSearchWidget = function()
 {
 var locid = "win0" + "divPTS_CD_SEARCHWIDGET"; var maindivtag = "<div id=" + locid + "> </div>"; var targetid = document.getElementById(this.elements.Iddropdown); targetid.insertAdjacentHTML("afterend", maindivtag); this.elements.Pts_cd_searchwidget = document.getElementById(locid); this.elements.Pts_cd_searchwidget.classList.add("pts_cd_box-group","pts_cd_widget");  this.elements.Pts_cd_searchmask.id = "win0" + "divPTS_CD_MASK"; this.elements.Pts_cd_searchmask.classList.add("pts_cd_box-group","pts_search_mask","psc_hidden"); this.elements.Pts_cd_searchwidget.appendChild(this.elements.Pts_cd_searchmask); this.elements.Pts_cd_contentbox.id = "win0" + "divPTS_CD_CONTENTBOX"; this.elements.Pts_cd_contentbox.classList.add("pts_cd_box-group","pts_cd_search_focused"); this.elements.Pts_cd_searchwidget.appendChild(this.elements.Pts_cd_contentbox);  this.elements.Pts_cd_searchedit.id = "win0" + "divPTS_CD_SEARCHEDIT"; this.elements.Pts_cd_searchedit.classList.add("pts_cd_box-group","pts_cd_search_controls", "pts_cd_search_srchipctrl"); this.elements.Pts_cd_contentbox.appendChild(this.elements.Pts_cd_searchedit);  this.elements.Pts_cd_keyword.id = "win0" + "divPTS_CD_KEYWORD"; this.elements.Pts_cd_keyword.classList.add("pts_cd_editbox"); this.elements.Pts_cd_searchedit.appendChild(this.elements.Pts_cd_keyword);  this.elements.Pts_cd_keywordctrl.id = "win0" + "divPTS_CD_KEYWORDctrl"; this.elements.Pts_cd_keywordctrl.classList.add("pts_cd_box-control"); this.elements.Pts_cd_keyword.appendChild(this.elements.Pts_cd_keywordctrl);  this.elements.Pts_cd_keyword_ip.setAttribute("type","text"); this.elements.Pts_cd_keyword_ip.id = "PTSCDKEYWORD"; this.elements.Pts_cd_keyword_ip.classList.add("pts_cd-edit", "PSEDITBOX"); this.elements.Pts_cd_keyword_ip.setAttribute("value",""); this.elements.Pts_cd_keyword_ip.setAttribute("placeholder","Search"); this.elements.Pts_cd_keyword_ip.setAttribute("role","combobox"); this.elements.Pts_cd_keyword_ip.setAttribute("aria-expanded", "true"); this.elements.Pts_cd_keyword_ip.setAttribute("aria-describedby", "Pts_cd_srchrslts_ariaD");   if (!isFModeLayout()) {
 let nTabIndex = 0; if (document.getElementById("PTS_KW"))
 {
 if (ptsCustomsrchobj.elements.IsSavedsrch)
 nTabIndex = Number(document.getElementById("PTS_CFG_CL_WRK_PTS_SAVED_EDIT$3$").getAttribute("tabindex")); else
 nTabIndex = Number(document.getElementById("PTS_CFG_CL_WRK_PTS_RCNT_EDIT$3$").getAttribute("tabindex")); }
 else {
 if (ptsCustomsrchobj.elements.IsSavedsrch)
 nTabIndex = Number(document.getElementById("PTS_CFG_CL_WRK_PTS_SAVED_EDIT").getAttribute("tabindex")); else
 nTabIndex = Number(document.getElementById("PTS_CFG_CL_WRK_PTS_RCNT_EDIT").getAttribute("tabindex")); }
 nTabIndex = nTabIndex ; this.elements.Pts_cd_keyword_ip.setAttribute("tabindex", nTabIndex.toString(10)); }

 this.elements.Pts_cd_keywordctrl.appendChild(this.elements.Pts_cd_keyword_ip); this.elements.Pts_cd_srchrslts_ariaD.id = "Pts_cd_srchrslts_ariaD"; this.elements.Pts_cd_srchrslts_ariaD.setAttribute("style","display: none;"); this.elements.Pts_cd_srchrslts_ariaD.innerHTML = "Search suggestions have been displayed. Use the arrow keys to review the results. Press the Enter key on a selected suggestion to navigate to that item."; this.elements.Pts_cd_keywordctrl.appendChild(this.elements.Pts_cd_srchrslts_ariaD); this.elements.Pts_cd_Categories.id = "win0" + "divPTSCDCATEGORIES"; this.elements.Pts_cd_Categories.classList.add("pts_cd_box-group","pts_cd_search_tray","pts_cd_search_rescontainer"); this.elements.Pts_cd_Categories.classList.add("PSEDITBOX"); this.elements.Pts_cd_Categories.setAttribute("aria-modal", "true"); this.elements.Pts_cd_contentbox.appendChild(this.elements.Pts_cd_Categories); if(!isFModeLayout()) {
 let nTabIndex = 0; if(document.getElementById("PTS_KW")) {
 if(ptsCustomsrchobj.elements.IsSavedsrch)
 nTabIndex = Number(document.getElementById("PTS_CFG_CL_WRK_PTS_SAVED_EDIT$3$").getAttribute("tabindex")); else
 nTabIndex = Number(document.getElementById("PTS_CFG_CL_WRK_PTS_RCNT_EDIT$3$").getAttribute("tabindex")); }
 else {
 if(ptsCustomsrchobj.elements.IsSavedsrch)
 nTabIndex = Number(document.getElementById("PTS_CFG_CL_WRK_PTS_SAVED_EDIT").getAttribute("tabindex")); else
 nTabIndex = Number(document.getElementById("PTS_CFG_CL_WRK_PTS_RCNT_EDIT").getAttribute("tabindex")); }
 nTabIndex = nTabIndex - 1; this.elements.Pts_cd_Categories.setAttribute("tabindex", nTabIndex.toString(10)); }
 else {
 this.elements.Pts_cd_Categories.setAttribute("tabindex", "-1"); }

 this.elements.Pts_cd_Categories.focus();  this.elements.Pts_cd_rsltsstream.id = "win0" + "divPTSCDCATEGORIES_RSLT"; this.elements.Pts_cd_rsltsstream.classList.add("pts_cd_box-group","pts_cd_results_grid","pts_cd_search_resscroll"); this.elements.Pts_cd_rsltsstream.classList.add("ps_scrollable","sbar","sbar_v","ps_scrollable_v"); this.elements.Pts_cd_rsltsstream.setAttribute("role", "presentation"); this.elements.Pts_cd_Categories.appendChild(this.elements.Pts_cd_rsltsstream);  this.elements.Pts_cd_rslts_ul.classList.add("pts_cd_box-menucontainer","pts_cd_keynav-list"); this.elements.Pts_cd_rslts_ul.setAttribute("role", "menu"); this.elements.Pts_cd_rslts_ul.setAttribute("aria-label", "Search in"); this.elements.Pts_cd_rsltsstream.appendChild(this.elements.Pts_cd_rslts_ul);  }
 this.addListeners = function()
 {
 ptsSearchBox = this.elements.Pts_cd_searchwidget.querySelector("#PTSCDKEYWORD"); ptsSearchBox.addEventListener('keydown', function (e) { ptsCustomsrchobj.ptsGetSuggestions(ptsSearchBox, e) });  this.elements.Pts_cd_searchmask.addEventListener('click', function (e) { ptsCustomsrchobj.ptscdClickoutside(e) }); window.addEventListener("resize", function (e) { 
 if((ptsCustomsrchobj.Pts_cd_searchwidget !== null) && (ptsCustomsrchobj.elements.IsCompleted === false)){
 ptsCustomsrchobj.setCustomsrchpos(); ptsCustomsrchobj.populateResults(ptsCustomsrchobj.elements.Pts_cd_keyword_ip); } }); }
 this.ptscdClickoutside = function(e)
 {
 this.elements.Pts_cd_searchmask.classList.add("psc_hidden"); document.getElementById(ptsCustomsrchobj.elements.Iddropdown).style.visibility="visible"; document.getElementById(ptsCustomsrchobj.elements.Iddropdown).style.display="inline-block"; ptsCustomsrchobj.elements.IsCompleted = true; var childelem = document.getElementById(ptsCustomsrchobj.elements.Pts_cd_searchwidget.id); var prntelem = childelem.parentElement; prntelem.removeChild(childelem); if(e.key !== "Tab")
 document.getElementById(ptsCustomsrchobj.elements.Iddropdown).focus(); }
 this.ptsGetSuggestions = function (inp, e) 
 {
 var activeElement = document.activeElement; clearTimeout(this.elements.inputDelayTime); this.elements.inputDelayTime = setTimeout(function () {

 if (e.key !== "Escape" && e.key !== "Esc" && 
 e.key !== "Tab" && e.key !== "ArrowDown" && e.key !== "Down" 
 && e.key !== "ArrowUp" && e.key !== "Up")
 ptsCustomsrchobj.populateResults(inp);  if (e.key === "ArrowDown" || e.key === "Down" || e.key === "ArrowUp" || e.key === "Up") {
 if (ptsCustomsrchobj.elements.ptsResultsOpen) {
 if (e.key === "ArrowDown" || e.key === "Down") {
 var searchtray = ptsCustomsrchobj.elements.Pts_cd_searchwidget.querySelector(".pts_cd_search_tray"); var resultbox = searchtray.querySelector(".pts_cd_results_grid"); if (!resultbox.classList.contains("psc_hidden"))
 resultbox.querySelector(".pts_cd-link").focus(); e.stopPropagation(); }
 else if (e.key === "ArrowUp" || e.key === "Up") {
 var searchtray = ptsCustomsrchobj.elements.Pts_cd_searchwidget.querySelector(".pts_search_tray"); var resultbox = searchtray.querySelector(".pts_results_grid"); if (!resultbox.classList.contains("psc_hidden")) {
 var resultitems = resultbox.querySelectorAll(".ps_box-menuitem:not(.psc_hidden)"); resultitems[resultitems.length - 1].querySelector(".ps-link").focus(); }
 e.stopPropagation(); }
 }
 }
 else if(e.key === "Escape" || e.key === "Esc" || e.key === "Tab")
 {
 ptsCustomsrchobj.ptscdClickoutside(e);  } 
 }, 500); }
 this.creterowlist = function(id,select_flag)
 {
 var listitem = document.createElement("li"); listitem.id = "PTS_CD_RSLTS_ROW_" + id; listitem.classList.add("pts_cd_box-menuitem"); listitem.setAttribute("role", "presentation"); this.elements.Pts_cd_rslts_ul.appendChild(listitem); var locdiv = document.createElement("div"); locdiv.id = "win0" + "divPTSCDMENU$" + id; locdiv.classList.add("pts_cd_box-link"); if(select_flag)
 locdiv.classList.add("pts_cd_category_selected"); else
 {
 if(document.getElementById(ptsCustomsrchobj.elements.Iddropdown).options.length == 2)
 locdiv.classList.add("pts_cd_category_notselected"); }
 locdiv.setAttribute("role", "presentation"); listitem.appendChild(locdiv); var locspan = document.createElement("span"); locspan.id = "PTSCDMENU$SPAN$" + id; locspan.classList.add("pts_cd-link-wrapper"); locspan.setAttribute("role", "presentation"); locspan.setAttribute("title", "Search Category Name"); locdiv.appendChild(locspan); var anchortag = document.createElement("a"); anchortag.id = "PTSCDMENU$" + id; anchortag.classList.add("pts_cd-link"); anchortag.setAttribute("href","javascript:void(0);"); var clicktext = "javascript:ptsCustomsrchobj.SetText("+ "'" + id + "'" + ")"; anchortag.setAttribute("onclick",clicktext); anchortag.setAttribute("onkeydown","javascript:ptsCustomsrchobj.ptscdkeyDownFunction(event);"); anchortag.setAttribute("aria-current", "true"); anchortag.setAttribute("tabindex", "-1"); anchortag.setAttribute("role", "menuitem"); locspan.appendChild(anchortag); if(ptsCustomsrchobj.elements.IsSavedsrch)
 {
 var node2 = document.createElement("span"); node2.id = "pts_cd_link_title_2_" + id; node2.classList.add("pts_cd_link_title"); anchortag.appendChild(node2); }
 var node = document.createElement("span"); node.id = "pts_cd_link_title_" + id; node.classList.add("pts_cd_link_title"); anchortag.appendChild(node); var node1 = document.createElement("span"); node1.id = "pts_cd_link_title_1_" + id; node1.classList.add("pts_cd_link_title1"); node1.classList.add("psc_hidden"); anchortag.appendChild(node1); }
 this.SetResultStream = function(inp)
 {
 var inputtext = inp.value; var smatch = false; var onematch = false; var srchdata = ""; var maxfieldstoshow = 2; for(var i = 0; i < rcntsrchlist.length; i++)
 {
 smatch = false; if((ptsCustomsrchobj.elements.IsSavedsrch) && (rcntsrchlist[i].recntsrchid.toUpperCase().indexOf(inputtext.toUpperCase()) > -1))
 {
 smatch = true; }
 else
 {
 for(var j=0;j<rcntsrchlist[i].fieldvalues.length;j++)
 {
 if(rcntsrchlist[i].fieldvalues[j].toUpperCase().indexOf(inputtext.toUpperCase()) > -1)
 {
 smatch = true; break; }
 }
 }
 if(!smatch)
 continue; onematch = true; srchdata = ""; ptsCustomsrchobj.elements.ptsResultsOpen = true; var tempRecntsrchid = rcntsrchlist[i].recntsrchid; if (typeof tempRecntsrchid == "string")
 {
 tempRecntsrchid = rcntsrchlist[i].recntsrchid.replace(/&#39;/g, "\'"); tempRecntsrchid = tempRecntsrchid.replace(/&#34;/g, "\""); }

 if((document.getElementById(ptsCustomsrchobj.elements.Iddropdown).options.length == 2) && (document.getElementById(ptsCustomsrchobj.elements.Iddropdown).options[1].value == tempRecntsrchid))
 this.creterowlist(rcntsrchlist[i].recntsrchid,true); else
 this.creterowlist(rcntsrchlist[i].recntsrchid,false); if(ptsCustomsrchobj.elements.IsSavedsrch)
 document.getElementById("pts_cd_link_title_2_" + rcntsrchlist[i].recntsrchid).innerHTML = "<strong>" + rcntsrchlist[i].recntsrchid + "</strong>"; var spandata = document.getElementById("pts_cd_link_title_" + rcntsrchlist[i].recntsrchid); if(rcntsrchlist[i].fieldvalues.length > maxfieldstoshow)
 document.getElementById("pts_cd_link_title_" + rcntsrchlist[i].recntsrchid).classList.add("pts_cd_link_wrapped"); for(var j=0;j<rcntsrchlist[i].fieldvalues.length;j++)
 {
 if(j == maxfieldstoshow)
 {
 srchdata2 = "+" + (rcntsrchlist[i].fieldvalues.length-j) + "more"; document.getElementById("pts_cd_link_title_1_" + rcntsrchlist[i].recntsrchid).classList.remove("psc_hidden"); document.getElementById("pts_cd_link_title_1_" + rcntsrchlist[i].recntsrchid).innerHTML = srchdata2; break; }
 srchdata = this.getsrchdata(srchdata,i,j); if(srchdata)
 spandata.innerHTML = srchdata; if(this.isEllipsisSet(document.getElementById("pts_cd_link_title_" + rcntsrchlist[i].recntsrchid)) )
 {
 if(rcntsrchlist[i].fieldvalues.length-j-1 > 0)
 {
 if(rcntsrchlist[i].fieldvalues.length <= maxfieldstoshow)
 document.getElementById("pts_cd_link_title_" + rcntsrchlist[i].recntsrchid).classList.add("pts_cd_link_wrapped"); var k = 0; for(k = 0; k <= j ; k++)
 {
 srchdata = this.getsrchdata(srchdata,i,k); if(srchdata)
 spandata.innerHTML = srchdata; if(this.isEllipsisSet(document.getElementById("pts_cd_link_title_" + rcntsrchlist[i].recntsrchid)))
 break; }
 srchdata2 = "+" + (rcntsrchlist[i].fieldvalues.length-k-1) + "more"; document.getElementById("pts_cd_link_title_1_" + rcntsrchlist[i].recntsrchid).classList.remove("psc_hidden"); document.getElementById("pts_cd_link_title_1_" + rcntsrchlist[i].recntsrchid).innerHTML = srchdata2; }
 break; } 
 } 
 }
 if(onematch == false)
 {
 if(rcntsrchlist.length == 0)
 {
 if(ptsCustomsrchobj.elements.IsSavedsrch)
 {
 this.elements.Pts_cd_searchedit.classList.add("pts_cd_hidden"); this.elements.Pts_cd_Categories.classList.add("pts_cd_padding_top"); srchdata = "<div id = 'pts_cd_nores_id' class = 'pts_cd_nores'><img src='/cs/MS/cache/PTS_SAVED_SRCH_1.svg' id = 'pts_cd_nores_img_id' class ='pts_cd_nores_img'><p><strong>Nothing yet</strong> </p><p id = 'pts_cd_nores_tid' class ='pts_cd_nores_text'>Your saved searches will appear here</p> </div>"; }
 else
 {
 this.elements.Pts_cd_searchedit.classList.add("pts_cd_hidden"); this.elements.Pts_cd_Categories.classList.add("pts_cd_padding_top"); srchdata = "<div id = 'pts_cd_nores_id' class = 'pts_cd_nores'><img src='/cs/MS/cache/PTS_RCNT_SRCH_1.svg' id = 'pts_cd_nores_img_id' class ='pts_cd_nores_img'><p><strong>Nothing yet</strong> </p><p id = 'pts_cd_nores_tid' class ='pts_cd_nores_text'>Your recent searches will appear here</p> </div>"; }
 this.elements.Pts_cd_Categories.setAttribute("onkeydown","javascript:ptsCustomsrchobj.ptscdNothingYetKeyDownFunction(event);"); }
 else
 {
 srchdata = "No Results to Display"; var elePTSCDKEYWORD = document.getElementById("PTSCDKEYWORD"); if(elePTSCDKEYWORD) {
 elePTSCDKEYWORD.setAttribute("aria-live", "polite"); elePTSCDKEYWORD.setAttribute("aria-label", "No Results to Display"); }
 }
 ptsCustomsrchobj.elements.ptsResultsOpen = true; this.creterowlist(1,false); var spandata = document.getElementById("pts_cd_link_title_" + 1); spandata.innerHTML = srchdata; document.getElementById("PTS_CD_RSLTS_ROW_1").classList.add("pts_cd_nolink"); }
 
 else {
 var elePTSCDKEYWORD = document.getElementById("PTSCDKEYWORD"); if(elePTSCDKEYWORD) {
 elePTSCDKEYWORD.removeAttribute("aria-label"); }
 }
 }
 this.getsrchdata = function(srchdata,index1,index2)
 {
 var i = index1; var j = index2; if(j == 0)
 {
 if(this.elements.OperDisp)
 {
 srchdata= rcntsrchlist[i].fieldlabel[j] + "(" + rcntsrchlist[i].operators[j] + "):" + "<strong>" + rcntsrchlist[i].fieldvalues[j] + "</strong>"; }
 else
 {
 srchdata= rcntsrchlist[i].fieldlabel[j] + ":" + "<strong>" + rcntsrchlist[i].fieldvalues[j] + "</strong>"; } 
 } 
 else
 {
 if(this.elements.OperDisp)
 {
 srchdata= srchdata + "," + rcntsrchlist[i].fieldlabel[j] + "(" + rcntsrchlist[i].operators[j] + "):" + "<strong>" + rcntsrchlist[i].fieldvalues[j] + "</strong>"; }
 else
 {
 srchdata= srchdata + "," + rcntsrchlist[i].fieldlabel[j] + ":" + "<strong>" + rcntsrchlist[i].fieldvalues[j] + "</strong>";  }
 } 
 return srchdata; }
 this.isEllipsisSet = function(event) {
 return (event.offsetWidth < event.scrollWidth); }
 this.populateResults = function(inp) 
 {
 
 while(ptsCustomsrchobj.elements.Pts_cd_rslts_ul.firstChild) {
 ptsCustomsrchobj.elements.Pts_cd_rslts_ul.removeChild(ptsCustomsrchobj.elements.Pts_cd_rslts_ul.firstChild); }
 ptsCustomsrchobj.elements.ptsResultsOpen = false;  this.SetResultStream(inp); }
 this.setCustomsrchpos = function()
 {
 if(ptsCustomsrchobj.elements.IsCompleted === true)
 return; document.getElementById(ptsCustomsrchobj.elements.Iddropdown).style.visibility="hidden"; document.getElementById(ptsCustomsrchobj.elements.Iddropdown).style.display="inline-block"; var XYposition = document.getElementById(ptsCustomsrchobj.elements.Iddropdown).getBoundingClientRect(); ptsCustomsrchobj.elements.Pts_cd_contentbox.style.width = XYposition.width + "px"; document.getElementById(ptsCustomsrchobj.elements.Iddropdown).style.display="none";  var values = document.getElementById(ptsCustomsrchobj.elements.Pts_cd_searchedit.id).getBoundingClientRect(); var maxheight = window.innerHeight - values.bottom - 35 + "px"; ptsCustomsrchobj.elements.Pts_cd_rsltsstream.style.maxHeight = maxheight; }
 this.findtargetParent = function(target)
 {
 for (; target && target !== document; target = target.parentNode) {
 if (ptsCustomsrchobj.hasClass(target, "pts_cd_keynav-list"))
 return target; if (ptsCustomsrchobj.hasClass(target, "pt_keynav-listtab"))
 return target; }
 return null; }
 this.hasClass = function(obj, sClass0)
 {
 if (!obj)
 return false; var sClass = (obj.getAttribute("class")) ? obj.getAttribute("class") : ""; if (sClass.length == 0)
 return false; var aClass = sClass.split(" "); for (var i = 0; i < aClass.length; i++)
 if (aClass[i] === sClass0)
 return true; return false; }

 this.findNextElementinList = function(target, objList, bDown)
 {
 var bScroll = false; for (var i = 0, newIndex = 0; i < objList.length; i++) {
 if (objList[i].id == target.id) {
 while (objList.length > 1 && !bScroll) {
 if (bDown) {
 if (i == objList.length - 1) {
 newIndex = 0; i = newIndex; bScroll = true; } else
 newIndex = ++i; } else {
 if (!i) {
 newIndex = objList.length - 1; i = newIndex; bScroll = true; } else
 newIndex = --i; }
 if(!bScroll && !ptCommonObj2.tryFocus0(objList[newIndex]))
 { 
 return true; }
 if(bScroll)
 return true; }
 }
 }
 return false; }
 this.ptscdkeyDownFunction = function(e){
 var activeElement = document.activeElement; var activelemId = activeElement.id; var partArray; var isShiftTab = isShiftKey(e) && getKeyCode(e) == 9 ? true : false; if (e.key === "Escape" || e.key === "Esc" || e.key === "Tab" || e.keyCode === "Tab" || isShiftTab) {
 if(isShiftTab)
 {
 e.preventDefault(); ptsCustomsrchobj.elements.Pts_cd_keyword_ip.focus();  }
 else
 {
 e.stopPropagation(); ptsCustomsrchobj.ptscdClickoutside(e); }
 return true; }
 if(e.key === "ArrowDown" || e.key === "down")
 {
 var list = this.findtargetParent(activeElement); var tagName = activeElement.tagName; var objList = list.querySelectorAll(tagName + "[tabindex]"); e.stopPropagation(); e.preventDefault(); if (list && ptsCustomsrchobj.findNextElementinList(activeElement, objList, true))
 return true; }
 if(e.key === "ArrowUp" || e.key === "Up")
 {
 var list = this.findtargetParent(activeElement); var tagName = activeElement.tagName; var objList = list.querySelectorAll(tagName + "[tabindex]"); e.stopPropagation(); e.preventDefault(); if (list && ptsCustomsrchobj.findNextElementinList(activeElement, objList,false))
 return true; }
 }

 this.ptscdNothingYetKeyDownFunction = function(e){
 var activeElement = document.activeElement; var activelemId = activeElement.id; var partArray; var isShiftTab = isShiftKey(e) && getKeyCode(e) == 9 ? true : false; if (e.key === "Escape" || e.key === "Esc" || e.key === "Tab" || e.keyCode === "Tab" || isShiftTab) {
 e.stopPropagation(); ptsCustomsrchobj.ptscdClickoutside(e); }
 return true; }


 this.SetText = function(val)
 {
 var rcntmerged = 'pts_cd_link_title_' + val; if(document.getElementById(ptsCustomsrchobj.elements.Iddropdown).options.length == 2)
 {
 document.getElementById(ptsCustomsrchobj.elements.Iddropdown).options[1].text = document.getElementById(rcntmerged).textContent; document.getElementById(ptsCustomsrchobj.elements.Iddropdown).options[1].value = val + "->" + document.getElementById(rcntmerged).textContent.slice(0, 200); }
 else
 {
 document.getElementById(ptsCustomsrchobj.elements.Iddropdown).options[0].text = document.getElementById(rcntmerged).textContent; document.getElementById(ptsCustomsrchobj.elements.Iddropdown).options[0].value = val + "->" + document.getElementById(rcntmerged).textContent.slice(0, 200); }
 var childelem = document.getElementById(ptsCustomsrchobj.elements.Pts_cd_searchwidget.id); var prntelem = childelem.parentElement; prntelem.removeChild(childelem); ptsCustomsrchobj.elements.IsCompleted = true; document.getElementById(ptsCustomsrchobj.elements.Iddropdown).style.visibility="visible"; document.getElementById(ptsCustomsrchobj.elements.Iddropdown).style.display="inline-block"; addchg_win0(document.getElementById(ptsCustomsrchobj.elements.Iddropdown)); submitAction_win0(document.getElementById(ptsCustomsrchobj.elements.Iddropdown).form,document.getElementById(ptsCustomsrchobj.elements.Iddropdown).id);  }
}
function pts_loadsearchmenu(dropdownid,operatorval,type)
{
 
 var locid ; if(document.getElementById(dropdownid))
 locid = document.getElementById(dropdownid).parentElement; else
 {
 if(dropdownid == "PTS_CUSTRCNT_CL")
 {
 dropdownid = "PTS_CUSTRCNT_KW_CL"; locid = document.getElementById(dropdownid).parentElement; }
 else
 {
 if(dropdownid == "PTS_CUSTSAVED_CL")
 {
 dropdownid = "PTS_CUSTSAVE_KW_CL"; locid = document.getElementById(dropdownid).parentElement; }
 else
 return; }
 }
 while(locid.id == "")
 {
 locid = locid.parentElement; }
 var parentid = "#" + locid.id;  if(typeof(ptsCustomsrchobj) !== "undefined" && ptsCustomsrchobj)
 {
 ptsCustomsrchobj = ""; }
 ptsCustomsrchobj = new CustomSearchGeneration(parentid,dropdownid,operatorval,type); ptsCustomsrchobj.generateCDSearchWidget(); ptsCustomsrchobj.setCustomsrchpos(); ptsCustomsrchobj.populateResults(ptsCustomsrchobj.elements.Pts_cd_keyword_ip); document.getElementById(dropdownid).style.display="none"; ptsCustomsrchobj.elements.Pts_cd_searchmask.classList.remove("psc_hidden"); ptsCustomsrchobj.elements.Pts_cd_keyword_ip.focus(); ptsCustomsrchobj.addListeners();}

function AddPSERRORStyle(id)
{
 var elField = document.getElementById(id); if(elField)
 elField.classList.add("PSERROR");}

function AddTabIndexToNoSearches(sId)
{
 var divId = "win0div"+sId; var divElement = document.getElementById(divId); if(divElement)
 {
 var childDivElement = divElement.firstElementChild; if(childDivElement)
 {
 childDivElement.setAttribute("tabindex", "0"); }
 }
}
