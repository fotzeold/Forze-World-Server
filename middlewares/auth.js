import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET

function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) return res.status(401).json({ message: "Токен не було отримано", status: false });

	jwt.verify(token, secretKey, (err, user) => {
		if (err) return res.status(403).json({ message: "Токен не вірний", status: false });
		req.user = user;
		next();
	});
};

function authorizeRoles(...roles) {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return res.status(403).json({ message: 'У Вас немає доступу!' });
		}
		next();
	};
};

export { authenticateToken, authorizeRoles }