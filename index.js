document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Header Scroll Effect ---
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- 2. Active Nav Link on Scroll (Scroll Spy) ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 120)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Transform hamburger bars
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
  });

  // Close mobile menu on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const spans = mobileMenuBtn.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });


  // --- 3. Dynamic Countdown Timer (October 10 Deadline) ---
  // Poster deadline: 2026-10-10 18:00 KST
  const countdownDate = new Date('2026-10-10T18:00:00+09:00').getTime();
  const startDate = new Date('2026-07-01T00:00:00+09:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
      const timerElement = document.getElementById('countdown');
      if (timerElement) {
        timerElement.innerHTML = `<div style="grid-column: span 4; font-size: 1.5rem; font-weight: 900; color: var(--pixel-red); padding: 1.5rem; border: var(--brutal-border); box-shadow: var(--brutal-shadow-s); background-color: var(--neon-yellow);">공모전 접수가 마감되었습니다.</div>`;
      }
      const progressBar = document.getElementById('countdown-progress-bar');
      if (progressBar) {
        progressBar.style.width = '100%';
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dEl = document.getElementById('days');
    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');
    const sEl = document.getElementById('seconds');

    if (dEl) dEl.innerText = String(days).padStart(2, '0');
    if (hEl) hEl.innerText = String(hours).padStart(2, '0');
    if (mEl) mEl.innerText = String(minutes).padStart(2, '0');
    if (sEl) sEl.innerText = String(seconds).padStart(2, '0');

    // Calculate Progress Bar Width
    const totalDuration = countdownDate - startDate;
    const elapsed = now - startDate;
    const percent = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
    
    const progressBar = document.getElementById('countdown-progress-bar');
    if (progressBar) {
      progressBar.style.width = `${percent}%`;
    }
  }

  // Run immediately and then every second
  updateCountdown();
  setInterval(updateCountdown, 1000);


  // --- 4. Intersection Observer for Scroll Entrance Motion ---
  const scrollElements = document.querySelectorAll('.fade-in-element');

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add('visible');
  };

  const hideScrollElement = (element) => {
    element.classList.remove('visible');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.15)) {
        displayScrollElement(el);
      }
    });
  }

  window.addEventListener('scroll', () => { 
    handleScrollAnimation();
  });
  
  // Trigger once initially to show elements in the initial viewport
  setTimeout(handleScrollAnimation, 150);


  // --- 5. FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item-brutal');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-btn-brutal');
    const answer = item.querySelector('.faq-answer-brutal');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer-brutal').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });


  // --- 6. Team Member Management (Dynamic Brutal Inputs) ---
  const teamContainer = document.getElementById('team-members-container');
  const addMemberBtn = document.getElementById('btn-add-member-input');
  let memberCount = 0;
  const MAX_MEMBERS = 3; // Total 4 members (1 leader + 3 members)

  if (addMemberBtn && teamContainer) {
    addMemberBtn.addEventListener('click', () => {
      if (memberCount >= MAX_MEMBERS) {
        alert('팀원은 대표자 외 최대 3명(대표 포함 총 4인)까지 추가할 수 있습니다.');
        return;
      }

      memberCount++;
      const memberRow = document.createElement('div');
      memberRow.className = 'member-row-brutal';
      memberRow.id = `member-row-${memberCount}`;
      memberRow.innerHTML = `
        <input type="text" class="input-brutal" name="member-name-${memberCount}" placeholder="팀원 ${memberCount} 성명" required>
        <input type="tel" class="input-brutal" name="member-phone-${memberCount}" placeholder="팀원 ${memberCount} 연락처 (010-XXXX-XXXX)" required>
        <button type="button" class="btn-remove-member-brutal" data-id="${memberCount}" aria-label="Remove member">&times;</button>
      `;

      teamContainer.appendChild(memberRow);

      // Bind remove button event
      const removeBtn = memberRow.querySelector('.btn-remove-member-brutal');
      removeBtn.addEventListener('click', (e) => {
        const idToRemove = e.target.getAttribute('data-id');
        const rowToRemove = document.getElementById(`member-row-${idToRemove}`);
        if (rowToRemove) {
          rowToRemove.remove();
          memberCount--;
          reorderMembers();
        }
      });
    });

    // Reorder and rename inputs dynamically after removal
    function reorderMembers() {
      const rows = teamContainer.querySelectorAll('.member-row-brutal');
      memberCount = 0;
      rows.forEach(row => {
        memberCount++;
        row.id = `member-row-${memberCount}`;
        
        const inputs = row.querySelectorAll('input');
        inputs[0].name = `member-name-${memberCount}`;
        inputs[0].placeholder = `팀원 ${memberCount} 성명`;
        
        inputs[1].name = `member-phone-${memberCount}`;
        inputs[1].placeholder = `팀원 ${memberCount} 연락처 (010-XXXX-XXXX)`;
        
        const removeBtn = row.querySelector('.btn-remove-member-brutal');
        removeBtn.setAttribute('data-id', memberCount);
      });
    }
  }


  // --- 7. File Upload Drag-and-Drop + Validation ---
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('reg-file');
  const fileNamePreview = document.getElementById('file-name-preview');
  const attachedFileName = document.getElementById('attached-file-name');

  if (dropZone && fileInput) {
    // Trigger file dialog on box click
    dropZone.addEventListener('click', () => {
      fileInput.click();
    });

    // Handle Drag Events
    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('dragover');
      }, false);
    });

    // Handle dropped files
    dropZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length) {
        fileInput.files = files;
        handleFileSelected(files[0]);
      }
    });

    // Handle input select
    fileInput.addEventListener('change', (e) => {
      if (fileInput.files.length) {
        handleFileSelected(fileInput.files[0]);
      }
    });

    function handleFileSelected(file) {
      const allowedExtensions = /(\.pdf|\.zip)$/i;
      const maxSize = 50 * 1024 * 1024; // 50MB

      if (!allowedExtensions.exec(file.name)) {
        alert('첨부파일은 PDF 또는 ZIP 형식만 업로드 가능합니다.');
        fileInput.value = ''; // Reset input
        fileNamePreview.style.display = 'none';
        return;
      }

      if (file.size > maxSize) {
        alert('첨부파일 용량은 최대 50MB를 초과할 수 없습니다.');
        fileInput.value = ''; // Reset input
        fileNamePreview.style.display = 'none';
        return;
      }

      // Show preview name with bytes formatted to MB
      attachedFileName.innerText = `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`;
      fileNamePreview.style.display = 'flex';
    }
  }


  // --- 8. Submission Handling (Simulation) ---
  const submissionForm = document.getElementById('submission-form');
  const successModal = document.getElementById('success-modal');
  const receiptIdSpan = document.getElementById('modal-receipt-id');
  const closeModalBtn = document.getElementById('btn-close-modal');

  if (submissionForm && successModal && closeModalBtn) {
    submissionForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Secondary checkbox verification
      const agreeCheckbox = document.getElementById('reg-agree');
      if (!agreeCheckbox.checked) {
        alert('공모전 동의서 및 유의사항에 동의해 주셔야 접수가 진행됩니다.');
        return;
      }

      // Verify file is selected
      if (!fileInput.files.length) {
        alert('제안서 기획안 파일을 업로드해 주세요.');
        return;
      }

      // Simulate registration ID: KDC2026-XXXXX (5-digit random number)
      const randomDigits = Math.floor(10000 + Math.random() * 90000);
      const receiptId = `KDC2026-${randomDigits}`;

      receiptIdSpan.innerText = receiptId;
      successModal.classList.add('active');

      // Reset the form details
      submissionForm.reset();
      teamContainer.innerHTML = '';
      memberCount = 0;
      fileNamePreview.style.display = 'none';
    });

    // Close modal handler
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });

    // Close modal when clicking outside contents
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }


  // --- 9. Guide Download Simulation ---
  const downloadBtns = document.querySelectorAll('.btn-download-guide, #btn-download-guide');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Create a mock download trigger
      const fileName = '2026_K-Design_Concert_Guidelines.pdf';
      const textContent = '2026 K-Design Concert Competition Guidelines & Application Form\n\n- Contest Topic: Value Creation in Local Communities (지역사회 가치 창출을 위한 공모전)\n- Submission Period: 2026.07.01 ~ 10.10\n- Hosted by: Incheon Metropolitan City\n- Managed by: IGDFA (인천경기디자인기업협회)\n\nThis is a simulated guidelines file download for testing.';
      
      const blob = new Blob([textContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert('공모요강 및 신청서 파일(2026_K-Design_Concert_Guidelines.pdf)이 가상으로 다운로드되었습니다.');
    });
  });
});
