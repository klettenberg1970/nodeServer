import RSS from '../../models/rssModel.js';
import Parser from 'rss-parser';

const parser = new Parser();


export async function getnamen(req, res) {
  
  const feeds = await RSS.find();
  const sortierteNamen = feeds
    .map(element => element.name)
    .sort((a, b) => a.localeCompare(b, 'de', { sensitivity: 'base' }));

  res.json(sortierteNamen || []);
}

export async function getAllFeeds (req,res){
  const feeds = await RSS.find();
  console.log(feeds)
  res.json({feeds:feeds})
}

export async function getfeeds(req, res) {
  const name = req.body.name;
  const feeds = await RSS.find();
  const feedObj = feeds.find(feed => feed.name === name);

  // WICHTIG: Prüfen ob feedObj UND feedObj.url existieren
  if (!feedObj || !feedObj.url) {
    return res.json({ feed: null }); // Statt Absturz
  }

  const feed = await parser.parseURL(feedObj.url);

  res.json({ feed });
}

export async function createFeeds(req, res) {
    try {
        const { kategorie, name, url } = req.body;
        await RSS.create({ kategorie, name, url });
        console.log(`Name: ${name} wurde erstellt`);
        res.status(201).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Serverfehler' });
    }
}


export async function deleterss (req,res) {
  const rssname = req.body.name;
     const geloescht = await RSS.findOneAndDelete({ name: rssname });
 res.status(200).json({message: `${rssname} wurde gelöscht` });
}