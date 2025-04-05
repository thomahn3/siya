import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const secretKey = process.env.SECRET_KEY
    ? crypto.createHash('sha256').update(process.env.SECRET_KEY).digest('base64').substr(0, 32)
    : (() => { throw new Error('SECRET_KEY is not defined'); })();
const iv = crypto.randomBytes(16); // Initialization vector

// Function to encrypt an email address
export function encryptEmail(email: string): string {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(email, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}

// Function to decrypt an email address
export function decryptEmail(encryptedEmail: string): string {
    const [ivHex, encrypted] = encryptedEmail.split(':');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(ivHex, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Example usage
//const email = 'example@example.com';
//const encryptedEmail = encryptEmail(email);
//console.log('Encrypted Email:', encryptedEmail);

//const decryptedEmail = decryptEmail(encryptedEmail);
//console.log('Decrypted Email:', decryptedEmail);