const showHideMenu = () => {
	const menuLucide = document.querySelector(".note > .tag.menu > button > .lucide");
	const toggleMenu = document.querySelector(".note > .tag.menu > button");
	const contentMenu = document.querySelector(".note > .content.menu");
	const menu = document.querySelectorAll(".note > .menu");
	
	function hide () {
		menuLucide.style.transform = "none";
		menu.forEach(element => {
			element.style.maxHeight = "2lh";
		});
		// prepare next click
		toggleMenu.removeEventListener("click", hide);
		toggleMenu.addEventListener("click", show);
	}
	
	function show () {
		menuLucide.style.transform = "rotate(0.25turn)";
		menu.forEach(element => {
			element.style.maxHeight = contentMenu.scrollHeight + "px";
		});
		// prepare next click
		toggleMenu.removeEventListener("click", show);
		toggleMenu.addEventListener("click", hide);
	}
	
	toggleMenu.addEventListener("click", show);
}

showHideMenu();
