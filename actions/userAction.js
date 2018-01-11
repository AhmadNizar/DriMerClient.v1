import axios from 'axios'

export const actionRegister = (dataUser) => {
  return (dispatch) => {
    axios.post('http://drimer-191803.appspot.com/user/register', {
      name: dataUser.name,
      email: dataUser.email,
      password: dataUser.password,
      age: dataUser.age,
      gender: dataUser.gender
    })
      .then((resultDataUser) => {
        dispatch(getDataRegister(true))
      })
      .catch((reason) => {
        console.log('kena di false')
        dispatch(getDataRegister(false))
      })
  }
}

const getDataRegister = (isSuccess) => {
  const payload = isSuccess
  return {
    type: 'get_data_register',
    payload
  }
}

export const signInAction = (dataUser) => {
  return (dispatch) => {
    axios.post('http://drimer-191803.appspot.com/user/login', {
      email: dataUser.email,
      password: dataUser.password
    })
      .then((resultDataUser) => {
        dispatch(getDataLogin(resultDataUser.data))
      })
      .catch((reason) => {
        console.log(reason)
      })
  }
}

const getDataLogin = (dataUser) => {
  return {
    type: 'get_token_user',
    payload: dataUser
  }
}