const Header = () => {
    const headerStyle = {
        padding: "50px 20px",
        backgroundColor: "#2c3e50", // Dunkler Hintergrund für den Header
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
    };

    const titleStyle = {
        fontSize: "6rem",
        fontWeight: "700",
        marginBottom: "20px",
        lineHeight: "1em",
        color: "#ecf0f1", // Helle Farbe für den Text
        textTransform: "uppercase",
        letterSpacing: "4px", // Etwas mehr Abstand zwischen den Buchstaben für einen modernen Look
        textAlign: "center",
        animation: "fadeIn 1.5s ease-out", // Ein sanfter Fade-In-Effekt
    };

    return (
        <header style={headerStyle}>
            <h1 style={titleStyle} data-test="todo-header">
                Todos
            </h1>
        </header>
    );
};

export default Header;
