'use strict'

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({
    active: true,
    url: 'options/options.html'
  }, null)
})
