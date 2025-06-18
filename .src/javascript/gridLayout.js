const setNoteLayout = () => {
	const note = document.querySelector(".note");
	const noteChildrenCount = note.children.length;

	if (!(noteChildrenCount % 2 == 0 && noteChildrenCount >= 4))
		console.log('Failed to set grid layout in element with ".note" attribute: unexpected number of children.');
	else {
		const contentCount = (noteChildrenCount - 4) / 2;
		let gridTemplateAreas = "";
		for (let i = 0; i < contentCount; i++)
			gridTemplateAreas += '"tag' + i + ' divider content' + i + '"\n';
		gridTemplateAreas += '". divider ."\n"tagMenu dividerMenu contentMenu"';
		note.style.gridTemplateAreas = gridTemplateAreas;
		note.style.gridTemplateRows = "auto ".repeat(contentCount) + "1fr auto";
		note.style.gridTemplateColumns = "auto 1lh 1fr";
	}
}

setNoteLayout();
