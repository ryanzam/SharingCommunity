import clientPromise from "../../lib/mongodb";
const {createHash} = require('node:crypto');
import { UserType } from "../../models/IIModels";
import { RandomString } from "../../util/randomstring";
import { emailVerification } from "../../util/mailer";

const avatar = ["girl1", "girl2", "man1", "man2"];

export default async function registerHandler(req, res) {
    const { method, body } = req;

    if (method == "POST"){
        const username = body['username']
        const email = body['email']
        const password = body['password']
        const confirmPassword = body['confirmPassword']
        if (password != confirmPassword){
            res.redirect("/user/register?msg=Passwords don't match.");
            return;
        }
        const client = await clientPromise;
        const db = client.db("sharingClan");
        const users = await db.collection("users").find({"Username": username}).toArray();
        if (users.length > 0){
            res.redirect("/user/register?msg=You are already one of the clan. Enter clan to post.");
            return;
        }
        const password_hash = createHash('sha256').update(password).digest('hex');
        const uniqueStr = RandomString();

        const bodyObject = {
            Username: username,
            Password: password_hash,
            Email: email,
            Created: new Date().toUTCString(),
            ClanCoins: 0,
            UserType: UserType.Guest,
            UniqueStr: uniqueStr,
            IsVerified: false,
            Avatar: avatar[Math.floor(Math.random()*avatar.length)]
        }
        await db.collection("users").insertOne(bodyObject);
        emailVerification(email, uniqueStr);
        res.redirect("/user/signin?msg=We have sent you an email. Please check your email and verify.");
    } else {
        res.redirect("/")
    }
}