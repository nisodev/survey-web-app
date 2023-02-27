<template>
  <div
    ref="content"
    style="position: relative;"
    class="
      content_box
      welcome-box
      shadow
      text-center
      bg-white
      py-5
      position-relative
    "
    @scroll="onScrolled"
  >
    <div class="leadership">
      <div v-if="survey.attendee" class="name mb-3">
        <h4>Survey {{ survey.survey.title }}</h4>
        <h4>Welcome {{ survey.attendee.attendetitle }}</h4>
        <div class="p-3">
          <img v-if="survey.survey && survey.survey.surveyWelcomeImage && survey.survey.surveyWelcomeImage !== ''" style="border-radius: 10px" :src="survey.survey.surveyWelcomeImage">
        </div>
        <p class="text-center" v-html="survey.statusText"></p>
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
    }),
  },
}
</script>


<style>
.overflow-icon{
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 30px;
  opacity: 0.5;
  height: 30px;
}
</style>