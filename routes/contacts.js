const express = require('express');
const router = express.Router()

//  route   GET  api/contacts/
//  @desc   fetches all uers's contact
//  Private
router.get('/', (req, res) => {
  res.send('Get all contacts')
})

//  route   POST  api/contacts/
//  @desc   adds a new contact
//  Private
router.post('/', (req, res) => {
  res.send('Adds a contact')
})

//  route   PUT  api/contacts/:id
//  @desc   updates a particular contact
//  Private
router.put('/:id', (req, res) => {
  res.send('Updates a contact')
})

//  route   DELETE  api/contacts/:id
//  @desc   deletes a particular contact
//  Private
router.delete('/:id', (req, res) => {
  res.send('Deletes a contact')
})



module.exports = router