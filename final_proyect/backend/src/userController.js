const { logger } = require("./logger");

function checkPasswordLength(password) {
    if (password.length < 8) {
        return false;
    }
    return true;
}

const registerUser = async (request, response, db, bcrypt) => {
    const user = request.body.username;
    const pass = request.body.password;
    const fName = request.body.fullName;
    const email = request.body.email;
    const permissions = request.body.permissions;

    if (!checkPasswordLength(pass)) {
        response.sendStatus(400);
    }

    let data = await db.collection("users").findOne({ "username": user });
    if (data == null) {
        try {
            bcrypt.genSalt(10, (error, salt) => {
                bcrypt.hash(pass, salt, async (error, hash) => {
                    let usuarioAgregar = {
                        "username": user, "password": hash, "fullName": fName, "email": email, "permissions": permissions
                    };
                    data = await db.collection("users").insertOne(usuarioAgregar);
                    response.sendStatus(201);
                })
            })
        } catch {
            response.sendStatus(401);
        }
    } else {
        response.sendStatus(401)
    }
};


const loginUser = async (request, response, db, bcrypt, jwt, log) => {
    let user = request.body.username;
    let pass = request.body.password;
    let data = await db.collection("users").findOne({ "username": user });
    console.log(jwt)

    if (data == null) {
        response.sendStatus(401);
    } else {
        bcrypt.compare(pass, data.password, (error, result) => {
            if (result) {
                let token = jwt.sign({ user: data.username, permissions: data.permissions }, "secretKey", { expiresIn: 360000 });
                response.json({ "token": token, "id": data.username, "fullName": data.fullName })
                logger(data.username, "login", "", db)
            } else {
                response.sendStatus(401)
            }
        })
    }
};

const getAllUsers = async (request, response, db, jwt) => {
    try {
        let token = request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let user = verifiedToken.user;
        let admin_user = await db.collection("users").findOne({ "username": user });
        if (admin_user.permissions != "Admin") {
            response.sendStatus(401);
        }
        let data = await db.collection("users").find().project({ _id: 0 }).toArray();
        response.set('Access-Control-Expose-Headers', 'X-Total-Count')
        response.set('X-Total-Count', data.length)

        response.json(data);
    } catch {
        response.sendStatus(401);
    }
}

module.exports = {
    registerUser,
    loginUser,
    getAllUsers
};