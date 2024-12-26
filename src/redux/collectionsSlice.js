import { createSlice } from '@reduxjs/toolkit';

const collectionsSlice = createSlice({
  name: 'collections',
  initialState: [
    { id: 1, title: 'Laptop Collection', image: 'path/to/laptop.jpg' },
    { id: 2, title: 'Accessories Collection', image: 'path/to/accessories.jpg' },
    { id: 3, title: 'Cameras Collection', image: 'path/to/camera.jpg' },
  ],
  reducers: {},
});

export const selectCollections = (state) => state.collections;
export default collectionsSlice.reducer;