import {db} from '../db.js';
import bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';

class AuthController{
    register(req, res, next){
        if(!req.body.email || !req.body.username || !req.body.password) 
            return res.status(404).json('Data is required!');

        const queryExists = `SELECT * FROM users us WHERE us.email = ? AND us.username = ?`;
        
        db.query(queryExists, [req.body.email, req.body.username], (err, data) =>{
            if(err) return res.json(err);
            if(data.length) return res.status(404).json('User already exists!');

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            
            const query = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
            const value = [
                req.body.username,
                req.body.email,
                hash,
            ];

            db.query(query, [value], (err, data)=>{
                if(err) return res.json(err);
                return res.status(200).json('User has been created.');
            });
        });
    }

    login(req, res, next){
        if(!req.body.username || !req.body.password) 
            return res.status(404).json('Data is required!');

        const queryExists = `SELECT * FROM users us WHERE us.username = ?`;
        
        db.query(queryExists, [req.body.username], (err, data) => {
            if(err) return res.json(err);
            if(data.length === 0) return res.status(404).json('User not found!');

            
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
            if(!isPasswordCorrect) return res.status(404).json('Wrong username or password!');

            
            const token = Jwt.sign({id: data[0].id}, 'jwtkey');
            const {password, ...other} = data[0];

            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(other);
        });
    }

    logout(req, res, next){
        res.clearCookie("access_token", {
            sameSite: "none",
            secure: true,
        }).status(200).json("User has been logged out.");
    }
}

export default new AuthController();