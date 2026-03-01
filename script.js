const reveal = () => {
    const elements = document.querySelectorAll('.listener-card,.review-card,.faq-item,.trust-item,.video-container,.avatar-img');
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('in-view');
        });
    }, { threshold: 0.15 });
    elements.forEach(el => io.observe(el));
};

const animateCounters = () => {
    const target = document.querySelector('.trust-strip');
    if (!target) return;
    let started = false;
    const io = new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting) && !started) {
            started = true;
            const animate = (el, to) => {
                let v = 0;
                const step = () => {
                    v += Math.max(1, Math.floor(to / 40));
                    if (v >= to) v = to;
                    el.textContent = v;
                    if (v < to) requestAnimationFrame(step);
                };
                step();
            };
            animate(document.getElementById('stat-breakup'), 25);
            animate(document.getElementById('stat-relationship'), 33);
            animate(document.getElementById('stat-loneliness'), 50);
        }
    }, { threshold: 0.3 });
    io.observe(target);
};

const carousel = () => {
    document.querySelectorAll('.carousel').forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const prev = carousel.querySelector('.carousel-btn.prev');
        const next = carousel.querySelector('.carousel-btn.next');
        if (!track || !prev || !next) return;
        
        let index = 0;
        
        const getColumnWidth = () => {
            const styles = getComputedStyle(track);
            const gap = parseInt(styles.gap || styles.columnGap || '16', 10);
            return track.firstElementChild ? track.firstElementChild.offsetWidth + gap : 300;
        };

        const update = () => {
            track.scrollTo({ left: index * getColumnWidth(), behavior: 'smooth' });
        };

        prev.addEventListener('click', () => {
            index = (index - 1 + track.children.length) % track.children.length;
            update();
        });

        next.addEventListener('click', () => {
            index = (index + 1) % track.children.length;
            update();
        });

        let auto = setInterval(() => {
            index = (index + 1) % track.children.length;
            update();
        }, 4000);

        carousel.addEventListener('mouseenter', () => clearInterval(auto));
        carousel.addEventListener('mouseleave', () => {
            auto = setInterval(() => {
                index = (index + 1) % track.children.length;
                update();
            }, 4000);
        });
    });
};

const faq = () => {
    document.querySelectorAll('.faq-item').forEach(item => {
        const btn = item.querySelector('.faq-question');
        btn.addEventListener('click', () => {
            const open = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!open) item.classList.add('open');
        });
    });
};

const ripple = () => {
    document.querySelectorAll('.store-btn,.cta,.control').forEach(btn => {
        btn.addEventListener('click', e => {
            const r = document.createElement('span');
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            r.style.position = 'absolute';
            r.style.left = x + 'px';
            r.style.top = y + 'px';
            r.style.transform = 'translate(-50%,-50%)';
            r.style.width = '10px';
            r.style.height = '10px';
            r.style.borderRadius = '50%';
            r.style.background = 'rgba(255,255,255,0.4)';
            r.style.pointerEvents = 'none';
            r.style.animation = 'ripple 0.6s ease-out';
            if (getComputedStyle(btn).position === 'static') {
                btn.style.position = 'relative';
            }
            btn.style.overflow = 'hidden';
            btn.appendChild(r);
            setTimeout(() => r.remove(), 600);
        });
    });
    const style = document.createElement('style');
    style.textContent = '@keyframes ripple{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-50%) scale(25)}}';
    document.head.appendChild(style);
};

document.addEventListener('DOMContentLoaded', () => {
    reveal();
    animateCounters();
    carousel();
    faq();
    ripple();
});
