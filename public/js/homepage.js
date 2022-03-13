
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
    .querySelectorAll('.deleteBtn')
    .forEach(btn => btn.addEventListener('click', delButtonHandler));