import Cookies from 'cookies'
import clientPromise from "../../lib/mongodb";
const {createHash} = require('node:crypto');

export default async function authenticationHandler(req, res) {
    const { method, body } = req;
    const client = await clientPromise;
    const db = client.db("sharingClan");

    if (method == "POST"){
        const email = body['email']
        const guess = body['password']

        const users = await db.collection("users").find({"Email": email}).toArray();
        if (users.length == 0){
            res.redirect("/user/signin?msg=Incorrect username or password");
            return;
        }
        const user = users[0]
        const guess_hash = createHash('sha256').update(guess).digest('hex');
        if (guess_hash == user.Password){
            const cookies = new Cookies(req, res)
            cookies.set('email', email)
            res.redirect("/")
        } else {
            res.redirect("/login?msg=Incorrect email or password")
        }
    } else {
        res.redirect("/")
    }

    if (req.method == "GET"){
        const cookies = new Cookies(req, res)
        cookies.set('email')
        res.redirect("/")
      } 
      else {
        res.redirect("/")
    }
}