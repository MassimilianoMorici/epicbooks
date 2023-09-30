import MyNav from "../components/navbar/MyNav";
import MyFooter from "../components/footer/MyFooter"
import MyWelcome from "../components/welcome/MyWelcome";
import LatestRelease from "../components/latestRelease/LatestRelease";
import SearchContext from "../contexts/SearchText";
import { useTheme } from "../contexts/ThemeContext";



function Home() {

    const { theme } = useTheme();


    return (

        <>
            <div className={`${theme === 'light' ? '' : 'bg_costum'}`}
                style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
                <SearchContext>
                    <MyNav />
                    <MyWelcome />
                    <LatestRelease />
                    <MyFooter />
                </SearchContext>
            </div>
        </>

    );

}

export default Home;