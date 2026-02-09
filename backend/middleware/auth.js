import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js'

const verifyToken = (req, res, next) => {

    const header = req.headers.authorization;
    const token = header && header.split(' ')[1];

    if(!token){

        return res.status(401).json({message: 'no token provide'});

    };


    jwt.verify(token, process.env.JWT, (err, decoded) => {

        if(err){

            return res.status(403).json({message: 'Invalid or expired token'});

        };

        req.userId = decoded._id;

        next();

    });

};

// Si les visiteurs doivent créer un compte pour commenter les articles et tout au moins on a déjà le isAdmin

const isAdmin = async (req, res, next) => {

    try{

        const user = await User.findById(req.userId);

        if(user && user.isAdmin){

            next();

        } else {

            return res.status(403).json({message: 'Acces denied: Admins only'});

        }

    } catch(err) {

        return res.status(401).json({message: 'Unauthorized'});

    };

};


export const auth = {
    verifyToken,
    isAdmin
}