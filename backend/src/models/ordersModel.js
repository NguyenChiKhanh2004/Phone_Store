const pool = require('../utils/connectDB');

const getAll = async () => {
    const query = 'SELECT * FROM orders';
    const [rows, fields] = await pool.execute(query);
    return rows;
};

const createOrders = async (newOrder) => {
    const {
        user_id,
        order_date,
        status,
        payment_status,
        total,
        shipping_address,
        billing_address,
        tracking_number,
        notes
    } = newOrder;

    const query = `
        INSERT INTO orders 
        (user_id, order_date, status, payment_status, total, shipping_address, billing_address, tracking_number, notes) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [results] = await pool.execute(query, [
        user_id,
        order_date || null, // Nếu không có order_date, mặc định là null (sẽ dùng CURRENT_TIMESTAMP)
        status || 'pending',
        payment_status || 'pending',
        total,
        shipping_address || null,
        billing_address || null,
        tracking_number || null,
        notes || null
    ]);
    return results;
};

const updateOrders = async (id, updateOrders) => {
    const {
        user_id,
        order_date,
        status,
        payment_status,
        total,
        shipping_address,
        billing_address,
        tracking_number,
        notes
    } = updateOrders;

    const query = `
        UPDATE orders 
        SET 
            user_id = ?, 
            order_date = ?, 
            status = ?, 
            payment_status = ?, 
            total = ?, 
            shipping_address = ?, 
            billing_address = ?, 
            tracking_number = ?, 
            notes = ? 
        WHERE id = ?
    `;
    const [results] = await pool.execute(query, [
        user_id,
        order_date || null,
        status || 'pending',
        payment_status || 'pending',
        total,
        shipping_address || null,
        billing_address || null,
        tracking_number || null,
        notes || null,
        id
    ]);
    return results;
};

const deleteOrders = async (id) => {
    const query = 'DELETE FROM orders WHERE id = ?';
    const [results] = await pool.execute(query, [id]);
    return results;
};

const getOrdersByUserId = async (id) => {
    const query = 'SELECT * FROM orders WHERE user_id = ?';
    const [rows, fields] = await pool.execute(query, [id]);
    return rows;
};

const createOrderDetail = async (userId, shippingAddress, billingAddress, notes, itemsJson, paymentMethod) => {
    const query = `CALL InsertCompleteOrder(?, ?, ?, ?, ?, ?);`;
    const [results] = await pool.execute(query, [
        userId, 
        shippingAddress, 
        billingAddress, 
        notes, 
        itemsJson,  // Không cần stringify nếu đã là JSON hợp lệ
        paymentMethod
    ]);
    return results;
};

module.exports = {
    getAll,
    createOrders,
    updateOrders,
    deleteOrders,
    getOrdersByUserId,
    createOrderDetail
};
