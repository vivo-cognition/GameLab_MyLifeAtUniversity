using GameLab.Core.Entities;
using GameLab.Core.Interfaces;
using GameLab.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GameLab.Infrastructure.Repositories;

public class EfSubjectRepository : ISubjectRepository
{
    private readonly ApplicationDbContext _context;

    public EfSubjectRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Subject>> GetRandomSubjectsAsync(int count)
    {
        return await _context.Subjects
            .OrderBy(x => Guid.NewGuid())
            .Take(count)
            .ToListAsync();
    }
}
