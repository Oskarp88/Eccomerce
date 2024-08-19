

const express = require('express');
const userRouter = require('./userRoutes');
const categoryRouter = require('./categoryRoutes');
const productRouter = require('./productRoutes');
const uploadRouter = require('./uploadRoutes');
const orderRouter = require('./orderRoutes');



const router = express.Router();

router.use('/users', userRouter);
router.use("/category", categoryRouter);
router.use("/products", productRouter);
router.use("/upload", uploadRouter);
router.use("/orders", orderRouter);





module.exports = router;

