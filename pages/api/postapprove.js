import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { getCookie } from 'cookies-next';

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
            const { id } = JSON.parse(body);       
            await db.collection("items").findOneAndUpdate({_id : ObjectId(id)}, {$set: {isApproved: true}});
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
