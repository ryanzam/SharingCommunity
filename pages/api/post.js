import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function postHandler (req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("sharingClan");

        const { method, body } = req;

        if(method == "GET"){
            const posts = await db.collection("items").find({}).toArray();
            res.json(posts);
        }

        if(method == "POST")
        {
            const session = await client.startSession();
            const { title, link, userId } = body;
            const newPost = { title, link, isApproved: false, postedBy, clanCoins:0 };
            
            await db.collection("items").insertOne(newPost);
            await db.collection("users").findOne({ _id: ObjectId(userId)});       
            await session.commitTransaction();
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
