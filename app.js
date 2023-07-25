const express = require('express');
const app = express();
const morgan = require("morgan");
const port = 8000
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));



app.use(router)
app.use(errorHandler);
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})