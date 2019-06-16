'use strict'

import blocker from '../blocker.js'

function makeAsocialBlock () {
  /**
   * @constant {HTMLElement} ASOCIAL_BLOCK - substitute for news block.
   */
  const ASOCIAL_BLOCK = document.createElement('div')

  ASOCIAL_BLOCK.classList.add('asocial_block')
  ASOCIAL_BLOCK.textContent = chrome.i18n.getMessage('motivateMessage')

  return ASOCIAL_BLOCK
}

function replaceNewsBlock () {
  /**
   * @constant {HTMLElement} NEWS_BLOCK - substituted news block.
   */
  const NEWS_BLOCK = document.querySelector('#page-manager')

  if (NEWS_BLOCK) {
    const newsParent = NEWS_BLOCK.parentNode

    newsParent.insertBefore(makeAsocialBlock(), NEWS_BLOCK)
    newsParent.removeChild(NEWS_BLOCK)
  }
}

blocker.init('youtube', replaceNewsBlock)
