async function fetchApi(path) {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    try {
        const response = await fetch(
            apiBaseUrl+"/"+path
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetching Error:", error);
    }
}

export default fetchApi