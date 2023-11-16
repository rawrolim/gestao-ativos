import axios from "axios";

function getToken() {
    return localStorage.getItem("token");
}

async function refreshToken() {
    const res = await axios.get('/api/refresh_token', {
        headers: {
            Authorization: getToken()
        }
    });

    localStorage.setItem("token", res.data);
}

async function get(uri, options = {}) {
    try {
        const res = await axios.get(uri, {
            ...options,
            headers: {
                Authorization: getToken()
            }
        });
        return res;
    } catch (e) {
        if (e.response.status == 401) {
            await refreshToken();
            return await get(uri, options);
        } else {
            return e;
        }
    }
}

async function put(uri, body, options = {}) {
    try {
        const res = await axios.put(uri, body,
            {
                ...options,
                headers: {
                    Authorization: getToken()
                }
            }
        );
        return res;
    } catch (e) {
        if (e.response.status == 401) {
            await refreshToken();
            return await put(uri, body, options);
        } else {
            return e;
        }
    }
}

async function post(uri, body, options = {}) {
    try {
        const res = await axios.post(uri, body,
            {
                ...options,
                headers: {
                    Authorization: getToken()
                }
            }
        );
        return res;
    } catch (e) {
        if (e.response.status == 401) {
            await refreshToken();
            return await post(uri, body, options);
        } else {
            return e;
        }
    }
}

async function delet(uri, options = {}) {
    try {
        const res = await axios.delete(uri, {
            ...options,
            headers: {
                Authorization: getToken()
            }
        });
        return res;
    } catch (e) {
        if (e.response.status == 401) {
            await refreshToken();
            return await delet(uri, options);
        } else {
            return e;
        }
    }
}

export default {
    get,
    put,
    post,
    delete: delet
}