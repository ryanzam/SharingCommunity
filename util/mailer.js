let nodemailer = require("nodemailer");

export async function emailNotificationToUsers(users, post) {
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

export async function emailVerification(user, uniqueStr) {
    try {
        let emailMsg = {
            from: '"SharingClan 👻" <sharingclan7@gmail.com>', 
            to: user, 
            subject: "Hello new Clan member ✔ Verify your email.", 
            text: "Please verify your email to be a clan member by clicking the link below.",
            html: `Click <a href="http://localhost:3000/api/emailverify?us=${uniqueStr}">the link </a> to verify your email. :)</h2>`,
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