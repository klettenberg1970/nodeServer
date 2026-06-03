

export function linkarray(links) {
   const groupedLinks = {};
   
   for (const link of links) {
     if (!groupedLinks[link.category]) {
       groupedLinks[link.category] = {}; // {} statt []
     }
     groupedLinks[link.category][link.name] = link.url; // Direkt Key-Value zuweisen
   }
   
   return groupedLinks;
}