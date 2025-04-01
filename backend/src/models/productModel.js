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
    const query = `
        SELECT 
            p.*,
            v.id AS variant_id,
            v.color,
            v.ram,
            v.rom,
            v.sku,
            v.price AS variant_price,
            v.quantity,
            v.stock_status,
            v.image_url AS variant_image_url,
            v.created_at AS variant_created_at,
            v.updated_at AS variant_updated_at
        FROM products p
        LEFT JOIN product_variants v ON p.id = v.product_id
        WHERE p.id = ?;
    `;
    const [rows] = await pool.execute(query, [id]);
    if (!rows.length) return null;

    // Lấy thông tin sản phẩm từ dòng đầu tiên
    const product = {
        id: rows[0].id,
        name: rows[0].name,
        slug: rows[0].slug,
        description: rows[0].description,
        price: rows[0].price,
        brand_id: rows[0].brand_id,
        image_url: rows[0].image_url,
        status: rows[0].status,
        operating_system: rows[0].operating_system,
        languages: rows[0].languages,
        display_type: rows[0].display_type,
        display_color: rows[0].display_color,
        display_standard: rows[0].display_standard,
        display_size: rows[0].display_size,
        display_resolution: rows[0].display_resolution,
        touch_technology: rows[0].touch_technology,
        rear_camera: rows[0].rear_camera,
        front_camera: rows[0].front_camera,
        video_recording: rows[0].video_recording,
        flash: rows[0].flash,
        camera_features: rows[0].camera_features,
        cpu_speed: rows[0].cpu_speed,
        cpu_cores: rows[0].cpu_cores,
        chipset: rows[0].chipset,
        gpu: rows[0].gpu,
        ram: rows[0].ram,
        internal_storage: rows[0].internal_storage,
        expandable_storage: rows[0].expandable_storage,
        design: rows[0].design,
        dimensions: rows[0].dimensions,
        weight: rows[0].weight,
        battery_type: rows[0].battery_type,
        battery_capacity: rows[0].battery_capacity,
        fast_charging: rows[0].fast_charging,
        wireless_charging: rows[0].wireless_charging,
        sim_type: rows[0].sim_type,
        sim_slot: rows[0].sim_slot,
        wifi: rows[0].wifi,
        gps: rows[0].gps,
        bluetooth: rows[0].bluetooth,
        gprs_edge: rows[0].gprs_edge,
        phone_jack: rows[0].phone_jack,
        nfc: rows[0].nfc,
        usb: rows[0].usb,
        charging_port: rows[0].charging_port,
        created_at: rows[0].created_at,
        updated_at: rows[0].updated_at
    };

    // Tách dữ liệu biến thể (loại bỏ trường hợp không có biến thể)
    const variants = rows
        .filter(row => row.variant_id !== null)
        .map(row => ({
            id: row.variant_id,
            color: row.color,
            ram: row.ram,
            rom: row.rom,
            sku: row.sku,
            price: row.variant_price,
            quantity: row.quantity,
            stock_status: row.stock_status,
            image_url: row.variant_image_url,
            created_at: row.variant_created_at,
            updated_at: row.variant_updated_at
        }));

    return { product, variants };
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
