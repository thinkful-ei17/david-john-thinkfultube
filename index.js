const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyDZJrGeV-7If7_Uqly-WHs5VKqzoofvsKE',
    q: searchTerm,
    per_page: 5,
    pageToken: nextPageToken
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  const imgUrl = result.snippet.thumbnails.default.url;
  const imgTitle = result.snippet.title;
  const imgVideoId = result.id.videoId;
  const imgChannelId = result.snippet.channelId;
//   const imgNextPage = data.nextPageToken
//   console.log(imgVideoId);
//   console.log(imgChannelId);
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

let nextPageToken = '';
let lastQuery = '';
// $('.previous').on('click', function (){
    
// })

$('.next').on('click', function(){
    // step 2:log out token
    getDataFromApi(lastQuery, displayYouTubeSearchData);
})
// step 3: Get data from api that is the data that we want. nextpagetoken
// step 4: display the new videos grabbed with nextpagetoken
function displayYouTubeSearchData(data) {
    console.log(data);
    nextPageToken = data.nextPageToken;
    const results = data.items.map((item, index) => renderResult(item));
    $('.js-search-results').html(results);
    // step 1:save the next page token so we can use it so user can use it later
}


function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    lastQuery = query;
    console.log(lastQuery);
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
