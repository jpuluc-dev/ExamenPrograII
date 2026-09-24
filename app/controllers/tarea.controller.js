const db = require("../models");
const Tarea = db.tarea;
const Op = db.Sequelize.Op;


// Crear una tarea
exports.create = (req, res) => {
    const tarea = {
        nombre_artistico: req.body.nombre_artistico,
        genero_musical: req.body.genero_musical,
        pais_origen: req.body.pais_origen,
        fecha_registro: req.body.fecha_registro,
        status: req.body.status ? req.body.status : true
    }

    Tarea.create(tarea)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Se produjo un error al crear la tarea!"
            });
        });
};


// Listar todas las tareas
exports.findAll = (req, res) => {
    const nombre_artistico = req.query.nombre_artistico;
    var condition = nombre_artistico ? { nombre_artistico: { [Op.iLike]: `%${nombre_artistico}%` } } : null;

    Artista.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Se produjo un error al recuperar los artistas!"
            });
        });
};


// Obtener una tarea por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Artista.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al recuperar el artista con id=" + id
            });
        });
};


// Actualizar una tarea por id
exports.update = (req, res) => {
    const id = req.params.id;

    Artista.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El artista se actualizó correctamente."
                });
            } else {
                res.send({
                    message: `No se puede actualizar el artista con id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el artista con id=" + id
            });
        });
};


// Eliminar un tarea por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Artista.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El artista se eliminó correctamente!"
                });
            } else {
                res.send({
                    message: `No se puede eliminar el artista con id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el artista con id=" + id
            });
        });
};