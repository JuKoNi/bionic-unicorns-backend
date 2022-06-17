const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());

const adminRouter = require('./routes/admin');
const menuRouter = require('./routes/menu');
const orderRouter = require('./routes/order');
const accountRouter = require('./routes/account');

app.use('/api/admin', adminRouter);
app.use('/api/menu', menuRouter);
app.use('/api/order', orderRouter);
app.use('/api/account', accountRouter);


app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
})
