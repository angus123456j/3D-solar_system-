var PTQABWin = {
 Url: "",
 OpenState: "",
 IsOpen: false,
 IframeDoc: null,
 IsAccessible: false,
 TriggerElement: null,
 Mode: "",
 bHideOnly: false,
 Load: function() {
 var QABWinCont = '<div id="psQABWin" class="psQABWin PTQABWinModal "><iframe id="psQABWinIFrame" name="psQABWinIFrame" width="320" height="400" frameborder="0" title ="Quick Access"></iframe></div>'; var psQABMask = document.createElement("div"); psQABMask.id = "psQABWinMask"; psQABMask.innerHTML = QABWinCont; var el = document.querySelector('body'); el.appendChild(psQABMask); var elIF = el.querySelector('#psQABWinIFrame'); elIF.src = encodeURI(PTQABWin.Url + "&qabparm=" + PTQABWin.Mode); TriggerElement = document.activeElement; },

 Toggle: function() {
  var el = document.querySelector('.PTQABWinModal'); if(el != null && this.IsOpen == false) {
 el.parentNode.removeChild(el); this.Load(); el = document.querySelector('.PTQABWinModal'); }
 if (el == null) {
 this.Load(); el = document.querySelector('.PTQABWinModal'); }
 this.IsOpen = !this.IsOpen; this.IsAccessible = (getCookieValue('ps_theme').indexOf('accessibility:A') != -1);  var pel = el.parentNode; pel.style.visibility = 'visible'; pel.style.position = 'absolute'; pel.style.right = 0; pel.style.display = 'block'; pel.style.zIndex = this.IsOpen?'210':'1'; pel.style.width = this.IsOpen?'100%':'0%'; pel.setAttribute('onclick', 'javascript:DoQABpopup("");'); addClass(pel, 'PTQABWinLocation');  if (this.OpenState == '') 
 this.OpenState = 'slidein'; var elBody = document.querySelector('body'); if (this.IsAccessible) {
 if (this.IsOpen) {
 elBody.style.cssText = elBody.style.cssText + " visibility: hidden;"; if (typeof hidePtWrapper == "function") hidePtWrapper(); addClass(el, 'acs_mode');  } else {
 elBody.style.cssText = ""; if (typeof unhidePtWrapper == "function") unhidePtWrapper(); removeClass(el, 'acs_mode'); }
 }
 if (isFModeLayout()) {
 var ptMask = document.querySelector('#pt_modalMask'); if (ptMask) {
 if (this.IsOpen)
 ptMask.style.cssText = "height: 100%; width: 100%; display: block;"; else {
 ptMask.style.cssText = "height: 100%; width: 100%; display: none;"; closeQABProcessing(); }
 }
 }
 toggleClass(el, this.OpenState); if( this.IsOpen === false && !this.bHideOnly) 
 this.Close(); },
 
 Hide: function() {
 this.bHideOnly = true; this.Toggle(); },

 Close: function() {
 this.bHideOnly = false; var psQABMask = document.getElementById('psQABWinMask'); if( psQABMask != null) 
 document.body.removeChild(psQABMask); },

};function DoQABpopup(mode) { 
 if (mode === "") {
 var elIframe = parent.document.getElementById('psQABWinIFrame'); if (elIframe === null) return; }
 else if ((mode != 'MRU') && (mode != 'FAV')) 
 return; PTQABWin.Mode = mode; if (isFModeLayout())
 eval('processing_win0(1,3000)'); doCloseLocalModals();  var aBtn = document.querySelectorAll(":root.psc_mode-access .pt_hdr-qabcontainer .ps-button[tabindex]"); if (mode !== "" && aBtn.length === 2) {
 aBtn[0].setAttribute("tabindex",aBtn[0].id.includes(mode) ? "0" : "-1"); aBtn[1].setAttribute("tabindex",aBtn[1].id.includes(mode) ? "0" : "-1"); }

 PTQABWin.Toggle();  if (TriggerElement != null) 
 TriggerElement.focus(); }


function setQABKeyHandler() {
 var elIframe = parent.document.getElementById('psQABWinIFrame'); if (elIframe == null) return; var elpopup = elIframe.contentDocument.querySelector('.pt_qab-popup'); if (elpopup == null) return; elpopup.addEventListener("keyup", QABKeyHandler);}


function QABKeyHandler(e) {
 var e = window.event || e;  if (e.keyCode == 27) {
 e.preventDefault(); e.stopPropagation(); closeQABPopup(); return; }
 var fEl, isTab, isShiftTab, els; fEl = document.activeElement; if (typeof fEl == "undefined" || fEl == null) return; isTab = ((!isShiftKey(oLastKeyEvent)) && (getKeyCode(oLastKeyEvent) == 9)); isShiftTab = ((isShiftKey(oLastKeyEvent)) && (getKeyCode(oLastKeyEvent) == 9)); if (!isTab && !isShiftTab) return; els = document.querySelectorAll(".pt_qab-popup [tabindex='0']:not(.ps-anchor), .pt_qab-popup .ps-button:not([disabled]"); if (!els || !els.length) return; if (isTab && (hasClass(fEl, "ps-anchor"))) {
 els[0].focus(); }
 else if (isShiftTab && (hasClass(fEl, "ps-anchor"))) { 
 els[els.length - 1].focus(); }
}


function setQABpopupfocus() {
 var elIframe = parent.document.getElementById('psQABWinIFrame'); if (elIframe === null) return; var elfrmDoc = elIframe.contentDocument; if (elfrmDoc === null) return; var elcont = elfrmDoc.getElementById('PT_CONTENT'); if (elcont != null) {
 var lbl = (top.PTQABWin.Mode == "MRU") ? "Recently Visited" : (top.PTQABWin.Mode == "FAV") ? "Favorites" : ""; elcont.setAttribute("role", "region"); elcont.setAttribute("aria-label", lbl); }

 var el= elfrmDoc.querySelector('.pt_qab-scrollablecontent .lplistgrid li a[sfocus]')
 if (el != null) {
 if (top.PTQABWin.Mode == "FAV") {
 var elLiveRegion = elfrmDoc.querySelector(".ps_box-announce.ps_alert-normal"); if (elLiveRegion)
 psPostText(elLiveRegion, "You can select the Edit Favorites button to access the Edit Favorites page"); }
 el.focus(); el = elfrmDoc.querySelectorAll('.pt_qab-popup a.ps-anchor')[0]; if (el != null) 
 el.setAttribute("tabindex","0"); return; }
 
 el = elfrmDoc.querySelectorAll('.pt_qab-popup .ps-button:not([disabled]')[0]; if (el != null) {
 el.focus();  }
}


function closeQABPopup() {
 var input=window.parent.document.getElementById('psQABWinIFrame'); if(input != null) input.style.display='none'; parent.DoQABpopup("");}


function closeQABProcessing() {
 if(window.parent.document.getElementById('processing') != null ) {
 var maskElem = window.parent.document.getElementById('processing').parentElement; if(maskElem != null) {
 disableInteractionDuringProcessing(maskElem, false); maskElem.style.display="none"; }
 }
}

function toggleQABPopup() {
 closeQABPopup();}
