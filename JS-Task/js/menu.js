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