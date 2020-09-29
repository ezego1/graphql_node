import JWT from 'jsonwebtoken'
import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'

export const signAccessToken = (userId: any, username) => {
    return new Promise((resolve, rejects) => {
        const payload = {userId}
        const secret = process.env.SECRET_KEY as string
        const option = {expiresIn: '1h', issuer: 'ezego1', audience: username}
        JWT.sign(payload, secret, option, (error, token) => {
            if (error) {
                console.log(error)
                rejects(new createError.InternalServerError())
            }
            
            resolve(token)
        })
    })  
}

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get("Authorization");
   
    if (!authHeader) {
      req["isAuth"] = false;
      return next();
    }
    
    const token = authHeader.split(' ')[1]

     if (!token || token === "") {
       req["isAuth"] = false;
       return next();
     }
    

     let decodedToken
    try {
        decodedToken = JWT.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        req["isAuth"] = false
        return next()
    }
    console.log(decodedToken)
    if (!decodedToken) {
        req["isAuth"] = false;
        return next();
    }
    req["isAuth"] = true
    req["userId"] = decodedToken.userId
    next()
}