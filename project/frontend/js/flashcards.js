let count = 0;
let totalCards = 8;

document.querySelectorAll(".flashcard").forEach(card => {

card.addEventListener("click", () => {

let innerCard = card.querySelector(".card");

if(!innerCard.classList.contains("flip")){

innerCard.classList.add("flip");

count++;

document.getElementById("progress").innerText =
"Cards explored: " + count + " / " + totalCards + " ⭐";

if(count === totalCards){

setTimeout(()=>{

if(confirm("🎉 Great Job! You explored all flashcards!\n\nGo back to content page?")){

window.location.href="content.html";

}

},300);

}

}

});

});


function goBack(){

window.location.href="content.html";

}