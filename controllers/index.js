const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const bookingRoutes = require('./booking-routes');
const personalRoutes = require('./personal-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/booking', bookingRoutes);
router.use('/personal', personalRoutes);


module.exports = router;
