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
      <div class="main-wrapper">
        <empty-survey v-if="survey.isEmpty"></empty-survey>
        <div>
          <attendee-info v-if="survey.success && survey.success !== 50 && attendeeInfoStep"></attendee-info>
          <welcome-card
            v-if="
              survey.success !== 50 && !attendeeInfoStep && !question
            "
          ></welcome-card>
        </div>
        <question-card></question-card>
        <div v-if="survey.success === 10 && !question" class="row mt-2">
          <button
            type="button"
            class="f_btn start-btn next_btn text-white text-uppercase"
            @click="attendeeInfoStep ? showClient() : startSurvey()"
          >
            {{ attendeeInfoStep ? 'Next' : 'Start Survey' }}
          </button>
        </div>
        <!------------------------- Form button ----------------------------->
        <div v-if="question" class="row float-lg-end flex-column mt-3">
          <button
            :disabled="required"
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
          <button
            v-if="question.questionorder !== 1"
            type="button"
            class="f_btn prev_btn bg-white border text-uppercase"
            @click="lastQuestion"
          >
            <span><i class="fas fa-arrow-left"></i></span> Previous Question
          </button>
        </div>
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
import AttendeeInfo from '../components/AttendeeInfo.vue'
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
    AttendeeInfo,
  },
  async asyncData({ store }) {
  },
  computed: {
    ...mapGetters({
      survey: 'getSurvey',
      question: 'getQuestion',
      isLastQuestion: 'getIsLastQuestion',
      answer: 'getAnswer',
      attendeeInfoStep: 'getAttendeeInfoStep',
    }),
    required() {
      if (
        (this.question.required && this.answer === 0) ||
        (this.question.required && this.answer === null)
      ) {
        return true
      }
      return false
    },
  },
async  mounted() {
    await this.$store.dispatch('fetchSurvey')
    if (this.survey.success === 50) {
      this.$store.dispatch('startSurvey')
    }
    this.showWelcomeCard()
  },
  methods: {
    startSurvey() {
      this.$store.dispatch('startSurvey')
        this.$store.commit('SET_ATTENDEE_INFO_STEP', false)
    },
    async nextQuestion() {
      this.$store.commit('SET_ANIMATE', false)
      if (this.isLastQuestion) {
        await this.$store.dispatch('completeSurvey')
        this.$store.commit('SET_ATTENDEE_INFO_STEP', false)
        return
      }
      this.$store.commit('SET_ANSWER', null)
      const i = this.question.questionorder + 1
      await this.$store.dispatch('fetchQuestion', i)
      this.$store.commit('SET_ANIMATE', true)
    },
    async lastQuestion() {
      this.$store.commit('SET_ANIMATE', false)
      if (this.question.questionorder === 1) {
        return
      }
      const i = this.question.questionorder - 1
      await this.$store.dispatch('fetchQuestion', i)
      this.$store.commit('SET_ANIMATE', true)
    },
    showClient(){
      this.$store.commit('SET_ATTENDEE_INFO_STEP', false)
    },
    showWelcomeCard() {
      this.$store.commit('SET_ATTENDEE_INFO_STEP', true)
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
