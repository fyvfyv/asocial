'use strict';

var utils = require('../utils');
var TimeHelper = require('../timehelper');

chrome.runtime.onMessage.addListener(function(network, sender) {
    shouldDisable(network, function(enabledRules) {
        var isSiteBlocked = enabledRules.length > 0;

        chrome.tabs.sendMessage(
            sender.tab.id,
            isSiteBlocked
        );

        changeTitle(enabledRules);
        utils.setIcon(isSiteBlocked);
    });
});

/**
 * shouldDisable - network activity checking
 *
 * @param  {String} network
 * @param  {Function} callback
 */
function shouldDisable(network, callback) {
    chrome.storage.sync.get('rules', rulesContainer => {
        var currentTime = new Date();

        var enabledRules = (rulesContainer.rules || []).filter(rule => utils.checkRule(currentTime, rule, network));

        callback(enabledRules);
    });
}


/**
 * changeTitle - change title depending on the status of the block.
 *
 * @param  {Rule[]} enabledRules
 */
function changeTitle(enabledRules) {
    if (enabledRules.length === 0) {
        utils.setTitle('Asocial');
        return;
    }

    var endRule = enabledRules.reduce(function(prev, current) {
        if (current.end) {
            return TimeHelper.formatTime(prev.end) > TimeHelper.formatTime(current.end) ? prev : current;
        }
        return current;
    });

    var endTime = endRule.end ? TimeHelper.formatTime(endRule.end) : chrome.i18n.getMessage('title_tomorrow');

    utils.setTitle(`${chrome.i18n.getMessage('title_closed')} ${endTime}`);
}
