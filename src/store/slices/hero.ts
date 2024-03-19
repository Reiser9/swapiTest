import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import { Hero, HeroListDTO } from "../../types/hero";

type HeroStateType = {
    heroList: HeroListDTO | null;
};

const initialState: HeroStateType = {
    heroList: null,
};

export const heroSlice = createSlice({
    name: "hero",
    initialState,
    reducers: {
        initHeroList: (state, action: PayloadAction<HeroListDTO>) => {
            state.heroList = action.payload;
        },
        addHeroList: (state, action: PayloadAction<HeroListDTO>) => {
            const currentResults = state.heroList?.results;

            const { count, next, previous, results } = action.payload || {};

            state.heroList = {
                count,
                next,
                previous,
                results: currentResults ? [...currentResults, ...results] : [...results]
            }
        },
    },
});

export const { initHeroList, addHeroList } = heroSlice.actions;

export default heroSlice.reducer;
