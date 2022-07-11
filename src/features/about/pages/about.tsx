import { ContactForm } from '../components/contact.form/contact.form';
import about from './about.module.css';

function AboutPage() {
    return (
        <section className={about.host}>
            <h2>Página About</h2>
            <ContactForm></ContactForm>
        </section>
    );
}

export default AboutPage;
