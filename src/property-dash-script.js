/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */


// call to FetchAPI to get all properties and calls build cards function to start building out cards for each property
fetch('http://localhost:8080/api/properties')
    .then( res => res.json())
    .then( data => buildCards(data));

/**
 * a function that takes all the properties and their data and builds out a 'property card' for each one
 * @param data the data for all the properties
 */
function buildCards(data) {
    document.getElementById("property-cards").innerHTML = `
    <h3 style="margin-left: 3%">Properties</h3>
    ${data.map(propertyTemplate).join('')} 
`
    createButtonElement();
}

/**
 * function to take the property data for a specific property and use it to build a 'property card' from a template literal
 * @param property the data for this specific property being generated
 * @returns {string} the template literal filled in for each individual property
 */
function propertyTemplate(property){
    return `
    <li>
        <div id="property-card">
        <div class="card-body">
            <a href="property-detailed.html#${property.id}"><div class="card-pic">
                <img src="#" alt="Property Pic">
            </div></a>
            <div class="card-text" style="font-size: 12px;">
                <div class="card-title" style="font: 16px bold;">${property.title}</div>
                <div class="card-info" style="opacity: 50%;">${property.guests} guest-${property.beds} bed-${property.baths} bath</div>
                <div><textarea class="card-description" maxlength="160" readonly>${property.description}</textarea></div>
                <div ><textarea class="card-amenities" max maxlength="80">${property.amenities}</textarea></div>
                <button onclick= edit(${property.id})>testing</button>
            </div>
            <div class="card-buttons">
            </div>
        </div>
        <hr/>
        </div>
    </li>
    `
}

function edit(id){
    window.location.href = "property-edit.html#" + id;
}

function createButtonElement() {
    var a = document.querySelectorAll(".card-buttons");

    for (var v = 0; v < a.length; v++) {
        var btn = document.createElement("button");

        btn.addEventListener('click',function(){
            window.location = 'property-detailed.html';
        });
        btn.appendChild(document.createTextNode("Edit/Delete"));
        a[v].appendChild(btn);
    }
}

//adds a collapsible section for each form section, to make it easier to look at
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

// these are button scripts for changing the guests/bed/bath count for said property
function guestClick(click){
    const totalClicks = document.getElementById('cnt-guest');
    const sumvalue = parseInt(totalClicks.innerText) + click;
    console.log(sumvalue + click);
    totalClicks.innerText = sumvalue;
    if(sumvalue < 0){
        totalClicks.innerText = 0;
    }
}
function bedClick(click){
    const totalClicks = document.getElementById('cnt-bed');
    const sumvalue = parseInt(totalClicks.innerText) + click;
    console.log(sumvalue + click);
    totalClicks.innerText = sumvalue;
    if(sumvalue < 0){
        totalClicks.innerText = 0;
    }
}
function bathClick(click){
    const totalClicks = document.getElementById('cnt-bath');
    const sumvalue = parseFloat(totalClicks.innerText) + click;
    console.log(sumvalue + click);
    totalClicks.innerText = sumvalue;
    if(sumvalue < 0){
        totalClicks.innerText = 0;
    }
}

