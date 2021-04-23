<template>
 <div id="app">
    <div class="card-row">
    <div v-for="(card, index) in cards"
        :key="index"
        :ref="`card_${index}`"
        @mouseover="hoverCard(index)"
        @mouseout="hoverCard(-1)"
        class="card">

      <img class="card-image"
        :class="{'selected': isSelected(index)}"
        :src="card.image">

      <div class="card-footer">
        <h3 class="card-title">{{card.title}}</h3>
        <p class="card-text">by
          <span
            class="card-author"
            :class="{'selected': isSelected(index)}">
                {{card.author}}
          </span>
        </p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data () {
    return {
      selectedCard: -1,
      cards: [
        {
          title: 'Gallery',
          author: 'Walder Frey',
          image: 'http://www.gstatic.com/webp/gallery/1.webp'
        },
        {
          title: 'Penguin',
          author: 'Ramsey Bolton',
          image: 'https://www.gstatic.com/webp/gallery3/2_webp_ll.png'
        },
        {
          title: 'Flower',
          author: 'Joffrey Baratheon',
          image: 'https://www.gstatic.com/webp/gallery3/1.png'
        },
        {
          title: 'Bitcoin',
          author: 'PixayBay',
          image: 'https://cdn.pixabay.com/photo/2018/04/18/14/01/blockchain-3330531__340.jpg'
        },
        {
          title: 'Rose',
          author: 'Roose Bolton',
          image: 'https://res.cloudinary.com/prestige-gifting/image/fetch/fl_progressive,q_95,e_sharpen:50,w_480/e_saturation:05/https://www.prestigeflowers.co.uk/images/NF4016-130116.jpg'
        }
      ]
    }
  },
  created () {

  },
  methods: {
    hoverCard (selectedIndex) {
      this.selectedCard = selectedIndex
    },
    isSelected (cardIndex) {
      return this.selectedCard === cardIndex
    }
  }
}
</script>
<style scoped>
body {
    background-color: #E1E7E7;
  }

  .card-row {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 780px;
    width: 100%;
    height: 500px;
  }

  .card {
    position: relative;
    background-color: #FFFFFF;
    height: 370px;
    width: 240px;
    margin: 10px;
    overflow: hidden;
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.5);
  }

  .card-image {
    /* center horizontally overflown image */
    position: absolute;
    left: -9999px;
    right: -9999px;
    margin: auto;

    height: 220px;
    min-width: 100%;

    transition: height 0.3s, opacity 0.3s;
  }
  .card-image.selected {
    height: 410px;
    opacity: 0.3;
  }

  .card-footer {
    position: absolute;
    bottom: 0;
    height: 130px;
    padding: 10px 15px;
    font-family: Helvetica;
  }
  .card-text {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.7);
  }
  .card-title {
    font-family: Serif;
  }
  .card-author {
    font-size: 14px;
    color: #BAB096;
    transition: color 0.3s;
  }
  .card-author.selected {
    color: #6a6456;
  }
  .card {
    /* the other rules */
    transition: height 0.3s, box-shadow 0.3s;
  }
  .card:hover {
    height: 410px;
    box-shadow: 20px 20px 40px 0px rgba(0,0,0,0.5);
  }
</style>
