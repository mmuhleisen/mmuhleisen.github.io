const showHide = () => {

	function notesInSection (nextNote) {
		let noteList = [];
		while (!(nextNote.classList.contains("section") || nextNote.classList.contains("divider"))) {
			noteList.push(nextNote);
			nextNote = nextNote.nextElementSibling;
		}
		return noteList;
	}

	function showHideFoldIcons (plus, hide) {
		plus.style.display = hide ? "" : "none";
		plus.nextElementSibling.style.display = hide ? "none" : "";
	}

	function showHideSection (tag, hide) {
		const display = hide ? "none" : "";
		notesInSection(tag.nextElementSibling.nextElementSibling).forEach(element => {
			element.style.display = display;
		});
	}

	function showHideProof (tag, hide) {
		const gradient = "linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%)";
		const mask = hide ? gradient : "none";
		const maxHeight = hide ? "2lh" : "none";
		tag.nextElementSibling.style.mask = mask;
		tag.nextElementSibling.style.maxHeight = maxHeight;
	}

	function showHideMenu (tag, hide) {
		const divider = tag.nextElementSibling;
		const content = tag.nextElementSibling.nextElementSibling;
		const maxHeight = hide ? "2lh" : content.scrollHeight + "px";
		for (const item of [tag, divider, content])
			item.style.maxHeight = maxHeight;
	}

	function showHideLocal (listener) {
		const hide = !listener.checked;
		const plusLucide = listener.nextElementSibling;
		const tag = listener.parentNode.parentNode.parentNode;
		showHideFoldIcons(plusLucide, hide);
		if (tag.classList.contains("section"))
			showHideSection(tag, hide);
		else if (tag.classList.contains("subsection"))
			showHideSection(tag, hide);
		else if (tag.classList.contains("proof"))
			showHideProof(tag, hide);
		else if (tag.classList.contains("menu"))
			showHideMenu(tag, hide);
		else
			console.log("Local show/hide triggered from unexpected source");
	}

	const showHideListeners = document.querySelectorAll('.note > .tag input[type="checkbox"]')
	const showHideSectionsCheckbox = document.getElementById("showHideSectionsCheckbox");
	const showHideProofsCheckbox = document.getElementById("showHideProofsCheckbox");

	function showHideGlobal (showHideButtonID) {
		// check whether e.target is the collapse or the expand button
		if (!(showHideButtonID == "showButton" || showHideButtonID == "hideButton")) {
			console.log("Global show/hide triggered from unexpected source");
			return null;
		}
		const hide = showHideButtonID == "hideButton" ? true : false;
		// check whether sections and/or proofs are selected
		const showHideSections = showHideSectionsCheckbox.checked;
		const showHideProofs = showHideProofsCheckbox.checked;
		showHideListeners.forEach(listener => {
			const tag = listener.parentNode.parentNode.parentNode;
			const fire = (showHideSections && tag.classList.contains("section") && hide == listener.checked)
				|| (showHideSections && tag.classList.contains("subsection") && hide == listener.checked)
				|| (showHideProofs && tag.classList.contains("proof") && hide == listener.checked);
			if (fire) {
				listener.checked = !listener.checked;
				showHideLocal(listener);
			} 
		});
	}

	// add listeners to tag checkboxes and activate hide on unchecked ones
	showHideListeners.forEach(listener => {
		listener.addEventListener("click", e => showHideLocal(e.currentTarget));
		if (!listener.checked)
			showHideLocal(listener);
	});
	document.getElementById("showButton").addEventListener("click", (e) => showHideGlobal(e.currentTarget.id));
	document.getElementById("hideButton").addEventListener("click", (e) => showHideGlobal(e.currentTarget.id));

	// ensures that the show/hide icons have the correct visibility when the DOM tree loads
	window.addEventListener("DOMContentLoaded", () => {
		showHideListeners[showHideListeners.length - 1].checked = false;
		showHideListeners.forEach(listener => {
			showHideFoldIcons(listener.nextElementSibling, !listener.checked);
		});
	});
}

showHide();
