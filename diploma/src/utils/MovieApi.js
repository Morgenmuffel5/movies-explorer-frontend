import {Film} from "./Film";
import {SavedFilm} from "./SavedFilm";

class MoviesApi  {

    objectList;
    savedObjectList;
    isSearchEmpty;
    finalMovieList
    sortMovieList

    constructor() {
        this.url = 'https://api.nomoreparties.co/beatfilm-movies';
        this.objectList = [];
        this.isSearchEmpty = false;
        this.savedObjectList = [];
        this.finalMovieList = [];
        this.sortMovieList = [];
    }

      _checkResponse(response) {
          if (response.ok) {
              return response.json();
          } else {
              return Promise.reject(`${response.status}`);
          }
      }

    //получение всех фильмов
    getAllFilms() {
        return fetch(this.url, {
            method: "GET",

        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    //получить сохраненные фильмы
    getSavedFilms() {
        this.savedObjectList = [];
        return fetch('https://api.morgenmuffel.diploma.nomoredomains.monster/movies', {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
        }).then((res) => {
            return this._checkResponse(res);
        });
    }

    //преобразование в нужный объект
    createFilmList(allFilms) {
        const list = []
        allFilms.forEach((item) => {
            list.push(new Film(item));
        })

        return list
    }

    //проставить лайки в массиве фильмов
    setLike(id, films, userFilms) {
        if (films.length > 0 && userFilms.length > 0) {
            userFilms.forEach((savedFilm) => {
                const index = films.findIndex((film) => film.movieId === savedFilm.movieId);
                if (index > -1) {
                    films[index].owner = id;
                }
            })
        }
        return films;
    }

    //фильтрация по короткометражкам
    filterShortFilm (sortMovieList) {
        const finalList = [];
        if (sortMovieList.length > 0) {
            sortMovieList.forEach((listItem) => {
                if (listItem.duration < 40) {
                    finalList.push(listItem);
                }
            })
        }
        return finalList
    }

    //снятие фильтра короткометражек
    filterLongFilms (sortMovieList) {
        const finalList = [];
        if (sortMovieList.length > 0) {
            sortMovieList.forEach((listItem) => {
                finalList.push(listItem);
            })
        }
        return finalList;
    }

    //фильтрация по метражу
    filterDuration(isShort, sortMovieList) {
       let finalList = [];
        if (isShort) {
            finalList = this.filterShortFilm(sortMovieList);
        } else {
            finalList = this.filterLongFilms(sortMovieList)
        }
        return finalList;
    }

    //сортировка по ключевому слову
    sortByKeyWord (keyWord, films) {
        const sortMovieList = [];
        if (keyWord !== '') {
            films.forEach((film) => {
                if (film.nameRU.toLowerCase().includes(keyWord.toLowerCase()) || film.nameEN.toLowerCase().includes(keyWord.toLowerCase())) {
                    sortMovieList.push(film);
                }

            })
        }
        return sortMovieList
    }

    //полная логика орабоктки:
    //1получаем все фильмы и склаываем их в objList (это прям в функции получения результатов)
    // 2 ищем в objlist сохраненные фильмы и ставим им owner (таким образом проставляются лайки)
    //3 сортируем по ключевому слову, результаты скидываем в sortList
    // 4 проверяем есть ли условие короткометражек, если есть то фильтруем по длительности и результаты складываем в finalList
    //если нет условия короткого метра, то просто sortList перегоняем в finalList

    createFinalList(id, keyWord, isShort, films, userFilms) {
        const filmsWithLikes = this.setLike(id, films, userFilms)
        const sortMovieList = this.sortByKeyWord(keyWord, films);
        let finalList = isShort ? this.filterShortFilm(sortMovieList) :  this.filterLongFilms(sortMovieList);
        return finalList
    }
}

const movieApi = new MoviesApi();

export default movieApi;