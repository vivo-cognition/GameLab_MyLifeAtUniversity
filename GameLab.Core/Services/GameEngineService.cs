using GameLab.Core.Entities;
using GameLab.Core.Enums;
using GameLab.Core.Interfaces;

namespace GameLab.Core.Services;

public class GameEngineService : IGameEngineService
{
    private readonly IStudentRepository _studentRepository;
    private readonly ISubjectRepository _subjectRepository;

    public GameEngineService(IStudentRepository studentRepository, ISubjectRepository subjectRepository)
    {
        _studentRepository = studentRepository;
        _subjectRepository = subjectRepository;
    }

    public async Task<Student> InitializeNewGameAsync(string studentName, string specialization, int subjectsCount)
    {
        var student = new Student(studentName, specialization);
        var randomSubjects = await _subjectRepository.GetRandomSubjectsAsync(subjectsCount);

        foreach (var subject in randomSubjects)
        {
            var performance = new StudentSubjectPerformance(student.Id, subject.Id);
            student.Subscriptions.Add(performance);
        }

        var subjectIds = student.Subscriptions.Select(s => s.SubjectId).ToList();
        student.AdvanceToNextDay(subjectIds);

        await _studentRepository.AddAsync(student);
        await _studentRepository.SaveChangesAsync();

        return student;
    }

    public async Task<Student> AdvanceDayAsync(Guid studentId)
    {
        var student = await _studentRepository.GetByIdAsync(studentId);
        if (student == null) throw new Exception("Студент не найден");

        var subjectIds = student.Subscriptions.Select(s => s.SubjectId).ToList();

        student.AdvanceToNextDay(subjectIds);
        await _studentRepository.SaveChangesAsync();

        return student;
    }


    public async Task<IEnumerable<Student>> GetAllSavesAsync()
    {
        return await _studentRepository.GetAllAsync();
    }
    public async Task<bool> DeleteSaveAsync(Guid studentId)
    {
        var student = await _studentRepository.GetByIdAsync(studentId);
        if (student == null) return false;

        _studentRepository.Delete(student);
        await _studentRepository.SaveChangesAsync();
        return true;
    }
    public async Task<Student?> UpdateStudentAsync(Guid studentId, string name, int intelligence, decimal balance)
    {
        var student = await _studentRepository.GetByIdAsync(studentId);
        if (student == null) return null;

        student.UpdateDetails(name, intelligence, balance);
        await _studentRepository.UpdateAsync(student);
        await _studentRepository.SaveChangesAsync();

        return student;
    }
    public async Task<Student?> GetStudentByIdAsync(Guid studentId)
    {
        return await _studentRepository.GetByIdAsync(studentId);
    }
    public async Task<Student> ProcessActionAsync(Guid studentId, ActionType actionType, Guid? subjectId)
    {
        var student = await _studentRepository.GetByIdAsync(studentId);
        if (student == null) throw new Exception("Студент не найден");
        student.PerformAction(actionType, subjectId);

        await _studentRepository.UpdateAsync(student);
        await _studentRepository.SaveChangesAsync();

        return student;
    }
}
