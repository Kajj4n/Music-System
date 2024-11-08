let alreadyIn
let exitError 
let firstSpan 
let subTxt 
let confirmBtns 
let confirmBtnsAll 
let playNext
let guide
let guideExt
let lngImg
let playlistTitle
let tabs
const translations = {
    "Add song to the playlist?": "Lägg till låt i spellistan?",
    "Song Couldn't Be Added To the Playlist": "Låten kunde inte läggas till i spellistan",
    "Song Has Been Added To The Playlist!" : "Låten har lagts till i spellistan!",
    "The following song has already been added to the playlist Queue. Try again later when the song is not in the playlist Queue.":
        "Följande låt har redan lagts till i spellistan. Försök igen senare när låten inte finns i spellistan.",
    "Scan The Check": "Skanna kvittot",
    "Please scan the check that you received for your purchase to play the song next. If you don't have a check, it can be obtained by purchasing anything in the bar.":
        "Skanna kvittot som du fick vid köpet för att spela låten härnäst. Om du inte har ett kvitto, kan du få ett genom att köpa något i baren.",
    "Song Couldn't Be Played Next": "Låten kunde inte spelas härnäst",
    "A song has already been chosen to be played next. Wait until the next song starts to play and try again.":
        "En låt har redan valts att spelas härnäst. Vänta tills nästa låt börjar spela och försök igen.",
    "Failed To Scan The Check": "Kunde inte skanna kvittot",
    "Please try scanning the check again, and ensure that the check has not already been scanned. If the problem persists, talk to the available staff.":
        "Försök att skanna kvittot igen och se till att det inte redan har skannats. Om problemet kvarstår, tala med personalen.",
    "The song is going to play next!": "Låten kommer att spelas härnäst!",
    "The chosen song will start playing after the current one finishes. Enjoy the listen!":
        "Den valda låten börjar spelas när den nuvarande är klar. Trevlig lyssning!",
    "Scanned" : "Scannad",
    "Not scanned" : "Inte scannad",
    "Yes" : "Ja",
    "No" : "Nej"
};

let searchBar
let expandTxt

