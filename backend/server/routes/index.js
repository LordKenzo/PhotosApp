const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const loadRoutes = (app) => {
  const routes = fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .map(file => {
      const route = file.slice(0, -3);
      require(`./${route}`)(app);
      return route.toLocaleUpperCase();
    })
    .join(' - ');
  console.log('Routes Loaded:', routes);
}

module.exports = {
  loadRoutes
};
