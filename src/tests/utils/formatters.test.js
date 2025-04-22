// formatters.test.js
import { trimObjectValues } from '../../utils/formatters';

describe('trimObjectValues()', () => {
  it('trims whitespace from all string values', () => {
    const input = {
      Name: ' John ',
      Email: ' jane@example.com ',
      Phone: '  123456 ',
    };

    const output = trimObjectValues(input);

    expect(output).toEqual({
      Name: 'John',
      Email: 'jane@example.com',
      Phone: '123456',
    });
  });

  it('preserves non-string values', () => {
    const input = {
      Age: 25,
      Active: true,
      NullVal: null,
      UndefinedVal: undefined,
    };

    const output = trimObjectValues(input);

    expect(output).toEqual(input);
  });

  it('returns empty object when given empty input', () => {
    expect(trimObjectValues({})).toEqual({});
  });
});
