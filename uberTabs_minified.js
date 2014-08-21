/*
 * Title: uberTabs 0.3
 *
 * Description:
 * Eliminates ambiguity from uberSmith DE 3.1.5 Tabs, by
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

var str=window.location.href;while(Boolean(str.match(/%/))){str=decodeURIComponent(str)}function tabPainter(i){var c,h,l,k,g,a,f,b,e,j,d;if(i==="supportManager"){window.setInterval(function(){c=window.document.querySelector("span#dynamic_crumb").innerHTML.toString();l=c.match(/(ticket)(\=)(\d{2,6})/);if(l!==null){d=c.match(/(ticket)(\=)(\d{2,6})/)[3];window.document.getElementsByTagName("title")[0].innerHTML=("TT: "+d);j="Single Ticket View"}if(l===null){h=c.match(/(ticket_list)/);if(h!==null){window.document.getElementsByTagName("title")[0].innerHTML=("Ticket List");j="Ticket List View"}}},1000)}if(i==="deviceManager"){f=window.document.querySelector('div.SearchBoxText a[href*="view.php?device"]').toString();b=f.match(/(device)(\=)(\d{2,4})/);if(b){e=b[3]}window.document.getElementsByTagName("title")[0].innerHTML="DID: "+e}if(i==="clientManager"){k=window.document.querySelector('div.SearchBoxText a[href*="client_profile.php?clientid"]').toString();g=k.match(/(clientid)(\=)(\d{2,4})/);if(g){a=g[3]}window.document.getElementsByTagName("title")[0].innerHTML="CID: "+a}}if(Boolean(str.match(/supportmgr/))){console.log("Call tabPainter with support manager dom sniffing...");tabPainter("supportManager")}if(Boolean(str.match(/devicemgr/))){console.log("Call tabPainter with device manager dom sniffing...");tabPainter("deviceManager")}if(Boolean(str.match(/clientmgr/))){console.log("Call tabPainter with client manager dom sniffing...");tabPainter("clientManager")};