import axios from 'axios';

export async function getTMDBData(
    endpoint,
    customQueryParams,
    setData,
    setError,
    setErrorInfo,
    current_page=0) {
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
    if (current_page) {
        params["page"] = current_page + 1;
    }

    try {
        const { status, statusText, data } = await axios.get(
            `${TMDB_API_URL}${endpoint}`,
            {
                headers,
                params
            }
        );
        if (status === 200) {
            setData((previousData) => {
                if (current_page && previousData && data.results) {
                    return {
                        page: data.page,
                        results: [...(previousData.results), ...(data.results)],
                        total_pages: data.total_pages,
                        total_results: data.total_results
                    };
                }
                return data;
            });
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
