import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
if (!process.env.SECRET_KEY) {
    throw new Error('SECRET_KEY is not defined in the environment variables');
}
// Buffer.from(process.env.SECRET_KEY, 'hex');
const key = process.env.SECRET_KEY// Ensure key is a valid Buffer
const iv = crypto.randomBytes(16);

export async function encrypt(text: string): Promise<string> {
    const cipher = crypto.createCipheriv(algorithm, key as crypto.CipherKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}

export async function decrypt(encryptedText: string): Promise<string> {
    const [ivHex, encrypted] = encryptedText.split(':');
    const decipher = crypto.createDecipheriv(algorithm, key as crypto.CipherKey, Buffer.from(ivHex, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export async function compare(text: string, encryptedText: string): Promise<boolean> {
    try {
        const decryptedText = await decrypt(encryptedText);

        // Use a constant-time comparison to prevent timing attacks
        return crypto.timingSafeEqual(
            Buffer.from(text, 'utf8'),
            Buffer.from(decryptedText, 'utf8')
        );
    } catch (error) {
        // If decryption fails, return false
        console.error("Decryption error:", error);
        return false;
    }
}