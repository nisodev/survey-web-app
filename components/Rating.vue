<template>
  <div>
    <li>
      <label
        class="
          step_1
          position-relative
          bg-white
          shadow
          animate__animated animate__fadeInRight animate_200ms
          custom-step
        "
      >
        <div class="rate-box p-3">
          <div class="mx-auto">
            <div class="rating-numbers">
              <label
                v-for="number in question.additionalInfo.maxValue"
                :key="number"
                class="rating-label"
                :for="`radio${number}`"
                >{{ number }}</label
              >
            </div>
            <div class="rating-text-wrapper">
              <label
                v-for="(text, index) in question.additionalInfo.maxValue"
                :key="text"
                :for="`radio${index+1}`"
                class="rating-text"
                >{{ question.additionalInfo[`min${index + 1}Text`] }}</label
              >
            </div>
          </div>
          <hr />
          <div class="mx-auto inputs">
            <input
              v-for="(i, index) in question.additionalInfo.maxValue"
              :id="`radio${index + 1} my-radio`"
              :key="index"
              v-model="value"
              :value="i"
              class="rating-radio"
              type="radio"
              name="rate"
              @change="$store.commit('SET_ANSWER', i)"
            />
          </div>
        </div>
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
      value: 0,
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
    value(val) {
      const data = {
        answers: null,
        answer: this.value,
        comment: this.comment,
      }
      this.$store.dispatch('setAnswer', data)
    },
    // watch deep
    question: {
      handler(val) {
        this.comment = this.question.comment
        if (this.question.attendeeAnswer) {
          this.value = Number(val.attendeeAnswer)
          this.$store.commit('SET_ANSWER', this.value)
        } else {
          this.value = null
        }
      },
      deep: true,
    },
    comment(val) {
      if (this.comment !== '' && this.init) {
        const data = {
          answers: null,
          answer: this.value,
          comment: this.comment,
        }
        this.$store.dispatch('setAnswer', data)
      }
    },
  },
  mounted() {
    this.comment = this.question.comment || ''
    if (this.question.attendeeAnswer) {
      this.value = Number(this.question.attendeeAnswer)
      this.$store.commit('SET_ANSWER', this.value)
    }
    this.init = true
  },
  destroyed() {
    this.$store.commit('SET_ANSWER', null)
  },
}
</script>

<style>
.numbers {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.rating-numbers {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.rating-text-wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.inputs {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.rating-text {
  font-size: 1rem;
}

.rating-label {
  border: none !important;
  margin-top: 0 !important;
}
@media screen and (max-width: 575.98px) {
  .rate-text-left {
    bottom: 10px;
  }
  .rate-text-right {
    bottom: 10px;
  }
  .custom-step {
    height: 230px;
  }
}
.rating-radio{
  accent-color: #0C2D5B !important;
}
</style>
