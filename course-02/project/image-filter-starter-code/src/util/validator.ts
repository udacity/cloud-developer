import http = require('http');
import https = require('https');

export enum ValidatorConstants {
    OK = 1,
    NOT_AN_IMAGE = 2,
    NOT_A_VALID_URL = 3
}

/**
 * provides a promise that validates and resolves the input url
 *
 * @param url the url to validate
 */
export function validateImageUrl(url: string): Promise<ValidatorConstants> {
    return new Promise(async (resolve, reject) => {
        try {
            if (url.startsWith("https://")) {
                https.get(url, {method: 'HEAD'}, res => {
                    resolve(verifyImageHeader(res));
                });
            } else if (url.startsWith("http://")) {
                http.get(url, {method: 'HEAD'}, res => {
                    resolve(verifyImageHeader(res));
                });
            } else {
                resolve(ValidatorConstants.NOT_A_VALID_URL);
            }
        } catch (err) {
            resolve(ValidatorConstants.NOT_A_VALID_URL);
        }
    });
}

/**
 * given an incoming response object for a http call, verifies the
 * content type header to validate the content type is an image
 *
 * @param res the incoming message object from the http call
 * @return true if the header species the content type as image, false otherwise
 */
function verifyImageHeader(res: http.IncomingMessage) {
    const headers = res.headers;
    const contentType = headers['content-type'];
    switch (typeof contentType) {
        case 'string' : {
            return contentType.indexOf('image') !== -1 ? ValidatorConstants.OK : ValidatorConstants.NOT_AN_IMAGE;
        }
        default:
            return ValidatorConstants.NOT_AN_IMAGE;
    }

}
