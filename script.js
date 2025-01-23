const apiKey = 'api_key=025e2cebc7d383404cc1b291c44c87be'; 
const baseUrl = 'https://api.themoviedb.org/3';

const apiUrl = baseUrl + '/discover/movie?sort_by=popularity.desc&' + apiKey

// elementi HTML per la ricerca
const inputSearch = document.getElementById('search')
const searchButton = document.getElementById('searchButton') 

// funzione richiesta API
async function getMovies(url) {
  try {
    const response = await fetch(url);
    const responseJson = await response.json();
    const movies = responseJson.results;
    showMovies(movies);
  } catch (error) {
    console.error('Errore recupero dati:', error);
  }
}

// funzione per visualizzare i film
function showMovies(movies) {
  const moviesContainer = document.getElementById('movies-container');
  moviesContainer.innerHTML = ''; 

  // card per film
  movies.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieCard = document.createElement('div')
    movieCard.classList.add('movie')

    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}" class="movie-image" />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getVote(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        <p>${overview}</p>
      </div>
    `;

    moviesContainer.appendChild(movieCard); 
  });
}

//colore del voto
function getVote(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}

//ricerca film
searchButton.addEventListener('click', () => {
  const searchText = inputSearch.value.trim(); 
  if (searchText) {
    const searchUrl = baseUrl + '/search/movie?' + apiKey + '&query=' + encodeURIComponent(searchText);  // Encode query
    getMovies(searchUrl)
  } else {
    getMovies(apiUrl)
  }
});

// copyright dinamico
const currentYear = new Date().getFullYear()
const copyrightYearElement = document.getElementById('copyrightYear')
copyrightYearElement.textContent = currentYear

// richiamo la funzione
getMovies(apiUrl);
