module.exports = {
    format_date: (date) => {
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
    },
    reverse_date: (date) => {
        return date.toLocaleDateString().split("/").reverse().join("-");
    },
    get_name: (bookings) => {
        const res = [];
        for(var i in bookings)
                res.push(bookings[i]);
        return res[0].staff.name;
    },
    get_id: (bookings) => {
        const res = [];
        for(var i in bookings)
                res.push(bookings[i]);
        return res[0].staff.id;
    },
    get_email: (bookings) => {
        const res = [];
        for(var i in bookings)
                res.push(bookings[i]);
        return res[0].staff.email;
    }
};