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
      selected: [],
      comment: '',
      init: false,
    }
  },
  computed: {
    ...mapGetters({
      question: 'getQuestion',
      answer: 'getAnswer',
    }),
  },
  watch: {
    selected() {
      if (this.init) {
        const data = {
          userguid: this.question.clientguid,
          qid: this.question.id,
          answers: [],
          comment: this.selected.length > 0 ? this.comment : '',
        }
        this.selected?.forEach((element) => {
          data.answers.push({
            answer: element.answer,
            answerValue: element.value,
          })
        })
        this.$store.dispatch('setAnswer', data)

        this.requiredChecker()
      }
    },
    comment(val) {
      if (this.comment !== '' && this.init) {
        const data = {
          userguid: this.question.clientguid,
          qid: this.question.id,
          answers: [],
          comment: this.comment,
        }
        if (this.selected.length !== 0) {
          this.selected?.forEach((element) => {
            data.answers.push({
              answer: element.answer,
              answerValue: element.value,
            })
          })
          // bu required alan için
          this.$store.dispatch('setAnswer', data)
        }
      }
    },
    question: {
      handler(val) {
        this.comment = this.question.comment
        this.setSelected()
      },
      deep: true,
    },
  },
  mounted() {
    this.setSelected()
  },
  methods: {
    isActive(item) {
      return this.selected.includes(item)
    },
    requiredChecker() {
      if (this.selected.length === 0) {
        this.$store.commit('SET_ANSWER', 0)
      } else {
        this.$store.commit('SET_ANSWER', 1)
      }
    },
    async setSelected() {
      if (
        this.question.attendeeAnswers !== null &&
        this.question.attendeeAnswers.length > 0
      ) {
        await this.question.attendeeAnswers.forEach((item) => {
          this.question.questionAnswers.forEach((element) => {
            if (item.answerValue === element.value) {
              this.selected.push(element)
            }
          })
        })
      }

      this.comment = this.question.comment || ''
      setTimeout(() => {
        this.init = true
        // bu required alan için
        this.requiredChecker()
      }, 500)
    },
  },
}
</script>

<style></style>
