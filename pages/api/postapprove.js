import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
let nodemailer = require("nodemailer");

export default async function postApproveHandler (req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("sharingClan");

        const { method, body } = req;

        if(method == "GET"){
            const posts = await db.collection("items").find({"isApproved" : false}).toArray();
            res.json(posts);
        }

        if(method == "POST")
        {
            const session = await client.startSession();
            session.startTransaction();
            const { pid, uid } = JSON.parse(body);      
            const user = await db.collection("users").findOne({ _id: ObjectId(uid) });
            user.ClanCoins = user.ClanCoins + 1; 
            await db.collection("users").findOneAndUpdate({_id : ObjectId(uid)}, { $set: user });
            
            const approvedpost = await db.collection("items").findOne({ _id: ObjectId(pid) });
            approvedpost.isApproved = true;
            approvedpost.postedBy = user;
            const updatedPost = await db.collection("items").findOneAndUpdate({_id : ObjectId(pid)}, {$set: approvedpost});
            session.commitTransaction();  
            
            const users = await db.collection("users").find({}).toArray();
            await emailNotify(users);
            res.json(updatedPost);
        }

        if(method == "PUT")
        {
            const { id } = req.query;
            const found = await db.collection("items").findOne({ _id: ObjectId(id) });
            found.Clicked = found.Clicked + 1;
            const post = await db.collection("items").findOneAndUpdate({ _id: ObjectId(id) }, { $set: found});
            res.json(post);
        }

    } catch (error) {
        console.error(error);
    }
}

async function emailNotify(users, post) {
    try {
        let emailList = users.map(u => u.Email);

        let emailMsg = {
            from: '"SharingClan 👻" <sharingclan@example.com>', 
            to: emailList.toString(), 
            subject: "Hello ✔ New post on our clan", 
            text: "You are notified of new post.",
            html: `<p> is posted by ryan</p>`,
        }
// only for test
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'mariane.shields54@ethereal.email',
                pass: '59p85gFGxQMfTWECrb'
            }
        }); 

        let info = await transporter.sendMail(emailMsg);
        console.log("Message sent: %s", info.messageId);

    }

        catch(error){
            console.log(error)
        }
}