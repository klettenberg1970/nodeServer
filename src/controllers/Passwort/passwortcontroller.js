import 'dotenv/config'; 


export const checkPasswort = (req, res) => {
    const { password } = req.body; // Destructuring ist sauberer
  
    const correctPassword = process.env.PORTFOLIO_PASSWORD;
 
    if (password === correctPassword) {
       

        // Token an das Frontend senden
        return res.json({ message: true});
    } else {
        return res.json({ message: false });
    }
};