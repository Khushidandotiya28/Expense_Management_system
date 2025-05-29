const transactionModel = require('../models/transactionModel');
const moment = require('moment');

// Get all transactions
const getAllTransaction = async (req, res) => {
    try {
        const { frequency, selectedDate, type, userid } = req.body;

        const dateFilter = frequency !== 'custom'
            ? {
                date: {
                    $gt: moment().subtract(Number(frequency), 'd').toDate(),
                }
            }
            : {
                date: {
                    $gte: new Date(selectedDate[0]),
                    $lte: new Date(selectedDate[1]),
                }
            };

        const typeFilter = type !== 'all' ? { type } : {};

        const transactions = await transactionModel.find({
            ...dateFilter,
            ...typeFilter,
            userid,
        });

        res.status(200).json(transactions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching transactions', error });
    }
};

const editTransaction =  async (req, res) => {
    try{
       await transactionModel.findOneAndUpdate({_id:req.body.transactionId}, req.body.payload);
       res.status(200).send('Edit Successfully');

    } catch (error){
        console.log(error);
        res.status(500).json(error);
    }

};

const deleteTransaction = async (req, res) => {
    try{
        await transactionModel.findOneAndDelete({_id:req.body.transactionId})
        res.status(200).send('Transaction Deleted');

    } catch (error){
        console.log(error);
        res.status(500).json(error);
    }

};

// Add a new transaction
const addTransaction = async (req, res) => {
    try {
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save();
        res.status(201).send('Transaction Created');
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating transaction', error });
    }
};

module.exports = { getAllTransaction, addTransaction, editTransaction, deleteTransaction };
