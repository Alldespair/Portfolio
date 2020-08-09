var bodyElement = document.getElementById('body');
var quoteP = document.getElementById('quote');
var citeQ = document.getElementById('cite');
var showButton = document.getElementById('showQuotes');
var lastIndexArr = new Array(3);
var randomIndex;

var quotesArr = [
  {title: '“There can be no deep disappointment where there is not deep love.”', cite: 'Martin Luther King, Jr.', image: 'url("image/love.jpg")'},
  {title: '“True friends stab you in the front.”', cite: 'Oscar Wilde', image: 'url("image/friends.jpg")'},
  {title: '“Never say never because limits, like fears, are often just an illusion”', cite: 'Michael Jordan', image: 'url("image/sport.jpg")'},
  {title: '“Education is the most powerful weapon which you can use to change the world.”', cite: 'Nelson Mandela', image: 'url("image/education.jpg")'},
  {title: '“Good friends, good books and a sleepy conscience: this is the ideal life.”', cite: 'Mark Twain', image: 'url("image/life.jpg")'},
  {title: '“The starting point of all achievement is desire.', cite: 'Napoleon Hill”', image: 'url("image/success.jpg")'},
  {title: '“Other things may change us, but we start and end with the family.”', cite: 'Anthony Brandt', image: 'url("image/family.jpg")'},
  {title: '“A man is not old until regrets take the place of dreams.”', cite: 'John Barrymore', image: 'url("image/dream.jpg")'},
  {title: '“A man travels the world over in search of what he needs and returns home to find it.”', cite: 'George A. Moore', image: 'url("image/home.jpg")'},
  {title: '“There is no greater sorrow than to recall in misery the time when we were happy.”', cite: 'Dante Alighieri', image: 'url("image/sadness.jpg")'}
];

function getRandomIndex() {
  randomIndex = Math.floor(Math.random() * (10 - 0)) + 0;
  
  if(randomIndex === lastIndexArr[0]) {
    getRandomIndex();
  } else if(randomIndex === lastIndexArr[1]) {
    getRandomIndex();
  } else if(randomIndex === lastIndexArr[2]) {
    getRandomIndex();
  } else {
    return randomIndex;
  }
};

function showRandomQuote() {
  getRandomIndex();
  bodyElement.style.backgroundImage = quotesArr[randomIndex].image;
  quoteP.innerHTML = quotesArr[randomIndex].title;
  citeQ.innerHTML = quotesArr[randomIndex].cite;
  lastIndexArr.unshift(randomIndex);
  lastIndexArr.pop();
};

showButton.addEventListener('click', showRandomQuote);

showRandomQuote();