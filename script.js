const projects = [
  {
    title: "TOPHIT STORE",
    slug: "tophit",
    category: "IP Worlds",
    tone: "复古街头、咖啡、啤酒、运动与节日主题",
    count: 32,
    feature: [3, 14, 21, 18],
  },
  {
    title: "EFAC",
    slug: "efac",
    category: "IP Worlds",
    tone: "咖啡店节日视觉、贴纸周边与门店氛围",
    count: 17,
    feature: [1, 10, 12, 17],
  },
  {
    title: "Potato Brew",
    slug: "potatodrew",
    category: "Brand Systems",
    tone: "餐饮品牌角色、招牌、杯垫与门店物料",
    count: 8,
    feature: [2, 4, 6, 8],
  },
  {
    title: "Circle Burger",
    slug: "circle-burger",
    category: "IP Worlds",
    tone: "汉堡角色、复古广告与门店导视",
    count: 9,
    feature: [1, 2, 6, 8],
  },
  {
    title: "Play Box",
    slug: "play-box",
    category: "IP Worlds",
    tone: "剧场盒子角色、活动海报与线下场景",
    count: 7,
    feature: [2, 3, 5, 7],
  },
  {
    title: "Strong Burger",
    slug: "strongburger",
    category: "Brand Systems",
    tone: "强壮汉堡门店、招牌与物料陈列",
    count: 6,
    feature: [2, 3, 5, 6],
  },
  {
    title: "满攒精酿",
    slug: "manzan-brew",
    category: "Brand Systems",
    tone: "精酿品牌、熊形角色与高饱和海报",
    count: 3,
    feature: [1, 2, 3],
  },
  {
    title: "Hotdog Park",
    slug: "hotdog-park",
    category: "Commercial Landing",
    tone: "热狗餐饮品牌包装、门店与周边",
    count: 3,
    feature: [1, 2, 3],
  },
  {
    title: "胶游",
    slug: "vinyl-tour",
    category: "Playful Experiments",
    tone: "音乐唱片、角色周边与蓝色视觉系统",
    count: 5,
    feature: [1, 2, 3, 5],
  },
  {
    title: "FITMA",
    slug: "fitma",
    category: "Commercial Landing",
    tone: "杯具、纸袋与轻量品牌物料",
    count: 2,
    feature: [1, 2],
  },
  {
    title: "Posters & Campaigns",
    slug: "posters",
    category: "Posters",
    tone: "餐饮促销、汉堡结构与高密度广告排版",
    count: 8,
    feature: [1, 2, 3, 8],
  },
  {
    title: "Commercial Landing",
    slug: "commercial-landing",
    category: "Commercial Landing",
    tone: "服装、包装、门店、杯具与立体公仔",
    count: 14,
    feature: [2, 4, 6, 12],
  },
  {
    title: "Playful Experiments",
    slug: "playful-experiments",
    category: "Playful Experiments",
    tone: "角色合集、Logo合集与持续更新实验",
    count: 12,
    feature: [1, 2, 4, 9],
  },
];

const imagePath = (slug, index) =>
  `assets/portfolio/${slug}-${String(index).padStart(2, "0")}.jpg`;
const thumbPath = (slug, index) =>
  `assets/portfolio/thumbs/${slug}-${String(index).padStart(2, "0")}.jpg`;
const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;

const featured = document.querySelector("#featured-grid");
const landing = document.querySelector("#landing-grid");
const archive = document.querySelector("#archive-grid");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("p");
const closeLightbox = lightbox.querySelector(".lightbox-close");
const prevLightbox = lightbox.querySelector(".lightbox-prev");
const nextLightbox = lightbox.querySelector(".lightbox-next");
const galleryModal = document.querySelector("#gallery-modal");
const galleryClose = galleryModal.querySelector(".gallery-close");
const galleryTitle = galleryModal.querySelector(".gallery-header h2");
const galleryDescription = galleryModal.querySelector(".gallery-header p");
const galleryMeta = galleryModal.querySelector(".gallery-meta");
const galleryGrid = galleryModal.querySelector(".gallery-grid");

let activeImages = [];
let activeImageIndex = 0;

const projectImages = (project) =>
  Array.from({ length: project.count }, (_, index) => ({
    src: imagePath(project.slug, index + 1),
    thumb: thumbPath(project.slug, index + 1),
    caption: `${project.title} / ${index + 1} of ${project.count}`,
  }));

