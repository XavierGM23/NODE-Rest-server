const mongoose = require('mongoose');
const colors = require('colors');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_CNN, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});

		console.log('\n===================='.blue);
		console.log('Base de datos '.cyan + 'online'.green);
		console.log('====================\n'.blue);
	} catch (error) {
		console.log(error);
		throw new Error('Error a la hora de iniciar la base de datos');
	}
};

module.exports = {
	dbConnection
};
