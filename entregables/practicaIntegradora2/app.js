import express from 'express';
const app = express();

const PORT = process.env.PORT || 4200;

const server = app.listen(PORT, ()=> console.log(`Server running on port: ${server.adress}`))