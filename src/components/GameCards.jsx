import React, {useState, useEffect } from "react";
import API from "./API";

/*
Çalışıyor ama olması gereken bu değil, score handling için kendi componentini yaz, 
Oyun başlarken input alıp ona göre data çeken component ekle.
Game over, try again componenti ekle.
Kart css'ini tekrar ayarla.

Bi de neden kediler bu kadar yavaş yükleniyo öğren ve ÇÖZ.
miyav
*/


function GameCards() {
    const [cats, setCats] = useState([])
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(score);

    useEffect(() => { 
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


    function handleGameplay(id) {
        const catID = cats.findIndex((cat) =>  cat.id === id )
        if (cats[catID].picked === true) {
            alert(`Game Over`);
            if (score > bestScore) {
                setBestScore(score);
            }
            setScore(0);
            setCats([]);
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

export default GameCards;