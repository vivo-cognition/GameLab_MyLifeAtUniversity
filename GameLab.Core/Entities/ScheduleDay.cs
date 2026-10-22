namespace GameLab.Core.Entities;

public class ScheduleDay
{
    public Guid Id { get; private set; }
    public Guid StudentId { get; private set; }
    public int DayNumber { get; private set; }
    public Guid[] SubjectIds { get; private set; } = Array.Empty<Guid>();
    public bool IsAttestationDay { get; private set; }

    public ScheduleDay(Guid studentId, int dayNumber, Guid[] subjectIds, bool isAttestationDay)
    {
        Id = Guid.NewGuid();
        StudentId = studentId;
        DayNumber = dayNumber;
        SubjectIds = subjectIds ?? Array.Empty<Guid>();
        IsAttestationDay = isAttestationDay;
    }
}
