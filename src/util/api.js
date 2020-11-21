var base = "http://ms.csie.org/api/game";

function GetGameAPI(path) {
    fetch(base+path).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response.json())
        }
        var error = new Error(response.statusText || response.status)
        error.response = response
        return Promise.reject(error)
    })
}

export {GetGameAPI};