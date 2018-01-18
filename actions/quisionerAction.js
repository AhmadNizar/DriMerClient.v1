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
  console.log('ini token=======', token)
  console.log('ini id user =======', idUser)
  return dispatch => {
    axios.get('http://drimer-191803.appspot.com/user/' + idUser, {headers: {
      token: token
    }}).then((result) => {
      dispatch(getResultSuggestion(result.data))
    })
    .catch((err) => {
      console.log(err)
      let dataUser = {"_id":"5a6019b6bb46d4001000ea8e","name":"faris","password":"$2a$10$rk6Q7mCeEhbDndCpZdexxeJMlFYbTIUcR.A31tfXQAk4sMJNVwLj2","email":"radenfaris@gmail.com","age":28,"gender":"Male","__v":0,"sugest":1.95}
      dispatch(getResultSuggestion(dataUser))
    })
  }
}

export const clearSuggestion = () => {
  return {
    type: 'clear_suggestion'
  }
}
