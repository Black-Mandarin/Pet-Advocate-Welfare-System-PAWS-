const router = require('express').Router();
const { Booking, Pet } = require('../../models');
const withAuth = require('../../utils/auth');

// Creates a new booking
router.post("/", withAuth, async (req, res) => {
    try {
        const newPet = await Pet.create({
            pet_name: req.body.pet_name,
            owner_name: req.body.owner_name,
            pet_type: req.body.pet_type,
            pet_breed: req.body.pet_breed,
            pet_notes: req.body.pet_notes,
        });

        const newBooking = await Booking.create({
            date_dropoff: req.body.date_dropoff,
            date_pickup: req.body.date_pickup,
            fee: req.body.fee,
            // staff_id: req.body.staff_id,
            // Need to send staff_id that is a number not the staff name input that is a string
            pet_id: newPet.id,
        });

        res.status(200).json({ newBooking, newPet });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

// Updates a booking
router.put("/:id", withAuth, async (req, res) => {
    try {
        const bookingData = await Booking.update({
            ...req.body,
        },
            {
                where: {
                    id: req.params.id,
                },
            });

        const petData = await Pet.update({
            ...req.body,
        },
            {
                where: {
                    id: req.body.pet_id,
                },
            });

        if (!bookingData) {
            res.status(404).json({ message: 'No booking found with this id!' });
            return;
        }

        res.status(200).json({ bookingData, petData });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Deletes a booking
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const bookingData = await Booking.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!bookingData) {
            res.status(404).json({ message: 'No booking found with this id!' });
            return;
        }

        res.status(200).json(bookingData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;