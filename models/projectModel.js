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



// Function to add a new project
const addProject = async (projectData) => {
  let pool;
  try {
    pool = await mssql.connect(dbConfig);
    
    const { city, builder_id, project_name, company_under, launch_date, short_code, status, delivery_month_year, rera_no, total_towers, total_flats, sector_briefing, project_briefing, master_layout, category1, category2, amenities, phases } = projectData;

    const query = `
      INSERT INTO Add_Projects (
        city, builder_id, project_name, company_under, launch_date, short_code, status, 
        delivery_month_year, rera_no, total_towers, total_flats, sector_briefing, 
        project_briefing, master_layout, category1, category2, amenities, phases
      )
      VALUES (
        @city, @builder_id, @project_name, @company_under, @launch_date, @short_code, @status, 
        @delivery_month_year, @rera_no, @total_towers, @total_flats, @sector_briefing, 
        @project_briefing, @master_layout, @category1, @category2, @amenities, @phases
      );
    `;

    const request = pool.request();
    request.input('city', mssql.VarChar, city);
    request.input('builder_id', mssql.Int, builder_id);
    request.input('project_name', mssql.VarChar, project_name);
    request.input('company_under', mssql.VarChar, company_under);
    request.input('launch_date', mssql.Date, launch_date);
    request.input('short_code', mssql.VarChar, short_code);
    request.input('status', mssql.VarChar, status);
    request.input('delivery_month_year', mssql.VarChar, delivery_month_year);
    request.input('rera_no', mssql.VarChar, rera_no);
    request.input('total_towers', mssql.Int, total_towers);
    request.input('total_flats', mssql.Int, total_flats);
    request.input('sector_briefing', mssql.Text, sector_briefing);
    request.input('project_briefing', mssql.Text, project_briefing);
    request.input('master_layout', mssql.VarChar, master_layout);
    request.input('category1', mssql.NVarChar, JSON.stringify(category1));  // Save JSON as string
    request.input('category2', mssql.NVarChar, JSON.stringify(category2));  // Save JSON as string
    request.input('amenities', mssql.NVarChar, JSON.stringify(amenities));  // Save JSON as string
    request.input('phases', mssql.NVarChar, JSON.stringify(phases));  // Save JSON as string

    await request.query(query);
    return { message: 'Project added successfully' };
  } catch (err) {
    console.error('Error inserting project:', err);
    throw err;
  }
};

module.exports = { getAllProjects, addProject };
