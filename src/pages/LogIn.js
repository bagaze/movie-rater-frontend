import LogInForm from "../components/LogInForm";
import MainLayout from "../components/MainLayout";

function LogIn() {
    const pageTitle = "Log in";
    return (
        <MainLayout pageTitle={pageTitle}>
            <LogInForm />
        </MainLayout>
    );
}

export default LogIn;
