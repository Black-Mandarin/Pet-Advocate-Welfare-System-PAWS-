const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const bookingRoutes = require('./bookingRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/booking', bookingRoutes);


module.exports = router;
