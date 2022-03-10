$('#staff').select2({
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

document.querySelector("#booking-form").addEventListener("submit", () => {
    const staffId = document.querySelector("#staff").value;

    console.log("selected staff ID", staffId);

    fetch("/booking", {
        method: "POST",
        body: {
            staffId: ParseInt(staffId),
        }
    })
});
