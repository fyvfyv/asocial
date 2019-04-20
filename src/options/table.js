'use strict';

var TimeHelper = require('../timehelper');
var EventEmitter = require('./eventemitter');

var utils = require('../utils');

function getDay(n) {
    return chrome.i18n.getMessage(`days_${n}`);
}

function TableController() {
    this.rulesTable = document.querySelector('.time-table');
    this.templateRow = document.querySelector('#row-template').content.querySelector('.rule-line');

    this.rulesTable.addEventListener('click', (e) => {
        var target = e.target;

        if (target.dataset.delete) {
            this.trigger('remove', target.dataset.delete);
        } else {
            var number = target.dataset.number || target.parentNode.dataset.number;

            this.select(number);
            this.trigger('click', number);
        }
    });
}

/**
 * Return string of days of the week.
 * @param {RuleDays} days
 * @returns {String}
 */
TableController.prototype.getDays = function(days) {
    return (days.length % 7) ?
        days.map(getDay).join(', ') :
        chrome.i18n.getMessage('options_everyday');
};

/**
 * Make HTML element with social network icon.
 * @param {String} network
 * @returns {Element}
 */
TableController.prototype.getNetworkIcon = function(network) {
    var networkBlock = document.createElement('span');
    networkBlock.classList.add('icon', `icon-${network}`);
    return networkBlock;
};

/**
 * @param {RuleSites} sites
 * @returns {Text|DocumentFragment} - block with social network icons
 */
TableController.prototype.getSites = function(sites) {
    var sitesFilter = Object.keys(sites).filter(k => sites[k]).sort();

    return sitesFilter.length ?
        utils.getFragment(sitesFilter.map(this.getNetworkIcon)) :
        document.createTextNode(chrome.i18n.getMessage('options_all'));
};

/**
 * Make HTML element with specific rule content.
 *
 * @param {Rule} rule
 * @param {Number} number - number of rule in rule's array.
 * @returns {Node} - table row with rule.
 */
TableController.prototype.row = function(rule, number) {
    var row = this.templateRow.cloneNode(true);
    var buttonDelete = row.querySelector('.btn-delete');

    row.querySelector('.days').textContent = this.getDays(rule.days);
    row.querySelector('.time').innerHTML = TimeHelper.formatPeriod(rule.start, rule.end);
    row.querySelector('.networks').appendChild(this.getSites(rule.sites));
    buttonDelete.dataset.delete = number;
    buttonDelete.title = chrome.i18n.getMessage('delete');

    row.dataset.number = number;

    if (utils.checkRule(new Date(), rule)) {
        row.classList.add('rule-line-active');
    }

    return row;
};

/**
 * Make table with existing rules.
 *
 * @param {Rule[]} rules
 */
TableController.prototype.table = function(rules) {
    this.rulesTable.innerHTML = '';
    this.rulesTable.appendChild(utils.getFragment(rules.map(this.row, this)));
    this.rulesTable.classList.toggle('time-table-empty', rules.lenght === 0);
};

TableController.prototype.SELECTED_RULE = 'rule-line-selected';

/**
 * Highlight selected rule
 * @param {Number} ruleNumber
 */
TableController.prototype.select = function(ruleNumber) {
    this.deselect();
    this.rulesTable.children[ruleNumber].classList.add(this.SELECTED_RULE);
};

/**
 * Remove highlighting from rule
 */
TableController.prototype.deselect = function() {
    var selectedRule = this.rulesTable.querySelector('.' + this.SELECTED_RULE);

    if (selectedRule) {
        selectedRule.classList.remove(this.SELECTED_RULE);
    }
};

utils.inherit(TableController, EventEmitter);

module.exports = new TableController();
