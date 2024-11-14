var input = require('readline-sync');
const {Movie, MovieWithDate, MoviesWithDuration} = require('./reference');
genres=["Action", "Adventure", "Crime", "Drama", "Fantasy", "Horror", "Mystery", "Sci-Fi", "Thriller"]

/* Movie 1 */
var movie1=new Movie("Black Panther: Wakanda Forever 2022", [genres[1],genres[0],genres[3],genres[7],genres[4],genres[8]], 161, "11 Nov 2022", [9,42]);

/* Movie 2*/
var movie2=new Movie("Avatar: The Way of Water", [genres[1],genres[7]], 192, "16 Dec 2022", [4,15]);

/* Movie 3*/
var movie3=new Movie("Fast X", [genres[2],genres[0],genres[6],genres[8]], 43, "19 May 2023", [28,60]);

/* Movie 4*/
var movie4=new Movie("Ant-Man and the Wasp: Quantumania", [genres[1],genres[0]], 120, "16 Feb 2023", [18,80]);

/* Movie 5*/
var movie5 = new Movie ("M3GAN", [genres[5],genres[6],genres[8]], 102, "6 Jan 2023", [20,70]);

var movieList = [movie1, movie2, movie3, movie4, movie5];    //All the movies are added to this "movieList" array.

/* Intro */
console.log("Welcome to Silver Vintage Movie Review Program");
var userName = input.question("Please enter your name: ");

