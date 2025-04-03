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

const getOrderHistoryByUserId = async (userId) => {
    const query = `
            SELECT 
            o.id AS order_id,
            o.order_date,
            o.status AS order_status,
            o.payment_status,
            o.total,
            o.shipping_address,
            o.billing_address,
            oi.quantity,
            oi.price,
            oi.subtotal,
            pv.color,
            pv.ram,
            pv.rom,
            pv.sku,
            pv.image_url,
            p.name AS product_name
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN product_variants pv ON oi.variant_id = pv.id
        JOIN products p ON pv.product_id = p.id
        WHERE o.user_id = ?
        ORDER BY o.order_date DESC;
    `;
    const [rows, fields] = await pool.execute(query, [userId]);
    return rows;
};

module.exports = {
    getAll,
    createOrders,
    updateOrders,
    deleteOrders,
    getOrdersByUserId,
    createOrderDetail,
    getOrderHistoryByUserId
};
