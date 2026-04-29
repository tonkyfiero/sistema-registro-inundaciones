describe('Application', () => {
  it('should have a basic test setup', () => {
    expect(true).toBe(true);
  });
  
  it('should be able to create basic objects', () => {
    const testObject = { name: 'test', value: 123 };
    expect(testObject.name).toBe('test');
    expect(testObject.value).toBe(123);
  });
});
