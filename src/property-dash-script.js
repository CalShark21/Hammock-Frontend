/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

fetch('http://localhost:8080/api/properties')
    .then( res => res.json())
    .then( data => buildCards(data));

function buildCards(data) {
    document.getElementById("property-cards").innerHTML = `
    <h3 style="margin-left: 3%">Properties</h3>
    ${data.map(propertyTemplate).join('')} 
`
}

function propertyTemplate(property){
    return `
    <li>
        <div id="property-card">
        <div class="card-body">
            <a href="#"><div class="card-pic">
                <img src="#" alt="Property Pic">
            </div></a>
            <div class="card-text" style="font-size: 12px;">
                <div class="card-title" style="font: 16px bold;">${property.title}</div>
                <div class="card-info" style="opacity: 50%;">${property.guests} guest-${property.beds} bed-${property.baths} bath</div>
                <div><textarea class="card-description" maxlength="160" readonly>${property.description}</textarea></div>
                <div ><textarea class="card-amenities" max maxlength="80">${property.amenities}</textarea></div>
            </div>
            <div class="card-buttons">
                <button onclick="propertyDropdown()" class="property-dropdown">...</button>
                <div id="propDropdown" class="prop-dropdown-content">
                    <a data-modal-target="#modal-edit">Edit Listing</a>
                    <a data-modal-target="#modal-delete" style="color: red">Delete Listing</a>
                </div>
            </div>
        </div>
        <hr/>
        </div>
    </li>
    `
}

function propertyDropdown() {
    document.getElementById("propDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.property-dropdown')) {
        var dropdowns = document.getElementsByClassName("prop-dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

//Modal for edit/delete listing
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal-edit.active,.modal-delete.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal-edit,.modal-delete')
        closeModal(modal)
    } )
})

function openModal(modal){
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal){
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

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

