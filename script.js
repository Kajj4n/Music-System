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
// Wrap the rest of your code in the DOMContentLoaded event listener
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

    // Example of triggering handleAction based on action type
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
    
        // Hide the virtual keyboard
        Keyboard.close();
    }
    

    // Select only the <p> inside the #lyrics container
    const lyricsParagraph = document.querySelector("#lyrics p");
    const lyricsText = lyricsParagraph.innerText;

    // Replace each newline with a <br> tag for single line breaks
    const formattedLyrics = lyricsText.replace(/\n\s*\n/g, "<br><br>").replace(/\n/g, "<br>");

    // Update only the <p> with formatted HTML, leaving #size-ctrl unaffected
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

    // Play the audio as soon as the page loads (optional)
    audio.play();

    // Update progress bar and current time
    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;

        // Update the progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = progressPercent + '%';

        // Update the current time display
        currentTimeElement.textContent = formatTime(currentTime);
    });

    // Update the duration when the metadata is loaded
    audio.addEventListener('loadedmetadata', () => {
        durationElement.textContent = formatTime(audio.duration);
    });

    // Format time in minutes and seconds
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // Optional: Click on progress bar to change audio current time
    progressBar.addEventListener('click', (e) => {
        const width = progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;

        // Set the new current time based on the clicked position
        audio.currentTime = (clickX / width) * duration;
    });

    const fontSizeRange = document.getElementById('font-size-slider');
    const lyricsT = document.getElementById('lyrics-txt');

    // Set initial font size
    lyricsT.style.fontSize = fontSizeRange.value + 'px';

    // Update font size based on input range value
    fontSizeRange.addEventListener('input', function() {
        lyricsT.style.fontSize = fontSizeRange.value + 'px';
    });

   
});

