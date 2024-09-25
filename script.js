const balanceElement = document.getElementById("total-balance");
const historySection = document.getElementById("history-container");
const donationButton = document.getElementById("donation-btn");
const historyButton = document.getElementById("history-btn");

function updateBalance(event, id) {
  const balanceField = document.getElementById(id);
  const enteredAmount = event.target.previousElementSibling.value;
  const donationAmount = parseFloat(enteredAmount);
  const previousDonation = parseFloat(balanceField.innerText);
  balanceField.innerText = donationAmount + previousDonation;
  event.target.previousElementSibling.value = "";
  updateRemainingBalance(balanceElement, donationAmount);
}

function updateRemainingBalance(balanceElement, donationAmount) {
  const totalBalance = parseFloat(balanceElement.innerText);
  balanceElement.innerText = totalBalance - donationAmount;
}

function toggleScreen(showHistory) {
  if (showHistory) {
    donationSection.classList.add("hidden");
    historySection.classList.remove("hidden");
    historySection.classList.add("flex");
    historyButton.classList.add("bg-accents", "border-0");
    donationButton.classList.add("bg-transparent", "btn-outline", "border");
  } else {
    donationSection.classList.remove("hidden");
    donationSection.classList.add("flex");
    historySection.classList.add("hidden");
    historyButton.classList.remove("bg-accents", "border-0");
    donationButton.classList.remove("btn-outline", "bg-transparent");
  }
}

function addToHistory(event) {
  const donationTitle = event.target.parentElement.previousElementSibling.children[0];
  const donationInput = event.target.previousElementSibling;
  const currentDate = new Date();
  historySection.innerHTML += `
  <div class="p-8 rounded-2xl shadow flex flex-col gap-4">
    <h2 class="font-bold text-lg">
      ${donationInput.value} Taka is Donated for ${donationTitle.innerText}
    </h2>
    <p class="text-base font-light">
      Date : ${currentDate.toString()}
    </p>
  </div>
  `;
}


const donationSection = document.getElementById("donation-container");
const confirmationDialog = document.getElementById("confirmation-message");
const addMoneyButtons = document.querySelectorAll('.addMoney');

donationSection.addEventListener("click", function (event) {
  if (event.target.classList.contains("addMoney")) {
    const inputValue = event.target.previousElementSibling.value;
    const donationAmount = parseFloat(inputValue);

    if (typeof donationAmount !== "number" || isNaN(donationAmount) || donationAmount <= 0 || donationAmount !== Number(inputValue.toString()) || donationAmount > Number(balanceElement.innerText)) {
      alert("Invalid Input");
      event.target.previousElementSibling.value = "";
      return;
    }

    addToHistory(event);
    confirmationDialog.showModal();

    if (event.target.classList.contains("btn1")) {
      updateBalance(event, "initialMoney1");
    } else if (event.target.classList.contains("btn2")) {
      updateBalance(event, "initialMoney2");
    } else {
      updateBalance(event, "initialMoney3");
    }
  }
});

donationButton.addEventListener("click", function () {
  toggleScreen(false);
});

historyButton.addEventListener("click", function () {
  toggleScreen(true);
});
