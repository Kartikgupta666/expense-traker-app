const express = require('express')
const cron = require('node-cron')
const supabase = require('./Supabase')
const { generatePDF, sendEmailWithPDF } = require('./pdf_gen_send_email')
const fs = require('fs')
const app = express()
app.use(express.json())


const PORT = 8000


app.get("/", (req,res)=> {
try{
return res.status(200).json({message:"this is the backend test route"})
}
catch(e){return res.status(400).json({error : e})}
})

app.listen(PORT, () => {
    console.log(`server connected on port ${PORT}`)
})

// fetching all users
const fetching_All_users = async () => {
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) {
        console.log(error)
        return
    }
    const userIds = data.users.map(user => ({ id: user.id, email: user.email }));
    return userIds
}
// fetching_account_transactions()
const fetch_account = async (userId) => {
    try {
        const { data, error } = await supabase.from('expenses').select('date , amount , description').eq('user_id', userId)
        if (error) {
            return error
        }
        return data
    }
    catch (error) {
        return error
    }
}

// this is the main function which execute all function one by one

async function main() {
    try {
        const users = await fetching_All_users();
        for (const user of users) {
            try {
                const transactions = await fetch_account(user.id);
                const filePath = `${user.email}_transactions.pdf`;
                generatePDF(filePath, transactions, user.email, () => {
                    sendEmailWithPDF(filePath, user.email);
                    fs.unlink(filePath, (err) => {
                        if (err) console.error(`Failed to delete file ${filePath}:`, err);
                    });
                });
            } catch (error) {
                console.error(`Failed to fetch transactions for ${user.email}:`, error);
                fs.unlink(filePath, (err) => {
                    if (err) console.error(`Failed to delete file ${filePath}:`, err);
                });
            }
        }
    } catch (error) {
        console.error("Failed to fetch users:", error);
    }
}



// Runs on the first day of every month at midnight
cron.schedule('0 0 1 * *', () => {
    main()
});
