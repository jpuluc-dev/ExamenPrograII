module.exports = app => {
    const tareas = require("../controllers/tarea.controller.js");
    var router = require("express").Router();
    router.post("/create", tareas.create);
    router.get("/", tareas.findAll);
    router.get("/:id", tareas.findOne);
    router.put("/update/:id", tareas.update);
    router.delete("/delete/:id", tareas.delete);
    app.use("/api/tareas", router);
}; 
