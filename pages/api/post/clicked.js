import clientPromise from "../../../lib/mongodb";
import {} from "mongodb";

const clickedLink = async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("sharingClan");
        const { id } = req.query;

    } catch (error) {
        console.error(e);
    }
}

export default clickedLink;