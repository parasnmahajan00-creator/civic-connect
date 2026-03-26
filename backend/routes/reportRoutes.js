import express from 'express';
import {
  getAllReports,
  getReportById,
  createReport,
  updateReportStatus,
  updateReport,
  deleteReport,
  getStats
} from '../controllers/reportController.js';

const router = express.Router();

router.get('/stats', getStats);
router.get('/', getAllReports);
router.get('/:id', getReportById);
router.post('/', createReport);
router.patch('/:id/status', updateReportStatus);
router.put('/:id', updateReport);
router.delete('/:id', deleteReport);

export default router;