document.addEventListener("DOMContentLoaded", () => {
    guide = document.getElementById("guide")
    guideExt = document.getElementById("guide-ext")
    firstSpan = document.getElementById("one");  
    const subTxt = document.getElementById("sub-txt")
    const confirmBtns = document.getElementById("cnfrm-btns")
    const confirmBtnsAll = document.querySelectorAll(".confirm")
    const searchGlass = document.getElementById("search-glass")
    const searchWrapper = document.querySelector(".search-wrapper")
    const leftColumn = document.getElementById('left-clmn');
    const rightColumn = document.getElementById('right-clmn');
    const leftColumnChildren = leftColumn.children
    const audio = document.getElementById('audio');
    const progress = document.getElementById('progress');
    const currentTimeElement = document.getElementById('current-time');
    const durationElement = document.getElementById('duration');
    const progressBar = document.getElementById('progress-bar');
    tabs = document.querySelectorAll(".tab");
    const cards = document.querySelectorAll(".adaptive-clr");
    const sngCards = document.querySelectorAll(".card");
    const lyrics = document.getElementById("lyrics");
    const artist = document.getElementById("artist");
    const tab = document.getElementById("crnt-tab");
    const page = document.getElementById("crnt-page");
    const ctaHolder = document.getElementById("cta-holder");
    searchBar = document.getElementById("search");
    const playlist = document.getElementById("playlist");
    playlistTitle = document.getElementById("playlist-title");
    const libraryTitle = document.getElementById("library-title");
    const library = document.getElementById("library");
    const supposedDisp = document.querySelectorAll("#crnt-page > div");
    const artistTxt = document.getElementById("artist-txt");
    expandTxt = document.getElementById("expand-txt");
    const addToLib = document.getElementById("add-lib");
    const playNext = document.getElementById("play-next");
    const main = document.getElementById("main");
    const playPause = document.querySelectorAll(".play-pause");
    const exitSearchClick = document.getElementById("exit-search");
    lngImg = document.getElementById("lng-img");
    exitError = document.getElementById("warn-ext");

    libraryTitle.style.display = "none"
    lngImg.style.background = `url("/images/svFlag.png") center center / cover no-repeat`

    lngImg.addEventListener("click", translateLng)
    for (let i = 0; i < playPause.length; i++){
        playPause[i].addEventListener("click", sample)
    }

    guideExt.addEventListener("click", () => {
        guide.style.display = "none"
    })

    addToLib.addEventListener("click", () => {

        if(guide.style.display == "" || guide.style.display == "none"){
            guide.style.display = "unset"
        }

        else if(guide.style.display == "unset"){
            guide.style.display = "none"
        }
    })
   
    
    let flag;
    searchBar.value = "";
    expandTxt.addEventListener("click", expand)
    artistTxt.addEventListener("click", expand)
    function expand(){

        if(flag){
            expandTxt.innerText = "Show More"

            if(lngImg.style.background == `url("/images/gbFlag.jpg") center center / cover no-repeat`){
                expandTxt.innerText = "Visa Mer"
            }
            artistTxt.style.overflow = "hidden"
            artistTxt.style.height = "11vh"
            expandTxt.style.marginTop = 10 + "px"
            flag = false
            return
        }
        expandTxt.innerText = "Show Less"

        if(lngImg.style.background == `url("/images/gbFlag.jpg") center center / cover no-repeat`){
            expandTxt.innerText = "Visa Mindre"
        }
        expandTxt.style.marginTop = 0 + "px"
        artistTxt.style.overflow = "unset"
        artistTxt.style.height = "auto"
        flag = true
    
    }

    function handleAction(actionType) {
        if (actionType === 'playNext') {
            searchBar.focus();
        }
    }

    playNext.addEventListener('click', () => handleAction('playNext'));

    
    let prevElem;
    let prevDisp;

    checkTab(tab);
    
    searchBar.addEventListener("click", searchLib);
    playNext.addEventListener("click", searchLib);
    exitSearchClick.addEventListener("click", exitSearch);

    function searchLib() {
               
    page.style.overflowY = "hidden"
    playlistTitle.style.display = "none"
    libraryTitle.style.display = "unset"
        for (let i = 0; i < supposedDisp.length; i++) {
            if (supposedDisp[i].style.display != "none" && supposedDisp[i].id != "library") {
                prevElem = supposedDisp[i];
                prevDisp = supposedDisp[i].style.display;
                supposedDisp[i].style.display = "none";
            }
        }

        exitSearchClick.style.display = "flex"
        library.style.display = "flex";
        
        searchWrapper.style.borderBottom = 2+"px solid white"
        leftColumn.style.overflowX = "hidden"
        Array.from(leftColumnChildren).forEach(child => {
            child.classList.add("offscreen");
        });

        leftColumn.style.display = "none"
        rightColumn.style.gridColumn = "1/3"
        searchWrapper.style.width = 75.8 + "vw"
        searchGlass.style.opacity = "1"
    }

    function exitSearch() {
        const next = document.querySelectorAll("#playlist .next");
        const libIcon = document.querySelectorAll("#playlist .addlib");
        playlistTitle.style.display = "unset";
        libraryTitle.style.display = "none";
    
        searchBar.value = "";
    
        library.style.display = "none";
        prevElem.style.display = prevDisp;
        searchWrapper.style.borderBottom = "2px solid #5E5E5E";
        searchGlass.style.opacity = "0.5";
        
        Array.from(leftColumnChildren).forEach(child => {
            child.classList.remove("offscreen");
        });
        exitSearchClick.style.display = "none";
        leftColumn.style.overflowX = "unset";
        leftColumn.style.display = "flex";
        rightColumn.style.gridColumn = "2/3";
        searchWrapper.style.width = "41vw";
        
        for (let i = 0; i < next.length; i++) {
            next[i].style.display = "none";
            libIcon[i].style.display = "none";
        }
    
        let crntTab = document.getElementById("crnt-tab");
    
        if (crntTab.textContent == "ARTIST") {
            page.style.overflowY = "scroll";
            playlistTitle.style.display = "none";
        }
    
        Keyboard.close();
    }
    

    const lyricsParagraph = document.querySelector("#lyrics p");
    const lyricsText = lyricsParagraph.innerText;

    const formattedLyrics = lyricsText.replace(/\n\s*\n/g, "<br><br>").replace(/\n/g, "<br>");

    lyricsParagraph.innerHTML = formattedLyrics;

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", () => {
            let crntTab = document.getElementById("crnt-tab");
            crntTab.id = "";
            tabs[i].id = "crnt-tab";
            checkTab(tabs[i]);
        });
    }

    function checkTab(tab) {
        const plays = document.querySelectorAll("#artist .plays");
        const artists = document.querySelectorAll("#artist .artist");

        page.style.overflowY = "hidden"

        if (tab.textContent === "UP NEXT" || tab.textContent === "NÄSTA") {
            playlist.style.display = "flex";
            playlistTitle.style.display = "unset"
        } else {
            playlist.style.display = "none";
            playlistTitle.style.display = "none"
        }

        if (tab.textContent === "LYRICS" || tab.textContent === "LÅTTEXT") {
            lyrics.style.display = "grid";
        } else {
            lyrics.style.display = "none";
        }

        if (tab.textContent === "ARTIST") {
            artist.style.display = "flex";
            page.style.overflowY = "scroll"

            for (let i = 0; i < artists.length; i++){
                plays[i].style.display = "unset"
                artists[i].style.display = "none"
            }    

        } else {
            artist.style.display = "none";
        }
    }

    audio.play();

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;

        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = progressPercent + '%';

        currentTimeElement.textContent = formatTime(currentTime);
    });

    audio.addEventListener('loadedmetadata', () => {
        durationElement.textContent = formatTime(audio.duration);
    });

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    progressBar.addEventListener('click', (e) => {
        const width = progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;

        audio.currentTime = (clickX / width) * duration;
    });

    const fontSizeRange = document.getElementById('font-size-slider');
    const lyricsT = document.getElementById('lyrics-txt');

    lyricsT.style.fontSize = fontSizeRange.value + 'px';

    fontSizeRange.addEventListener('input', function() {
        lyricsT.style.fontSize = fontSizeRange.value + 'px';
    });

   
});

