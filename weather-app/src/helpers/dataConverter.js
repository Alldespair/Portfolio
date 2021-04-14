export default function dataConverter(dt) {
    const a = new Date(dt * 1000);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const daysInWeekMin = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const result = {
        year: a.getFullYear(),
        month: (months[a.getMonth()] + ' '),
        day: daysInWeek[a.getDay()],
        day_min: daysInWeekMin[a.getDay()],
        date: a.getDate(),
        time: (a.getHours() + ':' + ('0'+a.getMinutes()).slice(-2)),
    };

    return (result)
};