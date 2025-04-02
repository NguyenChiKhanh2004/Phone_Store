const pool = require('../utils/connectDB');

const getAll = async () => {
    const query = `SELECT 
    reviews.id,
    products.name as product_name,
    reviews.product_id,
    users.full_name as user_name,
    reviews.title,
    reviews.comment,
    reviews.rating,
    reviews.is_verified_purchase,
    reviews.created_at,
    reviews.updated_at
    FROM reviews 
    LEFT JOIN users on reviews.user_id = users.id
    left join products on reviews.product_id = products.id`;
    const [rows, fields] = await pool.execute(query);
    return rows;
};

const createReviews = async (newReviews) => {
    const {
        product_id,
        user_id,
        rating,
        title,
        comment,
        is_verified_purchase
    } = newReviews;

    const query = `
        INSERT INTO reviews 
        (product_id, user_id, rating, title, comment, is_verified_purchase, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;
    const [results] = await pool.execute(query, [product_id, user_id, rating, title, comment, is_verified_purchase]);
    return results;
};

const updateReviews = async (id, updateReviews) => {
    const {
        product_id,
        user_id,
        rating,
        title,
        comment,
        is_verified_purchase
    } = updateReviews;

    const query = `
        UPDATE reviews 
        SET product_id = ?, user_id = ?, rating = ?, title = ?, comment = ?, is_verified_purchase = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
    `;
    const [results] = await pool.execute(query, [product_id, user_id, rating, title, comment, is_verified_purchase, id]);
    return results;
};

const deleteReviews = async (id) => {
    const query = 'DELETE FROM reviews WHERE id = ?';
    const [results] = await pool.execute(query, [id]);
    return results;
};

const getReviewsByProductId = async (id) => {
    const query = 'SELECT * FROM reviews WHERE product_id = ?';
    const [rows, fields] = await pool.execute(query, [id]);
    return rows;
};

module.exports = {
    getAll,
    createReviews,
    updateReviews,
    deleteReviews,
    getReviewsByProductId
};
