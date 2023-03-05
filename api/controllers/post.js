import { db } from '../db.js';
import jwt from 'jsonwebtoken';

class PostController{
    getPosts(req, res, next){
        const q = req.query.cat? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts";

        db.query(q, [req.query.cat], (err, data) => {
            if(err) return res.send(err);
            
            res.status(200).json({
                status: "SUCCES",
                results: data,
                length: data.length
            });
        })
    }
    getPost(req, res, next){
        const q = `SELECT p.id, p.title, p.desc, p.img, p.cat, p.date, u.username, u.img AS avt FROM posts p INNER JOIN users u ON u.id = p.uid WHERE p.id = ?`;

        db.query(q, [req.params.id], (err, data) => {
            try{
                if(err) return res.send(err);
                if(data.length === 0) {
                        res.status(200).json({
                        results: "NOT FOUND POST"
                    });
                }   
      
                res.status(200).json({
                    status: "SUCCES",
                    results: data[0],
                    length: 1
                });
            }
            catch (ex){
                console.log(ex);
            }
        })
    }
    addPost(req, res, next){
        const token = req.cookies.access_token;
        if(!token) return res.status(401).json("Not authenticated!");

        jwt.verify(token, "jwtkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!");

            const q = "INSERT INTO posts (`title`,`desc`,`cat`,`img`,`date`,`uid`) VALUES (?)";

            const values = [
                req.body.title,
                req.body.desc,
                req.body.cat,
                req.body.img,
                req.body.date,
                userInfo.id,
            ]

            db.query(q, [values], (err, data) => {
                try{

                    console.log(err)
                    if(err) return res.status(403).send("You can't create post!");

                    return res.status(200).json({
                        status: "SUCCESS",
                        results: "Post has been created.",
                        length: 1
                    });
                }
                catch (ex){
                    console.log(ex);
                }
            })
        })
    }
    updatePost(req, res, next){
        const token = req.cookies.access_token;
        if(!token) return res.status(401).json("Not authenticated!");

        jwt.verify(token, "jwtkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!");

            const postId = req.params.id;
            const q = "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id`=? AND `uid`=?";

            db.query(q, [req.body.title, req.body.desc, req.body.img, req.body.date, req.body.cat, postId ], (err, data) => {
                try{
                    if(err) return res.status(403).send("You can only update your post!");

                    return res.status(200).json({
                        status: "SUCCESS",
                        message: "Post has been updated.",
                        results: { postId: postId },
                        length: 1
                    });
                }
                catch (ex){
                    console.log(ex);
                }
            })
        })
    }
    deletePost(req, res, next){
        console.log('DELETE')
        const token = req.cookies.access_token;
        if(!token) return res.status(401).json("Not authenticated!");

        jwt.verify(token, "jwtkey", (err, userInfo)=>{
            if(err) return res.status(403).json("Token is not valid!");

            const postId = req.params.id;
            const q = "DELETE FROM posts WHERE id = ? AND uid = ?";

            db.query(q, [postId, userInfo.id ], (err, data) => {
                try{
                    if(err) return res.status(403).send("You can delete only your post!");

                    return res.status(200).json({
                        status: "SUCCESS",
                        results: "Post has been deleted!",
                        length: 1
                    });
                }
                catch (ex){
                    console.log(ex);
                }
            })
        })
    }
}

export default new PostController();