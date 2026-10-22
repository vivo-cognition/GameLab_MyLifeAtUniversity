namespace GameLab.Api.Dtos.Responses
{
    public class StudentResponseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Specialization { get; set; } = string.Empty;
        public int Intelligence { get; set; }
        public int Energy { get; set; }
        public int CurrentDay { get; set; }
        public decimal Balance { get; set; }
        public decimal MonthlyIncome { get; set; }
        
        public List<PerformanceResponseDto> Subscriptions { get; set; } = new();
        public List<ScheduleDayResponseDto> ActiveSchedule { get; set; } = new();
    }
}
