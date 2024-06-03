import Layout from "@/components/Layout";
import CreateTsismis from "./CreateTsismis";
import TsismisList from "./TsismisList";
import Floating from "@/components/TsismisInput/Floating";
function Home() {
    return (
        <Layout page='Feed'>
            <CreateTsismis/>
            <TsismisList/>
            <Floating/>
        </Layout>
    );
}

export default Home;