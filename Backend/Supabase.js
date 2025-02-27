const dotenv = require('dotenv')
const { createClient } = require('@supabase/supabase-js')
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


module.exports = supabase;