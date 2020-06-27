import { Router, Request, Response } from 'express';

import { User } from '../models/User';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { NextFunction } from 'connect';

import * as EmailValidator from 'email-validator';
import { config } from '../../../../config/config';

const router: Router = Router();
const saltRounds = 10;

async function generatePassword(plainTextPassword: string): Promise<string> {
    //Use Bcrypt to Generated Salted Hashed Passwords
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainTextPassword, salt);
    return hash;
}

async function comparePasswords(plainTextPassword: string, hash: string): Promise<boolean> {
    //Use Bcrypt to Compare your password to your Salted Hashed Password
    return await bcrypt.compare(plainTextPassword, hash);
}

function generateJWT(user: User): string {
    // Use jwt to create a new JWT Payload containing
    console.info(`Signing token ${ user.email } with ${ config.jwt.secret }.`)
    return jwt.sign(user.email, config.jwt.secret);
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {

    if (!req.headers || !req.headers.authorization){
        console.error('No authorization headers.')
        return res.status(401).send({ message: 'No authorization headers.' });
    }

    // Token is in the form Bearer jkbahjksgbdjagdfgakjhgs
    const token_bearer = req.headers.authorization.split(' ');
    if(token_bearer.length != 2){
        console.error(`Malformed token ${ req.headers.authorization } -- len ${ token_bearer.length }.`)
        var i;
        for (i = 0; i < token_bearer.length; i++) {
            console.error(`token_bearer[${i}]: ${ token_bearer[i] }`)
        }
        return res.status(401).send({ message: 'Malformed token.' });
    } else {
        console.info(`Well formed token ${ req.headers.authorization }.`)
        var i;
        for (i = 0; i < token_bearer.length; i++) {
            console.info(`token_bearer[${i}]: ${ token_bearer[i] }`)
        }
    }
    
    const token = token_bearer[1];

    return jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        console.error(`Wrong token ${ token } .`)
        return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
      }
      return next();
    });
}

router.get('/verification', 
    requireAuth, 
    async (req: Request, res: Response) => {
        return res.status(200).send({ auth: true, message: 'Authenticated.' });
});

router.post('/login', async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    // check email is valid
    if (!email || !EmailValidator.validate(email)) {
        return res.status(400).send({ auth: false, message: 'Email is required or malformed' });
    }

    // check email password valid
    if (!password) {
        return res.status(400).send({ auth: false, message: 'Password is required' });
    }

    const user = await User.findByPk(email);
    // check that user exists
    if(!user) {
        return res.status(401).send({ auth: false, message: 'Unauthorized' });
    }

    // check that the password matches
    const authValid = await comparePasswords(password, user.password_hash)

    if(!authValid) {
        return res.status(401).send({ auth: false, message: 'Unauthorized' });
    }

    // Generate JWT
    try {
        console.log(`\n\nGenerating a JWT for ${user} with ${config.jwt.secret}`);
        const jwt = generateJWT(user);
        console.log(`Sending a JWT token ${ jwt } \n\n`);
        res.status(200).send({ auth: true, token: jwt, user: user.short()});
    } catch {
        //console.error(error);
        return res.status(401).send({ auth: false, message: 'JWT generation error' });
    }
});

//register a new user
router.post('/', async (req: Request, res: Response) => {
    const email = req.body.email;
    const plainTextPassword = req.body.password;
    // check email is valid
    if (!email || !EmailValidator.validate(email)) {
        return res.status(400).send({ auth: false, message: 'Email is required or malformed' });
    }

    // check email password valid
    if (!plainTextPassword) {
        return res.status(400).send({ auth: false, message: 'Password is required' });
    }

    // find the user
    const user = await User.findByPk(email);
    // check that user doesnt exists
    if(user) {
        return res.status(422).send({ auth: false, message: 'User may already exist' });
    }

    const password_hash = await generatePassword(plainTextPassword);

    const newUser = await new User({
        email: email,
        password_hash: password_hash
    });

    let savedUser;
    try {
        savedUser = await newUser.save();
    } catch (error) {
        console.error(error);
        return res.status(401).send({ auth: false, message: 'Couldn\'t save the new user' });
    }

    // Generate JWT
    try {
        console.log(`\n\nGenerating a JWT for ${savedUser} with ${config.jwt.secret}`);
        const jwt = generateJWT(savedUser);
        console.log(`Sending a JWT token ${ jwt } \n\n`);
        res.status(200).send({ auth: true, token: jwt, user: savedUser.short()});
    } catch {
        //console.error(error);
        return res.status(401).send({ auth: false, message: 'JWT generation error' });
    }
});

router.get('/', async (req: Request, res: Response) => {
    res.send('auth')
});

export const AuthRouter: Router = router;