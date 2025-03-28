export const converterToJalali = (date) => {
    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        calender: "persian",
    };

    return new Date(date).toLocaleDateString("fa-IR", options);
};