function preloadProject(project) {
  if (isMobileViewport) return;
  projectImages(project)
    .slice(0, 8)
    .forEach((item) => {
      const img = new Image();
      img.src = item.thumb;
    });
}

function openLightbox(images, startIndex = 0) {
  activeImages = Array.isArray(images)
    ? images
    : [{ src: images, caption: arguments[1] || "" }];
  activeImageIndex = startIndex;
  renderLightboxImage();
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
}

function renderLightboxImage() {
  const item = activeImages[activeImageIndex];
  if (!item) return;
  lightboxImage.src = item.src;
  lightboxImage.alt = item.caption;
  lightboxCaption.textContent = item.caption;
  const showNav = activeImages.length > 1;
  prevLightbox.style.display = showNav ? "" : "none";
  nextLightbox.style.display = showNav ? "" : "none";
}

function moveLightbox(direction) {
  if (activeImages.length < 2) return;
  activeImageIndex =
    (activeImageIndex + direction + activeImages.length) % activeImages.length;
  renderLightboxImage();
}

function closeLightboxPanel() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

function openGallery(project) {
  const images = projectImages(project);
  galleryTitle.textContent = project.title;
  galleryDescription.textContent = project.tone;
  galleryMeta.innerHTML = `
    <span>${project.category}</span>
    <span>${project.count} images</span>
    <span>${project.slug}</span>
  `;
  galleryGrid.innerHTML = images
    .map(
      (item, index) => `
        <button class="gallery-item" type="button" data-index="${index}" aria-label="查看 ${item.caption}">
          <img src="${item.thumb}" alt="${item.caption}" loading="${index < 6 ? "eager" : "lazy"}" decoding="async">
        </button>
      `,
    )
    .join("");
  galleryGrid.querySelectorAll(".gallery-item").forEach((button) => {
    button.addEventListener("click", () =>
      openLightbox(images, Number(button.dataset.index)),
    );
  });
  galleryModal.classList.add("is-open");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  galleryModal.classList.remove("is-open");
  galleryModal.setAttribute("aria-hidden", "true");
  galleryGrid.innerHTML = "";
  document.body.style.overflow = "";
}

function makeCard(project, index) {
  const main = project.feature[0] || 1;
  const article = document.createElement("article");
  article.className = `project-card ${index === 0 ? "large" : ""}`;
  article.tabIndex = 0;
  article.setAttribute("role", "button");
  article.setAttribute("aria-label", `打开 ${project.title} 项目图库`);
  article.innerHTML = `
    <figure>
      <img src="${thumbPath(project.slug, main)}" alt="${project.title}" loading="${index === 0 ? "eager" : "lazy"}" decoding="async">
    </figure>
    <div class="project-card-body">
      <div class="meta-row">
        <span>${project.category}</span>
        <span class="badge">${project.count} images</span>
      </div>
      <h3>${project.title}</h3>
      <p>${project.tone}</p>
    </div>
  `;
  article.addEventListener("mouseenter", () => preloadProject(project));
  article.addEventListener("click", () => openGallery(project));
  article.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openGallery(project);
    }
  });
  return article;
}

function makeLandingTile(project, imageIndex, tileIndex) {
  const button = document.createElement("button");
  const shapes = [
    "hero-tile",
    "poster-tile",
    "wide",
    "tall",
    "label-tile",
    "",
    "wide",
    "",
    "poster-tile",
    "label-tile",
    "",
    "wide",
  ];
  button.className = `landing-tile ${shapes[tileIndex] || ""}`;
  button.type = "button";
  button.innerHTML = `<img src="${thumbPath(project.slug, imageIndex)}" alt="${project.title}" loading="lazy" decoding="async">`;
  button.addEventListener("click", () =>
    openLightbox(imagePath(project.slug, imageIndex), `${project.title} / ${project.category}`),
  );
  return button;
}

