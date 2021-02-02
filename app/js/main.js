'use strict';

function createTag(tag, options) {
    // We create an element by `tag` argument and we assign to it
    //  the properties on `options` object.
    return Object.assign(document.createElement(tag), options);
}

function getBookmarkName(promptStr) {
    // We prompt a bookmark name to user until he enter a valid
    //  (minimum one char)
    let bmName = prompt(promptStr);
    return bmName ? bmName : getBookmarkName(promptStr);
}

// Top-level scope binding for validate if the input url is valid
let validUrl = false;
window.addEventListener('load', () => {
    const urlInput = document.getElementById('url-input');
    const urlButton = document.getElementById('url-button');
    const bmListContainer = document.getElementById('bm-list-container');
    const clearStorage = document.getElementById('clear-storage-btn');

    // If there is some element in localStorage we iterate through it
    //  and then display it inside an `ul` tag.
    if (localStorage.length) {
        bmListContainer.innerHTML = '';
        let ul = createTag('ul', {id: 'bm-list'});
        Object.keys(localStorage).forEach(key => {
            let li = createTag('li', {className: 'bm'});
            let a = createTag('a', {
                className: 'bm-link',
                href: localStorage.getItem(key),
                innerHTML: key,
                target: '_blank'
            });
            li.appendChild(a);
            ul.appendChild(li);
        });
        bmListContainer.appendChild(ul);
    } else {
        // if there is nothing, we just display an `p` tag with `No bookmarkers yet`.
        bmListContainer.innerHTML = '<p>No bookmarks yet</p>';
    }

    // keyup event for validate if the input url is valid using a
    //  regular expression.
    urlInput.addEventListener('keyup', () => {
        let urlRegex = /^https?:\/\/([\w\d]+)\.([a-zA-Z]+)$/;
        validUrl = urlRegex.test(urlInput.value);

        // we also change the font color of the `input` for indicate
        //  if it's valid url to user.
        if (validUrl) urlInput.style.color = '#13e471';
        else urlInput.style.color = '#ff2222';
    });

    urlButton.addEventListener('click', e => {
        if (validUrl) {
            // if we get a valid url we ask to user set a bookmark name
            //  and we store it into localStorage
            let bookmarkerName = getBookmarkName('Set bookmark name');
            localStorage.setItem(bookmarkerName, urlInput.value);
            location.reload();
        } else {
            // else, we prevent the default of the event to avoid reload the page
            e.preventDefault();
        }
    });

    clearStorage.addEventListener('click', () => {
        // if there is some element in localStorage, we clear it.
        if (localStorage.length) {
            localStorage.clear();
            location.reload();
        }
    });
});
