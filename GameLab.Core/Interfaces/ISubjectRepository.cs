using GameLab.Core.Entities;

namespace GameLab.Core.Interfaces;

public interface ISubjectRepository
{
    Task<List<Subject>> GetRandomSubjectsAsync(int count);
}
