namespace GameLab.Api.Dtos.Requests
{
    public class StartGameDto
    {
        public string Name { get; set; } = string.Empty;
        public string Specialization { get; set; } = string.Empty;
        public int SubjectsCount { get; set; }
    }
}
