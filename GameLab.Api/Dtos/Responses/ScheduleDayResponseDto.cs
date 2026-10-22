namespace GameLab.Api.Dtos.Responses
{
    public class ScheduleDayResponseDto
    {
        public int DayNumber { get; set; }
        public bool IsAttestationDay { get; set; }
        public List<SubjectResponseDto> Subjects { get; set; } = new();
    }
}
