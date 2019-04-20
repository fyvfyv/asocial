'use strict';

/**
 * Call method from parent with child context and arguments.
 * @param {String} method - called method.
 * @param {...*} arguments for method.
 * @return {*} - returned result.
*/
function callSuper(method) {
    var args = Array.prototype.slice.call(arguments, 1);
    var superProto = this.constructor.__super.prototype[method];

    return superProto ? superProto.apply(this, args) : null;
}

module.exports = {
    /**
     * Inherit prototypes from parent function.
     * @param  {Function} Parent
     * @param  {Function} Child
    */
    inherit: function inherit(Child, Parent) {
        Object.assign(Child.prototype, Parent.prototype);
        Child.__super = Parent;

        Child.prototype.callSuper = callSuper;
    },

    /**
     * Make DocumentFragment and insert content in it.
     * @param {HTMLElement[]} array
     * @returns {DocumentFragment}
     */
    getFragment: function getFragment(array) {
        var df = document.createDocumentFragment();

        array.forEach(df.appendChild, df);

        return df;
    },

    /**
     * checkRule - checking rule
     *
     * @param  {Date} time
     * @param  {Object} rule
     * @param  {String} network
     * @return {Boolean}
     */
    checkRule: function checkRule(time, rule, network) {
        if (network) {
            var disabledNetworks = Object.keys(rule.sites).filter(network => rule.sites[network]);

            if (disabledNetworks.length > 0 && !rule.sites[network]) {
                return false;
            }
        }

        if (rule.days.length !== 0 && rule.days.indexOf(time.getDay()) === -1) {
            return false;
        }

        var startTime = new Date();
        var endTime = new Date();
        var isAfterStart = true;
        var isBeforeEnd = true;

        if (rule.start) {
            startTime.setHours(...rule.start, 0, 0);
            isAfterStart = startTime <= time;
        }

        if (rule.end) {
            endTime.setHours(...rule.end, 0, 0);
            isBeforeEnd = time < endTime;
        }

        return isAfterStart && isBeforeEnd;
    },

    /**
     * setTitle - set title for popup (on icon's hover)
     *
     * @param  {String} title
     */
    setTitle: function setTitle(title) {
        chrome.browserAction.setTitle({ title });
    }
};
