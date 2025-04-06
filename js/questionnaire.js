// Preloader

const preloader = document.getElementById('preloader');
const qSection = document.querySelector('.q-section');

function init1() {
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.display = 'none';

        qSection.style.display = 'block';
        setTimeout(() => (qSection.style.opacity = 1), 200);
    }, 4000);
}

init1();

// Creating Links

const API_KEY = 'api_key=d9172e41bf93ea77fb5869bf1679a83a';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const PERSON_URL = BASE_URL + '/search/person?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;
const searchActorID = BASE_URL + '/search/person?' + API_KEY;

// ID of Genres

const genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]

// Selected Genre

const main = document.getElementById('main');
const genreList = document.getElementById('genreList');
const genreItem = document.getElementsByClassName('genre-item');

let selectedGenre = [];
setGenre();
function setGenre() {
    genreList.innerHTML = '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('genre-item');
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if (selectedGenre.length == 0) {
                selectedGenre.push(genre.id);
            } else {
                if (selectedGenre.includes(genre.id)) {
                    selectedGenre.forEach((id, idx) => {
                        if (id == genre.id) {
                            selectedGenre.splice(idx, 1);
                        }
                    })
                } else {
                    selectedGenre.push(genre.id);
                }
            }
        })
        genreList.append(t);
    })
}

// Show Submit Btn

const submitBtn = document.getElementById('submitBtn');

submitBtn.setAttribute('disabled', 'disabled')

for (let i = 0; i < genreItem.length; i++) {
    genreItem[i].addEventListener('click', showBtn);
}

function showBtn() {
    this.classList.toggle('active');
    for (let i = 0; i < genreItem.length; i++) {
        if (genreItem[i].classList.contains('active')) {
            submitBtn.removeAttribute('disabled', 'disabled');
            submitBtn.style.opacity = "1";
            submitBtn.style.cursor = "pointer";
            return;
        } else {
            submitBtn.setAttribute('disabled', 'disabled');
            submitBtn.style.opacity = "0";
            submitBtn.style.cursor = "default";
        }
    }
}

// Actor Form

const actorForm = document.querySelector('.actor-form');
const actorInput = document.querySelector('.actor-input');
const actorLabel = document.querySelector('.actor-label');
const actorList = document.querySelector('.actor-list');

const skipCboxInput = document.querySelector('.skip-checkbox-input');
const skipCboxLabel = document.querySelector('.skip-checkbox-label');

actorInput.addEventListener('input', function (e) {
    let val = e.target.value.trim();
    if (val.length) {
        skipCboxInput.setAttribute('disabled', 'disabled');
        skipCboxLabel.style.cursor = "default";
        actorList.classList.add("actor-list__visible");
        submitBtn.removeAttribute('disabled', 'disabled');
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
        submitBtn.style.marginTop = "0";
        submitBtn.style.position = "absolute";
        submitBtn.style.top = "65%";

        let actorsNames = [];

        let actorsNamesUrl = PERSON_URL + '&query=' + val;

        getActors(PERSON_URL);

        function getActors(url) {

            fetch(actorsNamesUrl).then(res => res.json()).then(data => {

                actorList.scrollTop = 0;
                actorList.innerHTML = '';

                for (let i = 0; i < data.results.length; i++) {

                    if (i == 0) {
                        actorsNames.length = 0;
                    }

                    if (data.results[i].known_for_department === "Acting" 
                        && data.results[i].name.substring(0, val.length).toLowerCase() === val.toLowerCase()
                        && data.results[i].popularity > 0.1) {

                            actorsNames.push(data.results[i].name);

                    }

                    if (i == data.results.length - 1) {

                        for (let i = 0; i < actorsNames.length; i++) {

                            const actorItem = document.createElement("li");
                            actorItem.textContent = actorsNames[i];
                            actorList.appendChild(actorItem);

                            actorItem.addEventListener("click", () => {

                                actorInput.value = actorItem.textContent;
                                actorList.classList.remove("actor-list__visible");

                            });
                            
                        }

                    }

                }

            });
    
        }

        

    } else {
        skipCboxInput.removeAttribute('disabled', 'disabled');
        skipCboxLabel.style.cursor = "pointer";
        actorList.classList.remove("actor-list__visible");
        submitBtn.setAttribute('disabled', 'disabled');
        submitBtn.style.opacity = "0";
    }
});


// Skip Checkbox

