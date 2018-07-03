using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Agenda
{
    public interface IRepository
    {
        void Create(Note note);
        void Edit(Note note);
        void Delete(Note note);
        IList<Note> Load();
        Note GetNote(int id);
    

    }
}
