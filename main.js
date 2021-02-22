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

//Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
const navbarMenu = document.querySelector(".navbar__menu");

//Handle scrolling when tapping on the navbar menu
navbarMenu.addEventListener("click", (e) => {
	const target = e.target;
	const link = target.dataset.link;
	if (link == null) {
		return;
	}
	scrollIntoView(link);
	navbarMenu.classList.remove("open");
	selectNavItem(target);
});

navbarToggleBtn.addEventListener("click", () => {
	navbarMenu.classList.toggle("open");
});

const contact = document.querySelector(".home__contact");

contact.addEventListener("click", () => {
	scrollIntoView("#contact");
});

const scrollIntoView = (selectors) => {
	let scrollTo = document.querySelector(selectors);
	scrollTo.scrollIntoView({ behavior: "smooth" });
	selectNavItem(navItems[sectionIds.indexOf(selectors)]);
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
	scrollIntoView("#home");
});

// 무언가를 만들 때 로직을 작성하는 습관을 갖는 것이 제일중요
//1. 모든 섹션 요소들과 그에 해당하는 nav__menu__item들을 가지고 온다
//2. IntersectionObserver를 이용해서 모든섹션들을 관찰한다.
//3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.

const sectionIds = [
	"#home",
	"#about",
	"#skills",
	"#work",
	"#testimonials",
	"#contact",
];

const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map(
	(id) => document.querySelector(`[data-link="${id}"]`), // 해당 dom의 attribute 를 가져오는 방법
);

let selectedNavItem = navItems[0];
let selectedNavIndex = 0;
function selectNavItem(selected) {
	selectedNavItem.classList.remove("active");
	selectedNavItem = selected;
	selectedNavItem.classList.add("active");
}

const observerOptions = {
	root: null,
	rootMargin: "0px",
	threshold: 0.3,
};

const observerCallback = (entries, observer) => {
	entries.forEach((entry) => {
		if (!entry.isIntersecting && entry.intersectionRatio > 0) {
			//빠져 나갈때
			const index = sectionIds.indexOf(`#${entry.target.id}`);
			if (entry.boundingClientRect.y < 0) {
				selectedNavIndex = index + 1;
			} else {
				selectedNavIndex = index - 1;
			}
		}
	});
};
//!testimonial 이 선택되는 이유는 몇몇 섹션들의 callback함수가 실행되는 것을 볼 수 있다.
// ->화면을 띄우자 마자 그 화면을 나가기 때문에 callback함수가 실행됨

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));
//wheel , scroll 의 차이 wheel은 사용자가 직접 스크롤을 해야 발생하는 이벤트
window.addEventListener("wheel", () => {
	if (window.scrollY === 0) {
		selectedNavIndex = 0;
	} else if (
		Math.round(window.scrollY + window.innerHeight) >=
		document.body.clientHeight
	) {
		selectedNavIndex = navItems.length - 1;
	}
	selectNavItem(navItems[selectedNavIndex]);
});
