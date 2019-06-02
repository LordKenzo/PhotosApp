const app = require('../app');
const port = parseInt(process.env.port, 10) || 3001;

app.set('port', port);

app.listen(app.get('port'), () => console.log(`Express server is running...on port ${port}`));
