const { logger } = require("./logger");
const { get_id } = require("./misc");

const validPermissions = (collection) => {
    const validCollections = [
        "Admin",
        "Coordinador",
        "Coordinador Nacional",
        "Ejecutivo",
    ];
    return validCollections.includes(collection);
}
function checkPasswordLength(password) {
    if (password.length < 8) {
        return false;
    }
    return true;
}

const registerUser = async (request, response, db, bcrypt, jwt) => {
    const user = request.body.username;
    const pass = request.body.password;
    const fName = request.body.fullName;
    const email = request.body.email;
    const permissions = request.body.permissions;

    // Check that jwt is valid and user is admin

    try {
        let token = request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let token_user = verifiedToken.user;
        let admin_user = await db.collection("users").findOne({ "username": token_user });
        if (admin_user.permissions != "Admin") {
            response.sendStatus(401);
            return;
        }
    }
    catch {
        response.sendStatus(401);
        return;
    }

    if (!checkPasswordLength(pass)) {
        response.sendStatus(400);
        return;
    }
    if (!validPermissions(permissions)) {
        response.sendStatus(400);
        return;
    }
    let data = await db.collection("users").findOne({ "username": user });
    if (data == null) {
        try {
            bcrypt.genSalt(10, (error, salt) => {
                bcrypt.hash(pass, salt, async (error, hash) => {
                    let usuarioAgregar = {
                        "username": user, "password": hash, "fullName": fName, "email": email, "permissions": permissions
                    };
                    usuarioAgregar["id"] = await get_id(db, "users");
                    data = await db.collection("users").insertOne(usuarioAgregar);
                    response.json(data);
                })
            })
        } catch {
            response.sendStatus(401);
        }
    } else {
        response.sendStatus(400)
    }
};




const loginUser = async (request, response, db, bcrypt, jwt, log) => {
    let user = request.body.username;
    let pass = request.body.password;
    let data = await db.collection("users").findOne({ "username": user });

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
            return;
        }
        let data = await db.collection("users").find().project({ _id: 0, password: 0 }).toArray();
        response.set('Access-Control-Expose-Headers', 'X-Total-Count')
        response.set('X-Total-Count', data.length)
        data.password = undefined;

        response.json(data);
    } catch {
        response.sendStatus(401);
    }
}
const getUser = async (request, response, db, jwt) => {
    try {
        let token = request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let user = verifiedToken.user;
        let admin_user = await db.collection("users").findOne(
            { "username": user }
        );
        if (admin_user.permissions != "Admin") {
            response.sendStatus(401);
            return;
        }
        let data = await db.collection("users").findOne({ "id": Number(request.params.id) });
        logger(user, "ver usuario", request.params.id, db)

        delete data["_id"]
        delete data["password"]

        // Drop password
        response.json(data);
    }
    catch {
        response.sendStatus(401);
    }
}

const updateUser = async (request, response, db, bcrypt, jwt) => {
    try {
        let token = request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let user = verifiedToken.user;
        let admin_user = await db.collection("users").findOne({ "username": user });
        if (admin_user.permissions != "Admin") {
            response.sendStatus(401);
            return;
        }
        const numSaltRounds = 10;
        salt = bcrypt.genSalt(numSaltRounds)
        let data = {};


        const UpdateObject = request.body;
        const filter = { "id": Number(request.params.id) };

        // Convert pass into string
        const pass = String(UpdateObject.password);

        // check that password is not on UpdateObject
        if (UpdateObject.password) {
            if (!checkPasswordLength(pass)) {
                response.sendStatus(400);
                return;
            }

            try {
                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(pass, salt, async (error, hash) => {
                        UpdateObject.password = hash;
                        data = await db.collection("users").updateOne(filter, { $set: UpdateObject });
                        // check pass type
                    })
                })

            } catch {
                response.sendStatus(401);
                return;
            }
        }

        else {
            await db.collection("users").updateOne(filter, { $set: UpdateObject });
        }
        data = await db.collection("users").findOne(filter);
        delete data["_id"]
        delete data["password"]
        logger(user, "actualizar usuario", request.params.id, db)

        response.json(data);
    }
    catch {
        response.sendStatus(401);
    }
}



const deleteUser = async (request, response, db, jwt) => {
    try {
        let token = request.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let user = verifiedToken.user;
        let admin_user = await db.collection("users").findOne({ "username": user });
        if (admin_user.permissions != "Admin") {
            response.sendStatus(401);
            return;
        }
        const filter = { "id": Number(request.params.id) };
        await db.collection("users").deleteOne(filter);
        logger(user, "eliminar usuario", request.params.id, db)
        response.json({ "status": "ok" });
    }
    catch {
        response.sendStatus(401);
    }
}

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
};