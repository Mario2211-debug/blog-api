import dotenv, { config } from 'dotenv'

dotenv.config();
export const PORT = process.env.PORT || 5001;
export const MONGO_URI = process.env.MONGO_URI
export const account_id = process.env.CLOUDFLARE_ACCOUNT_ID
export const api_token = process.env.CLOUDFLARE_API_TOKEN

