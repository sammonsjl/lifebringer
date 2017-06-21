// Profile

var auth = WeDeploy.auth('auth-lifebringer.wedeploy.xyz');
var currentUser = WeDeploy.auth().currentUser;

if (currentUser) {
	appendUser(currentUser);
} else {
	document.location.href = '/';
}

function appendUser(user) {
	var avatar = document.querySelector('.profile-avatar');
	var name = document.querySelector('.profile-name');

	avatar.setAttribute('src', user.photoUrl || 'avatar.jpg');
	name.innerText = user.name || user.email;
}

// Logout

var logout = document.querySelector('.profile-logout');

logout.addEventListener('click', function() {
	auth.signOut().then(function() {
		document.location.href = '/';
	});
});

// Ranking

var table = document.querySelector('table tbody');

fetch('https://db-lifebringer.wedeploy.xyz/game')
	.then(function(response) {
		return response.json();
	})
	.then(createLeaderboard);

function createLeaderboard(players) {
	var html = '';
	var position, photo, name, score;

	for (var i = 0; i < players.length; i++) {
		position = i + 1;
		photo = players[i].photo || '/assets/images/avatar.jpg';
		name = players[i].name || players[i].email;
		score = players[i].maxScore;

		html += '<tr>' +
			'<td class="ranking-position">' + position + '</td>' +
			'<td class="ranking-avatar"><img src="' + photo +'"></td>' +
			'<td class="ranking-name">' + name +'</td>' +
			'<td class="ranking-score">' + score +'</td>' +
		'</tr>';
	}

	table.innerHTML = html;
}