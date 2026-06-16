
export const getStart = async (req, res) => {
   
    const start = "Dashboard";
    
   
    res.json({
        start: start,
    });
};