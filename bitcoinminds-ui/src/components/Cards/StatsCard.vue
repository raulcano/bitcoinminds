<template>
  <card :show-footer-line="true" 
  class="card-stats">
    <b-row 
    :class="link ? 'card-with-link':''"
    @click="cardClicked">

      <b-col>
        <slot>
          <h5 class="card-title text-uppercase text-muted mb-0" v-if="title"
          :title="tooltip?tooltip:''"
          >{{title}}</h5>
          <span class="h2 font-weight-bold mb-0" v-if="subTitle">{{subTitle}}</span>
        </slot>
      </b-col>

      <b-col cols="auto" v-if="$slots.icon || icon">
        <slot name="icon">
          <div class="icon icon-shape text-white rounded-circle shadow"
               :class="[`bg-${type}`, iconClasses]">
            <i :class="icon"></i>
          </div>
        </slot>
      </b-col>
    </b-row>

    <p class="mt-3 mb-0 text-sm">
      <slot name="footer">

      </slot>
    </p>
  </card>
</template>
<script>
  import Card from './Card.vue';

  export default {
    name: 'stats-card',
    components: {
      Card
    },
    props: {
      type: {
        type: String,
        default: 'primary'
      },
      icon: String,
      title: String,
      subTitle: String,
      link: String,
      tooltip: String,
      iconClasses: [String, Array]
    },
    methods: {
      cardClicked(){
        if (this.link) {
          window.open(this.link, '_self')
        }
      }
    }, 
  };
</script>
<style>
.card-with-link:hover {
  cursor: pointer;
}
</style>
