import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public/')));
app.listen(port, () => {
    console.log(`Server is listening on port localhost:${port}`);
});
