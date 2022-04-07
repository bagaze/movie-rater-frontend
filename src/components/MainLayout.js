import "../styles/MainLayout.css";

function MainLayout({ children, pageTitle }) {
    return (
        <main>
            <h1>{pageTitle}</h1>
            <div className="main-content">
                {children}
            </div>
        </main>
    );
}

export default MainLayout;
