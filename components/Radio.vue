<template>
  <div>
    <li v-for="item in question.questionAnswers" :key="item.value">
      <label
        :class="item === selected ? 'active' : ''"
        class="
          step_1
          position-relative
          bg-white
          shadow
          input_none
          animate__animated animate__fadeInRight animate_200ms
        "
        >{{ item.answer }}
        <input
          v-model="selected"
          type="radio"
          name="stp_1_select_option"
          :value="item"
        />
      </label>
    </li>
    <li v-if="question.allowComment">
      <label
        class="
          step_1
          position-relative
          bg-white
          shadow
          animate__animated animate__fadeInRight animate_200ms
        "
      >
        Additional Comment
        <input
          v-model="comment"
          class="comment-input"
          type="text"
          name="stp_1_select_option"
          maxlength="250"
        />
      </label>
    </li>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      selected: {
        value: '',
      },
      comment: '',
      init: false,
    }
  },
  computed: {
    ...mapGetters({ question: 'getQuestion', answer: 'getAnswer' }),
  },
  watch: {
    selected(val) {
      if (val !== undefined && this.init) {
        const data = {
          userguid: this.question.inviteguid,
          qid: this.question.id,
          answer: val?.answer,
          answers: null,
          answerValue: val?.value,
          comment: this.comment,
        }
        this.$store.dispatch('setAnswer', data)
      }
      this.$store.commit('SET_ANSWER', this.selected)
    },
    comment(val) {
      if (this.comment !== '' && this.init) {
        const data = {
          userguid: this.question.inviteguid,
          answers: null,
          qid: this.question.id,
          answer: this.selected?.answer,
          answerValue: this.selected?.value,
          comment: this.comment,
        }
        this.$store.dispatch('setAnswer', data)
      }
    },
    question: {
      handler(val) {
        this.comment = this.question.comment
      },
      deep: true,
    },
  },
  async created() {
    this.comment = this.question.comment || ''
    if (
      this.question?.acceptedAnswer !== '' ||
      this.question?.acceptedAnswer !== null
    ) {
      this.selected = await this.question.questionAnswers.filter(
        (item) => item.value === this.question.attendeeAnswerValue
      )[0]
      this.$store.commit('SET_ANSWER', this.selected)
      setTimeout(() => {
        this.init = true
      }, 500)
    }
  },
  destroyed() {
    this.$store.commit('SET_ANSWER', null)
  },
}
</script>

<style></style>
