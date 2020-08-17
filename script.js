var resultArray = [];
fetch('https://api.lyrics.ovh/suggest/numb')
.then(response => response.json())
.then(returnedData => {

    // Store 10 Search Results in an Array
    for(let i = 0; i<10; i++) {
        resultArray.push(returnedData.data[i]);
    }

    // Work on individual result
    resultArray.forEach((el, i) => {
        let title = returnedData.data[i].title;
        let artist = returnedData.data[i].artist.name;
        
        // Add html into the DOM
        let searchResultHtml = `<p class="author lead"><strong class="song-title-${i}">${title}</strong> Album by <span class="song-artist-${i}">${artist}</span> <button id="${i}" class="btn btn-success lyrics-button">Get Lyrics</button></p>`;        
        document.getElementById('search-result-list').insertAdjacentHTML('beforeend', searchResultHtml);

    })

    const searchResultList = document.getElementsByClassName('lyrics-button');
    for(let i = 0; i < searchResultList.length; i++) {
        searchResultList[i].addEventListener('click', () => {
            let artist, title;

            artist = document.querySelector(`.song-artist-${i}`).innerHTML;
            title = document.querySelector(`.song-title-${i}`).innerHTML;
            console.log(artist, title);
            
            // Fetch Lyrics from API
            fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
            .then(response => response.json())
            .then(data => console.log(data));
        });
    }
    
});

{/* <p class="author lead"><strong class="song-title-0">Purple Noon</strong> Album by <span class="song-artist-0">Washed Out</span> <button class="get-lyrics-btn-0" class="btn btn-success">Get Lyrics</button></p> */}
