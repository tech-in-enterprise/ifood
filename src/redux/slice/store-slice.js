// redux/slice/store-slice.js (exemplo simplificado)
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { supabase } from '../../services/supabase'

export const getStoresByEntityId = createAsyncThunk(
  'stores/getStoresByEntityId',
  async (entityId, thunkAPI) => {
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .eq('entity_id', entityId)

    if (error) {
      return thunkAPI.rejectWithValue(error.message)
    }

    return data
  }
)

const storesSlice = createSlice({
  name: 'stores',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStoresByEntityId.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getStoresByEntityId.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(getStoresByEntityId.rejected, (state, action) => {
        state.error = action.payload
        state.loading = false
      })
  },
})

export const selectStores = (state) => state.stores.items
export default storesSlice.reducer
