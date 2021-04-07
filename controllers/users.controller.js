const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
	// const { q, nombre = 'No name', apikey } = req.query;

	const { limite = 5, desde = 0 } = req.query;
	const query = { estado: true };

	// const usuarios = await Usuario.find(query)
	// 	.skip(!isNaN(desde) ? Number(desde) : Number(0))
	// 	.limit(!isNaN(limite) ? Number(limite) : Number(5));

	// const total = await Usuario.countDocuments(query);

	const [ total, usuarios ] = await Promise.all([
		Usuario.countDocuments(query),
		Usuario.find(query)
			.skip(!isNaN(desde) ? Number(desde) : Number(0))
			.limit(!isNaN(limite) ? Number(limite) : Number(5))
	]);

	res.json({
		msg: 'get API - desde controlador',
		total,
		usuarios
	});
};

const usuariosPost = async (req, res = response) => {
	const { nombre, correo, password, rol } = req.body;
	const usuario = new Usuario({ nombre, correo, password, rol });

	// Encriptar la contrasena
	const salt = bcryptjs.genSaltSync(10);
	usuario.password = bcryptjs.hashSync(password, salt);

	// Guardar en BD
	await usuario.save();

	res.json({
		msg: 'Post API - desde controlador',
		usuario
	});
};

const usuariosPut = async (req, res = response) => {
	const { id } = req.params;
	const { _id, password, google, correo, ...resto } = req.body;

	if (password) {
		// Encriptar la contrasena
		const salt = bcryptjs.genSaltSync(10);
		resto.password = bcryptjs.hashSync(password, salt);
	}

	const usuario = await Usuario.findByIdAndUpdate(id, resto);

	res.json({
		msg: 'Put API - desde controlador',
		usuario
	});
};

const usuariosPatch = (req, res = response) => {
	res.json({
		msg: 'Patch API - desde controlador'
	});
};

const usuariosDelete = async (req, res = response) => {
	const { id } = req.params;

	// Fisicamente lo borramos
	// const usuario = await Usuario.findByIdAndDelete(id);

	const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

	res.json({
		msg: 'Delete API - desde controlador',
		usuario
	});
};

module.exports = {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosPatch,
	usuariosDelete
};
