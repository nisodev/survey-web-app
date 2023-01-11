<template>
  <div>
    <li v-for="item in question.questionAnswers" :key="item.id">
      <label
        :class="item === answer ? 'active' : ''"
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      selected: null,
      dummyData: ['IBM', 'MAC', 'WIN', 'LINUX'],
    }
  },
  computed: {
    ...mapGetters({ question: 'getQuestion', answer: 'getAnswer' }),
  },
  watch: {
    selected(val) {
      const data = {
        userguid: this.question.inviteguid,
        qid: this.question.id,
        answer: val?.answer,
        answerValue: val?.value,
      }
      this.$store.dispatch('setAnswer', data)
    },
  },
}
</script>

<style></style>
