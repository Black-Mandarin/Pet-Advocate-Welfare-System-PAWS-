const router = require('express').Router();
const { Staff } = require('../../models');

// Creates a new staff profile
router.post("/", async (req, res) => {
    try {
        const staffData = await Staff.create(req.body);

        req.session.save(() => {
            req.session.user_id = staffData.id;
            req.session.logged_in = true;

            res.status(200).json(staffData);
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

// Signs a user in
router.post("/login", async (req, res) => {
    try {

        const staffData = await Staff.findOne({ where: { email: req.body.email } });

        if (!staffData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await staffData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = staffData.id;
            req.session.logged_in = true;

            res.json({ user: staffData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Logs a user out
router.post("/logout", async (req, res) => {
    try {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/list", async (req, res) => {
    try {
        const staffData = await Staff.findAll();
        const staff = staffData.map((staff) => staff.get({ plain: true }));

        // const results = staff.map((staff) => {
        //     return {
        //         id: staff.id,
        //         text: staff.name,
        //     }
        // })

        res.status(200).json(staff);

    } catch (err) {
        res.status(500).json(err);
    }

})
module.exports = router;