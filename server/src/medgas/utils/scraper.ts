import puppeteer from "puppeteer";
import cron from "node-cron";
import { MedGas } from "../model/medgas.model";
import { EType } from "../store/enum/type.enum";

async function scrapePricingData() {
    try {
        const url = "https://snowtrace.io";
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: "networkidle0" });

        // Evaluate the page to extract the data
        const { nAVAXPrice, usdPrice } = await page.evaluate(() => {
            let nAVAXPrice = "";
            let usdPrice = "";

            // Find the header with the text Med Gas Price
            const allHeaders = Array.from(
                document.querySelectorAll(".v2-card-header")
            );
            const medGasHeader = allHeaders.find((header: any) =>
                header.textContent.includes("Med Gas Price")
            );

            if (medGasHeader) {
                // Navigate to the common parent shared with a tag
                const parentDiv: any = medGasHeader.closest("div");

                // Get the span with the nAVAX price
                const aTag = parentDiv.nextElementSibling;
                if (aTag && aTag.href.includes("/gastracker")) {
                    nAVAXPrice = aTag.querySelector("span").textContent.trim();
                }

                // Get the span with the USD price
                const usdSpan = aTag
                    ? aTag.nextElementSibling.querySelector("span")
                    : null;
                if (usdSpan) {
                    usdPrice = usdSpan.textContent.trim().replace(/\(|\)/g, "");
                }
            }

            return { nAVAXPrice, usdPrice };
        });

        await browser.close();
        return { nAVAXPrice, usdPrice };
    } catch (error) {
        console.error("Error fetching MedGas data:", error);
        throw error;
    }
}

export async function savePricingData(type: EType) {
    try {
        const { nAVAXPrice, usdPrice } = await scrapePricingData();
        console.log("Fetched new Med Gas Price:", nAVAXPrice, usdPrice);
        const newMedGas = new MedGas({
            createdAt: Date.now(),
            nAVAXPrice,
            usdPrice,
            type: type === EType.CRON ? EType.CRON : EType.USER,
        });

        await newMedGas.save();
        if (type === EType.USER) {
            return newMedGas;
        }
        console.log("Saved new Med Gas Price:", nAVAXPrice, usdPrice);
    } catch (error) {
        console.error("Error saving pricing data:", error);
    }
}

export async function runCron() {
    cron.schedule("*/3 * * * *", () => {
        savePricingData(EType.CRON);
    });
}
