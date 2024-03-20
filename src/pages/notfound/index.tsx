import React from "react";

import styles from './index.module.css';
import base from '../../styles/base.module.css';

import { NotContent } from "../../components/NotContent";
import { Cross } from "../../components/icons/Cross";

const NotFoundPage = () => {
    return <div className={styles.notfound}>
        <div className={base.container}>
            <div className={styles.notfoundInner}>
                <NotContent text="Страница не найдена" icon={<Cross />} danger />
            </div>
        </div>
    </div>;
};

export default NotFoundPage;
