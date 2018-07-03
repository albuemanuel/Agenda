using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Agenda
{
    public class FileRepository : IRepository
    {
        private const string fileName = "notes.txt";
        public IList<Note> notes;

        public FileRepository()
        {
            notes = Load();
        }

        public void Create(Note note)
        {
            note.Id = notes.Any() ? notes.Max(n => n.Id) + 1 : 1;
            notes.Add(note);
            Save();
        }

        public void Delete(Note note)
        {
            notes = notes.Where(n => n.Id != note.Id).ToList();
            Save();
        }

        public void Edit(Note note)
        {
            var current = notes.First(n => n.Id == note.Id);
            current.Title = note.Title;
            current.Text = note.Text;
            Save();
        }

        public IList<Note> Load()
        {
            if(!System.IO.File.Exists(fileName))
            {
                return new List<Note>();
            }
            return System.IO.File.ReadAllLines(fileName).Select(l => {
                var items = l.Split(new[] { '|' });
                return new Note { Id = int.Parse(items[0]), Title = items[1], Text = items[2] };
            }).ToList();
        }

        public void Save()
        {
            System.IO.File.WriteAllLines(fileName, notes.Select(n => $"{n.Id}|{n.Title}|{n.Text}"));
        }

        public Note GetNote(int id)
        {
            return notes.First(n => n.Id == id);
        }
    }
}
