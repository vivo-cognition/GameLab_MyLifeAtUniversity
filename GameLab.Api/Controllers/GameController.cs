using AutoMapper;
using GameLab.Api.Dtos.Requests;
using GameLab.Api.Dtos.Responses;
using GameLab.Core.Enums;
using GameLab.Core.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace GameLab.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GameController : ControllerBase
{
    private readonly IGameEngineService _gameEngineService;
    private readonly ILogger<GameController> _logger;
    private readonly IMapper _mapper;

    public GameController(IGameEngineService gameEngineService, ILogger<GameController> logger, IMapper mapper)
    {
        _gameEngineService = gameEngineService;
        _logger = logger;
        _mapper = mapper;
    }

    [HttpPost("start")]
    public async Task<IActionResult> StartGame([FromBody] StartGameDto dto)
    {
        try
        {
            var student = await _gameEngineService.InitializeNewGameAsync(dto.Name, dto.Specialization, dto.SubjectsCount);
            var response = _mapper.Map<StudentResponseDto>(student);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при старте новой игры для студента {Name}", dto.Name);
            return BadRequest("Не удалось инициализировать новую игру. Проверьте параметры запроса.");
        }
    }
    [HttpPost("next-day/{studentId:guid}")]
    public async Task<IActionResult> NextDay(Guid studentId) 
    {
        try
        {
            var updatedStudent = await _gameEngineService.AdvanceDayAsync(studentId);
            var response = _mapper.Map<StudentResponseDto>(updatedStudent);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка для студента с ID {Id}", studentId);
            return BadRequest(new
            {
                message = ex.Message,
                innerException = ex.InnerException?.Message,
                stackTrace = ex.StackTrace
            });
        }
    }



    [HttpGet("specializations")]
    public IActionResult GetSpecializations()
    {
        var specializations = new[]
        {
        "Программная инженерия",
        "Информационные системы и технологии",
        "Компьютерная безопасность",
        "Искусственный интеллект"
    };

        return Ok(specializations);
    }

    [HttpGet("saves")]
    public async Task<IActionResult> GetSavesList()
    {
        try
        {
            var students = await _gameEngineService.GetAllSavesAsync();
            var response = _mapper.Map<IEnumerable<GameSaveLookupDto>>(students);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при получении списка сохранений");
            return BadRequest("Не удалось загрузить список сохранений.");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSave(Guid id)
    {
        try
        {
            var isDeleted = await _gameEngineService.DeleteSaveAsync(id);
            if (!isDeleted) return NotFound("Сохранение для удаления не найдено.");

            return Ok(new { message = "Сохранение успешно удалено" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при удалении сохранения студента с ID {Id}", id);
            return BadRequest("Не удалось удалить сохранение.");
        }
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateStudent(Guid id, [FromBody] UpdateStudentDto dto)
    {
        try
        {
            var updatedStudent = await _gameEngineService.UpdateStudentAsync(id, dto.Name, dto.Intelligence, dto.Balance);
            if (updatedStudent == null) return NotFound("Студент для обновления не найден.");

            var response = _mapper.Map<StudentResponseDto>(updatedStudent);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при обновлении данных студента с ID {Id}", id);
            return BadRequest("Не удалось обновить параметры персонажа.");
        }
    }
    [HttpGet("{studentId}/schedule/day/{dayNumber:int}")]
    public async Task<IActionResult> GetDaySchedule(Guid studentId, int dayNumber)
    {
        try
        {
            var student = await _gameEngineService.GetStudentByIdAsync(studentId);
            if (student == null) return NotFound("Студент не найден.");

            var day = student.ActiveSchedule.FirstOrDefault(d => d.DayNumber == dayNumber);
            if (day == null) return NotFound($"Расписание на день {dayNumber} не найдено.");

            var response = new ScheduleDayResponseDto
            {
                DayNumber = day.DayNumber,
                IsAttestationDay = day.IsAttestationDay,
                Subjects = day.SubjectIds.Select(id => new SubjectResponseDto
                {
                    Id = id,
                    Title = student.Subscriptions
                                   .Where(s => s.SubjectId == id)
                                   .Select(s => s.Subject.Title)
                                   .FirstOrDefault() ?? "Неизвестный предмет"
                }).ToList()
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при получении расписания на день {Day}", dayNumber);
            return BadRequest("Не удалось загрузить расписание.");
        }
    }



    [HttpGet("{studentId}/schedule/semester")]
    public async Task<IActionResult> GetSemesterSchedule(Guid studentId)
    {
        try
        {
            var student = await _gameEngineService.GetStudentByIdAsync(studentId);
            if (student == null) return NotFound("Студент не найден.");

            var response = student.ActiveSchedule.Select(day => new ScheduleDayResponseDto
            {
                DayNumber = day.DayNumber,
                IsAttestationDay = day.IsAttestationDay,
                Subjects = day.SubjectIds.Select(id => new SubjectResponseDto
                {
                    Id = id,
                    Title = student.Subscriptions
                                   .Where(s => s.SubjectId == id)
                                   .Select(s => s.Subject.Title)
                                   .FirstOrDefault() ?? "Неизвестный предмет"
                }).ToList()
            }).ToList();

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при получении расписания семестра для студента {Id}", studentId);
            return BadRequest("Не удалось загрузить расписание семестра.");
        }
    }

    [HttpPost("action")]
    public async Task<IActionResult> ProcessAction([FromBody] GameActionDto dto)
    {
        if (dto == null) return BadRequest("Неверные параметры действия.");

        if (dto.ActionType == ActionType.AttendClass && !dto.SubjectId.HasValue)
        {
            return BadRequest("Для посещения занятия необходимо указать SubjectId.");
        }

        try
        {
            var updatedStudent = await _gameEngineService.ProcessActionAsync(dto.StudentId, dto.ActionType, dto.SubjectId);
            if (updatedStudent == null) return NotFound("Студент не найден.");

            var response = _mapper.Map<StudentResponseDto>(updatedStudent);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при выполнении действия {Action} для студента {Id}", dto.ActionType, dto.StudentId);
            return BadRequest($"Не удалось выполнить игровое действие: {ex.Message}");
        }
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetStudentById(Guid id)
    {
        try
        {
            var student = await _gameEngineService.GetStudentByIdAsync(id);

            if (student == null)
                return NotFound($"Студент с ID {id} не найден в системе.");

            var response = _mapper.Map<StudentResponseDto>(student);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при получении данных студента с ID {Id}", id);
            return BadRequest("Не удалось синхронизировать параметры персонажа.");
        }
    }
    [HttpGet("{studentId}/attestation/question/{subjectId:guid}")]
    public async Task<IActionResult> GetAttestationQuestion(Guid studentId, Guid subjectId)
    {
        try
        {
            var question = await _gameEngineService.GetQuestionForStudentAsync(studentId, subjectId);
            if (question == null) return NotFound("Для данного предмета не найдено вопросов в банке.");

            var response = new QuestionResponseDto
            {
                Id = question.Id,
                Text = question.Text,
                Options = question.Options
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка получения вопроса аттестации");
            return BadRequest("Не удалось загрузить вопрос.");
        }
    }

    [HttpPost("submit-attestation")]
    public async Task<IActionResult> SubmitAttestation([FromBody] SubmitAnswerDto dto)
    {
        try
        {
            var updatedStudent = await _gameEngineService.SubmitAttestationAnswerAsync(
                dto.StudentId,
                dto.QuestionId,
                dto.SelectedOptionIndex
            );

            var response = _mapper.Map<StudentResponseDto>(updatedStudent);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при обработке ответа на аттестацию");
            return BadRequest($"Не удалось зафиксировать результат: {ex.Message}");
        }
    }
}
