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
  const NEWS_BLOCK = document.querySelector('#main_feed')
  const RIGHT_COLUMN = document.querySelector('.narrow_column_wrap')

  if (NEWS_BLOCK) {
    const newsParent = NEWS_BLOCK.parentNode

    newsParent.insertBefore(makeAsocialBlock(), NEWS_BLOCK)
    newsParent.removeChild(NEWS_BLOCK)

    if (RIGHT_COLUMN) {
      RIGHT_COLUMN.parentNode.removeChild(RIGHT_COLUMN)
    }
  }
}

blocker.init('vk', replaceNewsBlock)
