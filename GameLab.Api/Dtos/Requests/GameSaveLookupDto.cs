using System;

namespace GameLab.Api.Dtos.Responses;

public class GameSaveLookupDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Specialization { get; set; } = string.Empty;
    public int Intelligence { get; set; }
    public int Energy { get; set; }
    public int CurrentDay { get; set; }
    public decimal Balance { get; set; }
}
