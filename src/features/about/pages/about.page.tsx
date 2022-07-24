import { ContactForm } from '../components/contact.form/contact.form';
import about from './about.page.module.css';

function AboutPage({ title }: { title: string }) {
    return (
        <section className={about.host}>
            <h2>{title}</h2>
            <ContactForm></ContactForm>
        </section>
    );
}

export default AboutPage;
