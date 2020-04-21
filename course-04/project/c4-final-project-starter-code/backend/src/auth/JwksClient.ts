import { JwtKey } from './JwtKey'
import { JwtKeySet } from './JwtKeySet'
import { certToPEM } from './utils'
import Axios from 'axios';
export class JwksClient {

    jwksUrl:string

    constructor(jwksUrl: string) {
        this.jwksUrl = jwksUrl;
    }

    
    async  __getJWKS(): Promise<JwtKeySet> {
        const resp = await Axios.get(this.jwksUrl )
        if(resp.status!=200)
            throw new Error('Could not fetch jwks')
        return resp.data as JwtKeySet
    }
    
    async  _getSigningKeys(): Promise<JwtKey[]>{
        const keySet = await this.__getJWKS()
        const keys = keySet.keys
        if (!keys || !keys.length) 
            throw new Error('The JWKS endpoint did not contain any keys')
        const signingKeys = keys
            .filter((key:JwtKey) => key.use === 'sig' // JWK property `use` determines the JWK is for signing
                        && key.kty === 'RSA' // We are only supporting RSA (RS256)
                        && key.kid           // The `kid` must be present to be useful for later
                        && ((key.x5c && key.x5c.length) || (key.n && key.e)) // Has useful public keys
            )
    
          if (!signingKeys.length) 
            throw new Error('The JWKS endpoint did not contain any keys')
    
        return signingKeys
          
          
    }
    
    async  __getSigningKey(kid:string):Promise<JwtKey>{   
        const keys = await this._getSigningKeys()
        const signingKey = keys.find((key:JwtKey)  => key.kid === kid);
        if (!signingKey) 
            throw new Error(`Unable to find a signing key that matches '${kid}'`)
        return signingKey
    }

    async getPublicKey(kid:string):Promise<string>{
        const jwtKey = await this.__getSigningKey(kid)
        return certToPEM(jwtKey.x5c[0])
    }
    
    
  }