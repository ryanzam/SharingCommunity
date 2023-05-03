import puppeteer from "puppeteer";

export default async function previewHandler(req, res){
    try {
        const {link} = req.query;
        let image = await getImageBase64(link);
        res.status(200).json({
            image,
        });
    } catch (error) {
        res.status(500).json({
            error: JSON.stringify(error),
          });
    }
}

let getImageBase64 = async (url) => {
    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(url);
    let image = await page.screenshot({ encoding: "base64" });
    await browser.close();
    return image;
  };