<template>
    <div class="homepage">
        <header>
            <h1>Galeria de Artes</h1>

            <!-- Botão para acessar favoritos -->
            <router-link to="/favoritos" class="favorites-link">📌 Ver Favoritos</router-link>

            <!-- Botão para abrir o modal de contato -->
            <button @click="openContactModal" class="contact-btn">📩 Contato</button>

            <!-- Filtros -->
            <div class="filters">
                <input type="text" v-model="searchQuery" placeholder="Pesquisar obras..." @input="resetPagination" />
                <select v-model="selectedCategory" @change="resetPagination">
                    <option value="">Todas as Categorias</option>
                    <option v-for="category in uniqueCategories" :key="category" :value="category">
                        {{ category }}
                    </option>
                </select>
            </div>
        </header>

        <section class="gallery">
            <div v-for="art in paginatedArtworks" :key="art.id" class="art-card fade-in">
                <img :src="art.image" :alt="art.title" @click="openModal(art.image)" />
                <div class="card-header">
                    <h2>{{ art.title }}</h2>
                    <button @click="toggleFavorite(art)">
                        {{ isFavorite(art.id) ? '★' : '☆' }}
                    </button>
                    <button @click="shareArtwork(art)">
                        📤
                    </button>
                </div>
            </div>
        </section>

        <!-- Paginação -->
        <div class="pagination-controls">
            <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
            <span>Página {{ currentPage }} de {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Próxima</button>
        </div>

        <div v-if="modalVisible" class="modal" @click="closeModal">
            <span class="close-btn" @click="closeModal">&times;</span>
            <img :src="modalImage" class="modal-img" />
        </div>

        <!-- Modal de Contato -->
        <ModalContato :show="showContactModal" @close="closeContactModal" />
    </div>

    <section class="about">
        <h2>Sobre</h2>
        <div class="about-container">
            <div class="profile">
                <img src="../assets/images/karla.jpg" alt="Karla Albuquerque" class="profile-img">
                <h3>Karla Albuquerque</h3>
                <p>Artista responsável pelas ilustrações.</p>
                <div class="social-icons">
                    <a href="https://www.instagram.com/karla_albuquerque2000/" target="_blank">🎨 Instagram</a>
                    <a href="https://instagram.com/karla_albuquerqueoficial17" target="_blank">📱 Instagram</a>
                    <a href="" target="_blank">📘 Facebook</a>
                    <a href="https://wa.me/+5581995450707" target="_blank">💬 WhatsApp</a>
                </div>
            </div>
            <div class="profile">
                <img src="../assets/images/robson.jpg" alt="Robson Albuquerque" class="profile-img">
                <h3>Robson Albuquerque</h3>
                <p>Desenvolvedor do site.</p>
                <div class="social-icons">
                    <a href="https://linkedin.com/in/robson-monteiro-de-albuquerque-8b3853230/" target="_blank">🔗
                        LinkedIn</a>
                    <a href="https://github.com/rma98" target="_blank">🐙 GitHub</a>
                    <a href="https://instagram.com/robson.albuquerque_cm/" target="_blank">📱 Instagram</a>
                    <a href="https://www.facebook.com/robson.albuquerque098/" target="_blank">📘 Facebook</a>
                    <a href="https://wa.me/+5581971168633" target="_blank">💬 WhatsApp</a>
                </div>
            </div>
        </div>
    </section>
    <footer class="footer">
        <p>© {{ new Date().getFullYear() }} Galeria de Artes. Todos os direitos reservados.</p>
    </footer>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import artworks from '../data/artworks.js';
import ModalContato from '../components/ModalContato.vue'; // Importação do modal

export default {
    components: { ModalContato }, // Registro do componente

    setup() {
        const searchQuery = ref('');
        const selectedCategory = ref('');
        const itemsPerPage = 8;
        const currentPage = ref(1);
        const favoriteArtworks = ref([]);
        const showContactModal = ref(false); // Estado do modal de contato

        const shareArtwork = (art) => {
            if (navigator.share) {
                navigator.share({
                    title: art.title,
                    text: "Confira esta arte incrível!",
                    url: art.image
                }).then(() => console.log("Compartilhado com sucesso"))
                    .catch((error) => console.log("Erro ao compartilhar", error));
            } else {
                navigator.clipboard.writeText(art.image).then(() => {
                    alert("Link copiado! Agora você pode colar e compartilhar.");
                });
            }
        };

        const loadFavorites = () => {
            favoriteArtworks.value = JSON.parse(localStorage.getItem('favorites')) || [];
        };

        onMounted(loadFavorites);

        const uniqueCategories = computed(() => {
            return [...new Set(artworks.map(art => art.category))];
        });

        const filteredArtworks = computed(() => {
            return artworks.filter(art =>
                art.title.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
                (selectedCategory.value === '' || art.category === selectedCategory.value)
            );
        });

        const totalPages = computed(() => Math.ceil(filteredArtworks.value.length / itemsPerPage));

        const paginatedArtworks = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            return filteredArtworks.value.slice(start, start + itemsPerPage);
        });

        const prevPage = () => {
            if (currentPage.value > 1) currentPage.value--;
        };

        const nextPage = () => {
            if (currentPage.value < totalPages.value) currentPage.value++;
        };

        const resetPagination = () => {
            currentPage.value = 1;
        };

        watch([searchQuery, selectedCategory], resetPagination);

        const modalVisible = ref(false);
        const modalImage = ref("");

        const openModal = (image) => {
            modalImage.value = image;
            modalVisible.value = true;
        };

        const closeModal = () => {
            modalVisible.value = false;
        };

        const toggleFavorite = (art) => {
            const index = favoriteArtworks.value.findIndex(fav => fav.id === art.id);

            if (index !== -1) {
                favoriteArtworks.value.splice(index, 1);
            } else {
                favoriteArtworks.value.push({
                    id: art.id,
                    title: art.title,
                    image: art.image
                });
            }

            localStorage.setItem('favorites', JSON.stringify(favoriteArtworks.value));
        };

        const isFavorite = (id) => {
            return favoriteArtworks.value.some(fav => fav.id === id);
        };

        // Métodos para abrir e fechar o modal de contato
        const openContactModal = () => {
            showContactModal.value = true;
        };

        const closeContactModal = () => {
            showContactModal.value = false;
        };

        return {
            shareArtwork,
            searchQuery,
            selectedCategory,
            uniqueCategories,
            paginatedArtworks,
            modalVisible,
            modalImage,
            openModal,
            closeModal,
            currentPage,
            totalPages,
            prevPage,
            nextPage,
            resetPagination,
            toggleFavorite,
            isFavorite,
            showContactModal,
            openContactModal,
            closeContactModal
        };
    }
};
</script>

