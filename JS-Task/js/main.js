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

// кнопка выхода
let exit = document.querySelector(".exit").addEventListener("click", logOut);

function logOut() {
	greeting.style.display = "none";
	greetWindow.style.display = "block";
	document.body.classList.add('lock');
}
// /кнопка выхода

