let selectMovie = document.getElementById("movies");

let seats = document.querySelectorAll(".seat");

let showSeats = document.getElementById("show-seats")
let showPrice= document.getElementById("show-price")

let button = document.querySelector("button");

let list = document.querySelector("ul");


selectMovie.addEventListener("change", () => {

    seats.forEach((seat) => {
        seat.classList.remove("selected");
    })

    resetAmount();

})


    
seats.forEach((seat) => {

    seat.addEventListener("click", () => {

        if (!canSelectSeat(seat)) return;

        seat.classList.toggle("selected");
        showSeatAndPrice();

    })

})

function canSelectSeat(seat){

    return parseInt(selectMovie.value) !== 0 && !seat.classList.contains("occupied");
}


function seatCount(){

    return document.querySelectorAll(".seat.selected").length;
}


function showSeatAndPrice(){
    let count = seatCount();
    let price = priceTotal();

    showSeats.innerText = count; 
    showPrice.innerText = price;
}

function priceTotal(){
    let priceMovie = +selectMovie.value;
    let count= seatCount();

    return priceMovie * count;
}


button.addEventListener("click", handleBooking);

function handleBooking(){
    if (seatCount() === 0){
        return
    }


    renderList();
    markSelectedSeatsAdOccupied();
    resetAmount();
}

function markSelectedSeatsAdOccupied(){
    let selectSeat = document.querySelectorAll(".seat.selected");
    selectSeat.forEach((seat) => {
        seat.classList.remove("selected");
        seat.classList.add("occupied");
    })
}


function renderList(){
    let count = seatCount();
    let price = priceTotal();

    let movieName = selectMovie.options[selectMovie.selectedIndex].text;

    let newList = document.createElement("li");
    newList.innerText = `${movieName} จำนวนที่นั่ง ${count} รวม ${price} บาท`;

    createDeleteButton(newList);
    list.appendChild(newList);
}

function resetAmount(){
    showPrice.innerText = "0";
    showSeats.innerText = "0";
}


function createDeleteButton(newList){
    let deleteButton = document.createElement("button");
    deleteButton.innerText ="ลบ";
    
    newList.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
        
        deleteItem(newList);
    })
}

function deleteItem(item){
    item.remove();
}