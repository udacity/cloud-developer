import {Request, Response, Router} from 'express';

import {User} from '../models/User';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import {NextFunction} from 'connect';

import * as EmailValidator from 'email-validator';
import {config} from '../../../../config/config';

const router: Router = Router();
const saltRounds = 10;

async function generatePassword(plainTextPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
}

async function comparePasswords(plainTextPassword: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hash);
}

function generateJWT(user: User): string {
    return jwt.sign(user.toJSON(), config.jwt.secret);
}

function validateRequest(email: string, password: string): string {
    if (!email || !EmailValidator.validate(email)) {
        return 'Email is required or malformed';
    }

    if (!password) {
        return 'Password is required';
    }

    return null;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.headers || !req.headers.authorization) {
        return res.status(401).send({message: 'No authorization headers.'});
    }

    const token_bearer = req.headers.authorization.split(' ');

    if (token_bearer.length !== 2) {
        return res.status(401).send({message: 'Malformed token.'});
    }

    const token = token_bearer[1];

    return jwt.verify(token, config.jwt.secret, (err) => {
        if (err) {
            return res.status(500).send({auth: false, message: 'Failed to authenticate.'});
        }
        return next();
    });
}

router.get('/verification',
    requireAuth,
    async (req: Request, res: Response) => {
        return res.status(200).send({auth: true, message: 'Authenticated.'});
    });

router.post('/login', async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    const errorMessage = validateRequest(email, password);

    if (errorMessage != null) {
        return res.status(400).send({auth: false, message: errorMessage});
    }

    const user = await User.findByPk(email);
    // check that user exists
    if (!user) {
        return res.status(401).send({auth: false, message: 'Unauthorized'});
    }

    // check that the password matches
    const authValid = await comparePasswords(password, user.password_hash);

    if (!authValid) {
        return res.status(401).send({auth: false, message: 'Unauthorized'});
    }

    // Generate JWT
    const token = generateJWT(user);

    res.status(200).send({auth: true, token: token, user: user.short()});
});

// register a new user
router.post('/', async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    const errorMessage = validateRequest(email, password);

    if (errorMessage != null) {
        return res.status(400).send({auth: false, message: errorMessage});
    }

    // find the user
    const user = await User.findByPk(email);
    // check that user doesnt exists
    if (user) {
        return res.status(422).send({auth: false, message: 'User may already exist'});
    }

    const password_hash = await generatePassword(password);

    const newUser = await new User({
        email: email,
        password_hash: password_hash
    });

    let savedUser;
    try {
        savedUser = await newUser.save();
    } catch (e) {
        throw e;
    }

    // Generate JWT
    const token = await generateJWT(savedUser);

    res.status(201).send({token: token, user: savedUser.short()});
});

router.get('/', async (req: Request, res: Response) => {
    res.send('auth');
});

export const AuthRouter: Router = router;
