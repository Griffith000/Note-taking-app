export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    console.log(`Token: ${token}`); // Log the token for debugging
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log(`JWT Error: ${err.message}`); // Log any errors from jwt.verify
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}