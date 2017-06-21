var auth = WeDeploy.auth('auth-ccc.liferay.com');
var currentUser = WeDeploy.auth().currentUser;

if (currentUser) {
	document.location.href = '/dashboard/';
}

// Login

var btn = document.querySelector('.btn');

btn.addEventListener('click', function(e) {
	var googleProvider = new auth.provider.Google();
	googleProvider.setProviderScope('email');
	auth.signInWithRedirect(googleProvider);
});

// Redirect

auth.onSignIn(function(currentUser) {
	currentUser.id = window.md5(currentUser.email);

	WeDeploy
		.data('db-ccc.liferay.com')
		.where('id', currentUser.id)
		.get('game')
		.then(function(user) {
			if (user.length > 0) {
				document.location.href = '/game/';
			} else {
				createUser(currentUser);
			}
		})
		.catch(function() {
			alert('Something wrong happened, try later.');
		})
});

function createUser(currentUser) {
	WeDeploy
		.data('db-ccc.liferay.com')
		.create('game', {
			id: currentUser.id,
			name: currentUser.name,
			email: currentUser.email,
			photoUrl: currentUser.photoUrl,
			count: 0,
			maxScore: 0,
			games: []
		})
		.then(function() {
			document.location.href = '/game/';
		})
		.catch(function() {
			alert('Something wrong happened, try later.');
		})
}