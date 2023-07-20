'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector(`.header`);
const btnScrollto = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);
const h1El = document.querySelector(`h1`);
const tabs = document.querySelectorAll(`.operations__tab`);
const tabsContainer = document.querySelector(`.operations__tab-container`);
const tabsContent = document.querySelectorAll(`.operations__content`);
const nav = document.querySelector(`.nav`);
const slides = document.querySelectorAll(`.slide`);
const btnLeft = document.querySelector(`.slider__btn--left`);
const btnRight = document.querySelector(`.slider__btn--right`);
const dotsContainer = document.querySelector(`.dots`);
const slider = document.querySelector(`.slider`);
const loadedImgs = document.querySelectorAll(`img[data-src]`);

// functions
const openModal = function (e) {
  e.preventDefault(); // prevents default button behaviors
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const h1alert = e => {
  alert(`Mouse entered the h1 element :D`);
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Creating and inserting elements
const message = document.createElement(`div`);
message.classList.add(`cookie-message`);
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;
header.prepend(message);
// header.append(message.cloneNode(true)); // so that the node can appear at several locations on the web page

// header.before(message);
// header.after(message.cloneNode(true));

// styling the message element which was created in the DOM programmatically
message.style.backgroundColor = '#37383d';
message.style.width = `120%`;

// increasing the font-size of the cookie message using CSS
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + `px`;

// changing and setting the color primary in the root of the CSS
// document.documentElement.style.setProperty('--color-primary', 'orangered');
// Deleting elements
document
  .querySelector(`.btn--close-cookie`)
  .addEventListener(`click`, () => message.remove());

// Implementing smooth scrolling
btnScrollto.addEventListener(`click`, e => {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // old school way of scrolling to section
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: `smooth`,
  // });

  // new school way of scrolling to section
  section1.scrollIntoView({ behavior: 'smooth' });
});

// h1 eventListener
h1El.addEventListener('mouseenter', h1alert);
setTimeout(() => h1El.removeEventListener(`mouseenter`, h1alert), 3000);

// random number generator for random colors of nav elements
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor());

document.querySelector(`.nav__link`).addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});
document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
  this.style.backgroundColor = randomColor();
});
document.querySelector(`.nav`).addEventListener(`click`, function (e) {
  this.style.backgroundColor = randomColor();
});

// Implementing smooth scrolling..Event delegation..page navigation
// inefficient technique
// document.querySelectorAll(`.nav__link`).forEach(function (el) {
//   el.addEventListener(`click`, function (e) {
//     e.preventDefault();
//     const id = this.getAttribute(`href`);
//     document.querySelector(id).scrollIntoView({ behavior: `smooth` });
//   });
// });

// using an efficient technique: Event delegation
document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
  e.preventDefault();

  // matching strategy
  if (e.target.classList.contains(`nav__link`)) {
    const id = e.target.getAttribute(`href`);
    document.querySelector(id).scrollIntoView({ behavior: `smooth` });
  }
});

// implementing the tabbed component
tabsContainer.addEventListener(`click`, function (e) {
  const clicked = e.target.closest(`.operations__tab`);
  console.log(clicked);

  // Guard class
  if (!clicked) return;

  // Remove active tabs and contents
  tabs.forEach(tab => tab.classList.remove(`operations__tab--active`));
  tabsContent.forEach(content =>
    content.classList.remove(`operations__content--active`)
  );

  console.log(clicked.dataset.tab);
  // Activate tab
  clicked.classList.add(`operations__tab--active`);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(`operations__content--active`);
});

// Passing arguments to event handlers - Menu fade animation
// nav.addEventListener(`mouseover`, function (e) {
//   // matching strategy
//   if (e.target.classList.contains(`nav__link`)) {
//     const link = e.target;
//     const siblings = link.closest(`.nav`).querySelectorAll(`.nav__link`);
//     const logo = link.closest(`.nav`).querySelector(`img`);

//     siblings.forEach(sibling_link => {
//       if (link !== sibling_link) sibling_link.style.opacity = '0.5';
//     });
//     logo.style.opacity = `0.5`;
//   }
// });

// undoing the mouseover event using mouseout
// nav.addEventListener(`mouseout`, function (e) {
//   // matching strategy
//   if (e.target.classList.contains(`nav__link`)) {
//     const link = e.target;
//     const siblings = link.closest(`.nav`).querySelectorAll(`.nav__link`);
//     const logo = link.closest(`.nav`).querySelector(`img`);

//     siblings.forEach(sibling_link => {
//       if (link !== sibling_link) sibling_link.style.opacity = '1';
//     });
//     logo.style.opacity = `1`;
//   }
// });

