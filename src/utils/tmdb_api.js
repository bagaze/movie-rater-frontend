import axios from 'axios';

export async function getTMDBData(
    endpoint,
    customQueryParams,
    setData,
    setError,
    setErrorInfo) {
    const TMDB_API_URL = process.env.REACT_APP_TMDB_API_URL;
    const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const headers = {
        Authorization: `Bearer ${TMDB_API_KEY}`
    };
    let params = {
        language: "fr-FR",
        region: "FR",
        ...customQueryParams
    };

    try {
        const { status, statusText, data } = await axios.get(
            `${TMDB_API_URL}${endpoint}`,
            {
                headers,
                params
            }
        );
        if (status === 200) {
            if (data.results) {
                setData(data.results);
            } else {
                setData(data);
            }
        } else {
            setError(true);
            setErrorInfo(`${status}: ${statusText}`);
        }
    } catch(e) {
        console.log(e);
        setError(true);
        setErrorInfo(e);
    }
}
