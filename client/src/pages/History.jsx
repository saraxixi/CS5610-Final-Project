import React from "react";
import "../styles/History.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const History = () => {
  return (
    <>
      <Navbar />

      <div className="history_banner">
        <h3>Historical Introduction</h3>
        <p>History of Dunhuang</p>
      </div>

      <div className="history_main_box">
        <h3>
          Historical Introduction
        </h3>
        <div className="history_main_txt">
          <p>
            Dunhuang has over 2,000 years of history. Before the Qin and Han dynasties, it was inhabited by nomadic
            tribes such as the Yuezhi and Wusun. In the early Western Han period, the Xiongnu occupied the area until
            121 BCE when the Han army defeated them. By 111 BCE, Dunhuang became one of the four commanderies in the
            Hexi Corridor. From this time, it served as a key portal for military and cultural exchange between Central
            China and the Western Regions.
          </p>
          <p>
            During the Sixteen Kingdoms period, although war ravaged the Central Plains, Dunhuang remained relatively
            peaceful. It became a cultural refuge where Confucian classics were preserved and Buddhist monks translated
            scriptures. The Mogao Grottoes were first established in 366 CE by a monk named Le Zun, inspired by a vision
            of a thousand Buddhas.
          </p>
          <p>
            In the Sui and early Tang periods, Buddhism flourished and military governance strengthened the region.
            Dunhuang developed into a vital hub for trade, religion, and cultural convergence along the Silk Road.
          </p>
          <p>
            Following the An Lushan Rebellion in 755 CE, Dunhuang fell to the Tibetan Empire in 781. Although under
            Tibetan rule, Buddhism continued to grow and the Mogao Grottoes expanded.
          </p>
          <p>
            In 848 CE, Zhang Yichao reclaimed Dunhuang and founded the Guiyi Army regime, which lasted over 200 years.
            The regime promoted Sinicization and maintained peaceful relations with neighboring ethnic groups and the
            Song Dynasty. These policies helped preserve Buddhist heritage and cultural exchange.
          </p>
          <p>
            In 1036 and 1227, Dunhuang was successively occupied by the Tangut (Western Xia) and Mongols. Although still
            revered as a Buddhist site, its importance as a Silk Road hub gradually declined with the rise of maritime
            trade routes.
          </p>
          <p>
            By the Ming Dynasty, Dunhuang was isolated and the Mogao Grottoes largely abandoned. However, restoration
            efforts in the Qing era resumed under imperial policies. The accidental discovery of the Library Cave in
            1900 brought global attention, but foreign explorers took away large numbers of invaluable manuscripts and
            relics.
          </p>
          <p>
            Despite this loss, the artistic and cultural richness of the Mogao Grottoes continues to amaze. Their art
            embodies a synthesis of Indian, Central Asian, Middle Eastern, and Chinese influences, symbolizing a grand
            convergence of civilizations.
          </p>
          <p>
            After the founding of the People's Republic of China, real protection and research efforts began. Recognized
            as a national heritage site, Dunhuang has become a symbol of Chinese civilization. Since the 1980s, the
            Dunhuang Studies field has expanded globally, and the 100th anniversary of the Library Cave's discovery in
            2000 marked a new era in international scholarship.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default History;
