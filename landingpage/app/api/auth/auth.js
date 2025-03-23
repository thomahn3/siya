import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation'

const users = [
    { email: 'user@user.com', password: '1234' } // Example hashed password
  ];

export default async function login(req, res) {
  const { email, password } = req.body;
  // Find user by email
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }
  // Compare password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // Create a JWT token
  const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY , { expiresIn: '1h' });
  return res.status(200).json({ token });
}

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    redirect('/admin')
  } catch (err) {
    setError('Invalid credentials');
  }
};