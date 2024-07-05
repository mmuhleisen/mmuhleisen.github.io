const changeTagNames = () => {
	const note = document.querySelector(".note");
	
	const shortLong = new Map();
	shortLong.set('axiom', ['Ax', 'Axiom']);
	shortLong.set('definition', ['Def', 'Definition']);
	shortLong.set('example', ['Ex', 'Example']);
	shortLong.set('corollary', ['Cor', 'Corollary']);
	shortLong.set('theorem', ['Thm', 'Theorem']);
	shortLong.set('proposition', ['Prop', 'Proposition']);
	shortLong.set('question', ['Q', 'Question']);
	shortLong.set('remark', ['Rmk', 'Remark']);
	shortLong.set('warning', ['Wrn', 'Warning']);
	shortLong.set('proof', ['Pf', 'Proof']);
	
	const resizeObserver = new ResizeObserver ((entries) => {
		// first factor is breakpoint width in em units (?)
		const breakPoint = 30 * parseFloat(getComputedStyle(note).fontSize);
		for (const entry of entries)
			for (const [description, abbreviation] of shortLong)
				for (const tag of document.querySelectorAll(".note > .tag." + description))
					if (entry.contentBoxSize[0].inlineSize < breakPoint) {
						// replace full heading with abbreviation
						for (heading of tag.getElementsByTagName("h3"))
							heading.innerHTML = abbreviation[0];
						// hide attribution in tag
						for (attributee of tag.getElementsByClassName("attribution"))
							attributee.style.display = "none";
						// show attribution in content
						for (attributee of tag.nextElementSibling.getElementsByClassName("attribution"))
							attributee.style.display = "inline";
					} else {
						// replace abbreviation with full heading
						for (heading of tag.getElementsByTagName("h3"))
							heading.innerHTML = abbreviation[1];
						// show attribution in tag
						for (attributee of tag.getElementsByClassName("attribution"))
							attributee.style.display = "block";
						// hide attribution in content
						for (attributee of tag.nextElementSibling.getElementsByClassName("attribution"))
							attributee.style.display = "none";
					}
	});
	
	resizeObserver.observe(note);
}

changeTagNames();
