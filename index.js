const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
let nextPageToken = '';
let lastQuery = '';
let prevPageToken = '';
let prev = false;

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyDZJrGeV-7If7_Uqly-WHs5VKqzoofvsKE',
    q: searchTerm,
    per_page: 5,
    pageToken: prev ? prevPageToken: nextPageToken,
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  const imgUrl = result.snippet.thumbnails.default.url;
  const imgTitle = result.snippet.title;
  const imgVideoId = result.id.videoId;
  const imgChannelId = result.snippet.channelId;
  return `
    <div>
      <h2>${imgTitle}</h2>
      <a data-fancybox href="https://www.youtube.com/watch?v=${imgVideoId}">
        <img src="${imgUrl}">
      </a>
      <p>Link to Channel: <a href="https://www.youtube.com/channel/${imgChannelId}">link</a>
    </div>
    `;
}

$('.previous').on('click', function (){
    prev = true;
    getDataFromApi(lastQuery, displayYouTubeSearchData);
    
})

$('.next').on('click', function(){
    prev = false;
    getDataFromApi(lastQuery, displayYouTubeSearchData);
})

function displayYouTubeSearchData(data) {
    nextPageToken = data.nextPageToken;
    prevPageToken = data.prevPageToken;
    console.log(nextPageToken);
    const results = data.items.map((item, index) => renderResult(item));
    $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    lastQuery = query;
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
