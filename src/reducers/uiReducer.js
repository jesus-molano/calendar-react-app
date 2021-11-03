import { types } from "../types/types";

const initialState = {
  modalOpen: false,
}

const { uiOpenModal, uiCloseModal } = types;
export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case uiOpenModal:
      return {
        ...state,
        modalOpen: true
      }
    case uiCloseModal:
      return {
        ...state,
        modalOpen: false
      }
    default:
      return state
  }
}