skipCboxInput.addEventListener('click', (event) => {
    event.target.classList.toggle('active');

    if (skipCboxInput.classList.contains('active')) {
        actorInput.setAttribute('disabled', 'disabled');
        actorLabel.style.cursor = "default";
        submitBtn.removeAttribute('disabled', 'disabled');
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
        submitBtn.style.marginTop = "0";
        submitBtn.style.position = "absolute";
        submitBtn.style.top = "65%";
    } else {
        actorInput.removeAttribute('disabled', 'disabled');
        actorLabel.style.cursor = "text";
        submitBtn.setAttribute('disabled', 'disabled');
        submitBtn.style.opacity = "0";
    }
});


// Decades List

const decadesWrap = document.querySelector('.decades-wrap');
const decadesList = document.querySelector('.decades-list');
const decadesInput = document.querySelectorAll('decades-input');

const decadesSkipCbox = document.getElementById('decadesSkipCbox');
const decadesSkipCboxInput = document.getElementById('decadesSkipCboxInput');
const decadesSkipCboxSpan = document.getElementById('decadesSkipCboxSpan');

decadesList.addEventListener('click', function (e) {

    let checked = decadesList.querySelectorAll('input[type="checkbox"]:checked');

    if (checked.length > 0) {
        decadesSkipCbox.classList.add('disabled');
        submitBtn.removeAttribute('disabled', 'disabled');
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
        submitBtn.style.top = "75%";
    } else {
        decadesSkipCbox.classList.remove('disabled');
        submitBtn.setAttribute('disabled', 'disabled');
        submitBtn.style.opacity = "0";
    }
});


decadesSkipCbox.addEventListener('click', function (e) {
    if (decadesSkipCboxInput.checked) {
        decadesList.classList.add('disabled');
        submitBtn.removeAttribute('disabled', 'disabled');
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
        submitBtn.style.top = "75%";
        qResult.time = null;
    } else {
        decadesList.classList.remove('disabled');
        submitBtn.setAttribute('disabled', 'disabled');
        submitBtn.style.opacity = "0";
        qResult.time = [];
    }
});

// Assigning checked decades to result time

decadesList.addEventListener('change', function (e) {
    if (e.target.tagName === 'INPUT') {
        let checked = decadesList.querySelectorAll('input[type="checkbox"]:checked');
        if (checked.length > 0) {
            let years = [];
            checked.forEach(function (e, $i) {
                let val = Number(e.value);
                years.push(GetYearsDecade(val));
            });
            qResult.time = [years];
        } else {
            qResult.time = null;
        }
    }
});

function GetYearsDecade(year) {
    let years = [];
    for (let i = year; i < year + 10; i++) {
        years.push(i);
    }
    return years
}

// Country Form

const countryWrap = document.querySelector('.country-wrap');
const countrySelect = document.querySelectorAll('.country-select');
const countryList = document.querySelector('.country-list');
const countryItem = document.querySelectorAll('.country-item');

const countryBtn = document.querySelector('.country-btn');
const countryInputHidden = document.querySelector('.country-input__hidden');

const finalSubmitBtn = document.getElementById('finalSubmitBtn');

countrySelect.forEach(function () {

    countryBtn.addEventListener('click', function (e) {
        countryList.classList.toggle('country-list__visible');
        countryWrap.classList.toggle('active');
        this.classList.add('country-btn__active');
    });

    countryItem.forEach(function (listItem) {
        listItem.addEventListener('click', function (e) {
            e.stopPropagation();
            countryBtn.innerText = this.innerText;
            countryBtn.focus();
            countryInputHidden.value = this.dataset.value;
            countryList.classList.remove('country-list__visible');
            countryWrap.classList.remove('active');
        });
    });

    document.addEventListener('click', function (e) {
        if (e.target !== countryBtn) {
            countryBtn.classList.remove('country-btn__active');
            countryList.classList.remove('country-list__visible');
            countryWrap.classList.remove('active');
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' || e.key === 'Escape') {
            countryBtn.classList.remove('country-btn__active');
            countryList.classList.remove('country-list__visible');
            countryWrap.classList.remove('active');
        }
    });

});

// Final Submit Btn

for (let i = 0; i < countryItem.length; i++) {
    countryItem[i].addEventListener('click', showFinalBtn);
}

function showFinalBtn() {
    this.classList.toggle('active');
    for (let i = 0; i < countryItem.length; i++) {
        if (countryItem[i].classList.contains('active')) {
            finalSubmitBtn.style.transform = "translate(-50%, 250%)";
            finalSubmitBtn.style.opacity = "1";
            finalSubmitBtn.style.pointerEvents = "visible";
            return;
        }
    }
}

