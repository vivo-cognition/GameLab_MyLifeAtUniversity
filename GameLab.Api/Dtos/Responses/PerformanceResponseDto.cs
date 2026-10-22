namespace GameLab.Api.Dtos.Responses
{
    public class PerformanceResponseDto
    {
        public int AcademicProgress { get; set; }
        public SubjectResponseDto Subject { get; set; } = null!;
    }
}
