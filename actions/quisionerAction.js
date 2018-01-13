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
        dispatch(getResultCalculateWater(dataUser))
      })
      .catch((reason) => {
        console.log("hasil data reason...", reason)
      })
  }
}

const getResultCalculateWater = (dataUser) => {
  console.log(dataUser, "=======")
  return {

  }
}