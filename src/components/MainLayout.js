function MainLayout({ children, pageTitle }) {
    return (
        <main>
            <h1>{pageTitle}</h1>
            <div>
                {children}
            </div>
        </main>
    )
}

export default MainLayout;
