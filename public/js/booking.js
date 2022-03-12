const bookingFormHandler = async (event) => {
    event.preventDefault();

    const owner_name = document.querySelector('#owner_name').value.trim();
    const pet_name = document.querySelector('#pet_name').value.trim();
    const pet_type = document.querySelector('#pet_type').value.trim();
    const pet_breed = document.querySelector('#pet_breed').value.trim();
    const pet_notes = document.querySelector('#pet_notes').value.trim();
    const date_dropoff = document.querySelector('#date_dropoff').value.trim();
    const date_pickup = document.querySelector('#date_pickup').value.trim();
    const staff_id = document.querySelector('#staff').value.trim();
    // Staff is a string of the input for the name, we need staff_id which is a number
    const fee = document.querySelector('#fee').value.trim();

    if (owner_name && pet_name && pet_type && pet_breed && pet_notes && date_dropoff
        && date_pickup && staff_id && fee) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/bookings/', {
            method: 'POST',
            body: JSON.stringify({
                owner_name, pet_name, pet_type, pet_breed, pet_notes, date_dropoff,
                date_pickup, staff_id: Number(staff_id), fee
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
    placeholder: "Select a staff",
    ajax: {
        url: 'api/staffs/list',
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

document.querySelector('#booking-form').addEventListener('submit', bookingFormHandler);

document.querySelector("#booking-form").addEventListener("submit", () => {
    const staffId = document.querySelector("#staff").value;

    fetch("/api/bookings", {
        method: "POST",
        body: {
            staff_id: parseInt(staffId),
        }
    })
});
