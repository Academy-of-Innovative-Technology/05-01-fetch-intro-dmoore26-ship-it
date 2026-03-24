let users = [];
let currentIndex = 0;

function getUserData() {

fetch("src/data/api.json")
.then(function(response) {
	if (!response.ok) {
		throw new Error('Network response was not ok: ' + response.statusText);
	}
return response.json();
})
.then(function(data) {
users = data.results;
showUser();
})
.catch(function(error) {
console.log("Error:", error);
});
}

function showUser() {
if (users.length === 0) {
return;
}

let user = users[currentIndex];

updateUserCard(user);
getRandomImage();
}

function updateUserCard(user) {
let name = document.querySelector("#user-name");
let email = document.querySelector("#user-email");

name.textContent = user.firstName + " " + user.lastName;
email.textContent = user.email;
}

function getRandomImage() {
fetch("https://picsum.photos/300")
.then(function(response) {
let image = document.querySelector("#student-image");
image.src = response.url;
})
.catch(function(error) {
console.log("Image error:", error);
});
}

let button = document.querySelector("#next-button");
button.addEventListener("click", function() {
currentIndex = currentIndex + 1;

if (currentIndex >= users.length) {
currentIndex = 0;
}

showUser();
});

// Load the first user when the page loads
window.onload = getUserData;