<style scoped>
/***** Estrutura Base *****/
.homepage {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: var(--secondary-color);
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
    font-size: 2.5rem;
    color: var(--primary-color);
}

/***** Campo de Busca *****/
.search-box {
    display: flex;
    align-items: center;
    background: white;
    padding: 0.8rem 1.2rem;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.search-box input {
    border: none;
    font-size: 1.6rem;
    padding: 0.5rem;
    outline: none;
    width: 200px;
}

/* Estilos para os filtros */
.filters {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 15px;
}

select {
    padding: 5px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.icon {
    color: var(--primary-color);
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: 0.3s;
}

.icon:hover {
    color: var(--dark-color);
}

/***** Estilização da Galeria *****/
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.gallery:has(.art-card:only-child) {
    display: flex;
    justify-content: center;
}

.art-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s;
    position: relative;
    cursor: pointer;
    padding: 1rem;
}

/* Container para título e botão */
.art-card .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.8);
    /* Fundo para contraste */
    border-top: 1px solid #ddd;
    /* Separação sutil */
}

/* Estilização do título */
.art-card h2 {
    font-size: 1.2rem;
    margin: 0;
    flex: 1;
    /* Ocupa o máximo de espaço possível */
    padding-right: 0.5rem;
}

.art-card .card-header button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #555;
    padding: 0.3rem 0.5rem;
    transition: color 0.3s;
}

.art-card .card-header button:hover {
    color: dodgerblue;
}

/* Botão sempre visível */
.art-card button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #555;
    padding: 0.3rem 0.5rem;
    transition: color 0.3s;
}

/* Melhor contraste no hover */
.art-card button:hover {
    color: gold;
}

.favorites-link {
    display: block;
    text-align: right;
    font-size: 1.2em;
    margin-bottom: 10px;
    text-decoration: none;
}

/* Estilização do loader */
.loading {
    text-align: center;
    padding: 20px;
    font-size: 16px;
    font-weight: bold;
    color: #666;
    animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
}

.pagination-controls button {
    padding: 10px;
    margin: 0 10px;
    cursor: pointer;
}

/***** Estilização do Modal *****/
.modal {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    justify-content: center;
    align-items: center;
}

.modal-img {
    max-width: 90%;
    max-height: 90%;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 30px;
    cursor: pointer;
    color: white;
}

/* Sobre */
.about {
    background: white;
    padding: 30px;
    margin-top: 20px;
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    
    width: 100%;
    text-align: center;
}

.about-container {
    display: flex;
    justify-content: center;
    gap: 40px;
    flex-wrap: wrap;
}

.profile {
    text-align: center;
}

.profile-img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid #ff6b6b;
    transition: 0.3s;
}

.profile-img:hover {
    transform: scale(1.1);
}

.social-icons {
    margin-top: 10px;
}

.social-icons a {
    text-decoration: none;
    color: #ff6b6b;
    margin: 0 10px;
    font-size: 24px;
    transition: 0.3s;
}

.social-icons a:hover {
    color: #ff4a4a;
}

/* Rodapé */
.footer {
    margin-top: 30px;
    background: #222;
    color: white;
    padding: 15px;
    text-align: center;
    width: 100%;
    border-radius: 8px;
}

/***** Responsividade *****/
@media (max-width: 768px) {
    header {
        flex-direction: column;
        gap: 1rem;
    }

    .search-box input {
        width: 100%;
    }
}

/* Melhorando a responsividade */
@media (max-width: 600px) {
    .art-card .card-header {
        flex-direction: row;
        padding: 0.5rem 0.2rem;
    }

    .art-card h2 {
        font-size: 1rem;
    }

    .art-card button {
        font-size: 1.3rem;
    }
}
</style>
