import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import emailNotify from "../../util/mailer";

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
            await emailNotify(users, approvedpost);
            res.json(updatedPost);
            return;
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