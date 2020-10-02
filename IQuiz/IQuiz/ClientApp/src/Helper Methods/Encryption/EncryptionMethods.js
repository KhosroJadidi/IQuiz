
export class EncryptionMethods {
    
    static encryptToBase64(params) {
        const encodedString= new Buffer(params).toString('base64');
        return encodedString;
    }
}