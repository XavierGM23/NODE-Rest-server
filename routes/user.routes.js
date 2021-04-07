const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsarioPorId } = require('../helpers/db-validators');

const {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosPatch,
	usuariosDelete
} = require('../controllers/users.controller');

const router = Router();

router.get('/', usuariosGet);

router.post(
	'/',
	[
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('password', 'El password debe tener al menos 1 mayuscula, numero y simbolo especial').isStrongPassword(),
		check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6 }),
		check('correo', 'El correo no es valido').isEmail(),
		check('correo').custom((email) => emailExiste(email)),
		check('rol').custom((rol) => esRoleValido(rol)),
		validarCampos
	],
	usuariosPost
);

router.put(
	'/:id',
	[
		check('id', 'No es un ID valido').isMongoId(),
		check('id').custom((id) => existeUsarioPorId(id)),
		check('rol').custom((rol) => esRoleValido(rol)),
		validarCampos
	],
	usuariosPut
);

router.patch('/', usuariosPatch);

router.delete(
	'/:id',
	[ check('id', 'No es un ID valido').isMongoId(), check('id').custom((id) => existeUsarioPorId(id)), validarCampos ],
	usuariosDelete
);

module.exports = router;
