const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
	nombre: {
		type: String,
		required: [ true, 'El nombre es obligatorio' ]
	},
	correo: {
		type: String,
		required: [ true, 'El correo es obligatorio' ]
	},
	password: {
		type: String,
		required: [ true, 'El password es obligatorio' ]
	},
	img: {
		type: String
	},
	rol: {
		type: String,
		required: true,
		emun: [ 'ADMIN_ROLE', 'USER_ROLE' ]
	},
	estado: {
		type: Boolean,
		default: true
	},
	google: {
		type: Boolean,
		default: false
	}
});

UsuarioSchema.methods.toJSON = function() {
	const { __v, password, ...usuario } = this.toObject();
	return usuario;
};

module.exports = model('Usuario', UsuarioSchema);

/*
{
    nombre: '',
    correo: 'asdasd@gmail.com',
    password: 'asddasdsa',
    img: '12313123214',
    rol: 'asdasdsaasw21314d',
    estado: true/false (Activo/Inactivo - eliminado)
    google: true/false (Creado por Google)
} 
 */
