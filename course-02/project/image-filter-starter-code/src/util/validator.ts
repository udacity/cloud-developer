import http = require('http');
import https = require('https');

/**
 * provides a promise that validates and resolves the input url
 *
 * @param url the url to validate
 */
export function validateImageUrl(url: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        try {
            let response = null;
            if (url.startsWith("https")) {
                https.get(url, {method: 'HEAD'}, res => {
                    resolve(verifyImageHeader(res));
                });
            } else {
                http.get(url, {method: 'HEAD'}, res => {
                    resolve(verifyImageHeader(res));
                });
            }
        } catch (err) {
            resolve(false);
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
            return contentType.indexOf('image') !== -1;
        }
        default:
            return false;
    }

}
