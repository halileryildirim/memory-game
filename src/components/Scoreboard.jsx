function Scoreboard({ score, bestScore }) {
    return (
        <>
            <h2 className="score">Score: {score} </h2>
            <h2 className="best-score">Best Score: {bestScore} </h2>
        </>
    )
}

export default Scoreboard;