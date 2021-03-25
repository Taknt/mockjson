var btn = document.querySelector('[data-tag="form-login-btn"]');
btn.addEventListener("click", e => {
	e.preventDefault();
	checkLogin();
});

function checkLogin() {
	var login = document.querySelector('[name="login"]').value;
	var password = document.querySelector('[name="password"]').value;
	var user = localStorage.getItem("user");

	var alertSuccess = document.getElementById("success");
	var alertFail = document.getElementById("fail");

	var showSuccess = function () {
		alertSuccess.style.display = "block";
		alertFail.style.display = "none";
	};
	var showFail = function () {
		alertSuccess.style.display = "none";
		alertFail.style.display = "block";
	};

	if (!user) {
		showFail();
		return;
	}

	var userInfo = JSON.parse(user);

	if (userInfo && userInfo.login === login && userInfo.password === password) {
		localStorage.setItem("isLogged", JSON.stringify(true));
		showSuccess();
		setTimeout(() => {
			location.href = "./catalog.html";
		}, 1000);
	} else {
		showFail();
	}
}
