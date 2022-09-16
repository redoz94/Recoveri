import React, { createContext, useReducer, useEffect, useContext } from 'react';
import AppReducer from './AppReducers';



// Initial state
const initialState = {
 

 
    user:{name:"Hammad",role:"rider"}
  
  }
  
  // Create context.
  export const GlobalContext = createContext(initialState);
  
  // Provider component
  export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

      useEffect(()=> {
         
      },[])
  
  
      return (<GlobalContext.Provider value={[state,dispatch]}>
          {children}
      </GlobalContext.Provider>);
  }
  
  export const useStore = () => useContext(GlobalContext);