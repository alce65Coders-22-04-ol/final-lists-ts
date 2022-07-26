import { ListContext } from '../components/list.context/list.context';
import { List } from '../components/list/list';
import notes from './notes.page.module.css';

function NotesPage({ title }: { title: string }) {
    return (
        <section className={notes.host}>
            <h2>{title}</h2>
            <List></List>
            <ListContext></ListContext>
        </section>
    );
}

export default NotesPage;
