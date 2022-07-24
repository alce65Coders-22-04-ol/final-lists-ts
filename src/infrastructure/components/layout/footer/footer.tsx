import footer from './footer.module.css';

export function Footer({ company }: { company?: string }) {
    return (
        <footer className={footer.host}>
            <address>{company}</address>
        </footer>
    );
}
