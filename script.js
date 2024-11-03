
// Wrap the rest of your code in the DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {

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
    const tabs = document.querySelectorAll(".tab");
    const cards = document.querySelectorAll(".adaptive-clr");
    const sngCards = document.querySelectorAll(".card");
    const lyrics = document.getElementById("lyrics");
    const artist = document.getElementById("artist");
    const tab = document.getElementById("crnt-tab");
    const page = document.getElementById("crnt-page");
    const ctaHolder = document.getElementById("cta-holder");
    const searchBar = document.getElementById("search");
    const playlist = document.getElementById("playlist");
    const playlistTitle = document.getElementById("playlist-title");
    const libraryTitle = document.getElementById("library-title");
    const library = document.getElementById("library");
    const supposedDisp = document.querySelectorAll("#crnt-page > div");
    const artistTxt = document.getElementById("artist-txt");
    const expandTxt = document.getElementById("expand-txt");
    const addToLib = document.getElementById("add-lib");
    const playNext = document.getElementById("play-next");
    const main = document.getElementById("main");
    const playPause = document.querySelectorAll(".play-pause");
    const exitSearchClick = document.getElementById("exit-search");


    libraryTitle.style.display = "none"

    for (let i = 0; i < playPause.length; i++){
        playPause[i].addEventListener("click", sample)
    }
    
    let flag;
    
    expandTxt.addEventListener("click", expand)
    artistTxt.addEventListener("click", expand)
    function expand(){

        if(flag){
            expandTxt.innerText = "Show more"
            artistTxt.style.overflow = "hidden"
            artistTxt.style.height = "11vh"
            expandTxt.style.marginTop = 10 + "px"
            flag = false
            return
        }
        expandTxt.innerText = "Show less"
        expandTxt.style.marginTop = 0 + "px"
        artistTxt.style.overflow = "unset"
        artistTxt.style.height = "auto"
        flag = true
    
    }


    function handleAction(actionType) {
        const next = document.querySelectorAll(".next");
        const libIcon = document.querySelectorAll(".addlib");

        // Assuming actionType is either "addToLib" or "playNext"
        if (actionType === 'addToLib' || actionType === 'playNext') {
            searchBar.focus();
        }

        if (actionType === 'addToLib'){
            for(let i = 0; i < next.length; i++){
                next[i].style.display = "none"
                libIcon[i].style.display = "unset"
            }
        }

        if (actionType === 'playNext'){
            for(let i = 0; i < libIcon.length; i++){
                libIcon[i].style.display = "none"
                next[i].style.display = "unset"
            }
        }
    
        // Add any other logic for handling these actions here
    }

    // Example of triggering handleAction based on action type
    addToLib.addEventListener('click', () => handleAction('addToLib'));
    playNext.addEventListener('click', () => handleAction('playNext'));

    
    let prevElem;
    let prevDisp;

    checkTab(tab);
    
    searchBar.addEventListener("click", searchLib);
    addToLib.addEventListener("click", searchLib);
    playNext.addEventListener("click", searchLib);
    exitSearchClick.addEventListener("click", exitSearch);

    function searchLib() {
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
        const next = document.querySelectorAll(".next");
        const libIcon = document.querySelectorAll(".addlib");
        playlistTitle.style.display = "unset"
        libraryTitle.style.display = "none"

        library.style.display = "none";
        prevElem.style.display = prevDisp;
        searchWrapper.style.borderBottom = 2+"px solid #5E5E5E"
        searchGlass.style.opacity = "0.5"
        Array.from(leftColumnChildren).forEach(child => {
            child.classList.remove("offscreen");
        });
        exitSearchClick.style.display = "none"
        leftColumn.style.overflowX = "unset"
        
        leftColumn.style.display = "flex"
        rightColumn.style.gridColumn = "2/3"
        searchWrapper.style.width = 41 + "vw"
        
        for(let i = 0; i < next.length; i++){
            next[i].style.display = "none"
            libIcon[i].style.display = "none"
        }
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
        if (tab.textContent === "UP NEXT") {
            playlist.style.display = "flex";
        } else {
            playlist.style.display = "none";
        }

        if (tab.textContent === "LYRICS") {
            lyrics.style.display = "grid";
        } else {
            lyrics.style.display = "none";
        }

        if (tab.textContent === "ARTIST") {
            artist.style.display = "flex";
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

    // create a ColorThief instance
    const colorThief = new ColorThief();

    cards.forEach(async (card) => {
        const mainImageDiv = document.querySelector(".main-img"); // Assuming this is the div with the background image

        // Extract the image URL from the background-image style
        const bgImageUrl = window.getComputedStyle(mainImageDiv).backgroundImage;
        const imageUrl = bgImageUrl.slice(5, -2); // Stripping off the 'url("")' part

        // Create a temporary image element to load the background image
        const tempImage = new Image();
        tempImage.crossOrigin = "Anonymous"; // Make sure to handle CORS if the image is from a different domain
        tempImage.src = imageUrl;

        // Wait for the image to load
        tempImage.onload = async function () {
            // Get the color palette from the image using ColorThief
            const palette = await extractColor(tempImage);

            const primary = palette[0].join(",");
            const secondary = palette[1].join(",");

            // Change color
            card.style.background = `rgb(${primary})`;
            card.style.color = `rgb(${secondary})`;
        };
    });

    // async function to extract the color palette
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

    // Function to shuffle and get 10 random songs
    function getRandomSongs(songs, count = 10) {
        const shuffled = songs.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // Function to load songs from JSON and create cards
    async function loadSongs() {
        try {
            // Fetch JSON data for songs
            const response = await fetch('songs.json');
            const songs = await response.json();

            // Display all songs in the library
            songs.forEach(song => {
                const cardDiv = createSongCard(song);
                library.appendChild(cardDiv);
            });

            // Select 10 random songs and display them in the playlist
            const randomSongs = getRandomSongs(songs);
            randomSongs.forEach(song => {
                const cardDiv = createSongCard(song);
                playlist.appendChild(cardDiv);
            });

        } catch (error) {
            console.error('Error loading songs:', error);
        }
    }

    // Helper function to create a song card
    function createSongCard(song) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        // Populate card with song data using your HTML structure
        cardDiv.innerHTML = `
            <div class="card-left">
                <img class="mini-pic" src="${song.imageLink}">
                <div class="sng-txt">
                    <h3>${song.title} <span>${song.album}<span></h3>
                    <h3 class="artist">${song.artist}</h3>
                </div>
            </div>
            <div class="card-right">
                <p>${song.length}</p>
                <img class="addlib" src="/images/libIcon.png">
                <img class="next" src="/images/next.png">
                <img class="play-pause" src="/images/smplIcon.png">
            </div>
        `;

        // Add event listener for play/pause toggle
        const playPauseIcon = cardDiv.querySelector('.play-pause');
        playPauseIcon.addEventListener('click', sample);

        return cardDiv;
    }

    // Load songs on page load
    loadSongs();
});



