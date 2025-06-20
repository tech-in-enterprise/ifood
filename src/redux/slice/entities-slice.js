import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../services/supabase';

// Thunk para buscar itens do menu
export const getMenuItems = createAsyncThunk('entities/getMenuItems', async () => {
  const { data, error } = await supabase.from('entities').select('*')
  if (error) {
    console.error('Erro ao buscar entidades:', error.message)
    throw error
  }
  return data
})


const entitiesSlice = createSlice({
  name: 'entities',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMenuItems.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getMenuItems.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(getMenuItems.rejected, (state, action) => {
        state.error = action.error.message
        state.loading = false
      })
  },
})

export const selectMenuItems = (state) => state.entities.items
export default entitiesSlice.reducer
