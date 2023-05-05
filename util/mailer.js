let nodemailer = require("nodemailer");

export default async function emailNotify(users, post) {
    try {
        let emailList = users.filter(u => u.Email != post.postedBy.Email).map(e => e.Email);

        let emailMsg = {
            from: '"SharingClan 👻" <sharingclan@example.com>', 
            to: emailList, 
            subject: "Hello ✔ New post on our clan", 
            text: "You are notified of new post.",
            html: `<h2>"${post.title}" is posted by ${post.postedBy.Username} <a href="http://localhost:3000/posts">Check out posts</a></h2>`,
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        }); 

        let info = await transporter.sendMail(emailMsg);
        console.log("Message sent: %s", info.messageId);

    }

        catch(error){
            console.log(error)
        }
}