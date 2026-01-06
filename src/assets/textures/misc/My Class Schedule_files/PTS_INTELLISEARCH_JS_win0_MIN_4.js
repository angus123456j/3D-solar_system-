function PTS_SearchUI() { }

PTS_SearchUI.prototype = {
 
 initSearch: function (inputParamJSON){
 var params = JSON.parse(inputParamJSON);  this.ptsOpenSearchInModal = params.openSearchInModal;  this.ptsSearchCategory = params.searchcategory; this.inputDelayTime = null; this.ptsincludeHiddenCref = params.includeHiddenCref; this.ptsisComponentURL = params.includeOnlyCompOrGeneric; this.ptsPageName = params.page; this.ptsPagetype = "H"; this.ptsInitialStateFromClassicWithKeywordsTyped = false;  this.ptsIsSearchWidgetOpenedFromClassicPageFlag = false;  this.ptsIsAccessibilityMode = params.isAccessibilityMode; this.ptsResultsOpen = false; this.ptsShowCompletePath = params.showCompletePath; this.srchWidgetId = params.srchWidgetId; if(params.isInitialLoad){
 this.ptsInitialLoad = params.isInitialLoad; }
 else
 {
 this.ptsInitialLoad = false; }

 if(params.componentSearchURL !== ""){
 this.componentHeaderCategory = params.searchcategory; this.componentSearchURL = params.componentSearchURL; }
 
 
 var ptsSearchWidgetArr = []; if(params.srchWidgetId !== "" && params.srchWidgetId !== "classic")
 {
 
 ptsSearchWidgetArr = document.querySelectorAll("#"+params.srchWidgetId); }
 else
 {
 ptsSearchWidgetArr = document.querySelectorAll("#"+winName+"divPTS_SEARCHWIDGET"); }

 for (let i = 0; i < ptsSearchWidgetArr.length; i++) 
 {
 this.ptsSearchWidget = ptsSearchWidgetArr[i]; if (this.ptsSearchWidget !== null){

 if(params.hideSearch){
 this.ptsSearchWidget.classList.add("pts_search_widget_hide")
 }
 else{
 
 this.ptsSearchWidgetMask = this.ptsSearchWidget.querySelector(".pts_search_mask"); this.ptsSearchcontentDiv = this.ptsSearchWidget.querySelector(".pts_search_content"); this.ptsSetModalStyles();  this.ptsShowContentDiv();  if(this.ptsIsSearchWidgetOpenedFromClassicPage())
 {
 this.ptsSetSearchWidgetStateForClassic(params); }
 else
 {
 
 this.ptsSetPlaceholder(params.scLabel, params.placeholder, params.keywordLabel); this.ptsSetButtons(params.scLabel, params.showCategoryDropDown,params.showGlobalSearchButton); }
 
 this.ptsAddAriaAttributes(params.showCategoryDropDown);  this.ptsAddEventListeners(); this.ptsStyleCategoryDropdown();  if (params.showGridIcons !== undefined && !params.showGridIcons){
 this.ptsSearchWidget.querySelector(".pts_search_tray").classList.add("pts_gridicons_none");  } 

 if (params.openSearchInModal === true){
 this.ptsOpenSearchBox(); }
 }
 }
 } 
 },

 
 ptsSetSearchWidgetStateForClassic:function(params) {

 
 var searchBoxPlaceHolderElementInClassic = top.document.getElementById('ptsKeywordPlaceHolder'); var searchBoxPlaceHolderTextForClassic = searchBoxPlaceHolderElementInClassic.getAttribute('placeholder'); var scLabelForClassic = searchBoxPlaceHolderElementInClassic.getAttribute('sclabelforclassic'); var scNameForClassic = searchBoxPlaceHolderElementInClassic.getAttribute('scnameholderforclassic'); if(scLabelForClassic && scNameForClassic)
 {
 
 this.ptsSetPlaceholder(scLabelForClassic, searchBoxPlaceHolderTextForClassic);  this.ptsSetButtons(scLabelForClassic, params.showCategoryDropDown,params.showGlobalSearchButton);  var catDropDownElement = this.ptsSearchWidget.querySelector(".pts_category_dropdown"); var catDropDownLinkList = catDropDownElement.getElementsByTagName('a');  for(let i = 0; i < catDropDownLinkList.length; i++)
 {
 var currentCatDropDownLink = catDropDownLinkList[i]; var catNameAttr = currentCatDropDownLink.getAttribute("catname"); if(scNameForClassic === catNameAttr)
 {
 
 this.ptsSetCategory(currentCatDropDownLink); }
 }
 }
 else
 {
 
 this.ptsSetPlaceholder(params.scLabel, params.placeholder); this.ptsSetButtons(params.scLabel, params.showCategoryDropDown,params.showGlobalSearchButton); }

 
 var searchBoxPlaceHolderValueForClassic = searchBoxPlaceHolderElementInClassic.value; if(searchBoxPlaceHolderValueForClassic)
 {
 var searchWidgetBox = document.querySelector("#PTSKEYWORD"); searchWidgetBox.value = searchBoxPlaceHolderValueForClassic; this.ptsInitialStateFromClassicWithKeywordsTyped = true; }

 },

 
 ptsGetKeywordsInClassicPlaceholderSearchBox: function() {
 var inputvalforclassic = "";  var inputvalforclassic=top.document.getElementById('ptsKeywordPlaceHolder').value; this.ptsInitialStateFromClassicWithKeywordsTyped = false;  var scnameforClassic = top.document.getElementById('ptsKeywordPlaceHolder').getAttribute('scnameholderforclassic'); if(scnameforClassic)
 {
 this.ptsSearchCategory = scnameforClassic; }
 return inputvalforclassic; },

 
 ptsIsSearchWidgetOpenedFromClassicPage: function() {

 var ptsPageInfoElementId = "pt_pageinfo_win0"; var ptsTargetFrameForClassic = window.parent.document.getElementById('ptifrmtgtframe'); if(ptsTargetFrameForClassic) 
 {
 var ptsPageInfoElementForClassic = ptsTargetFrameForClassic.contentWindow.document.getElementById(ptsPageInfoElementId); if (ptsPageInfoElementForClassic && (ptsPageInfoElementForClassic.getAttribute("mode") == "CLASSIC")) {
 this.ptsIsSearchWidgetOpenedFromClassicPageFlag = true; return true; }
 }

 return false; },

 ptsSetWidget: function (activeElement) {
 var closestPtsSearchWidget = activeElement.closest(".pts_search_widget"); if (closestPtsSearchWidget !== null){
 this.ptsSearchWidget = closestPtsSearchWidget; this.ptsSearchcontentDiv = this.ptsSearchWidget.querySelector(".pts_search_content"); this.ptsSearchWidgetMask = this.ptsSearchWidget.querySelector(".pts_search_mask"); }
 },
 ptsIsHeaderSearchBar: function (ptsSearchWidget) {
 if(ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic"))
 return true; else
 return false; },
 ptsGetCategory: function (ptsSearchWidget) {
 if(ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic"))
 return "PTSCATEGORYBTN"; else
 return "PTSCATEGORYBTNSS"; },
 ptsGetTitle: function (ptsSearchWidget) {
 if(ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic"))
 return "PTSTITLE"; else
 return "PTSTITLESS"; },
 ptsGetSuggGrid: function (ptsSearchWidget) {
 if(ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic"))
 return "PTS_INTELLISRCH_RS"; else
 return "PTS_INTELLISRCH_HD"; },
 ptsGetSearchButton: function (ptsSearchWidget) {
 if(ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic"))
 return "PTSSEARCHBTN"; else
 return "PTSSEARCHBTNSS"; },
 ptsGetKeywordButton: function (ptsSearchWidget) {
 if(ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic"))
 return "PTSKEYWORD"; else
 return "PTSKEYWORDSS"; },
 ptsGetResultsButton: function (ptsSearchWidget) {
 if(ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET") || this.srchWidgetId.includes("classic"))
 return "PTSRESULTS"; else
 return "PTSRESULTSS"; },

 ptsShowContentDiv: function(){
 if(this.ptsSearchcontentDiv && this.ptsSearchcontentDiv.getAttribute("style"))
 this.ptsSearchcontentDiv.removeAttribute("style"); if(this.ptsSearchcontentDiv){
 this.ptsSearchcontentDiv.classList.remove("psc_hidden");  }
 if (document.querySelector(".ps_header_bar")){ 
 document.querySelector(".ps_header_bar").classList.add("pts_search_enabled");  this.ptsSearchcontentDiv.classList.remove("psc_hidden");  } 
 },
 
 ptsSetModalStyles: function(){
 if (this.ptsOpenSearchInModal === true){ 
 window.parent.document.querySelector("#ptsSearchIFrame").style.display = "block"; document.querySelector("body").style.backgroundColor = "transparent"; document.querySelector("html").style.backgroundColor = "transparent"; document.querySelector("form").style.backgroundColor = "transparent";  this.ptsSearchWidgetMask.style.backgroundColor = "#000"; }
 },

 ptsSetPlaceholder: function(catlabel, placeholder, keywordLabel){
 var keywordfield = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)); keywordfield.setAttribute("type", "text"); keywordfield.setAttribute("role", "combobox"); keywordfield.setAttribute("aria-expanded", "false"); if(keywordLabel !== undefined && keywordLabel!="")
 {
 keywordfield.setAttribute("aria-label", keywordLabel); }
 if (catlabel === "All")
 catlabel = "All "+ "Category"
 
 if (placeholder !== undefined && placeholder !== "")
 keywordfield.setAttribute("placeholder",placeholder); else{
 var placeholdertext = "Search in "+ catlabel;  keywordfield.setAttribute("placeholder",placeholdertext); }
 
 },

 ptsSetButtons: function(catlabel,showCategoryDropDown,showGlobalSearchButton){
 
 var catbtndiv = this.ptsSearchWidget.querySelector(".pts_category_button");  if (!showCategoryDropDown){
 catbtndiv.classList.add("psc_hidden"); this.ptsSearchWidget.querySelector(".pts_editbox").classList.remove("pts_categorybtn_exists");  var catbtn = catbtndiv.querySelector(".ps-button"); catbtn.setAttribute("scname",this.ptsSearchCategory);  }
 else{
 catbtndiv.classList.remove("psc_hidden"); var catbtn = catbtndiv.querySelector(".ps-button"); catbtn.setAttribute("scname",this.ptsSearchCategory); catbtn.setAttribute("title","Search Category selector"); catbtn.innerHTML = catlabel; this.ptsSearchWidget.querySelector(".pts_editbox").classList.add("pts_categorybtn_exists");  }
 if(!showGlobalSearchButton){
 this.ptsSearchWidget.querySelector(".pts_search_button").classList.add("psc_hidden"); this.ptsSearchWidget.querySelector(".pts_editbox").classList.remove("pts_searchbtn_exists"); }else{
 var srchbtn = this.ptsSearchWidget.querySelector(".pts_search_button"); srchbtn.classList.remove("psc_hidden"); this.ptsSearchWidget.querySelector(".pts_editbox").classList.add("pts_searchbtn_exists"); }
 },

 ptsAddAriaAttributes: function(showCategoryDropDown){
 if (showCategoryDropDown && document.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)+"_ariaD") === null){
 var ariaDesc = document.createElement('span'); ariaDesc.id = this.ptsGetCategory(this.ptsSearchWidget)+"_ariaD"; ariaDesc.style.display = "none"; if (this.ptsSearchWidget !== null){
 var catbtn = this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)); catbtn.parentNode.appendChild(ariaDesc); catbtn.setAttribute("aria-describedby",ariaDesc.id); ariaDesc.innerHTML = "Current search category:" + catbtn.innerHTML;  catbtn.setAttribute("aria-label","Search Category selector"); } 
 ariaDesc = document.createElement('span'); ariaDesc.id = this.ptsGetKeywordButton(this.ptsSearchWidget)+"_ariaD"; ariaDesc.style.display = "none"; if (this.ptsSearchWidget !== null){
 var keyword = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)); keyword.parentNode.appendChild(ariaDesc); keyword.setAttribute("aria-describedby",ariaDesc.id); ariaDesc.innerHTML = "Press the Enter key to display the default suggestions, or input keywords to search.";  } 
 ariaDesc = document.createElement('span'); ariaDesc.id = this.ptsGetResultsButton(this.ptsSearchWidget)+"_ariaD"; ariaDesc.style.display = "none"; if (this.ptsSearchWidget !== null){
 var keyword = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)); keyword.parentNode.appendChild(ariaDesc); ariaDesc.innerHTML = "Search suggestions have been displayed. Use the arrow keys to review the results. Press the Enter key on a selected suggestion to navigate to that item.";  } 
 }
 },

 ptsOpenSearchBox: function () {
 this.ptsPagetype = "T"; if(window.innerWidth <= 680){
 this.ptsSearchWidget.classList.add("pts_search_widget_sff"); }else if (window.innerWidth <= 990 && window.innerWidth > 680){
 if(this.ptsIsSearchWidgetOpenedFromClassicPageFlag && window.innerWidth >= 766)
 this.ptsSearchWidget.classList.add("pts_search_widget_mff_na");  else
 this.ptsSearchWidget.classList.add("pts_search_widget_mff");  }
 if(window.innerWidth > 680){
 var searchbutton; if(window.parent.document.getElementById("PT_GSEARCH_BTN")){
 searchbutton = window.parent.document.getElementById("PT_GSEARCH_BTN").getBoundingClientRect();  }
 else if (window.parent.document.getElementById("pthdr2suggestionsearch")){
 searchbutton = window.parent.document.getElementById("pthdr2suggestionsearch").getBoundingClientRect();  }
 
 this.ptsSearchcontentDiv.style.top = searchbutton.top+"px"; if ("right" === "right")
 this.ptsSearchcontentDiv.style.right = "calc(100vw - "+searchbutton.right+"px)"; else
 this.ptsSearchcontentDiv.style.left = searchbutton.left+"px";  }
 
 
 var searchBoxPlaceHolderClassicBanner = window.parent.document.getElementById('ptsKeywordPlaceHolder'); if(searchBoxPlaceHolderClassicBanner)
 this.ptsSearchcontentDiv.classList.add("pts_search_widget_for_classic"); else
 this.ptsSearchcontentDiv.style.position = "fixed";   this.ptsSearchcontentDiv.classList.remove("pts_search_widget_hide"); this.ptsSearchcontentDiv.style.zIndex = 211; this.ptsSearchWidgetMask.classList.remove("psc_hidden"); this.ptsSearchcontentDiv.classList.add("pts_search_focused"); this.ptsGetSearchResults(this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget))); this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)).addEventListener('keydown', function (e) { ptsSearchUIObj.ptskeyDownFunction(e)}); this.ptsSearchWidget.querySelector("#"+this.ptsGetSearchButton(this.ptsSearchWidget)).addEventListener('keydown', function (e) { ptsSearchUIObj.ptskeyDownFunction(e)});   if(!searchBoxPlaceHolderClassicBanner)
 this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)).focus();  },

 ptsReposition: function (){
 if (this.ptsSearchcontentDiv.classList.contains("pts_search_focused")){
 if(this.ptsSearchWidget.parentNode.classList.contains("pts_pagesearch_div")){
 this.ptsCloseAllLists(); }else{
 var searchtray = this.ptsSearchWidget.querySelector(".pts_search_tray"); var resultbox = searchtray.querySelector(".pts_results_grid"); var messagebox = searchtray.querySelector(".pts_message"); if(window.innerWidth > 680){
 var searchbutton; if(window.parent.document.getElementById("PT_GSEARCH_BTN")){
 searchbutton = window.parent.document.getElementById("PT_GSEARCH_BTN").getBoundingClientRect();  if (searchbutton.left == 0) 
 searchbutton = window.parent.document.getElementById("PT_NOTIFY").getBoundingClientRect();  if (searchbutton.left == 0) 
 searchbutton = window.parent.document.getElementById("PT_HOME").getBoundingClientRect();  }
 else if (window.parent.document.getElementById("pthdr2suggestionsearch")){
 searchbutton = window.parent.document.getElementById("pthdr2suggestionsearch").getBoundingClientRect();  }
 if(searchbutton.left !== 0 && this.ptsOpenSearchInModal){
 this.ptsSearchWidget.classList.remove("pts_search_widget_sff"); if (window.innerWidth <= 990)
 {
 if(this.ptsIsSearchWidgetOpenedFromClassicPageFlag && window.innerWidth >= 766)
 this.ptsSearchWidget.classList.add("pts_search_widget_mff_na");  else
 this.ptsSearchWidget.classList.add("pts_search_widget_mff");  }
 else{
 this.ptsSearchWidget.classList.remove("pts_search_widget_mff"); }
 this.ptsSearchcontentDiv.style.top = searchbutton.top+"px"; this.ptsSearchcontentDiv.style.width = ""; if ("right" === "right")
 this.ptsSearchcontentDiv.style.right = "calc(100vw - "+searchbutton.right+"px)"; else
 this.ptsSearchcontentDiv.style.left = searchbutton.left+"px";  }
 else if (!this.ptsOpenSearchInModal){ 
 this.ptsSearchWidget.classList.remove("pts_search_widget_sff");  this.ptsSearchWidget.classList.remove("pts_search_widget_mff"); this.ptsSearchcontentDiv.style.top = ""; this.ptsSearchcontentDiv.style.width = ""; this.ptsSearchcontentDiv.style.right =""; }
 else if(this.ptsOpenSearchInModal){
 this.ptsCloseIframe(); return; }
 var editbox = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).getBoundingClientRect(); var searchbtn = this.ptsSearchWidget.querySelector("#"+this.ptsGetSearchButton(this.ptsSearchWidget)).getBoundingClientRect(); var categorybtn = this.ptsSearchWidget.querySelector(".pts_category_button").getBoundingClientRect(); if ("left" === "left")
 searchtray.style.marginLeft = categorybtn.width+"px"; else
 searchtray.style.marginRight = categorybtn.width+"px"; resultbox.style.width= editbox.width+searchbtn.width+"px"; messagebox.style.width= editbox.width+searchbtn.width+"px";  }else{
 this.ptsSearchcontentDiv.style.right = "0"; this.ptsSearchcontentDiv.style.width = "100%"; resultbox.style.width= "100%"; messagebox.style.width= "100%"; this.ptsSearchWidget.classList.add("pts_search_widget_sff"); this.ptsSearchWidget.classList.remove("pts_search_widget_mff"); }
 }
 }
 },

 ptsTransactionViewTestPage: function () {
 this.ptsPagetype = "T"; var searchbutton = document.querySelector("#PTS_SEARCH_BTN").getBoundingClientRect(); this.ptsSearchcontentDiv.style.top = searchbutton.top+"px"; this.ptsSearchcontentDiv.style.right = "calc(100vw - "+searchbutton.right+"px"; this.ptsSearchcontentDiv.style.position = "fixed"; this.ptsSearchWidget.classList.remove("pts_search_widget_hide"); }, 

 ptsAddEventListeners: function () {
 var ptsHeaderSearchBox; var ptsHeaderCategoryDD; var ptsHeaderCategoryDDSFF; ptsSearchBox = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)); ptsCategoryDD = this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)); ptsSearchBox.addEventListener('keydown', function (e) { ptsSearchUIObj.ptsGetSuggestions(ptsSearchBox, e) }); window.top.addEventListener('click', function (e) {
 const button = document.getElementById('HOMEPAGE_SELECTOR$PIMG'); button.addEventListener('click', function handleClick() {
 var srchWidget = top.document.getElementById('PTSKEYWORD');srchWidget.value = ""; });  }); ptsSearchBox.addEventListener('click', function () { ptsSearchUIObj.ptsGetSearchResults(ptsSearchBox) });  ptsCategoryDD.setAttribute("href", "javascript:ptsSearchUIObj.ptsToggleCategories();"); ptsCategoryDD.setAttribute("onkeydown", "javascript:ptsSearchUIObj.ptskeyDownFunction(event);"); this.ptsSearchWidgetMask.addEventListener('click', function (e) { ptsSearchUIObj.ptsclickOutside(e) }); window.addEventListener("resize", function (e) { 
 if(ptsSearchUIObj.ptsSearchWidget !== null){
 ptsSearchUIObj.ptsReposition(); } }); },

 ptsStyleCategoryDropdown: function(){
 this.ptsSearchWidget.querySelector(".pts_category_dropdown").setAttribute("aria-modal","true"); this.ptsSearchWidget.querySelector(".pts_search_tray").setAttribute("aria-modal","true");  var catdropdownul = this.ptsSearchWidget.querySelector(".pts_category_dropdown").querySelector("ul"); catdropdownul.setAttribute("aria-label","Search in"); var resultdropdownul = this.ptsSearchWidget.querySelector(".pts_search_tray").querySelector("ul"); resultdropdownul.setAttribute("aria-label","Search Results"); var contentLabel = this.ptsSearchWidget.querySelector(".pts_content_label"); if (contentLabel){
 contentLabel.classList.remove("ps_box-link"); contentLabel.parentNode.classList.remove("ps_box-menuitem"); contentLabel.parentNode.setAttribute("role","heading"); contentLabel.removeChild(contentLabel.childNodes[0]); var node = document.createElement("h3");  node.innerHTML = "Category"; node.classList.add("ps-text"); contentLabel.appendChild(node); }
 },

 ptsToggleCategories: function () {
 this.ptsSetWidget(document.activeElement); var categoryDiv = this.ptsSearchWidget.querySelector(".pts_category_dropdown");  if (categoryDiv.classList.contains("psc_hidden")) {
 categoryDiv.classList.remove("psc_hidden"); categoryDiv.scrollTop = 0; this.ptsSearchWidgetMask.classList.remove("psc_hidden");  this.ptsSearchcontentDiv.classList.add("pts_search_focused");  var searchtray = categoryDiv.closest(".pts_search_widget").querySelector(".pts_search_tray"); if (!searchtray.classList.contains("psc_hidden")){
 searchtray.classList.add("psc_hidden"); }
 this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)).setAttribute("aria-expanded", "true"); var x = categoryDiv.querySelectorAll(".ps-link"); var i; for (i = 0; i < x.length; i++) {
 if (x[i].getAttribute("aria-current") != null)
 x[i].focus(); }
 } else {
 categoryDiv.classList.add("psc_hidden"); if (!this.ptsOpenSearchInModal){
 this.ptsSearchWidgetMask.classList.add("psc_hidden");  this.ptsSearchcontentDiv.classList.remove("pts_search_focused"); }
 this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)).focus(); this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)).setAttribute("aria-expanded", "false"); }
 },

 ptsSetCategory: function (catrow) {
 var catselected = catrow.innerHTML; catrow.setAttribute("aria-current","true"); if (catselected === "All"){
 catselected = "All "+ "Category"
 }
 if (this.ptsSearchWidget !== null && this.ptsSearchWidget.contains(catrow)) {
 this.ptsSearchCategory = catrow.getAttribute("catname");  var catbtn = this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)); catbtn.innerHTML = catselected; catbtn.setAttribute("title",catselected);  catbtn.setAttribute("scname",this.ptsSearchCategory); if (this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)+"_ariaD")){
 var ariaDesc = this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)+"_ariaD"); ariaDesc.innerHTML = "Current search category:" + catselected; }
 var placeholdertext = "Search in "+ catselected;  this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).setAttribute("placeholder",placeholdertext);   if(this.ptsIsSearchWidgetOpenedFromClassicPageFlag)
 {
  
  var searchBoxPlaceHolderClassicBanner = window.parent.document.getElementById('ptsKeywordPlaceHolder');  if(searchBoxPlaceHolderClassicBanner)
  {
  searchBoxPlaceHolderClassicBanner.setAttribute("placeholder",placeholdertext);  searchBoxPlaceHolderClassicBanner.setAttribute("scnameholderforclassic",this.ptsSearchCategory);  searchBoxPlaceHolderClassicBanner.setAttribute("sclabelforclassic",catselected);  }
 }

 this.ptsToggleCategories(); var currentSelect = this.ptsSearchWidget.querySelector(".pts_category_dropdown .pts_category_selected"); currentSelect.querySelector(".ps-link").removeAttribute("aria-label"); currentSelect.querySelector(".ps-link").removeAttribute("aria-current"); currentSelect.classList.remove("pts_category_selected");  } 
 catrow.closest(".ps_box-link").classList.add("pts_category_selected");  },

 ptsGetSuggestions: function (inp, e) {
 var activeElement = document.activeElement; var keyCode = event.keyCode; this.ptsSetWidget(activeElement); inp = this.ptsSearchWidget.querySelector("[id*='"+this.ptsGetKeywordButton(this.ptsSearchWidget)+"']"); if (!((keyCode >= 48 && keyCode <= 57) || 
 (keyCode >= 65 && keyCode <= 90) || 
 (keyCode >= 96 && keyCode <= 105) || 
 (keyCode >= 186 && keyCode <= 191) ||
 (keyCode >= 219 && keyCode <= 222) ||
 keyCode == 13 || keyCode == 27 || keyCode == 8 || keyCode == 32 ||
 (keyCode >= 37 && keyCode <= 40))) {
 return; }

 
 if((this.ptsSearchWidget.id.includes("srchdivPTS_SEARCHWIDGET") || this.ptsSearchWidget.id.includes("win0divPTS_SEARCHWIDGET")) && (!this.ptsSearchWidget.id.includes("hdrdivPTS_SEARCHWIDGET")) && (!this.srchWidgetId.includes("classic")))
 if (keyCode == 13)
 return; if (activeElement.id == this.ptsGetKeywordButton(this.ptsSearchWidget)) {
 if (e.key === "Enter") {
 var elSrchBtn = document.getElementById(this.ptsGetSearchButton(this.ptsSearchWidget)); ptsSearchUIObj.ptsDoGlobalSearch(elSrchBtn); return; }

 if (e.key === "ArrowRight") {
 if (activeElement.value == "" || e.target.selectionStart == activeElement.value.length) {
 var el = document.getElementById(this.ptsGetTitle(this.ptsSearchWidget)+"$0"); if (el){
 el.focus();  }
 }
 }
 }

 clearTimeout(this.inputDelayTime); this.inputDelayTime = setTimeout(function () {
 if (e.key !== "Escape" && e.key !== "Esc" && 
 e.key !== "Tab" && e.key !== "ArrowDown" && e.key !== "Down" 
 && e.key !== "ArrowUp" && e.key !== "Up" && e.key !== "ArrowRight")
 ptsSearchUIObj.ptsGetSearchResults(inp); if (e.key === "ArrowDown" || e.key === "Down" || e.key === "ArrowUp" || e.key === "Up") {
 if (ptsSearchUIObj.ptsResultsOpen) {
 if (e.key === "ArrowDown" || e.key === "Down") {
 var searchtray = ptsSearchUIObj.ptsSearchWidget.querySelector(".pts_search_tray"); searchtray.scrollTop = 0; var resultbox = searchtray.querySelector(".pts_results_grid"); if (!resultbox.classList.contains("psc_hidden"))
 resultbox.querySelector(".ps-link").focus(); e.stopPropagation(); }
 else if (e.key === "ArrowUp" || e.key === "Up") {
 var searchtray = ptsSearchUIObj.ptsSearchWidget.querySelector(".pts_search_tray"); searchtray.scrollTop = 9999; var resultbox = searchtray.querySelector(".pts_results_grid"); if (!resultbox.classList.contains("psc_hidden")) {
 var resultitems = resultbox.querySelectorAll(".ps_grid-row.ps_box-menuitem:not(.psc_hidden)"); resultitems[resultitems.length - 1].querySelector(".ps-link").focus(); }
 e.stopPropagation(); }
 } else
 ptsSearchUIObj.ptsGetSearchResults(inp); }
 else if(e.key === "Escape" || e.key === "Esc" || e.key === "Tab")
 ptsSearchUIObj.ptskeyDownFunction(e);  }, 500); },


 ptsGetSearchResults: function (inp) {
 if (this.ptsIsFetching){
 this.ptsIsSearchWaiting = true; return; }

 this.ptsSetWidget(document.activeElement);   this.ptsSearchCategory = this.ptsSearchWidget.querySelector("#" + this.ptsGetCategory(this.ptsSearchWidget)).getAttribute("scname"); inp = document.activeElement; this.ptsIsFetching = true; ptsProcessing(1,3000); categoryDiv = this.ptsSearchWidget.querySelector(".pts_category_dropdown");  this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)).setAttribute("aria-expanded", "false"); if (!categoryDiv.classList.contains("psc_hidden")) 
 categoryDiv.classList.add("psc_hidden"); var inputval = inp.value === undefined ? "" : inp.value;  if( this.ptsIsSearchWidgetOpenedFromClassicPageFlag )
 {
  
  if(this.ptsInitialStateFromClassicWithKeywordsTyped)
  {
  inputval = this.ptsGetKeywordsInClassicPlaceholderSearchBox();  }
  else
  {
  
  top.document.getElementById('ptsKeywordPlaceHolder').value = inputval;  }
 }

 inputval=inputval.replace(/%/g, "*"); inputval=inputval.replace(/&/g, " "); inputval=inputval.replace(/#/g, " "); var baseURI = getptBaseURI(); var ajaxURL; if (this.ptsSearchCategory.startsWith("PTPORTALREGISTRY")) {
 ajaxURL = baseURI + "s/WEBLIB_PTSF_SB.ISCRIPT1.FieldFormula.IScript_GetMenuItems"
 + "?keyword=" + inputval + "&category=" + this.ptsSearchCategory; if (this.ptsincludeHiddenCref !== undefined)
 ajaxURL = ajaxURL + "&includeHiddenCref=" + this.ptsincludeHiddenCref
 if (this.ptsisComponentURL !== undefined)
 ajaxURL = ajaxURL + "&isComponentURL=" + this.ptsisComponentURL; if (!this.ptsIsHeaderSearchBar(this.ptsSearchWidget) && this.ptsShowCompletePath !== undefined) 
 ajaxURL = ajaxURL + "&showCompletePath=" + this.ptsShowCompletePath; }
 else
 ajaxURL = baseURI + "s/WEBLIB_PTSF_SB.ISCRIPT1.FieldFormula.IScript_GetContentItems"
 + "?keyword=" + inputval + "&category=" + this.ptsSearchCategory + "&editId=" + inp.id; var loader = new net2.ContentLoader(ajaxURL, null, null, "GET",
 function () {
 try{
 var resultJson = JSON.parse(this.req.responseText); if(resultJson.recentItems.length <= 0 && resultJson.suggestionItems.length <= 0){
 ptsSearchUIObj.ptsSearchWidget.querySelector("#"+ptsSearchUIObj.ptsGetKeywordButton(ptsSearchUIObj.ptsSearchWidget)).setAttribute("aria-describedby","PTSDISPLAYMSG_ariaD");  ptsSearchUIObj.ptsshowDisplayMessage(""); }
 else{
 ptsSearchUIObj.ptsSearchWidget.querySelector("#"+ptsSearchUIObj.ptsGetKeywordButton(ptsSearchUIObj.ptsSearchWidget)).setAttribute("aria-describedby",ptsSearchUIObj.ptsGetResultsButton(ptsSearchUIObj.ptsSearchWidget)+"_ariaD");  ptsSearchUIObj.ptsSearchWidget.querySelector("#"+ptsSearchUIObj.ptsGetKeywordButton(ptsSearchUIObj.ptsSearchWidget)).setAttribute("aria-expanded","true");  searchResults = resultJson.recentItems.concat(resultJson.suggestionItems);  ptsSearchUIObj.ptsFillSearchResultGrid(searchResults); ptsSearchUIObj.ptshideDisplayMessage(); }
 ptsSearchUIObj.ptsShowResults(); }
 catch(err){
 ptsSearchUIObj.ptsSearchWidget.querySelector("#"+ptsSearchUIObj.ptsGetKeywordButton(ptsSearchUIObj.ptsSearchWidget)).setAttribute("aria-describedby","PTSDISPLAYMSG_ariaD"); ptsSearchUIObj.ptsshowDisplayMessage(this.req.responseText); ptsSearchUIObj.ptsShowResults(); }
 
 }); },

 ptsDoGlobalSearch: function (searchbtn) {
 this.ptsSetWidget(document.activeElement); var searchkeyword = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).value.trim(); if (searchkeyword.trim() === "")
 searchkeyword = "**"; var searchCategory = this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)).getAttribute("scname"); this.ptsSearchWidget.querySelector(".pts_search_tray").classList.add("psc_hidden");  ptsProcessing(1,3000); this.ptsDoGSearch(searchkeyword, searchCategory); },

 ptsDoGSearch: function (sKeyword, sSrchGrp) {
 var sUrl; var baseURI = getptBaseURI(); if(sSrchGrp === this.componentHeaderCategory){
 sUrl = this.componentSearchURL; var nIndex = sUrl.indexOf("?");  if (nIndex < 0) {
 sUrl = sUrl.concat("?SEARCH_GROUP=" + sSrchGrp);  } else {
 if (nIndex == (sUrl.length - 1))
 sUrl = sUrl.concat("SEARCH_GROUP=" + sSrchGrp);  else
 sUrl = sUrl.concat("&SEARCH_GROUP=" + sSrchGrp);  }
 } else{
 var sPortalGSUrl = baseURI + "c/PORTAL_ADMIN.PTSF_GBLSRCH_FLUID.GBL"; sUrl = sPortalGSUrl; sUrl = sUrl.concat("?SEARCH_GROUP=" + sSrchGrp);  } 
 sUrl = sUrl.concat("&SEARCH_TEXT=" + encodeURIComponent(sKeyword)); sUrl = sUrl.concat("&SEARCH_TYPE=BASIC");  var ajaxURL = baseURI + "s/WEBLIB_PTSF_SB.ISCRIPT1.FieldFormula.IScript_GetBasicSearchPage"
 + "?keyword=" + encodeURIComponent(sKeyword) + "&category=" + this.ptsSearchCategory; var loader = new net2.ContentLoader(ajaxURL, null, null, "GET",
 function () {
 var resultUrl = this.req.responseText; if(resultUrl) {
 resultUrl = resultUrl.concat("&SEARCH_TEXT=" + encodeURIComponent(sKeyword)); resultUrl = resultUrl.concat("&SEARCH_TYPE=BASIC"); LaunchURL(null, resultUrl, 4); } else {
 LaunchURL(null, sUrl, 4);} 
 }); },

 ptsFillSearchResultGrid: function (suggestItemsJson) {
 if (suggestItemsJson !== undefined) {
 for (i = 0; i < suggestItemsJson.length; i++) {
 var gridrow = this.ptsSearchWidget.querySelector("#"+this.ptsGetSuggGrid(this.ptsSearchWidget)+"\\$0_row_" + i); if(gridrow !== null){
 gridrow.classList.remove("psc_hidden"); resultlink = gridrow.querySelector(".ps-link");  if (i === 0)
 resultlink.tabIndex = 0; if (suggestItemsJson[i].type === "R")
 resultlink.classList.add("pts_recent_link"); else
 resultlink.classList.remove("pts_recent_link"); resultlink.innerHTML = ""; var node = document.createElement("span");  node.classList.add("ps-text","pts_link_title"); node.innerHTML = suggestItemsJson[i].title;  resultlink.appendChild(node);  resultlink.setAttribute("onkeydown", "javascript:ptsSearchUIObj.ptskeyDownFunction(event)");  if (this.ptsSearchCategory.startsWith("PTPORTALREGISTRY")) {
 resultlink.setAttribute("onclick", "javascript:ptsSearchUIObj.ptsOpenLink('" + suggestItemsJson[i].url + "',this)"); resultlink.setAttribute("href","javascript:void(0);'")
 resultlink.setAttribute("itemid", suggestItemsJson[i].objname); resultlink.setAttribute("nodename",suggestItemsJson[i].nodename); var node = document.createElement("span");   if (!this.ptsIsHeaderSearchBar(this.ptsSearchWidget) && this.ptsShowCompletePath !== undefined && this.ptsShowCompletePath){
 node.innerHTML = suggestItemsJson[i].path; }
 else{
 node.innerHTML = suggestItemsJson[i].folder; }
 node.classList.add("ps-text"); node.classList.add("pts_link_summary"); resultlink.appendChild(node); if(this.ptsIsAccessibilityMode)
 this.ptsAddResultAriaAttr("menu", resultlink, suggestItemsJson[i]);  }
 else {
 var keystring = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).value; resultlink.setAttribute("onclick", "javascript:ptsSearchUIObj.ptsStoreContentKeyword('" + keystring + "',this)"); resultlink.setAttribute("itemid", suggestItemsJson[i].category); resultlink.setAttribute("itemurl", suggestItemsJson[i].url); resultlink.setAttribute("href", "javascript:void(0);'");  var node = document.createElement("span");  node.innerHTML = suggestItemsJson[i].description; node.classList.add("ps-text"); node.classList.add("pts_link_summary"); resultlink.appendChild(node); if(this.ptsIsAccessibilityMode)
 this.ptsAddResultAriaAttr("content", resultlink, suggestItemsJson[i]); } 
 }
 }
 }
 for (i = suggestItemsJson.length; i < 50; i++) {
 this.ptsSearchWidget.querySelector("#"+this.ptsGetSuggGrid(this.ptsSearchWidget)+"\\$0_row_" + i).classList.add("psc_hidden"); }

 },

 ptsAddResultAriaAttr: function(type, resultlink,suggestItemsJson){ 
 var ariaDescid = resultlink.id + "_ariaD"; ariaDescid = ariaDescid.replace("$",""); if (resultlink.parentNode.querySelector("#"+ariaDescid) === null){
 var ariaDesc = document.createElement('span'); ariaDesc.id = ariaDescid; ariaDesc.style.display = "none"; resultlink.parentNode.appendChild(ariaDesc); resultlink.setAttribute("aria-describedby",ariaDesc.id); }
 else
 ariaDesc = resultlink.parentNode.querySelector("#"+ariaDescid); var addtlText = "";  if (resultlink.classList.contains("pts_recent_link")){
 addtlText = "Recently Accessed" + "."; }
 else{
 addtlText = "Suggestion"+ "."; }

 if(type === "menu"){ 
 ariaDesc.innerHTML = addtlText + " "+ "Title - "+suggestItemsJson.title; ariaDesc.innerHTML = ariaDesc.innerHTML + ",Root Folder - "+suggestItemsJson.folder; }
 else{
 
 ariaDesc.innerHTML = addtlText + " " + "Title - "+suggestItemsJson.title;  ariaDesc.innerHTML = ariaDesc.innerHTML + ",Summary - "+suggestItemsJson.description;  }
 },

 ptsOpenLink: function (menulink, e) {
 if (e.closest(".pts_pagesearch_div") !== null){
 submitAction_win0(document.win0, '#ICSetField' + this.ptsPageName + '.PORTALOBJSS.' + e.getAttribute("itemid")); this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).value = e.querySelector(".pts_link_title").innerHTML; this.ptsCloseAllLists(); }
 else{
 var baseURI = getptBaseURI(); var sVal = "";  s = top.window.document.getElementById("ICSCRIPTSID"); if (s && s.tagName.toUpperCase() === "SPAN") {
 if (!/ptnbsid/.test(s.textContent))
 sVal = "&ptnbsid=" + s.textContent ;  else 
 sVal= "&" + s.textContent; } 
 var ajaxURL = baseURI + "s/WEBLIB_PTSF_SB.ISCRIPT1.FieldFormula.IScript_StoreMenuKeyword"
 + "?portalobj=" + e.getAttribute("itemid")+"&nodename="+e.getAttribute("nodename") + sVal; var loader = new net2.ContentLoader(ajaxURL, null, null, "GET",
 function () {
 ptsSearchUIObj.ptsSearchWidget.querySelector(".pts_search_tray").classList.add("psc_hidden");  ptsProcessing(1,3000); openSrchRsltURL(menulink); }); }
 },

 ptsStoreContentKeyword: function (keystring, e) {
 var link = e.getAttribute("itemurl");  var titleValue = e.querySelector(".pts_link_title").innerHTML; titleValue=titleValue.replace(/"/g, "\\\""); titleValue = encodeURIComponent(unescape(titleValue)); var descrValue = e.querySelector(".pts_link_summary").innerHTML; descrValue=descrValue.replace(/"/g, "\\\""); descrValue = encodeURIComponent(unescape(descrValue)); var urlValue = encodeURIComponent(link); var requestJson = "{\"root\":{\"category\":\"" + e.getAttribute("itemid") + "\",\"keyword\":\"" + keystring + "\",\"title\":\"" + titleValue 
 + "\"," + "\"description\":\"" + descrValue + "\",\"url\":\"" + urlValue + "\"}}"; var baseURI = getptBaseURI(); var ajaxURL = baseURI + "s/WEBLIB_PTSF_SB.ISCRIPT1.FieldFormula.IScript_StoreContentKeyword?requestJson=" + requestJson;  var nUrlPos = String(link).indexOf('\/psp\/');  if(nUrlPos === -1)
 var nUrlContPos = String(link).indexOf('\/psc\/');   if(nUrlContPos === -1){
 var loader = new net2.ContentLoader(ajaxURL, null, null, "GET",
 function () { 
 ptsSearchUIObj.ptsSearchWidget.querySelector(".pts_search_tray").classList.add("psc_hidden");  ptsProcessing(1,3000);  openSrchRsltURL(link); ptsProcessing(0,3000);  }); } 
 else {
 var loader = new net2.ContentLoader(ajaxURL, null, null, "GET",
 function () { 
 ptsSearchUIObj.ptsSearchWidget.querySelector(".pts_search_tray").classList.add("psc_hidden");  ptsProcessing(1,3000); openSrchRsltURL(link); }); }
 },
 
 ptsShowResults: function () {
 var searchtray = this.ptsSearchWidget.querySelector(".pts_search_tray"); var resultbox = searchtray.querySelector(".pts_results_grid");  if (searchtray.classList.contains("psc_hidden")){
 this.ptsSearchWidgetMask.classList.remove("psc_hidden");  this.ptsSearchcontentDiv.classList.add("pts_search_focused");  this.ptsSearchcontentDiv.classList.remove("psc_hidden");  var editbox = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).getBoundingClientRect(); var searchbtn = this.ptsSearchWidget.querySelector("#"+this.ptsGetSearchButton(this.ptsSearchWidget)).getBoundingClientRect(); var categorybtn = this.ptsSearchWidget.querySelector(".pts_category_button").getBoundingClientRect(); var messagebox = searchtray.querySelector(".pts_message"); if ("left" === "left")
 searchtray.style.marginLeft = categorybtn.width+"px"; else
 searchtray.style.marginRight = categorybtn.width+"px"; resultbox.style.width= editbox.width+searchbtn.width+"px"; messagebox.style.width= editbox.width+searchbtn.width+"px"; if (searchtray.classList.contains("psc_hidden"))
 ptsProcessing(0,3000); if(!this.ptsInitialLoad){
 searchtray.classList.remove("psc_hidden"); }
 else
 this.ptsInitialLoad = false; if(this.ptsOpenSearchInModal){ 
 this.ptsReposition();  parent.ptsIsSearchLoaded = true;  }
 }
 searchtray.scrollTop = 0;  var ariaId = this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).getAttribute("aria-describedby"); this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).setAttribute("aria-describedby", ariaId); this.ptsIsFetching = false;  ptsProcessing(0,3000); if (this.ptsIsSearchWaiting){
 this.ptsGetSearchResults(this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget))); this.ptsIsSearchWaiting = false; }
 this.ptsResultsOpen = true; },

 ptsclickOutside: function (e) {
 if (this.ptsSearchWidget !== null && this.ptsSearchWidget.classList.contains("pts_search_widget_sff")){
 if(this.ptsSearchcontentDiv.querySelector(".pts_back_button").contains(e.target))
 this.ptsCloseAllLists();  }
 else if (this.ptsPagetype === "T") {
 if (!(this.ptsSearchWidget !== null && this.ptsSearchWidget.querySelector(".pts_search_content").contains(e.target)))
 this.ptsCloseAllLists();  }
 else{
 if (!(this.ptsSearchWidget !== null && this.ptsSearchWidget.querySelector(".pts_search_tray").contains(e.target)) 
 && e.target != document.getElementById("PTS_SEARCH_BTN$IMG")) {
 this.ptsCloseAllLists(); }
 }
 },

 ptsCloseIframe: function () {
 doCloseLocalModals(); parent.ptsIsSearchLoaded = false; var searchbutton; var parentdoc = window.parent.document; var searchmodal = parentdoc.getElementById("ptsSearchModal");  if (window.parent.document.getElementById("ptsKeywordPlaceHolder")){
 searchbutton = parentdoc.getElementById("ptsKeywordPlaceHolder");   if(searchbutton !== null)
  searchbutton.focus();  }

 var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1; if(is_chrome){
 if(parentdoc.getElementById("pthdr2home")){
 homebuttonptsf = parentdoc.getElementById("pthdr2home");  if(homebuttonptsf !== null)
  homebuttonptsf.focus(); }
 }

 searchmodal.parentNode.removeChild(searchmodal);   if(parentdoc.getElementById("PT_GSEARCH_BTN")){
 searchbutton = parentdoc.getElementById("PT_GSEARCH_BTN");  if(searchbutton !== null)
  searchbutton.focus(); } 
 
 },
 

 ptsCloseAllLists: function () {
 if (this.ptsSearchWidget !== null) {
 this.ptsSearchWidgetMask.classList.add("psc_hidden");  this.ptsSearchcontentDiv.classList.remove("pts_search_focused");  if (this.ptsSearchWidget.classList.contains("pts_search_widget_sff")){
 this.ptsSearchWidget.classList.remove("pts_search_widget_sff"); this.ptsSearchWidget.removeAttribute("style"); this.ptsSearchcontentDiv.querySelector(".pts_back_button").classList.add("psc_hidden"); }else{
 this.ptsSearchWidget.querySelector(".pts_search_tray").classList.add("psc_hidden");  }
 this.ptsSearchWidget.querySelector(".pts_category_dropdown").classList.add("psc_hidden"); this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)).setAttribute("aria-expanded","false"); this.ptsSearchWidget.querySelector(".pts_message ").classList.add("psc_hidden");  this.ptsSearchWidget.querySelector(".pts_results_grid").classList.remove("psc_hidden"); this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).setAttribute("aria-describedby",this.ptsGetKeywordButton(this.ptsSearchWidget)+"_ariaD");  this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).setAttribute("aria-expanded","false");  }
 if(window.parent.document.getElementById("ptsSearchModal")){
 this.ptsCloseIframe(); } 
 this.ptsResultsOpen = false; },


 ptsshowDisplayMessage: function(message){
 if (this.ptsSearchWidget !== null) {
 messagediv = this.ptsSearchWidget.querySelector(".pts_message ");  resultsgrid = this.ptsSearchWidget.querySelector(".pts_results_grid");  }
 if(this.ptsMessage === undefined){
 this.ptsMessage = messagediv.querySelector(".ps-text").innerHTML; }
 if(message !== ""){
 messagediv.querySelector(".ps-text").innerHTML = message; }
 else{
 messagediv.querySelector(".ps-text").innerHTML = this.ptsMessage; }
 var messagespan = messagediv.querySelector(".ps-text"); messagespan.setAttribute("id","PTSDISPLAYMSG_ariaD"); messagediv.classList.remove("psc_hidden"); resultsgrid.classList.add("psc_hidden"); },

 ptshideDisplayMessage: function(){
 if (this.ptsSearchWidget !== null) {
 messagediv = this.ptsSearchWidget.querySelector(".pts_message ");  resultsgrid = this.ptsSearchWidget.querySelector(".pts_results_grid"); } 
 messagediv.classList.add("psc_hidden"); resultsgrid.classList.remove("psc_hidden"); },

 ptskeyDownFunction: function(e){
 var activeElement = document.activeElement; var activelemId = activeElement.id; var partArray; this.ptsSetWidget(activeElement); if ((e.key === "ArrowDown" || e.key === "Down" || e.code === "Space") && (activelemId == this.ptsGetCategory(this.ptsSearchWidget))) {
 ptsSearchUIObj.ptsToggleCategories(); e.stopPropagation(); return; }

 if (e.key === "ArrowLeft") {
 if (activelemId == this.ptsGetTitle(this.ptsSearchWidget)+"$0") 
 this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).focus(); else {
 partArray = activelemId.split('$'); if (partArray.length == 2) {
 var nRes = parseInt(partArray[1] - 1); document.getElementById(this.ptsGetTitle(this.ptsSearchWidget)+"$" + nRes.toString()).focus(); }
 }
 return; }

 if (e.key === "ArrowRight") {
 if (activeElement.id == this.ptsGetTitle(this.ptsSearchWidget)+"$49") 
 this.ptsSearchWidget.querySelector("#"+this.ptsGetSearchButton(this.ptsSearchWidget)).focus(); else {
 partArray = activelemId.split('$'); if (partArray.length == 2) {
 var nRes = 1 + parseInt(partArray[1]); var elemT = document.getElementById(this.ptsGetTitle(this.ptsSearchWidget)+"$" + nRes.toString()); var elemLi = document.getElementById(this.ptsGetSuggGrid(this.ptsSearchWidget)+"$0_row_" + nRes.toString()); var sLiCls = elemLi.getAttribute("class"); if (sLiCls.indexOf('psc_hidden') == -1)
 elemT.focus(); else
 this.ptsSearchWidget.querySelector("#"+this.ptsGetSearchButton(this.ptsSearchWidget)).focus(); }
 }
 }

 if (e.key === "Escape" || e.key === "Esc" || e.key === "Tab") {
 

 this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)).setAttribute("aria-expanded", "false"); if(this.ptsOpenSearchInModal && activeElement.closest(".pts_category_dropdown")!==null){
 this.ptsToggleCategories(); }
 else if((this.ptsOpenSearchInModal && (e.key === "Escape"|| e.key === "Esc")) || !this.ptsOpenSearchInModal){
 if(activeElement.closest(".pts_results_grid")!==null){
 
 if(!this.ptsOpenSearchInModal)
 this.ptsSearchWidgetMask.classList.add("psc_hidden");   this.ptsSearchWidget.querySelector(".pts_search_tray").classList.add("psc_hidden");  this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).focus();  this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).setAttribute("aria-describedby", this.ptsGetKeywordButton(this.ptsSearchWidget)+"_ariaD");  this.ptsSearchWidget.querySelector("#"+this.ptsGetKeywordButton(this.ptsSearchWidget)).setAttribute("aria-expanded", "false");  this.ptsResultsOpen = false; e.stopPropagation();  }else{
 this.ptsCloseAllLists(); e.stopPropagation(); }
 } 
 
 if(e.key === "Tab") {
 if(activeElement.closest(".pts_results_grid")!==null){
 if(this.ptsOpenSearchInModal) {
 this.ptsCloseAllLists(); }
 }
 } 

 if(activeElement.closest(".pts_category_dropdown")!==null){
 this.ptsSearchWidget.querySelector("#"+this.ptsGetCategory(this.ptsSearchWidget)).focus(); e.stopPropagation(); } 
 }
 }
};var ptsSearchUIObj = new PTS_SearchUI();if (!Element.prototype.matches) {
 Element.prototype.matches = Element.prototype.msMatchesSelector || 
 Element.prototype.webkitMatchesSelector;}

if (!Element.prototype.closest) {
 Element.prototype.closest = function(s) {
 var el = this; do {
 if (Element.prototype.matches.call(el, s)) return el; el = el.parentElement || el.parentNode; } while (el !== null && el.nodeType === 1); return null; };}

if (!String.prototype.startsWith) {
 String.prototype.startsWith = function(searchString, position){
 return this.substr(position || 0, searchString.length) === searchString; };}
