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
        <img v-if="survey.survey && survey.survey.surveyWelcomeImage && survey.survey.surveyWelcomeImage !== ''" :src="survey.survey.surveyWelcomeImage">
        <p class="text-center" v-html="survey.statusText"></p>
      </div>
    </div>
    <div v-if="isOverFlown">
      <svg  class="overflow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M246.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 402.7 361.4 265.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-160 160zm160-352l-160 160c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 210.7 361.4 73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3z"/></svg>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      mounted: false,
      scrolled: false
    }
  },
  computed: {
    ...mapGetters({
      survey: 'getSurvey',
    }),
    isOverFlown() {
      if(this.mounted && this.$refs && this.$refs.content){
        return !this.scrolled && this.$refs.content.scrollHeight > this.$refs.content.clientHeight
      }
     return false
    }
  },
  mounted () {
    setTimeout(() => {
      this.mounted = true
    }, 300);
  },
  methods: {
    onScrolled() {
      this.$refs.content.scrollTop !== 0 ? this.scrolled = true : this.scrolled = false
    }
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