import axios from 'axios';
import jwtDecode from 'jwt-decode'

export const calculateWaterAction = (waterNeeds, token) => {

  let idUser = jwtDecode(token).userData._id
  console.log("Ini id user =====", idUser)
  return (dispatch) => {
    // type: 'get_data_water',
    // payload: waterNeeds
  }

}