import clientPromise from "../../../lib/mongodb";

const createPost = async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("sharingClan");
        const {title, link} = req.body;

        const post = await db.collection("posts")
            .insertOne({
                title,
                link,
            });

        res.json(post);

    } catch (error) {
        console.error(e);
    }
}

export default createPost;