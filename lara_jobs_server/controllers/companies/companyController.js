const multer = require('multer');
const path = require('path');
const fs = require('fs');
// Set up multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads/excel');
        
        // Check if the directory exists, and create it if not
        fs.existsSync(uploadPath) || fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);  // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage: storage }).single('file');

const handleError = require('../../errors/errorHandler');
const companyService = require('../../services/company/companyServices')



// Create a new company
const createCompanyController = async (req, res) => {
    try {
        const companyData = req.body;
        const company = await companyService.createCompany(companyData);

        return res.status(201).json({
            success: true,
            data: company,
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Get all companies with pagination
const getAllCompaniesController = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        const { total, companies } = await companyService.getAllCompanies(page, pageSize);

        return res.status(200).json({
            success: true,
            data: companies,
            total,  
            page,
            pageSize,
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Get a single company by ID
const getCompanyByIdController = async (req, res) => {
    try {
        const { companyId } = req.params;
        const company = await companyService.getCompanyById(companyId);

        return res.status(200).json({
            success: true,
            data: company,
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Update company details
const updateCompanyController = async (req, res) => {
    try {
        const { companyId } = req.params;
        const companyData = req.body;
        const company = await companyService.updateCompany(companyId, companyData);

        return res.status(200).json({
            success: true,
            data: company,
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Delete a company by ID
const deleteCompanyController = async (req, res) => {
    try {
        const { companyId } = req.params;
        const result = await companyService.deleteCompany(companyId);

        return res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const uploadCompanyExcel = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'Error uploading file', error: err.message });
        }
        try {
            const filePath = path.join(__dirname, '../uploads/excel', req.file.file);

            const companies = await companyService.processExcelFile(filePath);

            return res.status(200).json({
                success: true,
                message: 'Companies data uploaded successfully',
                data: companies,
            });
        } catch (error) {
            console.error('Error while uploading companies excel:', error);
            return res.status(500).json({ success: false, message: error.message });
        }
    });
};

module.exports = {
    createCompanyController,
    getAllCompaniesController,
    getCompanyByIdController,
    updateCompanyController,
    deleteCompanyController,
    uploadCompanyExcel,
};
