import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import type { FormEvent } from "react";
import { useState } from "react";

import { api } from "../utils/api";

const NotesPage: NextPage = () => {
  const [newNote, setNewNote] = useState("");
  const { data: sessionData, status: sessionStatus } = useSession();

  const { data: notes, isLoading } = api.notes.getAll.useQuery();
  const utils = api.useContext();
  const postNote = api.notes.post.useMutation({
    onMutate: async (newNote) => {
      await utils.notes.getAll.cancel();
      utils.notes.getAll.setData(undefined, (prevNotes) => {
        const newNoteObj = {
          noteContents: newNote.newNote,
          author: sessionData?.user,
          completed: false,
        };
        if (prevNotes) {
          return [...prevNotes, newNoteObj];
        } else {
          return [newNoteObj];
        }
      });
    },
    onSettled: async () => {
      await utils.notes.getAll.invalidate();
    },
  });
  const removeNote = api.notes.remove.useMutation({
    onMutate: async (oldNote) => {
      await utils.notes.getAll.cancel();
      utils.notes.getAll.setData(undefined, (prevNotes) => {
        if (prevNotes) {
          return prevNotes.filter((note) => note.id != oldNote.noteId);
        } else {
          return [];
        }
      });
    },
    onSettled: async () => {
      await utils.notes.getAll.invalidate();
    },
  });
  const toggleCompleteNote = api.notes.toggleComplete.useMutation({
    onMutate: async (oldNote) => {
      await utils.notes.getAll.cancel();
      utils.notes.getAll.setData(undefined, (prevNotes) => {
        const newNotes = prevNotes?.forEach((note) => {
          if (note.id == oldNote.noteId) {
            note.completed = !oldNote.isComplete;
          }
        });
        return newNotes;
      });
    },
    onSettled: async () => {
      await utils.notes.getAll.invalidate();
    },
  });

  const submitNewNote = (e: FormEvent) => {
    e.preventDefault();
    postNote.mutate({
      newNote,
    });
    setNewNote("");
  };

  return (
    <main className="flex min-h-screen select-none flex-col items-center bg-slate-800 text-white">
      <div className="flex min-h-screen w-full max-w-4xl flex-col pt-24 pb-10">
        <h1 className="text-3xl font-semibold">Personal Notes</h1>
        {sessionStatus === "authenticated" ? (
          <div className="relative flex flex-grow flex-col justify-end">
            <div className="relative flex-grow pt-10 pb-10">
              {!isLoading ? (
                notes?.map((note) => (
                  <>
                    <p
                      className="absolute -left-9 -mt-1 inline-block origin-center rotate-45 p-2 text-2xl font-bold text-red-800 transition hover:scale-125 hover:cursor-pointer hover:text-red-600"
                      onClick={() => {
                        removeNote.mutate({
                          noteId: note.id,
                        });
                      }}
                    >
                      +
                    </p>
                    <p
                      className="mb-3 inline-block rounded-full bg-slate-600 p-2 pl-3 pr-3 hover:cursor-pointer"
                      key={note.id}
                      onClick={() =>
                        toggleCompleteNote.mutate({
                          noteId: note.id,
                          isComplete: note.completed,
                        })
                      }
                    >
                      <span className={note.completed ? "line-through" : ""}>
                        {note.noteContents}
                      </span>
                    </p>
                    <p className="ml-3 inline-block text-xs text-slate-400">
                      {note.author?.email}
                    </p>
                    <br></br>
                  </>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <form onSubmit={submitNewNote}>
              <input
                type="text"
                placeholder="New note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full rounded-md p-3 font-semibold text-black"
              />
            </form>
          </div>
        ) : sessionStatus === "loading" ? (
          <p>Loading...</p>
        ) : (
          <p>Unauthorized...</p>
        )}
      </div>
    </main>
  );
};

export default NotesPage;
