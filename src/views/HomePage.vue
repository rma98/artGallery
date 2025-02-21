<template>
    <div class="homepage">
        <header>
            <h1>Galeria de Artes</h1>

            <!-- Botão para acessar favoritos -->
            <router-link to="/favoritos" class="favorites-link">📌 Ver Favoritos</router-link>

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
    </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import artworks from '../data/artworks.js';

export default {
    setup() {
        const searchQuery = ref('');
        const selectedCategory = ref('');
        const itemsPerPage = 8;
        const currentPage = ref(1);
        const favoriteArtworks = ref([]);

        // 🔹 Carregar favoritos ao iniciar
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

        // 🔹 Alternar entre adicionar/remover favoritos
        const toggleFavorite = (art) => {
            const index = favoriteArtworks.value.findIndex(fav => fav.id === art.id);

            if (index !== -1) {
                // Se já está nos favoritos, remover
                favoriteArtworks.value.splice(index, 1);
            } else {
                // Se não está, adicionar
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

        return {
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
            isFavorite
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
