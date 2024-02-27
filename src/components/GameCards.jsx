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
    }, [])
    
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

    return (
        <>
        {cats.map((cat) => (
            <img key={cat.id} src={cat.url} style={{width: "250px", height: "400px"}}/>
        ))} 
        </>
    );
}

export default GameCards;