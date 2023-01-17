<template>
  <div id="wrapper">
    <div class="container">
      <div class="row text-center">
        <div v-if="survey.survey.surveyThankyouImage" class="check_mark_img">
          <img
            :src="survey.survey.surveyThankyouImage"
            alt="image_not_found"
          />
        </div>
        <div class="title pt-1">
          <b style="font-size: 2rem"><p v-html="survey.statusText"></p></b>
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
  width: 30rem;
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
  justify-content: center;
}
</style>