// Wrap the rest of your code in the DOMContentLoaded event listener
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

    // Set to track songs in the current playlist by `title`
    const playlistSongs = new Set();

    function getRandomSongs(songs, count = 10) {
        const shuffled = [...songs].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // Inside the existing `loadSongs` function in your second DOMContentLoaded event listener

    async function loadSongs() {
        try {
            const response = await fetch('songs.json');
            const songs = await response.json();

            // Select 10 random songs and pick one for meta-data
            const randomSongs = getRandomSongs(songs);
            const songForMetaData = randomSongs.pop();
            updateMetaData(songForMetaData, songs);

            // Add remaining 9 songs to the playlist and track their titles
            randomSongs.forEach(song => {
                playlistSongs.add(song.title); // Track each song by its title
                const cardDiv = createSongCard(song);
                playlist.appendChild(cardDiv);
            });

            // Shuffle all songs again to randomize their display in the library
            const shuffledSongs = [...songs].sort(() => 0.5 - Math.random());

            // Display all songs in the library and update opacity for those in the playlist
            shuffledSongs.forEach(song => {
                const isInPlaylist = playlistSongs.has(song.title);
                const cardDiv = createSongCard(song, isInPlaylist);
                library.appendChild(cardDiv);
            });

            // New: Clone song cards to the artist page
            cloneSongsToArtistPage(songs, songForMetaData.artist);

        } catch (error) {
            console.error('Error loading songs:', error);
        }
    }

    // New function to clone songs for the artist page
    function cloneSongsToArtistPage(songs, artist) {
        const artistSongsContainer = document.querySelector('#artist #context'); // Update to match your artist section
        const matchingSongs = songs.filter(song => song.artist === artist);
    
        matchingSongs.forEach(song => {
            const isInPlaylist = playlistSongs.has(song.title); // Check if this song is in the playlist
    
            // Create song card or element
            const cardDiv = createSongCard(song); // Assuming createSongCard is defined elsewhere
    
            // Find the existing library icon in the card
            const existingIcon = cardDiv.querySelector('.addlib');
            
            // Update the opacity of the existing icon based on whether the song is in the playlist
            if (existingIcon) {
                existingIcon.style.opacity = isInPlaylist ? '0.5' : '1'; // Set opacity based on playlist status
            }
    
            // Append the card to the artist section
            artistSongsContainer.appendChild(cardDiv); // Append the card to the artist section
        });
    }

    function updateMetaData(song, allSongs) {
        // Update main song details
        const mainImg = document.querySelector(".main-img");
        mainTitle.textContent = song.title;
        mainAlbum.textContent = song.album;
        audioElement.querySelector("source").src = song.audioLink;
        audioElement.load();
        mainImg.style.background = `url("${song.imageLink}") rgb(0, 0, 0) 100% / cover no-repeat`;

        // Set the background for `body::before` with song image
        const style = document.createElement('style'); 
        style.innerHTML = `
            body::before {
                background: url("${song.imageLink}") center center / cover no-repeat;
            }
        `;
        document.head.appendChild(style);

        // Populate the artist section with `songForMetaData` details
        artistNameElement.textContent = song.artist;
        artistImageElement.style.backgroundImage = `url("${song.imageLink}")`;
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
        
            // Extract the image URL from the background-image style
            const bgImageUrl = window.getComputedStyle(mainImageDiv).backgroundImage;
            const imageUrl = bgImageUrl.slice(5, -2); // Stripping off the 'url("")' part
        
            // Create a temporary image element to load the background image
            const tempImage = new Image();
            tempImage.crossOrigin = "Anonymous"; // Handle CORS if needed
            tempImage.src = imageUrl;
        
            tempImage.onload = async function () {
                // Get the color palette from the image using ColorThief
                const palette = await extractColor(tempImage);
                const primary = palette[0]; // RGB array, e.g., [r, g, b]
        
                // Darken the primary color by 20%
                const darkenedPrimary = darkenColor(primary, 0.8);
        
                // Apply the darkened primary color to each .adaptive-clr element
                adaptiveClrs.forEach((adaptiveClr) => {
                    adaptiveClr.style.background = `rgb(${darkenedPrimary.join(",")})`;
        
                    // Calculate luminance to determine if the color is bright
                    const luminance = (0.299 * darkenedPrimary[0] + 0.587 * darkenedPrimary[1] + 0.114 * darkenedPrimary[2]) / 255;
        
                    // Set image color based on luminance
                    const img = adaptiveClr.querySelector("img");
                    if (luminance > 0.7) { // Adjust threshold as needed
                        img.style.filter = "brightness(0)"; // Makes the image black
                    } else {
                        img.style.filter = "brightness(1)"; // Keeps the image original color
                    }
                });
    
            };
        
            // Function to extract color palette
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
        
            // Function to darken the color by applying a factor
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

    
    // Declare a global variable to store the timeout ID
    let hideTimeout;

    function hideElementAfterDelay(element) {
        // Clear any existing timeout to prevent overlapping timeouts
        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }

        // Set a new timeout to hide the element after 5 seconds
        hideTimeout = setTimeout(function() {
            element.style.display = "none";
        }, 10000);
    }

    // Define variables and event listeners once outside of `addToPlaylist`
    alreadyIn = document.getElementById("sng-alrdy-in-pl");
        

    // Define variables and event listeners once outside of `addToPlaylist`
    firstSpan = document.getElementById("one");
    subTxt = document.getElementById("sub-txt");
    confirmBtns = document.getElementById("cnfrm-btns");
    confirmBtnsAll = document.querySelectorAll(".confirm");
    playlistT = document.getElementById("playlist");

    // Flag to prevent multiple additions
    let songAdded = false;

    // Set up confirmation button event listeners once
    confirmBtnsAll[0].addEventListener("click", addorClose);
    confirmBtnsAll[1].addEventListener("click", addorClose);

    function addToPlaylist() {
        // Reset the songAdded flag to false whenever addToPlaylist is called
        songAdded = false;
        crntThis = this;
        
        // Add translations for the text inside firstSpan and subTxt
        firstSpan.innerHTML = `<img src="/images/error.png" alt="">${toggleTranslation("Add song to the playlist?")}`;

        if(lngImg.style.background.includes("gbFlag.jpg")){
             firstSpan.innerHTML = `<img src="/images/error.png" alt="">Lägg till låt i spellistan?`
        }
        subTxt.innerText = "";
        subTxt.style.display = "none";
        confirmBtns.style.display = "flex";
        
        confirmBtnsAll[0].textContent = toggleTranslation("Yes");
        confirmBtnsAll[1].textContent = toggleTranslation("No");
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
    
        // Handle closing error message
        exitError.addEventListener("click", () => {
            alreadyIn.style.display = "none";
        });
    }

function addorClose() {
    // Only proceed if the song has not already been added
    if (this.textContent == "Yes" && !songAdded) {
        songAdded = true;  // Set flag to true to prevent further additions

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

    if (this.textContent == "No") {
        alreadyIn.style.display = "none";
    }
}
   
    let beenScanned

    function playSongNext() {
        // Elements for display and confirmation
        alreadyIn = document.getElementById("sng-alrdy-in-pl");
        firstSpan = document.getElementById("one");
        subTxt = document.getElementById("sub-txt");
        confirmBtns = document.getElementById("cnfrm-btns");
        confirmBtnsAll = document.querySelectorAll(".confirm");
    
        // Reference to the current "next" button and its song ID
        const currentNextButton = this;
        const songId = this.getAttribute("data-song-id"); // Get song's unique ID
    
        // Set up confirmation buttons
        confirmBtnsAll[0].textContent = toggleTranslation("Scanned");
        confirmBtnsAll[1].textContent = toggleTranslation("Not Scanned");
        
        for (let i = 0; i < confirmBtnsAll.length; i++) {
            confirmBtnsAll[i].addEventListener("click", nextOrNot);
        }
    
        // Close error dialog on clicking exit
        exitError.addEventListener("click", () => {
            alreadyIn.style.display = "none";
        });
    
        // Show prompt to scan the check
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

        // Check if song is already marked to play next (opacity 0.5)
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
    
        // Function to handle confirmation
        function nextOrNot() {
            // If "Not Scanned" is chosen
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
    
            // If "Scanned" is chosen, update opacity for all buttons with the same song ID
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
    // Stop any currently playing audio if necessary
    if (currentAudioContext) {
        currentAudioContext.close(); // Stop and close the current AudioContext
        currentAudioContext = null;
    }

    // Create a new AudioContext for the new sample
    currentAudioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Fetch and play the audio with fade-in/out
    fetch(audioUrl)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => currentAudioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            const duration = audioBuffer.duration;
            const maxStartTime = duration - 15;
            const startTime = Math.random() * maxStartTime;

            // Create a new source for the sample
            const source = currentAudioContext.createBufferSource();
            source.buffer = audioBuffer;

            // Set up gain node for fade-in/fade-out
            const gainNode = currentAudioContext.createGain();
            source.connect(gainNode).connect(currentAudioContext.destination);

            // Fade-in and fade-out settings
            const fadeDuration = 2;
            gainNode.gain.setValueAtTime(0, currentAudioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(1, currentAudioContext.currentTime + fadeDuration);
            const fadeOutStart = currentAudioContext.currentTime + 15 - fadeDuration;
            gainNode.gain.setValueAtTime(1, fadeOutStart);
            gainNode.gain.linearRampToValueAtTime(0, fadeOutStart + fadeDuration);

            // Start playing and assign source to global variable
            source.start(0, startTime, 15);
            currentSource = source;

            // Reset visuals when playback ends
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
    // If this sample is already playing, stop it and reset visuals
    if (prevSample === this) {
        this.src = "/images/smplIcon.png";
        this.parentElement.parentElement.style.background = "unset";
        this.parentElement.parentElement.style.backdropFilter = "unset";
        
        // Stop the current audio playback
        if (currentAudioContext) {
            currentAudioContext.close();
            currentAudioContext = null;
        }
        
        prevSample = null;
        return;
    }

    // Reset visuals of the previous sample if it exists
    if (prevSample) {
        prevSample.src = "/images/smplIcon.png";
        prevSample.parentElement.parentElement.style.background = "unset";
        prevSample.parentElement.parentElement.style.backdropFilter = "unset";
    }

    // Set visuals for the new sample
    this.src = "/images/playing.png";
    this.parentElement.parentElement.style.background = "rgba(20, 20, 20, 0.24)";
    this.parentElement.parentElement.style.backdropFilter = "blur(33px)";

    // Play the new sample
    playSample('/audio/prepareForEscape.mp3');    

    // Update prevSample to this one
    prevSample = this;
}

function myFunction() {
    const notFound = document.getElementById("unfound");
    const input = document.getElementById('search');  // Get the search input
    const filter = input.value.toUpperCase();          // Convert the input to uppercase for case-insensitive comparison
    const libraryT = document.getElementById("library"); // Get the library element
    const cardT = libraryT.getElementsByClassName('card'); // Get all song cards
    
    let anyVisible = false; // Track if any card is visible

    // Loop through all cards, and hide those who don't match the search query
    for (let i = 0; i < cardT.length; i++) {
        const songTitle = cardT[i].getElementsByClassName("sng-txt")[0]; // Get song text container
        const songArtist = cardT[i].getElementsByClassName("artist")[0]; // Get artist element
        
        if (songTitle && songArtist) { // Check if both song title and artist elements exist
            const txtValueTitle = songTitle.getElementsByTagName("h3")[0].textContent || songTitle.getElementsByTagName("h3")[0].innerText; // Get the song title text
            const txtValueArtist = songArtist.textContent || songArtist.innerText; // Get the artist text

            // Compare the text with the filter
            if (txtValueTitle.toUpperCase().indexOf(filter) > -1 || txtValueArtist.toUpperCase().indexOf(filter) > -1) {
                cardT[i].style.display = "flex";  // Show card if it matches either the title or artist
                anyVisible = true;  // Mark that at least one card is visible
            } else {
                cardT[i].style.display = "none";   // Hide card if it doesn't match
            }
        }
    }

    // Show "unfound" only if no cards are visible
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
        // create and setup main element
        this.elements.main =
            document.createElement("div");
        this.elements.main.classList
            .add("keyboard", "keyboard--hidden");
        document.body
            .appendChild(this.elements.main);

        // create and setup child container component
        this.elements.keysContainer =
            document.createElement("div");
        this.elements.keysContainer
            .classList.add("keyboard__keys");
        this.elements.main
            .appendChild(this.elements.keysContainer);

        // create and setup key elements
        this.elements.keysContainer
            .appendChild(this._createKeys());
        this.elements.keys =
            this.elements.keysContainer
                .querySelectorAll(".keyboard__key");

        // open keyboard for elements with .use-keyboard-input
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

        // add common attributes and classes
        this.keyElement
            .setAttribute("type", "button");
        this.keyElement
            .classList.add("keyboard__key");

        // add specific listeners and classes
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
        myFunction();  // Trigger the search function on each input update
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

    let isSwedish = lngImg.style.background.includes("gbFlag.jpg");

    // Toggle language flag and update background first
    if (isSwedish) {
        lngImg.style.background = `url("/images/gbFlag.jpg") center center / cover no-repeat`;
    } else {
        lngImg.style.background = `url("/images/svFlag.png") center center / cover no-repeat`;
    }

    // Refresh the language state after flag change
    isSwedish = !isSwedish;

    // Ensure `firstSpan` and `subTxt` are updated immediately when the language is toggled
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
        searchBar.placeholder = "Sök efter låtnamn, artist, album."
        playlistTitle.textContent = "Nästa I spellista"
        tabs[2].textContent = "NÄSTA"
        tabs[1].textContent = "LÅTTEXT"
        spnText.textContent = "Är känd för Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
        expandTxt.textContent = "Visa Mer"
        pplrText.textContent = "Populära"
        guideTitle.textContent = "Gränssnittsguide"

    gTxt1.innerHTML = `

        Q - Hur do I add a song to the queue?<br>

        <span>
            A - To add a song to the queue, find the song of your choice and press
            <img src="/images/libIcon.png" alt="" class="inline-icon"> to add it to the queue.
        </span>
    `

    gTxt2.innerHTML = `

        Q - Hur do I play a song next?<br>
        
        <span>
            A - To play a song next, find the song of your choice and press 
            <img src="/images/next.png" alt="" class="inline-icon">  to add it to play it next.
        </span>
    `

        gTxt3.innerHTML = `

        Q - Hur do I listen to a sample of a song?<br>
        
        <span>
            A - To play a sample, find the song of your choice and press
            <img src="/images/playIcon.png" alt="" class="inline-icon">  to play the sample.
        </span>
    `
        return
    }
    
    lngImg.style.background = `url("/images/svFlag.png") center center / cover no-repeat`
    searchBtn.innerText = "Search"
    helpBTn.innerText = "Help"
    playlistTitle.textContent = "Next In Playlist"
    searchBar.placeholder = "Search by song name, artist, album."
    tabs[2].textContent = "UP NEXT"
    tabs[1].textContent = "LYRICS"
    spnText.textContent = "Is known for Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    expandTxt.textContent = "Show Less"
    pplrText.textContent = "Popular"
    guideTitle.textContent = "Interface guide"


    gTxt1.innerHTML = `

    Q - How do I add a song to the queue?<br>

    <span>
        A - To add a song to the queue, find the song of your choice and press
        <img src="/images/libIcon.png" alt="" class="inline-icon"> to add it to the queue.
    </span>
`

    gTxt2.innerHTML = `

        Q - How do I play a song next?<br>
        
        <span>
            A - To play a song next, find the song of your choice and press 
            <img src="/images/next.png" alt="" class="inline-icon">  to add it to play it next.
        </span>
    `

        gTxt3.innerHTML = `

        Q - How do I listen to a sample of a song?<br>
        
        <span>
            A - To play a sample, find the song of your choice and press
            <img src="/images/playIcon.png" alt="" class="inline-icon">  to play the sample.
        </span>
    `

}


// Helper function to toggle text translation
function toggleTranslation(text, isSwedish) {
    if (isSwedish) {
        return translations[text] || text;  // English to Swedish
    } else {
        const englishText = Object.keys(translations).find(key => translations[key] === text);
        return englishText || text;  // Swedish to English
    }
}