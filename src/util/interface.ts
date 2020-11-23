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