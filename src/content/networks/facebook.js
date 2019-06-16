'use strict';

import blocker from '../blocker.js';

function makeAsocialBlock() {
    /**
     * @constant {HTMLElement} ASOCIAL_BLOCK - substitute for news block.
     */
    var ASOCIAL_BLOCK = document.createElement('div');

    ASOCIAL_BLOCK.classList.add('asocial_block');
    ASOCIAL_BLOCK.textContent = chrome.i18n.getMessage('motivateMessage');

    return ASOCIAL_BLOCK;
}

function replaceNewsBlock() {
    /**
     * @constant {HTMLElement} NEWS_BLOCK - substituted news block.
     */
    var NEWS_BLOCK = document.querySelector('#content_container');
    var RIGHT_COLUMN = document.querySelector('#rightCol');
    var LEFT_COLUMN = document.querySelector('#leftCol');

    if (NEWS_BLOCK && (window.location.pathname.indexOf('messages') === -1)) {
        var newsParent = NEWS_BLOCK.parentNode;

        newsParent.insertBefore(makeAsocialBlock(), NEWS_BLOCK);
        newsParent.removeChild(NEWS_BLOCK);
    }

    if (RIGHT_COLUMN) {
        RIGHT_COLUMN.parentNode.removeChild(RIGHT_COLUMN);
    }

    if (LEFT_COLUMN) {
        LEFT_COLUMN.parentNode.removeChild(LEFT_COLUMN);
    }
}

blocker.init('facebook', replaceNewsBlock);
