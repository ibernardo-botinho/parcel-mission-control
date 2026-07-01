# Parcel Mission Control Cloud

This is the cloud-hosted version designed for Vercel.

## How to deploy without Terminal

1. Go to https://vercel.com and sign in.
2. Create a new project.
3. Upload/import this project folder.
4. In Vercel project settings, add Environment Variable:

   Name: SHIP24_API_KEY
   Value: your Ship24 API key

5. Deploy.
6. Open the Vercel URL.

The website will call /api/track, and Vercel will securely call Ship24 from the serverless backend.
