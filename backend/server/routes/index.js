const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const loadRoutes = (app) => {
  let nRoutes = 0;
  const routes = fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-9) === '.route.js') && (file.slice(-3) === '.js');
    })
    .map(file => {
      nRoutes += 1;
      const route = file.slice(0, -3);
      require(`./${route}`)(app);
      return route.toLocaleUpperCase();
    })
    .join(' - ');
  if (nRoutes > 0) {
    console.log(`${nRoutes} routes Loaded: ${routes}`);
  } else {
    console.log('No routes founded!!!');
  }

}

module.exports = {
  loadRoutes
};
