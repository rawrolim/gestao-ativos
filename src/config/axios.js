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

async function get(uri) {
    try {
        const res = await axios.get(uri, {
            headers: {
                Authorization: getToken()
            }
        });
        return res;
    } catch (e) {
        if (e.response.status == 401) {
            await refreshToken();
            return await get(uri);
        }else{
            return e;
        }
    }
}

async function put(uri, body) {
    const res = await axios.put(uri, body,
        {
            headers: {
                Authorization: getToken()
            }
        }
    );

    if (res.status == 401) {
        await refreshToken();
        return await put(uri, body);
    } else {
        return res;
    }
}

async function post(uri, body) {
    const res = await axios.post(uri, body,
        {
            headers: {
                Authorization: getToken()
            }
        }
    );

    if (res.status == 401) {
        await refreshToken();
        return await post(uri, body);
    } else {
        return res;
    }
}

async function delet(uri) {
    const res = await axios.delete(uri, {
        headers: {
            Authorization: getToken()
        }
    });

    if (res.status == 401) {
        await refreshToken();
        return await delet(uri);
    } else {
        return res;
    }
}

export default {
    get,
    put,
    post,
    delete: delet
}