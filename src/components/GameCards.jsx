import React, {useState, useEffect } from "react";
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

    function handleGameplay(id) {
        setCats(deckShuffle([...cats]))
        // console.log(id); its working for picked swap
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