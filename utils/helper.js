module.exports = {
    format_date: (date) => {
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
    },
    reverse_date: (date) => {
        return date.toLocaleDateString().split("/").reverse().join("-");
    }
};