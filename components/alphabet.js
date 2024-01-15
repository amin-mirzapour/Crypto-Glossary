function Alphabet({ alpha }) {
    return (
        <>
            <div className="header-alpha">
                {
                    alpha.map(al => {
                        return (
                            <div key={al} className='header-alpha-child'>
                                <a href={`#${al}`}>{al}</a>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Alphabet