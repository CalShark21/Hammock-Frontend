var Form1 = document.getElementById("Form1");
var Form2 = document.getElementById("Form2");
var Form3 = document.getElementById("Form3");
var Form4 = document.getElementById("Form4");
var Form5 = document.getElementById("Form5");
var Form6 = document.getElementById("Form6");

var Next1 = document.getElementById("Next1");
var Next2 = document.getElementById("Next2");
var Next3 = document.getElementById("Next3");
var Next4 = document.getElementById("Next4");
var Next5 = document.getElementById("Next5");

var Back1 = document.getElementById("Back1");
var Back2 = document.getElementById("Back2");
var Back3 = document.getElementById("Back3");
var Back4 = document.getElementById("Back4");
var Back5 = document.getElementById("Back5");

var progress = document.getElementById("progress");

const formData = new FormData();

Next1.onclick = function (){
    Form1.style.left = "-450px";
    Form2.style.left = "40px";
    progress.style.width = "120px";
    formData.set('title', document.getElementById('prop-title').value);
    formData.set('type', document.getElementById('prop-type').value);
    formData.set('location', document.getElementById('prop-location').value);
}
Back1.onclick = function (){
    Form1.style.left = "40px";
    Form2.style.left = "450px";
    progress.style.width = "60px";
}
Next2.onclick = function (){
    Form2.style.left = "-450px";
    Form3.style.left = "40px";
    progress.style.width = "180px";
    formData.set('guests', document.getElementById('cnt-guest').innerText);
    formData.set('beds', document.getElementById('cnt-bed').innerText);
    formData.set('baths', document.getElementById('cnt-bath').innerText);
}
Back2.onclick = function (){
    Form2.style.left = "40px";
    Form3.style.left = "450px";
    progress.style.width = "120px";
}
Next3.onclick = function (){
    Form3.style.left = "-450px";
    Form4.style.left = "40px";
    progress.style.width = "240px";
    let amenities = [];
    let checkboxes = document.getElementsByName('amenities[]');
    for(let i = 0; i < checkboxes.length; i++){
        if (checkboxes[i].checked){
            amenities.push(checkboxes[i].value);
        }
    }
    formData.set('amenities',amenities.toString());
}
Back3.onclick = function (){
    Form3.style.left = "40px";
    Form4.style.left = "450px";
    progress.style.width = "180px";
}
Next4.onclick = function (){
    Form4.style.left = "-450px";
    Form5.style.left = "40px";
    progress.style.width = "300px";
    formData.set('main_photo',"villa-main");
    formData.set('side_photo',"villa-main");
    // add image upload later
}
Back4.onclick = function (){
    Form4.style.left = "40px";
    Form5.style.left = "450px";
    progress.style.width = "240px";
}
Next5.onclick = function (){
    Form5.style.left = "-450px";
    Form6.style.left = "40px";
    progress.style.width = "360px";
    formData.set('description', document.getElementById('prop-description').value);
}
Back5.onclick = function (){
    Form5.style.left = "40px";
    Form6.style.left = "450px";
    progress.style.width = "300px";
}

Form6.addEventListener('submit', e => {
    e.preventDefault();
    formData.set("price", document.getElementById("prop-price").value);
    const object = {};
    formData.forEach((value,key) => object[key] = value);
    const json = JSON.stringify(object);
    console.log(json);

    fetch('http://localhost:8080/api/properties/',{
        method: "POST",
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
})


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