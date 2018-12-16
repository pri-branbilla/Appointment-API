const appointmentCtrl = require('../controllers/appointment')
const util = require('../libs/util')

var express = require('express');
var router = express.Router({mergeParams: true});


router.get('/', function(req, res) {
  appointmentCtrl.getAppointments(req, res, function (error, data) {
    if (error) {
      util.errorResponse(req, res, error.type, error);
    } else {
      util.successResponse(res, 200, data);
    }
  })
});

router.post('/', function(req, res){
  const info = req.body
  appointmentCtrl.postAppointment(info, (err, data) => {
    if (err) {
      util.errorResponse(req, res, err.type, err);
    } else {
      util.successResponse(res, 201, data);
    }
  })
})

module.exports = router;
