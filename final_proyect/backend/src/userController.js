function checkPasswordLength(password) {
    if (password.length < 8) {
        return false;
    }
    return true;
}

const registerUser = async (request, response, db, bcrypt) => {
    let user = request.body.username;
    let pass = request.body.password;
    let fname = request.body.fullName;
    let email = request.body.email;

    if (!checkPasswordLength(pass)) {
        response.sendStatus(400);
    }

    let data = await db.collection("users").findOne({ "username": user });
    if (data == null) {
        try {
            bcrypt.genSalt(10, (error, salt) => {
                bcrypt.hash(pass, salt, async (error, hash) => {
                    let usuarioAgregar = { "username": user, "password": hash, "fullName": fname, "email": email };
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
        bcrypt.compare(pass, data.password, (error, result) => {
            if (result) {
                let token = jwt.sign({ usuario: data.usuario }, "secretKey", { expiresIn: 600 });
                response.json({ "token": token, "id": data.usuario, "fullName": data.fullName })
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