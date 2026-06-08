
import { fetchWikiSummary } from './wikipedia.js'

export const getSummary = async (req, res) => {

      const searchTerm = req.query.search;

      const zusammenfassung = await fetchWikiSummary(searchTerm)


      res.json(zusammenfassung)

}