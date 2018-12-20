const dateCtrl = require('../controllers/dates')
const util = require('../libs/util')

var express = require('express');
var router = express.Router({mergeParams: true});


router.get('/', function(req, res) {
  dateCtrl.getAvailableDates(function (error, data) {
    if (error) {
      util.errorResponse(req, res, error.type, error);
    } else {
      console.log(res)
      util.successResponse(res, 200, data);
    }
  })
});

router.post('/', function(req, res){
  dateCtrl.postNewDate(req, res, (err, data) => {
    if (err) {
      util.errorResponse(req, res, err.type, err);
    } else {
      util.successResponse(res, 201, data);
    }
  })
})

router.patch('/update', function(req, res){
    const info = req.body.date
    dateCtrl.updateDate(info, (err, data) => {
      if (err) {
        util.errorResponse(req, res, err.type, err);
      } else {
        util.successResponse(res, 204, data);
      }
    })
  })

module.exports = router;
