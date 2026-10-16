let movie = document.getElementById("movie"), tickets = document.getElementById("tickets");
let total = document.getElementById("total"), form = document.getElementById("bookingForm");
let bookBtn = document.querySelector(".booknow"), bookingList = document.getElementById("bookingList");
let count = document.getElementById("count"), bookings = 0, price = 0;

function getPrice() {
    if (movie.value === "KGF") return 150;
    if (movie.value === "Toxic") return 140;
    if (movie.value === "Karuppu") return 120;
    return 0;
}

function updatePrice() {
    price = getPrice() * Number(tickets.value);
    total.textContent = price;
}

movie.onchange = updatePrice;
tickets.oninput = updatePrice;
bookBtn.onclick = function(event) {
    event.preventDefault();
    let name = movie.value, time = document.getElementById("time").value;
    let email = document.getElementById("email").value, quantity = Number(tickets.value);
    if (!form.checkValidity() || getPrice() === 0 || time === "" || quantity < 1 || quantity % 1 !== 0) return;

    price = getPrice() * quantity;
    let card = document.createElement("div");
    card.className = "booking-item";
    let details = document.createElement("p");
    details.textContent = name + " | " + time + " | Tickets: " + quantity + " | Email: " + email + " | Total: Rs" + price;
    let cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancel.className = "cancel";
    cancel.type = "button";
    cancel.onclick = function() {
        card.remove();
        bookings--;
        count.textContent = bookings;
    };
    card.appendChild(details);
    card.appendChild(cancel);
    bookingList.appendChild(card);
    bookings++;
    count.textContent = bookings;
    document.getElementById("message").textContent = "Booking successful! Total: Rs" + price;
    form.reset();
    setTimeout(updatePrice, 0);
};

document.getElementById("search").oninput = function() {
     search = this.value.toLowerCase(), i = 0;
    while (i < bookingList.children.length) {
        if (bookingList.children[i].textContent.toLowerCase().indexOf(search) === -1) {
            bookingList.children[i].style.display = "none";
        } else {
            bookingList.children[i].style.display = "block";
        }
        i++;
    }
};
form.onreset = function() {
    document.getElementById("message").textContent = "";
    setTimeout(updatePrice, 0);
};
