import {
  CONTIFICO_CATEGORIA_ID,
  CONTIFICO_PRODUCT_URL,
  CONTIFICO_PRODUCT_URL_V2,
} from '../constants';
import { apiSlice } from './apiSlice';

export const contificoProductApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProductContifico: builder.mutation({
            query: (codigo) => ({
                url: `${CONTIFICO_PRODUCT_URL}/?codigo=${codigo}`,
            }),
        }),
    }),
});

export const {
    useGetProductContificoMutation,
} = contificoProductApiSlice;

