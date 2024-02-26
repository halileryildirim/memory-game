import React, {useState, useEffect } from "react";
import API from "./API";
function Cats() {
    const [catData, setCatData] = useState([])

    useEffect(() => { 
        async function fetchCats() {
            setCatData([]);
            const data = await API(10);
            if (!ignore) {
                setCatData(data);
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
            {catData.map((cat) => (
                <img key={cat.id} src={cat.url}/>
            ))}
        </>
    )
}

export default Cats