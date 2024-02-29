import React, {useState, useEffect } from "react";
import API from "./API";

function MemoryGame() {
    const [cats, setCats] = React.useState([])
    const [score, setScore] = React.useState(0);
    const [bestScore, setBestScore] = React.useState(score);

    React.useEffect(() => { 
        async function fetchCats() {
            setCats([]);
            const data = await API();
            if (!ignore) {
                setCats(data);
            }
        }
        let ignore = false;
        fetchCats();
        return () => {
            ignore = true;
        }
    }, [bestScore])
    
    function deckShuffle(array) {
        let m = array.length, t, i;

        while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m]
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }

    function handleGameplay(id) {
        const catID = cats.findIndex((cat) =>  cat.id === id )
        if (cats[catID].picked === true) {
            if (score > bestScore) {
                setBestScore(score);
                setScore(0);
            }
            else {
                setScore(0);
                setBestScore(bestScore);
            }
        }
        else {
            cats[catID].picked = true;
            setScore(score => score + 1);
            setCats(deckShuffle([...cats]));
        } 
    }

    return (
        <>
            <div className="container">
                {cats.filter((cat, index)=> index < 6).map((cat) => (
                    <img className="cards" onClick={() => handleGameplay(cat.id)} key={cat.id} src={cat.url}/>
                ))}
            </div>
            <h1 className="score">Score: {score} </h1>
            <h1 className="best-score">Best Score: {bestScore} </h1>
        </>

        
    );
}

export default MemoryGame;