function makeArchiveCard(project) {
  const article = document.createElement("article");
  article.className = "archive-card";
  article.dataset.category = project.category;
  article.tabIndex = 0;
  article.setAttribute("role", "button");
  article.setAttribute("aria-label", `打开 ${project.title} 项目图库`);
  const thumbs = project.feature
    .slice(0, 4)
    .map(
      (item) => `
        <button type="button" data-src="${imagePath(project.slug, item)}" data-caption="${project.title}">
          <img src="${thumbPath(project.slug, item)}" alt="${project.title}" loading="lazy" decoding="async">
        </button>
      `,
    )
    .join("");

  article.innerHTML = `
    <figure>
      <img src="${thumbPath(project.slug, project.feature[0] || 1)}" alt="${project.title}" loading="lazy" decoding="async">
    </figure>
    <div class="archive-card-body">
      <div class="meta-row">
        <span>${project.category}</span>
        <span class="badge">${project.count} images</span>
      </div>
      <h3>${project.title}</h3>
      <p>${project.tone}</p>
      <div class="thumb-row">${thumbs}</div>
    </div>
  `;

  article.addEventListener("mouseenter", () => preloadProject(project));
  article.addEventListener("click", () => openGallery(project));
  article.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openGallery(project);
    }
  });

  return article;
}

const featuredInitialCount = isMobileViewport ? 3 : 5;
projects.slice(0, featuredInitialCount).forEach((project, index) => {
  featured.append(makeCard(project, index));
});

function renderRemainingFeatured() {
  if (!isMobileViewport || featured.dataset.complete === "true") return;
  projects.slice(featuredInitialCount, 5).forEach((project, index) => {
    featured.append(makeCard(project, index + featuredInitialCount));
  });
  featured.dataset.complete = "true";
}

const landingItems = [
  ["commercial-landing", 2],
  ["commercial-landing", 4],
  ["commercial-landing", 6],
  ["commercial-landing", 10],
  ["potatodrew", 3],
  ["potatodrew", 6],
  ["efac", 10],
  ["efac", 14],
  ["strongburger", 2],
  ["hotdog-park", 3],
  ["fitma", 1],
  ["tophit", 21],
];

function renderLanding(limit = landingItems.length) {
  if (Number(landing.dataset.rendered || 0) >= limit) return;
  const start = Number(landing.dataset.rendered || 0);
  landingItems.slice(start, limit).forEach(([slug, index], tileIndex) => {
    const project = projects.find((item) => item.slug === slug);
    landing.append(makeLandingTile(project, index, start + tileIndex));
  });
  landing.dataset.rendered = String(limit);
}

if (isMobileViewport) {
  renderLanding(4);
} else {
  renderLanding();
}

let archiveRendered = false;

function renderArchive() {
  if (archiveRendered) return;
  projects.forEach((project) => archive.append(makeArchiveCard(project)));
  archiveRendered = true;
}

function observeOnce(element, callback) {
  if (!("IntersectionObserver" in window)) {
    callback();
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        callback();
      }
    },
    { rootMargin: "450px 0px" },
  );
  observer.observe(element);
}

if (isMobileViewport) {
  observeOnce(landing, () => {
    renderLanding();
    renderRemainingFeatured();
  });
  observeOnce(archive, renderArchive);
} else if (location.hash === "#archive") {
  renderArchive();
} else if ("requestIdleCallback" in window) {
  requestIdleCallback(renderArchive, { timeout: 1800 });
} else {
  setTimeout(renderArchive, 900);
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    renderArchive();
    document.querySelectorAll(".filter").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".archive-card").forEach((card) => {
      card.classList.toggle(
        "is-hidden",
        filter !== "All" && card.dataset.category !== filter,
      );
    });
  });
});

document.querySelectorAll(".creator-image").forEach((button) => {
  button.addEventListener("click", () =>
    openLightbox(button.dataset.src, button.dataset.caption),
  );
});

closeLightbox.addEventListener("click", closeLightboxPanel);
prevLightbox.addEventListener("click", () => moveLightbox(-1));
nextLightbox.addEventListener("click", () => moveLightbox(1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightboxPanel();
});
galleryClose.addEventListener("click", closeGallery);
galleryModal.addEventListener("click", (event) => {
  if (event.target === galleryModal) closeGallery();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (lightbox.classList.contains("is-open")) {
      closeLightboxPanel();
    } else {
      closeGallery();
    }
  }
  if (lightbox.classList.contains("is-open") && event.key === "ArrowLeft") {
    moveLightbox(-1);
  }
  if (lightbox.classList.contains("is-open") && event.key === "ArrowRight") {
    moveLightbox(1);
  }
});
