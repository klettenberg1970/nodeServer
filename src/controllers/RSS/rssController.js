import RSS from '../../models/rssModel.js';
import Parser from 'rss-parser';
import asyncHandler from '../../middleware/asyncHandler.js';
import { createNewObject} from './rssSort.js'

const parser = new Parser();

export const getnamen = asyncHandler(async (req, res) => {
    const feeds = await RSS.find();
    res.json(feeds);
});

export const getAllFeeds = asyncHandler(async (req, res) => {
    const daten = await RSS.find();
    const feeds =  createNewObject(daten)

    res.json({ feeds });
});

export const getfeeds = asyncHandler(async (req, res) => {
    const name = req.body.name;

    const feeds = await RSS.find();
    const feedObj = feeds.find(feed => feed.name === name);

    if (!feedObj || !feedObj.url) {
        return res.json({ feed: null });
    }

    const feed = await parser.parseURL(feedObj.url);
    res.json({ feed });
});

export const createFeeds = asyncHandler(async (req, res) => {
    const { kategorie, name, url } = req.body;
  
    await RSS.create({ kategorie, name, url });

    res.status(201).json({ success: true });
});

export const deleterss = asyncHandler(async (req, res) => {

    const id = req.params.id;
    await RSS.findOneAndDelete({ _id: id });
    res.json('Erfolg');
});