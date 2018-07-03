using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Agenda
{
    public class DataBaseRepository : IRepository
    {
        NotesContext db;
        public IList<Note> notes;
        public DataBaseRepository()
        {
            db = new NotesContext();
            notes = Load();
        }
        public void Create(Note note)
        {
            db.Add(note);
            db.SaveChanges();
        }

        public void Delete(Note note)
        {
            db.Notes.Remove(db.Notes.First(n => n.Id == note.Id));
            db.SaveChanges();
        }

        public void Edit(Note note)
        {
            var current = db.Notes.First(n => n.Id == note.Id);
            current.Title = note.Title;
            current.Text = note.Text;
            db.SaveChanges();
        }

        public IList<Note> Load()
        {
            return db.Notes.ToList();
        }

        public Note GetNote(int id)
        {
            return notes.First(n => n.Id == id);
        }
    }
}
