import {Link} from "react-router-dom";

function NotFound () {
    return (
        <>
            <main>
                <section className="notFound">
                    <div className="notFound__container">
                        <h1 className="notFound__title">404</h1>
                        <div className="notFound__text">Страница не найдена</div>
                    </div>
                    <Link className="notFound__link" to="/sign-in">Назад</Link>
                </section>
            </main>
        </>
    )
}

export default NotFound;