const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://bamz:<contraseña>@atlascluster.yt7xu4p.mongodb.net/MyAppClinica', {

});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión con MongoDB:'));
db.once('open', () => console.log('Conexión exitosa a MongoDB'));

module.exports = db;
