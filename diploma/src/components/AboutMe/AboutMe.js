function AboutMe () {
    return (
        <section className="profile">
            <h2 className="title">Студент</h2>
            <div className="profile__container">
                <div className="profile__info">
                    <h3 className="profile__title">Анна</h3>
                    <div className="profile__subtitle">Фронтенд-разработчик, 30 лет</div>
                    <div className="profile__text">Здесь должен быть какой-то текст обо мне, и когда-нибудь он здесь будет, но только не сегодня!
                        А еще, когда-нибудь у меня будет нормальная фотка, но это точно не сегодня, и не завтра. А пока пусть побудет эта.</div>
                    <a href="https://github.com/Morgenmuffel5" className="profile__link" target="_blank">Github</a>
                </div>
                <div className="profile__image-cont">
                    <div className="profile__image"></div>
                </div>
            </div>

        </section>
    )
}

export default AboutMe;