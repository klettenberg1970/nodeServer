



export const createNewObject = async(feeds)=>{
   
   
    const groupedfeeds = {}

     for (const feed of feeds.feeds) {
     if (!groupedfeeds[feed.kategorie]) {
       groupedfeeds[feed.kategorie] = {}; // {} statt []
     }
     groupedfeeds[feed.kategorie][feed.name] = feed.url; // Direkt Key-Value zuweisen
   }

   return groupedfeeds

}

