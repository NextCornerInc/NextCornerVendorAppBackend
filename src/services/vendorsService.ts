import { query } from '../index';
import { Vendor } from '../models/vendor.interface';

export const getAllVendors = async (): Promise<Vendor[]> => {
    const result = await query('SELECT * FROM vendors', []);
    return result.rows;
};

export const getVendorById = async (id: number): Promise<Vendor | null> => {
    const result = await query('SELECT * FROM vendors WHERE id = $1', [id]);
    return result.rows[0] || null;
};

export const createVendor = async (vendor: Omit<Vendor, 'id'>): Promise<Vendor> => {
    const { name, location, contact } = vendor;
    const result = await query(
        'INSERT INTO vendors (name, location, contact) VALUES ($1, $2, $3) RETURNING *',
        [name, location, contact]
    );
    return result.rows[0];
};

export const updateVendor = async (id: number, vendor: Partial<Omit<Vendor, 'id'>>): Promise<Vendor | null> => {
    const { name, location, contact } = vendor;
    let queryText = 'UPDATE vendors SET ';
    const queryParams = [];
    let paramIndex = 1;

    if (name) {
        queryText += `name = $${paramIndex}, `;
        queryParams.push(name);
        paramIndex++;
    }
    if (location) {
        queryText += `location = $${paramIndex}, `;
        queryParams.push(location);
        paramIndex++;
    }
    if (contact) {
        queryText += `contact = $${paramIndex}, `;
        queryParams.push(contact);
        paramIndex++;
    }

    queryText = queryText.slice(0, -2); // Remove the trailing comma and space
    queryText += ` WHERE id = $${paramIndex} RETURNING *`;
    queryParams.push(id);

    const result = await query(queryText, queryParams);
    return result.rows[0] || null;
};

export const deleteVendor = async (id: number): Promise<Vendor | null> => {
    const result = await query('DELETE FROM vendors WHERE id = $1 RETURNING *', [id]);
    return result.rows[0] || null;
};