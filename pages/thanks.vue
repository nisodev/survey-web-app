<template>
  <div id="wrapper">
    <div class="container">
      <div class="row text-center">
        <div class="check_mark_img">
          <img
            :src="require('~/assets/images/completed.png')"
            alt="image_not_found"
          />
        </div>
        <div class="sub_title">
          <span>Your submission has been received</span>
        </div>
        <div class="title pt-1">
          <b style="font-size: 1.2rem"><p v-html="survey.statusText"></p></b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      text: '',
    }
  },
  computed: {
    ...mapGetters({
      survey: 'getSurvey',
    }),
  },
}
</script>

<style scoped>
.check_mark_img img {
  width: 20rem;
  height: auto;
}
.wrapper {
  height: 100vh;
  background-color: #f2f2f2;
}
.container {
  height: 100vh;
  display: flex;
  align-items: center;
}
</style>