document.addEventListener("DOMContentLoaded", async () => {
    const library = document.getElementById("library");
    const playlist = document.getElementById("playlist");

    const mainTitle = document.getElementById("main-title");
    const mainAlbum = document.getElementById("main-album");
    const audioElement = document.getElementById("audio");

    const artistNameElement = document.querySelector("#artist-img h2");
    const artistImageElement = document.getElementById("artist-img");
    const artistTextElement = document.getElementById("artist-txt");
    const popularSection = document.querySelector("#artist #context");


    const playlistSongs = new Set();

    function getRandomSongs(songs, count = 10) {
        const shuffled = [...songs].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }


    async function loadSongs() {
        try {
            const response = await fetch('songs.json');
            const songs = await response.json();


            const randomSongs = getRandomSongs(songs);
            const songForMetaData = randomSongs.pop();
            updateMetaData(songForMetaData, songs);


            randomSongs.forEach(song => {
                playlistSongs.add(song.title); 
                const cardDiv = createSongCard(song);
                playlist.appendChild(cardDiv);
            });

           
            const shuffledSongs = [...songs].sort(() => 0.5 - Math.random());

            shuffledSongs.forEach(song => {
                const isInPlaylist = playlistSongs.has(song.title);
                const cardDiv = createSongCard(song, isInPlaylist);
                library.appendChild(cardDiv);
            });

            cloneSongsToArtistPage(songs, songForMetaData.artist);

        } catch (error) {
            console.error('Error loading songs:', error);
        }
    }


    function cloneSongsToArtistPage(songs, artist) {
        const artistSongsContainer = document.querySelector('#artist #context');
        const matchingSongs = songs.filter(song => song.artist === artist);
    
        matchingSongs.forEach(song => {
            const isInPlaylist = playlistSongs.has(song.title);
    

            const cardDiv = createSongCard(song); 

            const existingIcon = cardDiv.querySelector('.addlib');
            
            if (existingIcon) {
                existingIcon.style.opacity = isInPlaylist ? '0.5' : '1'; 
            }
    
            artistSongsContainer.appendChild(cardDiv);
        });
    }

    function updateMetaData(song, allSongs) {
        const mainImg = document.querySelector(".main-img");
        mainTitle.textContent = song.title;
        mainAlbum.textContent = song.album;
        audioElement.querySelector("source").src = song.audioLink;
        audioElement.load();
        mainImg.style.background = `url("${song.imageLink}") rgb(0, 0, 0) 100% / cover no-repeat`;


        const style = document.createElement('style'); 
        style.innerHTML = `
            body::before {
                background: url("${song.imageLink}") center center / cover no-repeat;
            }
        `;
        document.head.appendChild(style);

        artistNameElement.textContent = song.artist;
        artistImageElement.style.backgroundImage = `url("${song.artistImage}")`;
        artistTextElement.innerHTML = `
            <p id="actl-text">
                ${song.artist} <span id = "spn-txt">is known for Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</span>
            </p>
        `;

        const colorThief = new ColorThief();
        const cards = document.querySelectorAll(".adaptive-clr");
        
        cards.forEach(async (card) => {
            const mainImageDiv = document.querySelector(".main-img");
            const adaptiveClrs = document.querySelectorAll(".adaptive-clr");
        
            const bgImageUrl = window.getComputedStyle(mainImageDiv).backgroundImage;
            const imageUrl = bgImageUrl.slice(5, -2);

            const tempImage = new Image();
            tempImage.crossOrigin = "Anonymous";
            tempImage.src = imageUrl;
        
            tempImage.onload = async function () {
                const palette = await extractColor(tempImage);
                const primary = palette[0]; 
        
                const darkenedPrimary = darkenColor(primary, 0.8);
        
                adaptiveClrs.forEach((adaptiveClr) => {
                    adaptiveClr.style.background = `rgb(${darkenedPrimary.join(",")})`;
        
                    const luminance = (0.299 * darkenedPrimary[0] + 0.587 * darkenedPrimary[1] + 0.114 * darkenedPrimary[2]) / 255;
        
                    const img = adaptiveClr.querySelector("img");
                    if (luminance > 0.7) { 
                        img.style.filter = "brightness(0)"; 
                    } else {
                        img.style.filter = "brightness(1)"; 
                    }
                });
    
            };
        

            function extractColor(image) {
                return new Promise((resolve) => {
                    const getPalette = () => colorThief.getPalette(image, 4);
        
                    if (image.complete) {
                        return resolve(getPalette());
                    }
        
                    image.onload = () => {
                        resolve(getPalette());
                    };
                });
            }
        

            function darkenColor(rgbArray, factor) {
                return rgbArray.map(channel => Math.max(0, Math.min(255, channel * factor)));
            }
        });

    }

    function createSongCard(song, isInPlaylist = false) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        cardDiv.innerHTML = `
            <div class="card-left">
                <img class="mini-pic" src="${song.imageLink}">
                <div class="sng-txt">
                    <h3>${song.title} <span>${song.album}<span></h3>
                    <h3 class="artist">${song.artist}</h3>
                    <h3 class="plays">${song.plays}</h3>

                </div>
            </div>
            <div class="card-right">
                <p>${song.length}</p>
                <img data-song-id="${song.id}" class="addlib" src="/images/libIcon.png" style="opacity: ${isInPlaylist ? '0.5' : '1'};">
                <img class="next" src="/images/next.png" data-song-id="${song.id2}">
                <img class="play-pause" src="/images/smplIcon.png">
            </div>
        `;

        const playPauseIcon = cardDiv.querySelector('.play-pause');
        playPauseIcon.addEventListener('click', sample);

        return cardDiv;
    }

    loadSongs().then(() => {
        const libIcons = document.querySelectorAll(".addlib");
        const playNext = document.querySelectorAll(".next");


        for (let i = 0; i < libIcons.length; i++){
            libIcons[i].addEventListener("click", addToPlaylist)
            playNext[i].addEventListener("click", playSongNext)
        }
    });


    let sngCopy;
    let crntThis;
    let hideTimeout;

    function hideElementAfterDelay(element) {

        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }


        hideTimeout = setTimeout(function() {
            element.style.display = "none";
        }, 10000);
    }

    alreadyIn = document.getElementById("sng-alrdy-in-pl");
    firstSpan = document.getElementById("one");
    subTxt = document.getElementById("sub-txt");
    confirmBtns = document.getElementById("cnfrm-btns");
    confirmBtnsAll = document.querySelectorAll(".confirm");
    playlistT = document.getElementById("playlist");

    let songAdded = false;

    confirmBtnsAll[0].addEventListener("click", addorClose);
    confirmBtnsAll[1].addEventListener("click", addorClose);

    function addToPlaylist() {
        songAdded = false;
        crntThis = this;
        
        firstSpan.innerHTML = `<img src="/images/error.png" alt="">${toggleTranslation("Add song to the playlist?")}`;

        if(lngImg.style.background.includes("gbFlag.jpg")){
             firstSpan.innerHTML = `<img src="/images/error.png" alt="">Lägg till låt i spellistan?`
        }
        subTxt.innerText = "";
        subTxt.style.display = "none";
        confirmBtns.style.display = "flex";

        

        hideElementAfterDelay(alreadyIn);
    
        if (this.style.opacity == 1) {
            alreadyIn.style.display = "flex";
            sngCopy = this.parentElement.parentElement.outerHTML;
    
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = sngCopy;
    
            const playsElement = tempDiv.querySelector(".plays");
            if (playsElement) {
                playsElement.style.display = "none";
            }
    
            const artistElement = tempDiv.querySelector(".artist");
            if (artistElement) {
                artistElement.style.display = "unset";
            }
    
            const playPauseIcon = tempDiv.querySelector('.play-pause');
            if (playPauseIcon) {
                playPauseIcon.addEventListener('click', sample);
            }
    
            sngCopy = tempDiv.innerHTML;
            const songId = this.getAttribute("data-song-id");
            crntThis.dataset.songId = songId;
        } else if (this.style.opacity == 0.5) {
            subTxt.style.display = "unset";
            alreadyIn.style.display = "flex";
            firstSpan.innerHTML = `<img src="/images/error.png" alt="">${toggleTranslation("Song Couldn't Be Added To the Playlist")}`;
            subTxt.innerText = toggleTranslation(
                "The following song has already been added to the playlist Queue. Try again later when the song is not in the playlist Queue."
            );

            if(lngImg.style.background.includes("gbFlag.jpg")){
                firstSpan.innerHTML = `<img src="/images/error.png" alt="">Låten kunde inte läggas till i spellistan`;
                subTxt.innerText = "Följande låt har redan lagts till i spellistan. Försök igen senare när låten inte finns i spellistan."
        
            }
            confirmBtns.style.display = "none";
            hideElementAfterDelay(alreadyIn);
        }
    
        exitError.addEventListener("click", () => {
            alreadyIn.style.display = "none";
        });
    }

