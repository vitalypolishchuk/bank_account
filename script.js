//===============================
// Doc variables
//===============================
// ================ registration
const openAcc = document.querySelector(".open-acc");
const openAccName = document.querySelector(".open-acc-name");
const openAccPin = document.querySelector(".open-acc-pin");
const currencyType = document.getElementById("currency");
const interestType = document.getElementById("interest-rate");
const signUp = document.querySelector(".sign-up");

// ================ loading
const loading = document.querySelector(".loading");

// ================ login
const userNickname = document.querySelector(".user-nickname");
const userPin = document.querySelector(".user-pin");
const loginBtn = document.querySelector(".login-arrow");

// ================ header
const headerLoginMsg = document.querySelector(".header-login-msg");

// ================ current balance
const accountPage = document.querySelector(".account-page");
const docDate = document.querySelector(".date");
const docTime = document.querySelector(".time");
const currentBalanceAmount = document.querySelector(".current-balance-amount");

// ================ history
const accHistory = document.querySelector(".account-history");

// ================ transfer
const transferTo = document.querySelector(".transfer-text");
const transferAmount = document.querySelector(".transfer-amount");
const transferBtn = document.querySelector(".transfer-arrow");

// ================ take loan
const loanField = document.querySelector(".loan-field");
const loanBtn = document.querySelector(".loan-arrow");

//================= pay loan
const payLoanAmount = document.querySelector(".pay-loan-field");
const payLoanBtn = document.querySelector(".pay-loan-arrow");

// ================ footer
const inflow = document.querySelector(".inflow");
const outflow = document.querySelector(".outflow");
const currentLoanDoc = document.querySelector(".current-loan");

//===============================
// JavaScript variables
//===============================
let myAcc;
let sumOfMovm;
const minLoan = 10;
const maxLoan = 100000;
let indexTrans;
let d;

//===============================
// Accounts
//===============================
const account1 = {
  owner: "js",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  dates: ["1/7/2022", "2/7/2022", "3/7/2022", "4/7/2022", "5/7/2022", "6/7/2022", "8/7/2022", "9/7/2022"],
  interestRate: 1.2,
  loan: 0,
  currencyType: "USD",
  pin: 1111,
  sumOfMovements() {
    let sum = 0;
    this.movements.forEach((movement) => (sum += movement));
    return sum;
  },
};

const account2 = {
  owner: "py",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  dates: ["1/7/2022", "2/7/2022", "3/7/2022", "4/7/2022", "5/7/2022", "6/7/2022", "8/7/2022", "9/7/2022"],
  interestRate: 1.5,
  loan: 0,
  currencyType: "USD",
  pin: 2222,
  sumOfMovements() {
    let sum = 0;
    this.movements.forEach((movement) => (sum += movement));
    return sum;
  },
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  dates: [],
  interestRate: 0.7,
  loan: 0,
  currencyType: "USD",
  pin: 3333,
  sumOfMovements() {
    let sum = 0;
    this.movements.forEach((movement) => (sum += movement));
    return sum;
  },
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  dates: [],
  interestRate: 1,
  loan: 0,
  currencyType: "USD",
  pin: 4444,
  sumOfMovements() {
    let sum = 0;
    this.movements.forEach((movement) => (sum += movement));
    return sum;
  },
};

const accounts = [account1, account2, account3, account4];

//===============================
// Registration
//===============================
signUp.addEventListener("click", registerNewAcc);

function isNum(val) {
  return !isNaN(val);
}
function accExists(name, pin) {
  for (const [index, acc] of accounts.entries()) {
    if (pin) {
      if (name === acc.owner && pin === acc.pin) {
        return index;
      }
    } else {
      if (name === acc.owner) return index;
    }
  }
}
function registerNewAcc() {
  if (openAccName.value !== "" && isNum(openAccPin.value)) {
    // Check if new acc already exists
    let accIndex = accExists(openAccName.value);
    if (!accIndex) {
      // If account does not exist, we create new account
      accounts.push({
        owner: openAccName.value,
        movements: [],
        dates: [],
        currencyType: currencyType.value,
        interestRate: Number(interestType.value),
        loan: 0,
        pin: Number(openAccPin.value),
        sumOfMovements() {
          let sum = 0;
          this.movements.forEach((movement) => (sum += movement));
          return sum;
        },
      });
      indexTrans = -1;
      displayAccountPage(accounts[accIndex], openAccName.value);
    } else {
      // if account exists, we arert the user
      alert("Given account already exists!");
    }
  } else {
    alert("Invalid input! PIN should be a number!");
  }
}
//===============================
// Login
//===============================
loginBtn.addEventListener("click", () => {
  if (typeof userNickname.value !== "undefined" && isNum(userPin.value)) {
    let accIndex = accExists(userNickname.value, Number(userPin.value));
    if (typeof accIndex === "undefined") {
      alert(`Nickname or password is wrong!`);
    } else {
      indexTrans = -1;
      displayAccountPage(accounts[accIndex], userNickname.value);
    }
  } else {
    alert("Invalid input! PIN should be a number!");
  }
});

