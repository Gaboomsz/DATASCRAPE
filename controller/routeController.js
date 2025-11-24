import axios from "axios";
import * as cheerio from "cheerio";

export const quotesController = async (req, res) => {
    const url = "https://quotes.toscrape.com/";
    try {
        // Fetch the page
        const response = await axios.get(url);
        const html = response.data;
    
        // Load HTML into Cheerio
        const $ = cheerio.load(html);
    
        let results = [];
    
        $(".quote").each((i, el) => {
            const text = $(el).find(".text").text();
            const author = $(el).find(".author").text();
    
            results.push({ text, author, tags });
        });
    
        res.json(results);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
} 

export const pokemonController = async (req, res) => {
    const url = "https://pokemondb.net/pokedex/charmander";
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
    
        const name = $("h1").text().trim();
    
        const tableRows = $(".vitals-table tr");
        const natNumber = $(tableRows[0]).find("td").text().trim();
        const types = $(tableRows[1]).find("td a").map((i, el) => $(el).text().trim()).get();
        const species = $(tableRows[2]).find("td").text().trim();
        const height = $(tableRows[3]).find("td").text().trim();
        const weight = $(tableRows[4]).find("td").text().trim();
        const abilities = $(tableRows[5]).find("td a").map((i, el) => $(el).text().trim()).get();
    
        res.json({
            name,
            natNumber,
            types,
            species,
            height,
            weight,
            abilities
        });
    } 
    catch (err) {
        res.json(err);
    }
}