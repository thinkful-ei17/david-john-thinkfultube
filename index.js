const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: 'AIzaSyDZJrGeV-7If7_Uqly-WHs5VKqzoofvsKE',
    q: searchTerm,
    per_page: 5
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  const imgUrl = result.snippet.thumbnails.default.url;
  const imgTitle = result.snippet.title;
  const imgVideoId = result.id.videoId;
  const imgChannelId = result.snippet.channelId;
  console.log(imgVideoId);
  console.log(imgChannelId);
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

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}
// function display(data){
//     let displayElem = $('.js-results');
//     data.items.forEach(function (item) {
//         let elem = $('.js-result-template').children().clone();
//         let imgUrl = item.snippet.thumbnails.default.url;
//         let watchUrl = YOUTUBE_SEARCH_URL + item.id.videoId;
//         elem.find('a').attr('href', watchUrl);
//         elem.find('img').attr('src', imgUrl);
//         displayElem.append(elem);
//     });
// }

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
