<template>
  <div class="mt-2 welcome-box-wrapper">
    <div
    class="content_box welcome-box shadow text-center bg-white py-3 position-relative"
  >
    <div v-if="survey.success === 10 && completed === false" class="leadership">
      <div class="name mb-3">
        <h3>{{ survey.surveyItems[0].surveyitemtitle }}</h3>
      </div>
      <div class="photo">
        <img :src="survey.surveyItems[0].surveyitemphoto" class="item-photo" />
      </div>
    </div>

    <div v-if="survey.success === 200" class="w-100">
      <p class="text-center" v-html="survey.message"></p>
    </div>

    <!-- <div v-if="survey.statusText" class="w-100 p-2">
      <b>
        <h3  class="text-center"  v-html="survey.statusText">

        </h3>
      ></b>
    </div> -->
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
max-height: 600px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.item-photo {
  max-height: 230px;
  object-fit: contain;
  border-radius: 50%;
}

.welcome-box {
  max-height: 500px;
  overflow: scroll;
}



</style>
