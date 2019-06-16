'use strict';

import utils from '../utils';

function setDefaultTitle() {
    utils.setTitle('Asocial');
}

chrome.tabs.onActivated.addListener(setDefaultTitle);
chrome.tabs.onUpdated.addListener(setDefaultTitle);
