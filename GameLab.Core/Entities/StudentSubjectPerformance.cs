using System;
using System.Collections.Generic;
using System.Text;

namespace GameLab.Core.Entities
{
    public class StudentSubjectPerformance
    {
        public Guid Id { get; private set; }
        public Guid StudentId { get; private set; }
        public Guid SubjectId { get; private set; }


        public Subject Subject { get; private set; } = null!;
        public int AcademicProgress { get; private set; }


        public bool IsTodayInSchedule { get; private set; }

        public StudentSubjectPerformance(Guid studentId, Guid subjectId)
        {
            Id = Guid.NewGuid();
            StudentId = studentId;
            SubjectId = subjectId;
            AcademicProgress = 0;
            IsTodayInSchedule = false;
        }

        public void IncreaseProgress(int amount)
        {
            AcademicProgress = Math.Min(100, AcademicProgress + amount);
        }

        public void DecreaseProgress(int amount)
        {
            AcademicProgress = Math.Max(0, AcademicProgress - amount);
        }

        public void SetScheduleStatus(bool isInSchedule)
        {
            IsTodayInSchedule = isInSchedule;
        }
    }
}
