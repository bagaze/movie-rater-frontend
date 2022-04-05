function getPreviousWednesday(date) {
    let previousWednesday = new Date(date);
    previousWednesday.setDate(previousWednesday.getDate() - (previousWednesday.getDay() + 4) % 7);
    return previousWednesday;
}

function getNextTuesday(date) {
    let nextTuedsday = new Date(date);
    nextTuedsday.setDate(nextTuedsday.getDate() + (nextTuedsday.getDay() + 2) % 7);
    return nextTuedsday;
}
