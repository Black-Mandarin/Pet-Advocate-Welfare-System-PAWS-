const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const bookingRoutes = require('./bookingRoutes');
const personalRoutes = require('./personalRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/booking', bookingRoutes);
router.use('/personal', personalRoutes);


module.exports = router;
