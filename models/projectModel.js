const mssql = require('mssql');
const { dbConfig } = require('../config/db.js');

// Function to get all projects
const getAllProjects = async () => {
  let pool;
  try {
    pool = await mssql.connect(dbConfig);
    const result = await pool.request().query('SELECT * FROM Projects');
    return result.recordset;
  } catch (err) {
    console.error('Error fetching projects:', err);
    throw err;
  }
};



// Model to add a project to the database
const addPropertyProject = async (data) => {
  try {
    const pool = await mssql.connect(dbConfig); // Use mssql.connect() for consistency
    const result = await pool.request()
      .input('builder_id', mssql.Int, data.builder_id)
      .input('city', mssql.VarChar, data.city)
      .input('builder_name', mssql.VarChar, data.builder_name)
      .input('project_name', mssql.VarChar, data.project_name)
      .input('company_under_project_launched', mssql.VarChar, data.company_under_project_launched)
      .input('project_launched_date', mssql.Date, data.project_launched_date)
      .input('project_short_code', mssql.VarChar, data.project_short_code)
      .input('completion_status', mssql.VarChar, data.completion_status)
      .input('rera_number', mssql.VarChar, data.rera_number)
      .input('total_towers', mssql.Int, data.total_towers)
      .input('total_apartments', mssql.Int, data.total_apartments)
      .input('sector_briefing', mssql.Text, data.sector_briefing)
      .input('project_briefing', mssql.Text, data.project_briefing)
      .input('master_layout', mssql.VarChar, data.master_layout)
      .input('residential_units', mssql.NVarChar, JSON.stringify(data.residential_units))
      .input('commercial_units', mssql.NVarChar, JSON.stringify(data.commercial_units))
      .input('amenities', mssql.NVarChar, JSON.stringify(data.amenities))
      .input('phases', mssql.NVarChar, JSON.stringify(data.phases))
      .query(`
        INSERT INTO PropertyProjects 
        (builder_id, city, builder_name, project_name, company_under_project_launched, project_launched_date, 
        project_short_code, completion_status, rera_number, total_towers, total_apartments, sector_briefing, 
        project_briefing, master_layout, residential_units, commercial_units, amenities, phases, isVerified)
        VALUES 
        (@builder_id, @city, @builder_name, @project_name, @company_under_project_launched, @project_launched_date, 
        @project_short_code, @completion_status, @rera_number, @total_towers, @total_apartments, @sector_briefing, 
        @project_briefing, @master_layout, @residential_units, @commercial_units, @amenities, @phases, 0);
      `);

    return result.rowsAffected[0] > 0; // Return true if the insert is successful
  } catch (err) {
    console.error("Error adding property project:", err);
    throw new Error('Error adding property project');
  }
};

module.exports = { getAllProjects, addPropertyProject };
