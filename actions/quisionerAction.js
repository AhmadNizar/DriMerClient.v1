
export const calculateWaterAction = (waterNeeds) => {
  console.log(waterNeeds)
  return {
    type: 'get_data_water',
    payload: waterNeeds
  }

}