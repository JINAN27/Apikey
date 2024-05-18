const apiKey = '49d3259aea2e4a65a116d7a3dd93f8ba';
const apiUrl = 'https://newsapi.org/v2/';

function ambilBerita(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const daftarBerita = document.getElementById('newsList');
      daftarBerita.innerHTML = '';
      data.articles.forEach(article => {
        const beritaItem = document.createElement('div');
        beritaItem.classList.add('card', 'mb-3');
        beritaItem.innerHTML = `
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${article.urlToImage}" class="img-fluid rounded-start" alt="${article.title}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${article.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Sumber: ${article.source.name}</h6>
                <p class="card-text">${article.description}</p>
                <a href="${article.url}" class="btn btn-primary" target="_blank">Baca lebih lanjut</a>
              </div>
            </div>
          </div>
        `;
        daftarBerita.appendChild(beritaItem);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}

function cariBerita() {
  const kueriPencarian = document.getElementById('searchInput').value;
  if (kueriPencarian.length > 0) {
    const urlPencarian = `${apiUrl}everything?q=${kueriPencarian}&apiKey=${apiKey}`;
    ambilBerita(urlPencarian);
  } else {
    ambilBerita(`${apiUrl}top-headlines?country=id&apiKey=${apiKey}`);
  }
}

document.getElementById('searchInput').addEventListener('input', cariBerita);

// Ambil berita utama pada awalnya
ambilBerita(`${apiUrl}top-headlines?country=id&apiKey=${apiKey}`);
