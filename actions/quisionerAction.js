import axios from 'axios';
import jwtDecode from 'jwt-decode'

export const calculateWaterAction = (waterNeeds, token) => {
  let idUser = jwtDecode(token).userData._id
  console.log("Ini id user =====", idUser, token, waterNeeds)
  return (dispatch) => {
    console.log("Masuk kah aku pada dispatch")
    axios.put(`http://drimer-191803.appspot.com/user/edit/${idUser}`,
      {
        sugest: waterNeeds
      },
      {
        headers: {
          token: token
        }
      })
      .then((dataUser) => {
        dispatch(getResultCalculateWater(dataUser.data.sugest))
      })
      .catch((reason) => {
        console.log("hasil data reason...", reason)
      })
  }
}

const getResultCalculateWater = (waterNeeds) => {

  return {
    type: 'get_data_water',
    payload: waterNeeds
  }
}

const getResultSuggestion = (data) => {
  return {
    type: 'get_suggestion',
    payload: data
  }
}

export const getSuggestion = (token) => {
  let idUser = jwtDecode(token).userData._id
  return dispatch => {
    axios.get('http://drimer-191803.appspot.com/user/' + idUser, {headers: {
      token: token
    }}).then((result) => {
      dispatch(getResultSuggestion(result.data))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}