// Menu fade animation - refactoring our code
const handleHover = function (e) {
  // matching strategy
  if (e.target.classList.contains(`nav__link`)) {
    const link = e.target;
    const siblings = link.closest(`.nav`).querySelectorAll(`.nav__link`);
    const logo = link.closest(`.nav`).querySelector(`img`);
    siblings.forEach(sibling_link => {
      if (link !== sibling_link) sibling_link.style.opacity = this;
    });
    logo.style.opacity = this;
    console.log(e.currentTarget);
  }
};

// Passing "arguments" to an event handler function
nav.addEventListener(`mouseover`, handleHover.bind(0.5));
nav.addEventListener(`mouseout`, handleHover.bind(1));

// implementing sticky navigation
// const section1_initialCoord = section1.getBoundingClientRect();
// window.addEventListener(`scroll`, function () {
//   console.log(window.scrollY, section1_initialCoord.top);
//   if (window.scrollY > section1_initialCoord.top) {
//     nav.classList.add(`sticky`);
//   } else {
//     nav.classList.remove(`sticky`);
//   }
// });

// Implementing the intersection API to make page navigation
// more better on various screens' pages
const navHeight = nav.getBoundingClientRect().height;

const stickynav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add(`sticky`);
  else nav.classList.remove(`sticky`);
};
const observerOptions = function () {
  root: null;
  threshold: 0;
  rootMargin: `-${navHeight}px`;
};
// API to handling observing target elements
const headerObserver = new IntersectionObserver(stickynav, observerOptions);
headerObserver.observe(header);

// Revealing sections
// obtain all sections and hide them

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove(`section--hidden`);
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
const allSections = document.querySelectorAll(`.section`);
allSections.forEach(function (sect) {
  sectionObserver.observe(sect);
  sect.classList.add(`section--hidden`);
});

/*
Cost accounting deals with the collection, accumulation,
classification, coding, analysis and processing of financial 
and non-finanacial info for use by management for making informed
decision and judgement
*/

// Loading lazy images
// obtain all the original images Note: declared at the top
// const loadedImgs = document.querySelectorAll(`img[data-src]`);

// loadImg call back function for the intersectionObserver
const loadImg = function (entries, observer) {
  const [entry] = entries; // obtain first element from entries

  // ignore if target is not intersecting the top of the browser window
  if (!entry.isIntersecting) return;

  // replace src with data-src after intersection
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener(`load`, function () {
    // remove blurred img after successfully loading original img
    entry.target.classList.remove(`lazy-img`);
  });
  observer.unobserve(entry.target);
};

// create an intersection observer
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
// call the observer for each loaded images via a loop
loadedImgs.forEach(img => {
  imgObserver.observe(img);
});

// Slider implementation
// get the individual slides as an array
// and obtain the left and right buttons

// get the current slide and max slide length
let currentSlide = 0;
let maxSlide = slides.length;

// obtain the slider parent container and change its styles
// const slider = document.querySelector(`.slider`);
// slider.style.transform = `scale(0.6)  translateX(-700px)`;
// slider.style.overflow = `visible`;

// slide movement to position based on slide index
const gotoSlide = function (slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

// go to data slide 0 on page load
// gotoSlide(0);
// activateDot(0);

// next slide
const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  gotoSlide(currentSlide);
  activateDot(currentSlide);
};
// Previous slide
const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  gotoSlide(currentSlide);
  activateDot(currentSlide);
};

btnRight.addEventListener(`click`, nextSlide);
btnLeft.addEventListener(`click`, prevSlide);

// sliding using left and right keyboard arrow keys
document.addEventListener(`keydown`, function (e) {
  if (e.key === `ArrowLeft`) {
    prevSlide();
  } // for the left key
  e.key === `ArrowRight` && nextSlide(); // for the right key using short circuiting
  // any style above can be used
});

// creating dots for simulating navigation like
// the left and arrow buttons on web page and keyboard
const createDots = function () {
  slides.forEach((_, ix) => {
    dotsContainer.insertAdjacentHTML(
      `beforeend`,
      `<button class='dots__dot' data-slide = '${ix}'></button>`
    );
  });
};
// insert dots at the end of the slide section
// createDots();

dotsContainer.addEventListener(`click`, function (e) {
  if (e.target.classList.contains(`dots__dot`)) {
    const { slide } = e.target.dataset;
    gotoSlide(slide);
    activateDot(slide);
  }
});

const activateDot = function (slide) {
  document.querySelectorAll(`.dots__dot`).forEach(dot => {
    dot.classList.remove(`dots__dot--active`);
  });

  document
    .querySelector(`.dots__dot[data-slide='${slide}']`)
    .classList.add(`dots__dot--active`);
};
// activateDot(0);

// initialize dots and slide at page first load
const initializeDots = function () {
  gotoSlide(0);
  createDots();
  activateDot(0);
};
initializeDots();
