import * as bcrypt from 'bcrypt';
const plain_text_password: string = 'T0nyTr0nic$';

const salt_rounds = 13;
const salt = async () => {await bcrypt.genSalt(salt_rounds)};
const hash = async () => {await bcrypt.hash(plain_text_password, salt)};
//const compare = await bcrypt.compare(plain_text_password, hash);

const account = async () => {
    await bcrypt.hash(plain_text_password, salt);
};

