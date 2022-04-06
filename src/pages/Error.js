import MainLayout from "../components/MainLayout"

export function Error404() {
    const pageTitle = "Not found"
    return (
        <MainLayout pageTitle={pageTitle}>
            <p>The page you are trying to reach does not exist</p>
        </MainLayout>
    );
};