function addorClose() {

    if (this.textContent == "Yes" || this.textContent == "Ja" && !songAdded) {
        songAdded = true; 

        firstSpan.innerHTML = `<img src="/images/check.png" alt="">${toggleTranslation("Song Has Been Added To The Playlist!")}`;
        if(lngImg.style.background.includes("gbFlag.jpg")){
            firstSpan.innerHTML = `<img src="/images/check.png" alt=""> Låten har lagts till i spellistan!`;
        }

        subTxt.style.display = "none";
        confirmBtns.style.display = "none";
        hideElementAfterDelay(alreadyIn)


        const songElement = document.createElement('div');
        songElement.innerHTML = sngCopy;

        const newPlayPauseIcon = songElement.querySelector('.play-pause');
        if (newPlayPauseIcon) {
            newPlayPauseIcon.addEventListener('click', sample);
        }

        playlistT.appendChild(songElement.firstElementChild);

        const songId = crntThis.getAttribute("data-song-id");
        const allInstances = document.querySelectorAll(`[data-song-id="${songId}"]`);
        allInstances.forEach(instance => {
            instance.style.opacity = "0.5";
        });
    }

    if (this.textContent == "No"|| this.textContent == "Nej") {
        alreadyIn.style.display = "none";
    }
}
   
    let beenScanned

    function playSongNext() {
        alreadyIn = document.getElementById("sng-alrdy-in-pl");
        firstSpan = document.getElementById("one");
        subTxt = document.getElementById("sub-txt");
        confirmBtns = document.getElementById("cnfrm-btns");
        confirmBtnsAll = document.querySelectorAll(".confirm");

        const currentNextButton = this;
        const songId = this.getAttribute("data-song-id"); 
    
        confirmBtnsAll[0].textContent = toggleTranslation("Scanned");
        confirmBtnsAll[1].textContent = toggleTranslation("Not Scanned");
        
        for (let i = 0; i < confirmBtnsAll.length; i++) {
            confirmBtnsAll[i].addEventListener("click", nextOrNot);
        }
    

        exitError.addEventListener("click", () => {
            alreadyIn.style.display = "none";
        });
    

        alreadyIn.style.display = "flex";
        subTxt.style.display = "unset";
        firstSpan.innerHTML = `<img src="/images/error.png" alt="">${toggleTranslation("Scan The Check")}`;
        subTxt.innerText = toggleTranslation(
            "Please scan the check that you received for your purchase to play the song next. If you don't have a check, it can be obtained by purchasing anything in the bar."
        );

        if(lngImg.style.background.includes("gbFlag.jpg")){
            firstSpan.innerHTML = `<img src="/images/error.png" alt="">Skanna kvittot`;
            subTxt.innerText = 
                "Skanna kvittot som du fick vid köpet för att spela låten härnäst. Om du inte har ett kvitto, kan du få ett genom att köpa något i baren.";
        }

        confirmBtns.style.display = "flex";
        hideElementAfterDelay(alreadyIn)


        if (currentNextButton.style.opacity == "0.5" || beenScanned) {
            subTxt.style.display = "unset";
            alreadyIn.style.display = "flex";
            firstSpan.innerHTML = `<img src="/images/error.png" alt="">${toggleTranslation("Song Couldn't Be Played Next")}`;
            subTxt.innerText = toggleTranslation(
                "A song has already been chosen to be played next. Wait until the next song starts to play and try again."
            );
            
            if(lngImg.style.background.includes("gbFlag.jpg")){
                firstSpan.innerHTML = `<img src="/images/error.png" alt="">Låten kunde inte spelas härnäst`;
                subTxt.innerText = "En låt har redan valts att spelas härnäst. Vänta tills nästa låt börjar spela och försök igen.";
            }  
            
            confirmBtns.style.display = "none";
            hideElementAfterDelay(alreadyIn)

        }
    

        function nextOrNot() {

            if (this.textContent === toggleTranslation("Not Scanned")) {
                confirmBtns.style.display = "none";
                subTxt.style.display = "unset";
                firstSpan.innerHTML = '<img src="/images/error.png" alt="">Failed To Scan The Check';
                subTxt.innerText = "Please try scanning the check again, and ensure that the check has not already been scanned. If the problem persists, talk to the available staff.";

                
                hideElementAfterDelay(alreadyIn)
                
            }
            if(lngImg.style.background.includes("gbFlag.jpg")){
                firstSpan.innerHTML = `<img src="/images/error.png" alt="">Kunde inte skanna kvittot`;
                subTxt.innerText = "Försök att skanna kvittot igen och se till att det inte redan har skannats. Om problemet kvarstår, tala med personalen.";
            }        
    

            if (this.textContent === toggleTranslation("Scanned")) {
                const allNextButtons = document.querySelectorAll(`.next[data-song-id="${songId}"]`);
    
                allNextButtons.forEach(button => {
                    button.style.opacity = "0.5";
                });

                beenScanned = true
    
                confirmBtns.style.display = "none";
                firstSpan.innerHTML = `<img src="/images/check.png" alt="">${toggleTranslation("The song is going to play next!")}`;
                subTxt.innerText = toggleTranslation(
                    "The chosen song will start playing after the current one finishes. Enjoy the listen!"
                );

                if(lngImg.style.background.includes("gbFlag.jpg")){
                    firstSpan.innerHTML = `<img src="/images/check.png" alt="">Låten kommer att spelas härnäst!`;
                    subTxt.innerText = "Den valda låten börjar spelas när den nuvarande är klar. Trevlig lyssning!";
                }        
                subTxt.style.display = "unset";
                hideElementAfterDelay(alreadyIn)


            }
        }
    }

});




