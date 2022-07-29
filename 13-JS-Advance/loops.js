const names = ["Razi", "Aziz", "Syahputro"];

for (const name of names) {
    console.log(name);
}

const loggedInUser = {
    name: 'Razi',
    age: 25,
    isAdmin: true
};

for (const key in loggedInUser) {
    console.log(key);
    console.log(loggedInUser[key]);
}