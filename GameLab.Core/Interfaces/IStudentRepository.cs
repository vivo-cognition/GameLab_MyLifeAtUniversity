using GameLab.Core.Entities;

namespace GameLab.Core.Interfaces;

public interface IStudentRepository
{
    Task<Student?> GetByIdAsync(Guid id);
    Task<IEnumerable<Student>> GetAllAsync();
    Task AddAsync(Student student);
    Task UpdateAsync(Student student);
    void Delete(Student student);
    Task SaveChangesAsync();
}
