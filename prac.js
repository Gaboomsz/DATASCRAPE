import axios from "axios";
import * as cheerio from "cheerio";

const url = 'https://cpdas.prc.gov.ph/public/index.aspx'

let results = [];
const response = await axios.get(url);
const $ = cheerio.load(response.data);

const title = $('.jakson h4 b').text().trim();
results.push({ title });
console.log(results);
console.log(response.data.slice(300000, 350000)); // print first ~1000 chars

// console.log(results);
//     const url = "https://quotes.toscrape.com/";
//         // Fetch the page
//         const response = await axios.get(url);
//         const html = response.data;
    
//         // Load HTML into Cheerio
//         const $ = cheerio.load(html);
    
//         let results = [];
    
//         $(".quote").each((i, el) => {
//             const text = $(el).find(".text").text();
//             const author = $(el).find(".author").text();
    
//             results.push({ text, author });
//         });
//         console.log(results);