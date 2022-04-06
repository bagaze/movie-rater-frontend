import MainLayout from "../components/MainLayout";

function Home() {
    const pageTitle = "Home";
    return (
        <MainLayout pageTitle={pageTitle}>
            <p>Welcome on Movie Rater!</p>
        </MainLayout>
    );
}

export default Home;
