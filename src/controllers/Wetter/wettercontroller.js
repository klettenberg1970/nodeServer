
import { temperaturen } from './wetter.js'

export const getWetter = async (req, res) => {
    const wetter = await temperaturen();
    
    res.json(wetter)
}
