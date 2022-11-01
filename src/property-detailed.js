const overlay = document.getElementById('overlay')

const photo1 = document.getElementById('photo-1')
const photo2 = document.getElementById('photo-2')
const photo3 = document.getElementById('photo-3')
const photoPrev1 = document.getElementById('photo-prev-1')
const photoPrev2 = document.getElementById('photo-prev-2')
const photoPrev3 = document.getElementById('photo-prev-3')
const photoPrev4 = document.getElementById('photo-prev-4')
const photoPrev5 = document.getElementById('photo-prev-5')
const photoPrev6 = document.getElementById('photo-prev-6')
const photoPrev7 = document.getElementById('photo-prev-7')
const photoPrev8 = document.getElementById('photo-prev-8')


overlay.addEventListener('click', ()=> {
    const modals = document.querySelectorAll('.photo-modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

function openModal(modal){
    if(modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal){
    if(modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

//click even for photos
photo1.addEventListener('click', ()=>{
    const modals = document.querySelectorAll('.photo-modal')
    document.getElementById('photo-large').src = "images/photos/Main1.JPG"

    modals.forEach(modal => {
        openModal(modal)
    })
})

photo2.addEventListener('click', ()=>{
    const modals = document.querySelectorAll('.photo-modal')
    document.getElementById('photo-large').src = "images/photos/Main2.JPG"

    modals.forEach(modal => {
        openModal(modal)
    })
})

photo3.addEventListener('click', ()=>{
    const modals = document.querySelectorAll('.photo-modal')
    document.getElementById('photo-large').src = "images/photos/Main3.JPG"

    modals.forEach(modal => {
        openModal(modal)
    })
})

photoPrev1.addEventListener('click', ()=>{
    const modals = document.querySelectorAll('.photo-modal')
    document.getElementById('photo-large').src = "images/photos/Main1.JPG"

    modals.forEach(modal => {
        openModal(modal)
    })
})

photoPrev2.addEventListener('click', ()=>{
    const modals = document.querySelectorAll('.photo-modal')
    document.getElementById('photo-large').src = "images/photos/Main1.JPG"

    modals.forEach(modal => {
        openModal(modal)
    })
})

photoPrev3.addEventListener('click', ()=>{
    const modals = document.querySelectorAll('.photo-modal')
    document.getElementById('photo-large').src = "images/photos/Main1.JPG"

    modals.forEach(modal => {
        openModal(modal)
    })
})

photoPrev4.addEventListener('click', ()=>{
    const modals = document.querySelectorAll('.photo-modal')
    document.getElementById('photo-large').src = "images/photos/Main1.JPG"

    modals.forEach(modal => {
        openModal(modal)
    })
})

photoPrev5.addEventListener('click', ()=>{
    const modals = document.querySelectorAll('.photo-modal')
    document.getElementById('photo-large').src = "images/photos/Main1.JPG"

    modals.forEach(modal => {
        openModal(modal)
    })
})

photoPrev6.addEventListener('click', ()=>{
    const modals = document.querySelectorAll('.photo-modal')
    document.getElementById('photo-large').src = "images/photos/Main1.JPG"

    modals.forEach(modal => {
        openModal(modal)
    })
})

photoPrev7.addEventListener('click', ()=>{
    const modals = document.querySelectorAll('.photo-modal')
    document.getElementById('photo-large').src = "images/photos/Main1.JPG"

    modals.forEach(modal => {
        openModal(modal)
    })
})

photoPrev8.addEventListener('click', ()=>{
    const modals = document.querySelectorAll('.photo-modal')
    document.getElementById('photo-large').src = "images/photos/Main1.JPG"

    modals.forEach(modal => {
        openModal(modal)
    })
})




















// Calendar

const date = new Date();

const renderCalendar = () =>{

    date.setDate(1);

    const monthDays = document.querySelector('.days');

    const lastDay = new Date(date.getFullYear(),
        date.getMonth()+1, 0).getDate();

    const prevLastDay = new Date(date.getFullYear(),
        date.getMonth(), 0).getDate();

    const firstDayIndex = date.getDay();
    const lastDayIndex = new Date(date.getFullYear(),
        date.getMonth()+1, 0).getDay();

    const nextDays = 7 - lastDayIndex -1;

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    document.querySelector('.date h1').innerHTML
        = months[date.getMonth()];

    document.querySelector('.date p').innerHTML
        = new Date().toDateString();

    let days = "";

    for(let x = firstDayIndex; x>0; x--){
        days += `<div class="prev-date">
    ${prevLastDay-x+1}</div>`;
    }

    for(let i = 1;i<=lastDay;i++){
        if(i===new Date().getDate() && date.getMonth() === new Date().getMonth()){
            //Highlight current day
            days+=`<div class="today">${i}</div>`;
        }else{
            days+=`<div>${i}</div>`;
        }
    }

    for(let j = 1; j<= nextDays; j++){
        days += `<div class="next-date">${j}</div>`
        monthDays.innerHTML = days;
    }
}


document.querySelector('.prev').addEventListener('click',()=>{
    date.setMonth(date.getMonth()-1)
    renderCalendar();
})

document.querySelector('.next').addEventListener('click',()=>{
    date.setMonth(date.getMonth()+1)
    renderCalendar();
})

renderCalendar();

/*
const renderCalendar = ()=>{

    date.setDate(1);

    const monthDays = document.querySelector(".days")
    const lastDay = new Date(date.getFullYear(), get.getMonth()+1, 0).getDate();

    const prevLastDay = new Date(date.getFullYear(), get.getMonth(), 0).getDate();

    const firstDayIndex = date.getDay;

    const lastDayIndex = new Date(date.getFullYear(), get.getMonth()+1, 0).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const months= [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    document.querySelector(".date h1").innerHTML = months[date.getMonth()];
    document.querySelector(".date p").innerHTML = new Date().toDateString();

    let days = "";

    for(let x = firstDayIndex; x>0; x--){
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`
    }

    for(let i = 1;i<=lastDay;i++){
        days +='<div>${i}</div>';

    }

    for(let j = 1; j<= nextDays;j++){
        if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
            days +=`<div class="today">${i}</div>`;
        }else{
            days+=`<div>${i}</div>`;
        }
        days+= `<div>${i}</div>`;
        monthDays.innerHTML = days;
    }
}
renderCalendar();


document.querySelector('.prev').addEventListener('click', ()=>{
    date.setMonth(date.getMonth()-1);
    renderCalendar();
})

document.querySelector('.next').addEventListener('click', ()=>{
    date.setMonth(date.getMonth()+1);
    renderCalendar();
})
*/

