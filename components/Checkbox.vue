<template>
  <div>
    <li v-for="item in question.questionAnswers" :key="item.title">
      <label
        :class="isActive(item) ? 'active' : ''"
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
          type="checkbox"
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
      dummyData: ['ABC', 'DEF', 'GHR', 'KTY'],
      selected: [],
    }
  },
  computed: {
    ...mapGetters({
      question: 'getQuestion',
      answer: 'getAnswer',
    }),
  },
  destroyed() {
    const data = {
      userguid: this.question.clientguid,
      qid: this.question.id,
      answers: [],
    }
    if (this.selected.length !== 0) {
      this.selected?.forEach((element) => {
        data.answers.push({
          answer: element.answer,
          answerValue: element.value,
        })
      })
      this.$store.dispatch('setAnswer', data)
    }
  },
  methods: {
    isActive(item) {
      return this.selected.includes(item)
    },
  },
}
</script>

<style></style>
