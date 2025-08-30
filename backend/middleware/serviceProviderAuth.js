import jwt from 'jsonwebtoken';

const authServiceProvider = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if the user has service provider role
        if (token_decode.role !== 'service_provider') {
            return res.json({ success: false, message: 'Not Authorized' });
        }
        
        req.user = token_decode; // Store user info in req.user for consistency
        req.body.serviceProviderId = token_decode.id; // Also add to req.body for backward compatibility
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default authServiceProvider;