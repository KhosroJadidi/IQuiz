
export class Encryption {
    
    static EncryptToBase64(params) {
        const encodedString= new Buffer(params).toString('base64');
        return encodedString;
    }
}