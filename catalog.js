var urlFantasy = "https://my-json-server.typicode.com/Taknt/mockjson/fantasy";
var urlClassic = "https://my-json-server.typicode.com/Taknt/mockjson/classic";
var urlDetective =
	"https://my-json-server.typicode.com/Taknt/mockjson/detective";

// https://medium.com/@RistaSB/create-ajax-function-with-xmlhttprequest-and-promise-fe7422e38b50
function callAjax(url, method, data) {
	return new Promise((resolve, reject) => {
		let req = new XMLHttpRequest();
		req.responseType = "json";
		req.onreadystatechange = function () {
			if (req.readyState === XMLHttpRequest.DONE) {
				if (req.status === 200) {
					resolve(req.response);
				} else {
					reject(Error(req.status));
				}
			}
		};
		req.onerror = function () {
			reject(Error("Network Error"));
		};
		req.open(method, url, true);
		req.send(data);
	});
}

var promiseF = callAjax(urlFantasy, "GET");
var promiseC = callAjax(urlClassic, "GET");
var promiseD = callAjax(urlDetective, "GET");
var booksF, booksC, booksD, allBooks;

Promise.all([promiseF, promiseC, promiseD])
	.then(res => {
		console.log(res);
		booksF = res[0];
		booksC = res[1];
		booksD = res[2];
		allBooks = booksF.concat(booksC, booksD);
		setAllBooks();
	})
	.catch(err => console.error(err));

function setAllBooks() {
	setBooks(booksF, "row1");
	setBooks(booksC, "row2");
	setBooks(booksD, "row3");
}

function setBooks(books, id) {
	var row = document.getElementById(id);
	row.innerHTML = "";
	books.forEach(e => {
		row.innerHTML += `<div class="col-12 col-sm-4 col-md-3 mb-2">
    <div class="card">
      <img src="${e.src}" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">${e.title}</h5>
        <p class="card-text">
          <b data-tag="cat-author"></b>: <span>${e.author}</span>
        </p>
        <a href="#" class="btn btn-primary" data-tag="cat-card-btn" onclick="popupModal(${e.id})"></a>
      </div>
    </div>
  </div>`;
	});
	setLang();
}

function popupModal(id) {
	var modal = document.getElementById("myModal");
	modal.style.display = "block";
	var close = document.getElementById("modal-close");
	var add = document.getElementById("modal-add");
	close.addEventListener("click", () => (modal.style.display = "none"));
	add.addEventListener("click", () => {
		addToList(id);
		modal.style.display = "none";
	});
}

function addToList(id) {
	var user = JSON.parse(localStorage.getItem("user"));
	if (!("list" in user)) {
		user.list = [];
	}
	var book = allBooks.find(t => t.id === id);
	var check = user.list.findIndex(t => t.id === id);
	if (check === -1) user.list.push(book);
	localStorage.setItem("user", JSON.stringify(user));
}

var searchBtn = document.getElementById("search-find");
var resetBtn = document.getElementById("search-reset");

searchBtn.addEventListener("click", () => searchFilter());
resetBtn.addEventListener("click", () => {
	var input = document.getElementById("search-input");
	input.value = "";
	setAllBooks();
});

function searchFilter() {
	var input = document.getElementById("search-input").value.toLowerCase();
	var nF = booksF.filter(
		e =>
			e.author.toLowerCase().includes(input) ||
			e.title.toLowerCase().includes(input)
	);
	var nC = booksC.filter(
		e =>
			e.author.toLowerCase().includes(input) ||
			e.title.toLowerCase().includes(input)
	);
	var nD = booksD.filter(
		e =>
			e.author.toLowerCase().includes(input) ||
			e.title.toLowerCase().includes(input)
	);
	console.log(nF);
	setBooks(nF, "row1");
	setBooks(nC, "row2");
	setBooks(nD, "row3");
}
