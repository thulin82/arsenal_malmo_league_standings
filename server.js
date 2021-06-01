const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(cors());

app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 4567;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
