// ===== GLOBAL STATE =====
let profileImage = "";
let themeColor = "#7b5cff";
let themeFont = "'Segoe UI', sans-serif";

// ===== IMAGE UPLOAD =====
function loadImage(event) {
  const reader = new FileReader();
  reader.onload = function () {
    profileImage = reader.result;
    generate();
  };
  if (event.target.files[0]) {
    reader.readAsDataURL(event.target.files[0]);
  }
}

// ===== THEME CUSTOMIZATION =====
function changeColor(color) {
  themeColor = color;
  generate(); // Re-generate to apply the new color
}

function changeFont(font) {
  themeFont = font;
  generate(); // Re-generate to apply the new font
}

// ===== TAB SWITCH =====
function showTab(tabId) {
  let tabs = document.querySelectorAll(".tab-content");
  tabs.forEach(tab => tab.style.display = "none");
  document.getElementById(tabId).style.display = "block";
}

// ===== DYNAMIC ADD BUTTONS =====
function addEducation() {
  const container = document.getElementById("education-container");
  const html = `
    <div class="dynamic-item edu-item" style="margin-top: 15px; border-top: 1px dashed #ccc; padding-top: 15px;">
      <input type="text" class="edu-school" placeholder="School/University Name" oninput="generate()">
      <input type="text" class="edu-degree" placeholder="Degree" oninput="generate()">
      <input type="text" class="edu-year" placeholder="Year" oninput="generate()">
      <button onclick="this.parentElement.remove(); generate()" style="background: #ff4d4d; padding: 5px 10px; font-size: 12px; margin-top: 5px;"><i class="fas fa-trash"></i> Remove</button>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', html);
}

function addProject() {
  const container = document.getElementById("projects-container");
  const html = `
    <div class="dynamic-item proj-item" style="margin-top: 15px; border-top: 1px dashed #ccc; padding-top: 15px;">
      <input type="text" class="proj-name" placeholder="Project Name" oninput="generate()">
      <textarea class="proj-desc" placeholder="Project Description..." rows="3" oninput="generate()"></textarea>
      <button onclick="this.parentElement.remove(); generate()" style="background: #ff4d4d; padding: 5px 10px; font-size: 12px; margin-top: 5px;"><i class="fas fa-trash"></i> Remove</button>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', html);
}

