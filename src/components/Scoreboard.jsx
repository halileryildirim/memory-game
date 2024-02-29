function Scoreboard({ score, bestScore }) {
    return (
        <>
            <h1 className="score">Score: {score} </h1>
            <h1 className="best-score">Best Score: {bestScore} </h1>
        </>
    )
}

export default Scoreboard;