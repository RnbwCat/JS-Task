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