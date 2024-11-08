import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main style={mainStyles}>{children}</main>
            <Footer />
        </>
    );
}

const mainStyles = {
    padding: '1rem'
};