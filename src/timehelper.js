'use strict'

const TimeHelper = {
  /**
   * Parse string for time array.
   *
   * @param {String} str
   * @returns {*}
   */
  parse: function (str) {
    const timePattern = /^([0-9]{1,2})[.:, ]?([0-9]{2})$/
    const hoursPattern = /^[0-9]{1,2}$/

    const times = timePattern.exec(str)
    const hoursOnly = hoursPattern.exec(str)

    if (times) {
      let hours = parseInt(times[1], 10)
      let minutes = parseInt(times[2], 10)

      hours = Math.min(hours, 23)
      minutes = Math.min(minutes, 59)

      return [hours, minutes]
    }

    if (hoursOnly) {
      let hours = parseInt(hoursOnly[0], 10)
      const minutes = 0

      hours = Math.min(hours, 23)

      return [hours, minutes]
    }

    return null
  },

  /**
   * Convert time value to 2-digit format.
   *
   * @param {Number} time
   * @returns {String}
   */
  formatItem: function (time) {
    return String(time < 10 ? '0' + time : time)
  },

  /**
   * Combine hours and minutes to [hh:mm] format-string.
   *
   * @param {RuleTime} time
   * @returns {String}
   */
  formatTime: function (time) {
    return time ? time.map(this.formatItem).join(':') : ''
  },

  /**
   * Combine start and end time.
   *
   * @param {RuleTime} start
   * @param {RuleTime} end
   * @returns {String}
   */
  formatPeriod: function (start, end) {
    if (start && end) {
      return this.formatTime(start) + '&thinsp;—&thinsp;' + this.formatTime(end)
    } else if (start && !end) {
      return chrome.i18n.getMessage('options_from') + ' ' + this.formatTime(start)
    } else if (!start && end) {
      return chrome.i18n.getMessage('options_to') + ' ' + this.formatTime(end)
    }

    return chrome.i18n.getMessage('options_allday')
  }
}

export default TimeHelper
