var base = "http://ms.csie.org/api/game";

interface response {
    code: number
    msg: string
    data: any
}

function GetGameAPI(path: string): Promise<response> {
    return fetch(base+path).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        throw response;
    })
}

export {GetGameAPI};