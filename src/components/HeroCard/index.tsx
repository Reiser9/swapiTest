import React from "react";
import cn from 'classnames';

import styles from "./index.module.css";

import type { Hero } from "../../types/hero";
import { Link } from "react-router-dom";
import TextBlock from "./TextBlock";

type Colors = {
    [key: string]: string;
};

const colors: Colors = {
    "hazel": "#C8B575",
    "blue-gray": "#6699CC",
    "red, blue": "#800080",
    "green, yellow": "#b5e61d"
}

type Props = {
    data: Hero;
}

const HeroCard: React.FC<Props> = ({
    data
}) => {
    const { name, birth_year, gender, eye_color, hair_color, height, mass, skin_color, url } = data || {};

    const id = url.split("people/")[1]; // API не предоставляет id объекта, поэтому приходится выкручиваться

    return (
        <Link to={`/hero/${id}`} className={styles.cardItem}>
            <p className={styles.cardItemName}>{name}</p>

            <TextBlock title="Рост:" text={`${height} см`} />
            <TextBlock title="Вес:" text={`${mass} кг`} />
            <TextBlock title="Цвет волос:" text={hair_color === "n/a" || hair_color === "none" ? "---" : hair_color} />
            <TextBlock title="Цвет кожи:" text={hair_color === "n/a" ? "---" : skin_color} />

            <span className={styles.cardItemPoints}>
                <p className={styles.cardItemPoint}>Цвет глаз:</p>

                {eye_color === "unknown"
                ? <p className={styles.cardItemPoint}>???</p>
                : <p
                    className={styles.cardItemPointCircle}
                    style={{ background: `${colors[eye_color] ? colors[eye_color] : eye_color}` }}
                ></p>}
            </span>

            <span className={styles.cardItemPoints}>
                <p className={styles.cardItemPoint}>Пол:</p>

                {gender === "n/a" || gender === "none"
                ? <p className={styles.cardItemPoint}>---</p>
                : gender === "male" || gender === "female"
                    ? <span className={styles.cardItemWrapper}>
                        <p className={cn(styles.cardItemMale, {
                            [styles.active]: gender === "male"
                        })}>
                            М
                        </p>
                        <p className={cn(styles.cardItemMale, {
                            [styles.active]: gender === "female"
                        })}>Ж</p>
                    </span>
                    : <p className={styles.cardItemPoint}>{gender}</p>}
            </span>

            <TextBlock title="Год рождения:" text={birth_year === "unknown" ? "???" : birth_year} />
        </Link>
    );
};

export default HeroCard;
