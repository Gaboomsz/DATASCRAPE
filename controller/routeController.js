import axios from "axios";
import * as cheerio from "cheerio";

export const quotesController = async (req, res) => {
    const url = "https://quotes.toscrape.com/";
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
    
        let results = [];
    
        $(".quote").each((i, el) => {
            const text = $(el).find(".text").text();
            const author = $(el).find(".author").text();
            const tags = $(el).find(".tags .tag").map((i, tag) => $(tag).text()).get();
    
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

        let pokedexData = {};
        const pokedexHeader = $('h2:contains("Pokédex data")');
        const pokedexTable = pokedexHeader.next('.vitals-table');

        pokedexTable.find('tr').each((i, row) => {
            let title = $(row).find('th').text().trim();
            let data;   

            if ($(row).find('td small').length > 0) {
                data = $(row).find('td small').map((i, el) => 
                    $(el).text().trim()
                ).get();
            }
            else if($(row).find('td a').length > 0) {
                data = $(row).find('td a').map((i, el) => 
                    $(el).text().trim()
                ).get();
            }
            else {
                data = $(row).find('td').text().trim();
            }

            pokedexData[title] = data;
        });

        let trainingData = {};
        const trainingHeader = $('h2:contains("Training")');
        const trainingTable = trainingHeader.next('.vitals-table');

        trainingTable.find('tr').each((i, row) => {
            const title = $(row).find('th').text().trim();
            const data = $(row).find('td').text().trim();

            trainingData[title] = data;
        });

        res.json({
            name,
            pokedexData,
            trainingData
        });
    }
    catch (err) {
        res.json(err);
    }
}

//not working pa
export const prcController = async (req, res) => {
    const url = 'https://cpdas.prc.gov.ph/public/index.aspx'

    let results = [];
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const title = $(sort).find('.jakson h4 b').text().trim();
        results.push({ title });

        console.log(results);
        res.json(results);
    }
    catch (err) {
        res.json(err);
    }
}