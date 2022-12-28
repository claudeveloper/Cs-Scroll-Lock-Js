/*
 * cs.scrolllock JS 1.0
 * Date: 2022-12-26
 * Free Source Code
 * Copyright 2022 Clau Senduk.
 * https://clausenduk.my.id
 * 
 */

let html = document.querySelector("html"),
	body = document.querySelector("body"),
	offsetTop,
	scrollTop,
	lockStyle = {
		position : "fixed",
		left : "0",
		width : "100%",
		overflowY : "scroll"
	},
	unlockStyle = {
		position : "",
		top : "",
		left : "",
		width : "",
		overflowY : ""
	};

const scrollLock = () => {
	scrollTop = window.pageYOffset;

	if (body.scrollHeight > html.clientHeight) {
		if (window.pageYOffset) {
			html.style.top = - scrollTop + "px";
		}

		Object.assign(html.style, lockStyle);

		body.classList.add("locked");
	}

	offsetTop = parseInt(html.style.top.replace("-", "").replace("px", ""));

	window.addEventListener("resize", () => {
		if (!body.classList.contains("locked")) {
			return;
		}
		
		let contentHeight = body.scrollHeight,
			top = contentHeight - html.clientHeight,
			range = contentHeight - offsetTop;
			
		if (body.scrollHeight > html.clientHeight) {
			if (offsetTop > 0) {
				if (range > html.clientHeight) {
					html.style.top = - offsetTop + "px";
				} else {
					html.style.top = - top + "px";
				}
			}
			
			Object.assign(html.style, lockStyle);
		} else {			
			Object.assign(html.style, unlockStyle);
		}
	});
}

const scrollUnlock = () => {
	offsetTop = parseInt(html.style.top.replace("-", "").replace("px", ""));

	if (body.classList.contains("locked")) {
		Object.assign(html.style, unlockStyle);

		window.scrollTo(0, offsetTop);

		body.classList.remove("locked");
	}
}