export default (state, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return {
              ...state,
              name: action.payload
             
            }
        
        default:

            return state
    }
}