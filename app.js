document.addEventListener("DOMContentLoaded", () => {
	setLang();
	checkAuth();
});

var changeLangBtn = document.getElementById("change-lang");
changeLangBtn.addEventListener("click", () => changeLang());

function setLang() {
	var lang = localStorage.getItem("lang") || "en";
	var content = document.querySelectorAll("[data-tag]");
	swapLangDropdowns(lang);
	Array.from(content).forEach(e => {
		var tag = e.dataset.tag;
		e.textContent = langs[lang][tag];
	});
}

function changeLang() {
	var lang = localStorage.getItem("lang");
	var newLang = lang === "en" ? "ru" : "en";
	localStorage.setItem("lang", newLang);
	setLang();
}

function swapLangDropdowns(lang) {
	var navLangs = document.getElementsByClassName("nav-langs");

	if (lang === "ru") {
		navLangs[0].innerHTML =
			'<span class="flag-icon flag-icon-ru"> </span> Русский';
		navLangs[1].innerHTML =
			'<span class="flag-icon flag-icon-gb"> </span> English';
		return;
	}
	navLangs[1].innerHTML =
		'<span class="flag-icon flag-icon-ru"> </span> Русский';
	navLangs[0].innerHTML =
		'<span class="flag-icon flag-icon-gb"> </span> English';
}

function checkAuth() {
	var isLogged = localStorage.getItem("isLogged");

	if (!isLogged) {
		document.querySelector('[data-tag="nav-profile"]').style.display = "none";
		document.querySelector('[data-tag="nav-catalog"]').style.display = "none";
		document.querySelector('[data-tag="nav-login"]').style.display =
			"list-item";
		document.querySelector('[data-tag="nav-reg"]').style.display = "list-item";
	} else {
		document.querySelector('[data-tag="nav-profile"]').style.display =
			"list-item";
		document.querySelector('[data-tag="nav-catalog"]').style.display =
			"list-item";
		document.querySelector('[data-tag="nav-login"]').style.display = "none";
		document.querySelector('[data-tag="nav-reg"]').style.display = "none";
	}
}
