import clientPromise from "../../lib/mongodb";

export default async function featuredpostHandler(req, res){
    if(req.method == "GET"){
        const client = await clientPromise;
        const db = client.db("sharingClan");

        const items = await db.collection("items").find().sort({"clicked": -1}).limit(3).toArray();
        res.json(items);
    }
}