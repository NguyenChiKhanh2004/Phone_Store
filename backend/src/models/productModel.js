const pool = require('../utils/connectDB');

const getIdNamePriceImage = async () => {
    const query = 'SELECT id, name, price, image_url FROM products';
    const [rows, fields] = await pool.execute(query);
    return rows;
};

const createProduct = async (newProduct) => {
    const {
        name, slug, description, price, category_id, brand_id, image_url, status,
        operating_system, languages, display_type, display_color, display_standard,
        display_size, display_resolution, touch_technology, rear_camera, front_camera,
        video_recording, flash, camera_features, cpu_speed, cpu_cores, chipset, gpu,
        ram, internal_storage, expandable_storage, design, dimensions, weight,
        battery_type, battery_capacity, fast_charging, wireless_charging, sim_type,
        sim_slot, wifi, gps, bluetooth, gprs_edge, phone_jack, nfc, usb, charging_port
    } = newProduct;

    const query = `
        INSERT INTO products (
            name, slug, description, price, category_id, brand_id, image_url, status,
            operating_system, languages, display_type, display_color, display_standard,
            display_size, display_resolution, touch_technology, rear_camera, front_camera,
            video_recording, flash, camera_features, cpu_speed, cpu_cores, chipset, gpu,
            ram, internal_storage, expandable_storage, design, dimensions, weight,
            battery_type, battery_capacity, fast_charging, wireless_charging, sim_type,
            sim_slot, wifi, gps, bluetooth, gprs_edge, phone_jack, nfc, usb, charging_port
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(query, [
        name, slug, description, price, category_id, brand_id, image_url, status,
        operating_system, languages, display_type, display_color, display_standard,
        display_size, display_resolution, touch_technology, rear_camera, front_camera,
        video_recording, flash, camera_features, cpu_speed, cpu_cores, chipset, gpu,
        ram, internal_storage, expandable_storage, design, dimensions, weight,
        battery_type, battery_capacity, fast_charging, wireless_charging, sim_type,
        sim_slot, wifi, gps, bluetooth, gprs_edge, phone_jack, nfc, usb, charging_port
    ]);

    return result;
};

const getProductById = async (id) => {
    const query = 'SELECT * FROM products WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
};

const updateProduct = async (id, updatedProduct) => {
    const {
        name, slug, description, price, category_id, brand_id, image_url, status,
        operating_system, languages, display_type, display_color, display_standard,
        display_size, display_resolution, touch_technology, rear_camera, front_camera,
        video_recording, flash, camera_features, cpu_speed, cpu_cores, chipset, gpu,
        ram, internal_storage, expandable_storage, design, dimensions, weight,
        battery_type, battery_capacity, fast_charging, wireless_charging, sim_type,
        sim_slot, wifi, gps, bluetooth, gprs_edge, phone_jack, nfc, usb, charging_port
    } = updatedProduct;

    const query = `
        UPDATE products SET 
            name = ?, slug = ?, description = ?, price = ?, category_id = ?, brand_id = ?, 
            image_url = ?, status = ?, operating_system = ?, languages = ?, display_type = ?, 
            display_color = ?, display_standard = ?, display_size = ?, display_resolution = ?, 
            touch_technology = ?, rear_camera = ?, front_camera = ?, video_recording = ?, 
            flash = ?, camera_features = ?, cpu_speed = ?, cpu_cores = ?, chipset = ?, gpu = ?, 
            ram = ?, internal_storage = ?, expandable_storage = ?, design = ?, dimensions = ?, 
            weight = ?, battery_type = ?, battery_capacity = ?, fast_charging = ?, 
            wireless_charging = ?, sim_type = ?, sim_slot = ?, wifi = ?, gps = ?, bluetooth = ?, 
            gprs_edge = ?, phone_jack = ?, nfc = ?, usb = ?, charging_port = ?
        WHERE id = ?
    `;

    const [result] = await pool.execute(query, [
        name, slug, description, price, category_id, brand_id, image_url, status,
        operating_system, languages, display_type, display_color, display_standard,
        display_size, display_resolution, touch_technology, rear_camera, front_camera,
        video_recording, flash, camera_features, cpu_speed, cpu_cores, chipset, gpu,
        ram, internal_storage, expandable_storage, design, dimensions, weight,
        battery_type, battery_capacity, fast_charging, wireless_charging, sim_type,
        sim_slot, wifi, gps, bluetooth, gprs_edge, phone_jack, nfc, usb, charging_port,
        id
    ]);

    return result;
};

const getProductByBrand = async (brand) => {
    const query = `
        SELECT p.name AS product_name, p.slug, p.description, p.price, b.name AS brand_name
        FROM products p
        JOIN brands b ON p.brand_id = b.id
        WHERE b.name = ? AND p.status = 'active';
    `;
    const [rows] = await pool.execute(query, [brand]);
    return rows;
};

const deleteProduct = async (id) => {
    const query = 'DELETE FROM products WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    return result;
};

const searchProducts = async (name) => {
    const query = 'SELECT * FROM products WHERE name LIKE ?;';
    const [result] = await pool.execute(query, [`%${name}%`]);
    return result;
};

module.exports = {
    getProductByBrand,
    getIdNamePriceImage,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts
};
