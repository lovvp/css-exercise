"use strict";

const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

//Make navbar transparent when it is on the top
document.addEventListener("scroll", () => {
	if (window.scrollY > navbarHeight) {
		navbar.classList.add("navbar--dark");
		// if (window.scrollY < 0.5 * homeHeight) {
		// 	home.classList.add("home--opacity--50");
		// 	home.classList.remove("home--opacity--0");
		// } else {
		// 	home.classList.add("home--opacity--0");
		// 	home.classList.remove("home--opacity--50");
		// }
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

const home = document.querySelector("#home");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {});

document.addEventListener("scroll", () => {
	const home = document.querySelector(".home__container");

	home.style.opacity = 1 - window.scrollY / homeHeight;
});

const arrowUp = document.querySelector(".arrow-up");

//Show "arrow up" button when scrolling down
document.addEventListener("scroll", () => {
	if (window.scrollY > homeHeight / 2) {
		arrowUp.classList.add("visible");
	} else {
		arrowUp.classList.remove("visible");
	}
});

//projects
const workBtnContainer = document.querySelector(".work__cartegories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project"); //배열 형태로 받아짐

workBtnContainer.addEventListener("click", (e) => {
	const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
	if (filter == null) {
		return;
	}
	//Remove selection from the previous item and select the
	const active = document.querySelector(".category__btn.selected");
	active.classList.remove("selected");
	const target =
		e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
	target.classList.add("selected");
	projectContainer.classList.add("anim-out");
	setTimeout(() => {
		projects.forEach((project) => {
			console.log(project.dataset.type);
			if (filter === "*" || filter === project.dataset.type) {
				project.classList.remove("invisible");
			} else {
				project.classList.add("invisible");
			}
		});
		projectContainer.classList.remove("anim-out");
	}, 300);
});

arrowUp.addEventListener("click", () => {
	const home = document.querySelector("#home");
	home.scrollIntoView({ behavior: "smooth" });
});
