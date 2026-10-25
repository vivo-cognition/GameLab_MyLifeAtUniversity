using GameLab.Core.Entities;
using GameLab.Core.Interfaces;
using GameLab.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GameLab.Infrastructure.Repositories;

public class EfStudentRepository : IStudentRepository
{
    private readonly ApplicationDbContext _context;
    public EfStudentRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Student?> GetByIdAsync(Guid id)
    {
        return await _context.Students
            .Include(s => s.Subscriptions)
            .ThenInclude(sub => sub.Subject)
            .Include(s => s.ActiveSchedule)
            .FirstOrDefaultAsync(s => s.Id == id);
    }
    public async Task<IEnumerable<Student>> GetAllAsync()
    {
        return await _context.Students
            .Include(s => s.Subscriptions)
            .ThenInclude(sub => sub.Subject)
            .Include(s => s.ActiveSchedule)
            .ToListAsync();
    }

    public async Task AddAsync(Student student)
    {
        await _context.Students.AddAsync(student);
    }

    public async Task UpdateAsync(Student student)
    {
        await Task.CompletedTask;
    }

    public void Delete(Student student)
    {
        _context.Students.Remove(student);
    }

    public async Task SaveChangesAsync()
    {
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException ex)
        {
            foreach (var entry in ex.Entries)
            {
                if (entry.Entity is ScheduleDay)
                {
                    var databaseValues = await entry.GetDatabaseValuesAsync();

                    if (databaseValues == null)
                    {
                        entry.State = EntityState.Added;
                    }
                    else
                    {
                        entry.OriginalValues.SetValues(databaseValues);
                    }
                }
            }

            await _context.SaveChangesAsync();
        }
    }
}
