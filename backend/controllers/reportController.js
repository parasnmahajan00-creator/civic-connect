import Report from '../models/Report.js';

/**
 * GET ALL REPORTS
 */
export const getAllReports = async (req, res) => {
  console.log("🔥 GET /api/reports HIT");

  try {
    const { status, category, sort, order } = req.query;

    let query = {};

    if (status) query.status = status;
    if (category) query.category = category;

    let sortOption = { createdAt: -1 };
    if (sort) {
      sortOption = { [sort]: order === 'asc' ? 1 : -1 };
    }

    console.log("🔎 Query:", query);

    const reports = await Report.find(query).sort(sortOption);

    console.log(`✅ Reports fetched: ${reports.length}`);

    res.json(reports);
  } catch (error) {
    console.error("❌ ERROR in getAllReports:", error.message);
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET REPORT BY ID
 */
export const getReportById = async (req, res) => {
  console.log("🔥 GET /api/reports/:id HIT");

  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      console.log("⚠️ Report not found");
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json(report);
  } catch (error) {
    console.error("❌ ERROR in getReportById:", error.message);
    res.status(500).json({ message: error.message });
  }
};

/**
 * CREATE REPORT
 */
export const createReport = async (req, res) => {
  console.log("🔥 POST /api/reports HIT");

  try {
    const { name, category, urgency, loc, lat, lng, desc, photo } = req.body;

    if (!category || !desc) {
      return res.status(400).json({ message: 'Category and description are required' });
    }

    const report = new Report({
      name: name || 'Anonymous',
      category,
      urgency: urgency || 'medium',
      loc,
      lat,
      lng,
      desc,
      photo,
      status: 'pending'
    });

    const savedReport = await report.save();

    console.log("✅ Report created:", savedReport._id);

    res.status(201).json(savedReport);
  } catch (error) {
    console.error("❌ ERROR in createReport:", error.message);
    res.status(400).json({ message: error.message });
  }
};

/**
 * UPDATE STATUS
 */
export const updateReportStatus = async (req, res) => {
  console.log("🔥 PATCH /api/reports/:id/status HIT");

  try {
    const { status } = req.body;

    if (!['pending', 'resolved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json(report);
  } catch (error) {
    console.error("❌ ERROR in updateReportStatus:", error.message);
    res.status(400).json({ message: error.message });
  }
};

/**
 * UPDATE REPORT
 */
export const updateReport = async (req, res) => {
  console.log("🔥 PUT /api/reports/:id HIT");

  try {
    const allowedUpdates = ['name', 'category', 'urgency', 'loc', 'lat', 'lng', 'desc', 'photo'];
    const updates = {};

    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json(report);
  } catch (error) {
    console.error("❌ ERROR in updateReport:", error.message);
    res.status(400).json({ message: error.message });
  }
};

/**
 * DELETE REPORT
 */
export const deleteReport = async (req, res) => {
  console.log("🔥 DELETE /api/reports/:id HIT");

  try {
    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error("❌ ERROR in deleteReport:", error.message);
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET STATS
 */
export const getStats = async (req, res) => {
  console.log("🔥 GET /api/reports/stats HIT");

  try {
    const total = await Report.countDocuments();
    const pending = await Report.countDocuments({ status: 'pending' });
    const resolved = await Report.countDocuments({ status: 'resolved' });

    const categoryCounts = await Report.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const urgencyCounts = await Report.aggregate([
      { $group: { _id: '$urgency', count: { $sum: 1 } } }
    ]);

    res.json({
      total,
      pending,
      resolved,
      byCategory: categoryCounts,
      byUrgency: urgencyCounts
    });
  } catch (error) {
    console.error("❌ ERROR in getStats:", error.message);
    res.status(500).json({ message: error.message });
  }
};