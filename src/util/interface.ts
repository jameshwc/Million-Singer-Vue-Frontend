export interface IPostTour {
    collects: number[]
}

export interface IPostCollect {
    title: string
    songs: number[]
}

export interface ICollect {
    id: number
    title: string
    songs: ISong[]
}

export interface ISong {
    id: number
    video_id: string
    name: string
    singer: string
    language?: string
    genre?: string
}

export interface ISongWithLyrics extends ISong{
    language: string
    genre: string
    lyrics: ILyric[]
    miss_lyric_id: number
}

export interface ILyric {
    index: number
    line: string
    start_time: number
    end_time: number
}

export interface ISubtitle {
    lang_code: string
    lang_translated: string
    base_url: string
}

export interface ILine {
    _start: string
    _dur: string
    __text: string
}
// export class Collect implements ICollect {
//     id: number
//     title: string
//     constructor(id = 0, title = "") {
//         this.id = id;
//         this.title = title;
//     }
// }
// export class Song implements ISong {
//     id: number;
//     title: string;
//     artist: string;
//     constructor(id = 0, title = "", artist = ""){
//         this.id = id;
//         this.title = title;
//         this.artist = artist;
//     };
// }