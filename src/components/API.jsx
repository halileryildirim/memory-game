async function API() {
    const url = `https://api.thecatapi.com/v1/images/search?limit=20&api_key=live_Q8VFKFk8Xr22LvGQ3ucm0MXKhaVPr7UF7yVq4xHkA6M9U86EmYzTTSoEHj4Mt6FQ`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const filteredData = data.map((cat) => {
            return { id: cat.id, url: cat.url, picked: false }
        });
        return filteredData;
    } catch (error) {
        console.log(error)
    }
}

export default API;