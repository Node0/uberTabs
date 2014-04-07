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

var str =  window.location.href;
while (Boolean(str.match(/%/))) {
    str = decodeURIComponent(str);
}

function tabPainter(uberSmithManager) {
    "use strict";
    var breadCrumbTable,
        breadCrumbForm,
        breadCrumbsToScan,
        supportMgrDynamicSpanContent,
        ticketListCheck,
        singleTicketCheck,
        clientIdMatch,
        clientId,
        deviceIdMatch,
        deviceId,
        supportMgrContext,
        ticketNumberMatch,
        i;

    if (uberSmithManager === 'supportManager') {
        /* Do DOM acrobatics over & over because uberSmith's support manager ticketlists/ticketViews use
         * legacy iframe techniques which prevent the DOM ready status from being registered via window.document.readyState
         * in a normal manner. *sigh* C'est la vie...
         */
        window.setInterval(function () {
            supportMgrDynamicSpanContent = window.document.querySelector('span#dynamic_crumb').innerHTML.toString();

            singleTicketCheck = supportMgrDynamicSpanContent.match(/(ticket)(\=)(\d{2,6})/);
            if ( singleTicketCheck !== null ) {
                ticketNumberMatch = supportMgrDynamicSpanContent.match(/(ticket)(\=)(\d{2,6})/)[3];
                window.document.getElementsByTagName('title')[0].innerHTML = ("TT: " + ticketNumberMatch);
                supportMgrContext = "Single Ticket View";
                //console.log(supportMgrContext);
            }
            if ( singleTicketCheck === null ) {
                ticketListCheck = supportMgrDynamicSpanContent.match(/(ticket_list)/);
                if ( ticketListCheck !== null ) {
                    window.document.getElementsByTagName('title')[0].innerHTML = ("Ticket List");
                    supportMgrContext = "Ticket List View";
                    //console.log(supportMgrContext);
                }
            }
            //console.log( supportMgrDynamicSpanContent.match(/(ticket)(\=)(\d{2,6})/)[3] );
        }, 1000);

    }

    if (uberSmithManager === 'deviceManager') {
        breadCrumbTable = window.document.getElementsByTagName('table')[2];
        //console.log(breadCrumbTable);

        breadCrumbForm = breadCrumbTable.getElementsByTagName('form')[0];
        breadCrumbsToScan = breadCrumbForm.getElementsByTagName('a');

        for (i = 0; i < breadCrumbsToScan.length; i++) {
            var strDm = breadCrumbsToScan[i].href;
            //console.log(strDm);
            deviceIdMatch = strDm.match(/(device)(\=)(\d{2,4})/);
            if (deviceIdMatch) {
                deviceId = deviceIdMatch[3];
            }
        }
        window.document.getElementsByTagName('title')[0].innerHTML = "DID: " + deviceId;
    }

    if (uberSmithManager === 'clientManager') {
        breadCrumbTable = window.document.getElementsByTagName('table')[2];
        //console.log(breadCrumbTable);

        breadCrumbForm = breadCrumbTable.getElementsByTagName('form')[0];
        breadCrumbsToScan = breadCrumbForm.getElementsByTagName('a');

        for (i = 0; i < breadCrumbsToScan.length; i++) {
            var strCm = breadCrumbsToScan[i].href;
            //console.log(strCm);
            clientIdMatch = strCm.match(/(clientid)(\=)(\d{2,4})/);
            if (clientIdMatch) {
                clientId = clientIdMatch[3];
            }
        }
        window.document.getElementsByTagName('title')[0].innerHTML = "CID: " + clientId;
    }
}

if ( Boolean(str.match(/supportmgr/)) ) {
    console.log("Call tabPainter with support manager dom sniffing...");
    tabPainter('supportManager');
}
if ( Boolean(str.match(/devicemgr/)) ) {
    console.log("Call tabPainter with device manager dom sniffing...");
    tabPainter('deviceManager');
}
if ( Boolean(str.match(/clientmgr/)) ) {
    console.log("Call tabPainter with client manager dom sniffing...");
    tabPainter('clientManager');
}