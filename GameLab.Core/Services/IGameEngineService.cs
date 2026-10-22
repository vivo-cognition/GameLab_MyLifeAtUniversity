using GameLab.Core.Entities;
using GameLab.Core.Enums;

namespace GameLab.Core.Services;

public interface IGameEngineService
{
    Task<Student> InitializeNewGameAsync(string studentName, string specialization, int subjectsCount);
    Task<Student> AdvanceDayAsync(Guid studentId);
    Task<bool> DeleteSaveAsync(Guid studentId);
    Task<IEnumerable<Student>> GetAllSavesAsync();
    Task<Student?> UpdateStudentAsync(Guid studentId, string name, int intelligence, decimal balance);
    Task<Student> ProcessActionAsync(Guid studentId, ActionType actionType, Guid? subjectId);
    Task<Student?> GetStudentByIdAsync(Guid studentId);

}
