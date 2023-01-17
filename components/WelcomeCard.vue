<template>
  <div class="welcome-box-wrapper">
    <div
    class="content_box welcome-box shadow text-center bg-white py-5 position-relative"
  >
    <div v-if="survey.success === 10 && completed === false" class="leadership">
      <div class="name mb-3">
        <h1>{{ survey.surveyItems[0].surveyitemtitle }}</h1>
      </div>
      <div class="photo">
        <img :src="survey.surveyItems[0].surveyitemphoto" class="item-photo" />
      </div>
    </div>

    <div v-if="survey.success === 200" class="w-100">
      <p class="text-center" v-html="survey.message"></p>
    </div>

    <div v-if="survey.statusText" class="w-100 p-2">
      <b>
        <p
          class="text-center"
          style="font-size: 2rem"
          v-html="survey.statusText"
        ></p
      ></b>
    </div>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      survey: 'getSurvey',
      completed: 'getCompleted',
    }),
  },
  mounted() {
    console.log(this.survey)
  },
}
</script>

<style scoped>
.welcome-box-wrapper {
  height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item-photo {
  max-height: 250px;
  object-fit: contain;
  border-radius: 50%;
}

.welcome-box {
  height: auto !important;
}
</style>
