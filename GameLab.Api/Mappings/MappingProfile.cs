using AutoMapper;
using System.Linq;
using GameLab.Api.Dtos.Responses;
using GameLab.Core.Entities;

namespace GameLab.Api.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Subject, SubjectResponseDto>();
        CreateMap<StudentSubjectPerformance, PerformanceResponseDto>();
        CreateMap<ScheduleDay, ScheduleDayResponseDto>();
        CreateMap<Student, GameSaveLookupDto>();

        CreateMap<Student, StudentResponseDto>()
          .ForMember(dest => dest.ActiveSchedule, opt => opt.MapFrom(src =>
              src.ActiveSchedule.Select(day => new ScheduleDayResponseDto
              {
                  DayNumber = day.DayNumber,
                  IsAttestationDay = day.IsAttestationDay,

                  Subjects = day.SubjectIds
                      .Select(id => new SubjectResponseDto
                      {
                          Id = id,
                          Title = src.Subscriptions
                                     .Where(s => s.SubjectId == id)
                                     .Select(s => s.Subject.Title)
                                     .FirstOrDefault() ?? "Неизвестный предмет"
                      }).ToList()
              }).ToList()
          ));
    }
}