//===============================
// Account Page
//===============================
function displayAccountPage(account, accOwner) {
  // close register page
  openAcc.classList.add("--hide");
  accountPage.classList.add("--hide");
  // launch loading
  loading.classList.remove("--hide");
  // wait for 0.5 sec before removing loading
  setTimeout(function () {
    accountPage.classList.remove("--hide");
    loading.classList.add("--hide");
  }, 500);

  account ??= accounts[accExists(accOwner)];
  myAcc = account;

  // display the current balance
  displayHeader();
  countMovements();
  displayHistory();
  displayFooter();
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayHeader() {
  headerLoginMsg.textContent = `Welcome back, ${myAcc.owner}`;
}

function countMovements() {
  let sumOfMovmFunc = myAcc.sumOfMovements.bind(myAcc);
  sumOfMovm = sumOfMovmFunc();
  currentBalanceAmount.textContent = numberWithCommas(String(sumOfMovm)) + " " + currencyType.value;
}

// ================ current time and date
function updateTime() {
  d = new Date();
  docDate.textContent = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  docTime.textContent = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}
var intervalId = window.setInterval(updateTime, 1000);

//================ history
function displayHistory() {
  accHistory.innerHTML = "";
  const reverseMovements = myAcc.movements.slice().reverse();
  const reverseDates = myAcc.dates.slice().reverse();
  reverseMovements.forEach((movement, index) => {
    // account history
    let trans = document.createElement("div");
    trans.classList.add(`account-history-trans-${reverseMovements.length - 1 - index}`);
    trans.classList.add("account-history-trans");
    accHistory.appendChild(trans);

    // trans-history-left
    let transLeft = document.createElement("div");
    transLeft.classList.add("trans-history-left");
    trans.appendChild(transLeft);

    // transaction-type
    let transType = document.createElement("p");
    if (movement > 0) {
      transType.classList.add("deposit-num");
      transType.textContent = `${reverseMovements.length - index} DEPOSIT`;
    } else {
      transType.classList.add("withdrawal-num");
      transType.textContent = `${reverseMovements.length - index} WITHDRAWAL`;
    }
    transLeft.appendChild(transType);

    // date
    let transDate = document.createElement("p");
    transDate.classList.add("transaction-day");
    if (reverseDates[index] === `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`) {
      transDate.textContent = "TODAY";
    } else {
      transDate.textContent = reverseDates[index];
    }
    transLeft.appendChild(transDate);

    // transaction amount
    let transactionAmount = document.createElement("p");
    transactionAmount.classList.add("transaction-amount");
    movement = movement > 0 ? movement : -movement;
    transactionAmount.textContent = numberWithCommas(String(movement)) + " " + currencyType.value;
    trans.appendChild(transactionAmount);
  });
}

//================ loading

//================ transfer money
transferBtn.addEventListener("click", () => {
  if (transferTo.value !== "" && isNum(transferAmount.value) && Number(transferAmount.value) > 0) {
    if (sumOfMovm >= Number(transferAmount.value)) {
      let accIndex = accExists(transferTo.value);
      if (typeof accIndex !== "undefined") {
        myAcc.movements.push(-Number(transferAmount.value));
        myAcc.dates.push(`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`);
        accounts[accIndex].movements.push(Number(transferAmount.value));
        displayAccountPage(myAcc);
        countMovements;
        setTimeout(() => alert("Transition is successful"), 600);
      } else {
        alert("Account does not exist!");
      }
    } else {
      alert("Not enough funds!");
    }
  } else {
    alert("Wrong input!");
  }
});

//================ request loan
loanBtn.addEventListener("click", () => {
  if (isNum(loanField.value) && Number(loanField.value) > 0) {
    if (myAcc.loan + Number(loanField.value) > maxLoan) {
      alert(`You exceeded upper limit of loan (${numberWithCommas(maxLoan)} ${myAcc.currencyType})`);
    } else {
      myAcc.loan += Number(loanField.value) * myAcc.interestRate;
      myAcc.movements.push(Number(loanField.value));
      myAcc.dates.push(`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`);
      displayAccountPage(myAcc);
      countMovements;
      setTimeout(() => alert("You have successfully received loan"), 600);
    }
  } else {
    alert("Wrong input!");
  }
});
//================ pay loan
payLoanBtn.addEventListener("click", () => {
  if (myAcc.loan !== 0) {
    if (isNum(payLoanAmount.value) && Number(payLoanAmount.value) > 0) {
      if (sumOfMovm >= Number(payLoanAmount.value)) {
        if (Number(payLoanAmount.value) >= myAcc.loan) {
          myAcc.movements.push(-myAcc.loan);
          myAcc.loan = 0;
          myAcc.dates.push(`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`);
          displayAccountPage(myAcc);
          countMovements;
          setTimeout(() => alert("You have successfully paid off your loan"), 600);
        } else {
          myAcc.movements.push(Number(-payLoanAmount.value));
          myAcc.dates.push(`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`);
          myAcc.loan -= Number(payLoanAmount.value);
          displayAccountPage(myAcc);
          countMovements;
          setTimeout(() => alert("You have successfully paid for your loan"), 600);
        }
      } else {
        alert("Not enough funds");
      }
    } else {
      alert("Wrong input!");
    }
  } else {
    alert("You do not have a loan!");
  }
});

//================ footer
function displayFooter() {
  let currentinflow = 0;
  let currentOutflow = 0;
  let currentLoan = myAcc.loan;

  myAcc.movements.forEach((movement) => {
    if (movement > 0) {
      currentinflow += movement;
    } else {
      currentOutflow += movement;
    }
  });
  inflow.textContent = numberWithCommas(String(currentinflow)) + " " + myAcc.currencyType;
  outflow.textContent = numberWithCommas(String(-currentOutflow)) + " " + myAcc.currencyType;
  currentLoanDoc.textContent = numberWithCommas(String(currentLoan)) + " " + myAcc.currencyType;
}
