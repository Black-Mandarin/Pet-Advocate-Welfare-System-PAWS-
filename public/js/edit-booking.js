const editBookingHandler = async (event) => {
    event.preventDefault();

    const owner_name = document.querySelector('#owner_name').value.trim();
    const pet_name = document.querySelector('#pet_name').value.trim();
    const pet_type = document.querySelector('#pet_type').value.trim();
    const pet_breed = document.querySelector('#pet_breed').value.trim();
    const pet_notes = document.querySelector('#pet_notes').value.trim();
    const date_dropoff = document.querySelector('#date_dropoff').value.trim();
    const date_pickup = document.querySelector('#date_pickup').value.trim();
    const staff = document.querySelector('#staff').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (owner_name && pet_name && pet_type && pet_breed && pet_notes && date_dropoff
        && date_pickup && staff && id) {
        // Send a PUT request to the API endpoint
        const response = await fetch(`/api/bookings/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                owner_name, pet_name, pet_type, pet_breed, pet_notes, date_dropoff,
                date_pickup, staff
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

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/bookings/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to delete booking');
        }
    }
};


document
    .querySelector('#edit-booking-form')
    .addEventListener('submit', editBookingHandler);

document
    .querySelector('#delete-post')
    .addEventListener('click', delButtonHandler);