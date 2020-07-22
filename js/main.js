"use strict"

let greetBtnLogin = document.querySelector(".greet__login");
let greetBtnCreate = document.querySelector(".greet__create");
let greetWindow = document.querySelector(".greet-window");

let authEmail = document.querySelector("#authEmail");
let authPassword = document.querySelector("#authPassword");
let authLogin = document.querySelector(".auth__login");
let authCreate = document.querySelector(".auth__create");
let authWindow = document.querySelector(".auth-window");

let regName = document.querySelector(".reg__name-input");
let regEmail = document.querySelector(".reg__email-input");
let regPassword = document.querySelector(".reg__pass-input");
let regCreate = document.querySelector(".reg__create");
let regWindow = document.querySelector(".reg-window");

let input = document.querySelectorAll(".input");
let form = document.querySelectorAll(".start-window");
let users = [];

window.addEventListener("load", () => {
	if (localStorage.getItem("email")) {
		greetWindow.style.display = "none";
		authWindow.style.display = "none";
		regWindow.style.display = "none";
		greeting.style.display = "block";
	}else {
		document.body.classList.add('lock');
	}
})

function User(name, email, pass) {
	this.name = name;
	this.email = email;
	this.pass = pass;
}

let greeting = document.createElement("p");

	document.body.append(greeting);
	greeting.innerText = `Добро пожаловать, ${localStorage.getItem("name")}!
		Ваш браузер: ${navigator.appCodeName}.`;
	greeting.style.position = "absolute";
	greeting.style.top = "50%";
	greeting.style.left = "50%";
	greeting.style.transform = "translate(-50%, -50%)";
	greeting.style.fontSize = "60px";
	greeting.style.fontWeight = "bold";
	greeting.style.color = "#123F3F";
	greeting.style.textAlign = "center";
	greeting.style.display = "none";

// клик на вход в стартовой форме
greetBtnLogin.addEventListener("click", () => {
	greetWindow.style.display = "none";
	authWindow.style.display = "block";
	document.body.classList.add('lock');
});
// /клик на вход в стартовой форме

// клик на создание аккунта
greetBtnCreate.addEventListener("click", showRegForm);
authCreate.addEventListener("click", showRegForm);

function showRegForm() {
	greetWindow.style.display = "none";
	authWindow.style.display = "none";
	regWindow.style.display = "block";
	document.body.classList.add('lock');
};
// /клик на создание аккунта

input.forEach(function(input) {
	input.addEventListener("focus", () => {
		input.value = "";
	});
});

regCreate.addEventListener("click", () => {
	localStorage.setItem("email", regEmail.value);
	localStorage.setItem("name", regName.value);
	localStorage.setItem("password", regPassword.value);

	regWindow.style.display = "none";
	greetWindow.style.display = "none";
	authWindow.style.display = "none";
	greeting.style.display = "block";
	document.body.classList.remove('lock');
});

let user = new User(
	localStorage.getItem("name"),
	localStorage.getItem("email"),
	localStorage.getItem("password")
);

users.push(user);
console.log(users);

// валидация
function validate() {
	event.preventDefault();
	for(let i = 0; i < input.length; i++) {
		if (!input[i].value) {
			let hint = document.querySelectorAll(".hint");
			hint[i].style.opacity = "1";

			function hideHint() {
				hint[i].style.opacity = "0";
			}
			setTimeout(hideHint, 1500);
		}
	}
	if(authEmail.value && authPassword.value &&
		(authEmail.value !== localStorage.getItem("email") 
		|| authPassword.value !== localStorage.getItem("password"))) {
		let invalidData = document.querySelector(".auth__message-invalid")
		invalidData.style.opacity = "1";
		authWindow.style.display = "block";

		function hideInvalidData() {
			invalidData.style.opacity = "0";
		}
		setTimeout(hideInvalidData, 2000);
	}
	if(authEmail.value === localStorage.getItem("email") 
		&& authPassword.value ===localStorage.getItem("password")) {
		authWindow.style.display = "none";
		greeting.style.display = "block";
		document.body.classList.remove('lock');
	}
}
authLogin.addEventListener("click", validate);
// /валидация

// кнопка "настройки"
let setting = document.querySelector(".setting__link");
let list = document.querySelector(".setting__list");
let deleteBtn =document.querySelector(".setting__delete");
let deleteWindow = document.querySelector(".del-acc-window");
let deleteYes = document.querySelector(".delete-account__yes");
let deleteNo = document.querySelector(".delete-account__no");


function showSettingList() {
	list.classList.toggle("open-list");
	window.addEventListener("scroll", () => {
	list.classList.remove("open-list");
});
}

function showDeleteModal() {
	deleteWindow.style.display = "block";
	list.classList.remove("open-list");
	document.body.classList.add('lock');
}

function deleteAccount() {
	let list = document.querySelector(".setting__list");
	localStorage.clear();
	list.classList.remove("open-list");
	greeting.style.display = "none";
	deleteWindow.style.display = "none";
	greetWindow.style.display = "block";
	document.body.classList.add('lock');
}

function dontDeleteAccount() {
	deleteWindow.style.display = "none";
	document.body.classList.remove('lock');
}

setting.addEventListener("click", showSettingList);
deleteBtn.addEventListener("click", showDeleteModal);
deleteYes.addEventListener("click", deleteAccount);
deleteNo.addEventListener("click", dontDeleteAccount);
// /кнопка "настройки"

// кнопка выхода
let exit = document.querySelector(".exit").addEventListener("click", logOut);

