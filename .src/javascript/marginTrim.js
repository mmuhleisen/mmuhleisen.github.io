const marginTrim = () => {
	function trimFromStart (element) {
		if (parseFloat(window.getComputedStyle(element).height) > 0) {
			if (parseFloat(window.getComputedStyle(element).marginTop) > 0)
				element.style.marginTop = "0";
			if (element.firstElementChild)
				trimFromStart(element.firstElementChild);
		} else if (element.nextElementSibling)
			trimFromStart(element.nextElementSibling);
	}

	function trimFromEnd (element) {
		if (parseFloat(window.getComputedStyle(element).height) > 0) {
			if (parseFloat(window.getComputedStyle(element).marginBottom) > 0)
				element.style.marginBottom = "0";
			if (element.lastElementChild)
				trimFromEnd(element.lastElementChild);
		} else if (element.previousElementSibling)
			trimFromEnd(element.previousElementSibling);
	}

	document.querySelectorAll(".note > .content").forEach(contentContainer => {
		trimFromStart(contentContainer);
		trimFromEnd(contentContainer);
	});
}

marginTrim();
