var heroList, prevList, nextList;
var screenHeigth = window.screen.height;

var startLogo = document.getElementById('startLogo');
var startHint = document.getElementById('startHint');
var container = document.getElementById('container');
var heroListHTML = document.getElementById('heroList');
var heroItems = document.getElementsByClassName('heroItem');
var addHero = '<div class="heroItem"></div>';
var heroInfo = document.getElementById('heroInfo');
var heroName = document.getElementById('heroName');
var heroBirthOfYear = document.getElementById('heroBirthOfYear');
var heroGender = document.getElementById('heroGender');
var filmlist = document.getElementById('filmlist');
var filmsArray = [];
var filmsListArray = [];
var planet = document.getElementById('planet');
var species = document.getElementById('species');

var backBtn = document.getElementById('backBtn');
var prevBtn = document.getElementById('prevBtn');
var nextBtn = document.getElementById('nextBtn');

var url = 'https://swapi.dev/api/people/';
var urlFilmList;
var urlPlanet;
var urlSpacies;
var init = {
  method: 'GET'
};

startLogo.addEventListener('click', getPage);
backBtn.addEventListener('click', backToList);
prevBtn.addEventListener('click', getPrevList);
nextBtn.addEventListener('click', getNextList);

function getPage() {
  setInterval(animation, 3);
  container.style.display = 'flex';
  startHint.style.display = 'none';
}

function animation() {
  screenHeigth -= 4;
  startLogo.style.height = screenHeigth + 'px';
}

function backToList() {
  container.style.display = 'flex';
  heroListHTML.style.display = 'flex';
  backBtn.style.visibility = 'hidden';
  heroInfo.style.display = 'none';
  filmsListArray = [];
  buttonCheck()
};

function getPrevList() {
  url = prevList;
  getHeroes();
};

function getNextList() {
  url = nextList;
  getHeroes();
};

function getHeroes() {
  fetch(url, init).then(function (resp) {
  return resp.json();
      }).then(function (data) {
          heroList = data.results;
          prevList = data.previous;
          nextList = data.next;
          buttonCheck();
          for (var i=0; i<10; i++) {
            if(heroList[i]) {
              heroItems[i].innerHTML = heroList[i].name;
              heroItems[i].style.visibility = 'visible';
            } else {
              heroItems[i].style.visibility = 'hidden';
            }
              };
                }).catch(function (err) {
                  console.log(err)
                    });
};

function getFilmlist() {
  filmsArray.forEach(element => {
    urlFilmList = element;
    fetch(urlFilmList, init).then(function (resp) {
      return resp.json();
          }).then(function (data) {
              filmsListArray.push('<li>' + data.title + '</li>')
              filmlist.innerHTML = '<ul>' + filmsListArray.join(' ') + '</ul>';
            }).catch(function (err) {
                      console.log(err)
                        });
  });
};

function getPlanet() {
  if(urlPlanet) {
    fetch(urlPlanet, init).then(function (resp) {
      return resp.json();
          }).then(function (data) {
              planet.innerHTML = data.name;
                    }).catch(function (err) {
                      console.log(err)
                        });
  } else {
    planet.innerHTML = 'n/a';
  };
};

function getSpecies() {
  if(urlSpacies) {
    fetch(urlSpacies, init).then(function (resp) {
      return resp.json();
          }).then(function (data) {
            species.innerHTML = data.name;
                    }).catch(function (err) {
                      console.log(err)
                        });
  } else {
    species.innerHTML = 'n/a';
  };
};

function getHeroInfo() {
  container.style.display = 'block';
  heroListHTML.style.display = 'none';
  backBtn.style.visibility = 'visible';
  heroInfo.style.display = 'block';
  prevBtn.style.visibility = 'hidden';
  nextBtn.style.visibility = 'hidden';
}

getHeroes();

function buttonCheck() {
  prevList ? prevBtn.style.visibility = 'visible' : prevBtn.style.visibility = 'hidden';
  nextList ? nextBtn.style.visibility = 'visible': nextBtn.style.visibility = 'hidden';
};

heroListHTML.addEventListener('click', function(e) {
  var heroItem = e.target.innerHTML;

  for (var i=0; i<heroList.length; i++) {
    if(heroList[i].name === heroItem) {
      heroName.innerHTML = heroList[i].name;
      heroBirthOfYear.innerHTML = heroList[i].birth_year;
      heroGender.innerHTML = heroList[i].gender;
      filmsArray = heroList[i].films;
      urlPlanet = heroList[i].homeworld;
      urlSpacies = heroList[i].species[0];
      container.style.display = 'block';
      getFilmlist();
      getPlanet();
      getSpecies();
      getHeroInfo();
    }
  };
});