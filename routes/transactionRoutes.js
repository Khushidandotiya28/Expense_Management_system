const express = require('express');
const { addTransaction, getAllTransaction, editTransaction, deleteTransaction } = require('../controllers/transactionController');


//router object
const router = express.Router();

//routes
//add transaction POST method
router.post('/add-transaction', addTransaction);

//Edit Transaction POST Method
router.post('/edit-transaction', editTransaction);

//Delete Transaction POST Method
router.post('/delete-transaction', deleteTransaction);

//get transaction
router.post('/get-transaction', getAllTransaction);



module.exports = router;