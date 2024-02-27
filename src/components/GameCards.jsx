import React, {useState, useEffect, useSyncExternalStore } from "react";
import API from "./API";
function GameCards({cardNumber = 7}) {
    const [cats, setCats] = useState([])

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

    function handleShuffle() {
        setCats(deckShuffle([...cats]));
    }

    return (
        <div className="cards">
            {cats.map((cat) => (
                <div onClick={handleShuffle} key={cat.id}>
                    <img src={cat.url} style={{width: "250px", height: "400px"}}/>
                </div>
            ))} 
        </div>
    );
}

export default GameCards;