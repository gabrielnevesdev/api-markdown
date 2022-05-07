const multer = require('multer');
const fs = require('fs');
const path = require('path');

class Editorcontroller{
    async index(req, res){
        const b = new Blob(req.body)
        const text =await b.text(req.body)
        console.log(text);

       fs.writeFile(path.resolve(__dirname, '..','..', 'tmp', 'uploads', "testando.md"), b, (err) => {
            if(err) throw err;
            res.send('File uploaded successfully.');
        }
        )
    }
}

export default new Editorcontroller;