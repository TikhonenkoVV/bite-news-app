export const formatDate = date => {
    let newDate;
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    newDate = `${day}/${month}/${year}`;
    return newDate;
};

export const numToDateStr = d => {
    const myDate = new Date(d);
    const year = myDate.getFullYear().toString();
    const month = myDate.getMonth().toString().padStart(2, '0');
    const date = myDate.getDate().toString().padStart(2, '0');
    return year + month + date;
};
