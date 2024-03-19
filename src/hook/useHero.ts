import React from "react";

import axiosInstance from "../api/axios";
import { useAppDispatch } from "./useRedux";
import { addHeroList, initHeroList } from "../store/slices/hero";
import { Hero, HeroListDTO } from "../types/hero";

const useHero = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [paginationHeroLoading, setPaginationHeroLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    const dispatch = useAppDispatch();

    const getHeroList = async () => {
        try{
            setIsError(false);
            setIsLoading(true);
            const data = await axiosInstance.get<HeroListDTO>("people");

            dispatch(initHeroList(data.data));
        }
        catch(e){
            console.log("Произошла ошибка при получении данных", e);
            setIsError(true);
        }
        finally{
            setIsLoading(false);
        }
    }

    const searchHero = async (search = "") => {
        try{
            setIsError(false);
            const data = await axiosInstance.get<HeroListDTO>(`people?search=${search}`);

            dispatch(initHeroList(data.data));
        }
        catch(e){
            console.log("Произошла ошибка при получении данных", e);
            setIsError(true);
        }
    }

    const paginationHero = async (page = 1) => {
        try{
            setIsError(false);
            setPaginationHeroLoading(true);
            const data = await axiosInstance.get<HeroListDTO>(`people/?page=${page}`);

            dispatch(addHeroList(data.data));
        }
        catch(e){
            console.log("Произошла ошибка при получении данных", e);
            setIsError(true);
        }
        finally{
            setPaginationHeroLoading(false);
        }
    }

    const getHeroById = async (id: number | string) => {
        try{
            setIsError(false);
            setIsLoading(true);
            const data = await axiosInstance.get<Hero>(`people/${id}`);

            return data.data;
        }
        catch(e){
            console.log("Произошла ошибка при получении данных", e);
            setIsError(true);
        }
        finally{
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        paginationHeroLoading,
        isError,
        getHeroList,
        searchHero,
        paginationHero,
        getHeroById
    }
};

export default useHero;
