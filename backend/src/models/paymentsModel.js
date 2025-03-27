const pool = require('../utils/connectDB');

const getAll = async () => {
    const query = 'SELECT * FROM payments';
    const [rows, fields] = await pool.execute(query);
    return rows;
};

const createPayments = async (newPayment) => {
    const {
        order_id,
        user_id,
        transaction_id,
        payment_method,
        payment_gateway,
        amount,
        currency,
        payment_status,
        payment_date
    } = newPayment;

    const query = `
        INSERT INTO payments 
        (order_id, user_id, transaction_id, payment_method, payment_gateway, amount, currency, payment_status, payment_date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const results = await pool.execute(query, [
        order_id,
        user_id,
        transaction_id,
        payment_method,
        payment_gateway,
        amount,
        currency,
        payment_status,
        payment_date
    ]);
    return results[0];
};

const updatePayments = async (id, updatePayments) => {
    const {
        order_id,
        user_id,
        transaction_id,
        payment_method,
        payment_gateway,
        amount,
        currency,
        payment_status,
        payment_date
    } = updatePayments;

    const query = `
        UPDATE payments 
        SET order_id = ?, user_id = ?, transaction_id = ?, payment_method = ?, payment_gateway = ?, amount = ?, currency = ?, payment_status = ?, payment_date = ? 
        WHERE id = ?
    `;
    const results = await pool.execute(query, [
        order_id,
        user_id,
        transaction_id,
        payment_method,
        payment_gateway,
        amount,
        currency,
        payment_status,
        payment_date,
        id
    ]);
    return results[0];
};

const deletePayments = async (id) => {
    const query = 'DELETE FROM payments WHERE id = ?';
    const [results] = await pool.execute(query, [id]);
    return results;
};

const getPaymentsByOrderId = async (order_id) => {
    const query = 'SELECT * FROM payments WHERE order_id = ?';
    const [rows, fields] = await pool.execute(query, [order_id]);
    return rows;
};

const getPaymentsByUserId = async (user_id) => {
    const query = 'SELECT * FROM payments WHERE user_id = ?';
    const [rows, fields] = await pool.execute(query, [user_id]);
    return rows;
};

module.exports = {
    getAll,
    createPayments,
    updatePayments,
    deletePayments,
    getPaymentsByOrderId,
    getPaymentsByUserId
};
