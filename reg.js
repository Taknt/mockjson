var btn = document.querySelector('[data-tag="form-reg-btn"]');
btn.addEventListener("click", e => {
	e.preventDefault();
	checkRegistration();
});

function checkRegistration() {
	var email = document.querySelector('[name="email"]').value;
	var login = document.querySelector('[name="login"]').value;
	var password = document.querySelector('[name="password"]').value;

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

	if (!email || !login || !password) {
		showFail();
		return;
	}

	var userInfo = { login: login, email: email, password: password };

	localStorage.setItem("user", JSON.stringify(userInfo));
	showSuccess();
	localStorage.setItem("isLogged", JSON.stringify(true));
	setTimeout(() => {
		location.href = "catalog.html";
	}, 1000);
}
