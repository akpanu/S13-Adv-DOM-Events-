console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const allSections = document.querySelectorAll(`.section`);
console.log(allSections);

//displaying some features
console.log(message.style.backgroundColor);
console.log(message.style.width);
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).justifyItems);
console.log(getComputedStyle(message).fontSize);
console.log(getComputedStyle(message).height);
console.log(getComputedStyle(message).display);

// Bankist nav logo attributes
const logo = document.querySelector(`.nav__logo`);
console.log(logo.src);
console.log(logo.getAttribute(`src`));
console.log(logo.alt);
console.log(logo.id);
console.log(logo.className);
console.log(logo.getAttribute(`designer`));
logo.setAttribute(`developer`, `Uwem Akpan`);
logo.alt = `Bankist minimalist Website`;

// twitter link
const link = document.querySelector(`.twitter-link`);
console.log(link.href);
console.log(link.getAttribute(`href`));

//Data attributes
console.log(logo.dataset.versionNumber);

//  RGB components
// rgb(234, 34, 33);
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// console.log(randomColor());

// DOM traversing
// Going downwards -- selecting child / children
const hiElement = document.querySelector(`h1`);
console.log(hiElement.querySelectorAll(`.highlight`));
console.log(hiElement.childNodes);
console.log(hiElement.children);
hiElement.firstElementChild.style.color = `maroon`;
hiElement.lastElementChild.style.color = `orangered`;

// Going upwards -- selecting parent elements / nodes
console.log(hiElement.parentNode);
console.log(hiElement.parentElement);
// set color of direct h1 parent using the closest method
hiElement.closest(`.header`).style.background = `var( --gradient-secondary)`;

// Going sideways
console.log(`Going sideways`);
console.log(hiElement.previousElementSibling);
console.log(hiElement.nextElementSibling);

console.log(hiElement.previousSibling);
console.log(hiElement.nextSibling);

console.log(hiElement.parentElement.children);
[...hiElement.parentElement.children].forEach(function (element) {
  if (element !== hiElement) {
    element.style.transform = `scale(0.5)`;
  }
});
