import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace("Bearer ", '');
    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123')
            req.userId = decoded._id
        } catch (err) {
            return res.status(403).json({
                message: 'Not allowed'
            })
        }
        next()
    } else {
        return res.status(403).json({
            message: 'Accept not allowed'
        })
    }
}