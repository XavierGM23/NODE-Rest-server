const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
	const { q, nombre = 'No name', apikey } = req.query;
	res.json({
		msg: 'get API - desde controlador',
		q,
		nombre,
		apikey
	});
};

const usuariosPost = (req, res = response) => {
	const { nombre, edad } = req.body;

	res.json({
		msg: 'Post API - desde controlador',
		nombre,
		edad
	});
};

const usuariosPut = (req, res = response) => {
	const id = req.params.id;

	res.json({
		msg: 'Put API - desde controlador',
		id
	});
};

const usuariosPatch = (req, res = response) => {
	res.json({
		msg: 'Patch API - desde controlador'
	});
};

const usuariosDelete = (req, res = response) => {
	res.json({
		msg: 'Delete API - desde controlador'
	});
};

module.exports = {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosPatch,
	usuariosDelete
};
