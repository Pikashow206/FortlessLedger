const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, requireAdmin } = require('../middleware/authMiddleware');

// Protect all admin routes
router.use(verifyToken, requireAdmin);

router.get('/dashboard', adminController.getDashboard);
router.get('/fraud-alerts', adminController.getFraudAlerts);
router.patch('/freeze/:id', adminController.freezeAccount);
router.get('/audit-trail', adminController.getAuditTrail);
router.get('/chart', adminController.getChartData);
router.get('/ticker', adminController.getTicker);
router.post('/supply', adminController.supplyCapital);
router.get('/account/:account_no', adminController.getAccountDetails);

// DEFCON 1 Routes (Must be BEFORE module.exports)
router.get('/system-status', adminController.getSystemStatus);
router.post('/system-lockdown', adminController.toggleSystemLockdown);

module.exports = router;