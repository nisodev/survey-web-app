<template>
  <div>
    <li v-for="item in question.questionAnswers" :key="item.id">
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
    <li v-if="question.allowComment" class="mt-4">
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
          maxlength="250"
          name="stp_1_select_option"
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
      selected: null,
      comment: '',
    }
  },
  computed: {
    ...mapGetters({ question: 'getQuestion', answer: 'getAnswer' }),
  },
  watch: {
    question: {
      handler(val) {
        this.comment = this.question.comment
      },
      deep: true,
    },
    selected(val) {
      const data = {
        userguid: this.question.inviteguid,
        qid: this.question.id,
        answer: val?.answer,
        comment: this.comment,
        answerValue: val?.value,
      }
      this.$store.dispatch('setAnswer', data)
      this.$store.commit('SET_ANSWER', 1)
    },
    comment(val) {
      const data = {
        userguid: this.question.inviteguid,
        qid: this.question.id,
        comment: this.comment,
        answer: this.selected?.answer,
        answerValue: this.selected?.value,
      }
      this.$store.dispatch('setAnswer', data)
    },
  },
  mounted() {
    if (this.question.attendeeAnswer) {
      this.selected = this.question.questionAnswers.filter((item) => {
        return item.answer === this.question.attendeeAnswer
      })[0]
    }
    this.comment = this.question.comment || ''
  },
}
</script>

<style></style>
