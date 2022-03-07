const sequelize = require("../config/connection");
const { Staff, Booking, Pet } = require("../models");

const staffData = require("./staff.json");
const bookingData = require("./booking.json");
const petData = require("./petData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const staff = await Staff.bulkCreate(staffData, {
    individualHooks: true,
    returning: true,
  });

  const pet = await Pet.bulkCreate(petData, {
    individualHooks: true,
  });

  for (const booking of bookingData) {
    await Booking.create({
      ...booking,
      staff_id: staff[Math.floor(Math.random() * staff.length)].id,
      pet_id: pet[Math.floor(Math.random() * pet.length)].id,
    });
  }
};

process.exit(0);
seedDatabase();
