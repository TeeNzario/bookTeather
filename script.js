let seats = document.querySelectorAll(".seat");

let seatsSelected = document.getElementById("seats-selected"); //Show count of seats
let seatsPrice = document.getElementById("seats-price"); //Show price

let movieSelect= document.getElementById("movies");

let ticketPrice = +movieSelect.value


let confirmButton = document.getElementById("confirm-button");

let list = document.querySelector("ul");

movieSelect.addEventListener('change', () => {
    ticketPrice = +movieSelect.value


    seats.forEach((seat) => {
        seat.classList.remove("selected");
    })
    
    const seatsCount = selectedCount()
    renderShow(seatsCount);

})

seats.forEach((seat) => {
    seat.addEventListener('click', function(){
        if (seat.classList.contains('occupied')){
            return
        };

        if(ticketPrice === 0){
            Swal.fire("Please select movie before!");
            return
        }

        seat.classList.toggle('selected');
        totalPrice();
        renderShow();
    })
})



//count number of seats
function selectedCount () {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    const seatsCount = selectedSeats.length;

    return seatsCount

}


//total price
function totalPrice(){
    const ticketPrice = +movieSelect.value;
    const seatsCount = selectedCount();

    const total = seatsCount * ticketPrice;
    return total;
}

function renderShow (seatsCount) {
    const count = selectedCount();
    const total = totalPrice();

    seatsSelected.innerText = count;
    seatsPrice.innerText = total;
}

confirmButton.addEventListener("click", bookMovie)

function bookMovie(){
    let selectedSeats = document.querySelectorAll(".seat.selected");

    if(selectedSeats.length === 0){
        Swal.fire("Please select seat before click confirm button.");
        return
    }

    showReceipt();

    selectedSeats.forEach((seat) => {

        let selectedSeat= seat.classList;
        selectedSeat.remove("selected");
        selectedSeat.add("occupied");

    })
   

    seatsSelected.innerText = 0;
    seatsPrice.innerText = 0;

}

function showReceipt(){
    const selected = selectedCount();
    const total = totalPrice();

    let movieSelectIndex = movieSelect.selectedIndex;
    let movieOption = movieSelect.options[movieSelectIndex];
    let movieName = movieOption.text;

    let newList = document.createElement("li");
    newList.innerText = `ชื่อหนัง : ${movieName} จำนวน ${selected} ที่นั่ง รวม ${total} บาทนะจ๊ะน้องชายพี่`;
    list.appendChild(newList);

    Swal.fire({
        title: `จองตั๋วหนัง เรื่อง ${movieName} จำนวน ${selected} ที่นั่ง สำเร็จแล้ว!`,
        icon: "success",
        draggable: true
    });

}


