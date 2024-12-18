function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.profile-section');
    sections.forEach((section) => {
      section.classList.add('hidden');
    });
  
    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.remove('hidden');
  
    // Update active tab
    const tabs = document.querySelectorAll('li');
    tabs.forEach((tab) => tab.classList.remove('active'));
    document.querySelector(`li[onclick="showSection('${sectionId}')"]`).classList.add('active');
  }
  