finalSubmitBtn.addEventListener('click', function () {

    let userCountry = countryBtn.textContent.toLowerCase();

    if (userCountry !== 'united states' && userCountry !== 'spain' && userCountry !== 'germany' && userCountry !== 'china' && userCountry !== 'india' && userCountry !== 'israel') {
        qResult.country = userCountry.substring(0, 2);
    } else if (userCountry == 'united states') {
        qResult.country = 'en';
    } else if (userCountry == 'spain') {
        qResult.country = 'es';
    } else if (userCountry == 'germany') {
        qResult.country = 'de';
    } else if (userCountry == 'china') {
        qResult.country = 'cn';
    } else if (userLang == 'india') {
        qResult.country = 'hi';
    } else if (userLang == 'israel') {
        qResult.country = 'he';
    }

    const movieListTitle = document.querySelector('.movie-list-title');

    movieListTitle.style.opacity = '1';
    movieListTitle.style.cursor = 'text';

    const returnBtn = document.getElementById('returnBtn');

    returnBtn.classList.add('return-btn__visible');

    const pagination = document.querySelector('.pagination');
    const prev = document.getElementById('prev');
    const current = document.getElementById('current');
    const next = document.getElementById('next');

    let currentPage = 1;
    let nextPage = 2;
    let prevPage = 3;
    let totalPages = 100;

    let finalUrl;

    if (!qResult.actorID) {

        finalUrl = API_URL + '&with_genres=' + qResult.genre + '&primary_release_year=' + 
        qResult.time + '&with_original_language=' + qResult.country;

    } else {

        finalUrl = API_URL + '&with_genres=' + qResult.genre + '&with_cast=' + qResult.actorID + '&primary_release_year=' +
        qResult.time + '&with_original_language=' + qResult.country;

    }

    getMovies(API_URL);

    function getMovies(url) {

        fetch(finalUrl).then(res => res.json()).then(data => {
            if (data.results.length !== 0) {
                showMovies(data.results);
                document.body.scrollTop = document.documentElement.scrollTop = 0;

                currentPage = data.page;
                nextPage = currentPage + 1;
                prevPage = currentPage - 1;
                totalPages = data.total_pages;

                current.innerText = currentPage;

                if (currentPage === 1 && totalPages !== currentPage) {
                    prev.setAttribute('disabled', 'disabled');
                    next.removeAttribute('disabled', 'disabled');
                } else if (currentPage !== 1 && totalPages === currentPage) {
                    next.setAttribute('disabled', 'disabled');
                    prev.removeAttribute('disabled', 'disabled');
                } else if (currentPage === 1 && totalPages === currentPage) {
                    prev.setAttribute('disabled', 'disabled');
                    next.setAttribute('disabled', 'disabled');
                } else {
                    prev.removeAttribute('disabled', 'disabled');
                    next.removeAttribute('disabled', 'disabled');
                }

            } else {
                main.innerHTML = `
                    <div class="no-results">
                        <p class="no-results__top">No results were found.</p>
                        <p class="no-results__middle">Sometimes it happens.</p>
                        <a class="no-results__bottom" href="#" onClick="window.location.reload();">Let's try again =)</a>
                    </div>
                `

                const noResultsPage = document.querySelector('.no-results');

                noResultsPage.style.opacity = '1';
                movieListTitle.style.display = 'none';
                pagination.style.display = 'none';
            }
        });

    }

    function showMovies(data) {
        main.innerHTML = '';

        data.forEach(movie => {
            const { title, poster_path, overview } = movie;
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie-card-wrap');
            movieEl.innerHTML = `
                <div class="movie-card">
                    <div class="movie-card__front" style="background-image: url('${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580"}');"></div>

                    <div class="movie-card__back">
                        <h3 class="movie-title" style="line-height: 25px">${title}</h3>
                        <div class="movie-subline"></div>
                        <p class="movie-overview" style="line-height: 20px">${overview}</p>
                    </div>
                </div>
        `

            main.appendChild(movieEl);

            // Parallax Effect

            const movieCardWrap = document.querySelectorAll(".movie-card-wrap");

            movieCardWrap.forEach(element => {
                let state = {
                    mouseX: 0,
                    mouseY: 0,
                    height: element.clientHeight,
                    width: element.clientWidth
                };

                element.addEventListener("mousemove", ele => {
                    const movieCard = element.querySelector(".movie-card");
                    const movieCardFront = movieCard.querySelector(".movie-card__front");
                    state.mouseX = ele.pageX - element.offsetLeft - state.width / 2;
                    state.mouseY = ele.pageY - element.offsetTop - state.height / 2;

                    const angleX = (state.mouseX / state.width) * 30;
                    const angleY = (state.mouseY / state.height) * -30;
                    movieCard.style.transform = `rotateY(${angleX}deg) rotateX(${angleY}deg)`;

                    const posX = (state.mouseX / state.width) * -40;
                    const posY = (state.mouseY / state.height) * -40;
                    movieCardFront.style.transform = `translateX(${posX}px) translateY(${posY}px)`;
                });

                element.addEventListener("mouseout", () => {
                    const movieCard = element.querySelector(".movie-card");
                    const movieCardFront = movieCard.querySelector(".movie-card__front");
                    movieCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
                    movieCardFront.style.transform = `translateX(0px) translateY(0px)`;
                });
            });

        });
    }

    function init2() {
        preloader.style.opacity = '1';
        preloader.style.display = 'block';
        countryWrap.style.display = 'none';
        qSection.style.display = 'none';
        document.body.style.overflowY = 'hidden';

        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.display = 'none';

            document.body.style.overflowY = 'auto';
            main.style.opacity = '1';
            pagination.style.opacity = '1';

            prev.style.cursor = 'pointer';
            current.style.cursor = 'text';
            next.style.cursor = 'pointer';

            // Openning Overview

            const movieCardWrap = document.querySelectorAll(".movie-card-wrap");
            const movieCardBack = document.querySelectorAll('.movie-card__back');

            const movieTitle = document.querySelectorAll('.movie-title');
            const movieSubline = document.querySelectorAll('.movie-subline');
            const movieOverview = document.querySelectorAll('.movie-overview');

            for (let i = 0; i < movieCardWrap.length; i++) {
                movieCardWrap[i].addEventListener('click', openOverview);
            }

            function openOverview() {
                this.classList.toggle('active');
                for (let i = 0; i < movieCardWrap.length; i++) {
                    if (movieCardWrap[i].classList.contains('active')) {
                        movieCardBack[i].style.transform = "translateY(0)";

                        // Lines Counter

                        const titleTextHeight = +movieTitle[i].offsetHeight;
                        const titleLineHeight = +movieTitle[i].style.lineHeight.replace('px', '');
                        const titleLines = titleTextHeight / titleLineHeight;

                        const overviewTextHeight = +movieOverview[i].offsetHeight;
                        const overviewLineHeight = +movieOverview[i].style.lineHeight.replace('px', '');
                        const overviewLines = overviewTextHeight / overviewLineHeight;

                        if (titleLines === 1 && overviewLines > 15) {

                            if (matchMedia) {
                                let screen = window.matchMedia('(max-width: 500px)');
                                screen.addListener(changes);
                                changes(screen);
                            }

                            function changes(screen) {
                                if (screen.matches) {
                                    movieTitle[i].style.top = "3%";
                                    movieTitle[i].style.fontSize = "22px";
                                    movieSubline[i].style.top = "11%";
                                    movieSubline[i].style.width = "75%";
                                    movieOverview[i].style.fontSize = "15px";
                                    movieOverview[i].style.top = "56%";
                                } else {
                                    movieTitle[i].style.top = "3%";
                                    movieTitle[i].style.fontSize = "22px";
                                    movieSubline[i].style.top = "11%";
                                    movieSubline[i].style.width = "75%";
                                    movieOverview[i].style.top = "53%";
                                    movieOverview[i].style.fontSize = "17px";
                                }
                            }
                        }
                        else if (titleLines === 2) {

                            if (matchMedia) {
                                let screen = window.matchMedia('(max-width: 500px)');
                                screen.addListener(changes);
                                changes(screen);
                            }

                            function changes(screen) {
                                if (screen.matches) {
                                    movieSubline[i].style.top = "20%";
                                    movieOverview[i].style.top = "53%";
                                } else {
                                    movieSubline[i].style.top = "18%";
                                }
                            }
                        }
                        else if (titleLines === 3) {

                            if (matchMedia) {
                                let screen = window.matchMedia('(max-width: 500px)');
                                screen.addListener(changes);
                                changes(screen);
                            }

                            function changes(screen) {
                                if (screen.matches) {
                                    movieTitle[i].style.top = "3%";
                                    movieSubline[i].style.top = "23%";
                                    movieOverview[i].style.top = "56%";
                                } else {
                                    movieTitle[i].style.top = "3%";
                                    movieTitle[i].style.fontSize = "22px";
                                    movieSubline[i].style.top = "21%";
                                    movieOverview[i].style.top = "56%";
                                }
                            }
                        }

                    } else {
                        movieCardBack[i].style.transform = "translateY(100%)";
                    }
                }
            }

        }, 2500);
    }

    init2();

    function pageCall(page) {
        let splitUrl = finalUrl.split('?');
        let queryParams = splitUrl[1].split('&');
        let key = queryParams[queryParams.length - 1].split('=');
        if (key[0] != 'page') {
            let url = finalUrl + '&page=' + page;

            console.log(url);

            getMovies(url);

            fetch(url).then(res => res.json()).then(data => {
                if (data.results.length !== 0) {
                    showMovies(data.results);
                    document.body.scrollTop = document.documentElement.scrollTop = 0;

                    currentPage = data.page;
                    nextPage = currentPage + 1;
                    prevPage = currentPage - 1;
                    totalPages = data.total_pages;

                    current.innerText = currentPage;

                    if (currentPage === 1 && totalPages !== currentPage) {
                        prev.setAttribute('disabled', 'disabled');
                        next.removeAttribute('disabled', 'disabled');
                    } else if (currentPage !== 1 && totalPages === currentPage) {
                        next.setAttribute('disabled', 'disabled');
                        prev.removeAttribute('disabled', 'disabled');
                    } else if (currentPage === 1 && totalPages === currentPage) {
                        prev.setAttribute('disabled', 'disabled');
                        next.setAttribute('disabled', 'disabled');
                    } else {
                        prev.removeAttribute('disabled', 'disabled');
                        next.removeAttribute('disabled', 'disabled');
                    }

                } else {
                    main.innerHTML = `
                    <div class="no-results">
                        <p class="no-results__top">No results were found.</p>
                        <p class="no-results__middle">Sometimes it happens.</p>
                        <a class="no-results__bottom" href="#" onClick="window.location.reload();">Let's try again =)</a>
                    </div>
                `

                    movieListTitle.style.display = 'none';
                    pagination.style.display = 'none';
                }
            });
        }
    }

    prev.addEventListener('click', () => {
        main.style.opacity = "0";

        if (prevPage > 0) {
            pageCall(prevPage)
            init2();
        }
    });

    next.addEventListener('click', () => {
        main.style.opacity = "0";

        if (nextPage <= totalPages) {
            pageCall(nextPage);
            init2();
        }
    });

});

