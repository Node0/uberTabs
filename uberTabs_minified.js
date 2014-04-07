/*
 * Title: uberTabs 0.2
 *
 * Description:
 * Eliminates ambiguity from uberSmith DE 2.4 Tabs, by
 * dynamically labelling Device manager pages, Client manager pages,
 * Support manager ticket (Trouble Ticket) pages & Support manager (Ticket Lists) lists
 * as such in the browser tab, eliminating confusion when many tabs are
 * simultaneously open.
 *
 * Author: Joe J Hacobian
 *
 * Copyright (C) 2014  Joe J Hacobian
 *
 * For uncompressed source, visit my uberTabs repo on Github:
 * https://github.com/Node0/uberTabs
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 *
 */

var str=window.location.href;while(Boolean(str.match(/%/))){str=decodeURIComponent(str)}function tabPainter(n){var g,m,p,d,l,q,k,a,c,f,o,e,h;if(n==="supportManager"){window.setInterval(function(){d=window.document.querySelector("span#dynamic_crumb").innerHTML.toString();q=d.match(/(ticket)(\=)(\d{2,6})/);if(q!==null){e=d.match(/(ticket)(\=)(\d{2,6})/)[3];window.document.getElementsByTagName("title")[0].innerHTML=("TT: "+e);o="Single Ticket View"}if(q===null){l=d.match(/(ticket_list)/);if(l!==null){window.document.getElementsByTagName("title")[0].innerHTML=("Ticket List");o="Ticket List View"}}},1000)}if(n==="deviceManager"){g=window.document.getElementsByTagName("table")[2];m=g.getElementsByTagName("form")[0];p=m.getElementsByTagName("a");for(h=0;h<p.length;h++){var b=p[h].href;c=b.match(/(device)(\=)(\d{2,4})/);if(c){f=c[3]}}window.document.getElementsByTagName("title")[0].innerHTML="DID: "+f}if(n==="clientManager"){g=window.document.getElementsByTagName("table")[2];m=g.getElementsByTagName("form")[0];p=m.getElementsByTagName("a");for(h=0;h<p.length;h++){var j=p[h].href;k=j.match(/(clientid)(\=)(\d{2,4})/);if(k){a=k[3]}}window.document.getElementsByTagName("title")[0].innerHTML="CID: "+a}}if(Boolean(str.match(/supportmgr/))){console.log("Call tabPainter with support manager dom sniffing...");tabPainter("supportManager")}if(Boolean(str.match(/devicemgr/))){console.log("Call tabPainter with device manager dom sniffing...");tabPainter("deviceManager")}if(Boolean(str.match(/clientmgr/))){console.log("Call tabPainter with client manager dom sniffing...");tabPainter("clientManager")};