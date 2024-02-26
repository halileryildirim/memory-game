import React, {useState, useEffect } from "react";
import API from "./API";
function Cats() {
    const [cats, setCats] = useState([])

    useEffect(() => { 
        async function fetchCats() {
            setCats([]);
            const data = await API(10);
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

    return (
        <>
        {cats.map((cat) => (
            <img key={cat.id} src={cat.url} style={{width: "250px", height: "400px"}}/>
        ))}
        </>
    )
}

export default Cats