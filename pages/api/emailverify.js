import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function emailVerificationHandler(req, res){
    if(req.method == "GET"){
        const client = await clientPromise;
        const db = client.db("sharingClan");

        const { us } = req.query;

        const user = await db.collection("users").findOne({ UniqueStr: us });
        if(user) {
            user.IsVerified = true;
            await db.collection("users").findOneAndUpdate({_id : ObjectId(user._id)}, { $set: user });
            res.redirect("/user/signin?msg=Congrats! You are now a verified clan member.")
        } else {
            res.json("User doesn't exists.");
            return;
        }
    }
}