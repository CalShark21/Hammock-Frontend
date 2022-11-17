
/* template for box
<div class="boxed">
            <div class="box-top">
                <img src="../images/${property.main_photo}.jpg" alt="house pic" >
                <div class="top-text">
                    <header>
                        <p style="font-size: 16px;font-weight: 400;">${property.title} (${property.location})</p>
                        <p style="font-size: 12px;color: rgba(0,0,0,0.5);">${property.guests} Guests-${property.beds} Beds-${property.baths} Bath</p>
                    </header>

                </div>
            </div>
            <hr/>
            <h2>Cost Details</h2>
            <div class="box-body">
                <div class="box-body-left">
                        <p>$ ${property.price} x 5 nights </p>
                        <p>Cleaning Fee</p>
                        <p>Service Fee </p>
                        <p>Occupancy Fee </p>
                    </div>
                <div class="box-body-right">
                        <p>$525.00 </p>
                        <p>$100.00</p>
                        <p>$75.00 </p>
                        <p>$105.00 </p>
                    </div>
            </div>
            <hr/>
            <div style="display: flex;justify-content: space-between;">
                <p style="font-weight: 600;"> Total(USD)</p>
                <p>$805.00</p>
            </div>
        </div>

*/

var propID = window.location.hash.substring(1)
var fetchURL = 'http://localhost:8080/api/properties/' + propID;

fetch(fetchURL)
    .then( res => res.json())
    .then( data => propertyTemplate(data));

function propertyTemplate(property){
    const pricePer = property.price * 5;
    const totalCost = pricePer + 100 + 75 + 105;
    document.getElementById("boxed").innerHTML = `
    <div class="box-top">
                <img src="../images/${property.main_photo}.jpg" alt="house pic" >
                <div class="top-text">
                    <header>
                        <p style="font-size: 16px;font-weight: 400;">${property.title} (${property.location})</p>
                        <p style="font-size: 12px;color: rgba(0,0,0,0.5);">${property.guests} Guests-${property.beds} Beds-${property.baths} Bath</p>
                    </header>

                </div>
            </div>
            <hr/>
            <h2>Cost Details</h2>
            <div class="box-body">
                <div class="box-body-left">
                        <p>$${property.price} x 5 nights </p>
                        <p>Cleaning Fee</p>
                        <p>Service Fee </p>
                        <p>Occupancy Fee </p>
                    </div>
                <div class="box-body-right">
                        <p>$${pricePer}</p>
                        <p>$100.00</p>
                        <p>$75.00 </p>
                        <p>$105.00 </p>
                    </div>
            </div>
            <hr/>
            <div style="display: flex;justify-content: space-between;">
                <p style="font-weight: 600;"> Total(USD)</p>
                <p>$${totalCost}</p>
            </div>
    `
}
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
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
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