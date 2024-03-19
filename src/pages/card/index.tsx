import React from "react";
import { useParams } from "react-router-dom";

import styles from './index.module.css';
import base from '../../styles/base.module.css';

import useHero from "../../hook/useHero";
import { Hero } from "../../types/hero";
import { Preloader } from "../../components/Preloader";
import { NotContent } from "../../components/NotContent";
import { Cross } from "../../components/icons/Cross";
import { Input, Select } from "antd";

const genderOptions = [
    {
        label: "male",
        value: "male"
    },
    {
        label: "female",
        value: "female"
    },
    {
        label: "unknown",
        value: "unknown"
    }
]

const CardPage = () => {
    const [hero, setHero] = React.useState<Hero | undefined>(undefined);
    const [isEditing, setIsEditing] = React.useState(false);

    const [skin, setSkin] = React.useState("");
    const [heroHeight, setHeroHeight] = React.useState("");
    const [heroGender, setHeroGender] = React.useState("");
    const [eye, setEye] = React.useState("");
    const [birth, setBirth] = React.useState("");
    const [weight, setWeight] = React.useState("");
    const [hair, setHair] = React.useState("");

    const { name, films } = hero || {};

    const { id } = useParams();
    const { isLoading, isError, getHeroById } = useHero();

    React.useEffect(() => {
        if(id){
            getHeroById(id).then(data => setHero(data));
        }
    }, [id]);

    React.useEffect(() => {
        if(hero){
            setSkin(hero.skin_color);
            setHeroHeight(hero.height);
            setHeroGender(hero.gender);
            setEye(hero.eye_color);
            setBirth(hero.birth_year);
            setWeight(hero.mass);
            setHair(hero.hair_color);
        }
    }, [hero]);

    if(isLoading){
        return <Preloader />
    }
    
    return <div className={styles.card}>
        <div className={base.container}>
            <div className={styles.cardInner}>
                {isError
                ? <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
                : <div className={styles.cardInfo}>
                    <h1 className={styles.cardInfoTitle}>{name}</h1>

                    <div className={styles.cardInfoPoints}>
                        <p className={styles.cardInfoSuptitle}>Рост:</p>

                        {isEditing
                        ? <Input value={heroHeight} onChange={e => setHeroHeight(e.target.value)} allowClear />
                        : <p className={styles.cardInfoText}>{heroHeight}</p>}
                    </div>

                    <div className={styles.cardInfoPoints}>
                        <p className={styles.cardInfoSuptitle}>Цвет кожи:</p>

                        {isEditing
                        ? <Input value={skin} onChange={e => setSkin(e.target.value)} allowClear />
                        : <p className={styles.cardInfoText}>{skin}</p>}
                    </div>

                    <div className={styles.cardInfoPoints}>
                        <p className={styles.cardInfoSuptitle}>Год рождения:</p>

                        {isEditing
                        ? <Input value={birth} onChange={e => setBirth(e.target.value)} allowClear />
                        : <p className={styles.cardInfoText}>{birth}</p>}
                    </div>

                    <div className={styles.cardInfoPoints}>
                        <p className={styles.cardInfoSuptitle}>Вес:</p>

                        {isEditing
                        ? <Input value={weight} onChange={e => setWeight(e.target.value)} allowClear />
                        : <p className={styles.cardInfoText}>{weight}</p>}
                    </div>

                    <div className={styles.cardInfoPoints}>
                        <p className={styles.cardInfoSuptitle}>Пол:</p>

                        {isEditing
                        ? <Select value={heroGender} onChange={setHeroGender} style={{width: "100%"}} options={genderOptions} />
                        : <p className={styles.cardInfoText}>{heroGender}</p>}
                    </div>

                    <div className={styles.cardInfoPoints}>
                        <p className={styles.cardInfoSuptitle}>Цвет глаз:</p>

                        {isEditing
                        ? <Input value={eye} onChange={e => setEye(e.target.value)} allowClear />
                        : <p className={styles.cardInfoText}>{eye}</p>}
                    </div>

                    <div className={styles.cardInfoPoints}>
                        <p className={styles.cardInfoSuptitle}>Цвет волос:</p>

                        {isEditing
                        ? <Input value={hair} onChange={e => setHair(e.target.value)} allowClear />
                        : <p className={styles.cardInfoText}>{hair}</p>}
                    </div>

                    <div className={styles.cardInfoPoints}>
                        <p className={styles.cardInfoSuptitle}>Количество фильмов с героем:</p>

                        <p className={styles.cardInfoText}>{films?.length}</p>
                    </div>

                    <button className={styles.cardInfoEdit} onClick={() => setIsEditing(prev => !prev)}>
                        {isEditing ? "Сохранить" : "Редактировать"}
                    </button>
                </div>}
            </div>
        </div>
    </div>;
};

export default CardPage;
