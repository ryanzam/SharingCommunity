import Cookies from 'cookies'
import clientPromise from "../../lib/mongodb";
const {createHash} = require('node:crypto');

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
        const bodyObject = {
            Username: username,
            Password: password_hash,
            Email: email,
            Created: new Date().toUTCString()
        }
        await db.collection("users").insertOne(bodyObject);
        const cookies = new Cookies(req, res)
        cookies.set('username', username)
        res.redirect("/")
    } else {
        res.redirect("/")
    }
}