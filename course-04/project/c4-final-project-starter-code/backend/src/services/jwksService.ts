import Axios from 'axios';

export class JwksService {
    private options: any;

    constructor(options) {
        this.options = {strictSsl: true, ...options};
    }

    async getJwks() {
        const response = await Axios.get(this.options.jwksUri, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data.keys
    }

    async getSigningKeys() {
        const keys = await this.getJwks();
        if (!keys || !keys.length) {
            throw new Error('The JWKS endpoint did not contain any keys')
        }

        const signingKeys = keys
            .filter(key => key.use === 'sig' // JWK property `use` determines the JWK is for signing
                && key.kty === 'RSA' // We are only supporting RSA
                && key.kid           // The `kid` must be present to be useful for later
                && key.x5c && key.x5c.length // Has useful public keys (we aren't using n or e)
            ).map(key => {
                return {kid: key.kid, nbf: key.nbf, publicKey: certToPEM(key.x5c[0])};
            });

        // If at least a single signing key doesn't exist we have a problem... Kaboom.
        if (!signingKeys.length) {
            throw new Error('The JWKS endpoint did not contain any signing keys')
        }

        // Returns all of the available signing keys.
        return signingKeys
    }


    async getSigningKey(kid) {
        const keys = await this.getSigningKeys();

        const signingKey = keys.find(key => key.kid === kid);

        if (!signingKey) {
            throw new Error(`Unable to find a signing key that matches '${kid}'`);
        }

        return signingKey
    }
}

export function certToPEM(cert) {
    cert = cert.match(/.{1,64}/g).join('\n');
    cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
    return cert;
}
