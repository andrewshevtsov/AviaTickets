import { formatDate } from '../date';

describe('formatDate', () => {
    it('check format', () => {
        expect(formatDate(1608387769462, 'yyyy')).toBe('2020');
    })
});