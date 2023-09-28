import MyNav from "../components/navbar/MyNav";
import MyFooter from "../components/footer/MyFooter"
import MyWelcome from "../components/welcome/MyWelcome";
import LatestRelease from "../components/latestRelease/LatestRelease";
import SearchContext from "../contexts/SearchText";



function Home() {

    return (

        <>
            <SearchContext>
                <MyNav />
                <MyWelcome />
                <LatestRelease />
                <MyFooter />
            </SearchContext>
        </>

    );

}

export default Home;