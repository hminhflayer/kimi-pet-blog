'use strict';

import multer from "multer";
import postsRouter from './posts.js';
import authRouter from './auth.js';
import usersRouter from './users.js';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ 
    storage: storage
});

function route(app){
    app.use('/api/post', postsRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/user', usersRouter);

    
    app.post('/api/upload', upload.single('file'), function (req, res, next) {
        const file = req.file;
        res.status(200).json(file.filename)
    })

    app.get('/', (req, res, next) => {
        res.status(404)
            .json({
                status: "FAIL",
                message: "NOT FOUND API"
            });
    });
}

export default route;