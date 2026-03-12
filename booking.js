const steps = document.querySelectorAll(".booking-step");
const indicators = document.querySelectorAll(".step-indicator");

let currentStep = 0;

function showStep(step){
steps.forEach((s,i)=>{
s.style.display = i===step ? "block":"none";
indicators[i].classList.toggle("active",i===step);
});
}

document.querySelectorAll(".next-btn").forEach(btn=>{
btn.addEventListener("click",()=>{
currentStep++;
showStep(currentStep);
updateSummary();
});
});

document.querySelectorAll(".prev-btn").forEach(btn=>{
btn.addEventListener("click",()=>{
currentStep--;
showStep(currentStep);
});
});

showStep(currentStep);


/* SUMMARY UPDATE */

function updateSummary(){

document.getElementById("sumPickup").innerText =
document.getElementById("pickup").value || "-";

document.getElementById("sumDrop").innerText =
document.getElementById("drop").value || "-";

const car = document.querySelector("input[name='car']:checked");

if(car){
document.getElementById("sumCar").innerText = car.value;
document.getElementById("sumPrice").innerText =
"₹"+car.dataset.price;
}

}


/* BOOKING SUBMIT */

document.getElementById("bookingForm").addEventListener("submit",(e)=>{
e.preventDefault();
document.getElementById("successMsg").style.display="block";
});