
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


        
        let crntTab = document.getElementById("crnt-tab");

        if(crntTab.textContent == "ARTIST"){
            page.style.overflowY = "scroll"
            playlistTitle.style.display = "none"
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

        page.style.overflowY = "hidden"
        if (tab.textContent === "UP NEXT") {
            playlist.style.display = "flex";
            playlistTitle.style.display = "unset"
        } else {
            playlist.style.display = "none";
            playlistTitle.style.display = "none"
        }

        if (tab.textContent === "LYRICS") {
            lyrics.style.display = "grid";
        } else {
            lyrics.style.display = "none";
        }

        if (tab.textContent === "ARTIST") {
            artist.style.display = "flex";
            page.style.overflowY = "scroll"
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
                ${song.artist} is known for Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </p>
        `;

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
                </div>
            </div>
            <div class="card-right">
                <p>${song.length}</p>
                <img class="addlib" src="/images/libIcon.png" style="opacity: ${isInPlaylist ? '0.5' : '1'};">
                <img class="next" src="/images/next.png">
                <img class="play-pause" src="/images/smplIcon.png">
            </div>
        `;

        const playPauseIcon = cardDiv.querySelector('.play-pause');
        playPauseIcon.addEventListener('click', sample);

        return cardDiv;
    }

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
