var auth = WeDeploy.auth('auth.lifebringer.wedeploy.me');
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

auth.onSignIn(function(user) {
	document.location.href = '/game/';
});