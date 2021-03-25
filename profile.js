document.addEventListener("DOMContentLoaded", () => {
	setUserInfo();
	setBooksList();
});

function setUserInfo() {
	var user = localStorage.getItem("user");
	var userInfo = JSON.parse(user);
	var infoList = document.getElementById("info-list");

	infoList.innerHTML = "";
	for (var info in userInfo) {
		if (info === "list") continue;

		infoList.innerHTML += `<li class="list-group-item"><b>${info}:</b> ${userInfo[info]}</li>`;
	}
}

function setBooksList() {
	var list = document.getElementById("books-list");
	list.innerHTML = "";
	var userInfo = JSON.parse(localStorage.getItem("user"));
	if (userInfo.list && userInfo.list.length) {
		userInfo.list.forEach((e, idx) => {
			list.innerHTML += `<li class="list-group-item">${idx + 1}. ${
				e.title
			}</li>`;
		});
	}
}

var addBtn = document.getElementById("prof-add-btn");
addBtn.addEventListener("click", () => addNewInformation());

function addNewInformation() {
	var infoField = document.getElementById("input-key");
	var valueField = document.getElementById("input-value");
	var info = infoField.value;
	var value = valueField.value;

	if (!info || !value) {
		var lang = localStorage.getItem("lang");
		if (lang === "ru") {
			alert("Заполните все поля!");
		} else {
			alert("Fill all the fields!");
		}
		return;
	}

	var userInfo = JSON.parse(localStorage.getItem("user"));
	userInfo[info] = value;
	localStorage.setItem("user", JSON.stringify(userInfo));
	setUserInfo();
	infoField.value = valueField.value = "";
}

var logoutBtn = document.getElementById("prof-logout");
logoutBtn.addEventListener("click", () => {
	localStorage.removeItem("isLogged");
	setTimeout(() => {
		location.href = "login.html";
	}, 1000);
});

var catalogBtn = document.getElementById("prof-catalog");
catalogBtn.addEventListener("click", () => {
	location.href = "catalog.html";
});
