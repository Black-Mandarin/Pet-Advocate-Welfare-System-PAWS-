const router = require('express').Router();

const bookingRoutes = require('./booking-routes');
const staffRoutes = require('./staff-routes');

router.use('/bookings', bookingRoutes);
router.use('/staffs', staffRoutes);


module.exports = router;