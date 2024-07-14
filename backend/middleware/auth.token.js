import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    const authHeader = req.headers['authorization'];
    const parsedToken = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}