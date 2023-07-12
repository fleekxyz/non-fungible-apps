import * as crypto from 'crypto';

export function isTheSignatureValid(
    body: string, // must be raw string body, not json transformed version of the body
    signature: string, // the "lambda-signature" from header
    signingKey: string // signing secret key for front-end
): boolean {
    const hmac = crypto.createHmac('sha256', signingKey); // Create a HMAC SHA256 hash using the signing key
    hmac.update(body, 'utf8'); // Update the token hash with the request body using utf8
    const digest = hmac.digest('hex');
    return signature === digest; // returns true for valid and false for invalid
}