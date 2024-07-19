import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.sendStatus(401); // No token provided
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Invalid token
        }
        req.user = user; // Assuming 'user' contains the necessary user info
        next();
    });
}