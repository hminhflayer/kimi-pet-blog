'use strict';

import postsRouter from './posts.js';
import authRouter from './auth.js';
import usersRouter from './users.js';

function route(app){
    app.use('/api/post', postsRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/user', usersRouter);

    app.get('/', (req, res, next) => {
        res.status(404)
            .json({
                status: "FAIL",
                message: "NOT FOUND API"
            });
    });
}

export default route;