// Result

const qResult = {
    genre: selectedGenre,
    actorID: null,
    time: [],
    country: null,
}

// console.log(qResult);

// Submit Btn

let submitBtnClicks = 1;

submitBtn.onclick = function (b) {
    submitBtnClicks++;
}

submitBtn.addEventListener('click', function () {
    if (submitBtnClicks === 2) {
    
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        submitBtn.setAttribute('disabled', 'disabled');
        submitBtn.style.opacity = "0";
        submitBtn.style.cursor = "default";

        genreList.style.transform = "translate(-300%, 0)";
        actorForm.style.transform = "translate(-50%, -50%)";

    } else if (submitBtnClicks === 3) {
        submitBtn.setAttribute('disabled', 'disabled');
        submitBtn.style.opacity = "0";
        submitBtn.style.cursor = "default";
        actorForm.style.transform = "translate(-300%, -50%)";
        decadesWrap.style.transform = "translate(-50%, -50%)";

        // Getting Actor's ID

        if (!actorInput.value) {
            qResult.actorID = null
        } else {
            getActorID(searchActorID + '&query=' + encodeURI(actorInput.value));
        }

        function getActorID(url) {
            fetch(url).then(res => res.json()).then(data => {
                if (data.results.length == 0) {
                    qResult.actorID = -1;
                } else {
                    assignActorID(data.results[0]);
                }
            });
        }

        function assignActorID(data) {
            const id = data.id;
            qResult.actorID = id;
        }

    } else if (submitBtnClicks === 4) {
        submitBtn.setAttribute('disabled', 'disabled');
        submitBtn.style.opacity = "0";
        submitBtn.style.cursor = "default";
        decadesWrap.style.transform = "translate(-300%, -50%)";
        countryWrap.style.transform = "translate(-50%, -50%)";
    }
});

// Tab Button Disabling

const inputs = document.getElementsByTagName('input');

for (let input of inputs) {
    input.setAttribute('tabindex', '-1');
}

// Main