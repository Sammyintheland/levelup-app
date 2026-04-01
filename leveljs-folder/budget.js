// ==============================
// BUDGET DATA
// ==============================

function getBudgetKey(){
const user = getCurrentUser();
return "budget_"+user.name;
}

function loadBudget(){

const data = JSON.parse(localStorage.getItem(getBudgetKey())) || {
income:0,
expenses:[],
goal:0
};

return data;

}

function saveBudget(data){
localStorage.setItem(getBudgetKey(),JSON.stringify(data));
}


// ==============================
// ADD INCOME
// ==============================

window.addIncome = function(){

const amount = Number(document.getElementById("income-input").value);

if(!amount){

Swal.fire({
icon:"warning",
title:"Enter income amount"
});

return;

}

const data = loadBudget();

data.income += amount;

saveBudget(data);

document.getElementById("income-input").value="";

Swal.fire({
icon:"success",
title:"Income Added",
timer:1200,
showConfirmButton:false
});

updateBudgetUI();

};


// ==============================
// ADD EXPENSE
// ==============================

window.addExpense = function(){

const name = document.getElementById("expense-name").value;
const amount = Number(document.getElementById("expense-amount").value);

if(!name || !amount){

Swal.fire({
icon:"warning",
title:"Enter expense name and amount"
});

return;

}

const data = loadBudget();

data.expenses.push({name,amount});

saveBudget(data);

document.getElementById("expense-name").value="";
document.getElementById("expense-amount").value="";

Swal.fire({
icon:"success",
title:"Expense Added",
timer:1000,
showConfirmButton:false
});

updateBudgetUI();

};


// ==============================
// UPDATE UI
// ==============================

function updateBudgetUI(){

const data = loadBudget();

const totalExpenses = data.expenses.reduce((sum,e)=>sum+e.amount,0);

const balance = data.income - totalExpenses;

document.getElementById("total-income").innerText = data.income;
document.getElementById("total-expenses").innerText = totalExpenses;
document.getElementById("balance").innerText = balance;


// overspending alert

if(balance < 0){

Swal.fire({
icon:"warning",
title:"Overspending Alert!",
text:"You are spending more than your income!"
});

}


// transactions

const container = document.getElementById("transaction-list");

container.innerHTML = data.expenses.map(e=>`

<div class="flex justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded">

<span>${e.name}</span>
<span>$${e.amount}</span>

</div>

`).join("");


// savings goal

if(data.goal){

const saved = Math.max(balance,0);

const percent = Math.min(Math.round((saved/data.goal)*100),100);

document.getElementById("goal-progress").innerText = percent+"%";

document.getElementById("goal-bar").style.width = percent+"%";

}

}



// Delete all INCOME
window.deleteAllIncome = function(){
    Swal.fire({
        title: "Delete all income?",
        text: "This will remove all income entries and reset your total income.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Yes, delete all"
    }).then((result) => {
        if(result.isConfirmed){
            const data = loadBudget();
            data.incomeSources = [];
            data.income = 0;
            saveBudget(data);
            updateBudgetUI();
            
            Swal.fire({
                icon: "success",
                title: "All income deleted",
                timer: 1200,
                showConfirmButton: false
            });
        }
    });
}




// ==============================
// SET GOAL
// ==============================

window.setGoal = function(){

const goal = Number(document.getElementById("goal-input").value);

if(!goal){

Swal.fire({
icon:"warning",
title:"Enter goal amount"
});

return;

}

const data = loadBudget();

data.goal = goal;

saveBudget(data);

Swal.fire({
icon:"success",
title:"Savings Goal Set!"
});

updateBudgetUI();

};


// ==============================
// CLEAR HISTORY
// ==============================

window.clearTransactions = function(){

Swal.fire({
title:"Clear transactions?",
icon:"warning",
showCancelButton:true,
confirmButtonColor:"#ef4444",
confirmButtonText:"Yes clear"
}).then((result)=>{

if(result.isConfirmed){

const data = loadBudget();

data.expenses=[];

saveBudget(data);

updateBudgetUI();

Swal.fire({
icon:"success",
title:"Transactions Cleared",
timer:1000,
showConfirmButton:false
});

}

});

};


// ==============================
// AUTO LOAD
// ==============================

window.addEventListener("load",updateBudgetUI);