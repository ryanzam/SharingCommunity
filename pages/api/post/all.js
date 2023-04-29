import clientPromise from "../../../lib/mongodb";

const posts = async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("sharingClan");

        const posts = await db.collection("items")
        .find({})
        .toArray();

        res.json(posts);

    } catch (error) {
        console.error(e);
    }
}

export default posts;