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
        <div class="rate-box">
          <div class="mx-auto numbers">
            <span
              v-for="number in question.additionalInfo.maxValue"
              :key="number"
              @click="setValue(number)"
              >{{ number }}</span
            >
          </div>
          <hr />
          <div class="mx-auto inputs">
            <span class="rate-text-left">{{
              question.additionalInfo.minText
            }}</span>
            <input
              v-for="i in question.additionalInfo.maxValue"
              :key="i"
              v-model="value"
              :value="i"
              type="radio"
              name="rate"
              @change="setValue(i)"
            />
            <span class="rate-text-right">{{
              question.additionalInfo.maxText
            }}</span>
          </div>
        </div>
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
    }
  },
  computed: {
    ...mapGetters({
      question: 'getQuestion',
    }),
  },
  watch: {
    value(val) {
      this.$store.commit('SET_ANSWER', val)
    },
    // watch deep
    question: {
      handler(val) {
        if (this.question.attendeeAnswer) {
          this.value = Number(val.attendeeAnswer)
        } else {
          this.value = null
        }
      },
      deep: true,
    },
  },
  mounted() {
    if (this.question.attendeeAnswer) {
      this.value = Number(this.question.attendeeAnswer)
    }
  },
  methods: {
    setValue(num) {
      this.$store.dispatch('setAnswer', num)
    },
  },
}
</script>

<style>
.numbers {
  display: flex;
  justify-content: space-around;
  width: 250px;
}
.inputs {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 250px;
}

.rate-text-left {
  position: absolute;
  left: 10px;
}
.rate-text-right {
  position: absolute;
  right: 10px;
}
@media screen and (max-width: 575.98px) {
  .rate-text-left {
    bottom: 10px;
  }
  .rate-text-right {
    bottom: 10px;
  }
  .custom-step {
    height: 150px;
  }
}
</style>
