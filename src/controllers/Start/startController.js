
export const getStart = async (req, res) => {
   
    const start = " Das ist die Startseite , nur zum Testen";
    
   
    res.json({
        start: start,
    });
};