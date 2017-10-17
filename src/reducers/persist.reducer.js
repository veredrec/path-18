const persistReducer = (state = [], action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      console.log('Reducer payload: ', action.payload.careers);
      return action.payload.careers;
    case 'FETCH_CAREERS':
      return action.payload;
    default:
      return state;
  }
};

export default persistReducer;
