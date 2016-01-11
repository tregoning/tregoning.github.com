'use strict';

var messages = [],
    links = [],
    commentsContainer = document.getElementById('comments'),
    apiKey  = 'AIzaSyAqum1VKtL_6tCpivQvmYIelSsc0mcnp20',
    endpoint = 'https://www.googleapis.com/youtube/v3/commentThreads?key=' + apiKey + '&textFormat=html&part=snippet&maxResults=100&videoId=' + id;

var fetchAndProcessComments = function(url) {

    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.addEventListener('load', function() {

        var data = this.response;

        messages = messages.concat(data.items.map(function(item) {
            return item.snippet.topLevelComment.snippet.textDisplay;
        }).filter(function(item) {
            return item.indexOf('&amp;t=') !== -1;
        }));

        if (data.nextPageToken) {
            fetchAndProcessComments(endpoint + '&pageToken=' + data.nextPageToken);
        } else {
            processMessages();
        }

    }, false);

    xhr.addEventListener('error', function(e) {
        console.error('error getting the feed', e);
    }, false);

    xhr.responseType = 'json';

    xhr.send();

};

var sortLinks = function() {

    links.sort(function compare(a, b) {

        var aSeconds = parseInt(a.dataset.time, 10),
            bSeconds = parseInt(b.dataset.time, 10);

        if (aSeconds < bSeconds) {
            return -1;
        }

        if (aSeconds > bSeconds) {
            return 1;
        }

        // a must be equal to b
        return 0;

    });
};

var processMessages = function() {

    var docFrag = document.createDocumentFragment();

    messages.forEach(function(message) {

        var node    = document.createElement('div'),
            newLink = document.createElement('a'),
            link;

        node.innerHTML = message;
        link = node.querySelector('a');

        newLink.textContent = node.textContent;
        newLink.setAttribute('href', link.getAttribute('href'));
        newLink.setAttribute('target', '_blank');
        newLink.dataset.time = convertTimeIntoSeconds(link.textContent);

        links.push(newLink);

    });

    sortLinks();

    links.forEach(function(link) {
        docFrag.appendChild(link);
    });

    commentsContainer.appendChild(docFrag);

};

var convertTimeIntoSeconds = function(timeString) {

    var timeSplit     = timeString.split(':'),
        timeInSeconds = 0;

    switch (timeSplit.length) {
        case 2:
            timeInSeconds += 60 * parseInt(timeSplit[0], 10); //minutes
            timeInSeconds += parseInt(timeSplit[1], 10); //seconds
            break;
        case 3:
            timeInSeconds += 3600 * parseInt(timeSplit[0], 10); //hours
            timeInSeconds += 60 * parseInt(timeSplit[1], 10); //minutes
            timeInSeconds += parseInt(timeSplit[2], 10); //seconds
            break;
        default:
            console.error('invalid time string', timeString);
            break;
    }

    return timeInSeconds;
};

var assignEventHandlers = function() {

    document.body.addEventListener('click', function(e) {

        if (e.target.nodeName === 'A') {
            e.preventDefault();
            player.seekTo(e.target.dataset.time, true);
        }

    }, false);

};

var init = function() {
    commentsContainer.style.height = (window.innerHeight / 4) + 'px';
    fetchAndProcessComments(endpoint);
    assignEventHandlers();
};

init();