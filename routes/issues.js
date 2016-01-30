module.exports = (app, request) => {
	app.get('/api/issues', (req, res) => {
		request.get('https://bitbucket.org/api/1.0/repositories/DrkSephy/technetium-redux-testing/issues/?sort=kind', 
			(error, response, body) => {
				res.send(body);	
			});
	});
}