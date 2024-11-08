export default function Footer() {
    return (
        <footer style={footerStyles}>
            <div style={footerStyleDiv}>
                <p>Termos de Uso</p>
                <p>Termos de Privacidade</p>
            </div>
            <p>© 2024 Emanuel de Jesus Nardes, 
                Eduardo Vinicius de Araujo, 
                Kauã Franchini Lima, 
                Lucas Jonatas Dionísio, 
                Marcos Alexandre Yoshiwara,           
                Rafael de Oliveira Claro Pedroso, Silvio Jose Batista, 
                Vitório Felício do Santos
                . Todos os direitos reservados.
            </p>
        </footer>
    );
}

const footerStyles = {
    backgroundColor: '#003f7f',
    color: 'white',
    textAlign: 'center',
    padding: '1rem',
    width: '100%',
    bottom: 0,
};

const footerStyleDiv = {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    margin: '1rem'
};