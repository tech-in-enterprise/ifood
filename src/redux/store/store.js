import { configureStore } from '@reduxjs/toolkit'
import storeReducer from '../slice/store-slice'
import entitiesReducer from '../slice/entities-slice'

const store = configureStore({
  reducer: {
    stores: storeReducer,
    entities: entitiesReducer,
  },
})

export default store
