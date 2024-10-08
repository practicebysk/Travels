const initialState = {
  placeList: [],
};

export const placeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_PLACE_SUCCESS":
      return {
        ...state,
        placeList: [...state.placeList, action.payload],
      };
    default:
      return state;
  }
};
