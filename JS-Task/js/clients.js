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