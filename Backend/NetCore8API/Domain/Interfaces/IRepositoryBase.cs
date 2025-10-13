using NetCore8API.Domain.Entities;

namespace NetCore8API.Domain.Interfaces;

/// <summary>
/// Repositorio genérico para operaciones CRUD
/// </summary>
/// <typeparam name="T">Entidad del dominio</typeparam>
public interface IRepositoryBase<T> where T : class
{
    Task<T?> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<T> AddAsync(T entity);
    Task<T> UpdateAsync(T entity);
    Task<bool> DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
}