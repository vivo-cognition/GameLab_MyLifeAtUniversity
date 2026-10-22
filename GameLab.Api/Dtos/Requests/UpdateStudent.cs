using System;

namespace GameLab.Api.Dtos.Requests;

public class UpdateStudentDto
{
    public string Name { get; set; } = string.Empty;
    public int Intelligence { get; set; }
    public decimal Balance { get; set; }
}