let prevSample = null;

function sample() {
    if (prevSample === this) {
        this.src = "/images/smplIcon.png";
        this.parentElement.parentElement.style.background = "unset";
        this.parentElement.parentElement.style.backdropFilter = "unset";
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

    prevSample = this;

}
function myFunction() {
    // Declare variables
    var input, filter, libraryT, cardT, songTitle, songArtist, i, txtValueTitle, txtValueArtist;

    input = document.getElementById('search');  // Get the search input
    filter = input.value.toUpperCase();          // Convert the input to uppercase for case-insensitive comparison
    libraryT = document.getElementById("library"); // Get the library element
    cardT = libraryT.getElementsByClassName('card'); // Get all song cards

    // Loop through all cards, and hide those who don't match the search query
    for (i = 0; i < cardT.length; i++) {
        songTitle = cardT[i].getElementsByClassName("sng-txt")[0]; // Get song text container
        songArtist = cardT[i].getElementsByClassName("artist")[0]; // Get artist element
        
        if (songTitle && songArtist) { // Check if both song title and artist elements exist
            txtValueTitle = songTitle.getElementsByTagName("h3")[0].textContent || songTitle.getElementsByTagName("h3")[0].innerText; // Get the song title text
            txtValueArtist = songArtist.textContent || songArtist.innerText; // Get the artist text

            // Compare the text with the filter
            if (txtValueTitle.toUpperCase().indexOf(filter) > -1 || txtValueArtist.toUpperCase().indexOf(filter) > -1) {
                cardT[i].style.display = "flex";  // Show card if it matches either the title or artist
            } else {
                cardT[i].style.display = "none";   // Hide card if it doesn't match
            }
        }
    }
}
