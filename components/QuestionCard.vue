<template>
  <div v-if="question">
    <div
      class="
        content_box
        shadow
        text-center
        bg-white
        d-flex
        py-5
        position-relative
      "
    >
      <div class="question_title p-2">
        <h3>{{ question.question }}</h3>
      </div>
    </div>
    <div class="row mt-5 justify-content-center">
      <!-- <div class="left_side_img d-none d-md-block col-md-4">
        <img src="~/assets/v8/background/car.png" alt="image-not-found" />
      </div> -->
      <div class="col-md-8">
        <div class="form_items overflow-hidden">
          <ul class="list-unstyled text-center p-0">
            <Rating
              v-if="question.questionTypeKey === 'RANGE_SELECTION'"
            ></Rating>
            <Radio
              v-if="question.questionTypeKey === 'SINGLE_SELECTION'"
            ></Radio>
            <Checkbox
              v-if="question.questionTypeKey === 'MULTIPLE_SELECTION'"
            ></Checkbox>
            <YesNo
              v-if="question.questionTypeKey === 'YES_NO_QUESTION'"
            ></YesNo>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      question: 'getQuestion',
    }),
  },
}
</script>

<style>
</style>