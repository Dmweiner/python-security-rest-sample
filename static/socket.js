// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
// See LICENSE in the source repository root for complete license information.

const socket = io.connect(location.href);


socket.on('notification_received', webhookData => {
    console.log("webhookData : ", webhookData);
    webhookData.value.forEach(message => {
        let card = document.createElement("div");
        card.className = "card";
        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
       

        let roundedDiv = document.createElement("div")
        roundedDiv.className = "table-responsive rounded"
        let table = document.createElement("table");
        table.className = 'table table-hover';
        let thead = document.createElement("thead");
        thead.className = "thead-dark"
        let tr = document.createElement("tr");
        let property = document.createElement("th");
        property.innerText = "Property"
        let details = document.createElement("th");
        details.innerText = "Details";
        let tbody = document.createElement('tbody');
        

        for (prop in message) {
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            td1.innerText = prop;
            let td2 = document.createElement('td');
            if (prop === "resourceData") {
                td2.innerHTML = JSON.stringify(message[prop], undefined, 4);
            } else if (prop !== "clientState" ){
                td2.innerText = message[prop];
            }

            tr.appendChild(td1);
            tr.appendChild(td2);
            tbody.appendChild(tr);
        }

       
        tr.appendChild(property);
        tr.appendChild(details);
        thead.appendChild(tr);
        table.appendChild(thead);
        table.appendChild(tbody);
        roundedDiv.appendChild(table)
        cardBody.appendChild(roundedDiv);
        card.appendChild(cardBody);

        document.getElementById('notifications').appendChild(card);
    });
});    

// socket.emit('create_room');
