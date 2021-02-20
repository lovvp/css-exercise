"use strict";

const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

//Make navbar transparent when it is on the top
document.addEventListener("scroll", () => {
	if (window.scrollY > navbarHeight) {
		navbar.classList.add("navbar--dark");
	} else {
		navbar.classList.remove("navbar--dark");
	}
});

//Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (e) => {
	const target = e.target;
	const link = target.dataset.link;
	if (link == null) {
		return;
	}
	scrollIntoView(link);
});

const contact = document.querySelector(".home__contact");

contact.addEventListener("click", () => {
	scrollIntoView("#contact");
});

const scrollIntoView = (selectors) => {
	let scrollTo = document.querySelector(selectors);
	scrollTo.scrollIntoView({ behavior: "smooth" });
};
