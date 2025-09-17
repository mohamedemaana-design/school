// Hardcoded users for demo
const users = {
  admin: { password: 'admin123', role: 'admin' },
  teacher: { password: 'teacher123', role: 'teacher' },
  student: { password: 'student123', role: 'student' }
};

const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const loginContainer = document.getElementById('login-container');
const appContainer = document.getElementById('app-container');
const content = document.getElementById('content');
const menu = document.getElementById('menu');
const logoutBtn = document.getElementById('logout-btn');

let currentUser = null;

// Page contents for each menu option
const pages = {
  attendance: {
    admin: `<h2>Attendance Management (Admin)</h2><p>Manage attendance records for all classes.</p>`,
    teacher: `<h2>Attendance (Teacher)</h2><p>Mark and view your class attendance.</p>`,
    student: `<h2>Attendance (Student)</h2><p>View your attendance record.</p>`
  },
  material: {
    admin: `<h2>Material Upload (Admin)</h2><p>Upload and manage study materials.</p>`,
    teacher: `<h2>Material (Teacher)</h2><p>Upload study materials for your classes.</p>`,
    student: `<h2>Material (Student)</h2><p>Download materials for your enrolled subjects.</p>`
  },
  marks: {
    admin: `<h2>Marks Entry (Admin)</h2><p>Enter and manage students' marks.</p>`,
    teacher: `<h2>Marks (Teacher)</h2><p>Enter marks for your students.</p>`,
    student: `<h2>Marks (Student)</h2><p>View your marks.</p>`
  },
  timetable: {
    admin: `<h2>Timetable Setup (Admin)</h2><p>Manage timetable for all classes.</p>`,
    teacher: `<h2>Timetable (Teacher)</h2><p>View your teaching timetable.</p>`,
    student: `<h2>Timetable (Student)</h2><p>View your class timetable.</p>`
  },
  feedback: {
    admin: `<h2>Feedback Review (Admin)</h2><p>Review feedback from students and teachers.</p>`,
    teacher: `<h2>Feedback (Teacher)</h2><p>View and respond to feedback.</p>`,
    student: `<h2>Feedback (Student)</h2><p>Submit feedback to teachers and admin.</p>`
  }
};

// Handle login submit
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (users[username] && users[username].password === password) {
    currentUser = { username, role: users[username].role };
    loginError.textContent = '';
    showApp();
  } else {
    loginError.textContent = 'Invalid username or password!';
  }
});

// Show app container & hide login
function showApp() {
  loginContainer.classList.add('hidden');
  appContainer.classList.remove('hidden');
  renderContent('attendance'); // default page
}

// Handle menu clicks
menu.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI' && e.target.dataset.page) {
    renderContent(e.target.dataset.page);
  }
  if (e.target.id === 'logout-btn') {
    logout();
  }
});

// Render page content by user role and page key
function renderContent(page) {
  if (!currentUser) return;
  const role = currentUser.role;
  content.innerHTML = pages[page][role] || '<p>Content not available.</p>';
}

// Logout
function logout() {
  currentUser = null;
  appContainer.classList.add('hidden');
  loginContainer.classList.remove('hidden');
  loginForm.reset();
}
