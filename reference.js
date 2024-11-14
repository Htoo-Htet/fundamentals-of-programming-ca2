class Movie{
    constructor(name, genre, runningTime, releaseDate, rating){
        this.name=name;
        this.genre=genre;
        this.runningTime=runningTime;
        this.releaseDate=releaseDate;
        this.rating=rating;
    }

    averageRating(){
        if(this.rating[0]!=0){
            return `${(this.rating[1]/this.rating[0]).toFixed(1)} (${this.rating[0]} voters)`
        }
        else{
            return `0 (${this.rating[1]} voters)`
        }
    }

    durationInHours(){
        if(this.runningTime<60){
            return `${Math.round(this.runningTime)}m`
        }
        else if(this.runningTime%60 == 0){
            return `${Math.floor(this.runningTime/60)}h`
        }
        else{
            return `${Math.floor(this.runningTime/60)}h ${Math.round(this.runningTime%60)}m`
        }
    }

    displayMovieDetails(){
        console.log("\nName\t\t: "+this.name
        +"\nGenre\t\t: "+this.genre
        +"\nRunning Time\t: "+this.durationInHours()
        +"\nRelease Date\t: "+this.releaseDate
        +"\nRating\t\t: "+this.averageRating())
    }
}

class MovieWithDate{
    constructor(name, releaseDate, dateCode){
        this.name=name;
        this.releaseDate=releaseDate;
        this.dateCode=dateCode;
    }
}

class MoviesWithDuration{
    constructor(name, duration){
        this.name=name;
        this.duration=duration;
    }
}

module.exports={Movie, MovieWithDate, MoviesWithDuration}