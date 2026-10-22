using System;
using System.Collections.Generic;
using System.Text;

namespace GameLab.Core.Entities
{
    public class Subject
    {
        public Guid Id { get; private set; }
        public string Title { get; private set; }

        public Subject(string title)
        {
            Id = Guid.NewGuid();
            Title = title;
        }
    }
}
