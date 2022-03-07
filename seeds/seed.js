const sequelize = require("../config/connection");
const { staff, booking, pet } = require("../models");
const staffData = require("./staff.json");
const booking = require("./booking.json");
const commentData = require("./commentData.json");
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  await Comment.bulkCreate(commentData, {
    individualHooks: true,
  });
  process.exit(0);
};
seedDatabase();
