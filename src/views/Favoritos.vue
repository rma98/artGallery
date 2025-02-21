<template>
    <div class="favorites-page">
        <header>
            <h1>Favoritos</h1>
            <router-link to="/" class="back-button">⬅ Voltar para a Galeria</router-link>
        </header>

        <section class="gallery">
            <div v-for="art in favoriteArtworks" :key="art.id" class="art-card fade-in" @click="openModal(art.image)">
                <img :src="art.image" :alt="art.title" class="art-image" />
                <h2>{{ art.title }}</h2>
                <button class="remove-button" @click.stop="removeFavorite(art.id)">❌</button>
            </div>
        </section>

        <div v-if="modalVisible" class="modal" @click="closeModal">
            <span class="close-btn" @click="closeModal">&times;</span>
            <img :src="modalImage" class="modal-img" />
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const modalVisible = ref(false);
        const modalImage = ref("");
        const favoriteArtworks = ref([]);

        const loadFavorites = () => {
            const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            favoriteArtworks.value = favorites;
        };

        const removeFavorite = (id) => {
            favoriteArtworks.value = favoriteArtworks.value.filter(art => art.id !== id);
            localStorage.setItem("favorites", JSON.stringify(favoriteArtworks.value));
        };

        const openModal = (image) => {
            modalImage.value = image;
            modalVisible.value = true;
        };

        const closeModal = () => {
            modalVisible.value = false;
        };

        onMounted(loadFavorites);

        return {
            favoriteArtworks,
            modalVisible,
            modalImage,
            openModal,
            closeModal,
            removeFavorite,
        };
    }
};
</script>

<style scoped>
.favorites-page {
    max-width: 1200px;
    margin: auto;
    padding: 20px;
    text-align: center;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.back-button {
    text-decoration: none;
    font-size: 18px;
    color: #333;
    padding: 8px 12px;
    border: 2px solid #333;
    border-radius: 8px;
    transition: 0.3s;
}

.back-button:hover {
    background-color: #333;
    color: white;
}

.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    justify-items: center;
}

.art-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 10px;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
    position: relative;
    cursor: pointer;
    width: 100%;
    max-width: 250px;
}

.art-card:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.art-image {
    width: 100%;
    border-radius: 8px;
}

.remove-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: red;
    transition: 0.2s;
}

.remove-button:hover {
    color: darkred;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-img {
    max-width: 90%;
    max-height: 90%;
    border-radius: 12px;
}

.close-btn {
    position: absolute;
    top: 15px;
    right: 25px;
    font-size: 30px;
    color: white;
    cursor: pointer;
}
</style>
