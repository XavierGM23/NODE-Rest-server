const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {
	/* ================== CLASS CONSTRUCTOR ======================== */
	constructor() {
		this.app = express(); //Inicia Express
		this.port = process.env.PORT; // Genera el puerto
		this.usuariosPath = '/api/usuarios';

		//  Connecting DB
		this.conectarDB();

		// Middlewares
		this.middlewares();

		//Rutas de mi aplicacion
		this.routes();
	}

	async conectarDB() {
		await dbConnection();
	}

	/* ================== MIDDLEWARES ======================== */
	middlewares() {
		// CORS
		this.app.use(cors());

		// Lectura y parseo del body
		this.app.use(express.json());

		// Directorio Publico
		this.app.use(express.static('public'));
	}

	/* ================== ROUTES METHOD  ======================== */
	routes() {
		this.app.use(this.usuariosPath, require('../routes/user.routes'));
	}

	/* ================== LISTEN METHOD ======================== */
	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running on port: ${this.port}`);
		});
	}
}

module.exports = Server;
