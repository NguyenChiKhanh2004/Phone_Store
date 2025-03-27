const pool = require('../utils/connectDB');

const getAllBrands = async () => {
    const query = 'SELECT * FROM brands';
    const [rows] = await pool.execute(query);
    return rows;
};

const createBrands = async (newBrands) => {
    const { name } = newBrands;
    const query = 'INSERT INTO brands (NAME) VALUES (?)';
    const [result] = await pool.execute(query, [name]);
    return result;
};

const updateBrands = async (id, updatedBrand) => {
    const { name } = updatedBrand;
    const query = 'UPDATE brands SET NAME = ? WHERE id = ?';
    const [result] = await pool.execute(query, [name, id]);
    return result;
};

const deleteBrands = async (id) => {
    const query = 'DELETE FROM brands WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    return result;
};

const getBrandsById = async (id) => {
    const query = 'SELECT * FROM brands WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
};

module.exports = {
    getAllBrands,
    createBrands,
    updateBrands,
    deleteBrands,
    getBrandsById
};
