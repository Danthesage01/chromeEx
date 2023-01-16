// Build a delete button- for clicked item.

let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const deleteAllBtn = document.getElementById("delete-all-btn");
const deleteSelectBtn = document.getElementsByClassName("delete-select-btn");
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li>
        <a href='${leads[i]}' target='_blank'>  
        ${leads[i]} 
        </a>
         <span class="delete"><i class="fas fa-trash"></i></span>
        </li>`;
  }
  ulEl.innerHTML = listItems;
}

function deleteSingle(target) {
  if (target.parentElement.className == "delete") {
    target.parentElement.parentElement.remove();
    myLeads.forEach((lead, index) => {
      if (lead === target.parentElement.parentElement.textContent.trim()) {
        myLeads.splice(index, 1);
      }
    });
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
  }
}

inputEl.addEventListener("submit", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});
inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});
deleteAllBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

// Event listener for delete
document.querySelector("#ul-el").addEventListener("click", function (e) {
  // Delete
  deleteSingle(e.target);
  e.preventDefault();
});
