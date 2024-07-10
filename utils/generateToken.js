import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

function generateToken(user) {
	const payload = {
		id: user.id,
		username: user.username,
		role: user.role
	};
	return jwt.sign(payload, secretKey, { expiresIn: '7d' });
};

export default generateToken