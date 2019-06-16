export default {
  CHECKING_TIMEOUT: 5000,
  CHECKING_TIMEOUT_BEFORE_LOAD: 300,

  isDisabled: false,
  isHidden: false,
  DOMContentLoaded: false,

  /**
   * check - send response for check rules
   */
  check: function check (network) {
    chrome.runtime.sendMessage(network)

    const checkingTimeout = this.DOMContentLoaded ? this.CHECKING_TIMEOUT : this.CHECKING_TIMEOUT_BEFORE_LOAD

    setTimeout(() => this.check(network), checkingTimeout)
  },

  /**
   * Hide document on init, if we should disable the site
   */
  hideDocument: function () {
    if (this.isHidden) {
      return
    }

    const style = document.createElement('style')

    style.id = 'asocial_lock'
    style.innerHTML = 'html { opacity: 0 }'

    document.head.appendChild(style)
    this.isHidden = true
  },

  /**
   * Show document after init
   */
  showDocument: function () {
    if (!this.isHidden) {
      return
    }

    const style = document.head.querySelector('#asocial_lock')

    if (style) {
      document.head.removeChild(style)
    }
  },

  /**
   * @param  {String} network - name of network(e.g. vk)
   * @param  {Function} newsBlocker - function, which replaces news block to asocial block
   *
   * @returns {Function}
   */
  onMessage: function (network, newsBlocker) {
    /**
     * Block site if needed, or reload when site is blocked but should be shown
     * @param {Boolean} shouldDisable
     */
    return (shouldDisable) => {
      if (this.isDisabled && !shouldDisable) {
        return window.location.reload()
      }

      // If content is loaded but not blocked, block it
      if (shouldDisable && this.DOMContentLoaded) {
        newsBlocker()
        this.showDocument()
        this.isDisabled = true
      }
    }
  },

  /**
   * Set flag when document is loaded
   * @param {String} network - name of network(e.g. vk)
   */
  onDocumentLoaded: function (network) {
    const asocialContentObserver = new MutationObserver(function () {
      chrome.runtime.sendMessage(network)
    })

    this.DOMContentLoaded = true

    asocialContentObserver.observe(document.body, { attributes: true })
  },

  /**
   * init - initialization blocking functions
   *
   * @param  {String} network - name of network(e.g. vk)
   * @param  {Function} newsBlocker - function, which replaces news block to asocial block
   */
  init: function init (network, newsBlocker) {
    const onFirstMessage = (shouldDisable) => {
      // If site should be blocked, hide everything on the page
      if (shouldDisable) {
        this.hideDocument()
        this.isDisabled = true
      }

      chrome.runtime.onMessage.removeListener(onFirstMessage)
      chrome.runtime.onMessage.addListener(this.onMessage(network, newsBlocker))
    }

    chrome.runtime.onMessage.addListener(onFirstMessage)
    this.check(network)

    window.addEventListener('DOMContentLoaded', () => this.onDocumentLoaded(network))
  }
}
