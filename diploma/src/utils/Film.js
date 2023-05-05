export class Film {
    country;
    director;
    duration;
    year;
    description;
    image;
    trailerLink;
    thumbnail;
    owner;
    movieId;
    nameRU;
    nameEN;

    constructor(filmInfo) {
        if (filmInfo) {
            this.country = filmInfo.country;
            this.director = filmInfo.director;
            this.duration = filmInfo.duration;
            this.image = 'https://api.nomoreparties.co/' + filmInfo.image.url;
            this.description = filmInfo.description;
            this.year = filmInfo.year;
            this.trailerLink = filmInfo.trailerLink;
            this.thumbnail = 'https://api.nomoreparties.co/' + filmInfo.image.url;
            this.owner = '';
            this.movieId = filmInfo.id;
            this.nameRU = filmInfo.nameRU;
            this.nameEN = filmInfo.nameEN;
        } else {
            this.country = '';
            this.director = '';
            this.duration = 0;
            this.image = '';
            this.description = '';
            this.year = '';
            this.trailerLink = '';
            this.thumbnail = '';
            this.owner = '';
            this.movieId = 0;
            this.nameRU = '';
            this.nameEN = '';
        }
    }

    static getDuration (min) {
        const hour = Math.floor(min / 60);
        const minutes = min - (Math.floor(min / 60) * 60);
        return hour + ' ч ' + minutes + ' мин';
    }
}