let prevSample = null;
let currentAudioContext = null;
let currentSource = null;

function playSample(audioUrl) {

    if (currentAudioContext) {
        currentAudioContext.close(); 
        currentAudioContext = null;
    }


    currentAudioContext = new (window.AudioContext || window.webkitAudioContext)();

    fetch(audioUrl)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => currentAudioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            const duration = audioBuffer.duration;
            const maxStartTime = duration - 15;
            const startTime = Math.random() * maxStartTime;


            const source = currentAudioContext.createBufferSource();
            source.buffer = audioBuffer;


            const gainNode = currentAudioContext.createGain();
            source.connect(gainNode).connect(currentAudioContext.destination);


            const fadeDuration = 2;
            gainNode.gain.setValueAtTime(0, currentAudioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(1, currentAudioContext.currentTime + fadeDuration);
            const fadeOutStart = currentAudioContext.currentTime + 15 - fadeDuration;
            gainNode.gain.setValueAtTime(1, fadeOutStart);
            gainNode.gain.linearRampToValueAtTime(0, fadeOutStart + fadeDuration);

            source.start(0, startTime, 15);
            currentSource = source;

            source.onended = () => {
                currentAudioContext.close();
                currentAudioContext = null;
                currentSource = null;
                if (prevSample) {
                    prevSample.src = "/images/smplIcon.png";
                    prevSample.parentElement.parentElement.style.background = "unset";
                    prevSample.parentElement.parentElement.style.backdropFilter = "unset";
                }
                prevSample = null;
            };
        })
        .catch(error => console.error("Error loading audio:", error));

    
}



