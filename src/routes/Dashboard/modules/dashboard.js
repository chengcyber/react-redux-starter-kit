// ------------------------------------
// Constants
// ------------------------------------
export const DASHBOARD_INCREMENT = 'DASHBOARD_INCREMENT'
export const DASHBOARD_ADD_ITEM = 'DASHBOARD_ADD_ITEM'
export const DASHBOARD_EDIT_ITEM = 'DASHBOARD_EDIT_ITEM'
export const DASHBOARD_REORDER_ITEM = 'DASHBOARD_REORDER_ITEM'

// ------------------------------------
// Actions
// ------------------------------------
export function dashboardVisitIncrement (value = 1) {
  return {
    type: DASHBOARD_INCREMENT,
    payload: value
  }
}

export function dashboardAddItem (text = 'untitled') {

  return {
    type: DASHBOARD_ADD_ITEM,
    payload: {text}
  }
}

export function dashboardEditItem (key = 0, text = '') {
  return {
    type: DASHBOARD_EDIT_ITEM,
    payload: {key, text}
  }
}

export function dashboardReorderItem (start, end) {
  return {
    type: DASHBOARD_REORDER_ITEM,
    payload: {start, end}
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(increment(getState().dashboard))
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  dashboardVisitIncrement,
  dashboardAddItem,
  dashboardEditItem,
  dashboardReorderItem,
  doubleAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
let currentKey = 3;
const ACTION_HANDLERS = {
  [DASHBOARD_INCREMENT]: (state, action) => {
    return {
      ...state,
      visitCount: state.visitCount + action.payload
    }
  },
  [DASHBOARD_ADD_ITEM]: (state, action) => {
    currentKey++;
    return {
      ...state,
      dashboardItems: [
        ...state.dashboardItems,
        {key: currentKey, label: action.payload.text}
      ]
    }
  },
  /** get item key -> find index in item array  */
  [DASHBOARD_EDIT_ITEM]: (state, action) => {

    let editItemIndex = 0
    console.log(action.payload)
    state.dashboardItems.forEach((item, index) => {

      if (item.key === parseInt(action.payload.key, 10)) {
        console.log(item.key, action.payload);
        editItemIndex = index
      }
    })

    return {
      ...state,
      dashboardItems: [
        ...state.dashboardItems.slice(0, editItemIndex),
        {key: action.payload.key, label: action.payload.text},
        ...state.dashboardItems.slice(editItemIndex + 1)
      ]
    }
  },
  /** startIndex endIndex in items array */
  [DASHBOARD_REORDER_ITEM]: (state, action) => {
    console.log('DASHBOARD_REORDER_ITEM');
    const startIndex = action.payload.start;
    const endIndex = action.payload.end;

    const newItemsArr = [...state.dashboardItems.slice(0, startIndex), ...state.dashboardItems.slice(startIndex + 1)]
    return {
      ...state,
      dashboardItems: [
          ...newItemsArr.slice(0, endIndex),
          state.dashboardItems[startIndex],
          ...newItemsArr.slice(endIndex)
      ]
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  visitCount: 0,
  dashboardItems: [
    {key: 0, label: 'Angular'},
    {key: 1, label: 'Jquery'},
    {key: 2, label: 'Polymer'},
    {key: 3, label: 'React'},
  ]
}
export default function dashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
