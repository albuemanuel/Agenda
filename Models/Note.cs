﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Agenda
{
    public class Note
    {
        public Note()
        {
            Id = -1;
        }
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
    }
}
