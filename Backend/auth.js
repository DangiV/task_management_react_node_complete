import jsonwebtoken from 'jsonwebtoken'
let SECRETE_KEY = "nkfjkjhjkjhfdjkhfjkfjkfmkjkjkfjkjkfirioruioruijilfji";

export const createToken = (id) => {
    const token = jsonwebtoken.sign(id.toString(), SECRETE_KEY);
    console.log("token", token)
    return token;
}

export const authToken = (req, res, next) => {
    // console.log(222,req.headers)
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) {
        res.status(403).json("Person is unauthrized")
    }
    jsonwebtoken.verify(token, SECRETE_KEY, (error, User) => {
        if (error) {
            res.status(403).json("you are not unauthrized")
        }
        else {
            // console.log(333,User)
            req.User = User
            next();
        }
    })
}
