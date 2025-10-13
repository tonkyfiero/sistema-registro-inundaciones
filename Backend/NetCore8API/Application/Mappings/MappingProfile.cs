using AutoMapper;
using NetCore8API.Application.DTOs;
using NetCore8API.Domain.Entities;

namespace NetCore8API.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Mapeos de Municipio
        CreateMap<Municipio, MunicipioDto>()
            .ForMember(dest => dest.Asentamientos, opt => opt.MapFrom(src => src.Asentamientos));
        CreateMap<Municipio, MunicipioDetalleDto>()
            .ForMember(dest => dest.Asentamientos, opt => opt.MapFrom(src => src.Asentamientos))
            .ForMember(dest => dest.Albergues, opt => opt.MapFrom(src => src.Albergues));
        CreateMap<Municipio, MunicipioConAsentamientosDto>()
            .ForMember(dest => dest.Asentamientos, opt => opt.MapFrom(src => src.Asentamientos));
        CreateMap<CreateMunicipioDto, Municipio>();
        CreateMap<UpdateMunicipioDto, Municipio>();

        // Mapeos de Asentamiento
        CreateMap<Asentamiento, AsentamientoDto>()
            .ForMember(dest => dest.MunicipioNombre, opt => opt.MapFrom(src => src.Municipio.Nombre));

        // Mapeos de Albergue
        CreateMap<Albergue, AlbergueDto>()
            .ForMember(dest => dest.MunicipioNombre, opt => opt.MapFrom(src => src.Municipio.Nombre));
        CreateMap<CreateAlbergueDto, Albergue>();

        // Mapeos de Persona
        CreateMap<Persona, PersonaDto>()
            .ForMember(dest => dest.MunicipioNombre, opt => opt.MapFrom(src => src.Municipio.Nombre))
            .ForMember(dest => dest.AlbergueNombre, opt => opt.MapFrom(src => src.AlbergueActual != null ? src.AlbergueActual.Nombre : null))
            .ForMember(dest => dest.AlbergueMunicipioNombre, opt => opt.MapFrom(src => src.AlbergueActual != null && src.AlbergueActual.Municipio != null ? src.AlbergueActual.Municipio.Nombre : null));
        CreateMap<CreatePersonaDto, Persona>()
            .ForMember(dest => dest.AlbergueActualId, opt => opt.MapFrom(src => src.AlbergueId));
        CreateMap<CrearPersonaDto, Persona>();
        CreateMap<UpdatePersonaDto, Persona>();
        CreateMap<ActualizarPersonaDto, Persona>();

        // Mapeos de Condiciones Médicas
        CreateMap<PersonaCondicionMedica, PersonaCondicionMedicaDto>()
            .ForMember(dest => dest.TipoCondicion, opt => opt.MapFrom(src => src.CondicionMedica.Tipo));

        // Mapeos de Grupo Familiar
        CreateMap<GrupoFamiliar, GrupoFamiliarDto>()
            .ForMember(dest => dest.AlbergueNombre, opt => opt.MapFrom(src => src.Albergue.Nombre))
            .ForMember(dest => dest.CabezaFamiliaNombre, 
                opt => opt.MapFrom(src => src.Miembros
                    .Where(m => m.EsCabezaFamilia)
                    .Select(m => $"{m.Nombre} {m.ApellidoPaterno}")
                    .FirstOrDefault()));
        CreateMap<CreateGrupoFamiliarDto, GrupoFamiliar>();
    }
}