'use strict';
/*!
 * Block Based Editor for OpenCart
 * https://chiaseek.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 *
 * Date: 2024-12-09T13:37
 */ 
const editors=document.querySelectorAll(".editor");for(let e=0;e<editors.length;e++){const t=editors[e].id;document.querySelector("#"+t+" .generate").addEventListener("click",(function(){this.textContent="Generating...",generate(this)})),document.querySelector("#"+t+" .addImg").addEventListener("click",(()=>addImageBlock(t,!1))),document.querySelector("#"+t+" .addVideo").addEventListener("click",(()=>addVideoBlock(t,!1))),document.querySelector("#"+t+" .addBlock").addEventListener("click",(()=>addBlock(t,!1))),document.querySelector("#"+t+" .addTable").addEventListener("click",(()=>addTable(t,!1)));let n=document.querySelector("#"+t);n.addEventListener("click",(e=>{e.preventDefault();const o=e.target.getAttribute("data-block"),a=document.getElementById("TB"+o);if(e.target.classList.contains("removeBlock")){if(""!==document.getElementById(o).innerText.trim()){return void(confirm("Are you sure you want to delete this block?")&&a.remove())}a.remove()}const l=document.querySelector("#"+t+" .blocks");if(e.target.classList.contains("moveUp")){let t=e.target.closest(".tempblock");t&&t.previousElementSibling&&(l.insertBefore(t,t.previousElementSibling),t.classList.add("highlight"),setTimeout((()=>{t.classList.remove("highlight")}),1e3))}if(e.target.classList.contains("moveDown")){let t=e.target.closest(".tempblock");t&&t.nextElementSibling&&(l.insertBefore(t.nextElementSibling,t),t.classList.add("highlight"),setTimeout((()=>{t.classList.remove("highlight")}),1e3))}if(e.target.classList.contains("menuOnOff")){const e=document.querySelectorAll(".toolbar");for(let t=0;t<e.length;t++){e[t].classList.remove("active")}let t=document.querySelector("#MN"+o),n=document.querySelector("#TM"+o);t.classList.contains("active")?(t.classList.remove("active"),n.classList.remove("active")):(t.classList.add("active"),n.classList.add("active"))}n.addEventListener("click",(e=>closeMenu(e)));let r={h1:()=>convertToTag(t,o,"h1"),h2:()=>convertToTag(t,o,"h2"),h3:()=>convertToTag(t,o,"h3"),h4:()=>convertToTag(t,o,"h4"),h5:()=>convertToTag(t,o,"h5"),h6:()=>convertToTag(t,o,"h6"),div:()=>convertToTag(t,o,"div"),blockquote:()=>convertToTag(t,o,"blockquote"),preCode:()=>convertToTag(t,o,"pre"),p:()=>convertToTag(t,o,"p"),ol:()=>convertToTag(t,o,"ol"),ul:()=>convertToTag(t,o,"ul"),addBtnBlock:()=>addBlock(t,o),addImageBlock:()=>addImageBlock(t,o),imgAlt:()=>imageOption(o,"alt"),imgUpload:()=>imageUpload(o),imgURL:()=>imageOption(o,"link"),imgWidth:()=>imageOption(o,"width"),imgHeight:()=>imageOption(o,"height"),imgRemove:()=>imageOption(o,"removeCaption"),imgAdd:()=>imageOption(o,"addCaption"),embedURL:()=>embedOption(o,"link"),embedWidth:()=>embedOption(o,"width"),embedHeight:()=>embedOption(o,"height"),removeCaption:()=>tableOption(o,"removeCaption"),addCaption:()=>tableOption(o,"addCaption"),addRow:()=>tableOption(o,"addRow"),removeRow:()=>tableOption(o,"removeRow"),addCol:()=>tableOption(o,"addColumn"),removeCol:()=>tableOption(o,"removeColumn")};for(let[t,n]of Object.entries(r))if(e.target.classList.contains(t)){n();break}if(e.target.classList.contains("tempblock")||e.target.classList.contains("editor")){const e=document.querySelectorAll(".toolbar");for(let t=0;t<e.length;t++)e[t].classList.remove("active");const t=document.querySelectorAll("[contenteditable]");for(let e=0;e<t.length;e++)t[e].setAttribute("contenteditable",!1)}})),n.addEventListener("focus",(e=>{if(e.target.matches("[contenteditable]")){console.log("focus");let t=e.target.id||e.target.dataset.block,n=document.getElementById("TBAR"+t);const o=document.querySelectorAll(".toolbar");for(let e=0;e<o.length;e++)o[e].classList.remove("active");const a=document.querySelectorAll("[contenteditable]");for(let e=0;e<a.length;e++)a[e].setAttribute("contenteditable",!1);e.target.setAttribute("contenteditable",!0),n.classList.add("active")}}),!0);const o=()=>{document.fullscreenElement?(document.exitFullscreen?document.exitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.msExitFullscreen&&document.msExitFullscreen(),l.textContent="Fullscreen"):(n.requestFullscreen?n.requestFullscreen():n.mozRequestFullScreen?n.mozRequestFullScreen():n.webkitRequestFullscreen?n.webkitRequestFullscreen():n.msRequestFullscreen&&n.msRequestFullscreen(),l.textContent="Exit Fullscreen")},a=()=>{document.fullscreenElement?l.textContent="Exit Fullscreen":l.textContent="Fullscreen"},l=document.querySelector("#"+t+" .fullscreen");l.addEventListener("click",o),document.addEventListener("fullscreenchange",a),document.addEventListener("mozfullscreenchange",a),document.addEventListener("webkitfullscreenchange",a),document.addEventListener("msfullscreenchange",a);const r=e=>{let t=document.createElement("div");t.id="saveItem"+e,t.classList.add("saved-item");for(let n=0;n<localStorage.length;n++)if(localStorage.key(n)===e){let n=localStorage.getItem(e+"-date");t.textContent=n?"Found Saved: Draft "+n:"Found Saved: Draft ";let o=document.createElement("button");o.dataset.editor=e,o.type="button",o.textContent="Restored";let a=document.createElement("button");a.type="button",a.dataset.editor=e,a.textContent="Clear",a.addEventListener("click",(()=>{let e=a.dataset.editor;localStore.clear(e),localStore.clear(e+"-date"),document.getElementById("saveItem"+e).remove()})),o.addEventListener("click",(()=>{let e=o.dataset.editor,t=localStorage.getItem(e);if(t){const n=document.querySelector("#"+e+" .results");document.getElementById(n.id).innerHTML=restoreAngleBrackets(t),processContent(e,n.id),document.getElementById("saveItemeditor").textContent="Restored Done."}})),t.appendChild(o),t.appendChild(a),document.querySelector("#"+e+" .blocks").insertAdjacentElement("beforebegin",t)}};r(t)}const createLinkDialog=()=>{const e=document.createElement("dialog");e.id="dialog",e.className="linkdialog";const t=document.createElement("div");t.className="dialogbox";const n=document.createElement("div");n.textContent="Edit Link",t.appendChild(n);[{label:"URL Text:",id:"linkText",type:"text"},{label:"URL:",id:"url",type:"text"},{label:"URL rel:",id:"rel",type:"text"},{label:"URL target:",id:"target",type:"select",options:["_self","_blank","_parent","_top"]}].forEach((e=>{const n=document.createElement("div");n.className="inputbox";const o=document.createElement("label");if(o.setAttribute("for",e.id),o.textContent=e.label,n.appendChild(o),"select"===e.type){const t=document.createElement("select");t.id=e.id,t.className="linkTarget",e.options.forEach((e=>{const n=document.createElement("option");n.value=e,n.textContent=e,t.appendChild(n)})),n.appendChild(t)}else{const t=document.createElement("input");t.type=e.type,t.id=e.id,n.appendChild(t)}t.appendChild(n)}));const o=document.createElement("div");o.className="inputcontrol";return[{id:"updatelink",className:"updatelink",textContent:"Update"},{id:"removelink",className:"removelink",textContent:"Remove Link"},{id:"cancel",className:"cancel",textContent:"Close"}].forEach((e=>{const t=document.createElement("button");t.id=e.id,t.className=e.className,t.textContent=e.textContent,o.appendChild(t)})),t.appendChild(o),e.appendChild(t),e};document.body.appendChild(createLinkDialog());const keyboardSupport=(e,t)=>{e.addEventListener("keydown",(n=>{if("UL"!==e.tagName&&"OL"!==e.tagName&&("Enter"===n.key&&(n.preventDefault(),addBlock(t,!1),e.blur()),"Delete"===n.key||"Backspace"===n.key)){let t=e.querySelector("br");e.innerText.trim();document.execCommand("insertHTML",!1,""),t&&(n.preventDefault(),t.remove())}})),e.addEventListener("paste",(e=>{e.preventDefault();const t=(e.clipboardData||window.clipboardData).getData("text/plain");document.execCommand("insertHTML",!1,""),document.execCommand("insertText",!1,t.replace(/<br[^>]*>/g,"*").replace(/[\r\n]+/g,"**"))}))},closeMenu=e=>{e.preventDefault();const t=document.querySelectorAll(".menu"),n=document.querySelectorAll(".topMenu"),o=document.querySelectorAll(".menuOnOff");for(let a=0;a<t.length;a++){const l=t[a];l.classList.contains("active")&&(l.contains(e.target)||o[a].contains(e.target)||(l.classList.remove("active"),n[a].classList.remove("active")))}},addTable=(e,t)=>{const n=prompt("Enter Number Rows:",5),o=prompt("Enter Number Columns:",4),a=document.querySelector("#"+e+" .blocks"),l=document.createElement("div");l.id=Date.now()%1e4,l.className="block",n>0&&o>0?createTable(l,n,o):createTable(l,5,4);const r=createMenuList(l.id,l,"table");if(t>0){const e=document.getElementById("TB"+t);e&&e.insertAdjacentElement("beforebegin",r)}else a.appendChild(r);l.querySelector("caption").focus(),inlineTool(e,l.id)},createTable=(e,t,n)=>{const o=e;if(!o)return void console.error("Container not found");const a=document.createElement("table");a.id="table"+e.id;const l=document.createElement("caption");l.setAttribute("data-placeholder","Table Caption"),l.setAttribute("contenteditable","true"),l.setAttribute("tabindex","0"),l.dataset.block=e.id,a.appendChild(l);for(let o=0;o<t;o++){const t=document.createElement("tr");for(let a=0;a<n;a++){const n=document.createElement("td");n.setAttribute("contenteditable","true"),n.setAttribute("tabindex","0"),n.dataset.block=e.id,n.textContent=`Row ${o+1}, Col ${a+1}`,t.appendChild(n)}a.appendChild(t)}o.appendChild(a)},addImageBlock=(e,t)=>{const n=document.querySelector("#"+e+" .blocks"),o=document.createElement("figure");o.setAttribute("tabindex","0"),o.id=Date.now()%1e4,o.className="block";const a=document.createElement("picture");a.innerHTML='<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuv7GqevqRqUgCNaskcs87rvMxqN-jENlxNQ&s" alt="" />',o.appendChild(a);const l=document.createElement("figcaption");l.setAttribute("contenteditable","true"),l.setAttribute("tabindex","0"),l.dataset.block=o.id,l.setAttribute("data-placeholder","Image Description"),o.appendChild(l);const r=createMenuList(o.id,o,"image");if(t>0){const e=document.getElementById("TB"+t);e&&e.insertAdjacentElement("beforebegin",r)}else n.appendChild(r);l.focus(),inlineTool(e,o.id)},addVideoBlock=(e,t)=>{const n=document.querySelector("#"+e+" .blocks"),o=document.createElement("embed");o.setAttribute("tabindex","0"),o.id=Date.now()%1e4,o.className="block",o.width="315",o.height="560",o.src="https://www.youtube.com/embed/5ncnsuNm-6A?si=0FUJ5K2LWydm_7oa";const a=createMenuList(o.id,o,"embed");if(t>0){const e=document.getElementById("TB"+t);e&&e.insertAdjacentElement("beforebegin",a)}else n.appendChild(a)},addBlock=(e,t)=>{const n=document.querySelector("#"+e+" .blocks"),o=document.createElement("p");o.setAttribute("contenteditable","true"),o.setAttribute("tabindex","0"),o.setAttribute("data-placeholder","Type something..."),o.id=Date.now()%1e4,o.className="block";const a=createMenuList(o.id,o,"general");if(t>0){const e=document.getElementById("TB"+t);e&&e.insertAdjacentElement("beforebegin",a)}else n.appendChild(a);o.focus(),inlineTool(e,o.id)},createMenuList=(e,t,n)=>{let o=document.createElement("div");o.dataset.block=t.id,o.id="TB"+e,o.className="tempblock";let a=document.createElement("button");a.className="menuOnOff",a.dataset.block=t.id,a.innerText="table"===n?"TABLE":t.tagName,o.appendChild(a);let l=document.createElement("div");l.className="topMenu",l.id="TM"+t.id;let r=document.createElement("button");r.className="addBtnBlock",r.dataset.block=t.id,r.textContent="+Block";let c=document.createElement("button");c.className="addImageBlock",c.dataset.block=t.id,c.textContent="+Image";let i=document.createElement("button");i.className="moveUp",i.dataset.block=t.id,i.textContent="Up";let d=document.createElement("button");d.className="moveDown",d.dataset.block=t.id,d.textContent="Down",l.appendChild(r),l.appendChild(c),l.appendChild(i),l.appendChild(d),o.appendChild(l);let s,m=document.createElement("ul");m.className="menu",m.id="MN"+t.id,m.dataset.block=t.id,s="image"===n?[{className:"removeBlock",text:"Remove Image"},{className:"imgUpload",text:"Upload Image"},{className:"imgURL",text:"Image URL"},{className:"imgRemove",text:"Remove Caption"},{className:"imgAdd",text:"Add Caption"},{className:"imgWidth",text:"Image Width"},{className:"imgHeight",text:"Image Height"},{className:"imgAlt",text:"Alt"}]:"embed"===n?[{className:"removeBlock",text:"Remove Embed"},{className:"embedURL",text:"Embed URL"},{className:"embedWidth",text:"Width"},{className:"embedHeight",text:"Height"}]:"table"===n?[{className:"removeBlock",text:"Remove Table"},{className:"removeCaption",text:"Remove Caption"},{className:"addCaption",text:"Add Caption"},{className:"addRow",text:"Add Row"},{className:"removeRow",text:"Remove Row"},{className:"addCol",text:"Add Column"},{className:"removeCol",text:"Remove Column"}]:[{className:"removeBlock",text:"Remove"},{className:"p",text:"Paragraph"},{className:"div",text:"DIV"},{className:"h1",text:"H1 Heading"},{className:"h2",text:"H2 Heading"},{className:"h3",text:"H3 Heading"},{className:"h4",text:"H4 Heading"},{className:"h5",text:"H5 Heading"},{className:"h6",text:"H6 Heading"},{className:"ul",text:"UL List"},{className:"ol",text:"OL List"},{className:"blockquote",text:"Blockquote"}];for(let e=0;e<s.length;e++){const{className:n,text:o}=s[e],a=document.createElement("button");a.type="button",a.dataset.block=t.id,a.className=n,a.textContent=o,t.tagName.toLowerCase()===n&&(a.disabled=!0),m.appendChild(a)}return o.appendChild(t),o.appendChild(m),o.appendChild(inlineToolbar(t.id)),o},inlineToolbar=e=>{const t=document.createElement("div");t.className="toolbar",t.id="TBAR"+e,t.dataset.block=e;const n=[{className:"removeFormattingButton",format:"remove",text:"X",title:"Remove formmatting or close"},{className:"boldButton",format:"strong",text:"B",title:"Bold Selected Text"},{className:"italicButton",format:"em",text:"I",title:"Italic text"},{className:"underlineButton",format:"u",text:"U",title:"Underline Selected Text"},{className:"quoteButton",format:"q",text:'"',title:"Insert quotation marks"},{className:"markButton",format:"mark",text:"Mark",title:"Marked text"},{className:"delButton",format:"del",text:"del",title:"Deleted text"},{className:"codeButton",format:"code",text:"Code",title:"Change Selected Text to Code"},{className:"insertLink",format:"addlink",text:"+Link",title:"Insert Link"}];for(let o=0;o<n.length;o++){const a=n[o],l=document.createElement("button");l.type="button",l.className=a.className+" format",l.ariaLabel=a.title,l.dataset.block=e,l.dataset.format=a.format,l.innerHTML=a.text,t.appendChild(l)}return t},removeEmptyAttributes=()=>{document.querySelectorAll("*").forEach((e=>{Array.from(e.attributes).forEach((t=>{""===t.value&&e.removeAttribute(t.name)}))}))};function generate(e){const t=e.getAttribute("data-box"),n=e.getAttribute("data-editor");document.getElementById(t).value="";const o=document.querySelectorAll("#"+n+" .blocks .block");removeEmptyAttributes();let a=[];for(let e=0;e<o.length;e++){const t=o[e];t.innerHTML=t.innerHTML.replace(/<br>|<strong><\/strong>|<mark><\/mark>|<del><\/del>|<q><\/q>|<u><\/u>|<em><\/em>|<figcaption><\/figcaption>|<caption><\/caption>|<code><\/code>/g,"");const n=t.cloneNode(!0);n.removeAttribute("contenteditable"),n.removeAttribute("tabindex"),n.removeAttribute("id"),n.removeAttribute("class"),n.removeAttribute("data-placeholder"),n.removeAttribute("data-block");n.querySelectorAll("*").forEach((e=>{Array.from(e.attributes).forEach((t=>{(t.name.startsWith("data-")||"tabindex"===t.name||"contenteditable"===t.name)&&e.removeAttribute(t.name)}))})),n.innerHTML=n.innerHTML.replace(/<br>|<strong><\/strong>|<mark><\/mark>|<del><\/del>|<q><\/q>|<u><\/u>|<em><\/em>|<span><\/span>|<figcaption><\/figcaption>|<caption><\/caption>|<code><\/code>/g,""),cleanUpNestedTags(n),n.innerHTML=n.innerHTML.replace(/<br[^>]*>/g,""),n.innerHTML=n.innerHTML.replace(/<li[^>]*>\s*<\/li>/g,""),n.innerHTML=n.innerHTML.replace(/id="table[^"]*"/g,""),("embed"===n.tagName.toLowerCase()||"figure"===n.tagName.toLowerCase()||""!==n.textContent.trim()&&""!==n.innerHTML.trim())&&a.push(n.outerHTML)}let l=a.join("\n");l=l.replace(/<br[^>]*>/g,"").replace(/\n/g,""),l=l.replace(/[\r\n]+/g,"");let r=sanitizeHtml(l);document.getElementById(t).value=sanitizeHtml(r),l.length>0&&localStore.save(n,replaceAngleBrackets(sanitizeHtml(r))),setTimeout((()=>{e.textContent="Generate"}),2e3)}const cleanUpNestedTags=e=>{const t=["strong","em","b","i","br","span"];for(let n=0;n<t.length;n++){const o=t[n],a=e.getElementsByTagName(o);for(let e=a.length-1;e>=0;e--){const t=a[e];if(t.parentNode&&t.parentNode.tagName.toLowerCase()===o){for(;t.firstChild;)t.parentNode.insertBefore(t.firstChild,t);t.parentNode.removeChild(t)}}}},convertToTag=(e,t,n)=>{const o=document.getElementById(t),a=o.tagName,l=o.innerText,r=document.createElement(n),c=document.createElement("code");if(c.setAttribute("data-placeholder","// write code"),"pre"!==n?r.setAttribute("contenteditable","true"):(c.setAttribute("contenteditable","true"),c.id=t),r.setAttribute("tabindex","0"),r.id=t,r.setAttribute("data-placeholder","Type something..."),r.className="block","OL"===a&&"ul"===n||"UL"===a&&"ol"===n){const e=o.querySelectorAll("li");for(let t=0;t<e.length;t++){const n=e[t],o=document.createElement("li");o.innerText=n.innerText,r.appendChild(o)}}else if("ol"===n||"ul"===n){const e=document.createElement("li");e.innerText=l,r.appendChild(e)}else"pre"===n?(c.innerText=l.replace(/<br[^>]*>/g,"").replace(/[\r\n]+/g,""),r.appendChild(c)):r.innerText=l.replace(/<br[^>]*>/g,"").replace(/[\r\n]+/g,"");o.replaceWith(r),inlineTool(e,t),"pre"===n?r.querySelector('contenteditable="true"').focus():r.focus(),document.querySelector("#MN"+t+" ."+n).disabled=!0,document.querySelector("#MN"+t+" ."+a.toLowerCase()).disabled=!1,document.querySelector("#TB"+t+" .menuOnOff").innerText=n.toUpperCase(),document.querySelector("#MN"+t).classList.remove("active"),document.querySelector("#TM"+t).classList.remove("active")},inlineTool=(e,t)=>{const n=document.getElementById(e),o=(document.getElementById("TBAR"+t)||document.querySelector("#TB"+t+" .toolbar")).querySelectorAll(".format"),a=document.querySelector(".linkTarget");let l=null;var r,c;c=e,(r=n).addEventListener("keydown",(e=>{if("UL"!==r.tagName&&"OL"!==r.tagName&&("Enter"===e.key&&(e.preventDefault(),addBlock(c,!1),r.blur()),"Delete"===e.key||"Backspace"===e.key)){let t=r.querySelector("br");r.innerText.trim(),document.execCommand("insertHTML",!1,""),t&&(e.preventDefault(),t.remove())}})),r.addEventListener("paste",(e=>{e.preventDefault();const t=(e.clipboardData||window.clipboardData).getData("text/plain");document.execCommand("insertHTML",!1,""),document.execCommand("insertText",!1,t.replace(/<br[^>]*>/g,"*").replace(/[\r\n]+/g,"**"))})),n.addEventListener("click",(e=>{const t=e.target.tagName;if(["STRONG","Q","EM","U","CODE","MARK","DEL"].includes(t)){const t=document.createRange();t.selectNodeContents(e.target);const n=window.getSelection();n.removeAllRanges(),n.addRange(t)}})),o.forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault();const t=e.target.dataset.format;if(t)switch(t){case"addlink":d();break;case"remove":s();break;default:i(t)}}))})),n.addEventListener("keydown",(e=>{if(e.ctrlKey)switch(e.preventDefault(),e.key){case"b":i("strong");break;case"i":i("em");break;case"u":i("u");break;case"q":i("q");break;case"m":i("mark");break;case"d":i("del");break;case"o":i("code");break;case"x":s();break;case"l":d()}}));const i=e=>{const t=window.getSelection();if(t.rangeCount>0){const n=t.getRangeAt(0),o=n.extractContents(),a=o.textContent.trim();if(0===o.textContent.length)return void alert("Please select some text to apply the style.");const l=document.createTextNode(a),r=o.parentNode;if(r&&r.nodeName.toLowerCase()===e)r.textContent=a;else{const t=document.createElement(e);let a;o.textContent.endsWith(" ")&&(a=document.createTextNode(" "),n.insertNode(a)),t.appendChild(l),n.insertNode(t)}}},d=()=>{const e=window.getSelection();if(!e.rangeCount)return;const t=e.toString().trim();if(0===t.length)return;const n=prompt("Enter the link URL:","https://");if(n){const o=e.getRangeAt(0),a=document.createElement("a");a.href=n,a.target="_self",a.rel="noopener",a.textContent=t,o.deleteContents(),o.insertNode(a),a.addEventListener("click",m)}},s=()=>{const e=window.getSelection();if(!e.rangeCount)return;const t=e.getRangeAt(0),n=t.toString().trim();if(0===n.length)return;const o=(t.commonAncestorContainer.nodeType===Node.TEXT_NODE?t.commonAncestorContainer.parentNode:t.commonAncestorContainer).tagName;if("DEL"===o||"STRONG"===o||"Q"===o||"EM"===o||"U"===o||"CODE"===o||"MARK"===o){const n=t.commonAncestorContainer.nodeType===Node.TEXT_NODE?t.commonAncestorContainer.parentNode:t.commonAncestorContainer,o=e.toString(),a=document.createTextNode(o);n.parentNode.replaceChild(a,n),e.removeAllRanges()}else{const o=document.createTextNode(n);t.deleteContents(),t.insertNode(o),e.removeAllRanges();const a=document.createRange();a.selectNodeContents(o),a.collapse(!1),e.addRange(a)}},m=e=>{e.preventDefault(),l=e.target,document.getElementById("url").value=l.getAttribute("href"),document.getElementById("rel").value=l.rel,document.getElementById("target").value=l.target,document.getElementById("linkText").value=l.textContent,document.querySelector(".linkdialog").showModal()};document.getElementById("updatelink").addEventListener("click",(()=>{l&&(l.href=document.getElementById("url").value,l.rel=document.getElementById("rel").value,l.target=document.getElementById("target").value,l.textContent=document.getElementById("linkText").value,document.querySelector(".linkdialog").close())})),document.getElementById("removelink").addEventListener("click",(()=>{if(l){const e=l.textContent;l.replaceWith(e),document.querySelector(".linkdialog").close()}})),document.getElementById("cancel").addEventListener("click",(()=>{document.querySelector(".linkdialog").close()}));document.querySelectorAll("[contenteditable] a").forEach((e=>{e.addEventListener("click",m)})),a.addEventListener("change",(e=>{e.preventDefault(),l&&(l.target=a.value)}))},tableOption=(e,t)=>{const n=document.getElementById("table"+e),o=n.rows.length;switch(t){case"addRow":const a=n.insertRow(-1),l=n.rows[0].cells.length;for(let t=0;t<l;t++){const n=a.insertCell(t);n.setAttribute("contenteditable","true"),n.setAttribute("tabindex","0"),n.dataset.block=e,n.innerHTML="New Row, Cell "+(t+1)}break;case"removeRow":o>1?n.deleteRow(o-1):alert("Cannot remove the header row.");break;case"addColumn":for(let t=0;t<o;t++){const o=n.rows[t].insertCell(-1);o.setAttribute("contenteditable","true"),o.setAttribute("tabindex","0"),o.dataset.block=e,o.innerHTML="New Cell "+(t+1)}break;case"removeColumn":if(n.rows[0].cells.length>1)for(let e=0;e<o;e++)n.rows[e].deleteCell(-1);else alert("Cannot remove the last column.");break;case"removeCaption":const r=n.querySelector("caption");r&&n.removeChild(r);break;case"addCaption":const c=document.createElement("caption");c.setAttribute("contenteditable","true"),c.setAttribute("data-placeholder","Table Caption"),c.setAttribute("tabindex","0"),c.dataset.block=e,n.appendChild(c);break;default:console.warn("Unknown option:",t)}},imageOption=(e,t)=>{const n=document.getElementById(e),o=n?.querySelector("img");if(!o)return void console.error(`Image element not found in block with ID: ${e}`);let a;switch(t){case"alt":a=prompt("Image Alt:",o.alt),a&&(o.alt=a);break;case"link":a=prompt("Image Link:",o.src),a&&(o.src=a);break;case"width":a=prompt("Image Width:",o.width),a&&(o.width=a);break;case"height":a=prompt("Image Height:",o.height),a&&(o.height=a);break;case"removeCaption":const l=n.querySelector("figcaption");l?n.removeChild(l):console.warn("No caption found to remove.");break;case"addCaption":const r=document.createElement("figcaption");r.setAttribute("contenteditable","true"),r.setAttribute("tabindex","0"),r.setAttribute("data-placeholder","Image Description"),r.dataset.block=e,n.appendChild(r);break;default:console.error("Invalid option: "+t)}},embedOption=(e,t)=>{const n=document.getElementById(e);if(!n)return void console.error(`Element with ID ${e} not found.`);let o;switch(t){case"link":o=prompt("Embed Link:",n.src),o&&(n.src=o);break;case"width":o=prompt("Embed Width:",n.width),o&&(n.width=o);break;case"height":o=prompt("Embed Height:",n.height),o&&(n.height=o);break;default:console.error("Invalid option: "+t)}};function imageUpload(e){const t=document.getElementById("form-upload");t&&t.remove();const n=document.createElement("form");n.enctype="multipart/form-data",n.id="form-upload",n.style.display="none";const o=document.createElement("input");o.type="file",o.name="file[]",o.multiple=!0,n.appendChild(o),document.body.prepend(n),o.click(),"undefined"!=typeof timer&&clearInterval(timer),timer=setInterval((function(){if(""!==o.value){clearInterval(timer);const t=new FormData(n);fetch("index.php?route=common/filemanager/upload&token=<?php echo $token; ?>&directory="+"",{method:"POST",body:t}).then((e=>e.json())).then((t=>{if(console.log("Upload: "+t.file.url),t.error&&alert(t.error),t.success){document.getElementById(e).querySelector("img").src=t.file.url}})).catch((e=>{alert(e)})).finally((()=>{}))}}),500)}function processContent(e,t){const n=document.getElementById(t).value.replace(/[\r\n]+/g," ").replace(/\s{2,}/g," ").replace(/>\s+</g,"><").replace(/<span[^>]*>(.*?)<\/span>/gi,"$1"),o=(new DOMParser).parseFromString(n,"text/html");o.querySelectorAll("span").forEach((e=>e.remove()));o.querySelectorAll("br").forEach((e=>e.remove()));const a=document.querySelector("#"+e+" .blocks");a.innerHTML="";let l=Date.now()%1e4;const r=o.body.childNodes;for(let t=0;t<r.length;t++){const n=r[t];if(n.nodeType===Node.ELEMENT_NODE){const t=n.tagName.toLowerCase();let o;if("img"===t){o=document.createElement("figure"),o.setAttribute("tabindex","0"),o.id=l,o.className="block";const e=document.createElement("picture"),t=document.createElement("img");t.src=n.src;const a=document.createElement("figcaption");a.setAttribute("data-placeholder","Image Description"),a.setAttribute("contenteditable","true"),a.dataset.block=l,e.appendChild(t),o.appendChild(e),o.appendChild(a)}else{const e=(new DOMParser).parseFromString(n.innerHTML,"text/html"),a=e.querySelector("table"),r=e.querySelectorAll("a"),c=e.querySelectorAll("caption"),i=e.querySelectorAll("td"),d=e.querySelectorAll("figcaption");if(i.length>0)for(let e=0;e<i.length;e++)i[e].setAttribute("contenteditable","true"),i[e].setAttribute("tabindex","0"),i[e].dataset.block=l;if(c.length>0)for(let e=0;e<c.length;e++)c[e].setAttribute("contenteditable","true"),c[e].setAttribute("tabindex","0"),c[e].setAttribute("data-placeholder","Table Caption"),c[e].dataset.block=l;if(r.length>0)for(let e=0;e<r.length;e++)r[e].dataset.block=l;if(a&&(a.id="table"+l),d.length>0)for(let e=0;e<d.length;e++)d[e].setAttribute("contenteditable","true"),d[e].setAttribute("tabindex","0"),d[e].setAttribute("data-placeholder","Image Description"),d[e].dataset.block=l;n.innerHTML=e.body.innerHTML,o=document.createElement(t),o.innerHTML=n.innerHTML,o.setAttribute("contenteditable","true"),o.setAttribute("tabindex","0"),o.id=l,o.className="block","embed"===t&&(o.src=n.src,o.width=n.width,o.height=n.height,o.removeAttribute("contenteditable")),(n.innerHTML.includes("<table")||/<table\b[^>]*>/i.test(n.innerHTML))&&o.removeAttribute("contenteditable"),"figure"===t&&o.removeAttribute("contenteditable")}if("figure"===t||"img"===t){const e=createMenuList(l,o,"image");a.appendChild(e)}else if("embed"===t){const e=createMenuList(l,o,"embed");a.appendChild(e)}else if(n.innerHTML.includes("<table")||/<table\b[^>]*>/i.test(n.innerHTML)){const e=createMenuList(l,o,"table");a.appendChild(e)}else{const e=createMenuList(l,o,"general");a.appendChild(e)}inlineTool(e,l);const r=document.querySelectorAll("[contenteditable]");for(let e=0;e<r.length;e++)r[e].setAttribute("contenteditable",!1);l++}}}function sanitizeHtml(e){const t=document.createElement("div");t.innerHTML=e;const n=["b","i","em","strong","q","mark","del","a","p","u","ul","ol","li","h1","h2","h3","h4","h5","h6","img","table","tr","td","embed"];return function e(t){if(t.nodeType===Node.ELEMENT_NODE){if(!n.includes(t.tagName.toLowerCase()))return void t.remove();const o=[];for(let e of Array.from(t.attributes))"href"!==e.name&&"target"!==e.name&&o.push(e.name);for(let e of o)t.removeAttribute(e);for(let n of Array.from(t.childNodes))e(n)}}(t),t.innerHTML}document.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelectorAll(".results");for(let t=0;t<e.length;t++){const n=e[t],o=n.getAttribute("data-editor");""!==n.value.trim()?processContent(o,n.id):addBlock(o,!1)}}));const replaceAngleBrackets=e=>e.replace(/</g,"/**").replace(/>/g,"**/"),restoreAngleBrackets=e=>e.replace(/\/\*\*/g,"<").replace(/\*\*\//g,">"),localStore={save:(e,t)=>{const n=new Date;localStorage.setItem(e,t),localStorage.setItem(e+"-date",n.toISOString())},load:(e,t)=>{const n=localStorage.getItem(e);n&&(document.getElementById("results"+e).innerHTML=n)},clear:e=>{localStorage.removeItem(e)}};
