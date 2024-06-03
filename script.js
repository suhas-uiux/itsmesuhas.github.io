 let currentsong = new Audio()
async function getsong() {
    let song = await fetch("http://127.0.0.1:5502/songs")
    let res = await song.text()
 //   console.log(res)
    let div = document.createElement("div")
    div.innerHTML = res;
    let a = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < a.length; index++) {
        const element = a[index];

        if (element.href.endsWith(".mp3")) {
            songs.push(element.href);
    }
    }
    return songs;
}

async function main() {

    let songs = await getsong();
    console.log(songs)
    

    let songsul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songsul.innerHTML = songsul.innerHTML + `<li><img src="music.svg" alt="" class="src">
        <div class="artist">
       <div> ${song.split("/songs/")[1].replaceAll("%20"," ")}</div>
        </div>
        <div class="playnow">
            <img src="play.svg" alt="" class="src">
        </div>
    </li> `
 
    }
    const playmusic=(track)=>{
        currentsong.src="/songs/" + track
        currentsong.play();
        document.querySelector(".songname").innerHTML=track
    }
    //attach an event listner to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click",element=>{
            console.log(e.querySelector(".artist").firstElementChild.innerHTML)
            playmusic(e.querySelector(".artist").firstElementChild.innerHTML.trim())
           
        })
    });
 
       
    
}   

main();
//songn.innerHTML=songn.innerHTML + ` <div> ${e.querySelector(".artist").firstElementChild.innerHTML} </div>`
//<marquee direction="right"> ${song.split("/songs/")[1].replaceAll("%20"," ")}</marquee>