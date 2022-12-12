
var propID = window.location.hash.substring(1)
var fetchURL = 'http://localhost:8080/api/properties/' + propID;

// call to FetchAPI to get all properties and calls build cards function to start building out cards for each property
fetch(fetchURL)
    .then( res => res.json())
    .then( data => propertyTemplate(data));

// creates the form data object that will be used to send all the information about the property to the server
const formData = new FormData();

function propertyTemplate(property){
    document.getElementById("modal-edit-body").innerHTML = `
        <form>
            <button type="button" class="collapsible">Property Basics</button>
            <div class="content">
                <div>
                    <label>Property Name</label><br>
                    <input id="prop-title" name="prop-ad" type="text" value="${property.title}" placeholder="Enter the name of your property">
                </div>
                <div>
                    <label>Property Type</label><br>
                    <div class="custom-select" style="width: 100%"><select id="prop-type" name = "property-selector">
                        <option selected disabled hidden value="">--Select--</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Condo">Condo</option>
                        <option value="Hostel">Hostel</option>
                    </select></div>
                </div>
                <div>
                    <label>Property Location</label><br>
                    <input id="prop-location" name="prop-ad" type="text" value="${property.location}" placeholder="Enter state">
                </div>
            </div>
            <button type="button" class="collapsible">Guests/Bed/Bath</button>
            <div class="content">
                <div class="guest-counters" align="center">
                    <div class="guest-counter">
                        <div style="width: 50%; float: left">Number of Guests:</div>
                        <div style="width: 50%; float: right">
                            <button type="button" class="btn-count" onclick="guestClick(-1)">-</button>
                            <span id="cnt-guest">${property.guests}</span>
                            <button type="button" class="btn-count" onclick="guestClick(1)">+</button>
                        </div>
                    </div><br><br>
                    <div class="guest-counter">
                        <div style="width: 50%; float: left">Number of Beds:</div>
                        <div style="width: 50%; float: right">
                            <button type="button" class="btn-count" onclick="bedClick(-1)">-</button>
                            <span id="cnt-bed">${property.beds}</span>
                            <button type="button" class="btn-count" onclick="bedClick(1)">+</button>
                        </div>
                    </div><br><br>
                    <div class="guest-counter">
                        <div style="width: 50%; float: left;">Number of Baths:</div>
                        <div style="width: 50%; float: right;">
                            <button type="button" class="btn-count" onclick="bathClick(-0.5)">-</button>
                            <span id="cnt-bath">${property.baths}</span>
                            <button type="button" class="btn-count" onclick="bathClick(0.5)">+</button>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" class="collapsible">Amenities</button>
            <div class="content">
                <ul id="prop-amenities" class="content-amenities" style="list-style: none">
                    <li>
                        <input type="checkbox" id="free-breakfast" value="free-breakfast" >
                        <label for="free-breakfast">Free Breakfast</label>
                    </li>
                    <li>
                        <input type="checkbox" id="free-wifi" value="free-wifi">
                        <label for="free-wifi">Free Wifi</label>
                    </li>
                    <li>
                        <input type="checkbox" id="free-parking" value="free-parking">
                        <label for="free-parking">Free Parking</label>
                    </li>
                    <li>
                        <input type="checkbox" id="pet-friendly" value="pet-friendly">
                        <label for="pet-friendly">Pet Friendly</label>
                    </li>
                    <li>
                        <input type="checkbox" id="soap" value="soap">
                        <label for="soap">Soap and Shampoo</label>
                    </li>
                    <li>
                        <input type="checkbox" id="a/c" value="a/c">
                        <label for="a/c">Air Conditioning</label>
                    </li>
                    <li>
                        <input type="checkbox" id="pool" value="pool">
                        <label for="pool">Pool</label>
                    </li>
                    <li>
                        <input type="checkbox" id="laundry" value="laundry">
                        <label for="laundry">Washer and Dryer</label>
                    </li>
                </ul>
            </div>
            <button type="button" class="collapsible">Photos</button>
            <div class="content">
                <div>
                    <h4>Main Photo</h4>
                    <p>This is the primary photo that will be used for your listing, it is the first image people will see of your place.</p>
                    <input type="file" name="input-file-main">
                </div>
                <div>
                    <h4>Additional Photos</h4>
                    <p>Add up to 4 additional photos that show off your place when users click on your listing.</p>
                    <input type="file" name="input-file-side" multiple>
                </div>
            </div>
            <button type="button" class="collapsible">Description</button>
            <div class="content">
                <p>Describe your property to future guests. Mention any unique qualities, amenities, or features you think renters will enjoy.</p>
                <textarea id="prop-description" placeholder="Enter description here">${property.description}</textarea>
            </div>
            <button type="button" class="collapsible">Price</button>
            <div class="content">
                <p>Set the per-nightly rate for your property (you can always change this later)</p>
                <label>Default Price</label>
                <input id="prop-price" type="text" name="price" value="${property.price}" placeholder="Dollar amount per day">
                <label>Email</label><br>
                <input id="prop-email" type="text" name="email" value="${property.email}" placeholder="Enter property owner's email">
            </div>
            <div align="right"><button onclick="updateProperty()" type="button">Update</button></div>
        </form>
    `
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
}
const propURL = 'http://localhost:8080/api/properties/' + propID;

function updateProperty(){
    buildForm();
    // converts the formData object into a JSON object so that we can post it to the database
    const object = {};
    formData.forEach((value,key) => object[key] = value);
    const json = JSON.stringify(object);

    // FetchAPI takes the form information and sends it along to our HammockAPI, which then posts the data to the database, the user is then directed to property-dashboard.html
    fetch(propURL,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: json,
    })
        .then(res => res.text())
        .then(text => {
            console.log(text);
            window.location.href = 'property-dashboard.html';
        })
        .catch(err => console.log(err))

}

function buildForm(){
    formData.set('title', document.getElementById('prop-title').value);
    formData.set('type', document.getElementById('prop-type').value);
    formData.set('location', document.getElementById('prop-location').value);
    formData.set('guests', document.getElementById('cnt-guest').innerText);
    formData.set('beds', document.getElementById('cnt-bed').innerText);
    formData.set('baths', document.getElementById('cnt-bath').innerText);
// bit of logic to get only the checked checkboxes from the amenities section so they can be added to the formData
    let amenities = [];
    let checkboxes = document.getElementsByName('amenities[]');
// takes each object in the checkbox array with the 'checked' value, and adds them to an array of 'checked checkboxes'
    for(let i = 0; i < checkboxes.length; i++){
        if (checkboxes[i].checked){
            amenities.push(checkboxes[i].value);
        }
    }
    formData.set('amenities',amenities.toString());
    formData.set('main_photo', "villa-main");
    formData.set('side_photo',"villa-main");
    formData.set('description', document.getElementById('prop-description').value);
    formData.set("price", document.getElementById("prop-price").value);
    formData.set("email", document.getElementById("prop-email").value);
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


function deleteProperty(){
    // FetchAPI deletes the property from the database
    fetch(propURL,{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.text())
        .then(text => {
            console.log(text);
            window.location.href = 'property-dashboard.html';
        })
        .catch(err => console.log(err))
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