function sample() {

    if (prevSample === this) {
        this.src = "/images/smplIcon.png";
        this.parentElement.parentElement.style.background = "unset";
        this.parentElement.parentElement.style.backdropFilter = "unset";
        

        if (currentAudioContext) {
            currentAudioContext.close();
            currentAudioContext = null;
        }
        
        prevSample = null;
        return;
    }


    if (prevSample) {
        prevSample.src = "/images/smplIcon.png";
        prevSample.parentElement.parentElement.style.background = "unset";
        prevSample.parentElement.parentElement.style.backdropFilter = "unset";
    }


    this.src = "/images/playing.png";
    this.parentElement.parentElement.style.background = "rgba(20, 20, 20, 0.24)";
    this.parentElement.parentElement.style.backdropFilter = "blur(33px)";


    playSample('/audio/prepareForEscape.mp3');    
    prevSample = this;
}

function myFunction() {
    const notFound = document.getElementById("unfound");
    const input = document.getElementById('search'); 
    const filter = input.value.toUpperCase();  
    const libraryT = document.getElementById("library");
    const cardT = libraryT.getElementsByClassName('card'); 
    
    let anyVisible = false; 

    for (let i = 0; i < cardT.length; i++) {
        const songTitle = cardT[i].getElementsByClassName("sng-txt")[0];
        const songArtist = cardT[i].getElementsByClassName("artist")[0]; 
        
        if (songTitle && songArtist) { 
            const txtValueTitle = songTitle.getElementsByTagName("h3")[0].textContent || songTitle.getElementsByTagName("h3")[0].innerText; 
            const txtValueArtist = songArtist.textContent || songArtist.innerText; 


            if (txtValueTitle.toUpperCase().indexOf(filter) > -1 || txtValueArtist.toUpperCase().indexOf(filter) > -1) {
                cardT[i].style.display = "flex"; 
                anyVisible = true; 
            } else {
                cardT[i].style.display = "none"; 
            }
        }
    }

    notFound.style.display = anyVisible ? "none" : "flex";
    libraryT.style.justifyContent = anyVisible ? "start" : "center";
}

