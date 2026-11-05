import { validationResult } from "express-validator"
import { Precio, Categoria, Propiedad } from "../models/index.js"

const admin = async (req, res) => {
    const { id } = req.usuario

    const propiedades = await Propiedad.findAll({
        where: {
            usuarioId: id
        },
        include: [
            { model: Categoria, as: 'categoria' },
            { model: Precio, as: 'precio' }

        ]
    })

    res.render('propiedades/admin', {
        pagina: 'Mis Propiedades',
        propiedades: propiedades
    })
}

// Formulario para crear una nueva propiedad
const crear = async (req, res) => {
    // Consultar Modelo de Precio y Categoria
    const [precios, categorias] = await Promise.all([
        Precio.findAll(),
        Categoria.findAll()
    ])

    res.render('propiedades/crear', {
        pagina: 'Crear Propiedad',
        csrfToken: req.csrfToken(),
        precios,
        categorias,
        datos: {}
    })
}

const guardar = async (req, res) => {
    // Validacion
    let resultado = validationResult(req)

    if (!resultado.isEmpty()) {
        const [precios, categorias] = await Promise.all([
            Precio.findAll(),
            Categoria.findAll()
        ])

        return res.render('propiedades/crear', {
            pagina: 'Crear Propiedad',
            csrfToken: req.csrfToken(),
            precios,
            categorias,
            errores: resultado.array(),
            datos: req.body
        })
    }

    // Crear un Registro
    const { titulo, descripcion, habitaciones, estacionamiento, wc, calle, lat, lng, precio: precioId, categoria: categoriaId } = req.body

    const { id: usuarioId } = req.usuario

    try {
        const propiedadGuardada = await Propiedad.create({
            titulo,
            descripcion,
            precioId,
            categoriaId,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng,
            usuarioId: req.usuario.id,
            imagen: ''
        })

        const { id } = propiedadGuardada

        res.redirect(`/propiedades/agregar-imagen/${id}`)

    } catch (error) {
        console.log(error)
    }
}

const agregarImagen = async (req, res) => {
    const { id } = req.params

    // Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id)

    if (!propiedad) {
        return res.redirect('/mis-propiedades')
    }

    // Validar que la propiedad no este publicada
    if (propiedad.publicado) {
        return res.redirect('/mis-propiedades')
    }

    // Validar que la propiedad existe a quien visita esta pagina
    if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-propiedades')
    }

    res.render('propiedades/agregar-imagen', {
        pagina: `Agregar Imagen: ${propiedad.titulo}`,
        csrfToken: req.csrfToken(),
        propiedad
    })
}

const almacenarImagen = async (req, res, next) => {
    const { id } = req.params
    const propiedad = await Propiedad.findByPk(id)
    if (!propiedad) {
        return res.redirect('/mis-propiedades')
    }
    if (propiedad.publicado) {
        return res.redirect('/mis-propiedades')
    }
    if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
        return res.redirect('/mis-propiedades')
    }

    try {

        // Almacenar la imagen Y publicar la propiedad
        propiedad.imagen = req.file.filename
        propiedad.publicado = 1

        await propiedad.save()

        next()

    } catch (error) {
        console.log(error)
    }
}

const editar = async (req, res) => {

    const { id } = req.params

    // Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id)

    if (!propiedad) {
        return res.redirect('/mis-propiedades')
    }

    // Revisar que quien visita la URL, es quien creo la propiedad
    if (!propiedad.usuarioId.toString() !== req.usuario.id.toString()) {

    }

    // Consultar Modelo de Precio y Categoria
    const [precios, categorias] = await Promise.all([
        Precio.findAll(),
        Categoria.findAll()
    ])

    res.render('propiedades/editar', {
        pagina: 'Editar Propiedad',
        csrfToken: req.csrfToken(),
        precios,
        categorias,
        datos: propiedad
    })
}

const guardarCambios = async (req, res) => {
    // Verificar la validacion     

    // Validacion
    let resultado = validationResult(req)

    if (!resultado.isEmpty()) {
        const [precios, categorias] = await Promise.all([
            Precio.findAll(),
            Categoria.findAll()
        ])

        return res.render('propiedades/editar', {
            pagina: 'Editar Propiedad',
            csrfToken: req.csrfToken(),
            precios,
            categorias,
            errores: resultado.array(),
            datos: req.body
        })

        const { id } = req.params

        // Validar que la propiedad exista
        const propiedad = await Propiedad.findByPk(id)

        if (!propiedad) {
            return res.redirect('/mis-propiedades')
        }

        // Revisar que quien visita la URL, es quien creo la propiedad
        if (!propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
            return res.redirect('/mis-propiedades')
        }

        // Reescribir el objeto y actualizarlo
    }
}

export {
    admin,
    crear,
    guardar,
    agregarImagen,
    almacenarImagen,
    editar
}