<template>
  <div class="wrapper position-relative overflow-hidden">
    <!-- Top content -->
    <div class="container">
      <div v-if="survey.client" class="logo_area pt-5">
        <a>
          <img :src="survey.client.logo" alt="logo" class="client-logo" />
        </a>
      </div>
    </div>
    <!-- Circles which indicates the steps of the form: -->
    <div class="container">
      <!------------------------- Step-1 ----------------------------->
      <empty-survey v-if="survey.isEmpty"></empty-survey>
      <welcome-card
        v-if="
          (survey.success === 10 ||
            survey.success === 400 ||
            survey.success === 100) &&
          !question
        "
      ></welcome-card>
      <question-card v-else></question-card>
      <div v-if="survey.success === 10 && !question" class="row mt-5">
        <button
          type="button"
          class="f_btn start-btn next_btn text-white text-uppercase mt-2"
          @click="startSurvey"
        >
          Start Survey
        </button>
      </div>
      <!------------------------- Form button ----------------------------->
      <div v-if="question" class="row float-lg-end flex-column">
        <button
          type="button"
          class="f_btn prev_btn bg-white border text-uppercase"
          @click="lastQuestion"
        >
          <span><i class="fas fa-arrow-left"></i></span> Previous Question
        </button>
        <button
          :disabled="(question.required && answer === null) || answer === 0"
          type="button"
          :style="
            (question.required && answer === null) || answer === 0
              ? 'opacity: 0.5'
              : ''
          "
          class="f_btn next_btn text-white text-uppercase mt-2"
          @click="nextQuestion"
        >
          {{ isLastQuestion ? 'Complete' : 'Next' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Radio from '../components/Radio.vue'
import Checkbox from '../components/Checkbox.vue'
import YesNo from '../components/YesNo.vue'
import Rating from '../components/Rating.vue'
import WelcomeCard from '../components/WelcomeCard.vue'
import QuestionCard from '../components/QuestionCard.vue'
import EmptySurvey from '../components/EmptySurvey.vue'
export default {
  name: 'IndexPage',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Radio,
    // eslint-disable-next-line vue/no-unused-components
    Checkbox,
    // eslint-disable-next-line vue/no-unused-components
    Rating,
    // eslint-disable-next-line vue/no-unused-components
    YesNo,
    WelcomeCard,
    QuestionCard,
    EmptySurvey,
  },
  async asyncData({ store }) {
    await store.dispatch('fetchSurvey')
  },
  computed: {
    ...mapGetters({
      survey: 'getSurvey',
      question: 'getQuestion',
      isLastQuestion: 'getIsLastQuestion',
      answer: 'getAnswer',
    }),
  },
  mounted() {
    if (this.survey.success === 50) {
      this.$store.dispatch('startSurvey')
    }
  },
  methods: {
    startSurvey() {
      this.$store.dispatch('startSurvey')
    },
    nextQuestion() {
      if (this.isLastQuestion) {
        this.$store.dispatch('completeSurvey')
        this.$router.push('/thanks')
        // this.$store.commit('SET_COMPLETED', true)
        // this.$store.commit('SET_QUESTION', null)
        return
      }
      this.$store.commit('SET_ANSWER', null)
      const i = this.question.questionorder + 1
      this.$store.dispatch('fetchQuestion', i)
    },
    lastQuestion() {
      if (this.question.questionorder === 1) {
        return
      }
      const i = this.question.questionorder - 1
      this.$store.dispatch('fetchQuestion', i)
    },
  },
}
</script>
<style scoped>
.client-logo {
  width: 200px;
  height: auto;
}
.start-btn {
  width: 40%;
}
</style>
