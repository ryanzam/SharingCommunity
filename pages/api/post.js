import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { getCookie } from 'cookies-next';

export default async function postHandler (req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("sharingClan");

        const { method, body } = req;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const pagination = req.query.pagination ? parseInt(req.query.pagination) : 5;
        
        const email = getCookie("email", {req, res});

        if(method == "GET"){
            const posts = await db.collection("items").find({"isApproved" : true})
                            .skip((page - 1) * pagination)
                            .limit(pagination)
                            .toArray();
            const totalPosts = await db.collection("items").countDocuments();
            res.json({posts, totalPosts});
        }

        if(method == "POST")
        {
            const { title, link } = body;            
            const session = await client.startSession();
            session.startTransaction();
            const user = await db.collection("users").findOne({"Email": email});
            const newPost = { title, link, isApproved: false, postedBy: user, clicked: 0, published: new Date() };   
            await db.collection("items").insertOne(newPost);
            session.commitTransaction();
            res.redirect("/user/dashboard?msg=Your post has been created.")
            return;
        }

        if(method == "PUT")
        {
            const { id } = req.query;
            const user = await db.collection("users").findOne({"Email": email});
            const found = await db.collection("items").findOne({ _id: ObjectId(id) });
            const updatedClick = found.clicked + 1;
            const post = await db.collection("items").updateOne({ _id: ObjectId(id) }, { $set: { clicked: updatedClick }});

            if(user && user._id != found.postedBy._id) {
                let coins = user.ClanCoins + 1; 
                await db.collection("users").updateOne({ _id: ObjectId(user._id) }, { $set: { ClanCoins: coins} });
            }
            res.json(post);
        }

    } catch (error) {
        console.error(error);
    }
}
