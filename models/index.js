const Staff = require('./Staff');
const Booking = require('./Booking');
const Pet = require('./Pet')

Staff.hasMany(Booking, {
    foreignKey: 'staff_id',
    onDelete: 'CASCADE'
});

Booking.belongsTo(Staff, {
    foreignKey: 'staff_id'
});

Pet.hasMany(Booking, {
    foreignKey: 'pet_id',
    onDelete: 'CASCADE'
});

Booking.belongsTo(Pet, {
    foreignKey: 'pet_id',

});

module.exports = { Staff, Booking, Pet };