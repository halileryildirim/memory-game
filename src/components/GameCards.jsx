import React, {useState, useEffect } from "react";
import API from "./API";
function GameCards({cardNumber = 7}) {
    const [cats, setCats] = useState([])
    const [score, setScore] = useState(0);

    useEffect(() => { 
        async function fetchCats() {
            setCats([]);
            const data = await API(cardNumber);
            if (!ignore) {
                setCats(data);
            }
        }
        let ignore = false;
        fetchCats();
        return () => {
            ignore = true;
        }
    }, [cardNumber])
    
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
             alert(`Game Over, Your Score: ${score}`)
        }
        else {
            cats[catID].picked = true;
            setScore(score => score + 1);
            setCats(deckShuffle([...cats]));
        } 
    }

    return (
        <div className="cards">
            {cats.map((cat) => (
                <img onClick={() => handleGameplay(cat.id)} key={cat.id} src={cat.url} style={{width: "250px", height: "400px"}}/>
            ))} 
        </div>
    );
}

export default GameCards;