using System;
using System.Collections.Generic;

namespace GameLab.Core.Entities;

public class AttestationQuestion
{
    public Guid Id { get; private set; }
    public Guid SubjectId { get; private set; }
    public Subject Subject { get; private set; }
    public string Text { get; private set; }
    public List<string> Options { get; private set; } = new();
    public int CorrectOptionIndex { get; private set; }

    public AttestationQuestion(Guid subjectId, string text, List<string> options, int correctOptionIndex)
    {
        Id = Guid.NewGuid();
        SubjectId = subjectId;
        Text = text;
        Options = options ?? new List<string>();
        CorrectOptionIndex = correctOptionIndex;
    }
}
