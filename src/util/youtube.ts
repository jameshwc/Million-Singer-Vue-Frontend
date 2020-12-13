var watchURL = "https://www.youtube.com/watch?v=";

export function GetSubtitles(videoID: string) {
    fetch(watchURL + videoID).then( response => {return response.text()}).then(data => {
        return data.replace(/\\u0026/g, '&').replace(/\\/g, '')
    })
}