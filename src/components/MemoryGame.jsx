import { useState, useEffect } from "react";
import Info from "./Info";
import Card from "./Card"
import API from "./API";
import Scoreboard from "./Scoreboard";

function MemoryGame() {
    const [cats, setCats] = useState([])
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(score);
    const [loading, setLoading] = useState(true);
    const [gameOver, setGameOver] = useState(false);


    useEffect(() => {
        async function fetchCats() {
            setCats([]);
            setLoading(true);
            const data = await API();
            if (!ignore) {
                setCats(data);
                setLoading(false);
                setGameOver(false);
            }
        }

        let ignore = false;
        fetchCats();
        return () => {
            ignore = true;
        }
    }, [gameOver])

    
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
            setGameOver(true);
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
            <Info/>
            <div className="container">
                {loading ? (
                    <h1>Catching New Cats...</h1>
                ) : (
                    cats.slice(0, 5).map((cat) => (
                        <Card key={cat.id} cat={cat} onClick={() => handleGameplay(cat.id)} />
                    ))
                )}
            </div>
            <Scoreboard score={score} bestScore={bestScore}/>
        </>

        
    );
}

export default MemoryGame;