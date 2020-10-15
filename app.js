var app = {
    
    init: function(){
        app.getMovie();
     
        let inputSearch = document.getElementById('search');
        // au touche du clavier sur le input je rveux récuperer sa valeur
        let test = inputSearch.addEventListener('keypress',app.getDataForm);
        console.log('test : '+ app.test);
        let submit = document.getElementById('submit');
        //au click du bouton je veux comparer la velaur du form à la valeur d'un titre
        submit.addEventListener('click', app.valueFormSearch);
        value= app.getDataForm();
        console.log("la valeur "  +value);
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
        //je récupère le input
        let input = document.getElementById('search');
        let valueSearch = input.value
        // console.log(valueSearch.value);

        return valueSearch;
    },
    //je veux comparer la valeur du form à la valeur d'un titre
    valueFormSearch: function(){
       
        fetch('https://api.themoviedb.org/3/search/movie?api_key=87dfa1c669eea853da609d4968d294be&language=en-US&query=%27'+ query +'&page=1&include_adult=false')
        .then(data => data.json())
        .then(response =>{
            console.log(response);
            // for(movie of response.results){
            //     let comparaison = app.getDataForm();
            //     if(comparaison == movie.title ){
            //         console.log("le titre du film");
            //     }else{
            //         console.log('ça ne marche pas');
            //     }
            
            //}
        })
    }
}
app.init();