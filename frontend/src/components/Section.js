function Section({ title, children, onSubmit }) {

    return (
        <section className='section'>
            <h1 className="section__title">{title}</h1>
            <form className="section__form" onSubmit={onSubmit}>

                {children}
            </form>
        </section>
    )
}

export default Section;