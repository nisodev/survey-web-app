import axios from 'axios'

export const state = () => ({
  answer: null,
  question: null,
  survey: {},
  isLastQuestion: false,
  token: '',
  completed: false,
  animate: true,
  attendeeInfoStep: true
})

export const getters = {
  getAnswer: (state) => {
    return state.answer
  },
  getQuestion: (state) => {
    return state.question
  },
  getSurvey: (state) => {
    return state.survey
  },
  getToken: (state) => {
    return state.token
  },
  getIsLastQuestion: (state) => {
    return state.isLastQuestion
  },
  getCompleted: (state) => {
    return state.completed
  },
  getAttendeeInfoStep: (state) => {
    return state.attendeeInfoStep
  },
  getAnimate: (state) => {
    return state.animate
  }
}

export const mutations = {
  SET_ANIMATE(state, animate) {
    state.animate = animate
  },
  SET_ANSWER(state, answer) {
    state.answer = answer
  },
  SET_QUESTION(state, question) {
    state.question = question
  },
  SET_SURVEY(state, survey) {
    state.survey = survey
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_IS_LAST_QUESTION(state, isLastQuestion) {
    state.isLastQuestion = isLastQuestion
  },
  SET_COMPLETED(state, completed) {
    state.completed = completed
  },
  SET_ATTENDEE_INFO_STEP(state, attendeeInfoStep) {
    state.attendeeInfoStep = attendeeInfoStep
  } 
}

export const actions = {
  async fetchSurvey({ commit }) {
    const query = this.$router.currentRoute.query
    if (!query.c) {
      commit('SET_SURVEY', { isEmpty: true })
    } else {
      const { data } = await axios
        .get(
          `${process.env.API_URL}survey/getsurvey?c=${query?.c}&a=${query?.a}`
        )
      
        console.log(data);
      commit('SET_SURVEY', data)
    }

  },
  async startSurvey({ commit, dispatch }) {

    const query = this.$router.currentRoute.query
    const { data } = await axios
      .post(`${process.env.API_URL}survey/startsurvey`, {
        c: query?.c,
        a: query?.a
      })
    commit('SET_TOKEN', data.token) 
    dispatch('fetchQuestion', 1)
  },
  async fetchQuestion({ commit, state }, index) { 
    const { data } = await axios
      .get(
        `${process.env.API_URL}survey/getquestion/${index}`, {
        headers: {
          'x-access-token': state.token
        }
      }
      )
    data.question.additionalInfo = JSON.parse(data.question?.additionalInfo)
    data.question.questionAnswers = JSON.parse(data.question?.questionAnswers)
    if (data.question.questionTypeKey === 'MULTIPLE_SELECTION') {
      data.question.attendeeAnswers = JSON.parse(data.question?.attendeeAnswers)
    }
    // data.question.attendeeAnswer = JSON.parse(data.question?.attendeeAnswer)
    // data.question.question = JSON.stringify(data.question.question)

    commit('SET_QUESTION', data.question)
    commit('SET_IS_LAST_QUESTION', data.isLastQuestion)
  },
  async setAnswer({ commit, state }, value) {

    const headers = {
      'x-access-token': state.token
    };



    await axios
      .post(
        `${process.env.API_URL}survey/answerquestion/${state.question.id}`, value,
        {
          headers
        }
      )

  },
  async completeSurvey({ commit, state }, value) {

    const headers = {
      'x-access-token': state.token
    };
    const answer = {
      answer: value
    };


    const { data } = await axios
      .post(
        `${process.env.API_URL}survey/completesurvey`, answer,
        {
          headers
        }
      )
    if (data.attendee) {
      setTimeout(() => {
        location.href = window.location.origin + '/?c=' + data.attendee.clientguid + '&a=' + data.attendee.invitecode
      }, 300);
      return
    }
    commit('SET_QUESTION', null)
    this.$router.push('/thanks')
    commit('SET_SURVEY', data) 


  },
  setLocalAnswer({ commit }, value) {


    commit('SET_ANSWER', value)


  },
}
