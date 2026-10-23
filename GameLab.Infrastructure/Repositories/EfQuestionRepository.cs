using GameLab.Core.Entities;
using GameLab.Core.Interfaces;
using GameLab.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace GameLab.Infrastructure.Repositories
{
    public class EfQuestionRepository : IQuestionRepository
    {
        private readonly ApplicationDbContext _context;

        public EfQuestionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<AttestationQuestion?> GetRandomQuestionBySubjectAsync(Guid subjectId)
        {
            return await _context.AttestationQuestions
                .Where(q => q.SubjectId == subjectId)
                .OrderBy(q => EF.Functions.Random())
                .FirstOrDefaultAsync();
        }

        public async Task<AttestationQuestion?> GetByIdAsync(Guid id)
        {
            return await _context.AttestationQuestions.FirstOrDefaultAsync(q => q.Id == id);
        }
    }
}
