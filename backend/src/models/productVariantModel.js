const pool = require('../utils/connectDB');

const getAll = async () => {
    const query = 'SELECT * FROM product_variants';
    const [rows] = await pool.execute(query);
    return rows;
};

const createVariant = async (newVariant) => {
    const { product_id, color, ram, rom, sku, price, quantity, stock_status, image_url } = newVariant;
    const query = `
        INSERT INTO product_variants 
        (product_id, color, ram, rom, sku, price, quantity, stock_status, image_url) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [product_id, color, ram, rom, sku, price, quantity, stock_status || 'in_stock', image_url];
    const [results] = await pool.execute(query, values);
    return results;
};

const checkVariant = async (product_id, color, ram, rom) => {
    const query = `SELECT * FROM product_variants WHERE product_id = ? AND color = ? AND ram = ? AND rom = ?`;
    const [rows] = await pool.execute(query, [product_id, color, ram, rom]);
    return rows;
};

const updateVariant = async (id, updatedVariant) => {
    const { product_id, color, ram, rom, sku, price, quantity, stock_status, image_url } = updatedVariant;
    const query = `
        UPDATE product_variants 
        SET product_id = ?, color = ?, ram = ?, rom = ?, sku = ?, price = ?, quantity = ?, stock_status = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
    `;
    const values = [product_id, color, ram, rom, sku, price, quantity, stock_status, image_url, id];
    const [results] = await pool.execute(query, values);
    return results;
};

const getProductById = async (id) => {
    const query = 'SELECT * FROM product_variants WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
};

const deleteVariant = async (id) => {
    const query = 'DELETE FROM product_variants WHERE id = ?';
    const [results] = await pool.execute(query, [id]);
    return results;
};

const getProductByColor = async (product_id, color) => {
    const query = `
        SELECT pv.id, pv.product_id, pv.color, pv.ram, pv.rom, 
               pv.sku, pv.price, pv.quantity, pv.stock_status, pv.image_url, pv.created_at, pv.updated_at
        FROM product_variants pv
        WHERE pv.product_id = ? 
        AND pv.color = ?;
    `;
    const [results] = await pool.execute(query, [product_id, color]);
    return results;
};

const getProductByMemory = async (product_id, ram, rom) => {
    const query = `
        SELECT DISTINCT pv.color
        FROM product_variants pv
        WHERE pv.product_id = ?
        AND pv.ram = ?
        AND pv.rom = ?
        AND pv.stock_status = 'in_stock';
    `;
    const [results] = await pool.execute(query, [product_id, ram, rom]);
    return results;
};

module.exports = {
    getProductById,
    getAll,
    createVariant,
    checkVariant,
    updateVariant,
    deleteVariant,
    getProductByColor,
    getProductByMemory
};