function logOut() {
	greeting.style.display = "none";
	greetWindow.style.display = "block";
	document.body.classList.add('lock');
}
// /кнопка выхода

let navItem = document.querySelectorAll(".list__item");


navItem.forEach(function(item) {
	item.addEventListener("click", makeActive);
	function makeActive() {
		for (let i = 0; i < navItem.length; i++) {
			navItem[i].classList.remove("active");
		}
		this.classList.add("active");
	};
});

// блок "клиенты"
let table = document.querySelector(".table");
let tableHeaders = document.querySelector(".table__headers");
let btnUp = document.querySelector(".up");

btnUp.addEventListener("click", () => {// кнопка "Вверх"
	table.scrollIntoView(top);
})

function getData() {
	fetch('https://gist.githubusercontent.com/oDASCo/3f4014d24dc79e1e29b58bfa96afaa1b/raw/677516ee3bd278f7e3d805108596ca431d00b629/db.json')
	.then((data) => data.json())
	.then((data)  => {
		let balanceArray = [];

		for (let users of data) {
			let tableClient = document.createElement("tr");
			let deleteButton = document.createElement("button");

			tableHeaders.after(tableClient);

			function makeTableClientActive() {
				if(users.isActive) {
					tableClient.style.backgroundColor = "#fff";
				}else {
					tableClient.style.backgroundColor = "#ddd";
				}
			}
			makeTableClientActive();

			let clientBalances = users.balance.replace(/[$,.]/g, '');
				balanceArray.push(clientBalances);
				
			if(balanceArray.length >= 100) {
				let maxBalance = Math.max.apply(null, balanceArray);
				let itemBalance = document.querySelector(".info__max-balance").append(maxBalance);
				console.log(maxBalance)
				console.log(balanceArray)
			}

			for (let key in users) {
				if (key === "name"
					|| key === "company"
					|| key ==="email"
					|| key === "phone"
					|| key === "registered"
					|| key === "balance") {
					let clientData = document.createElement("td");

					tableClient.append(clientData);
					clientData.innerText = users[key];
					clientData.classList.add("table__data");
				}

				function showDeleteWindow() {
					let clientName = document.querySelector(".modal__clientName");
					let modalDeleteClient = document.querySelector(".delete-client");
					let btnYes = document.querySelector(".modal__yes");
					let btnNo = document.querySelector(".modal__no");

					modalDeleteClient.style.display = "block";
					document.body.classList.add('lock');
					clientName.innerText = `${users.name}`;
					tableClient.style.border = "3px solid #123F3F";

					function cancelClientDeletion() {
						modalDeleteClient.style.display = "none";
						tableClient.style.border = "1px solid #123F3F";
						document.body.classList.remove('lock');
					}

					function confirmСlientDeletion() {
						let successMessage = document.querySelector(".delete-success");

						tableClient.style.display = "none";
						modalDeleteClient.style.display = "none";
						document.body.classList.remove('lock');
						successMessage.style.opacity = "1";

						function hideSuccessMessage() {successMessage.style.opacity = "0";}
						setTimeout(hideSuccessMessage, 2500);
					}

					btnNo.addEventListener("click", cancelClientDeletion);
					btnYes.addEventListener("click", confirmСlientDeletion);
				}

				deleteButton.classList.add("delete-btn");
				deleteButton.classList.add("btn");
				tableClient.append(deleteButton);

				tableClient.addEventListener("mouseover", () => deleteButton.style.display = "block");
				tableClient.addEventListener("mouseleave", () => deleteButton.style.display = "none");
				deleteButton.addEventListener("click", showDeleteWindow);
			}
		}
	})
}

getData();
// /блок "клиенты"

// блок "карта"
function initMap() {
	let coordinates = new google.maps.LatLng (53.908097, 27.556681);
	let mapCanvas = document.querySelector("#map");
	let mapOptions = {
		center: coordinates,
		zoom: 12
	}
	let map = new google.maps.Map(mapCanvas, mapOptions);

	let markersArray = [];

	function makeMarker(lat, lng, title, content) {
		let marker = new google.maps.Marker({
			position: new google.maps.LatLng (lat, lng),
			map: map,
			title: title,
			content: content,
		});
		markersArray.push(marker);
	}

	makeMarker(53.908097, 27.556681, "Главный офис", "<h3>Главный офис</h3> <p><i>Адрес</i></p> <p>Описание Далеко-далеко за <br> словесными горами в стране.</p>");
	makeMarker(53.9273993,27.6042008, "Oфис", "<h3>Oфис</h3> <p><i>Адрес</i></p> <p>Описание Далеко-далеко за <br> словесными горами в стране.</p>");
	makeMarker(53.882226,27.5389363, "Oфис", "<h3>Oфис</h3> <p><i>Адрес</i></p> <p>Описание Далеко-далеко за <br> словесными горами в стране.</p>");
	makeMarker(53.942408,27.5535523, "Oфис", "<h3>Oфис</h3> <p><i>Адрес</i></p> <p>Описание Далеко-далеко за <br> словесными горами в стране.</p>");
	makeMarker(53.8938433,27.4816517, "Oфис", "<h3>Oфис</h3> <p><i>Адрес</i></p> <p>Описание Далеко-далеко за <br> словесными горами в стране.</p>");

	console.log(markersArray);

	for(let marker of markersArray) {
		marker.addListener("click", showInfoWindow);
		function showInfoWindow() {
			for(let key in marker) {
				let infoWindow = new google.maps.InfoWindow({
					content: marker.content
				});
				infoWindow.open(map, marker);
			}
		}
	}
}
// /блок "карта"