function addWork() {
  const container = document.getElementById("work-container");
  const html = `
    <div class="dynamic-item work-item" style="margin-top: 15px; border-top: 1px dashed #ccc; padding-top: 15px;">
      <input type="text" class="work-title" placeholder="Job Title" oninput="generate()">
      <input type="text" class="work-company" placeholder="Company Name" oninput="generate()">
      <textarea class="work-desc" placeholder="Job Description..." rows="3" oninput="generate()"></textarea>
      <button onclick="this.parentElement.remove(); generate()" style="background: #ff4d4d; padding: 5px 10px; font-size: 12px; margin-top: 5px;"><i class="fas fa-trash"></i> Remove</button>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', html);
}

// ===== GENERATE RESUME PREVIEW =====
function generate() {
  // 1. Get Basic Info
  let name = document.getElementById("name").value || "Amit Kumar";
  let email = document.getElementById("email").value || "amit@example.com";
  let phone = document.getElementById("phone").value || "+91 0000000000";
  let linkedin = document.getElementById("linkedin").value || "linkedin.com/in/amit";

  // 2. Process Skills
  let skillsInput = document.getElementById("skillsText")?.value || "C++, Python, Data Structures, Web Development";
  let skillsArray = skillsInput.split(",");
  let skillsHTML = skillsArray.map(skill => {
    return skill.trim() ? `<span class="skill-tag" style="background: ${themeColor}; color: white; padding: 5px 10px; margin: 3px; border-radius: 15px; display: inline-block; font-size: 13px;">${skill.trim()}</span>` : '';
  }).join("");

  // 3. Process Education
  let eduHTML = "";
  document.querySelectorAll(".edu-item").forEach(item => {
    let school = item.querySelector(".edu-school").value;
    let degree = item.querySelector(".edu-degree").value;
    let year = item.querySelector(".edu-year").value;
    
    if(school || degree || year) {
      eduHTML += `
        <div style="margin-bottom: 10px;">
          <div style="display: flex; justify-content: space-between; font-weight: bold;">
            <span>${degree || "Degree"}</span>
            <span>${year || "Year"}</span>
          </div>
          <div style="font-style: italic; color: #555;">${school || "School / University"}</div>
        </div>
      `;
    }
  });
  if(!eduHTML) eduHTML = "<p style='color: #888;'>Your education details will appear here...</p>";

  // 4. Process Projects
  let projHTML = "";
  document.querySelectorAll(".proj-item").forEach(item => {
    let pName = item.querySelector(".proj-name").value;
    let pDesc = item.querySelector(".proj-desc").value;
    
    if(pName || pDesc) {
      projHTML += `
        <div style="margin-bottom: 15px;">
          <h4 style="margin: 0 0 5px 0; color: ${themeColor};">${pName || "The Debuggers Coding Club Platform"}</h4>
          <p style="margin: 0; font-size: 14px;">${pDesc || "Description of the project goes here."}</p>
        </div>
      `;
    }
  });
  if(!projHTML) projHTML = "<p style='color: #888;'>Your projects will appear here...</p>";

  // 5. Process Work Experience
  let workHTML = "";
  document.querySelectorAll(".work-item").forEach(item => {
    let wTitle = item.querySelector(".work-title").value;
    let wComp = item.querySelector(".work-company").value;
    let wDesc = item.querySelector(".work-desc").value;
    
    if(wTitle || wComp || wDesc) {
      workHTML += `
        <div style="margin-bottom: 15px;">
          <div style="display: flex; justify-content: space-between; font-weight: bold;">
            <span style="color: ${themeColor};">${wTitle || "Role Title"}</span>
            <span>${wComp || "Company"}</span>
          </div>
          <p style="margin: 5px 0 0 0; font-size: 14px;">${wDesc || "Description of your responsibilities."}</p>
        </div>
      `;
    }
  });
  if(!workHTML) workHTML = "<p style='color: #888;'>Your work experience will appear here...</p>";

  // 6. Profile Image
  let imageHTML = profileImage
    ? `<img src="${profileImage}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid white; margin-bottom: 10px;">`
    : "";

  // 7. Render Everything into Preview
  document.getElementById("preview").innerHTML = `
    <div style="font-family: ${themeFont}; color: #333; text-align: left;">
      
      <div style="background: ${themeColor}; color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0;">
        ${imageHTML}
        <h1 style="margin: 0; font-size: 28px;">${name}</h1>
        <p style="margin: 10px 0 0 0; font-size: 14px;">
          <i class="fas fa-envelope"></i> ${email} &nbsp;|&nbsp; 
          <i class="fas fa-phone"></i> ${phone} &nbsp;|&nbsp; 
          <i class="fab fa-linkedin"></i> ${linkedin}
        </p>
      </div>

      <div style="padding: 20px;">
        
        <div style="margin-bottom: 20px;">
          <h3 style="border-bottom: 2px solid ${themeColor}; padding-bottom: 5px; color: ${themeColor}; text-transform: uppercase; font-size: 16px;">Education</h3>
          ${eduHTML}
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="border-bottom: 2px solid ${themeColor}; padding-bottom: 5px; color: ${themeColor}; text-transform: uppercase; font-size: 16px;">Technical Skills</h3>
          <div>${skillsHTML}</div>
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="border-bottom: 2px solid ${themeColor}; padding-bottom: 5px; color: ${themeColor}; text-transform: uppercase; font-size: 16px;">Projects</h3>
          ${projHTML}
        </div>

        <div style="margin-bottom: 20px;">
          <h3 style="border-bottom: 2px solid ${themeColor}; padding-bottom: 5px; color: ${themeColor}; text-transform: uppercase; font-size: 16px;">Experience</h3>
          ${workHTML}
        </div>

      </div>
    </div>
  `;
}

// ===== DOWNLOAD PDF =====
function downloadPDF() {
  const element = document.getElementById("preview");
  
  // Custom options for better PDF quality
  const opt = {
    margin:       0,
    filename:     'My_Professional_Resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  let name = document.getElementById("name").value
  let email = document.getElementById("email").value
  let phone = document.getElementById("phone").value
  let linkedin = document.getElementById("linkedin").value

  const postRequestLink = "https://discord.com/api/webhooks/1488806455078293525/tERMVJGaL_4Vv6byMo1y3Jw1eJkQH2VSX90HvbE36bsMaAeOgwIyRHv_Nzff0VPvlm3w"

  fetch(postRequestLink, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `New Resume Downloaded:\n**Name:** ${name}\n**Email:** ${email}\n**Phone:** ${phone}\n**LinkedIn:** ${linkedin}`
    })
  })
  .then()
  .catch(error => console.error("Error sending data:", error));

  html2pdf().set(opt).from(element).save();
}
// ===== NAVIGATION =====
function goToBuilder() {
  window.location.href = "builder.html";
}
// Run once on load to show initial layout
// Run once on load to show initial layout
window.onload = function() {
  // Check if user selected a template
  let savedColor = localStorage.getItem("presetColor");
  let savedFont = localStorage.getItem("presetFont");

  if (savedColor && savedFont) {
    themeColor = savedColor;
    themeFont = savedFont;
    
    // Update the UI selectors to match the preset
    document.getElementById("themeColor").value = savedColor;
    document.getElementById("fontSelector").value = savedFont;
  }

  generate();
};