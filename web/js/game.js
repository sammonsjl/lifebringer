var currentUser = WeDeploy.auth().currentUser;

if (currentUser) {
    runLifeBringer({
        contextRoot: '/',
        currentUser: currentUser,
        weDeploy : WeDeploy
    });
}
else {
    document.location.href = '/';
}