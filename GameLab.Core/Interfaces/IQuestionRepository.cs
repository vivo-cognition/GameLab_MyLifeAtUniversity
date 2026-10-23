using GameLab.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace GameLab.Core.Interfaces
{
    public interface IQuestionRepository
    {
        Task<AttestationQuestion?> GetRandomQuestionBySubjectAsync(Guid subjectId);
        Task<AttestationQuestion?> GetByIdAsync(Guid id);
    }
}
