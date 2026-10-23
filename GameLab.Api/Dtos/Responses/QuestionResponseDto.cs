namespace GameLab.Api.Dtos.Responses
{
    public class QuestionResponseDto
    {
        public Guid Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public List<string> Options { get; set; } = new();
    }
}
