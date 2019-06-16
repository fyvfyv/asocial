'use strict'

export default {
  /**
   * Translate HTML content with chrome.i18n
   */
  translateHTML: function translateHTML () {
    const elements = document.querySelectorAll('[data-i18n]')

    Array.prototype.forEach.call(elements, elem => {
      elem.innerHTML = chrome.i18n.getMessage(elem.dataset.i18n)
    })
  }
}
