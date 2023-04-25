function AboutProject () {
    return (
        <section className="about" id="about">
            <div className="about__container">
                <h2 className="title">О проекте</h2>
                <div className="about__text-container">
                    <div className="about__info-container">
                        <h3 className="about__subtitle">Дипломный проект включал 5 этапов</h3>
                        <div className="about__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</div>
                    </div>
                    <div className="about__info-container">
                        <h3 className="about__subtitle">На выполнение диплома ушло 5 недель</h3>
                        <div className="about__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</div>
                    </div>
                </div>

                <div className="about__time-container">
                    <div className="about__info-container">
                        <div className="about__time"> 1 неделя </div>
                        <div className="about__step"> Back-end </div>
                    </div>
                    <div className="about__info-container">
                        <div className="about__time about__time_width"> 4 недели </div>
                        <div className="about__step"> Front-end </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default AboutProject;