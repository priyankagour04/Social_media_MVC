import jwt from 'jsonwebtoken';

const ensureAuthenticated = (req, res, next) => {
  // Get the token from the `Authorization` header
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ 
      message: "Unauthorized, JWT token is required and should be in 'Bearer <token>' format" 
    });
  }

  // Extract the token by removing 'Bearer '
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the decoded user payload to the request object
    req.user = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ 
        message: "Unauthorized, JWT token is expired" 
      });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ 
        message: "Unauthorized, JWT token is invalid" 
      });
    } else {
      return res.status(403).json({ 
        message: "Unauthorized, an error occurred during token verification" 
      });
    }
  }
};

export default ensureAuthenticated;
