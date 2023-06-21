import path from 'path';
import express from 'express';

const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public/')));
app.listen(port, () => {
    console.log(`Server is listening on port localhost:${port}`);
});
