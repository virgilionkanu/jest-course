const { queryString, parse } = require('./queryString');

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Virgilio',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Virgilio&profession=developer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Virgilio',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe('name=Virgilio&abilities=JS,TDD');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Virgilio',
      abilities: {
        first: 'JS',
        second: 'TDD',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string to object', async () => {
    const qs = 'name=Virgilio&profession=developer';

    expect(parse(qs)).toEqual({
      name: 'Virgilio',
      profession: 'developer',
    });
  });

  it('should convert a query string of a single key-value to object', async () => {
    const qs = 'name=Virgilio';

    expect(parse(qs)).toEqual({
      name: 'Virgilio',
    });
  });

  it('should convert a query string to an object taking care of comma values', async () => {
    const qs = 'name=Virgilio&abilities=JS,TDD';

    expect(parse(qs)).toEqual({
      name: 'Virgilio',
      abilities: ['JS', 'TDD'],
    });
  });
});
