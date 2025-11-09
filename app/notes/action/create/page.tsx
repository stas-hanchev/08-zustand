import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata = {
  title: "Create note | NoteHub",
  description: "Create a new note and save your thoughts easily.",
  openGraph: {
    title: "Create note | NoteHub",
    description: "Create a new note and save your thoughts easily.",
    url: "https://notehub.app/notes/action/create",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
            <NoteForm />
      </div>
    </main>
  );
}