'use strict'

function Rules (rules) {
  rules = rules.filter(Boolean)

  this.storage = { rules }

  this.add = this.add.bind(this)
  this.remove = this.remove.bind(this)
}

/**
 * Add new rule to chrome.storage.
 *
 * @param {Rule} rule
 */
Rules.prototype.add = function (rule) {
  this.storage.rules.push(rule)
  chrome.storage.sync.set(this.storage)
}

/**
 * Remove rule from chrome.storage.
 *
 * @param {Number} number - number of rule in rule's array.
 */
Rules.prototype.remove = function (number) {
  this.storage.rules.splice(number, 1)
  chrome.storage.sync.set(this.storage)
}

/**
 * Change rule in chrome.storage.
 *
 * @param {Number} number - number of rule in rule's array.
 * @param {Rule} rule
 */
Rules.prototype.edit = function (number, rule) {
  this.storage.rules[number] = rule
  chrome.storage.sync.set(this.storage)
}

export default Rules
