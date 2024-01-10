import styles from './page.module.css'
import {VideoPreview} from "../components/homeScreen/videoPreview";
import {HomeImageSlider} from "../components/homeScreen/HomeImageSlider";
import OwnDesignOrder from "@/components/homeScreen/ownDesignOrder";
import {NewCollection} from "@/components/homeScreen/newСollection";
import {BestProducts} from "@/components/homeScreen/BestProducts";

export default function Home() {
    return (
        <main className={styles.main}>
            <VideoPreview/>
            <div className={styles.homeDescriptionBlock}>
                <p>Добро пожаловать в уникальный мир рок-панк стиля,
                    где энергия музыки сливается с художественным дизайном,
                    создавая уникальные модные образы. Наш интернет-магазин —
                    это путешествие в смелый и дерзкий мир выражения через одежду.
                    Мы вдохновляемся духом свободы, рок-музыкой и панк-культурой,
                    предлагая вам не просто стильные наряды, а искусство,
                    отражающее вашу уникальность. Станьте частью нашей коллекции,
                    где каждая покупка становится вашим неповторимым посланием
                    миру и частью вашей истории.</p>
            </div>
            <NewCollection/>
            <BestProducts/>
            <div className={styles.homeOrderSliderBlock}>
                <HomeImageSlider/>
                <OwnDesignOrder/>
            </div>
        </main>
    );
}
