const router = require('express').Router()
const { Item, User } = require('../models')
const passport = require('passport')


router.get('/items', passport.authenticate('jwt'), async function (req, res) {
  const items = await Item.find({}).populate('user')
  res.json(items)
})

router.post('/items', passport.authenticate('jwt'), async function (req, res) {
  const item = await Item.create({ ...req.body, user: req.user._id })
  await User.findByIdAndUpdate(req.user._id, { $push: { items: item._id } })
  res.json(item)
})

router.put('/items/:id', passport.authenticate('jwt'), async function (req, res) {
  await Item.findByIdAndUpdate(req.params.id, { $set: req.body })
  res.sendStatus(200)
})

router.delete('/items/:id', passport.authenticate('jwt'), async function (req, res) {
  await Item.findByIdAndDelete(req.params.id)
  await User.findByIdAndUpdate(req.user._id, { $pull: { items: req.params.id } })
  res.sendStatus(200)
})

module.exports = router
