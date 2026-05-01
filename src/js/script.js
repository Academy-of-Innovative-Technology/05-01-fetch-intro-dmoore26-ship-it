var peopleData = [];

function loadData() {
    fetch('src/api/data.json')
        .then(function(response) { return response.json(); })
        .then(function(data) { peopleData = data.results; })
        .catch(function(error) {
            console.error('Error loading data:', error);
                document.getElementById('output').innerHTML = "<p class='text-danger'>Failed to load data. Check console for details.</p>";
        });
}

function displayResults(person) {
    var results = document.getElementById('output');
    var worksHtml = '';
    for (var i = 0; i < person.images.works.length; i++) {
        worksHtml += '<img src="' + person.images.works[i] + '" width="100" class="mr-2">';
    }

    var html = '';
    html += '<div class="card p-3">';
    html += '<h2>' + person.name + '</h2>';
    html += '<img src="' + person.images.person + '" width="200" class="mb-3">';
    html += '<p><strong>Birth Date:</strong> ' + person.birthDate + '</p>';
    html += '<p><strong>Born In:</strong> ' + person.bornIn + '</p>';
    html += '<p><strong>Background:</strong> ' + person.background.join(', ') + '</p>';
    html += '<p><strong>Parents:</strong><br>Mother: ' + person.parents.mother + '<br>Father: ' + person.parents.father + '</p>';
    html += '<p><strong>Education:</strong> ' + person.education.join(', ') + '</p>';
    html += '<h4>Works / Awards</h4>' + worksHtml;
    html += '</div>';

    results.innerHTML = html;
}

function searchPerson() {
    var inputElement = document.getElementById('query');
    var input = '';
    if (inputElement) { input = inputElement.value.toLowerCase(); }
    var found = null;
    for (var i = 0; i < peopleData.length; i++) {
        if (peopleData[i].name.toLowerCase() === input) {
            found = peopleData[i];
            break;
        }
    }

    if (found) {
        displayResults(found);
    } else {
        document.getElementById('output').innerHTML = '<p>No person found.</p>';
    }
}

var findButton = document.getElementById('findbtn');
if (findButton) { findButton.addEventListener('click', searchPerson); }

loadData();


// Load the first user when the page loads
window.onload = getUserData;
