using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using GameLab.Core.Enums;

namespace GameLab.Core.Entities
{
    public class Student
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Specialization { get; private set; }

        public int Intelligence { get; private set; }
        public int Energy { get; private set; }

        public int CurrentDay { get; private set; }
        public List<ScheduleDay> ActiveSchedule { get; private set; } = new();
        public decimal Balance { get; private set; }
        public decimal MonthlyIncome { get; private set; }
        public List<StudentSubjectPerformance> Subscriptions { get; private set; } = new();

        public Student(string name, string specialization)
        {
            Id = Guid.NewGuid();
            Name = string.IsNullOrEmpty(name) ? "Анонимный Студент" : name;
            Specialization = specialization;

            Intelligence = 10;
            Energy = 100;
            CurrentDay = 0;
            Balance = 1000.00m;
            MonthlyIncome = 500.00m;
        }
        public void PerformAction(ActionType action, Guid? subjectId = null)
        {
            switch (action)
            {
                case ActionType.Rest:
                    Energy = Math.Min(100, Energy + 30);
                    break;
                case ActionType.SelfStudy:
                    Energy = Math.Max(0, Energy - 20);
                    Intelligence += 5;
                    break;
                case ActionType.SkipClass:
                    Energy = Math.Min(100, Energy + 10);
                    break;
                case ActionType.AttendClass:
                    Energy = Math.Max(0, Energy - 35);
                    Intelligence += 8;

                    if (subjectId.HasValue)
                    {
                        var performance = Subscriptions.FirstOrDefault(s => s.SubjectId == subjectId.Value);
                        if (performance != null)
                        {
                            performance.IncreaseProgress(10);
                        }
                    }
                    break;
            }
        }
        public void ApplyMonthlyIncome()
        {
            Balance = Math.Round(Balance + MonthlyIncome, 2, MidpointRounding.AwayFromZero);
        }
        public void IncreaseIncome(decimal bonus)
        {
            MonthlyIncome = Math.Round(MonthlyIncome + bonus, 2, MidpointRounding.AwayFromZero);
        }

        public void DeductIncome(decimal penalty)
        {
            decimal newIncome = Math.Max(0, MonthlyIncome - penalty);
            MonthlyIncome = Math.Round(newIncome, 2, MidpointRounding.AwayFromZero);
        }
        public void AdvanceToNextDay()
        {
            CurrentDay++;

            var random = new Random();
            if (CurrentDay % 30 == 0)
            {
                ApplyMonthlyIncome();
            }

            bool isAttestationDay = CurrentDay % 10 == 0;
            Guid? attestationSubjectId = null;

            if (isAttestationDay && Subscriptions.Any())
            {
                var randomSubscription = Subscriptions[random.Next(Subscriptions.Count)];
                attestationSubjectId = randomSubscription.SubjectId;
            }

            var studentSubjectIds = Subscriptions.Select(s => s.SubjectId).ToList();
            Guid[] todaysSubjects = Array.Empty<Guid>();

            if (studentSubjectIds.Any())
            {
                int maxPairs = Math.Min(studentSubjectIds.Count, random.Next(1, 8));

                todaysSubjects = studentSubjectIds
                    .OrderBy(x => random.Next())
                    .Take(maxPairs)
                    .ToArray();
            }

            var newDay = new ScheduleDay(Id, CurrentDay, todaysSubjects, isAttestationDay, attestationSubjectId);
            ActiveSchedule.Add(newDay); 
        }
        public void UpdateDetails(string newName, int newIntelligence, decimal newBalance)
        {
            if (!string.IsNullOrWhiteSpace(newName))
            {
                Name = newName.Trim();
            }

            Intelligence = Math.Max(0, newIntelligence);
            Balance = Math.Max(0, newBalance);
        }
    }
}