do {
    /* Main Menu */
    var choice = input.question("\nHi "+userName+", please select your choice:"
        +"\n\t1. Display All Movies"
        +"\n\t2. Add Movie"
        +"\n\t3. Add Rating"
        +"\n\t4. Latest 3 Release Date"
        +"\n\t5. Filter by Genre"
        +"\n\t6. Sort Movies by Their Running Times"
        +"\n\t7. Exit"
        +"\n\t>> ");

    /* User selects an option. */    
    switch(choice){

        /* 1. Display All Movies */
        case "1":
            for (var i=0; i<movieList.length; i++) {
               movieList[i].displayMovieDetails();
            }
            break;
            
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        /* 2. Add Movie */
        case "2":
            var checkMovieNames = [];
            for (var i=0; i<movieList.length; i++){
                checkMovieNames.push(movieList[i].name.toLowerCase());
            }

            /* User enters the new movie's name here. */
            do{
                var inputMovie=input.question("\n\tPlease enter Movie's name: ");
                if(checkMovieNames.includes(inputMovie.toLowerCase()) || inputMovie == ""){
                    console.log("\tPlease enter a unique movie name!");
                }
            }
            while(checkMovieNames.includes(inputMovie.toLowerCase()) || inputMovie == "");
            
            /* User enters the new movie's genre(s) here. */
            do{
                console.log("\n\tPlease enter Movie's genre(s):");
                for(var i=0; i<genres.length; i++){
                    console.log("\t"+(i+1)+") "+genres[i])
                }
                
                var genreChoice1=input.question("\t>> ");
                var loopStop1=false;
                var inputGenresList=genreChoice1.split(",");
                for(var i=0; i<inputGenresList.length; i++){ 
                    if(!(inputGenresList[i]>=1 && inputGenresList[i]<=genres.length && Number.isInteger(parseFloat(inputGenresList[i])))){
                        loopStop1= true;
                    }
                    for(var j=0; j < inputGenresList.length; j++){
                        if(i !== j && parseInt(inputGenresList[i]) == parseInt(inputGenresList[j])){
                            loopStop1 = true;
                        }
                    }
                }
                if(loopStop1){
                    console.log("\n\tPlease enter a valid genre option(s)!");
                }
            }while(loopStop1);
            var inputGenres=[];
            for (var i=0; i<inputGenresList.length; i++){
                inputGenres.push(genres[inputGenresList[i]-1]);
            }

            /* User enters the new movie's running time here. */
            do{
                var inputRunningTime=input.question("\n\tPlease enter Movie's running time (mins): ");
                var loopStop2=true;
                if(Number.isInteger(parseFloat(inputRunningTime)) && !isNaN(inputRunningTime)){
                    loopStop2=false;
                }
                if(loopStop2){
                    console.log("\tPlease enter a valid running time!");
                }
            }
            while(loopStop2);
            inputRunningTime=parseInt(inputRunningTime)
            
            /* User enters the new movie's release date here. */
            var inputReleaseDate=input.question("\n\tPlease enter Movie's release date: ");
            
            movieList.push(new Movie(inputMovie, inputGenres, inputRunningTime, inputReleaseDate, [0, 0]));    //The new movie entered by user is added.
            
            break;
  
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        /* 3. Add Rating */
        case "3":
            do{
                console.log("\n\tSelect the movie to add a rating:");
                for(var i=0; i<movieList.length; i++){
                    console.log("\t"+(i+1)+") "+movieList[i].name)
                }
                console.log("\t"+(movieList.length+1)+") Return to Main Menu");
                var movieSelection=input.question("\t>> ");

                var loopStop3=true;
                if(movieSelection>= 1 && movieSelection<=(movieList.length+1) && !isNaN(movieSelection) && Number.isInteger(parseFloat(movieSelection))){
                    loopStop3=false;
                }
                if(loopStop3){
                    console.log("\nKindly enter a valid input!");
                }
            }
            while(loopStop3);
  
            if (movieSelection==movieList.length+1) {
                break;
            } 
            else{
                do {
                    var inputRating=input.question("\n\tEnter your rating for "+(movieList[movieSelection-1].name)+" (1 to 5 inclusive): ");
                    var loopStop4=true;
                    if(inputRating>=1 && inputRating<=5 && !Number.isNaN(inputRating) && Number.isInteger(parseFloat(inputRating))){
                        loopStop4=false;
                    }
                    if(loopStop4){
                        console.log("\nEnter a valid rating!");
                    }
                }
                while(loopStop4);
                inputRating=parseInt(inputRating)
  
                movieList[movieSelection-1].rating[1]+=inputRating;
                movieList[movieSelection-1].rating[0]++;
            }
        
            break;
  
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        /* 4. latest 3 Movies */
        case "4":
            var movieDates=[];
            for(var i=0; i<movieList.length; i++){
                movieDates.push(new MovieWithDate(movieList[i].name, movieList[i].releaseDate, Date.parse(movieList[i].releaseDate)));
            }
            movieDates.sort((a, b) => b.dateCode - a.dateCode);
            console.log("\n\tThe lastest 3 movies are:");
            for(var i=0; i<3; i++) {
                console.log("\t"+(i+1)+") "+movieDates[i].releaseDate+" - "+movieDates[i].name);
            }
            
            break;
  
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        /* 5. Filter by Genre */
        case "5":
            do{
                console.log("\n\tPlease select a genre:");
                for(var i=0; i<genres.length; i++){
                    console.log("\t"+(i+1)+") "+genres[i])
                }
                
                var loopStop5=true;
                var genreChoice2=input.question("\t>> ");
                if(genreChoice2>=1 && genreChoice2<=genres.length && !Number.isNaN(genreChoice2) && Number.isInteger(parseFloat(genreChoice2))) {
                    loopStop5=false;
                }
                if(loopStop5) {
                    console.log("\nPlease enter a valid genre input!");
                }
            }
            while(loopStop5);
  
            console.log("\n\tYou have selected \""+(genres[genreChoice2-1])+"\" genre:");
            var filterByGenre=[];
            for (var i=0; i<movieList.length; i++){
                if (movieList[i].genre.includes(genres[genreChoice2-1])) {
                filterByGenre.push(movieList[i].name);
                }
            }
  
            for (var i=0; i<filterByGenre.length; i++) {
                console.log("\t"+(i+1)+") "+filterByGenre[i]);
            }
        break;
  
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        /* 6.  */
        case "6":
            console.log("\n\tHow would you like to sort the movies by their running times:"
            +"\n\t1. Ascending"
            +"\n\t2. Descending")
            var sortMovies=input.question("\t>> ")
            var movieDurations=[];

            switch(sortMovies){
                case "1":
                    for(var i=0; i<movieList.length; i++){
                        movieDurations.push(new MoviesWithDuration(movieList[i].name, movieList[i].runningTime));
                    }
                    movieDurations.sort((a, b) => a.duration - b.duration);
                    
                    movieList.sort((a, b) => a.runningTime - b.runningTime);

                    console.log("\n\tThe movies sorted in ascending order of their durations are as follows:");
                    for(var i=0; i<movieList.length; i++) {
                        console.log("\t"+(i+1)+") "+movieDurations[i].name+" ("+movieDurations[i].duration+"m)");
                    }
                    break;
            
                case "2":
                    for(var i=0; i<movieList.length; i++){
                        movieDurations.push(new MoviesWithDuration(movieList[i].name, movieList[i].runningTime));
                    }
                    movieDurations.sort((a, b) => b.duration - a.duration);

                    movieList.sort((a, b) => b.runningTime - a.runningTime);

                    
                    console.log("\n\tThe movies sorted in descending order of their durations are as follows:");
                    for(var i=0; i<movieList.length; i++) {
                        console.log("\t"+(i+1)+") "+movieDurations[i].name+" ("+movieDurations[i].duration+"m)");
                    }
                    break;

                default:
                    console.log("\n\tPlease enter a valid option!")
            }
            

            break;

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        case "7":
            console.log("\nThank you & Goodbye");
            break;
  
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        default:
            console.log("\nPlease enter a valid input");
    }
}
while(choice!=="7");