const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: [],
        capsKey: null,
    },

    properties: {
        value: "",
        capsLock: false,
        keyboardInputs: null,
        keyLayout: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "0",
            "backspace",
            "q",
            "w",
            "e",
            "r",
            "t",
            "y",
            "u",
            "i",
            "o",
            "p",
            "caps",
            "a",
            "s",
            "d",
            "f",
            "g",
            "h",
            "j",
            "k",
            "l",
            "enter",
            "done",
            "z",
            "x",
            "c",
            "v",
            "b",
            "n",
            "m",
            ",",
            ".",
            "?",
            "space",
        ],
    },

    init() {

        this.elements.main =
            document.createElement("div");
        this.elements.main.classList
            .add("keyboard", "keyboard--hidden");
        document.body
            .appendChild(this.elements.main);

        this.elements.keysContainer =
            document.createElement("div");
        this.elements.keysContainer
            .classList.add("keyboard__keys");
        this.elements.main
            .appendChild(this.elements.keysContainer);

        this.elements.keysContainer
            .appendChild(this._createKeys());
        this.elements.keys =
            this.elements.keysContainer
                .querySelectorAll(".keyboard__key");


        this.properties.keyboardInputs =
            document.querySelectorAll(
                ".use-keyboard-input"
            );
        this.properties
            .keyboardInputs
            .forEach((element) => {
                element.addEventListener("focus", () => {
                    this
                        .open(element.value, (currentValue) => {
                            element.value = currentValue;
                        });
                });
            });
    },

    _createIconHTML(icon_name) {
        return `<span class="material-icons">${icon_name}</span>`;
    },

    _createKeyBtn(iconName, class1, onclick, class2) {
        this.keyElement =
            document.createElement("button");


        this.keyElement
            .setAttribute("type", "button");
        this.keyElement
            .classList.add("keyboard__key");


        this.keyElement
            .classList.add(class1, class2);
        this.keyElement.innerHTML =
            this._createIconHTML(iconName);
        this.keyElement
            .addEventListener("click", onclick);
    },

    _createKeys() {
        const fragment =
            document.createDocumentFragment();

        this.properties.keyLayout.forEach((key) => {
            const insertLineBreak =
                ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            switch (key) {
                case "backspace":
                    this._createKeyBtn(
                        "Delete", "keyboard__key--wide",
                        () => {
                            this.properties.value =
                                this.properties.value.slice(0, -1);
                            this._updateValueInTarget();
                        });
                    break;

                case "caps":
                    this._createKeyBtn(
                        "Capslock",
                        "keyboard__key--activatable",
                        () => {
                            this.elements.capsKey
                                .classList
                                .toggle("keyboard__key--active");
                            this._toggleCapsLock();
                        },
                        "keyboard__key--wide"
                    );
                    this.elements.capsKey = this.keyElement;
                    break;

                case "enter":
                    this._createKeyBtn(
                        "Clear", "keyboard__key--wide",
                        () => {
                            this.properties.value = "";
                            this._updateValueInTarget();
                        });
                    break;

                case "space":
                    this._createKeyBtn(
                        "", "keyboard__key--extra--wide",
                        () => {
                            this.properties.value += " ";
                            this._updateValueInTarget();
                        });
                    break;

                case "done":
                    this._createKeyBtn(
                        "Close",
                        "keyboard__key--dark",
                        () => {
                            this.close();
                            this._updateValueInTarget();
                            this.style.border = 1 + "px solid white"
                        },
                        "keyboard__key--wide"
                    );
                    break;

                default:
                    this._createKeyBtn();
                    this.keyElement.textContent =
                        key.toLowerCase();

                    this.keyElement
                        .addEventListener(
                            "click",
                            () => {
                                this.properties.value +=
                                    this.properties.capsLock
                                        ? key.toUpperCase()
                                        : key.toLowerCase();
                                this._updateValueInTarget();
                            });
                    break;
            }

            fragment.appendChild(this.keyElement);

            if (insertLineBreak) {
                fragment
                    .appendChild(document.createElement("br"));
            }
        });
        return fragment;
    },

    _updateValueInTarget() {
        this.properties.keyboardInputs.forEach((keyboard) => {
            keyboard.value = this.properties.value;
        });
        myFunction(); 
    },

    _toggleCapsLock() {
        this.properties.capsLock =
            !this.properties.capsLock;

        for (let key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent =
                    this.properties.capsLock
                        ? key.textContent.toUpperCase()
                        : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput) {
        this.properties.value =
            initialValue || "";
        this.elements.main
            .classList
            .remove("keyboard--hidden");
    },

    close() {
        this.properties.value =
            this.properties.value;
        this.elements.main
            .classList.add("keyboard--hidden");
    },
};


window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});



