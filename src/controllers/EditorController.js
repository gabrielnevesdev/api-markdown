const multer = require('multer');
const fs = require('fs');
const path = require('path');

class Editorcontroller{
    async index(req, res){
        console.log(req.file);
        const { file } = req;
        console.log(file);
        res.json({file});
    }
}

export default new Editorcontroller;