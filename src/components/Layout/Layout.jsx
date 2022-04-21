import Search from "../Search/Search";
import styles from "./Layout.module.css";

const Layout = () => {

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>

            </div>
            <div className={styles.toolbar}>
                <Search />
            </div>
            <div className={styles.main}>

            </div>
        </div>
    )

};

export default Layout;