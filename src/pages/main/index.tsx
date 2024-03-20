import React from "react";
import { Input } from "antd";

import styles from "./index.module.css";
import base from "../../styles/base.module.css";

import HeroCard from "../../components/HeroCard";
import useHero from "../../hook/useHero";
import { useAppSelector } from "../../hook/useRedux";
import { Preloader } from "../../components/Preloader";
import { NotContent } from "../../components/NotContent";
import { Cross } from "../../components/icons/Cross";

const MainPage = () => {
    const [searchValue, setSearchValue] = React.useState("");
    const [page, setPage] = React.useState(1);

    const {
        isLoading,
        paginationHeroLoading,
        isError,
        getHeroList,
        searchHero,
        paginationHero,
    } = useHero();

    const heroList = useAppSelector((state) => state.hero.heroList);

    React.useEffect(() => {
        getHeroList();
    }, []);

    React.useEffect(() => {
        let typingTimer: NodeJS.Timeout;

        const handleInputTimeout = () => {
            searchHero(searchValue);
        };

        typingTimer = setTimeout(handleInputTimeout, 500);

        return () => clearTimeout(typingTimer);
    }, [searchValue]);

    React.useEffect(() => {
        if (page > 1) {
            paginationHero(page);
        }
    }, [page]);

    return (
        <div className={styles.main}>
            <div className={base.container}>
                <div className={styles.mainInner}>
                    <h1 className={styles.mainTitle}>Star Wars Heroes</h1>

                    {!isLoading && !isError && (
                        <div className={styles.mainSearchInner}>
                            <Input
                                placeholder="Поиск по персонажам"
                                size="large"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </div>
                    )}

                    <div className={styles.mainContent}>
                        {isLoading || (!heroList?.count && heroList?.count !== 0) ? (
                            <Preloader page small />
                        ) : isError ? (
                            <NotContent
                                text="Ошибка при загрузке данных"
                                icon={<Cross />}
                                danger
                            />
                        ) : heroList?.results.length === 0 ? (
                            <NotContent text="Героев нет" />
                        ) : (
                            (heroList?.results || []).map((data, key) => (
                                <HeroCard key={key} data={data} />
                            ))
                        )}
                    </div>

                    {!isLoading && !isError && heroList?.next && (
                        <button
                            className={styles.mainLoadMore}
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            {paginationHeroLoading
                            ? <Preloader small />
                            : `Показано ${heroList?.results.length} из ${heroList?.count}`}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
