using System;
using GameLab.Core.Enums;

namespace GameLab.Api.Dtos.Requests;

public class GameActionDto
{
    public Guid StudentId { get; set; }
    public ActionType ActionType { get; set; }
    public Guid? SubjectId { get; set; }
}
