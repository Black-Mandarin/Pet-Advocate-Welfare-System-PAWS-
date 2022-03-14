const editBookingHandler = async (event) => {
    event.preventDefault();

    const owner_name = document.querySelector('#owner_name').value.trim();
    const pet_name = document.querySelector('#pet_name').value.trim();
    const pet_type = document.querySelector('#pet_type').value.trim();
    const pet_breed = document.querySelector('#pet_breed').value.trim();
    const pet_notes = document.querySelector('#pet_notes').value.trim();
    const date_dropoff = document.querySelector('#date_dropoff').value.trim();
    const date_pickup = document.querySelector('#date_pickup').value.trim();
    const staff_id = document.querySelector('#staff').value.trim();
    const pet_id = document.querySelector("#pet_id").value.trim();
    const fee = document.querySelector('#fee').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (owner_name && pet_name && pet_type && pet_breed && pet_notes && date_dropoff
        && date_pickup && staff_id && id && pet_id && fee) {
        // Send a PUT request to the API endpoint
        const response = await fetch(`/api/bookings/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                owner_name, pet_name, pet_type, pet_breed, pet_notes, date_dropoff,
                date_pickup, staff_id: Number(staff_id), pet_id: Number(pet_id), fee
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the dashboard
            window.location.replace(document.referrer);
        } else {
            alert(response.statusText);
        }
    }
};

$('#staff').select2({
    ajax: {
        url: '../../api/staffs/list',
        dataType: 'json',
        processResults: function (data) {
            return {
                results: data.map((staff) => {
                    return {
                        id: staff.id,
                        text: staff.name
                    }
                })
            };
        }
    }
});

document
    .querySelector('#edit-booking-form')
    .addEventListener('submit', editBookingHandler);

document.querySelector("#edit-booking-form").addEventListener("submit", () => {
    const staffId = document.querySelector("#staff").value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    fetch(`api/bookings/${id}`, {
        method: "PUT",
        body: {
            staff_id: parseInt(staffId),
        }
    })
});
