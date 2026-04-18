(function() {
    // ------------------- PRELOADER -------------------
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        setTimeout(() => {
            preloader.classList.add('hide');
        }, 500);
    });

    // ------------------- ИНИЦИАЛИЗАЦИЯ AOS АНИМАЦИЙ -------------------
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // ------------------- ЗАГРУЗКА КОНТЕНТА ИЗ JSON -------------------
    async function loadContent() {
        try {
            // Используем fetch с относительным путём
            const response = await fetch('data/content.json');
            if (!response.ok) throw new Error('Ошибка загрузки JSON');
            const content = await response.json();
            
            // Заполняем Hero секцию
            document.getElementById('badgeText').textContent = content.hero.badge;
            document.getElementById('codeText').textContent = content.hero.codeText;
            document.getElementById('siteTitle').textContent = content.hero.title;
            document.querySelector('#subheadText span').textContent = content.hero.subhead;
            document.getElementById('descriptionText').textContent = content.hero.description;
            
            // Устанавливаем аватар (если есть)
            const avatarImg = document.getElementById('avatarImg');
            if (avatarImg && content.hero.avatar) {
                avatarImg.src = content.hero.avatar;
            }
            
            // Заполняем социальные ссылки
            const socialGrid = document.getElementById('socialLinks');
            socialGrid.innerHTML = '';
            content.socialLinks.forEach(link => {
                const btn = document.createElement(link.isDiv ? 'div' : 'a');
                btn.className = 'social-btn';
                if (!link.isDiv) {
                    btn.href = link.url;
                    btn.target = '_blank';
                } else {
                    btn.id = link.id;
                }
                btn.innerHTML = `<i class="${link.icon}"></i> ${link.text}`;
                socialGrid.appendChild(btn);
            });
            
            // Добавляем обработчик для кнопки "Связаться"
            const contactBtn = document.getElementById('contactBtn');
            if (contactBtn) {
                contactBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert(content.contactMessage);
                });
            }
            
            // Заполняем статистику
            if (content.stats) {
                const statsGrid = document.getElementById('statsGrid');
                statsGrid.innerHTML = '';
                content.stats.forEach(stat => {
                    const card = document.createElement('div');
                    card.className = 'stat-card';
                    card.setAttribute('data-aos', 'fade-up');
                    card.innerHTML = `
                        <span class="stat-number">${stat.number}</span>
                        <span class="stat-label">${stat.label}</span>
                    `;
                    statsGrid.appendChild(card);
                });
            }
            
            // Заполняем навыки
            const skillsGrid = document.getElementById('skillsGrid');
            skillsGrid.innerHTML = '';
            content.skills.forEach(skill => {
                const card = document.createElement('div');
                card.className = 'skill-card';
                card.setAttribute('data-aos', 'fade-up');
                card.innerHTML = `
                    <div class="skill-icon">${skill.icon}</div>
                    <h3>${skill.title}</h3>
                    <p>${skill.description}</p>
                    <div class="tech-strip">
                        ${skill.technologies.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
                    </div>
                `;
                skillsGrid.appendChild(card);
            });
            
            // Заполняем проекты
            if (content.projects) {
                const projectsGrid = document.getElementById('projectsGrid');
                projectsGrid.innerHTML = '';
                content.projects.forEach(project => {
                    const card = document.createElement('div');
                    card.className = 'project-card';
                    card.setAttribute('data-aos', 'fade-up');
                    card.innerHTML = `
                        <img src="${project.image}" alt="${project.title}" class="project-img" onerror="this.src='https://via.placeholder.com/300x180?text=${encodeURIComponent(project.title)}'">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="tech-strip">
                            ${project.technologies.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
                        </div>
                    `;
                    projectsGrid.appendChild(card);
                });
            }
            
            // Заполняем дополнительные технологии
            const techGrid = document.getElementById('techGrid');
            techGrid.innerHTML = '';
            content.extraTechnologies.forEach(tech => {
                const card = document.createElement('div');
                card.className = 'tech-card';
                card.innerHTML = `<i class="${tech.icon}"></i> ${tech.text}`;
                techGrid.appendChild(card);
            });
            
            // Заполняем футер
            document.getElementById('footerText').innerHTML = content.footer.text;
            if (content.footer.links) {
                const footerLinks = document.getElementById('footerLinks');
                footerLinks.innerHTML = content.footer.links.map(link => 
                    `<a href="${link.url}" target="_blank">${link.text}</a>`
                ).join('');
            }
            
        } catch (error) {
            console.error('Ошибка загрузки контента:', error);
            // Fallback контент
            document.getElementById('badgeText').textContent = 'full-stack · создатель контента';
            document.getElementById('codeText').textContent = '"анимации + код + продукт"';
            document.getElementById('siteTitle').textContent = 'FyzeDev';
            document.querySelector('#subheadText span').textContent = 'Software developer · YouTube creator';
            document.getElementById('descriptionText').textContent = 'Специализируюсь на создании Telegram ботов, интерактивных сайтов и сложной автоматизации.';
        }
    }
    
    // ------------------- ТЕМНАЯ / СВЕТЛАЯ ТЕМА -------------------
    function initTheme() {
        const toggleBtn = document.getElementById('themeToggle');
        const body = document.body;
        const toggleIcon = toggleBtn.querySelector('i');
        const toggleText = toggleBtn.querySelector('span');
        
        const savedTheme = localStorage.getItem('fyzedev-theme');
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            toggleIcon.className = 'fas fa-moon';
            toggleText.innerText = 'Тёмная тема';
        } else {
            body.classList.remove('light-mode');
            toggleIcon.className = 'fas fa-sun';
            toggleText.innerText = 'Светлая тема';
        }
        
        toggleBtn.addEventListener('click', () => {
            if (body.classList.contains('light-mode')) {
                body.classList.remove('light-mode');
                toggleIcon.className = 'fas fa-sun';
                toggleText.innerText = 'Светлая тема';
                localStorage.setItem('fyzedev-theme', 'dark');
            } else {
                body.classList.add('light-mode');
                toggleIcon.className = 'fas fa-moon';
                toggleText.innerText = 'Тёмная тема';
                localStorage.setItem('fyzedev-theme', 'light');
            }
        });
    }
    
    // ------------------- ИНТЕРАКТИВНЫЕ ЧАСТИЦЫ -------------------
    function initParticles() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        let particles = [];
        let mouseX = -1000, mouseY = -1000;
        const MOUSE_RADIUS = 115;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function initParticlesArray(count) {
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 3 + 1.5,
                    baseAlpha: Math.random() * 0.6 + 0.2,
                    speedX: (Math.random() - 0.5) * 0.25,
                    speedY: (Math.random() - 0.5) * 0.2,
                });
            }
        }
        
        function drawParticles() {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            
            for (let p of particles) {
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const dist = Math.hypot(dx, dy);
                
                if (dist < MOUSE_RADIUS) {
                    const angle = Math.atan2(dy, dx);
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                    const pushX = Math.cos(angle) * force * 2.3;
                    const pushY = Math.sin(angle) * force * 2.3;
                    p.x += pushX;
                    p.y += pushY;
                    p.x += (Math.random() - 0.5) * 1.1;
                    p.y += (Math.random() - 0.5) * 1.1;
                }
                
                p.x += p.speedX;
                p.y += p.speedY;
                
                if (p.x < 0) { p.x = 0; p.speedX *= -0.95; }
                if (p.x > width) { p.x = width; p.speedX *= -0.95; }
                if (p.y < 0) { p.y = 0; p.speedY *= -0.95; }
                if (p.y > height) { p.y = height; p.speedY *= -0.95; }
                
                let alphaVal = p.baseAlpha;
                if (dist < MOUSE_RADIUS + 30) {
                    alphaVal = Math.min(0.95, p.baseAlpha + 0.5 * (1 - dist / (MOUSE_RADIUS + 20)));
                }
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(100, 150, 255, ${alphaVal})`;
                ctx.fill();
                ctx.shadowBlur = 5;
                ctx.shadowColor = "#3b82f6";
                ctx.fill();
                ctx.shadowBlur = 0;
            }
            requestAnimationFrame(drawParticles);
        }
        
        function resizeCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticlesArray(200);
        }
        
        window.addEventListener('resize', () => { resizeCanvas(); });
        resizeCanvas();
        drawParticles();
    }
    
    // ------------------- ДВИЖЕНИЕ ОРБОВ ЗА МЫШКОЙ -------------------
    function initOrbsMotion() {
        document.addEventListener('mousemove', (e) => {
            const orb1 = document.querySelector('.orb1');
            const orb2 = document.querySelector('.orb2');
            if (orb1 && orb2) {
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;
                orb1.style.transform = `translate(${x * 15}px, ${y * 10}px) scale(1.05)`;
                orb2.style.transform = `translate(${-x * 12}px, ${-y * 8}px) scale(1.02)`;
            }
        });
    }
    
    // ------------------- ЗАПУСК ВСЕХ ФУНКЦИЙ -------------------
    loadContent();
    initTheme();
    initParticles();
    initOrbsMotion();
    
    console.log('%c✨ FyzeDev | Сайт загружен! Контент из JSON, частицы реагируют на курсор', 'color: #3b82f6; font-size: 14px');
})();