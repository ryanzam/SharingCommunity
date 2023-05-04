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
            let post;
            const { id } = req.query;
            const user = await db.collection("users").findOne({"Email": email});
            const found = await db.collection("items").findOne({ _id: ObjectId(id) });

            if(user && user._id != found.postedBy._id) {
                let coins = user.ClanCoins + 1; 
                const updatedUser = await db.collection("users").findOneAndUpdate({ _id: ObjectId(user._id) }, { $set: { ClanCoins: coins} });
                found.clicked = found.clicked + 1;
                found.postedBy = updatedUser;
                post = await db.collection("items").findOneAndUpdate({ _id: ObjectId(id) }, { $set: found});
            }
            else {
                found.clicked = found.clicked + 1;
                post = await db.collection("items").findOneAndUpdate({ _id: ObjectId(id) }, { $set: found});
            }
            res.json(post);
        }

    } catch (error) {
        console.error(error);
    }
}
