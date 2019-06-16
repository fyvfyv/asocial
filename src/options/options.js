'use strict'

import FormManager from './formmanager'
import Rules from './rules'
import TableController from './table'
import translate from './translate'

let rulesContainer
let currentRule

const addButton = document.querySelector('#add-button')

addButton.addEventListener('click', () => FormManager.show('add'))

FormManager.on('add', (rule) => rulesContainer.add(rule))

FormManager.on('show', () => addButton.classList.add('hidden'))

FormManager.on('hide', () => {
  addButton.classList.remove('hidden')
  TableController.deselect()
})

FormManager.on('save', (rule) => {
  rulesContainer.edit(currentRule, rule)
  FormManager.hide()
})

TableController.on('remove', (number) => rulesContainer.remove(number))

TableController.on('click', (number) => {
  currentRule = number
  FormManager.fill(rulesContainer.storage.rules[number])
  FormManager.show('edit')
})

window.addEventListener('load', () => {
  translate.translateHTML()

  chrome.storage.sync.get('rules', obj => {
    rulesContainer = new Rules(obj.rules || [])

    TableController.table(rulesContainer.storage.rules)

    if (rulesContainer.storage.rules.length === 0) {
      addButton.click()
    }

    chrome.storage.onChanged.addListener(() => {
      TableController.table(rulesContainer.storage.rules)
    })
  })
})
