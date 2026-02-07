// Movie Database - MANUALLY ENTER ALL INFO HERE
// Since we removed the API, you must provide the title, poster link, rating, and description.
let movies = [
    {
        id: 1,
        title: "Padakalam",
        year: 2025,
        rating: "9.5",
        description: "Four nerdy comic book enthusiasts find themselves in an unexpected adventure when their school's charming new professor turns their academic world upside down with supernatural events.",
        // Get this link by right-clicking any movie poster on Google and choosing "Copy Image Address"
        poster: "https://img.airtel.tv/unsafe/fit-in/1600x0/filters:format(webp)/https://xstreamcp-assets-msp.streamready.in/assets/HOTSTAR_DTH/MOVIE/690de3dcbd29c33a8a099608/images/LANDSCAPE_169/1749046165724-h?o=production", 
        driveId: "https://drive.google.com/file/d/1O6P98Te-fad_w6iFJADIeX6QqEDPTKeL/view?usp=drive_link",
        category: "trending"
    },
    {
        id: 2,
        title: "Akhanda 2",
        year: 2025,
        rating: "9.5",
        description: "A heartwarming journey explores the connection between children's innocence, the natural world, and spiritual faith as communities strive for progress.",
        // Get this link by right-clicking any movie poster on Google and choosing "Copy Image Address"
        poster: "https://m.media-amazon.com/images/M/MV5BZjM0NGRiYzctNzZhMS00NmU2LWJkZDItZTQxNGVhN2RkNTA1XkEyXkFqcGc@._V1_.jpg", 
        driveId: "https://drive.google.com/file/d/1KSpCucMeoMQRw1JWYxQMn2-d5ER8yLXM/view?usp=drive_link",
        category: "trending"
    },
    {
        id: 3,
        title: "Mana ShankaraVaraprasad Garu",
        year: 2026,
        rating: "9.0",
        description: "A security officer protecting his estranged wife and kids from a vengeful ex-cop sees it as a chance to rebuild their relationship after six years apart.",
        poster: "https://m.media-amazon.com/images/M/MV5BMTI3NWE5YjEtMmJkZi00OTUzLWI3YzMtMmNmYjEzNzdhMmM3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        driveId: "",
        category: "action"
    }

];

// HELPER: Converts Share URLs to Direct Playable URLs
function fixVideoLink(url) {
    if (!url || url === "") return "";

    // Fix Dropbox: Convert to direct stream
    if (url.includes("dropbox.com")) {
        return url.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("dl=0", "raw=1");
    }

    // Fix Google Drive: Convert to preview player
    if (url.includes("drive.google.com")) {
        const match = url.match(/\/d\/(.+?)\//) || url.match(/id=([^&]+)/);
        const id = match ? match[1] : url;
        return `https://drive.google.com/file/d/${id}/preview`;
    }

    return url;
}

// Play Function: Opens in a new tab for 100% reliability
function playMovie(movie) {
    const playableUrl = fixVideoLink(movie.driveId);
    if (playableUrl) {
        window.open(playableUrl, '_blank');
    } else {
        alert("Movie link not found!");
    }
}

// UI Initialization
document.addEventListener('DOMContentLoaded', () => {
    // No more API fetching! Just load the UI immediately.
    initializeUI();
});

function initializeUI() {
    loadHeroSection();
    loadCarousels();
    setupEventListeners();
}

function loadHeroSection() {
    const featured = movies[0];
    const heroSection = document.getElementById('heroSection');
    if (!heroSection) return;

    heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('${featured.poster}')`;
    document.getElementById('heroTitle').textContent = featured.title;
    document.getElementById('heroDescription').textContent = featured.description;
    
    document.getElementById('playBtn').onclick = () => playMovie(featured);
    document.getElementById('infoBtn').onclick = () => showInfo(featured);
}

function loadCarousels() {
    const categories = ['trending', 'action', 'recommended'];
    categories.forEach(cat => {
        const carousel = document.getElementById(`${cat}Carousel`);
        if (carousel) {
            carousel.innerHTML = '';
            movies.filter(m => m.category === cat).forEach(movie => {
                carousel.appendChild(createMovieCard(movie));
            });
        }
    });
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
        <div class="play-overlay">▶</div>
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <div class="rating">★ ${movie.rating}</div>
        </div>
    `;
    card.onclick = () => playMovie(movie);
    return card;
}

function showInfo(movie) {
    document.getElementById('infoImage').src = movie.poster;
    document.getElementById('infoTitle').textContent = movie.title;
    document.getElementById('infoYear').textContent = movie.year;
    document.getElementById('infoRating').textContent = '★ ' + movie.rating;
    document.getElementById('infoDescription').textContent = movie.description;
    
    document.getElementById('infoPlayBtn').onclick = () => {
        document.getElementById('infoModal').classList.remove('show');
        playMovie(movie);
    };

    document.getElementById('infoModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Modal closing logic
document.querySelectorAll('.close-button').forEach(btn => {
    btn.onclick = () => {
        document.getElementById('infoModal').classList.remove('show');
        document.body.style.overflow = 'auto';
    };
});

window.onclick = (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
};

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = movies.filter(m => m.title.toLowerCase().includes(query));
            const carousel = document.getElementById('trendingCarousel');
            if (carousel) {
                carousel.innerHTML = '';
                filtered.forEach(movie => carousel.appendChild(createMovieCard(movie)));
            }
        });
    }
}