function translateLng(){
    const searchBtn = document.getElementById("search-btn")
    const helpBTn = document.getElementById("help-btn")
    const spnText = document.getElementById("spn-txt")
    const pplrText = document.getElementById("pplr-txt")
    const guideTitle = document.getElementById("guide-ttl")
    const gTxt1 = document.getElementById("txt-1")
    const gTxt2 = document.getElementById("txt-2")
    const gTxt3 = document.getElementById("txt-3")
    const libTitle = document.getElementById("library-title")
    const unfound = document.getElementById("unfound")

    const confirm1 = document.getElementById("confirm1")
    const confirm2 = document.getElementById("confirm2")

    let isSwedish = lngImg.style.background.includes("gbFlag.jpg");

    if (isSwedish) {
        lngImg.style.background = `url("/images/gbFlag.jpg") center center / cover no-repeat`;
    } else {
        lngImg.style.background = `url("/images/svFlag.png") center center / cover no-repeat`;
    }

    isSwedish = !isSwedish;


    if (firstSpan.innerHTML.includes("error.png")) {
        firstSpan.innerHTML = `<img src="/images/error.png" alt="">${toggleTranslation(firstSpan.innerText, isSwedish)}`;
    } else if (firstSpan.innerHTML.includes("check.png")) {
        firstSpan.innerHTML = `<img src="/images/check.png" alt="">${toggleTranslation(firstSpan.innerText, isSwedish)}`;
    }
    
    subTxt.innerText = toggleTranslation(subTxt.innerText, isSwedish);


    if (lngImg.style.background == `url("/images/svFlag.png") center center / cover no-repeat`){
        lngImg.style.background = `url("/images/gbFlag.jpg") center center / cover no-repeat`;
        
        searchBtn.innerText = "Sök"
        helpBTn.innerText = "Hjälp"
        searchBar.placeholder = "Sök efter låt, artist, album."
        playlistTitle.textContent = "Nästa I Spellista"
        unfound.textContent = "Låten Kunde Inte Hittas i Biblioteket."
        libTitle.textContent = "Låt bibliotek"
        tabs[2].textContent = "NÄSTA"
        tabs[1].textContent = "TEXT"
        spnText.textContent = "Är känd för Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
        expandTxt.textContent = "Visa Mer"
        pplrText.textContent = "Populärast"
        guideTitle.textContent = "Vanliga Frågor"
        confirm1.textContent = "Ja"
        confirm2.textContent = "Nej"

    gTxt1.innerHTML = `

        Q - Hur lägger jag till en låt i kön?<br>

        <span>
            A - För att lägga till en låt i kön, hitta din låt och tryck på
            <img src="/images/libIcon.png" alt="" class="inline-icon">
        </span>
    `

    gTxt2.innerHTML = `

        Q - Hur spelar jag min låt näst?<br>
        
        <span>
            A - För att spela din låt näst, hitta din låt och tryck på
            <img src="/images/next.png" alt="" class="inline-icon">
        </span>
    `

        gTxt3.innerHTML = `

        Q - Hur lyssnar jag på en bit av en låt?<br>
        
        <span>
            A - För att spela ett kort extrakt från en låt, hitta din låt och tryck på
            <img src="/images/playIcon.png" alt="" class="inline-icon">
        </span>
    `
        return
    }
    
    lngImg.style.background = `url("/images/svFlag.png") center center / cover no-repeat`
    searchBtn.innerText = "Search"
    helpBTn.innerText = "Help"
    playlistTitle.textContent = "Next In Playlist"
    libTitle.textContent = "Song library"
    searchBar.placeholder = "Search by song name, artist, album."
    unfound.textContent = "Song Not Found in The Library."
    tabs[2].textContent = "UP NEXT"
    tabs[1].textContent = "LYRICS"
    spnText.textContent = "Is known for Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    expandTxt.textContent = "Show Less"
    pplrText.textContent = "Popular"
    guideTitle.textContent = "Common Questions"
    confirm1.textContent = "Yes"
    confirm2.textContent = "No"


    gTxt1.innerHTML = `

    Q - How do I add a song to the queue?<br>

    <span>
        A - To add a song to the queue, find the song of your choice and press
        <img src="/images/libIcon.png" alt="" class="inline-icon">
    </span>
`

    gTxt2.innerHTML = `

        Q - How do I play a song next?<br>
        
        <span>
            A - To play a song next, find the song of your choice and press 
            <img src="/images/next.png" alt="" class="inline-icon">
        </span>
    `

        gTxt3.innerHTML = `

        Q - How do I listen to a sample of a song?<br>
        
        <span>
            A - To play a sample, find the song of your choice and press
            <img src="/images/playIcon.png" alt="" class="inline-icon">
        </span>
    `

}

function toggleTranslation(text, isSwedish) {
    if (isSwedish) {
        return translations[text] || text; 
    } else {
        const englishText = Object.keys(translations).find(key => translations[key] === text);
        return englishText || text; 
    }
}