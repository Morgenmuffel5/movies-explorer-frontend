import {Film} from "./Film";

export class SavedFilm extends Film {

    constructor(film) {
        super(film);
        if (film) {
            this.image = film.image;
            this.trailerLink = film.trailerLink;
            this.thumbnail = film.thumbnail;
            this.owner = film.owner;
        } else {

            this.image = '';
            this.trailerLink = '';
            this.thumbnail = '';
            this.owner = '';
        }
    }

}