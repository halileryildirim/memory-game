function Card({ cat, onClick }) {
    return <img className="cards" onClick={onClick} src={cat.url} />
}

export default Card;