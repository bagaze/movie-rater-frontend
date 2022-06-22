import axios from 'axios';

const _axiosValidateStatus = (status) => {
    return status >= 200 && status < 500;
}

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

export async function getMRBackData(
    endpoint,
    customQueryParams,
    setData,
    setError,
    setErrorInfo,
    current_page=0) {
    const MRBACK_API_URL = process.env.REACT_APP_MRBACK_API_URL;
    // const headers = {
    //     Authorization: `Bearer ${MRBACK_API_URL}`
    // };
    let params = {
        ...customQueryParams
    };
    if (current_page) {
        params["page"] = current_page + 1;
    }

    try {
        const { status, statusText, data } = await axios.get(
            `${MRBACK_API_URL}${endpoint}`,
            {
                // headers,
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

export async function signUpMRBack(newUser, setError, setErrorInfo) {
    const MRBACK_API_URL = process.env.REACT_APP_MRBACK_API_URL;

    let createdUser = null;

    try {
        const { status, statusText, data } = await axios.post(
            `${MRBACK_API_URL}/users`,
            newUser,
            {
                validateStatus: _axiosValidateStatus
            }
        );
        console.log(data);
        if (status === 201) {
            createdUser = data;
        } else {
            setError(true);
            setErrorInfo(data.detail);
        }
    } catch(e) {
        console.log("Error catched");
        console.log(e);
        setError(true);
        setErrorInfo(e);
    }
    
    return createdUser;
}