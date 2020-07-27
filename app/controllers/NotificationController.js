const express = require('express');
const router = express.Router();
const { Notification } = require('../models/Notification');
const { authenticateUser } = require('../middleware/authentication');

router.post('/create', authenticateUser, (req, res) => {
  const body = req.body;

  const notification = new Notification(body);
  //console.log(body)
  notification
    .save()
    .then(notification => res.send(notification))
    .catch(err => res.send(err));
});

router.get('/all', authenticateUser, (req, res) => {
  Notification.find({ userid: req.user._id })
    .then(notification => res.send({ notification }))
    .catch(err => res.send(err));
});

// router.put('/edit',authenticateUser,async function(req,res){

//     const body=req.body
//     let msg=body.msg
//     const _id=req.body._id

//     let notification=await Notification.findByIdAndUpdate({_id},{msg},{new :true,runValidators:true})
//     return res.send(notification)

// })

module.exports = {
  notificationRouter: router
};
