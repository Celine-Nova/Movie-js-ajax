var app = {
    init: function(){
        app.getMovie();
     
        let valueSearch = document.getElementById('search');
        // au touche du clavier sur le input je rveux récuperer sa valeur
        valueSearch.addEventListener('keypress',app.getDataForm);
        let submit = document.getElementById('submit');
        //au click du bouton je veux comparer la velaur du form à la valeur d'un titre
        submit.addEventListener('click', app.valueFormSearch);
        
    },

    getMovie: function(){
        fetch('https://api.themoviedb.org/3/movie/top_rated?sort_by=popularity.desc&language=fr-FR&api_key=87dfa1c669eea853da609d4968d294be')
        .then(data => data.json())
        .then(response =>{
            // console.log(response.results);
            //je boucle sur le tableau de reponse pour obtenir les films
            for(movie of response.results){
                let listMovie = document.getElementById('list-movie');
                let divMovie = document.createElement('div');
                    divMovie.className = 'movie';

                let titleMovie = document.createElement('h2');
                let linkMovie = document.createElement('a');
                let poster = document.createElement('img');
                let date = document.createElement('span');
                linkMovie.href = 'https://www.themoviedb.org/movie/' + movie.id ;
                poster.src = 'https://image.tmdb.org/t/p/w500'+  movie.poster_path;
                titleMovie.textContent = movie.title;
                date.textContent= movie.release_date;
                //    console.log(titleMovie);
                linkMovie.appendChild(poster);
                divMovie.appendChild(titleMovie);
                divMovie.appendChild(linkMovie);
                divMovie.appendChild(date);
                listMovie.appendChild(divMovie);
            }
        })
    },
    getDataForm: function(){
        //je récupère la valeur du formulaire
        let valueSearch = document.getElementById('search');
        return valueSearch.value;
    },
    //je veux comparer la valeur du form à la valeur d'un titre
    valueFormSearch: function(){
        
        fetch('https://api.themoviedb.org/3/movie/top_rated?sort_by=popularity.desc&language=fr-FR&api_key=87dfa1c669eea853da609d4968d294be')
        .then(data => data.json())
        .then(response =>{
            for(movie of response.results){
                let comparaison = app.getDataForm();
                console.log('coucou');
                if(comparaison == movie.title ){
                    console.log("le titre du film");
                }else{
                    console.log('ça ne marche pas');
                }
            
            }
        })
    }
}
app.init();