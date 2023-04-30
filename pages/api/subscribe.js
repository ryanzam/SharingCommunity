import clientPromise from "../../lib/mongodb";

export default async function subscribeHandler (req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("sharingClan");

        const { method, body } = req;

        if(method == "POST")
        {
            const { fullname, email } = req.body;
            const newSubscriber = { fullname, email };
            const subsriber = await db.collection("subscribers").insertOne(newSubscriber);
            res.json(subsriber);
        }
    } catch (error) {
        console.error(error);
    }
}