<template>
    <div class="homepage">
        <header>
            <h1>Galeria de Artes</h1>
            <div class="search-box">
                <input type="text" placeholder="Pesquisar obras..." />
                <IconSearch class="icon" />
            </div>
        </header>

        <section class="gallery">
            <div v-for="art in artworks" :key="art.id" class="art-card">
                <img :src="art.image" :alt="art.title" />
                <h2>{{ art.title }}</h2>
            </div>
        </section>
    </div>
</template>

<script>
import { ref } from 'vue';
import { IconSearch } from '@tabler/icons-vue'; // Ícone de busca moderno
import art01 from '../assets/images/art01.jpg';
import art02 from '../assets/images/art02.jpg';
import art03 from '../assets/images/art03.jpg';
import art04 from '../assets/images/art04.jpg';
import art05 from '../assets/images/art05.jpg';
import art06 from '../assets/images/art06.jpg';
import art07 from '../assets/images/art07.jpg';
import art08 from '../assets/images/art08.jpg';
import art09 from '../assets/images/art09.jpg';
import art10 from '../assets/images/art10.jpg';
import art11 from '../assets/images/art11.jpg';
import art12 from '../assets/images/art12.jpg';
import art13 from '../assets/images/art13.jpg';
import art14 from '../assets/images/art14.jpg';
import art15 from '../assets/images/art15.jpg';
import art16 from '../assets/images/art16.jpg';
import art17 from '../assets/images/art17.jpg';
import art18 from '../assets/images/art18.jpg';
import art19 from '../assets/images/art19.jpg';
import art20 from '../assets/images/art20.jpg';
import art21 from '../assets/images/art21.jpg';
import art22 from '../assets/images/art22.jpg';
import art23 from '../assets/images/art23.jpg';
import art24 from '../assets/images/art24.jpg';
import art25 from '../assets/images/art25.jpg';
import art26 from '../assets/images/art26.jpg';
import art27 from '../assets/images/art27.jpg';
import art28 from '../assets/images/art28.jpg';

export default {
    components: { IconSearch },
    setup() {
        const artworks = ref([
            { id: 1, title: 'Obra 1', image: art01 },
            { id: 2, title: 'Obra 2', image: art02 },
            { id: 3, title: 'Obra 3', image: art04 },
            { id: 4, title: 'Obra 4', image: art05 },
            { id: 5, title: 'Obra 5', image: art06 },
            { id: 6, title: 'Obra 6', image: art07 },
            { id: 7, title: 'Obra 7', image: art08 },
            { id: 8, title: 'Obra 8', image: art09 },
            { id: 9, title: 'Obra 09', image: art10 },
            { id: 10, title: 'Obra 10', image: art11 },
            { id: 11, title: 'Obra 11', image: art12 },
            { id: 12, title: 'Obra 12', image: art14 },
            { id: 13, title: 'Obra 13', image: art17 },
            { id: 14, title: 'Obra 14', image: art18 },
            { id: 15, title: 'Obra 15', image: art19 },
            { id: 16, title: 'Obra 16', image: art20 },
            { id: 17, title: 'Obra 17', image: art21 },
            { id: 18, title: 'Obra 18', image: art22 },
            { id: 19, title: 'Obra 19', image: art24 },
            { id: 20, title: 'Obra 20', image: art25 },
            { id: 20, title: 'Obra 21', image: art26 },
            { id: 20, title: 'Obra 22', image: art27 },
            { id: 20, title: 'Obra 23', image: art28 },
            { id: 20, title: 'Obra 24', image: art16 },
            { id: 20, title: 'Obra 25', image: art13 },
            { id: 20, title: 'Obra 26', image: art15 },
            { id: 20, title: 'Obra 27', image: art03 },
            { id: 20, title: 'Obra 28', image: art23 },
        ]);
        return { artworks };
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

/***** Galeria de Imagens *****/
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.art-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s;
}

.art-card:hover {
    transform: scale(1.05);
}

.art-card img {
    width: 100%;
    height: auto;
    object-fit: cover;
    max-height: 300px;
    
}

.art-card h2 {
    font-size: 1.8rem;
    padding: 1rem;
    color: var(--dark-color);
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
</style>
