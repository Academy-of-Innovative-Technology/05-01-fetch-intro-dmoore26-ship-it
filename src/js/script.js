let peopleData = [];

function loadData() {
    fetch('src/api/data.json')
        .then(function(r) { return r.json(); })
        .then(function(d) {
            peopleData = d.results || [];
            console.log('Loaded ' + peopleData.length + ' people');
        })
        .catch(function(e) {
            console.log('Could not load data', e);
            let o = document.getElementById('output');
            if (o) { o.innerHTML = '<p style="color:#c00">Could not load data.</p>'; }
        });
}

function showPerson(p) {
    let out = document.getElementById('output');
    if (!out) { return; }
    let html = '';
    html += '<div class="card p-3">';
    html += '<h2>' + p.name + '</h2>';
    if (p.images && p.images.person) {
        html += '<img src="' + p.images.person + '" width="200" style="display:block;margin-bottom:10px">';
    }
    html += '<p><b>Birth Date:</b> ' + (p.birthDate || 'Unknown') + '</p>';
    html += '<p><b>Born In:</b> ' + (p.bornIn || 'Unknown') + '</p>';
    html += '<p><b>Background:</b> ' + (p.background ? p.background.join(', ') : '') + '</p>';
    html += '<p><b>Parents:</b> Mother: ' + (p.parents && p.parents.mother ? p.parents.mother : 'Unknown') + '  Father: ' + (p.parents && p.parents.father ? p.parents.father : 'Unknown') + '</p>';
    html += '<p><b>Education:</b> ' + (p.education ? p.education.join(', ') : '') + '</p>';
    if (p.images && p.images.works && p.images.works.length) {
        html += '<h4>Works / Awards</h4>';
        for (let i = 0; i < p.images.works.length; i++) {
            html += '<img src="' + p.images.works[i] + '" width="100" style="margin-right:10px">';
        }
    }
    html += '</div>';
    out.innerHTML = html;
}

function findPerson() {
        let qEl = document.getElementById('query');
        let out = document.getElementById('output');
        if (!qEl || !out) { return; }
        let q = qEl.value.trim().toLowerCase();
        if (!q) { out.innerHTML = '<p>Type a name please.</p>'; return; }
        let found = null;
        for (let i = 0; i < peopleData.length; i++) {
            let name = (peopleData[i].name || '').toLowerCase();
            if (name.indexOf(q) !== -1) { found = peopleData[i]; break; }
        }
    if (found) { showPerson(found); }
    else { out.innerHTML = '<p>No person found.</p>'; }
}

let btn = document.getElementById('findbtn');
if (btn) { btn.addEventListener('click', findPerson); }

let input = document.getElementById('query');
if (input) {
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') { findPerson(); }
    });
}

loadData();

