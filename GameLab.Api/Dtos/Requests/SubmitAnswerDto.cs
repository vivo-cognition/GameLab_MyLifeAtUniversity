namespace GameLab.Api.Dtos.Requests
{
    public class SubmitAnswerDto
    {
        public Guid StudentId { get; set; }
        public Guid QuestionId { get; set; }
        public int SelectedOptionIndex { get; set; }
    }
}
