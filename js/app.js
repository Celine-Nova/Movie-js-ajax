var app = {
    
    init: function(){
        app.getMovie();
     
        document.getElementById("submit").addEventListener("click", function(event){
            event.preventDefault();
            app.getDataForm();
          });
     
    },
    // je veux afficher mes films
    showMovies: function(movies){
        let listMovie = document.getElementById('list-movie');
        listMovie.innerHTML = '';
        //je boucle sur le tableau de reponse pour obtenir les films
        for(movie of movies){
            let divMovie = document.createElement('div');
            divMovie.className = 'movie','col-lg-12';
            let linkMovie = document.createElement('a');
            linkMovie.style.textDecoration = 'none';
            let titleMovie = document.createElement('h2');
            let poster = document.createElement('img');
            let date = document.createElement('span');
            date.className = 'date'
            linkMovie.href = 'https://www.themoviedb.org/movie/' + movie.id ;
            poster.src = 'https://image.tmdb.org/t/p/w500'+  movie.poster_path;
            titleMovie.textContent = movie.title;
            date.textContent = movie.release_date;
            //    console.log(titleMovie);
            divMovie.appendChild(titleMovie);
            divMovie.appendChild(poster);
            divMovie.appendChild(date);
            linkMovie.appendChild(divMovie);
            listMovie.appendChild(linkMovie);
        }
    },
    //je veux récupérer les films
    getMovie: function(){
        fetch('https://api.themoviedb.org/3/movie/top_rated?sort_by=popularity.desc&language=fr-FR&api_key=87dfa1c669eea853da609d4968d294be')
        .then(data => data.json())
        .then(response =>{
            // console.log(response.results);
            app.showMovies(response.results)  
        })
    },
    getDataForm: function(){
        //je récupère le input
        let input = document.getElementById('search');
        // je récupère la valeur du input
        let valueSearch = input.value;
        app.valueFormSearch(valueSearch);
    },
    //je veux rechercher un film
    valueFormSearch: function(title){
        console.log(title)
        fetch('https://api.themoviedb.org/3/search/movie?api_key=87dfa1c669eea853da609d4968d294be&language=en-US&query=%27'+ title +'&page=1&include_adult=false')
        .then(data => data.json())
        .then(response =>{
            let listMovie = document.getElementById('list-movie');
            listMovie.innerHTML = '';
            if(response.results == 0){
                let errorTitleMovie = document.createElement('p'); 
                errorTitleMovie.textContent = ' Aucun résultat ne répond à votre recherche  ';
                errorTitleMovie.id = "error"
                // errorTitleMovie.style.color = 'red';
                // errorTitleMovie.style.fontSize = '3em';
                // listMovie.style.textAlign = 'center';
                listMovie.appendChild(errorTitleMovie);
            }else {
                // console.log(response);
                app.showMovies(response.results);
           }
        })
    },
  
}
app.init();