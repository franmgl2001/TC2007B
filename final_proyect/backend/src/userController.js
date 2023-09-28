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


const loginUser = async (request, response, db, bcrypt, jwt) => {
    let user = request.body.username;
    let pass = request.body.password;
    let data = await db.collection("users").findOne({ "username": user });
    if (data == null) {
        response.sendStatus(401);
    } else {
        console.log(data);
        bcrypt.compare(pass, data.password, (error, result) => {
            if (result) {
                let token = jwt.sign({ usuario: data.username }, "secretKey", { expiresIn: 3600 });
                response.json({ "token": token, "id": data.user, "fullName": data.fullName })
            } else {
                response.sendStatus(401)
            }
        })
    }
};


module.exports = {
    registerUser,
    loginUser,
};