import React from "react";

import styles from './index.module.css';

type Props = {
    title: string;
    text: string;
}

const TextBlock: React.FC<Props> = ({
    title,
    text
}) => {
    return (
        <span className={styles.cardItemPoints}>
            <p className={styles.cardItemPoint}>{title}</p>

            <p className={styles.cardItemPoint}>{text}</p>
        </span>
    );
};

export default TextBlock;
