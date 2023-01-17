<template>
  <div v-if="question">
    <div
      class="
        content_box
        shadow
        bg-white
        py-3
        position-relative
      "
    >
    <div>
      <span style="margin-left: 5px"><i><small>{{question.questionTag || 'EXCELLENCE'}}</small></i></span>
    </div>
     <div class="d-flex justify-content-center">
       <div class="question_title p-2">
        <p style="font-size: 1.3rem" v-html="getQuestion"></p>
      </div>
     </div>
    </div>
    <div class="row mt-5 justify-content-center">
      <!-- <div class="left_side_img d-none d-md-block col-md-4">
        <img src="~/assets/v8/background/car.png" alt="image-not-found" />
      </div> -->
      <div class="col-md-8">
        <div class="form_items overflow-hidden">
          <ul v-if="animate" class="list-unstyled text-center p-0">
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
          <ul v-else class="list-unstyled text-center p-0 empty-animate"></ul>
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
      animate: 'getAnimate',
    }),
    getQuestion(){
      const question = this.question.question.replace(/"/g, '')
      return question 
    }
  },
}
</script>

<style scoped>
.empty-animate {
  height: 250px;
}
</style>