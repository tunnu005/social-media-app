import jwt from 'jsonwebtoken';

const Auth = (req, res, next) => {
    // Get the token from cookies
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        // Attach the decoded user ID to the request object
        req.userId = decoded.userId;
        next();
    });
};

export default Auth;
