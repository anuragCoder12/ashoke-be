const Region = require('../models/regions');

// Create a new region
const createRegion = async (req, res) => {
    try {
        const { region_name, manager_name, phone } = req.body;
        
        // Check if region already exists
        const existingRegion = await Region.findOne({ region_name });
        if (existingRegion) {
            return res.status(400).json({ message: 'Region already exists' });
        }

        // Create new region
        const newRegion = new Region({
            region_name,
            manager_name,
            phone
        });

        await newRegion.save();
        res.status(201).json({ 
            message: 'Region created successfully', 
            region: newRegion 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error creating region', 
            error: error.message 
        });
    }
};

// Get all regions
const getAllRegions = async (req, res) => {
    try {
        const regions = await Region.find();
        res.status(200).json(regions);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching regions', 
            error: error.message 
        });
    }
};

// Get a single region by ID
const getRegionById = async (req, res) => {
    try {
        const region = await Region.findById(req.params.id);
        
        if (!region) {
            return res.status(404).json({ message: 'Region not found' });
        }

        res.status(200).json(region);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching region', 
            error: error.message 
        });
    }
};

// Update a region
const updateRegion = async (req, res) => {
    try {
        const { region_name, manager_name, phone } = req.body;

        const updatedRegion = await Region.findByIdAndUpdate(
            req.params.id, 
            { region_name, manager_name, phone },
            { new: true, runValidators: true }
        );

        if (!updatedRegion) {
            return res.status(404).json({ message: 'Region not found' });
        }

        res.status(200).json({ 
            message: 'Region updated successfully', 
            region: updatedRegion 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error updating region', 
            error: error.message 
        });
    }
};

// Delete a region
const deleteRegion = async (req, res) => {
    try {
        const deletedRegion = await Region.findByIdAndDelete(req.params.id);

        if (!deletedRegion) {
            return res.status(404).json({ message: 'Region not found' });
        }

        res.status(200).json({ 
            message: 'Region deleted successfully', 
            region: deletedRegion 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error deleting region', 
            error: error.message 
        });
    }
};

module.exports = {
    createRegion,
    getAllRegions,
    getRegionById,
    updateRegion,
    deleteRegion
};