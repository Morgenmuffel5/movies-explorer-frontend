import {Link} from 'react-router-dom'
import React from "react";

function Portfolio () {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <a href="https://github.com/Morgenmuffel5/how-to-learn" target="_blank"
                  className="portfolio__link">
                <div className="portfolio__text">Статичный сайт</div>
                <div className="portfolio__icon"></div>
            </a>
            <a href="https://github.com/Morgenmuffel5/russian-travel"
                  className="portfolio__link" target="_blank">
                <div className="portfolio__text">Адаптивный сайт</div>
                <div className="portfolio__icon"></div>
            </a>
            <a href="https://github.com/Morgenmuffel5/react-mesto-api-full"
                  className="portfolio__link" target="_blank">
                <div className="portfolio__text">Одностраничное приложение</div>
                <div className="portfolio__icon"></div>
            </a>
        </section>

    )

}
export default Portfolio;